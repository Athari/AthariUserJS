[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSPossibleIncorrectComparisonWithNull', '')]
[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSAvoidUsingCmdletAliases', '')]
[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSUseApprovedVerbs', '')]
param(
)

if (Test-Path ".\!build\Config.user.ps1") { . ".\!build\Config.user.ps1" }

$JsonArgs = @{
  Depth = 10
  EnumsAsStrings = $true
}

function SchemaArray($desc, $items) { @{ type = 'array'; description = $desc; items = $items } }
function SchemaString($desc) { @{ type = 'string'; description = $desc } }
function SchemaStringConst($value) { @{ type = 'string'; const = $value } }
function SchemaObject($props) { @{ type = 'object'; properties = $props } }
function SchemaObjectRoot($title, $props) { @{ type = 'object'; title = $title; properties = $props } }
function SchemaObject-Original() { @{
  type = 'object'; description = "Original texts"
  additionalProperties = SchemaString "Original text identified by language code as key"
}}

$JsonSchemas = @{
  Translate = @{
    Input = SchemaObjectRoot 'TranslateInput' @{
      operation = SchemaStringConst 'translate'
      locale = SchemaString "Target language code"
      original = SchemaObject-Original
    }
    Output = SchemaObjectRoot 'TranslateOutput' @{
      operation = SchemaStringConst 'translate'
      locale = SchemaString "Language code of translated text"
      translated = SchemaString "Translated text"
    }
  }
  Review = @{
    Input = SchemaObjectRoot 'ReviewInput' @{
      operation = SchemaStringConst 'review'
      locale = SchemaString "Language code of text to review"
      original = SchemaObject-Original
    }
    Output = SchemaObjectRoot 'ReviewOutput' @{
      operation = SchemaStringConst 'review'
      locale = SchemaString "Language code of reviewed text"
      review = SchemaArray "List of review messages" (
        SchemaString "Review message"
      )
      replace = SchemaArray "List of find/replace pairs" (
        SchemaObject @{
          find = SchemaString "Text to find in the original"
          replace = SchemaString "Text to replace the found text with"
        }
      )
    }
  }
}

$SystemMessages = @{
  Translate = @"
Rules:
1. Act as an automatic localization service.
2. Respond strictly with raw pretty-formatted JSON without any decorations. Start response with `{` and end with `}`.
3. Preserve original writing style. If multiple original strings are provided, chose the most appropriate translation based on all provided strings.
4. FOR SERBIAN, USE LATIN SCRIPT, NOT CYRILLIC.
"@
  Review = @"
Rules:
1. Act as an automatic localization verification service.
2. Respond strictly with raw pretty-formatted JSON without any decorations. Start response with `{` and end with `}`.
3. Review and proof-read the requested translation based on the other translations. If only one translation is provided, just proof-read it alone.
4. Make sure the translation sounds natural to native speakers, but preserve the original writing style.
5. Explain subtleties of the language assuming the user isn't a native speaker.
6. Suggest find/replace pairs, where appropriate.
"@
}

$LanguageCodes = @{
  tt = 'tt-Cyrl'
  sr = 'sr-Latn'
}

function Invoke-OpenAI
{
  param(
    $Messages
  )
  $IsModelThinking = $OpenAI.Model.StartsWith("o")
  $InputJson = @{
    #max_tokens = 4096
    max_completion_tokens = 4096
    model = $OpenAI.Model
    temperature = $IsModelThinking ? 1.0 : $OpenAI.Temperature
    response_format = @{ type = $IsModelThinking ? 'text' : 'json_object' }
    messages = $Messages
  }
  $OpenAIArgs = @{
    Method = 'Post'
    Uri = $OpenAI.Uri
    Authentication = 'Bearer'
    Token = ConvertTo-SecureString $OpenAI.Key -AsPlainText
    ContentType = 'application/json; charset=utf-8'
    ConnectionTimeoutSeconds = 120
    MaximumRedirection = 0
    ResponseHeadersVariable = 'Headers'
    StatusCodeVariable = 'HttpCode'
    Body = $InputJson | ConvertTo-Json @JsonArgs
  }
  $Headers = @{}
  $HttpCode = 0
  for ($Retry = 0; $Retry -lt 3; $Retry++) {
    $Result = Invoke-RestMethod @OpenAIArgs
    if ($HttpCode -ge 400) {
      $RetryDelay = $Headers['Retry-After']
      $RetryDelay = $RetryDelay -gt 60 ? $RetryDelay / 1000 : $RetryDelay ?? 15
      Write-Host "Waiting $($RetryDelay) s..."
      Start-Sleep -Seconds $RetryDelay
      continue
    }
    $Content = $Result.choices[0].message.content -replace '(?isx) ^ \s* ```(?:json) \s+ (.*) \s+ ``` \s* $', '$1' | ConvertFrom-Json
    Write-Host "Headers:"
    $HttpCode | Write-Host
    $Headers | Format-Table | Out-String | Write-Host
    Write-Host "Response:"
    $Result | ConvertTo-Json @JsonArgs | Write-Host
    Write-Host "Content:"
    $Content | ConvertTo-Json @JsonArgs | Write-Host
    return $Content
  }
}

function Invoke-OpenAICommand
{
  param(
    [Parameter(Mandatory)]
    [string] $Command,
    [Parameter(Mandatory)]
    [hashtable] $InputJson
  )

  $IsModelThinking = $OpenAI.Model.StartsWith("o")
  $InputJson.operation = $Command.ToLowerInvariant()
  $Messages = @(
    @{
      role = $IsModelThinking ? 'user' : 'system'
      content = @(
        $SystemMessages.$Command
        "Input JSON schema:`n$($JsonSchemas.$Command.Input | ConvertTo-Json @JsonArgs)"
        "Input JSON schema:`n$($JsonSchemas.$Command.Output | ConvertTo-Json @JsonArgs)"
      ) -join "`n`n"
    }
    @{
      role = 'user'
      content = $InputJson | ConvertTo-Json @JsonArgs
    }
  )
  return Invoke-OpenAI $Messages
}

function Invoke-OpenAITranslate
{
  param(
    [Parameter(Mandatory)]
    [string] $TargetLanguage,
    [Parameter(Mandatory)]
    [hashtable] $OriginalTexts
  )
  $Output = Invoke-OpenAICommand 'Translate' @{
    locale = $LanguageCodes.$TargetLanguage ?? $TargetLanguage
    original = $OriginalTexts
  }
  return $Output.translated
}

function Invoke-OpenAIReview
{
  param(
    [Parameter(Mandatory)]
    [string] $ReviewLanguage,
    [Parameter(Mandatory)]
    [hashtable] $OriginalTexts
  )
  $Output = Invoke-OpenAICommand 'Review' @{
    locale = $ReviewLanguage
    original = $OriginalTexts
  }
  Write-Host "`nReview:`n"
  $i = 0
  @($Output.review | foreach { $i++; "$i. $_" }) -join "`n" | Out-Host
  Write-Host "`nFind/replace:`n"
  $i = 0
  @($Output.replace | foreach { $i++; "$i. $($_.find) -> $($_.replace)" }) -join "`n" | Out-Host
  Write-Host
  return $Output
}

#Invoke-OpenAITranslate 'uk' @{ en = "Hello world!"; ru = "Привет, грешный мир!" }

$ReadMes = @{}
function Get-ReadMe($Lang)
{
  $ReadMes.$Lang = (Get-Content -Raw ($Lang -eq 'en' ? "./ReadMe.md" : "./ReadMe.$Lang.md")) -replace '(?isx) \[vm\-logo\]: .*', ""
}

function Translate-ReadMe($Lang)
{
  Set-Content -LiteralPath "./ReadMe.$Lang.md" -Value (Invoke-OpenAITranslate $Lang $ReadMes)
}

function Review-ReadMe($Lang)
{
  Invoke-OpenAIReview $Lang $ReadMes | Out-Null
}

Get-ReadMe 'en'
#Review-ReadMe 'en'

#Translate-ReadMe 'ru'
Get-ReadMe 'ru'
Review-ReadMe 'ru'

#Translate-ReadMe 'uk'
#Get-ReadMe 'uk'
#Review-ReadMe 'uk'

#Translate-ReadMe 'be'
#Get-ReadMe 'be'
#Review-ReadMe 'be'

#Translate-ReadMe 'bg'
#Get-ReadMe 'bg'
#Review-ReadMe 'bg'

#Translate-ReadMe 'tt'
#Get-ReadMe 'tt'
#Review-ReadMe 'tt'

#Translate-ReadMe 'sl'
#Get-ReadMe 'sl'
#Review-ReadMe 'sl'

#Translate-ReadMe 'sr'
#Get-ReadMe 'sr'
#Review-ReadMe 'sr'

#Translate-ReadMe 'ka'
#Get-ReadMe 'ka'
#Review-ReadMe 'ka'

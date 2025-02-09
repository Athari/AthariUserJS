[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSPossibleIncorrectComparisonWithNull', '')]
[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSAvoidUsingCmdletAliases', '')]
[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSUseApprovedVerbs', '')]
param(
)

$ErrorActionPreference = 'Stop'

$Notes = @(
  '[Install Script] and [Install Style] links are buttons which must directly follow the name of the script/style.'
  'Names of sites/services/companies with exhaustive list of official spellings and/or translations (must not be translated, but can be flexed, if appropriate): '
    'IMDb, Kinopoisk/Кинопоиск, Premier, Kinorium/Кинориум, Soyuzmultfilm(en/lat)/Союзмультфильм(ru/cyr)/სოიუზმულტფილმი(ka)/Sojuzmultfilm(sr)'
  'In Russian, always prefer Ё over Е.'
  'Prefer language-specific quotes (“”, «» etc.) over straight quotes (""); prefer en- and em-dashes (–, —) over dashes (-) in punctuation.'
  '"Отпёртый" is an intentional word play and should be translated into other languages accordingly.'
  '"Видеозапись недоступна для просмотра по решению правообладателя" message must be quoted exactly in all languages.'
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
function SchemaDict($desc, $props) { @{ type = 'object'; description = $title; additionalProperties = $props } }
function SchemaDict-Original() { SchemaDict "Original texts" (
  SchemaString "Original text identified by language code as key"
)}

$JsonSchemas = @{
  Translate = @{
    Input = SchemaObjectRoot 'TranslateInput' @{
      operation = SchemaStringConst 'translate'
      locale = SchemaString "Target language code"
      original = SchemaDict-Original
      notes = SchemaObject "List of translation notes and rules" (
        SchemaString "Note text"
      )
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
      original = SchemaDict-Original
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
5. Explain subtleties of the language in English and assume the user isn't a native speaker.
6. Check whether all rules listed in the notes are strictly followed.
7. Suggest find/replace pairs, where appropriate.
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
    Method = 'Post'; Uri = $OpenAI.Uri
    Authentication = 'Bearer'; Token = ConvertTo-SecureString $OpenAI.Key -AsPlainText
    ContentType = 'application/json; charset=utf-8'
    ConnectionTimeoutSeconds = 120; MaximumRedirection = 0
    ResponseHeadersVariable = 'Headers'; StatusCodeVariable = 'HttpCode'
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
    notes = $Notes
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
    notes = $Notes
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

$ReadMeTexts = @{}
$ReadMes = @{}

function Get-ReadMe($Lang)
{
  $ReadMeText = Get-Content -Raw ($Lang -eq 'en' ? "./ReadMe.md" : "./ReadMe.$Lang.md")
  return ($ReadMeText -replace '(?insx) \[vm\-logo\]: .*', "").Trim()
}
function Load-ReadMe($Lang)
{
  $ReadMeTexts.$Lang = Get-ReadMe $Lang
}

function Translate-ReadMe($Lang)
{
  Set-Content -LiteralPath "./ReadMe.$Lang.md" -Value (Invoke-OpenAITranslate $Lang $ReadMeTexts)
}

function Review-ReadMe($Lang)
{
  Invoke-OpenAIReview $Lang $ReadMeTexts | Out-Null
}

function Split-ReadMes($FilesMask)
{
  function Remove-Anchor($Header) { $Header -replace '<a id[^/>]+/> ', '' }

  function Remove-Badge($Header) { $Header -replace '(?insx) \s \[!\[ [^\]]+ \]\[ [^\]]+ \]\]\( [^\)]+ \)', '' }

  function Split-ReadMeSection($Text, $HeaderPrefix)
  {
    $Sections = [regex]::Matches($Text, "(?insx)
      (?<! \# ) $HeaderPrefix (?<Header> [^\r\n]+ )
      (?<Text> .+? )
      (?= \n $HeaderPrefix | \z )")
    return $Sections.Count -eq 0 ? $Text : ($Sections | foreach {
      ($Header, $Text) = ($_.Groups['Header'].Value.Trim(), $_.Groups['Text'].Value.Trim())
      $Items = Split-ReadMeSection $Text "\#$HeaderPrefix"
      return $Items -is [string] ?
        [PSCustomObject] @{ Header = $Header; Text = $Items } :
        [PSCustomObject] @{ Header = $Header; Items = @($Items) }
    })
  }

  Get-ChildItem -LiteralPath "." -Filter $FilesMask | foreach {
    $Lang = $_.Name -replace '(?inx)
      ReadMe
      (
        \. (?<Lang> [\w\-]+ )
      )?
      \. md', '${Lang}'
    $Lang = $Lang -eq "" ? 'en' : $Lang
    $ReadMes.$Lang = Split-ReadMeSection (Get-ReadMe $Lang) '\#\ '
  }

  $ReadMes | ConvertTo-Json @JsonArgs | Out-Host

  $ReadMes.GetEnumerator() | foreach {
    ($Lang, $ReadMe) = ($_.Name, $_.Value)
    foreach ($SiteDir in Get-ChildItem -Directory | where { -not ($_.Name -match '^[!@\.]') }) {
      $SiteDirName = $SiteDir.Name
      foreach ($ScriptFile in Get-ChildItem -File -LiteralPath $SiteDirName -Filter "*.user.js") {
        $ScriptFileName = $ScriptFile.Name.Replace('.user.js', '')
        $SiteHeader = $null
        $ScriptHeader = $null
        $ScriptText = $null
        :SectionSearch foreach ($SiteReadMe in $ReadMe.Items) {
          foreach ($ScriptReadMe in $SiteReadMe.Items) {
            if ($ScriptReadMe.Header.Contains("$SiteDirName/$ScriptFileName.user.js")) {
              $SiteHeader = $SiteReadMe.Header
              $ScriptHeader = $ScriptReadMe.Header
              $ScriptText = $ScriptReadMe.Text
              break :SectionSearch
            }
          }
        }
        $ReadMeText = @(
          "## $(Remove-Anchor $SiteHeader)"
          "### $(Remove-Anchor (Remove-Badge $ScriptHeader))"
          Remove-Badge $ScriptText
        ) -join "`n`n"
        Set-Content -LiteralPath "$SiteDirName/$ScriptFileName.$Lang.md" -Value $ReadMeText
        Write-Host @($SiteDirName, $ScriptFileName, $ScriptName, $SiteHeader, $ScriptHeader)
      }
    }
  }
}

Load-ReadMe 'en'
#Review-ReadMe 'en'

#Translate-ReadMe 'ru'
Load-ReadMe 'ru'
#Review-ReadMe 'ru'

#Translate-ReadMe 'uk'
#Load-ReadMe 'uk'
#Review-ReadMe 'uk'

#Translate-ReadMe 'be'
#Load-ReadMe 'be'
#Review-ReadMe 'be'

#Translate-ReadMe 'bg'
#Load-ReadMe 'bg'
#Review-ReadMe 'bg'

#Translate-ReadMe 'tt'
#Load-ReadMe 'tt'
#Review-ReadMe 'tt'

#Translate-ReadMe 'sl'
#Load-ReadMe 'sl'
#Review-ReadMe 'sl'

#Translate-ReadMe 'sr'
#Load-ReadMe 'sr'
#Review-ReadMe 'sr'

#Translate-ReadMe 'ka'
#Load-ReadMe 'ka'
#Review-ReadMe 'ka'

#Split-ReadMes "ReadMe.md"
#Split-ReadMes "ReadMe.ru.md"
Split-ReadMes "ReadMe*.md"

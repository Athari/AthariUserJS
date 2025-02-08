[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSUseDeclaredVarsMoreThanAssignments', '')]
param(
)

$OpenAI = @{
  Uri = ""
  Key = ""
  Model = 'gpt-4o'
  #Model = 'o1-mini'
  Temperature = 0.0
}
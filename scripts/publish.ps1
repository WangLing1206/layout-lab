param(
    [ValidatePattern('^[A-Za-z0-9_.-]+$')][string]$RepositoryName = 'layout-lab',
    [switch]$ConfirmPublic
)
$ErrorActionPreference = 'Stop'
function Invoke-Checked {
    param([string]$Command, [string[]]$Arguments)
    & $Command @Arguments
    if ($LASTEXITCODE -ne 0) { throw "$Command failed (exit $LASTEXITCODE)." }
}
$Root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $Root
foreach ($Command in @('git', 'gh', 'npm')) {
    if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) {
        throw "Install $Command first. See README.md."
    }
}
if (-not $ConfirmPublic) {
    Write-Host 'This will publish all project source files and the website to a PUBLIC GitHub repository.'
    if ((Read-Host 'Type PUBLISH to continue') -cne 'PUBLISH') { throw 'Publishing cancelled.' }
}
Invoke-Checked 'gh' @('auth','status')
Invoke-Checked 'git' @('config','user.name')
Invoke-Checked 'git' @('config','user.email')
Invoke-Checked 'npm' @('ci')
Invoke-Checked 'npm' @('test')
Invoke-Checked 'npm' @('run','build')
if (-not (Test-Path -LiteralPath (Join-Path $Root '.git'))) {
    Invoke-Checked 'git' @('init','-b','main')
}
$Branch = & git branch --show-current
if ($LASTEXITCODE -ne 0 -or $Branch -ne 'main') { throw 'Switch to the intended main branch before publishing. No branch was changed.' }
Invoke-Checked 'git' @('add','--','.gitignore','package.json','package-lock.json','index.html','vite.config.js','src','public','.github','scripts','README.md','docs')
& git diff --cached --quiet
$DiffExit = $LASTEXITCODE
if ($DiffExit -eq 1) { Invoke-Checked 'git' @('commit','-m','Publish Layout Classroom teaching website') }
elseif ($DiffExit -ne 0) { throw 'Could not inspect staged changes.' }
$Owner = & gh api user --jq '.login'
if ($LASTEXITCODE -ne 0) { throw 'Could not determine the signed-in GitHub account.' }
$Repository = "$Owner/$RepositoryName"
$Remotes = & git remote
if ($LASTEXITCODE -ne 0) { throw 'Could not inspect remotes.' }
if ($Remotes -contains 'origin') {
    $Origin = & git remote get-url origin
    if ($LASTEXITCODE -ne 0) { throw 'Could not read origin.' }
    if ($Origin -notin @("https://github.com/$Repository.git", "https://github.com/$Repository", "git@github.com:$Repository.git")) {
        throw "Existing origin does not match $Repository. No remote was changed."
    }
} else {
    Invoke-Checked 'gh' @('repo','create',$Repository,'--public','--source','.','--remote','origin')
}
Invoke-Checked 'git' @('push','-u','origin','main')
$PreviousErrorPreference = $ErrorActionPreference
try {
    $ErrorActionPreference = 'Continue'
    $Pages = & gh api "repos/$Repository/pages" 2>&1
    $PagesExit = $LASTEXITCODE
} finally {
    $ErrorActionPreference = $PreviousErrorPreference
}
if ($PagesExit -eq 0) {
    Invoke-Checked 'gh' @('api','--method','PUT',"repos/$Repository/pages",'-f','build_type=workflow')
} elseif (($Pages | Out-String) -match '404') {
    Invoke-Checked 'gh' @('api','--method','POST',"repos/$Repository/pages",'-f','build_type=workflow')
} else { throw "Cannot inspect Pages settings: $Pages" }
Invoke-Checked 'gh' @('workflow','run','deploy.yml','--repo',$Repository,'--ref','main')
Write-Host "Deployment queued. Track it at https://github.com/$Repository/actions"
Write-Host "Website (available after the workflow succeeds): https://$Owner.github.io/$RepositoryName/"

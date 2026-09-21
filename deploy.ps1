<# Deploy only public/ to a dedicated web directory. Requires an existing SSH alias.
   Example: .\deploy.ps1 -SshHost my-server -DryRun
   Old releases are retained in ~/.mailbaukasten-backups, outside the web root.
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [ValidatePattern('^[a-zA-Z0-9][a-zA-Z0-9._@-]*$')]
    [string]$SshHost,
    [ValidatePattern('^[a-zA-Z0-9][a-zA-Z0-9/_-]*$')]
    [string]$RemoteDirectory = 'www/internessi/mailing',
    [switch]$DryRun
)
$ErrorActionPreference = 'Stop'
$Files = @('index.html','app.js','core.mjs','styles.css','favicon.svg','anleitung.html','recht.html','datenschutz.html','.htaccess')
$LocalFiles = foreach ($File in $Files) {
    $Path = Join-Path (Join-Path $PSScriptRoot 'public') $File
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) { throw "Missing file: $File" }
    $Path
}
$Release = (Get-Date -Format 'yyyyMMdd-HHmmss') + '-' + [guid]::NewGuid().ToString('N').Substring(0,8)
$Parent = $RemoteDirectory.Substring(0, $RemoteDirectory.LastIndexOf('/'))
$Stage = "$Parent/.mailbaukasten-stage-$Release"
$Backup = ".mailbaukasten-backups/$Release"
if ($DryRun) {
    Write-Host "Target: ${SshHost}:~/$RemoteDirectory/"
    $Files | ForEach-Object { Write-Host "  $_" }
    exit 0
}
$SshOptions = @('-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','ConnectTimeout=15')
& ssh @SshOptions $SshHost "mkdir -p ~/$Stage ~/.mailbaukasten-backups"
if ($LASTEXITCODE -ne 0) { throw 'Could not prepare release directory.' }
& scp @SshOptions @LocalFiles "${SshHost}:$Stage/"
if ($LASTEXITCODE -ne 0) { throw 'Upload failed; live version was not changed.' }
$Activate = "test -f ~/$Stage/index.html && test -f ~/$Stage/core.mjs && { if test -e ~/$RemoteDirectory; then mv ~/$RemoteDirectory ~/$Backup || exit 1; fi; if mv ~/$Stage ~/$RemoteDirectory; then echo RELEASE_OK; else if test -d ~/$Backup; then mv ~/$Backup ~/$RemoteDirectory; fi; exit 1; fi; }"
& ssh @SshOptions $SshHost $Activate
if ($LASTEXITCODE -ne 0) { throw 'Release activation failed. Inspect server state.' }
Write-Host "Released $Release to ~/$RemoteDirectory/"

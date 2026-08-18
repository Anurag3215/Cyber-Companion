$ErrorActionPreference = "Stop"

Write-Host "Building backend project..."
Set-Location -Path "$PSScriptRoot\backend"
npm run build
Set-Location -Path "$PSScriptRoot"

Write-Host "Staging changes for git..."
git add .

$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..."
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto-build and push at $timestamp"
    
    Write-Host "Pushing to GitHub..."
    git push
    Write-Host "Push successful!"
} else {
    Write-Host "No changes to commit."
}

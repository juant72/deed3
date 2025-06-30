# SIMPLE VS Code Restart Script
# Use this ONLY from external PowerShell (not VS Code terminal)

Write-Host "🔧 Simple VS Code Restart" -ForegroundColor Green

# 1. Force close VS Code
Write-Host "1. Closing VS Code..." -ForegroundColor Yellow
taskkill /f /im Code.exe 2>$null | Out-Null
Start-Sleep -Seconds 2

# 2. Clear problematic cache
Write-Host "2. Clearing cache..." -ForegroundColor Yellow
try {
    Remove-Item "$env:APPDATA\Code\logs" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "$env:APPDATA\Code\User\workspaceStorage" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   Cache cleared" -ForegroundColor Green
} catch {
    Write-Host "   Cache clear failed (normal)" -ForegroundColor Gray
}

# 3. Restart VS Code with optimizations
Write-Host "3. Starting VS Code..." -ForegroundColor Yellow
$projectPath = Split-Path -Parent $PSScriptRoot

try {
    Set-Location $projectPath
    Start-Process "code" -ArgumentList ".", "--max-memory=8192" -NoNewWindow
    Write-Host "✅ VS Code restarted successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to start VS Code. Try manually: code ." -ForegroundColor Red
}

Write-Host "Done! If Copilot still crashes, disable other extensions." -ForegroundColor Cyan

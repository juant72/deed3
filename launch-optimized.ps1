# Quick launch script for optimized VS Code
Write-Host "🚀 Launching VS Code with optimizations..." -ForegroundColor Cyan
Set-Location 'C:\Users\Juan\work\encrypia\labs\deed3'
code . --disable-extensions
Start-Sleep -Seconds 3
code . --reuse-window
Write-Host "✅ VS Code launched" -ForegroundColor Green

@echo off
echo 🔧 VS Code Quick Restart
echo =====================

echo 1. Closing VS Code...
taskkill /f /im Code.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo 2. Clearing cache...
rd /s /q "%APPDATA%\Code\logs" >nul 2>&1
rd /s /q "%APPDATA%\Code\User\workspaceStorage" >nul 2>&1

echo 3. Starting VS Code...
cd /d "%~dp0\.."
start "" code . --max-memory=8192

echo ✅ Done! VS Code should restart with optimizations.
echo If Copilot crashes, disable other extensions first.
pause

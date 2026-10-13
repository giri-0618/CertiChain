@echo off
cd /d "%~dp0"
echo Starting CertiChain...
start "" cmd /c "timeout /t 2 >nul & start http://localhost:3000"
node server.mjs
pause

@echo off
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Chua cai Node.js. Tai Node.js LTS tai https://nodejs.org roi chay lai file nay.
  pause
  exit /b 1
)
echo.
echo Mo trinh duyet bang IP may nay (Wi-Fi / ZeroTier), cong 8080.
echo Vi du: http://192.168.1.9:8080  va  http://192.168.1.9:8080/admin/
echo Dang nhap lan dau: admin / admin123
echo.
node server.js
pause

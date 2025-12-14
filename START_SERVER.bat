@echo off
echo ========================================
echo   Starting FutureForge Development Server
echo   Using: Gemini 2.5 Flash AI Model
echo ========================================
echo.
echo Clearing cache...
if exist .next rmdir /s /q .next
echo Cache cleared!
echo.
echo Starting server...
echo.
echo The server will start at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.
npm run dev
pause

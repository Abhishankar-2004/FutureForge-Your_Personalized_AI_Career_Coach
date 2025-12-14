# FutureForge Development Server Startup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting FutureForge Development Server" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Clear cache
Write-Host "Clearing cache..." -ForegroundColor Yellow
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
    Write-Host "✓ Cache cleared!" -ForegroundColor Green
} else {
    Write-Host "✓ No cache to clear" -ForegroundColor Green
}
Write-Host ""

# Check environment
Write-Host "Checking environment..." -ForegroundColor Yellow
if (Test-Path .env) {
    Write-Host "✓ .env file found" -ForegroundColor Green
} else {
    Write-Host "✗ .env file not found!" -ForegroundColor Red
    Write-Host "Please create a .env file with your API keys" -ForegroundColor Red
    pause
    exit
}
Write-Host ""

# Start server
Write-Host "Starting server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "The server will start at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

npm run dev

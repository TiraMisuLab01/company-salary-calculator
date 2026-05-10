@echo off
setlocal

set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm was not found. Install Node.js first.
  pause
  exit /b 1
)

if not exist "%PROJECT_DIR%package.json" (
  echo [ERROR] package.json was not found in the project directory.
  pause
  exit /b 1
)

if not exist "%PROJECT_DIR%node_modules" (
  echo [INFO] Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
  )
)

echo [INFO] Starting salary tool...
echo [INFO] Browser should open at http://127.0.0.1:5173
call npm run dev -- --host 127.0.0.1 --open

if errorlevel 1 (
  echo [ERROR] Startup failed. Check the log above.
  pause
  exit /b 1
)

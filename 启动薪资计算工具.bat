@echo off
setlocal

set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

where npm >nul 2>nul
if errorlevel 1 (
  echo [错误] 未检测到 npm，请先安装 Node.js。
  pause
  exit /b 1
)

if not exist "%PROJECT_DIR%package.json" (
  echo [错误] 当前目录不是有效项目目录：
  echo %PROJECT_DIR%
  pause
  exit /b 1
)

if not exist "%PROJECT_DIR%node_modules" (
  echo [信息] 首次启动，正在安装依赖...
  call npm install
  if errorlevel 1 (
    echo [错误] 依赖安装失败。
    pause
    exit /b 1
  )
)

echo [信息] 正在启动薪资计算工具...
echo [信息] 浏览器将自动打开 http://127.0.0.1:5173
call npm run dev -- --host 127.0.0.1 --open

if errorlevel 1 (
  echo [错误] 启动失败，请检查上方日志。
  pause
  exit /b 1
)

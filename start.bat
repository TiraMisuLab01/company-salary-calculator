@echo off
setlocal enabledelayedexpansion

echo.
echo  ┌─────────────────────────────────────────┐
echo  │   薪资分析工具 v1.0                  │
echo  │                                         │
echo  │   正在启动本地服务...                     │
echo  └─────────────────────────────────────────┘
echo.

set "APP_DIR=%~dp0"
cd /d "%APP_DIR%"

where node >nul 2>nul
if errorlevel 1 (
  echo [错误] 未检测到 Node.js，请先安装 Node.js
  echo 下载地址: https://nodejs.org/zh-cn/
  pause
  exit /b 1
)

start http://127.0.0.1:8080
node server.cjs
pause

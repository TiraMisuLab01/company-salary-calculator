<# 
  build-exe.ps1 - Builds salary tool into a distributable package
  Run from project root
#>

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

Write-Host "`n[1/3] Building production assets..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed" }

Write-Host "`n[2/3] Creating portable package..." -ForegroundColor Cyan

$pkgDir = Join-Path $root "salary-tool-portable"
Remove-Item -Recurse -Force $pkgDir -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $pkgDir -Force | Out-Null
Copy-Item (Join-Path $root "dist") -Destination (Join-Path $pkgDir "dist") -Recurse
Copy-Item (Join-Path $root "server.cjs") -Destination $pkgDir -Force
Copy-Item (Join-Path $root "start.bat") -Destination $pkgDir -Force

@"
岚图薪资分析工具 v1.0
====================

使用方式
-------
1. 确保已安装 Node.js (https://nodejs.org/zh-cn/)
2. 双击 start.bat
3. 浏览器会自动打开 http://127.0.0.1:8080

命令行启动
---------
node server.cjs

数据安全
-------
所有薪资数据仅存储在浏览器本地 IndexedDB 中
使用 Web Crypto 加密，不会上传到任何服务器

关闭
----
在终端窗口按 Ctrl+C 停止服务
"@ | Out-File -FilePath (Join-Path $pkgDir "使用说明.txt") -Encoding UTF8

Write-Host "`n[3/3] Packaging into ZIP..." -ForegroundColor Cyan
$zipPath = Join-Path $root "salary-tool-v1.0.zip"
Remove-Item -Force $zipPath -ErrorAction SilentlyContinue
Compress-Archive -Path "$pkgDir\*" -DestinationPath $zipPath -Force

Write-Host @"

=========================================================
  打包完成！

  文件夹:  $pkgDir
  ZIP文件: $zipPath

  分享方式:
    - 发送 salary-tool-v1.0.zip 给他人
    - 解压后双击 start.bat 即可使用
    - 需要安装 Node.js

  或使用桌面一键启动:
    - 将 salary-tool-portable 文件夹放在任意位置
    - 把 start.bat 发送到桌面快捷方式
=========================================================

"@ -ForegroundColor Green

# Clean up old artifacts
Remove-Item -Force (Join-Path $root "salary-tool-v1.0-exe.bat") -ErrorAction SilentlyContinue
Remove-Item -Force (Join-Path $root "install.sed") -ErrorAction SilentlyContinue

Write-Host "Done. Share salary-tool-v1.0.zip with others!" -ForegroundColor Green

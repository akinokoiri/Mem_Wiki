# 1. 自动检测 g:/DSmod/Mem-Wiki/public 目录，若不存在则创建
$publicDir = "g:/DSmod/Mem-Wiki/public"
if (-not (Test-Path -Path $publicDir)) {
    New-Item -ItemType Directory -Force -Path $publicDir
}

# 2. 将 png/icon_mem_ beast_mode.png 重命名为 png/icon_mem_beast_mode.png
$beastSrc = "g:/DSmod/Mem-Wiki/png/icon_mem_ beast_mode.png"
if (Test-Path -Path $beastSrc) {
    Rename-Item -Path $beastSrc -NewName "icon_mem_beast_mode.png" -Force
}

# 3. 将 png/icon_mem_ ghost_mode.png 重命名为 png/icon_mem_ghost_mode.png
$ghostSrc = "g:/DSmod/Mem-Wiki/png/icon_mem_ ghost_mode.png"
if (Test-Path -Path $ghostSrc) {
    Rename-Item -Path $ghostSrc -NewName "icon_mem_ghost_mode.png" -Force
}

# 4. 递归/全量将 g:/DSmod/Mem-Wiki/png/ 目录下所有的 .png 图片文件强力覆盖复制同步到静态资源库 g:/DSmod/Mem-Wiki/public/ 下
Copy-Item -Path "g:/DSmod/Mem-Wiki/png/*.png" -Destination $publicDir -Force

# 5. 打印输出 "资源重命名与同步拷贝已顺利完成！"
Write-Host "资源重命名与同步拷贝已顺利完成！"

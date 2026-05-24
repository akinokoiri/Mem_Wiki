# 项目深度清洗维护计划 (精密修订版)

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 彻底清除 MEM-WIKI 项目中所有经过交叉审计证实的 118 个冗余静态资源、历史废弃文档及临时测试脚本，以精简源码并方便托管发布，同时 100% 完好无损地保留技能树模拟器所需的交互切图。

**架构：** 使用 Node.js 的交叉审计逻辑与精细 Powershell 命令精准剔除闲置文件，在删除前后执行 `npm run docs:build` 确保打包 100% 成功。

**技术栈：** Powershell 命令, Node.js, VitePress

---

### 任务 1：静态图片资产精密无损精简

**文件：**
- 精密移除冗余切图：
  - `public/skills/office_icon/` 中的 27 个闲置 PNG
  - `public/skills/office_icon2/` 中的 90 个闲置 PNG
- 物理整包移除无用辅助资产：
  - `exp_PNG_or_Code/`
  - `png/`
- 移除闲置独立大图：
  - `public/box_item_1.png`
  - `public/icons/Eff_MagicCircle_A-0.png`
  - `public/mem_mound.png`

- [ ] **步骤 1：精密精简 office_icon 文件夹中不曾引用的 27 个废弃切图**

通过白名单匹配，精准剔除闲置 PNG，只保留 background, playerinfo_bg 等 16 个活跃交互切图：
```powershell
$keepIcon = @("background.png", "playerinfo_bg.png", "skilltree_backgroundart.png", "wilson_background_text.png", "tab_skills_unselected.png", "skill_icon_textbox.png", "frame.png", "frame_octagon.png", "locked.png", "selectable.png", "unselected.png", "selected.png", "unlocked.png")
Get-ChildItem -Path "g:/DSmod/Mem-Wiki/public/skills/office_icon" | Where-Object { $keepIcon -notcontains $_.Name } | Remove-Item -Force
```

- [ ] **步骤 2：精密精简 office_icon2 文件夹中不曾引用的 90 个废弃切图**

仅保留技能树组件引用的 button_carny_long_ 4 个核心状态按钮，强力剔除其他 90 个闲置切图：
```powershell
Get-ChildItem -Path "g:/DSmod/Mem-Wiki/public/skills/office_icon2" | Where-Object { $_.Name -notmatch "button_carny_long_(normal|hover|down|disabled)\.png" } | Remove-Item -Force
```

- [ ] **步骤 3：剔除 3 个独立闲置大图与早期参考/原图资产包**

运行 Powershell 命令删除：
```powershell
Remove-Item -Path "g:/DSmod/Mem-Wiki/public/box_item_1.png" -Force
Remove-Item -Path "g:/DSmod/Mem-Wiki/public/icons/Eff_MagicCircle_A-0.png" -Force
Remove-Item -Path "g:/DSmod/Mem-Wiki/public/mem_mound.png" -Force
Remove-Item -Path "g:/DSmod/Mem-Wiki/exp_PNG_or_Code" -Recurse -Force
Remove-Item -Path "g:/DSmod/Mem-Wiki/png" -Recurse -Force
```

- [ ] **步骤 4：验证静态文件剔除状态，确认核心切图完美留存**

运行验证命令：
```powershell
Test-Path "g:/DSmod/Mem-Wiki/public/skills/office_icon/background.png"
Test-Path "g:/DSmod/Mem-Wiki/public/skills/office_icon/fallbackbackground.png"
Test-Path "g:/DSmod/Mem-Wiki/public/skills/office_icon2/button_carny_long_normal.png"
Test-Path "g:/DSmod/Mem-Wiki/public/skills/office_icon2/status_health.png"
```
预期输出：`True`, `False`, `True`, `False` (表明活跃切图在，废弃切图已剔除)

---

### 任务 2：冗余文档与模板、测试脚本清除

**文件：**
- 删除：
  - `scratch/` (除了本审计文件 audit_resources.js 外，清理其他历史冗余脚本，或在最终清洗阶段一并删除)
  - `markdown-examples.md`
  - `api-examples.md`
  - `fix.js`
  - `check_png_sizes.js`
  - `update_locks.js`
  - `install.cmd`
  - `docs/` 下除 `superpowers/plans/2026-05-24-clean-project.md` 之外的所有冗余（包括 `docs/mechanics/core.md`、`docs/content-guidelines.md` 等）

- [ ] **步骤 1：清理冗余 Markdown 示例页面与临时脚本目录**

运行 Powershell 命令：
```powershell
Remove-Item -Path "g:/DSmod/Mem-Wiki/markdown-examples.md" -Force
Remove-Item -Path "g:/DSmod/Mem-Wiki/api-examples.md" -Force
```

- [ ] **步骤 2：清理已失效的开发单次修补脚本**

运行 Powershell 命令：
```powershell
Remove-Item -Path "g:/DSmod/Mem-Wiki/fix.js" -Force
Remove-Item -Path "g:/DSmod/Mem-Wiki/check_png_sizes.js" -Force
Remove-Item -Path "g:/DSmod/Mem-Wiki/update_locks.js" -Force
Remove-Item -Path "g:/DSmod/Mem-Wiki/install.cmd" -Force
```

- [ ] **步骤 3：对旧版 `docs` 目录进行安全精简**

清空 `docs` 根目录下的多余文档，只保留本维护计划书：
```powershell
Remove-Item -Path "g:/DSmod/Mem-Wiki/docs/content-guidelines.md" -Force
Remove-Item -Path "g:/DSmod/Mem-Wiki/docs/mechanics" -Recurse -Force
Remove-Item -Path "g:/DSmod/Mem-Wiki/docs/superpowers/specs" -Recurse -Force
Get-ChildItem -Path "g:/DSmod/Mem-Wiki/docs/superpowers/plans" | Where-Object { $_.Name -ne "2026-05-24-clean-project.md" } | Remove-Item -Force
```

- [ ] **步骤 4：验证文档与脚本的精简状态**

运行命令验证文件是否存在：
```powershell
Test-Path "g:/DSmod/Mem-Wiki/markdown-examples.md"
Test-Path "g:/DSmod/Mem-Wiki/fix.js"
```
预期输出：`False`, `False`

---

### 任务 3：生产构建安全性验证与交接

**文件：**
- 测试：项目整体构建编译

- [ ] **步骤 1：在精简后的环境里执行本地生产环境打包编译**

运行：`npm run docs:build`
预期：
```
✓ building client + server bundles...
✓ rendering pages...
build complete
```
并且未产生任何 `Missing image` 或者缺失文件的致命报错，技能树交互完全无损。

- [ ] **步骤 2：验证构建生成的 dist 目录是否完美保持了极简状态**

运行：`Test-Path "g:/DSmod/Mem-Wiki/.vitepress/dist"`
预期输出：`True`

- [ ] **步骤 3：Commit**

```bash
git add .
git commit -m "chore: perform precision cleaning of redundant assets, preserving referenced interactive cutouts"
```

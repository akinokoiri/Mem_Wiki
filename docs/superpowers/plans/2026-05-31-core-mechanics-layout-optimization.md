# 角色核心机制排版结构优化 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将《芒伊木》Wiki 的 `mechanics/core.md` 中“死亡复活惩罚”与“兽化形态”大段文字重构为基于 `item-card` 和 `item-sub-grid` 的双栏卡片网格布局，消除文字堆叠感，提升可读性。

**架构：**
1. 死亡复活惩罚封装于 `<div class="item-card">`，左侧为机制文案，右侧置入 `MediaCard` 指向 `/box_3.webp`。使用 `item-sub-grid` 将 3 项惩罚做子卡片（`sub-card`）展示。
2. 兽化形态封装于 `<div class="item-card">`，左侧为变身消耗、属性强化、装备代价、专属技能与技能树加成等，使用 `item-sub-grid` 划分为 4 张 `sub-card`。右侧置入 `MediaCard` 指向 `/box_1.webp`。
3. 整体效果在本地 dev 服务器编译后进行多端响应式验证。

**技术栈：** VitePress Markdown, HTML Custom Elements, HSL CSS Layouts.

---

### 任务 1：重构“死亡复活惩罚”小节

**文件：**
- 修改：`g:\DSmod\Mem-Wiki\mechanics\core.md` (修改 `### 死亡复活惩罚` 区域)

- [ ] **步骤 1：准备替换文案**
  将 `mechanics/core.md` 中的 `### 死亡复活惩罚` 区域（第 53-80 行左右）替换为卡片化 HTML + Markdown 结构。
  
  *原内容范围：*
  ```markdown
  ### 死亡复活惩罚
  <span class="heimu" title="游戏之外的幕后">这是一个纯粹为了所谓的“游戏平衡性”添加的设定，实际上在虚构层上非常牵强</span>

  <MediaCard 
    src="/box_3.webp" 
    caption="灵魂裂痕和`灵魂震荡叠加导致的三维上限损失\n具有澎湃心核的灵魂值边框出现些微变化" 
    width="320px"
  />

  ---
  1. [#复生虚弱]**复生虚弱**...
  ...
  ---
  ```

  *新替换内容：*
  ```html
  <div class="item-card">
  <div class="item-content">

  ### [#死亡复活惩罚]死亡复活惩罚
  <span class="heimu" title="游戏之外的幕后">这是一个纯粹为了所谓的“游戏平衡性”添加的设定，实际上在虚构层上非常牵强</span>

  任意复活手段将触发下述三项灵魂维度的重度减益（所有减益最低保留 25% 属性上限）：

  <div class="item-sub-grid">
  <div class="sub-card">

  #### [#复生虚弱]1. 复生虚弱 <DSTIcon icon="state" />
  任意复活后附加的 **永久** 负面状态。最高 3 层。
  - **属性减益**：持续期间 -20% 移速，每层 -25% 工作效率与攻击伤害，每 3 秒扣除 1% 最大血量。
  - **清除与递减机制**：
    - **死亡回归**：通过 [死亡回归] 复活直接清除所有层数。
    - **告密的心**：降低 1 层。若仅剩 1 层，永久状态改为**持续 60 秒**。
    - **暗影心房**：降低为 1 层且改为**持续 60 秒**；赋予自身 3 层 **[澎湃心核]**（每次复活虚弱改为持续 60 秒）。
    - **附身暗影心房**：降低为 1 层且改为**持续 30 秒**；赋予自身 **[永恒心核]**（复活时虚弱改为持续 30 秒，无限次）。
  - **递减规则**：多层时，倒计时结束只**下降 1 层**并重置倒计时（例如 3 层在永恒心核下需 90 秒清空）。
  </div>

  <div class="sub-card">

  #### [#灵魂震荡]2. 灵魂震荡 <DSTIcon icon="state" />
  若死亡地点和复活地点不一致，根据距离产生不同程度的惩罚。
  - **属性减益**：持续期间**无法恢复[灵魂值]**，且受到 **1%~225% 的三维上限惩罚**（随机分配至生命与理智，饱食度除外）。
  - **自动恢复**：每 5 秒自动恢复一部分损失的三维上限，直至完全恢复。
  - **技能免疫**：该状态可被 **[魂墙(技能)]** 直接免疫。
  </div>

  <div class="sub-card" style="grid-column: span 2;">

  #### [#灵魂裂痕]3. 灵魂裂痕 <DSTIcon icon="state" />
  每次复活失去 **25% [灵魂值]上限**。
  - **修补机制**：**[灵魂池]** 会以 1:1 的比例优先修补该裂痕。
  - **技能免疫**：该状态可被 **[落叶归根]** 技能直接免疫。
  </div>
  </div>

  </div>

  <MediaCard 
    src="/box_3.webp" 
    caption="灵魂裂痕与灵魂震荡叠加导致的三维上限损失\n具有澎湃心核的灵魂值边框出现些微变化" 
    width="320px"
    class="aside-push-60"
  />
  </div>
  ```

- [ ] **步骤 2：应用文件修改**
  使用代码替换工具，精确修改 `g:\DSmod\Mem-Wiki\mechanics\core.md`。

- [ ] **步骤 3：本地编译验证**
  运行：`npm run docs:dev`
  预期：VitePress 成功启动，打开 `http://localhost:5173/mechanics/core.html` 检查死亡惩罚卡片，确保无 Markdown 渲染错误、图片显示正常、双栏排版生效。

- [ ] **步骤 4：Commit 本步变更**
  运行：
  ```bash
  git add mechanics/core.md
  git commit -m "style(core): refactor death penalty section into card grid layout"
  ```

---

### 任务 2：重构“兽化形态 (狐狸)”小节

**文件：**
- 修改：`g:\DSmod\Mem-Wiki\mechanics\core.md` (修改 `### [#兽化]2. 兽化形态 (狐狸)` 区域)

- [ ] **步骤 1：准备替换文案**
  将 `mechanics/core.md` 中的 `### [#兽化]2. 兽化形态 (狐狸)` 区域（第 107-134 行左右）替换为卡片化 HTML + Markdown 结构。
  
  *原内容范围：*
  ```markdown
  ### [#兽化]2. 兽化形态 (狐狸)<DSTIcon icon="beast" />
  - **转换消耗**：...
  ...
  - 学习了[精准度“优化”]后，采集速度将获得大幅提升。
  ```

  *新替换内容：*
  ```html
  <div class="item-card">
  <div class="item-content">

  ### [#兽化]2. 兽化形态 (狐狸)<DSTIcon icon="beast" />

  芒伊木按下 `V` 键可变身为狐狸形态。拥有极强的机动性与空手作战/采集能力，但代价是极端的装备限制与食物消化负担。

  - **转换消耗**：进入扣除 **20% 饱食度**；退出扣除 **20% 理智值**。

  <div class="item-sub-grid">
  <div class="sub-card">

  #### 🦊 兽化数值强化
  - **空手撕咬**：1.0 攻击倍率，空手伤害 30，距离 +0.3，且空手攻速大幅提升（极限攻速达 2.5~3.75）。
  - **极速飞奔**：移动速度 +35%。
  - **生存抗性**：减伤 +65%，防水 +50%，保暖 +120（*夏天变为 -120 隔热*），潮湿度下降速率 -90%。
  - **自然惩罚**：饱食度消耗翻倍；自带 <DST icon="sanity">+3/60</DST> 理智值光环；会被猪人等中立生物视为怪物。
  </div>

  <div class="sub-card">

  #### ⚠️ 兽化局限与代价
  - **装备限制**：无法佩戴手部装备和绝大部分身体/头部遮耳装备。
    - *穿戴细则*：依然可穿戴背包、衬衫衣物以及开放型帽子（草帽/花冠等）。但<b>防御效果不会生效</b>且受击<b>不扣减耐久</b>。不过<code>启迪之冠</code>的小虚影协同、<code>铥矿皇冠</code>的无敌立场等<b>附加效果依然生效</b>。
  - **消化负担**：食物收益<b>减半</b>，但<b>免疫食物所有负面影响</b>（仅对基础三维生效，不影响<code>恐怖国王饼</code>替换效果或<code>深色花瓣茶</code>的理智扣减）。
  </div>

  <div class="sub-card">

  #### 🌪️ 专属形态技能
  - **跳跃 (`R` 键)** <DSTIcon icon="key" />：根据移速决定距离，跨越地形且期间霸体。静止时朝鼠标方向跳，距离不够不跳以防落海（可在设置调整）。
  - **捕猎 (`X` 键)** <DSTIcon icon="key" />：进入捕猎姿态抓小动物与飞虫（基础率 50%）。该姿态下 -60% 移速，40% 概率索敌被无视。
    - 姿态下，自身任何“降低敌人察觉范围”效果额外 +40%。
  - **藏食物** <DSTIcon icon="key" />：地挖坑埋食物。具有 **75% 盐盒级保鲜**，仅自己可取出。
    - 只能存当前鼠标食物，不可二次存。世界最多 4 坑，存在 1 天（兽化仅消耗 1 饱食度）。暴力破坏 25% 连食物消失。
  </div>

  <div class="sub-card">

  #### 🧬 技能树天赋加成
  学习对应技能树天赋后，兽化形态将获得以下质变：
  - **学习 [野兽体质]**：
    - 兽化下空手可进行绝大部分工作（砍伐/挖掘/砸/开采）。
    - 提升 [跳跃] 速度。
    - [藏食物] 刨坑存在时间<b>翻倍</b>（变为 2 天）。
  - **学习 [隐藏本能]**：
    - 不再被猪人视为怪物，不惊扰小动物。
    - [捕猎姿态] 的移速削弱从 -60% 缓和为 **-20%**。
  - **学习 [精准度“优化”]**：
    - 采集速度大幅提升。
  </div>
  </div>

  </div>

  <MediaCard 
    src="/box_1.webp" 
    caption="兽化下的极限攻速对比" 
    width="320px"
    class="aside-push-120"
  />
  </div>
  ```

- [ ] **步骤 2：应用文件修改**
  使用代码替换工具，精确修改 `g:\DSmod\Mem-Wiki\mechanics\core.md`。

- [ ] **步骤 3：本地编译验证**
  运行：`npm run docs:dev`
  预期：VitePress 成功启动，打开 `http://localhost:5173/mechanics/core.html#%E5%85%BD%E5%8C%96` 检查兽化卡片，确保无编译错误、双栏显示完美、右侧极限攻速 WebP 渲染正确。

- [ ] **步骤 4：Commit 本步变更**
  运行：
  ```bash
  git add mechanics/core.md
  git commit -m "style(core): refactor beast form section into card grid layout"
  ```

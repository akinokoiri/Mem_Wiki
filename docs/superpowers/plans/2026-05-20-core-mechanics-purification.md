# 核心机制文档净化与补全实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将 `_RAW_DATA_SOURCE.md` 的全部内容同步至 `docs/mechanics/core.md`，统一术语并应用属性/名词分级格式。

**架构：** 采用“读取-全量正则转换-精细排版”的流程。确保 `` `属性` `` 与 `[名词]` 的视觉分级 100% 覆盖。

**技术栈：** VitePress, Markdown, Regex

---

### 任务 1：建立净化规则与预处理

**文件：**
- 查阅：`_RAW_DATA_SOURCE.md`
- 修改：`docs/mechanics/core.md`

- [ ] **步骤 1：定义关键词映射表**
  - 属性类（包裹 `` ` ``）：生命值、理智值、理智值光环、饱食度、灵魂值、移动速度、攻击倍率、防水值、减伤倍率、绝热、潮湿度、位面伤害、位面防御。
  - 名词类（包裹 `[]`）：灵魂池、封印项圈、芒芒的尸体、死亡回归、再一次的机会、狐狸、兽化、怨灵、捕猎姿态、潜伏恐惧、灵魂震荡、复生虚弱、灵魂裂痕、暗影观察者、位面封锁。

- [ ] **步骤 2：执行全量术语统一**
  - 将 `血量` ➔ `生命值`
  - 将 `精神值` / `san值` ➔ `理智值`

- [ ] **步骤 3：Commit 预处理准备**

```bash
git commit -m "docs: define purification rules and prepare for content sync"
```

---

### 任务 2：重构“基础属性与常驻机制”板块

**文件：**
- 修改：`docs/mechanics/core.md`

- [ ] **步骤 1：同步并净化“灵魂值系统”**
  - 确保“灵魂池”被 `[]` 包裹。
  - 确保“生命值”、“灵魂值”被 `` ` `` 包裹。

- [ ] **步骤 2：补全“已死之人”复活算法**
  - 引入原稿中关于继承比例、尸体腐烂程度、最低 25% 保底的描述。
  - 应用排版规范。

- [ ] **步骤 3：同步“面具生物特殊联动”**
  - 将原稿中关于“被附身的尸体”和“夺舍”的内容移至“已死之人”章节末尾。

- [ ] **步骤 4：Commit 常驻机制补全**

```bash
git add docs/mechanics/core.md
git commit -m "docs: sync and purify core mechanics and resurrection details"
```

---

### 任务 3：重构“形态变化”与新增技能模块

**文件：**
- 修改：`docs/mechanics/core.md`

- [ ] **步骤 1：净化“狐狸（兽化）”数据列表**
  - 将原稿中的数值列表（移动速度、减伤等）统一包裹 `` ` ``。
  - 使用 `MediaCard` 或 `Details` 标签包装代价部分。

- [ ] **步骤 2：同步并净化“怨灵”与“双重共存”内容**
  - 确保“理智值”、“生命值”、“灵魂值”正确包裹 `` ` ``。

- [ ] **步骤 3：补全“藏食物”与“发射鬼火”机制**
  - 在形态章节后新增这两个特色能力的介绍。

- [ ] **步骤 4：Commit 最终重构版本**

```bash
git add docs/mechanics/core.md
git commit -m "docs: finalize core.md with full content sync and strict formatting"
```

---

### 任务 4：验证与清理

- [ ] **步骤 1：运行本地预览**
  - 运行 `npm run dev` 检查有无样式错乱或组件报错。

- [ ] **步骤 2：全文关键词扫描**
  - 搜索“血量”、“精神”、“san”，确保无残留。
  - 随机检查三个段落，确保属性词已包裹 `` ` ``。

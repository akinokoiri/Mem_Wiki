# 芒伊木 Wiki 名词自动 Icon 转换插件实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 构建一个极具健壮性的自定义 Markdown-it 插件，在 VitePress 编译期自动将 `[名词]`、`[**名词**]`、`**[名词]**` 安全解析为极具设计美感和微交互体验的 `<DST>` 组件，并重构核心文档为现代流线型排版。

**架构：**
1. 规范化重命名并同步 `png/` 目录下的所有 `icon_*.png` 到 `public/` 静态资源目录。
2. 升级 `DST.vue` 组件，建立完整的映射表与基于 Glassmorphism (毛玻璃) 和 HSL 渐变亮化的悬浮发光微交互。
3. 自定义 `markdown-it` AST 语法树遍历插件，拦截并重写 inline text 类型 token 节点，确保 100% 安全且支持后续的无缝超链地基。
4. 全新排版移植 `docs/mechanics/core.md`，实现流线型三态自适应卡片。

**技术栈：** Vue 3, VitePress, Markdown-it, Pure CSS

---

### 任务 1：资源规范化与自动同步

**文件：**
- 修改：新建并在本地执行一次一次性 PowerShell 脚本：`scratch/sync_resources.ps1`
- 目的：重命名带空格的图片并复制到静态资源文件夹下

- [ ] **步骤 1：创建并运行 PowerShell 同步脚本**

在 `scratch/sync_resources.ps1` 中编写：
```powershell
# 创建 public 目录（如果不存在）
if (-not (Test-Path "g:\DSmod\Mem-Wiki\public")) {
    New-Item -ItemType Directory -Path "g:\DSmod\Mem-Wiki\public"
}

# 重命名带有空格的两个重要图标
if (Test-Path "g:\DSmod\Mem-Wiki\png\icon_mem_ beast_mode.png") {
    Rename-Item -Path "g:\DSmod\Mem-Wiki\png\icon_mem_ beast_mode.png" -NewName "icon_mem_beast_mode.png" -Force
}
if (Test-Path "g:\DSmod\Mem-Wiki\png\icon_mem_ ghost_mode.png") {
    Rename-Item -Path "g:\DSmod\Mem-Wiki\png\icon_mem_ ghost_mode.png" -NewName "icon_mem_ghost_mode.png" -Force
}

# 复制 png 文件夹下的所有 png 文件到 public 文件夹下
Copy-Item -Path "g:\DSmod\Mem-Wiki\png\*.png" -Destination "g:\DSmod\Mem-Wiki\public" -Force
Write-Host "资源重命名与同步拷贝已顺利完成！"
```

- [ ] **步骤 2：执行同步脚本**

运行：
```powershell
powershell -ExecutionPolicy Bypass -File g:\DSmod\Mem-Wiki\scratch\sync_resources.ps1
```
预期：终端输出 "资源重命名与同步拷贝已顺利完成！"，且 `g:\DSmod\Mem-Wiki\public` 下生成了规范的图片资源。

- [ ] **步骤 3：Commit 资源规范化**

```bash
git add png/ public/
git commit -m "style: rename icon files and sync to public static folder"
```

---

### 任务 2：重构与升级 `DST.vue` 组件

**文件：**
- 修改：`g:\DSmod\Mem-Wiki\.vitepress\theme\components\DST.vue`

- [ ] **步骤 1：升级 `DST.vue` 脚本映射与现代毛玻璃外发光样式**

更新 `DST.vue` 为以下完整 drop-in 代码：
```vue
<template>
  <span class="dst-noun" :class="iconClass" :title="`模组词条: ${nounText}`">
    <img :src="withBase(iconSrc)" class="noun-icon" @error="handleImageError" />
    <slot></slot>
  </span>
</template>

<script setup>
import { computed, useSlots, ref } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  icon: String, // health, sanity, hunger, soul, beast, ghost, collar, etc.
})

const slots = useSlots()
const imageError = ref(false)

const nounText = computed(() => {
  if (slots.default) {
    return slots.default()[0]?.children || ''
  }
  return ''
})

const iconMap = {
  health: '/icon_health.png',
  sanity: '/icon_sanity.png',
  hunger: '/icon_hunger.png',
  soul: '/icon_soul.png',
  beast: '/icon_mem_beast_mode.png',
  ghost: '/icon_mem_ghost_mode.png',
  collar: '/icon_mem_xq.png',
  'collar-lv2': '/icon_mem_xq_lv2.png',
  'collar-lv3': '/icon_mem_xq_lv3.png',
  'collar-lv4-an': '/icon_mem_xq_lv4_an.png',
  'collar-lv4-yue': '/icon_mem_xq_lv4_yue.png',
  repair: '/icon_mem_repair.png',
  'tomb-upgrader': '/icon_mem_tomb_upgrader.png',
  corpse: '/icon_mem_corpse.png',
  'shadow-gestalt': '/icon_mem_shadow_gestalt.png',
  mod: '/icon_mod.png'
}

const iconSrc = computed(() => {
  if (imageError.value) {
    return '/icon_mod.png'
  }
  const iconKey = props.icon ? props.icon.toLowerCase().trim() : 'mod'
  return iconMap[iconKey] || '/icon_mod.png'
})

const iconClass = computed(() => `dst-${props.icon ? props.icon.toLowerCase().trim() : 'mod'}`)

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.dst-noun {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  padding: 2px 8px;
  margin: 0 4px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  cursor: help;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.noun-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  vertical-align: middle;
  transition: transform 0.25s ease;
}

/* 悬浮微动效与发光包边 */
.dst-noun:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1.5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.dst-noun:hover .noun-icon {
  transform: translateY(-1px) scale(1.1);
}

/* 基于 DST 经典的专属属性渐变色彩体系 */
.dst-health { 
  color: #ff4d4d; 
  border-color: rgba(255, 77, 77, 0.3);
}
.dst-health:hover {
  box-shadow: 0 0 12px rgba(255, 77, 77, 0.35);
  background: rgba(255, 77, 77, 0.08);
}

.dst-sanity { 
  color: #ffd633; 
  border-color: rgba(255, 214, 51, 0.3);
}
.dst-sanity:hover {
  box-shadow: 0 0 12px rgba(255, 214, 51, 0.35);
  background: rgba(255, 214, 51, 0.08);
}

.dst-hunger { 
  color: #ff9933; 
  border-color: rgba(255, 153, 51, 0.3);
}
.dst-hunger:hover {
  box-shadow: 0 0 12px rgba(255, 153, 51, 0.35);
  background: rgba(255, 153, 51, 0.08);
}

.dst-soul { 
  color: #c084fc; 
  border-color: rgba(192, 132, 252, 0.3);
}
.dst-soul:hover {
  box-shadow: 0 0 12px rgba(192, 132, 252, 0.35);
  background: rgba(192, 132, 252, 0.08);
}

.dst-beast { 
  color: #eab308; 
  border-color: rgba(234, 179, 8, 0.3);
}
.dst-beast:hover {
  box-shadow: 0 0 12px rgba(234, 179, 8, 0.35);
  background: rgba(234, 179, 8, 0.08);
}

.dst-ghost { 
  color: #94a3b8; 
  border-color: rgba(148, 163, 184, 0.3);
}
.dst-ghost:hover {
  box-shadow: 0 0 12px rgba(148, 163, 184, 0.35);
  background: rgba(148, 163, 184, 0.08);
}

/* 其它各种模组特有概念颜色统一收口 */
.dst-mod {
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.3);
}
.dst-mod:hover {
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
  background: rgba(56, 189, 248, 0.08);
}

/* 特殊封印项圈系列 */
.dst-collar, .dst-collar-lv2, .dst-collar-lv3, .dst-collar-lv4-an, .dst-collar-lv4-yue {
  color: #06b6d4;
  border-color: rgba(6, 182, 212, 0.3);
}
.dst-collar:hover, .dst-collar-lv2:hover, .dst-collar-lv3:hover, .dst-collar-lv4-an:hover, .dst-collar-lv4-yue:hover {
  box-shadow: 0 0 12px rgba(6, 182, 212, 0.35);
  background: rgba(6, 182, 212, 0.08);
}
</style>
```

- [ ] **步骤 2:: Commit `DST.vue` 升级**

```bash
git add .vitepress/theme/components/DST.vue
git commit -m "feat: upgrade DST.vue component with custom styles, map, and animations"
```

---

### 任务 3：在 VitePress 中实现自定义 Markdown-it 名词翻译插件

**文件：**
- 修改：`g:\DSmod\Mem-Wiki\.vitepress\config.mjs`

- [ ] **步骤 1：在 `config.mjs` 中注册健壮的 AST 语法树拦截规则**

将 `config.mjs` 修改为：
```javascript
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "芒伊木 Wiki",
  description: "饥荒：联机版 芒伊木模组全效果说明书",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/mechanics/core' }
    ],

    sidebar: [
      {
        text: '芒伊木 Wiki 词条',
        collapsed: false,
        items: [
          { text: '一、基础属性与常驻机制', link: '/mechanics/core' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    outline: {
      label: '本页导航',
      level: [2, 3]
    },
    
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },

  // 自定义 Markdown 编译器行为
  markdown: {
    config: (md) => {
      md.core.ruler.after('block', 'dst-noun-autolink-plugin', (state) => {
        // 核心正则：匹配 [名词]、[**名词**]、**[名词]** 并过滤 [文字](url)
        const regex = /(?:\*\*)?\[(\*?\*?)([^\]]+?)\1\](?:\*\*)?(?!\()/g;
        
        const nounMap = {
          '生命值': 'health',
          '饱食度': 'hunger',
          '理智值': 'sanity',
          '精神值': 'sanity',
          '灵魂值': 'soul',
          '灵魂池': 'soul',
          '狐狸': 'beast',
          '兽化': 'beast',
          '怨灵': 'ghost',
          '已死之人': 'ghost',
          '尸体': 'corpse',
          '芒芒的尸体': 'corpse',
          '封印项圈': 'collar',
          '封印项圈lv1': 'collar',
          '封印项圈lv2': 'collar-lv2',
          '封印项圈lv3': 'collar-lv3',
          '封印项圈lv4·暗': 'collar-lv4-an',
          '暗项圈': 'collar-lv4-an',
          '封印项圈lv4·月': 'collar-lv4-yue',
          '月项圈': 'collar-lv4-yue',
          '芒式修补工具': 'repair',
          '尸体防腐核心': 'tomb-upgrader',
          '暗影观察者': 'shadow-gestalt'
        };

        state.tokens.forEach(token => {
          if (token.type === 'inline') {
            let newChildren = [];
            token.children.forEach(child => {
              if (child.type === 'text') {
                let text = child.content;
                let lastIndex = 0;
                let match;
                regex.lastIndex = 0;
                
                let matches = [];
                while ((match = regex.exec(text)) !== null) {
                  matches.push(match);
                }
                
                if (matches.length > 0) {
                  matches.forEach(m => {
                    const startIndex = m.index;
                    const endIndex = regex.lastIndex;
                    
                    // 匹配前的普通文本
                    if (startIndex > lastIndex) {
                      const textToken = new state.Token('text', '', 0);
                      textToken.content = text.slice(lastIndex, startIndex);
                      newChildren.push(textToken);
                    }
                    
                    // DST 名词 Token 注入
                    const noun = m[2].trim();
                    const lowerNoun = noun.toLowerCase();
                    const key = nounMap[lowerNoun] || nounMap[noun] || 'mod';
                    
                    const htmlToken = new state.Token('html_inline', '', 0);
                    htmlToken.content = `<DST icon="${key}">${noun}</DST>`;
                    newChildren.push(htmlToken);
                    
                    lastIndex = endIndex;
                  });
                  
                  // 匹配后的剩余文本
                  if (lastIndex < text.length) {
                    const textToken = new state.Token('text', '', 0);
                    textToken.content = text.slice(lastIndex);
                    newChildren.push(textToken);
                  }
                } else {
                  newChildren.push(child);
                }
              } else {
                newChildren.push(child);
              }
            });
            token.children = newChildren;
          }
        });
      });
    }
  }
})
```

- [ ] **步骤 2：Commit 编译器配置变更**

```bash
git add .vitepress/config.mjs
git commit -m "feat: implement custom markdown-it plugin in VitePress config for noun icon matching"
```

---

### 任务 4：重构并排版一号板块“基础属性与常驻机制”

**文件：**
- 修改：`g:\DSmod\Mem-Wiki\docs\mechanics\core.md`

- [ ] **步骤 1：重构并排版 `docs/mechanics/core.md`**

将 `core.md` 完全重写为以下精美的一版内容：
```markdown
# 一、 基础属性与常驻机制

<Infobox 
  title="芒伊木 (常态人类)"
  image="/mem_card.png"
  :stats="[
    { label: '生命值', value: '75', icon: '/icon_health.png' },
    { label: '理智值', value: '200', icon: '/icon_sanity.png' },
    { label: '饱食度', value: '150', icon: '/icon_hunger.png' },
    { label: '灵魂值', value: '150', icon: '/icon_soul.png' }
  ]"
  :details="[
    { label: '代码名', value: 'mem' },
    { label: '攻击倍率', value: '0.5' },
    { label: '常驻状态', value: '初始携带 [封印项圈Lv1]' }
  ]"
/>

在《芒伊木》模组中，她是一名独具机制、在各种形态间不断游走与博弈的独特角色。本章将为你解构她的三维核心、常驻的暗影与复活惩罚机制。

---

## 核心状态与常驻机制

### 灵魂值系统
[芒伊木]拥有独有的 [灵魂值] 属性。这是她释放技能、维持生命和跨形态博弈的核心资源。
* **溢出转化**：当 [生命值] 处于满状态时，溢出治疗量的 15% 将汇入 [**灵魂池**]。
* **灵魂池充能**：[灵魂池] 中积蓄的能量会缓慢转化为实际的 [灵魂值]。池中能量越多，转化速度越快（最高约每秒恢复 1 点 [灵魂值]）。
* **战后疗愈**：脱战状态下，每秒将持续消耗 2 点 [灵魂值] 恢复 1 点 [生命值]。

### 暗影亲和与反噬
常态下自带 [**暗影亲和**] 特性，能听懂影怪低语。但过低的理智同样伴随巨大的反噬：
* **暗影判定**：当 [理智值] 低于 50% 时，每 15 ~ 30 秒有 40% 的概率 **嘲讽** 周围 20 码范围内的所有生物。
* **恐惧潜伏**：每次判定失败时，均有 10% 的概率在 [芒伊木] 附近凭空生成一个 [潜伏恐惧]。

### 畏惧黑暗
* **压力累积**：身处 **夜晚或洞穴** 中，会持续积累隐藏的压力值。
* **幻听产生**：压力值过高且处于完全黑暗中，且当前世界没有被 [**位面封锁**] 时，玩家将遭受强烈的幻听与幻觉干扰。

---

## 已死之人与复活博弈

[芒伊木]死亡后会当场留下一个 [**芒芒的尸体**]。她可以随时以鬼魂姿态作祟该尸体复活。

<MediaCard 
  title="鬼魂特殊强化" 
  image="/icon_mem_ghost_mode.png" 
  desc="虽然死亡惩罚高昂，但鬼魂状态下的芒伊木拥有极其卓越的探索性能。鬼魂速度提升 200%，且能够直接探开未查明的地图阴影迷雾。" 
/>

### ⚠️ 复活惩罚机制
为了在玩法上形成对等制约，任意复活手段复活后均会扣减为三维上限的 25%，并施加严重的负面状态：

1. **[复生虚弱]**：
   * 持续期间内 **无法恢复 [灵魂值]**。
   * 移动速度扣减 20%。
   * 期间再次死亡会叠加层数（最高 3 层），每层使攻击与工作效率骤减 25%，并每 2 秒扣减 1% [生命值]。
   * 仅能被特殊的 [死亡回归] 状态清除。
2. **[灵魂震荡]**：
   * 无法恢复 [灵魂值]，根据死复点距离，灵魂、生命和理智上限将受到 1% ~ 225% 的随机扣减（各项最低保底留存 25%）。
   * 每 5 秒恢复 2.5% 失去的上限，完全恢复后自动移除。
3. **[灵魂裂痕]**：
   * 每次复活损失 25% 的 [灵魂值] 上限。
   * 无持续时间限制，必须依靠 [灵魂池] 缓慢消耗能量进行 1:1 的上限修补。

### 🔄 死亡与复活相关技能
* **[死亡回归]**：在鬼魂状态下按下 `X` 键，可进入 10 秒的 **死亡回归** 状态。此时作祟 [芒芒的尸体] 复活可豁免 [复生虚弱] 状态，且三维保底恢复度提升至 50%，并赋予极强增益 [再一次的机会]。冷却 7 天。
* **主动解脱**：活着时按 `C` 键可主动自裁，以此方式死亡后复活不会产生 [复生虚弱]，且身上的物品不会掉落。

---

## 三重形态：人类 / [狐狸] / [怨灵]

[芒伊木]拥有截然不同的三重形态博弈线，常态为 **人类**。

````carousel
### 🦊 [狐狸] (兽化状态)
通过按 `V` 键可在人类与兽化形态间切换。

**⚖️ 代价与收益**：
* 状态转换时立即扣减 20% [饱食度]（变身）与 20% [理智值]（退出）。
* **空手爪击**：无法使用手部武器、护甲防御归零、且食物受益减半，但极限攻速飙升至 2.5 ~ 3.75，空手伤害为 30。
* **环境增益**：+35% 移速、+65% 自然减伤、+50% 防水，自带强大的御寒/隔热属性及正向精神恢复光环。被中立生物视为怪物。
* **[捕猎姿态]**：按 `X` 键降低 60% 移速进入捕猎，可空手捕捉飞虫及小动物，捕猎时可让敌人有 40% 概率无法察觉自己。
<!-- slide -->
### 👻 [怨灵] 状态
脱下 [封印项圈] 后，会强制唤醒怨灵姿态（兽化与怨灵状态可共存）。

**🩸 战斗狂热与反噬**：
* 脱下项圈时立即扣除 20% [生命值]（不致死）。
* 基础物理攻击倍率增加（理智越低攻击越高，0% 理智时达到 1.5 倍）。同时理智越低受到的伤害同样高达 1.5 倍。
* 自带每秒 1 点的高额扣除理智光环，并被中立生物视为怪物。
* **战斗治愈**：每次命中敌人，消耗 1 点 [灵魂值] 恢复 1 点 [生命值]。若灵魂值不足则扣除双倍精神，精神不足则直接扣减生命（可致死）。
<!-- slide -->
### 🔮 兽化与怨灵双重共存
当处于双重姿态共存下时，将释放她最强横的潜能：

* 空手攻击每次额外附加高达 **10 点的位面伤害**。
* **暗影观察者**：当 [理智值] 降低至 60% 以下时，屏幕周围将产生极其迷离恐怖的 [暗影观察者] 视效。可通过佩戴特殊的暗影防具加以免疫。
````
```

- [ ] **步骤 2：Commit 核心内容重构**

```bash
git add docs/mechanics/core.md
git commit -m "docs: fully revamp core.md with high-quality layouts, cards, carousels, and noun tags"
```

---

### 任务 5：验证与构建测试

**文件：**
- 运行：本地构建测试命令

- [ ] **步骤 1：本地启动开发服务器验证页面解析**

运行：
```bash
npm run dev
```
预期：本地 VitePress 启动成功，点击“快速开始”页面加载完美，所有用 `[名词]` 括起来的部分都已正确解析为带有对应精致 Icon 的漂亮小包边卡片，且没有产生任何编译错误。

- [ ] **步骤 2：项目完整生产构建验证**

运行：
```bash
npx vitepress build
```
预期：编译以 0 error 顺利通过，生成的 HTML 结构 100% 正确。

---
pageClass: ink-archive archive-statuses
title: 状态与机制
description: 月光灼烧、魂魄刻印、闪耀刻印、复活惩罚、食物增益与状态栏模式的完整说明。
outline: [2, 3]
prev:
  text: 敌人与随从
  link: /mechanics/enemies
next:
  text: 技能树
  link: /mechanics/skilltree
---

<div class="archive-eyebrow">状态档案 <span>04 / 效果与联动</span></div>

# 状态与机制

这里收录状态的效果、持续时间、叠加与解除规则。触发它们的攻击、食物、装备和操作，可从各条目的来源链接查看。正文中的词条支持悬停预览；手机点按词条可先阅读摘要，再选择查看详情。

<nav class="archive-index" aria-label="状态分类">

- [战斗状态](#战斗状态) 灼烧、降格、刻印与电锯连击
- [死亡与复活](#死亡与复活) 震荡、裂痕与完美复活
- [食物与阵营](#食物与阵营) 食物中毒、料理增益与阵营协同
- [形态与随从](#形态与随从) 兽化、怨灵、分头与随从状态
- [冷却与封锁](#冷却与封锁) 死亡回归、留花与世界封锁
- [原版机制](#原版机制) 伤害、催眠、索敌、理智与暗影等级

</nav>

## 战斗状态

<section class="status-entry">

### [#月光灼烧]月光灼烧

<MediaCard position="right" manual src="/videos/lunar-burning-damage.webm" caption="月光灼烧的伤害" width="160px" :intrinsic-width="80" :intrinsic-height="104" />

持续 **3 秒**，基础伤害速率为 **10 点/秒**，实际按 **0.2 秒**间隔结算（未计减伤时约 **2 点/次**）。目标实际受到的[月能灼烧伤害]还受月亮阵营减伤与位面防御影响；洞穴中减半。

- **玩家**：持续施加[极限催眠]，状态移除时清空催眠值。
- **非玩家生物**：移动速度 **−40%**；可恐慌的生物持续恐慌，部分暗影生物也会进入恐慌。
- **理智恢复**：具有理智值的目标，每 **0.2 秒恢复 3 点理智值**。
- **再次施加**：重新计算伤害并刷新为 **3 秒**，不累加独立的灼烧层数。

来源：[芒伊月]的[虚影侵蚀区]、[月能激光]、部分近战攻击，以及[敌意虚影·启迪]等。各招式的触发范围与概率见[芒伊月战斗](/mechanics/enemies#def-芒伊月)。

</section>

<section class="status-entry">

### [#位面实体降格]位面实体降格

<MediaCard position="right" manual src="/videos/planar-downgrade-effect.webm" caption="位面实体降格特效" width="240px" :intrinsic-width="320" :intrinsic-height="280" />

持续 **12 秒**；目标自身与装备的总位面防御 **≥20** 时，持续 **18 秒**。再次施加刷新持续时间。

- **有位面实体抵抗**：失去位面实体对非位面物理攻击的减伤效果。
- **没有位面实体抵抗**：受到的战斗伤害 **+20%**。
- **非玩家生物**：施加 **3 秒**恐慌／暗影恐慌。
- **芒伊月的额外影响**：禁用荆棘甲、亮茄盔甲、荆棘茄甲的反伤；禁用 W.A.R.B.I.S.盔甲、月光龙鳞甲的充能，受到恢复效果减半。
- **位面实体涟漪**：芒伊月及其友善随从命中其他目标时，可移除自身降格并传播给周围目标。两者的传播对象见[敌人与随从](/mechanics/enemies#位面实体涟漪)。

来源：[天基激光]、[敌意虚影·启迪]等。

</section>

<section class="status-entry">

### [#魂魄刻印]魂魄刻印

<MediaCard position="right" manual src="/mechanics/soul-mark-vfx.png" caption="魂魄刻印特效" width="200px" :intrinsic-width="204" :intrinsic-height="247" />

叠加在目标身上的状态，可由造成伤害的[鬼火]引爆。

<dl class="imprint-facts">
<div><dt>层数上限</dt><dd>10 层</dd></div>
<div><dt>衰减等待</dt><dd>6 秒</dd></div>
<div><dt>衰减速度</dt><dd>1 层/秒</dd></div>
</dl>

#### 叠层与引爆

- **层数衰减**：6 秒内没有增加或刷新层数，便开始每秒减少 1 层。
- **引爆方式**：受到可造成伤害的[鬼火]攻击时，引爆并消耗全部层数。鬼火的**发射者**视为**引爆者**。
- **不能引爆的特效**：[分头行动]、[意识转移]或开启[刻印形态]时产生的鬼火特效不具备引爆能力；其余所有可造成伤害的鬼火均可引爆。

下文的「层数」均指本次引爆消耗的刻印层数，属性数值均取自**引爆者**。

#### 引爆伤害

先根据引爆者是否拥有[灵魂值系统]，计算基础伤害。无灵魂值系统的生物包括[荒尹沐]、[友善的荒尹沐]、[友善的芒伊月]等。

<div class="imprint-recovery">
<section aria-labelledby="soul-mark-soul-damage">

<p id="soul-mark-soul-damage" class="imprint-label">有灵魂值系统 → 基础伤害</p>

<p class="imprint-equation"><span class="formula-factor">已损失<DST icon="soul">灵魂值</DST></span> <span class="formula-factor"><span class="formula-operator">×</span> 层数</span> <span class="formula-factor"><span class="formula-operator">×</span> <strong>20%</strong></span></p>

</section>
<section aria-labelledby="soul-mark-health-damage">

<p id="soul-mark-health-damage" class="imprint-label">无灵魂值系统 → 基础伤害</p>

<p class="imprint-equation"><span class="formula-factor">已损失<DST icon="health">生命值</DST></span> <span class="formula-factor"><span class="formula-operator">×</span> 层数</span> <span class="formula-factor"><span class="formula-operator">×</span> <strong>2%</strong></span></p>

</section>
</div>

再根据本次引爆的层数，追加固定伤害：

<table class="imprint-bonus-table">
<thead><tr><th scope="col">引爆层数</th><th scope="col">额外固定伤害</th></tr></thead>
<tbody>
<tr><td>1～4 层</td><td>不增加</td></tr>
<tr><td>5～9 层</td><td><strong>+5</strong></td></tr>
<tr><td>10 层</td><td><strong>+15</strong></td></tr>
</tbody>
</table>

**引爆伤害 = 基础伤害 + 层数加成。** 10 层时的加成为 +15，不与 +5 叠加。

以上为默认系数，可在[模组设置：灵魂与刻印](/mechanics/settings#灵魂与刻印)中分别调整。生命系数默认 **0.02**，不会被难度预设改写；它同时影响 Boss 与友善随从等无灵魂值系统的引爆者。

#### 击杀恢复

仅当**本次引爆伤害击杀目标**时，立即恢复引爆者的相应属性：

<div class="imprint-recovery">
<section aria-labelledby="soul-mark-soul-refund">

<p id="soul-mark-soul-refund" class="imprint-label">有灵魂值系统 → 恢复灵魂值</p>

<p class="imprint-equation"><span class="formula-factor">单次刻印消耗</span> <span class="formula-factor"><span class="formula-operator">×</span> 层数</span> <span class="formula-factor"><span class="formula-operator">×</span> <strong>2</strong></span></p>

</section>
<section aria-labelledby="soul-mark-health-refund">

<p id="soul-mark-health-refund" class="imprint-label">无灵魂值系统 → 恢复生命值</p>

<p class="imprint-equation"><span class="formula-factor"><DST icon="health">生命值</DST>上限</span> <span class="formula-factor"><span class="formula-operator">×</span> 层数</span> <span class="formula-factor"><span class="formula-operator">×</span> <strong>2%</strong></span></p>

</section>
</div>

「**单次刻印消耗**」指[刻印形态]下每次攻击消耗的[灵魂值]，这个数值由玩家的**模组设置**决定。

#### 升级效果

- **位面升级**：引爆的伤害形式与效果改为**位面伤害**。
- **光照升级**：学习[彼世的光芒]后，[魂魄刻印]会产生小范围光照。
- **引爆增益**：学习[灵魂实体专精]后，引爆[魂魄刻印]还会额外获得[闪耀刻印]。

</section>

<section class="status-entry">

### [#闪耀刻印]闪耀刻印

<section class="imprint-reference">

拥有已生效的[灵魂实体专精]，或属于荒尹沐阵营的引爆者，在引爆[魂魄刻印]后获得同等层数的闪耀刻印。再次获得累加层数并刷新 **10 秒**；超过 10 层的部分直接进入恢复结算。

<dl class="imprint-facts">
<div><dt>层数上限</dt><dd>10 层</dd></div>
<div><dt>持续时间</dt><dd>10 秒</dd></div>
<div><dt>每层闪避</dt><dd>5% <small>最高 50%</small></dd></div>
</dl>

#### 基础效果 {#基础与技能效果}

以下效果均为刻印自带，**无需学习技能**：

<MediaCard position="right" manual src="/mechanics/shining-mark-evasion-vfx.png" caption="闪耀刻印触发效果时的特效" width="200px" :intrinsic-width="364" :intrinsic-height="368" />

- **闪避攻击**：每层提供 **5%** 闪避概率；成功闪避后，剩余层数减半并向下取整，1 层时会清空。
- **维持轰鸣**：持续期间，[电锯轰鸣]不会因时间流逝而损失层数。

#### 恢复结算 · 灵魂实体专精三级 {#三级恢复结算}

学习[灵魂实体专精]三级后，刻印**自然结束**或**层数溢出**时结算恢复；溢出部分直接结算。[荒尹沐]及其衍生物均视为具有满级灵魂实体专精。

<div class="imprint-recovery">
<section aria-labelledby="imprint-soul-recovery">

<p id="imprint-soul-recovery" class="imprint-label">有灵魂值系统 → 恢复灵魂值</p>

<p class="imprint-equation">每层刻印消耗 × 结算层数</p>

| 结算层数 | 额外恢复 |
| :--- | :--- |
| 5～9 层 | 最大灵魂值的 **5%** |
| ≥ 10 层 | 最大灵魂值的 **10%** |

「每层刻印消耗」指[刻印形态]下每次攻击消耗的[灵魂值]，随玩家的**设置**变化。

</section>
<section aria-labelledby="imprint-health-recovery">

<p id="imprint-health-recovery" class="imprint-label">无灵魂值系统 → 恢复生命值</p>

<p class="imprint-equation">引爆者生命值上限 × 结算层数 × 0.5%</p>

| 结算层数 | 额外恢复 |
| :--- | :--- |
| 5～9 层 | 引爆者生命值上限的 **3%** |
| ≥ 10 层 | 引爆者生命值上限的 **5%** |

适用于[荒尹沐]、[友善的荒尹沐]、[友善的芒伊月]等无灵魂值系统的生物。

</section>
</div>

#### 技能与分身联动 {#彼世的光芒与分身}

<dl class="imprint-links">
<div><dt>彼世的光芒</dt><dd>

学习[彼世的光芒]后，受击随机获得 **1～5 层**刻印；拥有任意层数时，有发光鬼火附身。成功闪避消耗的层数会转为攻击者身上的[魂魄刻印]。

</dd></div>
<div><dt>分身继承</dt><dd>

上述彼世的光芒效果同样作用于[分头行动]／[意识转移]产生的分身。分身在刻印持续期间消失时，剩余刻印转移到玩家，持续时间取双方剩余时间中较长的一方；学习灵魂实体专精三级后，分身的恢复效果也反馈到玩家。

</dd></div>
</dl>

</section>

</section>

<section class="status-entry">

### [#电锯轰鸣]电锯轰鸣

给予[电锯惊魂]纯粹恐惧后开启的限时连击状态，可与[刻印形态]共存。

| 电锯条件 | 每个纯粹恐惧增加时长 | 剩余时间上限 |
| :--- | ---: | ---: |
| 未进行轰鸣升级 | 60 秒 | 180 秒 |
| 已进行轰鸣升级 | 120 秒 | 360 秒 |

- **连击增伤**：每次命中增加 **1 层**，没有层数上限，每层增加 **1 点物理伤害**。电锯获得先驱者升级后，连击增伤改为位面伤害。
- **停手衰减**：至少 **1 秒**未命中后，按每秒 **1、2、3……层**逐步加快扣除。再次命中重置衰减速度。
- **受击损失**：持有者受击时，连击层数减半，剩余层数向下取整。
- **闪耀刻印联动**：持有者有[闪耀刻印]时，暂停因时间流逝造成的层数衰减；轰鸣的总持续时间仍会消耗。
- **结束与装备**：状态随这把电锯计时；卸下只移除状态栏提示，计时仍继续。时间耗尽会清空连击。
- **升级修复**：轰鸣升级后，给予纯粹恐惧还会修复 **44 点耐久**。

开启方式、制作与升级材料见[电锯升级](/mechanics/items#电锯升级)。

</section>

## 死亡与复活

<section class="status-entry">

### [#灵魂震荡]灵魂震荡

<MediaCard position="right" manual src="/videos/soul-shock-shadow-heart-cure.webm" caption="使用暗影心房解除灵魂震荡" width="220px" :intrinsic-width="640" :intrinsic-height="704" />

<p class="archive-rule-summary"><span>生命 · 理智 · 灵魂上限</span><span>单次新增 <strong>125%</strong></span><span>累计最高 <strong>225%</strong></span><span>每项保底 <strong>25%</strong></span></p>

<p class="archive-rule-note">125%／225% 是生命、理智、灵魂三项合计的惩罚总量，不是每项各扣，也没有层数。</p>

<div class="archive-rules">

- **触发** 因非[灵魂出窍]的原因死亡并复活时，新增 **125%** 的三维上限惩罚总量。不再按死亡点与复活点的距离计算。
- **出窍与例外** [灵魂出窍]不新增震荡，但历史残余仍会带入下一次复活。[死亡回归]期间的完美复活免除本次并清除历史震荡；从[芒芒的坟墓]复活不新增本次震荡。
- **累计** 没有层数。死亡前尚未恢复的部分带入下一次复活，与新惩罚合计最高 **225%**。
- **分配** 随机分配到`生命值`、`理智值`、[灵魂值]；每项最低保留 **25% 上限**。已有上限惩罚会占用可分配空间。
- **期间效果** 移动速度、攻击倍率、作业效率均 **−20%**。[灵魂值]与[灵魂池]接收/恢复受阻，也不能通过被动消耗灵魂回血。
- **自动恢复** 每 **5 秒**，三项各自恢复最多 **2.5 个百分点**的震荡惩罚，直至清除。已生效的[魂墙(技能)]使恢复速率 **+100%**，即各自最多恢复 **5 个百分点**；不再免疫震荡。
- **食物解除** 食用`告密的心`清空震荡；`暗影心房`、`附身暗影心房`还会回满当前可用上限内的生命、理智和灵魂。它们均不直接清除[灵魂裂痕]，心房额外加入的[灵魂池]资源可继续修补裂痕。

</div>

</section>

<section class="status-entry">

### [#灵魂裂痕]灵魂裂痕

<p class="archive-rule-summary"><span>灵魂值上限</span><span>脱战出窍 <strong>5%</strong></span><span>其他死亡 <strong>25%</strong></span><span>累计最多 <strong>75%</strong>（保底 <strong>25%</strong>）</span></p>

<div class="archive-rules">

- **脱战出窍** 脱离战斗后使用[灵魂出窍]，本次[灵魂值]上限惩罚为 **5%**。
- **其他死亡** 战斗中使用[灵魂出窍]，或因其他方式死亡，本次惩罚为 **25%**。
- **累计上限** 最多扣除 **75%** [灵魂值]上限，最低保留 **25%**。这是上限损失，不是直接扣除同量当前灵魂值。
- **修补** [灵魂池]以 **1∶1** 的比例优先修补裂痕；[灵魂震荡]期间池内恢复受阻。
- **技能免疫** 已生效的[魂墙(技能)]仅免疫死亡与复活造成的裂痕，不免疫制作[芒芒的尸体]造成的[灵魂值]上限损失；[落叶归根]不再提供此免疫。

</div>

</section>

<section class="status-entry">

### [#完美复活][#再一次的机会]再一次的机会

[死亡回归]期间复活后获得，也称完美复活。复活时清除本次与历史[灵魂震荡]，并使[最低三维比例] **+25%**。

- **前 10 秒**：被敌人察觉范围缩小至 **5 码**；每秒自动拾取附近掉落物并尝试穿戴，背包优先。
- **全程 30 秒**：移动速度 **+30%**，提供照明，低理智[嘲讽]失效。
- **联动**：降低被察觉范围的效果可由[捕猎姿态]进一步强化。
- **结束**：移除移速、隐蔽、照明与拾取增益；死亡也会解除此状态。

发动与复活操作见[死亡回归](/mechanics/core#def-死亡回归)。

</section>

## 食物与阵营

<section class="status-entry">

### [#食物中毒]食物中毒

[兽化]时，食用有基础三维负面影响的食物有 **10%** 概率中毒；蘑菇类无论是否烤熟、是否带有负面效果，都有 **20%** 概率中毒。

<div class="archive-illustrated archive-status">

<MediaCard src="/videos/swzd_web.webm" caption="食物中毒：天旋地转滤镜（其中一种表现）" width="280px" :manual="true" :intrinsic-width="757" :intrinsic-height="426" />

<div class="archive-copy">



随机触发以下一种效果，持续 **10 秒**：<DST icon="hunger">饱食度 −2/s</DST>、<DST icon="sanity">理智值 −2/s</DST> 或 <DST icon="health">生命值 −1/s</DST>。

- **再次触发**：刷新当前状态的倒计时。
- **催眠**：持续期间施加[极限催眠]；状态结束后清空催眠值。
- **其他表现**：触发时有 **40%** 概率出现天旋地转的视野滤镜；若触发的是饱食度效果，结束时有 **40%** 概率在原地留下一坨便便。

</div>
</div>

</section>

<section class="status-entry">

### [#体温恒定]体温恒定

食用[热心肠血冻]获得，持续 **300 秒**。期间体温限制在 **20～50 度**，状态结束后恢复原有温度范围。

再次食用刷新至 **300 秒**。状态栏倒计时可能提前结束，实际效果持续 300 秒。

</section>

<section class="status-entry">

### [#暗影臣民]暗影臣民

食用[凉拌脑花]获得，持续 **300 秒**。

- 获得暗影支配能力，使相关暗影生物保持中立，并免疫[暗影观察者]。
- **持续降低理智**：每秒损失 **1 点理智值（每分钟 60 点）**，属于[理智值修正]，不受蜂后帽反转负面光环的效果影响。
- 再次食用刷新时间；结束时移除对应标签与理智修正。

状态栏倒计时可能提前结束，实际效果持续 **300 秒**。

</section>

<section class="status-entry">

### [#强壮搬运]强壮搬运

食用[星期四特惠套餐]获得，持续 **480 秒（1 天）**。搬运重物时免除重物造成的移速惩罚。再次食用刷新时间，结束后恢复通常的重物减速。

</section>

<section class="status-entry">

### [#工作高效]工作高效

食用[红烧芒肘]获得的原版工作增益，持续 **240 秒（半天）**，砍伐、开采和锤击的工作效率变为 **2 倍**。再次获得刷新持续时间；结束后恢复原有工作效率。

状态栏倒计时可能比实际效果更长，以 240 秒的效果时长为准。

料理配方与食用时的属性恢复见[料理配方](/mechanics/items#料理配方)。

</section>

<section class="status-entry">

### [#暗影协同]暗影协同

学习[本源协调]后食用绝望石获得，持续 **480 秒（1 天）**。

- 获得暗影阵营：来自暗影阵营的伤害 **−20%**，对月亮阵营的伤害 **+20%**。
- 可共享给自身随从及其随从；新加入的随从也可继承，离队后移除协同。
- 再次获得刷新时间；与[虚影协同]互斥，切换时移除另一种协同。

</section>

<section class="status-entry">

### [#虚影协同]虚影协同

学习[本源协调]后食用纯粹辉煌获得，持续 **480 秒（1 天）**。

- 获得月亮阵营：来自月亮阵营的伤害 **−20%**，对暗影阵营的伤害 **+20%**。
- 共享、刷新与切换规则和[暗影协同]相同。

特殊可食用物品见[物品与料理](/mechanics/items#芒伊木特殊可食用物品)。

</section>

<section class="status-entry">

### [#三个灵魂]三个灵魂

- 玩家吃下[被侵蚀的虚影]后获得的状态。
- 在 480 秒（1天）内，玩家同时获得 <DSTIcon icon="moonaligned" />**月亮阵营** 和 <DSTIcon icon="shadowaligned" />**暗影阵营** 标签。<span class="heimu" title="游戏之外的幕后">双料特工</span>
- 无视任何 **实体碰撞**，但依然 **无法跨越地形**。
- [芒伊月]的P1阶段/[敌意虚影·启迪]/[荒尹沐]/[沐尹荒]/[编织梦魇]召唤出来的`梦魇生物`/`墨荒`会将你视作 **同一阵营**，对你保持中立。（*攻击它们后仍然会发起反击*）
- 持续期间内，会时不时 **乱动** 或 **说话**（*可被玩家的操作立即打断*）。

</section>

## 形态与随从

<section class="status-entry">

### [#兽化身躯]兽化身躯

按 V 进入[兽化]后持续存在，退出形态或死亡时结束。

详细效果见[兽化形态](/mechanics/core#def-兽化)。

</section>

<section class="status-entry">

### [#怨灵身躯]怨灵身躯

脱下[封印项圈]进入[怨灵]后持续存在，重新戴上项圈退出。

详细效果见[怨灵形态](/mechanics/core#def-怨灵)。

</section>

<section class="status-entry">

### [#分头行动状态]分头行动

头身分离期间的状态提示。普通[分头行动]和[意识转移]都会在状态栏显示为「分头行动」；接头、距离过远或灵魂耗尽时结束。

- 默认每秒消耗 **0.5 点灵魂值**，可在[模组设置](/mechanics/settings#机制结算设置)中自定义或设为 0；受到的灵魂恢复效果减半。头部与身体距离越远，理智下降越快，最高 **−60/分钟**。
- **普通分头行动**：玩家控制头部，身体跟随行动。
- **身体力行**：玩家控制身体，头部作为随从留在原地。
- 头部和身体任意一方进入战斗，双方都视为在战斗。

两种方式的控制、装备和受伤规则见[分头行动](/mechanics/items#def-分头行动)与[意识转移](/mechanics/skilltree#mem_spirit_link)。

</section>

<section class="status-entry">

### [#芒伊月近战模式]芒伊月：近战模式

状态栏显示信物所绑定的[友善的芒伊月]当前近战剩余时间。

- 玻璃刀注能 **480 秒（1 天）**，亮茄剑注能 **960 秒（2 天）**。
- 期间改用三连击与跳劈；武器不会因耐久耗尽损失，也不会因吼叫脱手。
- **注能结束摧毁武器**，随从回到远程；更换或失去绑定信物时，状态栏显示随绑定关系更新。

注能过程、启迪之冠变化与近战行为见[随从攻击模式](/mechanics/enemies#yue-pet-combat)。

</section>

<section class="status-entry">

### [#轨道增援]轨道增援

[友善的芒伊月]从启迪陷阱空投仓获得的临时装备状态，装备存在 **240 秒**。状态栏显示绑定随从的装备剩余时间，到期后移除临时装备；装备附带的副作用还可能引来月能激光。

召唤消耗、空投仓激活与装备风险见[轨道增援指令](/mechanics/enemies#yue-pet-supply)。

</section>

## 冷却与封锁

<section class="status-entry">

### [#死亡回归冷却]死亡回归冷却

发动[死亡回归]后进入冷却，默认 **3360 秒（7 天）**，可在[模组设置](/mechanics/settings#模组设置补充)中调整。冷却未结束时无法再次发动；常态或怨灵时按 X 可查询剩余时间。

</section>

<section class="status-entry">

### [#花期未至]花期未至

通过[落叶归根]成功生成[归途之花]后进入 **480 秒（1 天）** 冷却。附近没有有效落点或生成失败时，不消耗冷却。

</section>

<section class="status-entry">

### [#位面封锁]位面封锁

[位面寄生]的 Boss 生成后，该世界进入默认 **10 天**封锁，可在模组设置中调整。

- 森林与洞穴世界独立计时，不是个人冷却。
- 封锁期间不会触发新的位面寄生，已在寄生过程中的其他尸体也会寄生失败。
- 状态栏同步显示当前世界的剩余时间。

寄生概率、阻止寄生与尸体处理见[位面寄生](/mechanics/enemies#def-位面寄生)。

</section>

<span id="伤害与催眠机制" class="dst-anchor"></span>

## 原版机制

<section class="status-entry">

### [#月能灼烧伤害]月能灼烧伤害

属于原版伤害类型。位面防御对它的减伤效率较低，不能直接套用普通位面伤害的减伤结果。

$$实际伤害=\max\left(0,面板数值\times 月亮阵营减伤-\frac{位面防御}{4}\right)$$

本模组的月能伤害还带有**洞穴减半**：先按上式计算，再乘 **50%**。持续伤害先以每秒伤害代入计算，再乘每次结算的时间间隔；目标自身、装备和相关坐骑装备的抗性均参与计算。

</section>

<section class="status-entry">

### [#极限催眠]极限催眠

将目标的催眠值推到临近沉睡的程度，通常表现为减速；再受到额外催眠时便可能进入沉睡。[月光灼烧]和[食物中毒]等会施加这种效果，各状态移除时是否清空催眠值见对应条目。

<details class="archive-disclosure">
<summary>长时间施加的特殊情况</summary>
<div class="archive-disclosure-body">

持续时间极长时，催眠进度可能因浮点数误差达到沉睡阈值，造成超长时间睡眠。

</div>
</details>

</section>

<section class="status-entry">

### [#索敌忽视]索敌忽视

原版生物通常会按各自的**索敌周期**检查目标：在指定位置周围搜索，筛选距离、阵营、标签等条件，再决定是否锁定或切换仇恨。搜索中心、范围和筛选规则由各生物决定，并不完全相同。

**索敌忽视**干预的是「这次已经选中了你」之后的判定：满足条件时，有一定概率放弃这次候选。敌人仍会在下一轮继续索敌，所以可能先忽视你，过一会儿又发现你。

- **周期因生物而异**：例如阿比盖尔每 **0.5 秒**检查一次，普通蜘蛛每 **1 秒**，熊獾每 **3 秒**。0.5～3 秒是常见例子的范围，不是所有生物统一的限制。
- **每次选中时判定**：概率既不缩短也不延长索敌周期，也不保证敌人在之后的检查中继续忽视你。
- **已有仇恨仍然保留**：本模组的概率忽视只在敌人当前目标不是你时生效，不能让已经盯上你的敌人自动放弃追击；主动攻击、受击仇恨或其他目标指定方式仍可能引起战斗。

本模组的[捕猎姿态]使普通敌人的忽视概率为 **40%**；[隐藏本能]一级／二级提高至 **50%／60%**。Boss 与史诗级生物不受这项概率影响。缩小**被察觉范围**则是另一项判定：超出隐蔽半径时直接排除候选，不依靠这次概率抽取。

捕猎姿态与技能加成见[捕猎](/mechanics/core#beast-hunt)。

</section>

<section class="status-entry">

### [#理智值修正]理智值修正

持续改变角色理智值的效果，既可以降低理智，也可以恢复理智。例如每秒 **−1**，就是持续每秒损失 1 点；[兽化]自带的每分钟 **+3** 则是正面修正。

理解它与**精神光环**的区别，可以看效果来自哪里：

- **理智值修正**：直接计入角色的理智变化，没有精神光环自带的作用半径与距离衰减。常见例子包括黄昏／夜晚或黑暗环境造成的理智流失，以及[怨灵]、[暗影臣民]的持续理智流失。数值仍可能随光照、形态或其他条件改变。
- **精神光环**：由附近生物、建筑等实体影响观察者的理智。通常距离越远，效果越弱，离开作用范围后失效；部分光环有自己的距离规则。
- **蜂后帽**：只把**负面精神光环**反转为其一半强度的理智恢复，不会反转上述非光环修正。例如怨灵每秒损失 1 点理智，戴上蜂后帽后这项消耗仍然存在。

理智的最终变化由这些效果共同叠加。戴帽后仍然掉理智，不代表负面光环没有被反转，也可能是其他修正仍在扣除。

</section>

<section class="status-entry">

### [#暗影等级]暗影等级

部分物品具有的等级数值，通常与暗影装备有关。**暗影等级和装备的理智效果分别计算**：物品是否降低理智、某角色是否免受这种理智消耗，不能用来判断它有没有暗影等级。

#### 原版：麦斯威尔的暗影角斗士

麦斯威尔当前**穿戴或手持的装备**会累加暗影等级，放在普通物品栏或背包中的物品不计入这项装备合计。

麦斯威尔靠近角斗士或其攻击目标时，装备总暗影等级会强化角斗士的攻击：**每级增加 4 点基础攻击伤害**。例如合计 5 级，额外增加 20 点基础伤害。角斗士的攻击速度等行为还有其他影响因素，不能把所有强化都归因于暗影等级。

#### 本模组：友善的荒尹沐

暗影等级还会影响[友善的荒尹沐]召唤、注能时的耐久消耗，并为生成的影子与身体提供减伤。具体规则见[耐久消耗与暗影等级](/mechanics/enemies#人偶武装·收集)和[影子档案](/mechanics/enemies#shadow-pet-minion-behavior)。

麦斯威尔角斗士的更多机制可参阅[英文 Wiki](https://dontstarve.wiki.gg/wiki/Shadow_Puppet/DST#Shadow_Duelist)或[中文 Wiki](https://dontstarve.huijiwiki.com/wiki/暗影傀儡)。

</section>

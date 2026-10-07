---
pageClass: ink-archive
title: Base Stats and Innate Mechanics
description: Mangem's base stats, Soul resources, death and resurrection costs, and three forms.
outline: [2, 4]
prev:
  text: Quick Start
  link: /en/mechanics/lite_draft
next:
  text: Items and Food
  link: /en/mechanics/items
---

<script setup>
import SoulContinuationSimulator from '../../.vitepress/theme/components/SoulContinuationSimulator.vue'
import GhostFireDemo from '../../.vitepress/theme/components/GhostFireDemo.vue'
</script>

<header class="archive-profile-heading">

<div class="archive-eyebrow">Character Dossier <span>01 / Core Mechanics</span></div>
<span id="一、-基础属性与常驻机制" class="dst-anchor"></span>

# Mangem {#芒伊木}

<p class="archive-lead">Base Stats and Innate Mechanics</p>
<img class="archive-avatar" src="/mem_card.webp" alt="Mangem character artwork" width="88" height="130" />

</header>

<CharacterDossier
  name="Mangem"
  image="/mem_card.webp"
  :stats="[
    { label: 'Health', value: '75', icon: '/icons/icon_health.webp' },
    { label: 'Sanity', value: '200', icon: '/icons/icon_sanity.webp' },
    { label: 'Hunger', value: '150', icon: '/icons/icon_hunger.webp' },
    { label: 'Soul', value: '150', icon: '/icons/icon_soul.webp' }
  ]"
  attack="×0.5"
  starting-item="Seal Collar Lv1"
/>

In vanilla or vanilla-like environments (such as Uncompromising Mode), Mangem is designed as a physically frail all-rounder: **a jack of all trades, master of none**. Despite her many elaborate mechanics, her overall capabilities stay as close to vanilla balance as possible, and can even fall below those of vanilla characters in some situations.

<nav class="archive-index" aria-label="On this page">

- [Soul System](#def-灵魂值系统) Healing, recovery, and conversion
- [Death and Resurrection Penalties](#def-死亡复活惩罚) Shock, rifts, and how to remove them
- [The Three Forms](#三重形态研究) Human, beast, and wraith
- [Jump Calculations](#def-跳跃计算) Distance and airtime

</nav>

## Base Stat Systems {#基础数值系统}
### [#灵魂值系统]Soul System {#灵魂值系统}

A stat unique to Mangem, restored through food, skills, or excess healing. [休养死息] affects the conversion rates for excess healing, out-of-combat healing, and remaining Health at death alike.

#### Soul Pool and Soul {#灵魂池与灵魂值}

[#灵魂池]The **Soul Pool** stores excess healing: when `Health` is full, excess healing enters the pool at the base conversion rate in the [conversion table](#conversion-label).

[#灵魂值]Resources in the pool gradually restore actual [灵魂值]. The more it holds, the faster recovery becomes; with **30–40 points** stored, recovery is approximately **1 point/second**.

#### Life Support and Conversion at Death {#生命维持与死亡转换}

- **Life support**: While out of combat and meeting the conditions for passive healing, spend **2 [灵魂值] per second** to restore Health at the base conversion rate. Taking damage starts a **10-second recovery cooldown**; this healing is unavailable during [灵魂震荡].
- **Conversion at death**: On death, remaining `Health` is also converted into [灵魂值] at the base conversion rate.

#### Health / Soul Conversion Table {#conversion-label}

The table below uses default values. **Both crafting-menu conversions** cost 20 points: Health-to-Soul spends Health, and Soul-to-Health spends Soul. Both suffer an additional **10% loss in conversion yield** after applying the base conversion rate.

<ComparisonTable label-id="conversion-label">

| Restful Death | Base conversion rate | Soul spent/second | Health restored/second | Crafting cost | Crafting output |
|---|---:|---:|---:|---:|---:|
| Not learned | 30% | 2 | 0.6 | 20 | 5.4 |
| Level I | 50% | 2 | 1 | 20 | 9 |
| Level II | 70% | 2 | 1.4 | 20 | 12.6 |

</ComparisonTable>
<p class="archive-table-note">Crafting output = 20 × base conversion rate × 90%. The output quantity is shown directly. Scroll the table horizontally on narrow screens.</p>

After learning [顷刻炼化], unarmed attacks restore [灵魂值] based on damage; after learning [融魂术], killing creatures can restore [灵魂值]. Some [食物] also restore Soul.

### Shadow Affinity and Fear of the Dark {#暗影亲和与畏惧黑暗}

Innate `Shadow Affinity` lets her see the true names of creatures such as Ink Blights and hear Shadow Reapers speak in vanilla. She can also craft `Nightmare Fuel` from `Dark Petals` **without a science unlock**.

#### [#嘲讽]Low-Sanity Taunt {#低理智嘲讽}

When **`Sanity` falls below 50%**, a “fear made manifest” check occurs:

- **Frequency and range**: Every **15–30 seconds**, there is a **40%** chance to [嘲讽] creatures **within 20 units** (about 3/5 of a screen).
- **Additional spawn**: Each check also has a **10%** chance to spawn [潜伏恐惧] near Mangem.

#### Darkness Stress {#黑暗压力}

Stress continuously increases **at night or in caves**. Once it reaches a certain level, **auditory / visual hallucinations** occur if both conditions are met:

- The world is not under [位面封锁].
- An area around the character is in complete darkness.

## Already Dead: Death and Resurrection {#已死之人-死亡与复活}

Instead of leaving a skeleton when she dies, Mangem leaves [芒芒的尸体]. You can haunt this corpse to resurrect at any time.

### Ghost Traits and Mechanics {#鬼魂特质与机制}

#### Resources and Changes at Death {#死亡时的资源与变化}

- **Conversion at death**: Remaining `Health` converts into [灵魂值] at **30% / 50% / 70%**, corresponding to [休养死息] not learned / Level I / Level II. See the [conversion table](#conversion-label).
- **Death butterfly**: Ordinary death has a **20%** chance to release a butterfly from her body; [灵魂出窍] does not trigger this.

#### Ghost Movement and Teleportation {#鬼魂移动与传送}

<div class="media-float-section">

<MediaCard position="right" manual src="/mechanics/ghost-map-right-click.png" caption="Open the map as a ghost and right-click to teleport" width="280px" :intrinsic-width="412" :intrinsic-height="252" />

As a ghost, gain **+200% movement speed** and reveal unexplored areas of the map.

Open the map and right-click a valid [芒芒的尸体], [芒芒的坟墓], [狐狸的凶宅], or [归途之花] to teleport. **[落叶归根] is not required**, but the game's map teleportation restrictions still apply.

</div>

#### Haunting to Resurrect and Inherited Stats {#作祟复活与属性继承}

Haunt [芒芒的尸体] to resurrect. Stats carry over as follows:

- **Soul**: All [灵魂值] held at death carries over.
- **Sanity and Hunger**: A proportion carries over, based on factors including corpse decay and whether it has been embalmed.
- [#最低三维比例]**Minimum Revival Stat Ratio**: Every resurrection method retains at least **25%** [最低三维比例]; other effects can raise this ratio.

**Masked-creature interaction**: If killed by a creature wearing the `Dread Harbinger` mask, the corpse becomes the vanilla `Possessed Corpse`. Haunt it to take it over and resurrect, equivalent to haunting [芒芒的尸体]; each haunt has a **40%** chance of possession.

### [#死亡复活惩罚]Death and Resurrection Penalties {#死亡复活惩罚}

The two maximum-stat penalties have different triggers and recovery methods. First check whether [灵魂出窍] was used, then whether you were in combat at the time.

<details class="archive-author">
<summary>A note from the author</summary>

This mechanic was added purely for so-called “game balance.” In terms of the fiction, it is honestly quite a stretch.

</details>

<span id="def-灵魂震荡" class="dst-anchor"></span><span id="def-灵魂裂痕" class="dst-anchor"></span>

- **[灵魂震荡]**: Resurrecting after an ordinary death, rather than an out-of-body death, adds penalties to three stat caps and reduces movement, attack, and work efficiency. These penalties recover gradually; some foods remove them immediately.
- **[灵魂裂痕]**: Death reduces maximum Soul, which the [灵魂池] repairs first. Using [灵魂出窍] out of combat incurs a smaller loss.
- **[死亡回归]**: Resurrecting during it prevents new shock and removes existing shock; [魂墙(技能)] speeds up shock recovery and grants immunity to rifts.

See [Statuses and Mechanics](/en/mechanics/statuses#死亡与复活) for full penalty percentages, accumulation rules, and removal methods.

<span id="def-复生虚弱" class="dst-anchor"></span><span id="def-澎湃心核" class="dst-anchor"></span><span id="def-永恒心核" class="dst-anchor"></span>

::: info Removed legacy mechanics
`Resurrection Weakness`, `Surging Heart Core`, `Eternal Heart Core`, and their associated application methods have been removed. Old entry links are retained here.
:::

### Death and Resurrection Skills {#死亡与复活相关技能}

#### [#灵魂出窍]Out of Body Experience {#灵魂出窍}

Press <kbd>C</kbd> while alive to die voluntarily. Items **do not drop**. Resurrecting after this kind of death **does not add [灵魂震荡]**; [灵魂裂痕] is **5%** out of combat or **25%** in combat.

During [分头行动], <kbd>C</kbd> instead performs **Reattach**.

#### [#死亡回归]Death Return {#死亡回归}

<div class="media-float-section">

<MediaCard position="right" manual src="/videos/ghost-return-demo.webm" caption="Out of Body Experience and Death Return" width="220px" :intrinsic-width="480" :intrinsic-height="660" />

Press <kbd>X</kbd> as a ghost to enter Death Return for **10 seconds**, with a default cooldown of **7 days**. Resurrecting by any means during this window will:

- Clear [灵魂震荡].
- Apply the [再一次的机会] buff.
- Increase post-resurrection [最低三维比例] by **+25%**.

**The same key in other forms**: In Beast Form, <kbd>X</kbd> activates [捕猎姿态]; in normal or Wraith Mode, <kbd>X</kbd> displays Death Return's remaining cooldown.

<span id="def-再一次的机会" class="dst-anchor"></span>

Resurrecting with [死亡回归] grants [再一次的机会], providing movement speed and light for **30 seconds**, plus automatic item pickup and a reduced detection radius for the first **10 seconds**. See the [full status details](/en/mechanics/statuses#def-再一次的机会).

</div>

## The Three Forms {#三重形态研究}

Mangem has three forms: normally **human**; press <kbd>V</kbd> to enter [兽化]; remove [封印项圈] to enter [怨灵]. **Beast Form and Wraith Mode can coexist**; see [Form Interactions and Shared Abilities](#形态联动与通用能力).

### 1. Human Form {#_1-人类形态}

**0.5 attack multiplier**. No special mechanics: her weakest but most stable form for exploration.

<section class="beast-guide" aria-label="Beast Form">

### [#兽化]2. Beast Form (Fox)<DSTIcon icon="beast" /> {#_2-兽化形态-狐狸}

Press <kbd>V</kbd> to turn Mangem into a fox. Beast Form excels at movement, unarmed combat, and gathering, but has strict equipment restrictions and higher food consumption.

<nav class="archive-section-index" aria-label="Beast Form section navigation">

[Stat Changes](#beast-attributes) · [Equipment Restrictions](#beast-equipment) · [Eating and Poisoning](#beast-food) · [Jump](#def-跳跃) · [Hunt](#def-捕猎姿态) · [Stash Food](#def-藏食物) · [Skill Bonuses](#beast-talents)

</nav>

**Entering Beast Form** immediately deducts <DST icon="hunger">20% Hunger</DST>; **leaving Beast Form** immediately deducts <DST icon="sanity">20% Sanity</DST>.
[封印项圈] can suppress the Sanity loss on leaving: Lv2, Lv3, and [暗项圈] suppress **50%**, while [月项圈] suppresses **100%**.

<span id="兽化数值强化"></span>

#### Stats and Passive Changes {#beast-attributes}

| Stat | Value in Beast Form |
| :--- | :--- |
| Attack multiplier | **1.0** |
| Unarmed damage | **30** |
| Unarmed attack range | Classic: **2.5**; Modern: **2** |
| Unarmed attack speed | Depends on combat mode and who controls the body; see below |
| Movement speed | **+35%** |
| Damage reduction | **+65%** |

#### Unarmed Attack Timing {#beast-combat}

“[Beast Form] Combat Mode” in [Mod Settings](/en/mechanics/settings#基础设置) defaults to **Classic**. Reload the world after changing it. It affects only unarmed attacks in Beast Form.

| Combat mode | Unarmed attack range | Player holding F | Automatic body attacks during ordinary Head Out | Player recovery cancels |
| :--- | :--- | :--- | :--- | :--- |
| Classic (default) | 2.5 | Every 12 frames; 2.5 attacks/sec | Every 8 frames; 3.75 attacks/sec | At best every 7 frames; about 4.29 attacks/sec |
| Modern | 2 | Every 9 frames; about 3.33 attacks/sec | Every 12 frames; 2.5 attacks/sec | At best every 7 frames; about 4.29 attacks/sec |

These theoretical rates are calculated at **30 frames per second** from the action intervals. Attacks hit on frame **3** after starting. Moving after the hit cancels recovery, but the **7-frame** attack cooldown still applies. During [意识转移], the player controls the body and uses the player timing in the table. Equipped weapons do not use this unarmed timing.

Unarmed work has a separate fixed interval unaffected by combat mode; see [Beastly Instinct's work effects](/en/mechanics/skilltree#mem_skill_instinct_beastly).

- **Environmental adaptation**: Waterproofing **+50%**, insulation **+120** (becomes **−120 summer insulation** in summer), and wetness reduction rate **−90%**.
- **Ongoing drain and recovery**: Natural Hunger drain **+100%**, meaning double consumption; recover **3 Sanity per minute**, a [理智值修正].
- **Creature reactions**: Neutral creatures such as Pigs regard her as a monster. [隐藏本能] can change this; see [Skill Bonuses](#beast-talents) below.

<span id="兽化局限与代价"></span>

#### Equipment Restrictions {#beast-equipment}

Cannot use **hand equipment** or most **body / head equipment that covers the ears**. Backpacks, shirts, and open hats such as Straw Hats and Garlands can still be worn.

Being wearable does not mean every effect works:

- **Defense and durability**: Equipment's defensive effects do not apply, and taking hits does not consume its durability.
- **Additional effects**: Effects such as the Enlightened Crown's small Gestalt support and the Thulecite Crown's invincibility field still work.

#### Eating and Food Poisoning {#beast-food}

Beast Form is **immune to food's negative effects on the three basic stats**, but this does not affect additional effects such as the Dread King Cake's replacement effect or Dark Petal Tea's Sanity deduction. Immunity to those basic penalties does not prevent [食物中毒]:

- **Food with negative effects**: Each serving has a **10%** chance of poisoning.
- **Mushrooms**: A **20%** chance of poisoning, whether cooked or raw and whether or not they have negative effects.

<span id="def-食物中毒" class="dst-anchor"></span>

Poisoning randomly causes ongoing Health, Sanity, or Hunger loss for **10 seconds**, with a drowsiness-induced slowdown; triggering it again refreshes the duration. [Full effects and demonstration](/en/mechanics/statuses#def-食物中毒).


<span id="专属形态技能"></span>

#### [#跳跃]Jump {#beast-jump}

<div class="archive-illustrated">

<MediaCard src="/videos/ty_web.webm" caption="Jump speed: Beastly Constitution learned (top) / not learned (bottom)" width="280px" :manual="true" :intrinsic-width="320" :intrinsic-height="320" />

<div class="archive-copy">

Press <kbd>R</kbd> to jump; distance depends on movement speed. Jumps can cross terrain and grant **stagger immunity** during the jump. Starting from the takeoff windup, they also grant **10 frames (about 0.33 seconds) of invincibility**.

While stationary, she attempts to jump toward the player's cursor. **She will not jump if the distance is insufficient**, preventing falls into the sea when trying to cross it; this behavior is adjustable in settings.

Learning [野兽体质] increases jump speed. Expand “Jump Calculations” below for the exact formulas.

<details class="archive-disclosure">
<summary id="其他"><span id="def-跳跃计算"></span>Jump Calculations<span class="disclosure-description">Distance, speed, and airtime</span></summary>
<div class="archive-disclosure-body">

The exact formulas for jump distance and airborne speed follow.

<details class="archive-author">
<summary>A note from the author</summary>

Skipping this changes nothing, really. You do not need to know it for normal play.

</details>

##### 1. Base Physical Distance Formula {#_1-基础物理距离公式}

$$\text{Maximum jump distance} = \min\left(24.0, \text{Effective jump speed}\right) \times 0.5 \quad \text{(units)}$$

**Effective jump speed** is subject to a movement-speed soft cap, with two cases based on actual movement speed:

When **actual movement speed ≤ 10.0**:

$$\text{Effective jump speed} = \text{Actual movement speed} \times 2$$

When **actual movement speed > 10.0**, diminishing returns apply:

$$\text{Effective jump speed} = \left[ 10.0 + (\text{Actual movement speed} - 10.0) \times 0.5 \right] \times 2$$

##### 2. Airtime and Airborne Speed (Dynamic Landing Calculation) {#_2-滞空时间与飞行速度-落点动态解算}

When the player chooses less than the maximum distance (for example, placing the cursor near their feet), airtime and speed are dynamically reduced according to the **ratio of actual jump distance to maximum distance**:

$$\text{Base airtime} = 0.25 + 0.4 \times \left( \frac{\text{Actual jump distance}}{\text{Maximum jump distance}} \right) \quad \text{(seconds)}$$

**Special bonus**: With [野兽体质] learned, airtime is **reduced by 40%**:

$$\text{Final airtime} = \text{Base airtime} \times 0.6$$

**Final jump speed**:

$$\text{Actual airborne speed} = \frac{\text{Actual jump distance}}{\text{Final airtime}}$$

</div>
</details>

</div>
</div>

#### [#捕猎姿态]Hunt {#beast-hunt}

Press <kbd>X</kbd> to enter **Hunting Stance**, allowing unarmed capture of small animals, flying insects, birds, and even hostile creatures such as Frogs and Spiders.

The base success chance is **50%**, modified by:

- **Your Hunger**: Current Hunger percentage adds **+10% to −20%** to the success chance.
- **Target aggro**: **−50%** if the target has aggro, **+10%** if it does not. The penalty applies regardless of whether its aggro is directed at you.

**Concealment**: When an ordinary enemy is not already targeting you, each target search that selects you has a **40%** chance to ignore that selection; see [索敌忽视] for the check. Any subsequent effects that reduce your detection radius gain an additional **+40%**. See [Skill Bonuses](#beast-talents) for [隐藏本能] changes to capture chance, movement speed, target-search ignoring, and automatic capture.

#### [#藏食物]Stash Food {#beast-cache}

Hold food on the cursor and right-click the ground to dig a hole and bury it. The hole provides **75% Salt Box-level preservation**, and **only you can retrieve** its food.

- **Deposit restrictions**: Only the food currently held on the cursor can be deposited when digging. You cannot add more later.
- **Quantity limit**: Each world allows up to **4 holes**; the limit increases by **+4** for every Mangem in that world.
- **Lifetime**: Holes last **1 day**, then disappear and drop their food. [野兽体质] doubles this to **2 days**.
- **Additional preservation**: [参点防腐剂] reduces the stored food's [腐烂速率], **multiplicatively** with Salt Box-level preservation. The effect uses the skill level at the time the hole is dug.

**Holes can also be dug outside Beast Form**, but each costs <DST icon="hunger">5 Hunger</DST>; in Beast Form the cost is only <DST icon="hunger">1 point</DST>, and digging is faster.

<p class="archive-caution"><strong>Risk from forceful destruction:</strong> Digging with a shovel, taking object-destroying attacks, or other forceful destruction has a <strong>25%</strong> chance to erase both the hole and all food inside.</p>

<span id="技能树天赋加成"></span>

#### Skill Bonuses {#beast-talents}

These changes apply after learning the corresponding skills; changes to jump speed, hole lifetime, and preservation are covered in their respective sections.

- [野兽体质]: In Beast Form, perform most work unarmed, including chopping, digging, hammering, and mining.
- [隐藏本能]: In Beast Form, Pigs and similar creatures no longer regard her as a monster, and she no longer startles small animals. Hunting Stance's movement penalty improves from **−60%** to **−20%**. In addition:
  - **Capture chance**: Level I / II adds a total of **+10 / +20 percentage points**; capturing from behind the target while in the stance adds another **+30 percentage points**. The final chance is clamped to **0–100%**.
  - **Target-search ignoring**: When ordinary enemies have not yet locked onto you, their chance to ignore you rises from the unlearned **40%** to **50%** at Level I / **60%** at Level II.
  - **Additional Level II effect**: Jumping in Hunting Stance automatically captures the nearest capturable target nearby.
- [精准度“优化”]: Greatly increases gathering speed in Beast Form. Each level adds **5%** unarmed damage in Beast Form: **+5% / +10% / +15%** at Level I / II / III.

</section>

### [#怨灵]3. Wraith Mode<DSTIcon icon="ghost" /> {#_3-怨灵形态}

Remove [封印项圈] to enter Wraith Mode. At low Sanity, this form offers devastating burst damage and adaptive combat recovery, but incoming damage also rises sharply.

<nav class="archive-section-index" aria-label="Wraith Mode section navigation">

[Wraith Stats and Passives](#怨灵数值与被动变化) · [Combat Continuation](#专属技能-战斗续行) · [Shadow Watcher](#def-暗影观察者)

</nav>

**Transformation cost**: Removing the collar immediately deducts <DST icon="health">20% Health</DST>; **this cannot kill you**. Lv3 and [月项圈] suppress **50%** of this penalty; [暗项圈] suppresses **100%**.

#### Wraith Stats and Passive Changes {#怨灵数值与被动变化}

<div class="archive-illustrated">

<MediaCard src="/box_4.webp" caption="Ham Bat damage comparison: Mangem with maximum Gradual Numbness and 0 Sanity, versus Wolfgang at full Mightiness." width="280px" :intrinsic-width="548" :intrinsic-height="256" loading="lazy" />

<div class="archive-copy">

Wraith Mode's **outgoing and incoming damage multipliers are identical**, rising linearly as the current `Sanity` percentage falls. Higher levels of [逐渐麻木] increase the low-Sanity bonus.

Let $L$ be the skill level (0 if unlearned, 1–3 for Level I–III), and $p$ be current Sanity / maximum Sanity:

$$\text{Outgoing / incoming damage multiplier}=1+(0.5+0.15L)\times(1-p)$$

| Gradual Numbness | 100% Sanity | 50% Sanity | 0% Sanity |
| :--- | ---: | ---: | ---: |
| Not learned | ×1 | **×1.25** | ×1.5 |
| Level I | ×1 | **×1.325** | ×1.65 |
| Level II | ×1 | **×1.4** | ×1.8 |
| Level III | ×1 | **×1.475** | ×1.95 |

**Example at 50% Sanity**: With the default cap, current Sanity is **100/200**. Without the skill, outgoing and incoming damage are both **+25%**, turning a Spider's 20 damage into **25**; at Level III, both are **+47.5%**, turning the same hit into **29.5**. Armor and Beast Form damage reduction are not yet included.

**Continuous Sanity drain**: Base loss is **1 Sanity per second (60 per minute)**, a [理智值修正] unaffected by the `Bee Queen Crown` reversing negative auras. [逐渐麻木] also reduces this ongoing drain. She is also regarded as a monster.

</div>
</div>

#### Combat Continuation {#专属技能-战斗续行}

<div class="combat-continuation">
<div class="combat-copy">

<p class="archive-rule-name">Soul Healing</p>

<div class="archive-rules">

- **When it resolves** After each hit on an enemy.
- **Spending order** Use these resources in order, subject to availability:
  1. Spend **1** [灵魂值] to restore **1** Health.
  2. If Soul is insufficient, spend **2** Sanity instead to restore **1** Health.
  3. If neither is sufficient, directly deduct **1** Health.
- **Can it kill you?** Yes. If both Soul and Sanity are insufficient, the Health deduction can be lethal.

</div>

<p id="灵魂续行" class="archive-rule-name">Soul Continuation</p>

<div class="archive-rules">

- **When it resolves** On taking lethal damage, first retain **1** Health.
- **Spending order** Convert overflow damage into resource costs using the formula below. Deduct [灵魂值] first, then Sanity to cover any shortfall.
- **Can it kill you?** Yes. If Sanity is also insufficient, Health is deducted normally until death.

</div>

<div class="archive-rule-note">

The conversion only determines the resources spent on the overflow portion of lethal damage. It is not direct damage reduction for all hits; you can still die once resources run out.

</div>

The conversion ratio changes dynamically with overflow damage: more overflow means a lower ratio; less overflow means a higher ratio.

$$\text{Overflow damage} = \text{Actual incoming damage} - (\text{Current Health} - 1)$$

$$\text{Actual resource cost} = \text{Overflow damage} \times \left( 0.40 + \frac{48}{40 + \text{Overflow damage}} \right)$$

**Calculation examples** (resources spent are Soul / Sanity):

| Overflow damage | Substitution | Resource cost |
| ---: | :--- | ---: |
| 50 points | 50 × (0.40 + 48/90) | Approximately **46.67 points** |
| 10 points | 10 × (0.40 + 48/50) | **13.60 points** |

</div>
<div class="combat-demo">

<SoulContinuationSimulator />

</div>
</div>

#### [#暗影观察者]Shadow Watcher {#核心机制-暗影观察者}

<div class="archive-illustrated">

<MediaCard src="/videos/aygcz_web.webm" caption="Shadow Watcher gradually fill the screen, then fade away" width="280px" manual :intrinsic-width="320" :intrinsic-height="180" />

<div class="archive-copy">

When **`Sanity` is below 60%**, [暗影观察者] begin to fill your view. Their coverage and time to recede vary with Sanity percentage. The visual effect is the same as `Ancient Fuelweaver` mind control, but **it does not actually control you**.

The following grant immunity:

- **Equipment**: Wear an `Enlightened Crown`, `Bone Helm`, `Nightmare Amulet`, or equipment with the `Shadow Subjects` tag.
- **Food**: Eat [凉拌脑花] to temporarily gain the `Shadow Subjects` tag.
- **Skill**: [魂墙(技能)] directly grants immunity.

</div>
</div>

### Form Interactions and Shared Abilities {#形态联动与通用能力}

**Beast Form + Wraith Mode**: With both active, each unarmed attack adds **10 planar damage**; all other mechanics stack.

#### [#鬼火]Ghost Fire {#鬼火}

<div class="ghost-fire-section">
<div class="ghost-fire-copy">

**Firing conditions and cost**: While unarmed and outside [捕猎姿态], spend **3 [灵魂值]** to fire **1 Ghost Fire** at a target.

Ghost Fire is a homing projectile that deals **10 damage**. Most Ghost Fires in the mod use this shared damage value.

**Bounce rules**: By default, Ghost Fire **cannot bounce**. Once bouncing is unlocked, each hit with bounces remaining automatically searches around the impact point for the **nearest eligible hostile target** in range and attacks again. Each successful bounce adds the following, relative to the initial value:

- Flight speed **+10%**.
- Target-search range for the next bounce **+10%**.

The first bounce has a search range of **10**, followed by **11, 12, 13…**; flight speed likewise becomes **×1.1, ×1.2, ×1.3…** its initial speed. The Ghost Fire dissipates if no eligible target exists.

**Skill effects**:

- [彼世的光芒]: A lighting upgrade that makes Ghost Fire emit light over a small area.
- [灵魂实体专精一级]: Ghost Fires you fire can **bounce 10 more times** after their first hit.
- [本源协调]: Any [友善随从], player, or follower following Mangem can act as a bounce **stepping stone**, without taking damage.
- [魂魄逸散]: Every **30 [灵魂值]** spent causes the next successful attack to fire a Ghost Fire.

**Origin Coordination's targeting order**: First seek the nearest eligible enemy in range; only if none exists, seek the nearest eligible ally. **Previously hit targets can be selected again**, so two allies can pass it back and forth, gradually expanding the range until it reaches an enemy. The current code excludes the original caster and the target just hit from the next bounce, and does not select defeated targets.

</div>
<div class="ghost-fire-visual">

<GhostFireDemo />

</div>
</div>

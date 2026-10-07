---
pageClass: ink-archive archive-statuses
title: Statuses and Mechanics
description: Complete explanations of Lunar Burn, Soul Mark, Shining Mark, resurrection penalties, food buffs, and status-panel modes.
outline: [2, 3]
prev:
  text: Enemies and Followers
  link: /en/mechanics/enemies
next:
  text: Skill Tree
  link: /en/mechanics/skilltree
---

<div class="archive-eyebrow">Status Dossier <span>04 / Effects and Interactions</span></div>

# Statuses and Mechanics {#状态与机制}

This page records status effects, durations, stacking, and removal rules. Follow each entry's source links for the attacks, food, equipment, and actions that trigger it. Terms in the text support hover previews; on mobile, tap a term to read its summary before choosing to view the full details.

<nav class="archive-index" aria-label="Status categories">

- [Combat Statuses](#战斗状态) Burns, downgrade, marks, and chainsaw combos
- [Death and Resurrection](#死亡与复活) Shock, rifts, and perfect resurrection
- [Food and Factions](#食物与阵营) Poisoning, food buffs, and faction synergies
- [Forms and Followers](#形态与随从) Beast, wraith, split-body, and follower statuses
- [Cooldowns and Lockdown](#冷却与封锁) Death Return, flowers, and world lockdown
- [Vanilla Mechanics](#原版机制) Damage, drowsiness, targeting, Sanity, and Shadow Level

</nav>

## Combat Statuses {#战斗状态}

<section class="status-entry">

### [#月光灼烧]Lunar Burn {#月光灼烧}

<MediaCard position="right" manual src="/videos/lunar-burning-damage.webm" caption="Lunar Burn damage" width="160px" :intrinsic-width="80" :intrinsic-height="104" />

Lasts **3 seconds**, with a base damage rate of **10 points/second**, applied at **0.2-second** intervals (approximately **2 points/tick** before damage reduction). Actual [月能灼烧伤害] is also affected by Lunar-faction damage reduction and planar defense; it is halved in caves.

- **Players**: Continuously applies [极限催眠]; drowsiness is cleared when the status is removed.
- **Non-player creatures**: Movement speed **−40%**; creatures capable of panic panic continuously, and some shadow creatures also enter panic.
- **Sanity restoration**: Targets with a Sanity stat recover **3 Sanity every 0.2 seconds**.
- **Reapplication**: Recalculates damage and refreshes the duration to **3 seconds**, without adding separate burn stacks.

Sources include [芒伊月]'s [虚影侵蚀区], [月能激光], certain melee attacks, and [敌意虚影·启迪]. See [Mangelune Combat](/en/mechanics/enemies#def-芒伊月) for each move's triggering area and chance.

</section>

<section class="status-entry">

### [#位面实体降格]Planar Entity Downgrade {#位面实体降格}

<MediaCard position="right" manual src="/videos/planar-downgrade-effect.webm" caption="Planar Entity Downgrade visual effect" width="240px" :intrinsic-width="320" :intrinsic-height="280" />

Lasts **12 seconds**, or **18 seconds** if the target's own planar defense plus its equipment totals **≥20**. Reapplication refreshes the duration.

- **With planar-entity resistance**: Loses the planar entity's damage reduction against non-planar physical attacks.
- **Without planar-entity resistance**: Incoming combat damage **+20%**.
- **Non-player creatures**: Applies **3 seconds** of panic / shadow panic.
- **Additional effects on Mangelune**: Disables damage reflection from Bramble Husk, Brightshade Armor, and Brambleshade Armor; disables charging on W.A.R.B.I.S. Armor and Glassmail; halves received restoration.
- **Planar Entity Ripple**: When Mangelune or its friendly follower hits another target, it can remove its own downgrade and spread it to surrounding targets. See [Enemies and Followers](/en/mechanics/enemies#位面实体涟漪) for each one's eligible spread targets.

Sources include [天基激光] and [敌意虚影·启迪].

</section>

<section class="status-entry">

### [#魂魄刻印]Soul Mark {#魂魄刻印}

<MediaCard position="right" manual src="/mechanics/soul-mark-vfx.png" caption="Soul Mark visual effect" width="200px" :intrinsic-width="204" :intrinsic-height="247" />

A stacking status on a target, detonated by damaging [鬼火].

<dl class="imprint-facts">
<div><dt>Maximum stacks</dt><dd>10 stacks</dd></div>
<div><dt>Decay delay</dt><dd>6 seconds</dd></div>
<div><dt>Decay rate</dt><dd>1 stack/second</dd></div>
</dl>

#### Stacking and Detonation {#叠层与引爆}

- **Stack decay**: If no stacks are added or refreshed for 6 seconds, stacks begin decreasing by 1 per second.
- **Detonation**: A damaging [鬼火] attack detonates and consumes all stacks. The Ghost Fire's **caster** counts as the **detonator**.
- **Effects that cannot detonate**: Ghost Fire visuals from [分头行动], [意识转移], or active [刻印形态] cannot detonate marks; all other damaging Ghost Fires can.

Below, “stacks” means the mark stacks consumed by this detonation. All stat values are taken from the **detonator**.

#### Detonation Damage {#引爆伤害}

First calculate base damage according to whether the detonator has a [灵魂值系统]. Creatures without one include [荒尹沐], [友善的荒尹沐], and [友善的芒伊月].

<div class="imprint-recovery">
<section aria-labelledby="soul-mark-soul-damage">

<p id="soul-mark-soul-damage" class="imprint-label">With a Soul system → Base damage</p>

<p class="imprint-equation"><span class="formula-factor">Missing <DST term="灵魂值" icon="soul">Soul</DST></span> <span class="formula-factor"><span class="formula-operator">×</span> Stacks</span> <span class="formula-factor"><span class="formula-operator">×</span> <strong>20%</strong></span></p>

</section>
<section aria-labelledby="soul-mark-health-damage">

<p id="soul-mark-health-damage" class="imprint-label">Without a Soul system → Base damage</p>

<p class="imprint-equation"><span class="formula-factor">Missing <DST term="生命值" icon="health">Health</DST></span> <span class="formula-factor"><span class="formula-operator">×</span> Stacks</span> <span class="formula-factor"><span class="formula-operator">×</span> <strong>2%</strong></span></p>

</section>
</div>

Then add flat damage based on the stacks detonated:

<table class="imprint-bonus-table">
<thead><tr><th scope="col">Stacks detonated</th><th scope="col">Additional flat damage</th></tr></thead>
<tbody>
<tr><td>1–4 stacks</td><td>None</td></tr>
<tr><td>5–9 stacks</td><td><strong>+5</strong></td></tr>
<tr><td>10 stacks</td><td><strong>+15</strong></td></tr>
</tbody>
</table>

**Detonation damage = base damage + stack bonus.** At 10 stacks, the bonus is +15; it does not stack with +5.

These are the default coefficients, individually adjustable in [Mod Settings: Soul and Marks](/en/mechanics/settings#灵魂与刻印). The Health coefficient defaults to **0.02** and is not overwritten by difficulty presets. It affects detonators without a Soul system, including bosses and friendly followers.

#### On-Kill Recovery {#击杀恢复}

Only when **this detonation's damage kills the target**, immediately restore the detonator's corresponding stat:

<div class="imprint-recovery">
<section aria-labelledby="soul-mark-soul-refund">

<p id="soul-mark-soul-refund" class="imprint-label">With a Soul system → Restore Soul</p>

<p class="imprint-equation"><span class="formula-factor">Cost per mark application</span> <span class="formula-factor"><span class="formula-operator">×</span> Stacks</span> <span class="formula-factor"><span class="formula-operator">×</span> <strong>2</strong></span></p>

</section>
<section aria-labelledby="soul-mark-health-refund">

<p id="soul-mark-health-refund" class="imprint-label">Without a Soul system → Restore Health</p>

<p class="imprint-equation"><span class="formula-factor">Maximum <DST term="生命值" icon="health">Health</DST></span> <span class="formula-factor"><span class="formula-operator">×</span> Stacks</span> <span class="formula-factor"><span class="formula-operator">×</span> <strong>2%</strong></span></p>

</section>
</div>

“**Cost per mark application**” means the [灵魂值] spent on each attack in [刻印形态], as determined by the player's **mod settings**.

#### Upgrade Effects {#升级效果}

- **Planar upgrade**: Changes the detonation's damage type and effect to **planar damage**.
- **Lighting upgrade**: After learning [彼世的光芒], [魂魄刻印] emits light over a small area.
- **Detonation buff**: After learning [灵魂实体专精], detonating [魂魄刻印] also grants [闪耀刻印].

</section>

<section class="status-entry">

### [#闪耀刻印]Shining Mark {#闪耀刻印}

<section class="imprint-reference">

Detonators with active [灵魂实体专精], or belonging to Mangmire's faction, gain the same number of Shining Mark stacks after detonating [魂魄刻印]. Gaining it again adds stacks and refreshes the duration to **10 seconds**; stacks exceeding 10 immediately resolve as recovery.

<dl class="imprint-facts">
<div><dt>Maximum stacks</dt><dd>10 stacks</dd></div>
<div><dt>Duration</dt><dd>10 seconds</dd></div>
<div><dt>Evasion per stack</dt><dd>5% <small>maximum 50%</small></dd></div>
</dl>

#### Base Effects {#基础与技能效果}

The following effects are innate to the marks and **require no skill**:

<MediaCard position="right" manual src="/mechanics/shining-mark-evasion-vfx.png" caption="Visual effect when Shining Mark activates" width="200px" :intrinsic-width="364" :intrinsic-height="368" />

- **Attack evasion**: Each stack provides **5%** evasion chance. A successful dodge halves the remaining stacks, rounded down; 1 stack is cleared entirely.
- **Maintaining Roar**: While active, [电锯轰鸣] does not lose stacks from the passage of time.

#### Recovery Resolution · Soul Entity Mastery III {#三级恢复结算}

After learning Level III of [灵魂实体专精], recovery resolves when marks **expire naturally** or **overflow the stack limit**; overflow resolves immediately. [荒尹沐] and all its derivatives count as having maximum-level Soul Entity Mastery.

<div class="imprint-recovery">
<section aria-labelledby="imprint-soul-recovery">

<p id="imprint-soul-recovery" class="imprint-label">With a Soul system → Restore Soul</p>

<p class="imprint-equation">Cost per mark stack × Stacks resolved</p>

| Stacks resolved | Additional recovery |
| :--- | :--- |
| 5–9 stacks | **5%** of maximum Soul |
| ≥ 10 stacks | **10%** of maximum Soul |

“Cost per mark stack” means the [灵魂值] spent per attack in [刻印形态], and varies with the player's **settings**.

</section>
<section aria-labelledby="imprint-health-recovery">

<p id="imprint-health-recovery" class="imprint-label">Without a Soul system → Restore Health</p>

<p class="imprint-equation">Detonator's maximum Health × Stacks resolved × 0.5%</p>

| Stacks resolved | Additional recovery |
| :--- | :--- |
| 5–9 stacks | **3%** of the detonator's maximum Health |
| ≥ 10 stacks | **5%** of the detonator's maximum Health |

Applies to creatures without a Soul system, including [荒尹沐], [友善的荒尹沐], and [友善的芒伊月].

</section>
</div>

#### Skill and Clone Interactions {#彼世的光芒与分身}

<dl class="imprint-links">
<div><dt>Light of the Otherworld</dt><dd>

After learning [彼世的光芒], taking a hit grants **1–5 random stacks**. With any stacks present, a glowing Ghost Fire attaches to you. Stacks consumed by a successful dodge become [魂魄刻印] on the attacker.

</dd></div>
<div><dt>Clone inheritance</dt><dd>

The Light of the Otherworld effects above also apply to clones from [分头行动] / [意识转移]. If a clone disappears while marks are active, its remaining marks transfer to the player, using whichever remaining duration is longer. With Soul Entity Mastery III, the clone's recovery effects also feed back to the player.

</dd></div>
</dl>

</section>

</section>

<section class="status-entry">

### [#电锯轰鸣]Revved Up {#电锯轰鸣}

A timed combo state activated by giving Pure Horror to [电锯惊魂]. It can coexist with [刻印形态].

| Chainsaw condition | Time added per Pure Horror | Maximum remaining time |
| :--- | ---: | ---: |
| Without Roaring upgrade | 60 seconds | 180 seconds |
| With Roaring upgrade | 120 seconds | 360 seconds |

- **Combo damage**: Each hit adds **1 stack**, with no stack cap. Each stack adds **1 physical damage**. With the Pioneer upgrade, combo bonus damage becomes planar damage.
- **Decay after pausing**: After at least **1 second** without a hit, stacks are removed at an accelerating rate of **1, 2, 3… stacks per second**. Landing another hit resets the decay rate.
- **Loss on hit**: When the holder takes a hit, combo stacks are halved, rounding the remainder down.
- **Shining Mark interaction**: While the holder has [闪耀刻印], time-based stack decay pauses, but Roar's overall duration continues to run down.
- **Expiry and equipment**: The timer belongs to this chainsaw. Unequipping only hides the status-panel indicator; the timer keeps running. Expiry clears the combo.
- **Upgraded repair**: After the Roaring upgrade, giving Pure Horror also repairs **44 durability**.

See [Chainsaw Upgrades](/en/mechanics/items#电锯升级) for activation, crafting, and upgrade materials.

</section>

## Death and Resurrection {#死亡与复活}

<section class="status-entry">

### [#灵魂震荡]Soul Shock {#灵魂震荡}

<MediaCard position="right" manual src="/videos/soul-shock-shadow-heart-cure.webm" caption="Clearing Soul Shock with a Shadow Atrium" width="220px" :intrinsic-width="640" :intrinsic-height="704" />

<p class="archive-rule-summary"><span>Health · Sanity · Soul caps</span><span>Added per event <strong>125%</strong></span><span>Total maximum <strong>225%</strong></span><span>Minimum retained per stat <strong>25%</strong></span></p>

<p class="archive-rule-note">125% / 225% is the combined penalty across Health, Sanity, and Soul, not an individual deduction from each. There are no stacks.</p>

<div class="archive-rules">

- **Trigger** Dying for a reason other than [灵魂出窍] and then resurrecting adds a combined **125%** penalty across the three stat caps. It is no longer calculated from the distance between death and resurrection locations.
- **Out-of-body deaths and exceptions** [灵魂出窍] adds no new shock, but existing unrecovered shock carries into the next resurrection. Perfect resurrection during [死亡回归] prevents new shock and clears old shock. Resurrection from [芒芒的坟墓] adds no new shock.
- **Accumulation** There are no stacks. Any portion not recovered before death carries into the next resurrection, combining with the new penalty up to **225%** total.
- **Distribution** Randomly distributed across `Health`, `Sanity`, and [灵魂值], with each retaining at least **25% of its cap**. Existing cap penalties occupy available allocation space.
- **Effects while active** Movement speed, attack multiplier, and work efficiency are all **−20%**. [灵魂值] and [灵魂池] intake / recovery is obstructed, and passive Soul-fueled healing is unavailable.
- **Automatic recovery** Every **5 seconds**, each of the three stats recovers up to **2.5 percentage points** of its shock penalty until cleared. Active [魂墙(技能)] raises recovery speed by **+100%**, to up to **5 percentage points** each; it no longer grants shock immunity.
- **Food removal** Eating a `Telltale Heart` clears shock. `Shadow Atrium` and `Possessed Shadow Atrium` also fully restore Health, Sanity, and Soul within their currently available caps. None directly clears [灵魂裂痕], but the atriums' extra [灵魂池] resources can continue repairing rifts.

</div>

</section>

<section class="status-entry">

### [#灵魂裂痕]Soul Rift {#灵魂裂痕}

<p class="archive-rule-summary"><span>Maximum Soul</span><span>Out-of-combat projection <strong>5%</strong></span><span>Other deaths <strong>25%</strong></span><span>Maximum total <strong>75%</strong> (at least <strong>25%</strong> retained)</span></p>

<div class="archive-rules">

- **Out-of-combat projection** Using [灵魂出窍] after leaving combat incurs a **5%** maximum-[灵魂值] penalty for this death.
- **Other deaths** Using [灵魂出窍] in combat, or dying by another means, incurs a **25%** penalty for this death.
- **Accumulation cap** Reduces maximum [灵魂值] by at most **75%**, retaining at least **25%**. This is a loss of maximum capacity, not a direct deduction of the same amount of current Soul.
- **Repair** The [灵魂池] prioritizes repairing rifts at a **1:1** ratio. Pool recovery is obstructed during [灵魂震荡].
- **Skill immunity** Active [魂墙(技能)] grants immunity only to rifts caused by death and resurrection; crafting [芒芒的尸体] still reduces maximum [灵魂值]; [落叶归根] no longer provides this immunity.

</div>

</section>

<section class="status-entry">

### [#完美复活][#再一次的机会]One More Chance {#再一次的机会}

Gained by resurrecting during [死亡回归], also called perfect resurrection. Resurrection clears new and existing [灵魂震荡] and increases [最低三维比例] by **+25%**.

- **First 10 seconds**: Enemy detection radius shrinks to **5 units**. Every second, automatically picks up nearby drops and attempts to equip them, prioritizing backpacks.
- **Full 30 seconds**: Movement speed **+30%**, illumination, and disabled low-Sanity [嘲讽].
- **Interaction**: [捕猎姿态] can further strengthen the detection-radius reduction.
- **Ending**: Removes the movement, concealment, lighting, and pickup bonuses. Death also removes the status.

See [Death Return](/en/mechanics/core#def-死亡回归) for activation and resurrection controls.

</section>

## Food and Factions {#食物与阵营}

<section class="status-entry">

### [#食物中毒]Food Poisoning {#食物中毒}

In [兽化], food with negative effects on the three basic stats has a **10%** poisoning chance. Mushrooms have a **20%** chance, whether cooked or raw and whether or not they have negative effects.

<div class="archive-illustrated archive-status">

<MediaCard src="/videos/swzd_web.webm" caption="Food Poisoning: a spinning-screen filter (one possible symptom)" width="280px" :manual="true" :intrinsic-width="757" :intrinsic-height="426" />

<div class="archive-copy">



Randomly applies one of the following for **10 seconds**: <DST icon="hunger">Hunger −2/s</DST>, <DST icon="sanity">Sanity −2/s</DST>, or <DST icon="health">Health −1/s</DST>.

- **Triggered again**: Refreshes the current status's countdown.
- **Drowsiness**: Applies [极限催眠] while active; clears drowsiness when the status ends.
- **Other symptoms**: On activation, a **40%** chance to show a spinning-screen filter. If the Hunger effect was selected, there is a **40%** chance to leave a pile of Manure at your position when it ends.

</div>
</div>

</section>

<section class="status-entry">

### [#体温恒定]Constant Body Temp {#体温恒定}

Gained from [热心肠血冻] for **300 seconds**. Body temperature is restricted to **20–50 degrees** while active; the original temperature range returns afterward.

Eating it again refreshes the duration to **300 seconds**. The status-panel countdown may end early; the actual effect lasts 300 seconds.

</section>

<section class="status-entry">

### [#暗影臣民]Shadow Subjects {#暗影臣民}

Gained from [凉拌脑花] for **300 seconds**.

- Grants shadow dominance, making related shadow creatures neutral and granting immunity to [暗影观察者].
- **Continuous Sanity drain**: Loses **1 Sanity per second (60 per minute)**, a [理智值修正] unaffected by the Bee Queen Crown's reversal of negative auras.
- Eating it again refreshes the duration. On expiry, the associated tag and Sanity modifier are removed.

The status-panel countdown may end early; the actual effect lasts **300 seconds**.

</section>

<section class="status-entry">

### [#强壮搬运]Strong Porter {#强壮搬运}

Gained from [星期四特惠套餐] for **480 seconds (1 day)**. Removes movement penalties caused by carrying heavy objects. Eating it again refreshes the duration; normal heavy-object slowdown returns afterward.

</section>

<section class="status-entry">

### [#工作高效]High Efficiency {#工作高效}

The vanilla work buff gained from [红烧芒肘], lasting **240 seconds (half a day)**. Chopping, mining, and hammering efficiency becomes **2 times** normal. Gaining it again refreshes the duration; original work efficiency returns afterward.

The status-panel countdown may last longer than the actual effect. Use the 240-second effect duration as the reference.

See [Food Recipes](/en/mechanics/items#料理配方) for recipes and stat restoration on eating.

</section>

<section class="status-entry">

### [#暗影协同]Shadow Synergy {#暗影协同}

Gained by eating Dreadstone after learning [本源协调], lasting **480 seconds (1 day)**.

- Grants Shadow alignment: damage received from the Shadow faction **−20%**, damage dealt to the Lunar faction **+20%**.
- Can be shared with your followers and their followers. Newly recruited followers can inherit it too; leaving the group removes the synergy.
- Gaining it again refreshes the duration. Mutually exclusive with [虚影协同]; switching removes the other synergy.

</section>

<section class="status-entry">

### [#虚影协同]Gestalt Synergy {#虚影协同}

Gained by eating Pure Brilliance after learning [本源协调], lasting **480 seconds (1 day)**.

- Grants Lunar alignment: damage received from the Lunar faction **−20%**, damage dealt to the Shadow faction **+20%**.
- Sharing, refreshing, and switching follow the same rules as [暗影协同].

See [Items and Food](/en/mechanics/items#芒伊木特殊可食用物品) for special edible items.

</section>

<section class="status-entry">

### [#三个灵魂]Three Souls {#三个灵魂}

- A status gained after the player eats [被侵蚀的虚影].
- For 480 seconds (1 day), the player gains both <DSTIcon icon="moonaligned" />**Lunar faction** and <DSTIcon icon="shadowaligned" />**Shadow faction** tags.<span class="heimu" title="Behind the scenes, outside the game">Double agent</span>
- Ignores all **entity collision**, but still **cannot cross terrain**.
- [芒伊月] in P1, [敌意虚影·启迪], [荒尹沐], [沐尹荒], and `Nightmare Creatures` / `Ink Blights` summoned by [编织梦魇] regard you as **the same faction** and stay neutral (*they still retaliate if attacked*).
- While active, occasionally **moves around** or **speaks** on its own (*player input immediately interrupts this*).

</section>

## Forms and Followers {#形态与随从}

<section class="status-entry">

### [#兽化身躯]Beast Form {#兽化身躯}

Persists after pressing V to enter [兽化], ending when you leave the form or die.

See [Beast Form](/en/mechanics/core#def-兽化) for detailed effects.

</section>

<section class="status-entry">

### [#怨灵身躯]Wraith Mode {#怨灵身躯}

Persists after removing [封印项圈] to enter [怨灵]. Put the collar back on to exit.

See [Wraith Mode](/en/mechanics/core#def-怨灵) for detailed effects.

</section>

<section class="status-entry">

### [#分头行动状态]Head Out {#分头行动}

The status indicator for head–body separation. Both ordinary [分头行动] and [意识转移] appear as “Head Out” on the status panel. Ends upon reattachment, excessive distance, or depleted Soul.

- Defaults to **0.5 Soul per second**, customizable or settable to 0 in [Mod Settings](/en/mechanics/settings#机制结算设置). Received Soul recovery is halved. Sanity falls faster as the distance between head and body increases, up to **−60/minute**.
- **Ordinary Head Out**: The player controls the head; the body follows.
- **Hands-On**: The player controls the body; the head remains in place as a follower.
- If either the head or body enters combat, both count as in combat.

See [Head Out](/en/mechanics/items#def-分头行动) and [Hands-On](/en/mechanics/skilltree#mem_spirit_link) for their controls, equipment, and damage rules.

</section>

<section class="status-entry">

### [#芒伊月近战模式]Mangelune: Melee Mode {#芒伊月-近战模式}

The status panel shows the remaining melee duration of the [友善的芒伊月] linked to the bond item.

- A Glass Cutter infuses **480 seconds (1 day)**; a Brightshade Sword infuses **960 seconds (2 days)**.
- Uses triple strikes and jumping slashes during this time. The weapon is not lost from durability depletion and cannot be disarmed by roars.
- **The weapon is destroyed when the infusion ends**, and the follower returns to ranged mode. Replacing or losing the linked bond item updates the status display to match the bond.

See [Follower Attack Modes](/en/mechanics/enemies#yue-pet-combat) for infusion, Enlightened Crown changes, and melee behavior.

</section>

<section class="status-entry">

### [#轨道增援]Orbital Reinforcement {#轨道增援}

The temporary equipment status [友善的芒伊月] gains from an Enlightened Supply Drop Pod. Equipment lasts **240 seconds**. The status panel shows the bound follower's remaining equipment duration; temporary equipment is removed on expiry. Equipment side effects may also draw Lunar Lasers.

See [Orbital Reinforcement Command](/en/mechanics/enemies#yue-pet-supply) for summon costs, pod activation, and equipment risks.

</section>

## Cooldowns and Lockdown {#冷却与封锁}

<section class="status-entry">

### [#死亡回归冷却]Death Return Cooldown {#死亡回归冷却}

Begins after activating [死亡回归]. Defaults to **3360 seconds (7 days)**, adjustable in [Mod Settings](/en/mechanics/settings#模组设置补充). Cannot activate again until the cooldown ends. Press X in normal or Wraith Mode to check the remaining time.

</section>

<section class="status-entry">

### [#花期未至]Awaiting Bloom {#花期未至}

A **480-second (1-day)** cooldown after [落叶归根] successfully creates [归途之花]. No cooldown is consumed if no valid landing point exists nearby or spawning fails.

</section>

<section class="status-entry">

### [#位面封锁]Planar Lockdown {#位面封锁}

After a [位面寄生] boss spawns, that world enters lockdown for **10 days** by default, adjustable in mod settings.

- Forest and cave worlds have independent timers; this is not a personal cooldown.
- New planar parasitism cannot trigger during lockdown. Other corpses already undergoing parasitism also fail.
- The status panel synchronizes the remaining time for the current world.

See [Planar Parasitism](/en/mechanics/enemies#def-位面寄生) for parasitism chances, prevention, and corpse handling.

</section>

<span id="伤害与催眠机制" class="dst-anchor"></span>

## Vanilla Mechanics {#原版机制}

<section class="status-entry">

### [#月能灼烧伤害]Lunar Burn Damage {#月能灼烧伤害}

A vanilla damage type. Planar defense reduces it less efficiently, so ordinary planar-damage reduction results cannot be applied directly.

$$\text{Actual damage}=\max\left(0,\text{Listed value}\times \text{Lunar-aligned damage multiplier}-\frac{\text{Planar defense}}{4}\right)$$

This mod's lunar damage is also **halved in caves**: calculate the formula above, then multiply by **50%**. For damage over time, first substitute damage per second, then multiply by the interval between ticks. Resistances from the target, its equipment, and relevant mount equipment all participate in the calculation.

</section>

<section class="status-entry">

### [#极限催眠]Near-Sleep Drowsiness {#极限催眠}

Raises the target's drowsiness to just below the sleeping threshold, usually appearing as a slowdown. Additional drowsiness may then put it to sleep. Effects such as [月光灼烧] and [食物中毒] apply this. See each status entry for whether removal also clears drowsiness.

<details class="archive-disclosure">
<summary>Special case with very long application</summary>
<div class="archive-disclosure-body">

Over an extremely long duration, floating-point error may push drowsiness to the sleeping threshold, causing exceptionally long sleep.

</div>
</details>

</section>

<section class="status-entry">

### [#索敌忽视]Targeting Avoidance {#索敌忽视}

Vanilla creatures usually check targets on their own **target-search cycle**: searching around a designated position, filtering by distance, faction, tags, and other conditions, then deciding whether to lock on or switch aggro. Search centers, ranges, and filtering rules differ between creatures.

**Targeting avoidance** intervenes after “you have been selected in this search”: when conditions are met, there is a chance to discard this candidate. Enemies still search again on the next cycle, so they may ignore you now and discover you a moment later.

- **Cycles vary by creature**: Abigail checks every **0.5 seconds**, ordinary Spiders every **1 second**, and Bearger every **3 seconds**, for example. 0.5–3 seconds is the range of these common examples, not a universal limit for all creatures.
- **Checked whenever selected**: The chance neither shortens nor extends the search cycle, nor guarantees that the enemy will continue ignoring you on later checks.
- **Existing aggro remains**: This mod's chance-based ignoring only applies if you are not the enemy's current target. It cannot automatically make an enemy already targeting you stop pursuit. Attacking, hit-induced aggro, or other target-assignment methods may still cause combat.

This mod's [捕猎姿态] gives ordinary enemies a **40%** chance to ignore you. [隐藏本能] Level I / II raises this to **50% / 60%**. Bosses and epic creatures are unaffected by this chance. Reducing **detection radius** is a separate check: candidates outside the concealment radius are excluded outright, without relying on this random roll.

See [Hunt](/en/mechanics/core#beast-hunt) for Hunting Stance and skill bonuses.

</section>

<section class="status-entry">

### [#理智值修正]Sanity Modifier {#理智值修正}

Effects that continuously change a character's Sanity, either draining or restoring it. For example, **−1** per second means an ongoing loss of 1 point each second, while [兽化]'s innate **+3** per minute is a positive modifier.

To distinguish these from **Sanity auras**, look at the source:

- **Sanity modifiers**: Applied directly to the character's Sanity change, without the radius or distance falloff inherent to a Sanity aura. Common examples include dusk / night or darkness drain, and the continuous drain from [怨灵] and [暗影臣民]. Values can still vary with lighting, form, or other conditions.
- **Sanity auras**: Nearby entities such as creatures or structures affect an observer's Sanity. Usually weaker at greater distance and inactive outside their range; some auras have their own distance rules.
- **Bee Queen Crown**: Only reverses **negative Sanity auras** into Sanity restoration at half strength. It does not reverse the non-aura modifiers above. For example, Wraith Mode's 1 Sanity-per-second drain remains even while wearing the crown.

Final Sanity change combines these effects. Still losing Sanity while wearing the crown does not mean a negative aura failed to reverse; other modifiers may still be draining it.

</section>

<section class="status-entry">

### [#暗影等级]Shadow Level {#暗影等级}

A level value on certain items, usually associated with Shadow equipment. **Shadow Level and an item's Sanity effects are calculated separately**. Whether an item drains Sanity, or a character is immune to that drain, does not tell you whether it has Shadow Level.

#### Vanilla: Maxwell's Shadow Duelists {#原版-麦斯威尔的暗影角斗士}

Maxwell's currently **worn or held equipment** contributes to his total Shadow Level. Items in ordinary inventory or backpack slots do not count toward this equipment total.

When Maxwell is near a Duelist or its attack target, his total equipment Shadow Level strengthens the Duelist's attacks: **each level adds 4 base attack damage**. A total of 5 levels, for example, adds 20 base damage. Other factors also affect behaviors such as attack speed, so not every enhancement comes from Shadow Level.

#### This Mod: Friendly Mangmire {#本模组-友善的荒尹沐}

Shadow Level also affects the durability costs of [友善的荒尹沐]'s summons and infusions, and grants damage reduction to summoned shadows and bodies. See [Durability Costs and Shadow Level](/en/mechanics/enemies#人偶武装·收集) and the [Shadow Dossier](/en/mechanics/enemies#shadow-pet-minion-behavior) for the rules.

For more on Maxwell's Duelists, see the [English Wiki](https://dontstarve.wiki.gg/wiki/Shadow_Puppet/DST#Shadow_Duelist) or [Chinese Wiki](https://dontstarve.huijiwiki.com/wiki/暗影傀儡).

</section>

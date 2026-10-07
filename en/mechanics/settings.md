---
pageClass: ink-archive archive-settings
title: Mod Settings
description: Difficulty presets, every configuration option, defaults and input ranges for the Mangem mod, plus Boss enhancement demonstrations and mechanic interactions.
outline: [2, 4]
prev:
  text: Skill Tree
  link: /en/mechanics/skilltree
next: false
---

<div class="archive-eyebrow">Mod Settings <span>06 / Customization & Balance</span></div>

# Mod Settings {#五、-模组设置}

Under **World Selection → Mod Settings**, you can adjust Mangem's mechanics, values, display, and controls. All configurable options are listed below in their in-game groups. The **defaults** in the tables are the base configuration before manual changes; selecting another difficulty preset changes some of these options.

<nav class="archive-index" aria-label="Settings categories">

- [Basic Settings](#基础设置) Difficulty presets, language, and jump controls
- [Interface & Sound](#界面显示与音效) Floating numbers, status panel, and sounds
- [Mechanics & Balance](#模组设置补充) Base stats, Beast Form, Soul, and skills
- [Boss Settings](#boss-强化设置) Parasitism cooldown, stats, and enhancement demonstrations
- [Follower Settings](#随从相关) Names, Health, cooldowns, and summoning costs
- [Head Out](#机制结算设置) Upkeep costs and body attack calculations

</nav>

## Changing Settings & Entering Values {#修改方式与数值输入}

- **Keybindings**: After entering the game, scroll to the bottom of `ESC → Options → Controls` to change them. The “Keybindings” mod setting is only a pointer to that menu.
- **Custom values and names**: Click the relevant value or name in the world's mod settings to enter it. If you only see “World Settings,” return to the world selection screen to make the change.
- **Ranges and precision**: The listed ranges are the limits accepted by the manual input fields, inclusive of both endpoints. Options marked “integer” are rounded to the nearest whole number; other values generally retain two decimal places, while Soul Mark Health Constant retains three. Presets may use values outside the manual input ranges.
- **Ratios and probabilities**: Enter decimals: for example, `0.2` means 20% and `1` means 100%. A multiplier of `1` retains the original rate. Time units are seconds or days, as specified for each option.
- **Custom names**: Names cannot be empty; no more than 10 Chinese characters is recommended. Names apply to all players. Non-Chinese and mixed-language names are also subject to the input field's length limit.

<p class="archive-table-note">On narrow screens, scroll tables horizontally to see defaults and complete descriptions.</p>

## Basic Settings {#基础设置}

<ComparisonTable label-id="基础设置">

| Setting | Options | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Difficulty Preset | Casual / Normal / Default / Hard / Custom | Default | Adjusts mechanics and values together, with individual fine-tuning available afterward. See [Preset Details](#难度预设) below. |
| Language | Auto / Simplified Chinese / English | Auto | Auto follows the game client's language. |
| Taunt Style | Normal / Meme | Normal | Changes the lines used for automatic low-Sanity [嘲讽]; “Taunt & Lurking Terror” controls whether taunting is enabled. |
| Speech Style | Old (Classic) / New (Complete) | Old (Classic) | Selects the character's item inspection text. The new version includes more complete custom inspection lines. |
| [Beast Form] Combat Mode | Classic / Modern | Classic | Changes unarmed Beast Form attack range, player hold-F timing, and automatic body attack timing. Both modes retain a 7-frame recovery-cancel cooldown. Reload the world to apply; see the [timing comparison](/en/mechanics/core#beast-combat). |
| [兽化状态] Jump Habit | Off (Shift Key) / On (Adaptive) | On (Adaptive) | Determines whether [跳跃] follows the cursor or movement direction. See [Jump Controls & Protection](#跳跃操作与保护) below. |
| Safe Jump | Strict / Safe Landing / Off | Strict | Controls out-of-range handling and landing protection for cursor-directed jumps; all three modes retain the maximum jump distance. |
| Mask Parasitism Fix | Off / On | On | Attempts to clear lingering parasitism flags and AI control after being killed by a masked creature, such as uncontrolled movement after revival or abnormal repeat parasitism. |

</ComparisonTable>

### Difficulty Presets {#难度预设}

**“Normal” and “Default” are different presets.** When a preset is selected, options it does not specify inherit the values in the “Default” preset; only options absent from both keep their current values. Changing an individual option marks the preset as “Custom.” Selecting a preset again reapplies all the settings it covers.

<ComparisonTable label-id="难度预设">

| Preset | Beast Form Combat Mode | Main Differences |
| :--- | :--- | :--- |
| Casual | Modern | Reduces form-switching penalties and uses easier equipment recipes; disables in-game skill awakening, low-Sanity taunting, and Lurking Terror spawning, while improving follower survival and endurance. |
| Normal | Modern | Reduces some penalties relative to Default and uses easier equipment recipes; retains in-game skill awakening and Lurking Terror spawning, but disables low-Sanity taunting. |
| Default | Classic | Restores the base balance values for the options covered by the preset: retains in-game awakening, taunting, and Lurking Terror, and disables the Boss special enhancements covered by the preset. |
| Hard | Classic | Increases some penalties, uses classic equipment recipes and strict skill awakening, and enables Anti-Rollback Penalty; raises some Boss parameters and enables Orbital Deployment (25%), Moonscorched Earth, Ghost Fire Overflow (50%), Cognitive Blockade, and In Lockstep. It does not enable every enhancement. |
| Custom | Current individual setting | Indicates manually adjusted settings; it is not an additional fixed difficulty. |

</ComparisonTable>

**Soul Mark Health Constant is not changed by difficulty presets and remains at its default of 0.02.** This constant affects damage from detonators such as both Bosses and friendly followers, so simply raising or lowering it does not consistently mean harder or easier gameplay. It can still be customized separately.

### Jump Controls & Protection {#跳跃操作与保护}

With “Jump Habit” on, jumping while stationary follows the cursor, while jumping in motion follows your movement direction. With it off, use **Shift + Jump** to switch to cursor-directed jumping. You can also bind a dedicated cursor-jump key in the game's control settings.

“Safe Jump” applies both to the cursor-directed jumps above and to the dedicated cursor-jump key:

- **Strict**: Rejects the jump if the cursor is beyond maximum jump range or the landing point is ocean/void.
- **Safe Landing**: If the cursor is out of range, jumps as far as possible in that direction; rejects the jump if the actual landing point is ocean/void.
- **Off**: Still limits out-of-range jumps to the maximum distance, but allows ocean/void landings, which may cause drowning or falling.

See [跳跃] for form requirements and distance calculations.

## Interface & Sound {#界面显示与音效}

Corresponds to the in-game “Interface” group.

<ComparisonTable label-id="界面显示与音效">

| Setting | Options | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Soul Damage Text | Off / On | On | Displays floating numbers when [灵魂值] changes. |
| Buff Panel | Off / On | On | Displays a status-monitoring panel containing only buffs and debuffs added by this mod. |
| Buff Timer Format | Smart (Min/Sec) / Seconds (120s) / Detailed (2m 5s) | Smart (Min/Sec) | Changes the Buff Panel's countdown format; requires Buff Panel to be enabled. |
| [电锯轰鸣] Sound | Off / On | On | Controls the chainsaw sound of [电锯惊魂] while [电锯轰鸣] is active. |
| [兽化状态] Attack Sound | Off / On | Off | Plays a tearing sound when a Beast Form attack hits. |

</ComparisonTable>

## Mechanics & Balance {#模组设置补充}

### Base Stats {#基础属性}

These are the character's base maximums. Changes from skills, states, and equipment are calculated separately.

<ComparisonTable label-id="基础属性">

| Setting | Input Range | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Max Health | 1–999, integer | 75 | Character's base maximum [生命值]. |
| Max Sanity | 1–999, integer | 200 | Character's base maximum [精神值]. |
| Max Hunger | 1–999, integer | 150 | Character's base maximum [饱食度]. |
| Max Soul | 1–999, integer | 150 | Character's base maximum [灵魂值]. |

</ComparisonTable>

### Beast Form & Collars {#兽化与项圈}

<ComparisonTable label-id="兽化与项圈">

| Setting | Options or Input Range | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Beast Form Penalty | 0–0.99 | 0.2 (20%) | Deducts Hunger on entering [兽化] and Sanity on leaving it, based on the corresponding maximum; the exit penalty is also affected by the collar's suppression effect. |
| Beast Form Unarmed Damage | 1–999 | 30 | Base damage of unarmed Beast Form attacks. |
| Beast Form Damage Reduction | 0–0.99 | 0.65 (65%) | Beast Form's innate direct damage reduction ratio; also affects most ongoing Health-drain effects. |
| Beast Form Hunger Rate | 0–10 | ×2 | Hunger drain multiplier in Beast Form; 0 disables this drain. |
| Safe Collar Swap | Trigger Penalty / Bypass Penalty | Bypass Penalty | Directly replacing a worn [封印项圈] with another collar can bypass the Health loss and transformation delay caused by removing it. |
| Collar Unequip Penalty | 0–0.99 | 0.2 (20%) | Fraction of maximum Health lost when removing the collar and entering [怨灵]. Setting it to 0 still triggers the transformation delay. |

</ComparisonTable>

“Safe Collar Swap” applies to **direct replacement**; “Collar Unequip Penalty” applies to **removing a collar**. They control different situations. See [兽化], [怨灵], and [封印项圈] for form switching and basic mechanics.

### Soul & Marks {#灵魂与刻印}

<ComparisonTable label-id="灵魂与刻印">

| Setting | Options or Input Range | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Soul-Fueled Healing | Off / On | On | Allows [灵魂值] to be spent to restore Health while out of combat and unaffected by disabling effects such as [灵魂震荡]. |
| [鬼火] Cast Cost | 0.01–100 | 5 | Soul spent to cast Ghost Fire unarmed. |
| Ghost Fire Damage | 1–100 | 10 | Affects allied, hostile, and [四象离魂] Ghost Fire; the special Ghost Fire of [友善的芒伊月] deals 2 times this value. |
| Soulfire Orbit Drain Rate ([四象离魂]) | 0–50, up to two decimal places | 0.5 | [灵魂值] spent per second to maintain the skill; 0 disables the ongoing drain. |
| Soulfire Orbit Collision Cost ([四象离魂]) | 0–50, up to two decimal places | 0.5 | [灵魂值] spent each time Ghost Fire collides with a target; during [分头行动]/[意识转移], the two rings check hits separately and each hit costs half this amount. |
| Chainsaw Mark Cost | 0.01–999 | 3 | Soul spent to apply [魂魄刻印] with each attack in [刻印形态]; also affects Soul refunded by mark-detonation kills and [闪耀刻印]. |
| Soul Mark Soul Constant | 0.2–1 | 0.2 (20%) | If the detonator has a Soul system, base damage is “detonator's missing Soul × constant × stacks.” |
| Soul Mark Health Constant | 0.001–1, three decimal places | 0.02 (2%) | If the detonator has no Soul system, base damage is “detonator's missing Health × constant × stacks”; unaffected by difficulty presets. |

</ComparisonTable>

The two [四象离魂] costs above change with the preset: both are **0.25** on Casual, **0.5** on Normal and Default, and **1** on Hard.

The relevant constant depends on the **detonator**, not the marked target. Units such as [荒尹沐], [友善的荒尹沐], and [友善的芒伊月] use the Health constant, so changing it affects the corresponding damage on both sides. See [魂魄刻印] and [闪耀刻印] for stack bonuses, on-kill recovery, and upgrade rules.

### Survival, Equipment & Skills {#生存、装备与技能}

<ComparisonTable label-id="生存、装备与技能">

| Setting | Options or Input Range | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Death Return Cooldown | 0–99999 seconds, integer | 3360 seconds (7 days) | Cooldown after using [死亡回归]. |
| Equipment Recipe Difficulty | Hard (Classic) / Default (Medium) / Easy (Casual) | Default (Medium) | Changes the crafting materials for level-four [暗项圈] and [月项圈]; see the respective items for recipes. |
| In-Game Skill Awakening | Off / On / Strict | On | Determines whether sealed skills require in-world challenges and when progress begins to accumulate. See [Awakening Modes](#技能局内觉醒). |
| Taunt & Lurking Terror | Disabled / Nightmare Only / Both Enabled | Both Enabled | Separately controls low-Sanity [嘲讽] and [潜伏恐惧] spawning; see below. |
| Anti-Rollback Penalty | Off / On | Off | Detects attempts to avoid death by rolling back; only affects Mangem. See [Triggers & Outcomes](#def-反回档惩罚). |
| Repair Tool: Reverse Cursed Technique | Gambler's Repair / Reverse Cursed Technique | Reverse Cursed Technique | Changes the success chance and cost calculations of [芒式修补工具]; see below. |

</ComparisonTable>

#### In-Game Skill Awakening {#技能局内觉醒}

- **Off**: Learned skills take effect immediately, without completing in-world awakening challenges.
- **On**: Some [封印技能] only take effect after their corresponding challenges are completed.
- **Strict**: A skill must be learned before progress toward its challenge begins to accumulate.

See [技能觉醒] for specific awakening conditions. The Wiki skill-tree simulator only checks prerequisites and points, not challenge progress in your world.

#### Taunt & Lurking Terror {#嘲讽与潜伏恐惧}

- **Disabled**: Disables low-Sanity taunting and Lurking Terror spawning.
- **Nightmare Only**: Disables low-Sanity taunting while retaining Lurking Terror spawning.
- **Both Enabled**: Retains both mechanics.

“Nightmare” in this setting refers to [潜伏恐惧], not every vanilla shadow creature. See [嘲讽] and [潜伏恐惧] for their respective triggers.

#### [#反回档惩罚]Anti-Rollback Penalty {#反回档惩罚}

**Off** by default. When enabled, normal deaths are recorded; rolling back to before a recorded death triggers a check. [灵魂出窍] does not count as a normal death. The beginner protection period is exempt, and rolling back more than 2 days does not trigger the penalty.

- **5% chance**: Grants [再一次的机会].
- **45.5% chance**: Applies a total of 100% [灵魂震荡].
- **49.5% chance**: Applies a total of 150% [灵魂震荡].
- New penalties accumulate with any unrecovered portion, subject to each stat's cap; [魂墙(技能)] only speeds recovery and does not grant immunity.

#### The Repair Tool's Two Modes {#修补工具的两种模式}

In **Gambler's Repair** mode, success chance equals the target's remaining durability percentage, with a fixed tool durability cost; failure reduces Sanity and spawns hostile shadow creatures. In **Reverse Cursed Technique** mode, success chance equals the target's damaged percentage, so more damaged items are easier to repair. The tool's own durability and Soul also increase or decrease based on the target's condition.

See [芒式修补工具] for complete calculations and interactive examples.

## Boss Settings {#boss-强化设置}

These settings adjust Bosses created by [位面寄生]. Special enhancements can change attacks, units on the battlefield, and warnings. All seven enhancements are off by default (probability options are 0).

<ComparisonTable label-id="boss-强化设置">

| Setting | Input Range | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Boss Cooldown Time | 1–999 days, integer | 10 days | Cooldown before the next parasitism event after a successful infestation. Lunar and shadow parasitism share [位面封锁], with separate timers on the surface and in caves; unsuccessful parasitism does not start the cooldown. |

</ComparisonTable>

During Planar Lockdown, Lurking Terror spawn chance and random planar enhancements are also affected. See [位面封锁].

### Mangelune<DSTIcon icon="yue" /> {#芒伊月}

<ComparisonTable label-id="芒伊月">

| Setting | Options or Input Range | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Mangelune: Custom Name | Custom text | Mangelune | Changes [芒伊月]'s name for all players. |
| Mangelune: Max Health | 100–50000, integer | 1000 | Boss maximum Health. |
| Mangelune: Healing | 0.01–10 | ×1 | Changes the healing multiplier and also affects sleep duration; higher values mean more healing and shorter sleep. |
| Mangelune: Orbital Deployment | 0–1 | 0 (0%) | Chance for laser support to additionally trigger [启迪陷阱空袭]. |
| Mangelune: Total War | Off / On | Off | Enhances multi-player targeting, melee area attacks, and Glassmail fragments. |
| Mangelune: Moonscorched Earth | Off / On | Off | Orbital Lasers leave damage-over-time and sleep zones, and sweep warning arrows are removed. |

</ComparisonTable>

At the default healing multiplier, the hand-rubbing cooldown restores **10 Health per second**, and the “Undying Shadow” sleeps for **30 seconds**. At a multiplier of 2, these become 20 Health per second and 15 seconds. See [芒伊月] for the full encounter.

<ShowcaseBlock video="/videos/66hl_web.webm">

#### Orbital Deployment {#_66号令}

Raising the probability allows [芒伊月]'s laser support to additionally trigger [启迪陷阱空袭]. The number of players participating in combat affects reinforcement numbers. The finishing laser at the end of the near-death phase does not trigger it.

See [Mangelune: Orbital Deployment](/en/mechanics/enemies#moon-order-66) for triggers, player counting, and exceptions.

</ShowcaseBlock>

<ShowcaseBlock reverse video="/videos/qmzz_web.webm">

#### Total War {#全面战争}

Enhances [芒伊月]'s multi-player attacks, including multi-target Gestalt Fields and laser targeting, melee area attacks, and enhanced Glassmail fragments.

See [Mangelune: Total War](/en/mechanics/enemies#moon-total-war) for target caps, hit rules, and equipment changes for each attack.

</ShowcaseBlock>

<ShowcaseBlock video="/videos/zyjt_web.webm">

#### Moonscorched Earth {#灼夷焦土}

When enabled, [芒伊月]'s [天基激光] leaves damage-over-time and sleep zones. **The original path remains dangerous after the laser has passed.** The warning arrows showing the sweep direction are also disabled.

Player-summoned lasers do not leave scorched tiles, but their warning arrows are also disabled. See [Mangelune: Moonscorched Earth](/en/mechanics/enemies#moon-scorched-earth) for duration and affected targets.

</ShowcaseBlock>

### Mangmire<DSTIcon icon="shadowmem" /> {#荒尹沐}

<ComparisonTable label-id="荒尹沐">

| Setting | Options or Input Range | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Mangmire: Name | Custom text | Mangmire | Changes [荒尹沐]'s name; the name splits when the head and body separate. |
| Mangmire: Max Health | 100–50000, integer | 1000 | Boss maximum Health; a higher maximum may also increase mark detonation damage after Health is lost. |
| Erimgnam: Max Health | 10–10000, integer | 250 | Maximum Health of hostile [沐尹荒]. |
| Mangmire: Healing | 0.01–10 | ×1 | Scales P1 out-of-combat healing, P2 continuous healing, and healing from [编织梦魇] self-destruction. |
| Mangmire: Soul Echo | 0–1 | 0 (0%) | Chance to create an additional independently acting shadow when Ghost Fire hits an enemy target. |
| Mangmire: Ghost Fire Overflow | 0–1 | 0 (0%) | Chance for a qualifying incoming hit to trigger extra Ghost Fire toward allies. |
| Mangmire: Cognitive Blockade | Off / On | Off | At high Sanity, Erimgnam and Woven Nightmare also become untargetable. |
| Mangmire: In Lockstep | Off / On | Off | The P2 body can still command additional shadows to replicate its moves. |

</ComparisonTable>

Increasing the main body's or shadows' maximum Health increases the amount of Health they can lose. When these units detonate [魂魄刻印], its base damage uses the **detonator's missing Health**. Health adjustments may therefore also change their offensive threat. See [Mangmire: Soul Mastery](/en/mechanics/enemies#特殊机制-灵魂驾驭) for these interactions.

At a healing multiplier of 1, P1 restores **5%** of maximum Health every 5 seconds out of combat, P2 restores **5 Health per second**, and each Woven Nightmare self-destruction heals **50 Health**. All three scale with the healing multiplier.

<ShowcaseBlock reverse video="/videos/lhhs_web.webm">

#### Soul Echo {#灵魂回声}

When Ghost Fire from [荒尹沐]'s side hits an enemy target such as a player, it has the configured chance to spawn **1 [沐尹荒]** near the target. This shadow acts independently of normal formation commands.

The effect does not trigger when Ghost Fire hits and is absorbed by an ally on Mangmire's side. See [Mangmire: Soul Echo](/en/mechanics/enemies#shadow-soul-echo) for tracking and ranged-counter hit rules.

</ShowcaseBlock>

<ShowcaseBlock video="/videos/yhys_web.webm">

#### Ghost Fire Overflow {#幽火溢散}

When [荒尹沐]'s main form, P2 head, body, or P2 shadows take a qualifying hit, they have the configured chance to fire extra [鬼火] toward allies that can receive it.

With “Soul Echo” also enabled, extra Ghost Fire from incoming hits may create further shadows if it then hits a player. **Extra Ghost Fire and shadow spawning must still satisfy their own conditions separately.** See [Mangmire: Combat Settings](/en/mechanics/enemies#shadow-settings) for damage thresholds, cooldowns, and exceptions.

</ShowcaseBlock>

<ShowcaseBlock reverse video="/videos/rzzd_web.webm">

#### Cognitive Blockade {#认知遮断}

When enabled, [沐尹荒] and [编织梦魇] also become **untargetable** at high Sanity, while remaining able to fight. When disabled, high Sanity only affects their visual visibility.

See [沐尹荒] for shadow invulnerability and targeting rules in each phase, and [编织梦魇] for its targeting and healing rules.

</ShowcaseBlock>

<ShowcaseBlock video="/videos/rysx_web.webm">

#### In Lockstep {#如影随形}

When enabled, after [荒尹沐]'s head and body separate in P2, the body can still command **2 additional shadows** to replicate its moves. These shadows do not act independently and differ from the encircling shadows summoned by the head.

While dodging the body's moves, you must also watch the positions of the replicating shadows. See [Mangmire: Combat Settings](/en/mechanics/enemies#shadow-settings) for phase roles and shadow rules.

</ShowcaseBlock>

## Follower Settings {#随从相关}

These parameters apply separately to [友善的芒伊月], [友善的荒尹沐], and their derived units. Boss Health, healing, and special enhancements should not be directly applied to friendly followers. See [Soul & Marks](#灵魂与刻印) above for shared Ghost Fire damage and mark constants.

### Friendly Mangelune {#友善的芒伊月}

<ComparisonTable label-id="友善的芒伊月">

| Setting | Input Range | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Luna Ally: Name | Custom text | Friendly Mangelune | Changes the follower's name globally. |
| Luna Ally: Bond Name | Custom text | Radiant Will | Changes the name of [光辉意志] globally. |
| Luna Ally: Max Health | 100–50000, integer | 1000 | Follower maximum Health. |
| Luna Ally: Cooldown Scale | 0.01–10 | ×1 | Radial-menu skill cooldown multiplier; for example, 0.5 halves cooldowns and 2 doubles them. |
| Luna Ally: Melee Duration | 1–99999 seconds, integer | 480 seconds (1 day) | Melee duration with a Glass Cutter; a Brightshade Sword lasts 2 times as long. The weapon is destroyed when the time expires. |

</ComparisonTable>

See [友善的芒伊月] for radial commands, attack modes, and maintenance.

### Friendly Mangmire {#友善的荒尹沐}

<ComparisonTable label-id="友善的荒尹沐">

| Setting | Options or Input Range | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Shadow Ally: Name | Custom text | Friendly Mangmire | Changes the follower's name globally; the name splits when the head and body separate. |
| Shadow Ally: Bond Name | Custom text | Pioneer Will | Changes the name of [先驱意志] globally. |
| Shadow Ally: Max Health | 100–50000, integer | 1000 | Maximum Health of the follower's main form. |
| Shadow Minion: Max Health | 10–10000, integer | 250 | Friendly shadow maximum Health. |
| Shadow Ally: Summon Cost | 0.01–10 | ×1 | Multiplier for Soul and weapon durability spent summoning shadows/bodies, affecting both basic and empowered summons; refunded Soul also scales with it. |
| Shadow Ally: Planar Resist | No Bonus / Planar Defense (+10) / Planar Entity / Both Bonuses | No Bonus | Grants [友善的荒尹沐] and its derived units planar defense, the planar-entity damage reduction formula, or both. |

</ComparisonTable>

See [暗影负载] for summoning cost calculations, and [友善的荒尹沐] for work, combat, and skill inheritance.

## Head Out {#机制结算设置}

This group controls upkeep costs for [分头行动] and [意识转移], and the body's attack calculations during [分头行动]. Friendly follower summoning costs have a separate option in the preceding group.

<ComparisonTable label-id="机制结算设置">

| Setting | Options or Input Range | Default | Effect & Notes |
| :--- | :--- | :--- | :--- |
| Head Out Drain Rate | 0–50, up to two decimal places; recommended 0.1–2 | 0.5 | [灵魂值] spent per second during [分头行动] or [意识转移]; 0 disables ongoing drain. |
| Decoupled Body: Effect Limit | 1–15, integer | 1 | Limits how many targets receive additional effects from a single area attack; does not limit the area damage itself. |
| Body: Durability/Soul Cost | Once Per Attack (1 cost) / Extra Per Target (on hit) | Once Per Attack (1 cost) | Determines whether an area attack pays its cost once, or pays more for each target receiving an effect; subject to the effect limit. |

</ComparisonTable>

### Body: Effect Limit {#身体-特效上限}

Affects multi-target calculations for [怨灵] combat healing, [电锯惊魂]'s [刻印形态] and [电锯轰鸣], and similar effects. The default limit is **1**, so these additional effects apply only to the main target.

**Example**: With the limit set to 4, an attack hitting 10 units can apply [魂魄刻印] or the corresponding combo effects to at most 4 of them. The remaining targets can still take area damage.

### Body: Durability/Soul Cost {#身体-耐久-灵魂损耗}

- **Once Per Attack (1 cost)**: Deducts weapon durability/Soul **1 time**, regardless of the number of targets hit, while still allowing effects on multiple targets up to the limit.
- **Extra Per Target (on hit)**: Increases costs according to the number of targets receiving effects. For example, with a limit of 4 and 10 units hit, costs and effects apply at most **4 times**.

“Once” here means the single-use cost of the weapon and form involved. **It does not mean every situation costs only 1 Soul.** When the effect limit is 1, both modes charge only once.

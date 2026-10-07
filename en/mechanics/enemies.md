---
pageClass: ink-archive archive-enemies
title: Enemies and Followers
description: Planar Parasitism, Mangelune and Mangmire's combat phases, and friendly followers' equipment, commands, and work routines.
outline: [2, 4]
prev:
  text: Items and Cooking
  link: /en/mechanics/items
next:
  text: Statuses and Mechanics
  link: /en/mechanics/statuses
---

<div class="archive-eyebrow">CREATURE ARCHIVE <span>03 / ENCOUNTERS & COMPANIONS</span></div>

# Enemies and Followers {#三、-敌人与随从}

This chapter covers the Mangem mod's **hostile creatures (bosses)** and controllable **friendly followers**. It includes the two bosses created by [位面寄生], [芒伊月] and [荒尹沐], and the [友善随从] derived from them.


<nav class="archive-index" aria-label="On this page">

- [Planar Parasitism](#def-位面寄生) Spawn conditions, energy, and lockdown
- [Mangelune](#def-芒伊月) Gestalt Fields, phase transitions, and associated effects
- [Mangmire](#def-荒尹沐) Shadow coordination, head-body separation, and encirclement
- [Friendly Followers](#def-友善随从) Revival, equipment, and skill inheritance
- [Follower Commands](#def-光辉意志) Radiant Will, Pioneer Will, and work modes
- [Other Creatures](#其余生物) Lurking Terror and planar empowerment

</nav>


## [#位面寄生]Planar Parasitism<DSTIcon icon="shadowaligned" /> {#位面寄生}

<div class="archive-illustrated">

<MediaCard position="inline" loading="lazy"
  src="/box_jisheng.webp"
  caption="An Incursive Gestalt preparing to parasitize a corpse (left)\nand a corpse about to be parasitized by a Herald of Tenebrau (right)"
  width="320px"
/>

<div class="archive-copy">

Each newly spawned [芒芒的尸体] has a chance to trigger [位面寄生]. If it triggers, the corpse is parasitized and **revives as a boss**.

Planar Parasitism has two types, [暗影位面寄生] and [月亮位面寄生], which revive different bosses.

</div>
</div>

### Factors Affecting Parasitism Chance {#寄生概率因素}

[#位面能量]The chance and type of parasitism depend on the [位面能量] at that location. The bonuses below apply to their respective types of parasitism.

<span id="暗影能量" class="dst-anchor"></span><span id="def-暗影能量" class="dst-anchor"></span><span id="-1"></span><span id="月亮能量" class="dst-anchor"></span><span id="def-月亮能量" class="dst-anchor"></span>

<ComparisonTable label-id="寄生概率因素" class="energy-table">

| Factor | <DSTIcon icon="shadowaligned" /> Shadow Energy | <DSTIcon icon="moonaligned" /> Lunar Energy | Effect |
| :--- | :--- | :--- | :--- |
| Turf | Shadow-aligned Ruins turf<span class="energy-exclusion">Excludes Archive turf</span> | Turf associated with the Lunar Island, Lunar Rifts, or Lunar Grotto<span class="energy-exclusion">Excludes Moon Quay and Shell Beach turf</span> | Parasitism weight ↑ |
| Area | Shadow-aligned Ruins areas<span class="energy-exclusion">Excludes Archive areas</span> | Areas associated with the Lunar Island, Lunar Rifts, or Lunar Grotto<span class="energy-exclusion">Excludes Moon Quay and Hermit Island areas</span> | Parasitism weight ↑<br>Parasitism chance ↑ |
| Moon phase | New moon | Full moon | Parasitism weight ↑<br>Parasitism chance ↑ |
| Special conditions | Nightmare Cycle in the "Nightmare" phase | Inside a Moonstorm | Parasitism weight ↑<br>Parasitism chance ↑ |
| Rifts | Shadow Rift stage and distance<span class="energy-exclusion">Not Nightmare Fissures activated during the Nightmare phase</span> | Lunar Rift stage and distance<span class="energy-exclusion">Not Celestial Fissures on the Lunar Island</span> | Parasitism weight ↑<br>Parasitism chance ↑ |

</ComparisonTable>

**Shared restriction**: [位面封锁] reduces both types' parasitism chance; no parasitism triggers during lockdown.

<div class="archive-table-note">

Use [芒芒尸体的设计图] to check the parasitism chance at your current location.

</div>

<span id="def-位面封锁" class="dst-anchor"></span>

After a parasitic boss spawns, the current world enters [位面封锁] for **10 days** by default, preventing new parasitism. The Forest and Caves have separate timers.


### Shadow Affinity Bias {#暗影亲和偏向}
Because of Mangem's `Shadow Affinity`, when both shadow and lunar parasitism are possible:
- **Shadow parasitism weight** gains an additional +10%
- [月亮位面寄生] has a chance to be **converted into [暗影位面寄生]**

### Parasitism Lock-in {#寄生锁定}
Once [位面寄生] is confirmed, that [芒芒的尸体] can no longer be **ignited**: planar forces extinguish the flames. You must stop parasitism by other means.
- Examples include destroying the corpse with an explosion, applying a [尸体防腐核心] upgrade, or dismantling the corpse.

Once a parasitic boss spawns, any other corpses already undergoing parasitism also fail to complete it because of [位面封锁].

## [#月亮位面寄生]Lunar Parasitism: Mangelune<DSTIcon icon="moonaligned" /> {#月亮位面寄生-芒伊月}

When [月亮位面寄生] triggers, [芒芒的尸体] revives as the boss [芒伊月].

<section class="yue-combat">

### [#芒伊月]Mangelune<DSTIcon icon="yue" /> {#芒伊月}

Mangelune has two combat phases: **P1 uses Gestalt Fields while continually retreating; at 30% health, P2 begins, switching to the Shadow faction and fighting in melee with Triple Strike and Leaping Cleave.** The transition also provokes an attack from lunar forces, affecting both players and Mangelune.

**Depleting its health alone does not kill it.** In P2, Mangelune retains at least 1 health and enters a near-death state. The eleven-column laser sweep near the end of that state must hit it to remove its survival safeguard and finish it off.

The following describes default settings. Multiplayer targeting, extra reinforcements, lingering laser zones, and healing parameters can be changed through [optional combat settings](#moon-settings).

<span id="def-月光灼烧" class="dst-anchor"></span><span id="def-位面实体降格" class="dst-anchor"></span><span id="def-月能灼烧伤害" class="dst-anchor"></span><span id="def-极限催眠" class="dst-anchor"></span>

Main additional effects: [月光灼烧] deals damage over time and slows targets; [位面实体降格] weakens resistance or increases damage taken. See [Statuses and Mechanics](/en/mechanics/statuses#战斗状态) for full effects and the rules for [月能灼烧伤害] and [极限催眠].

<nav class="phase-links" aria-label="Mangelune combat phases">

[Base Stats](#moon-attributes) · [P1 · Gestalt Fields](#p1-阶段-轰炸信标) · [P2 · Transition and Melee](#p2-阶段-背叛月光) · [Near Death and Finishing the Fight](#不死暗影) · [Equipment and Empowerment](#特殊机制-战时补给) · [Combat Settings](#moon-settings) · [Death Drops](#死亡掉落)

</nav>

<span id="moon-common-rules" class="dst-anchor"></span>

#### Base Stats and Traits {#moon-attributes}

In the stats below, **A → B** indicates the change from **P1 → P2**.

<CreatureDossier
  title="Mangelune"
  image="/mem_yue.webp"
  :stats="[
    { label: 'Health', value: '1000 (depends on mod settings)', icon: '/icons/icon_health.webp' },
    { label: 'Physical Damage', value: 'Depends on weapon'},
    { label: 'Physical Defense', value: 'Depends on armor' },
    { label: 'Planar Damage', value: 'Weapon stats + 10' },
    { label: 'Planar Defense', value: 'Armor stats + 10' },
    { label: 'Movement Speed', value: '6 → 11' },
    { label: 'Attack Range', value: '12 → 3 (Triple Strike) / 12 (Leaping Cleave)' },
    { label: 'Attack Interval', value: '4 → 10 (Triple Strike) / 0 (Leaping Cleave)' },
    { label: 'Sanity Aura', value: '+40/60 → -40/60', icon: '/icons/icon_sanity.webp' },
    { label: 'Faction', value: 'Lunar → Shadow', icon: '/icons/icon_moonaligned.webp' },
    { label: 'Faction Bonuses', value: '-10% damage taken from Lunar faction / +10% damage dealt to Shadow faction\n↓\n-10% damage taken from Shadow faction / +10% damage dealt to Lunar faction' },
  ]"
  :details="[
    { label: 'Target Priority', value: 'Players > Shadow faction → Players' },
    { label: 'Traits', value: 'Planar Entity resistance\nHeals 5% health every 5 seconds out of combat\nImmune to freezing/sleep/burning/teleportation/electric stun\nExplosion resistance\nGroup aggro' }
  ]"
/>

**Equipment rules**: Armor's physical damage reduction is halved; weapons and equipment have infinite durability. See [Equipment and Empowerment](#特殊机制-战时补给) for the equipment pool and extra abilities.

#### P1: Gestalt Fields {#p1-阶段-轰炸信标}

<div class="phase-condition">

**Health > 30%.** Mangelune attacks with Gestalt Fields, retreats while its attack is on cooldown, then briefly rubs its hands after stopping. It also periodically summons a target-tracking Lunar Laser during combat.

</div>

<span id="def-虚影轰炸区" class="dst-anchor"></span>

##### Regular Attack: Gestalt Field {#moon-p1-1}

Mangelune raises a hand toward the target, then creates three flashing markers about **0.8 seconds** apart, forming **3 [虚影侵蚀区]**[#虚影侵蚀区] in sequence. The first appears between Mangelune and the target. The next two use the target's updated position and movement to intercept sideways movement.

After each flash, many small gestalts rush inward from the edge of a circular area. **These gestalts are visual effects; the entire circle is hazardous.** After a brief warning, each field deals damage for **3 seconds**. Targets inside repeatedly take **1 true damage** and have [月光灼烧] applied or refreshed, causing additional damage over time and grogginess-related slowing. The 1-damage hits share a roughly **1.5-second** interval per target, even where fields overlap.

##### Special Attack: Lunar Laser {#moon-p1-3}

<div class="media-float-section">

<MediaCard position="right" manual
  src="/videos/yue-phase1-bombardment-laser.webm"
  caption="Gestalt Fields and Lunar Laser strikes"
  width="320px"
  :intrinsic-width="960"
  :intrinsic-height="540"
/>

[月能激光][#月能激光] is an extraterrestrial strike whose **independent timer starts when combat begins**. It is summoned every **20–40 seconds** and tracks its target for **10 seconds**. The laser deals **20 [月能灼烧伤害] per second** and applies [月光灼烧] and [极限催眠]. The latter causes ongoing slowing; further sleep effects from another source then put the target to sleep.

- **Other targets**: Deals double damage to [芒伊月] and [友善的芒伊月]; only heals targets such as `Gestalts`, the `Celestial Champion`, and [敌意虚影·启迪].
- **Players**: Also increases sanity in addition to the attack effects above.
- **In the Caves**: Damage is halved, and earthquakes occur.

</div>

##### Cooldown Behavior and Counterattacks {#moon-p1-2}

While its attack is on cooldown, Mangelune keeps moving away from its target. After creating some distance, it stops for a **3-second hand-rubbing recovery animation**, healing **10 health per second** by default.

[#近战反击]Being hit while rubbing its hands has a **40%** chance to trigger [近战反击]. This counter has a wind-up, knocks the target back a considerable distance on hit, and **reduces its movement speed by 60% for 5 seconds**. Mangelune then pauses in a taunt animation.

<span id="moon-p1-4" class="dst-anchor"></span>

**Ranged counter**: When hit from beyond a certain distance, it additionally targets the attacker with Gestalt Fields, with a **3-second** cooldown.

#### P2: Transition and Melee {#p2-阶段-背叛月光}

<div class="phase-condition">

**Triggers at 30% health or below.** The corpse's lingering Shadow Affinity corrupts Mangelune, switching it to the <DSTIcon icon="shadowaligned" />**Shadow faction**. It first sleeps through an attack by lunar forces, then switches to melee upon waking.

</div>

##### Transition: Sleep and Lunar Assault {#moon-transition}

<div class="archive-illustrated">

<MediaCard position="inline" manual
  src="/videos/myy_web.webm"
  caption="Mangelune and Mangem under attack by Greater Gestalts and an Enlightened Airstrike"
  width="320px"
/>

<div class="archive-copy">

As its faction changes, lunar forces launch an indiscriminate Greater Gestalt assault. Mangelune falls asleep, **rapidly regenerates health, and gains 99% damage reduction**. It resumes normal behavior after **30 seconds** of sleep or when attacks wake it.

[#启迪陷阱空袭]After a short delay, [启迪陷阱空袭] drops **10 [启迪陷阱阵列]** and spawns [敌意虚影·启迪]. These Gestalts **prioritize players, then Shadow-aligned creatures**.

**1 Gestalt** is guaranteed; three further rolls have **80%, 20%, and 1%** chances respectively to add one more each. See [Mangelune's Associated Creatures and Objects](#芒伊月衍生) for array and Gestalt details.

</div>
</div>

##### Regular Attacks: Triple Strike and Leaping Cleave {#利用月光的野兽}

Outside its weakened state, Mangelune has **super armor**, preventing hit stun, and uses these two melee attacks:

- [#三连击]**[三连击] (base chance 70%)**: Each strike lunges slightly forward and causes a small knockback on hit. The final strike has a **30%** chance to apply [月光灼烧]; the full combo is followed by **10 seconds of weakness**.
- [#跳劈]**[跳劈] (base chance 30%)**: Invincible from takeoff through the slide. Landing deals area damage within **3.5 units** and also applies [月光灼烧] within the central **2 units**.<span class="heimu" title="Behind the scenes">The implementation draws on the **Wathom** character from Uncompromising Mode</span>

**Attack selection**: Repeated Triple Strikes increase the chance of the next attack being Leaping Cleave (pseudorandom selection). The first attack after switching targets is always Leaping Cleave (Head-on Strike).

##### Special Attack: Orbital Laser {#moon-p2-1}

<div class="archive-illustrated">

<MediaCard position="inline" manual
  src="/videos/tjjg_web.webm"
  caption="Orbital Laser and Mangelune's Triple Strike"
  width="320px"
/>

<div class="archive-copy">

[天基激光][#天基激光] is an extraterrestrial strike that **runs independently of regular attacks**, firing every **20–40 seconds** in one of the two patterns below. Both deal **100 [月能灼烧伤害]** on hit and apply [位面实体降格].

- **Sweep (66%)**: Warning arrows appear, then rows of lasers sweep across the area. A seven-column sweep and a two-pass five-column sweep each have a **50%** chance.
- **Spiral (34%)**: **8 beams spiral inward** around Mangelune, pausing to strike three times. This also deals **10 armor-piercing damage** to Mangelune and forces **10 seconds** of weakness.

The spiral also gains additional targets in multiplayer: it counts **up to 5 living players within 30 units** of Mangelune. If the count N is greater than 1, it randomly selects **N − 1 players**, each receiving an extra spiral with an **8-unit** radius. This does not require "Total War" to be enabled.

**Target-specific effects**: Lasers deal only **10%** damage to Mangelune and [友善的芒伊月], only heal targets such as `Gestalts` and the `Celestial Champion`, and also increase players' sanity. In the Caves, damage is halved and earthquakes occur.

</div>
</div>

<span id="moon-p2-3" class="dst-anchor"></span>

**Status Effects and Spread**

[位面实体降格] removes the target's Planar Entity damage reduction; targets without that resistance instead take **20%** more damage. While affected, Mangelune also loses some equipment's damage-reflection or charging abilities and receives half as much healing. See the [status description](/en/mechanics/statuses#def-位面实体降格).

**Planar Entity Ripple**: When affected, Mangelune removes the status from itself by hitting another target, spreading Planar Entity Downgrade over a large area centered on that target.

##### Cooldown Behavior and Counterattacks {#虚弱状态-·-10-秒}

<div class="media-float-section">

<MediaCard position="right" manual
  src="/videos/yue-phase2-counterattacks.webm"
  caption="Phase two melee and ranged counterattacks"
  width="320px"
  :intrinsic-width="960"
  :intrinsic-height="540"
/>

**Behavior while weakened**: After Triple Strike or a forced weakening from the spiral laser, Mangelune is **weakened for 10 seconds**. It loses super armor, stops regular attacks, and moves **40%** slower. It first tries to retreat, then pants in place, healing **10 health every 0.5 seconds**.

**Two counters remain available while weakened:**

- **Hit while panting**: Has an **80%** chance to use [近战反击]. Compared with P1, its wind-up is shorter and there is no taunt pause afterward.
- <span id="moon-p2-2" class="dst-anchor"></span>**Hit by a ranged attack**: Ignores the weakened state and immediately uses [跳劈] on the attacker, with a **3-second** cooldown. This ranged counter also works outside the weakened state.

</div>

#### Near Death and Victory: Remove the Survival Safeguard with Lasers {#不死暗影}

In P2, Mangelune has a **survival safeguard** that keeps its health at a minimum of **1**. When health reaches this floor, the fight proceeds as follows:

1. **Near-death state lasts 50 seconds**: [编织梦魇] continually spawn, attempting to approach and heal Mangelune.
2. **Finishing lasers descend near the end**: [天基激光] targets Mangelune's position and summons an **eleven-column laser sweep**. A successful hit forcibly removes the survival safeguard and deals **99999 planar damage + 1 physical damage** to it and to nightmare creatures summoned by Woven Nightmares.
3. **If it survives**: When the near-death state ends, Mangelune immediately gains <DST icon="health">+30%</DST>.

The crucial question during near death is therefore **whether the eleven-column laser sweep hits Mangelune**. Simply continuing to reduce its health cannot bypass the survival safeguard and finish the fight.

#### Equipment and Empowerment {#特殊机制-战时补给}

**Wartime Supplies**: Mangelune summons [启迪陷阱空投仓] and receives equipment on spawning. At each new day, if out of combat, it summons another pod and replaces its equipment.

- **Surface**: Uses a `Brightshade Sword`; armor is randomly chosen from `Bramble Husk`, `Brightshade Armor`, `Brambleshade Armor`, and `W.A.R.B.I.S. Armor`. With **Uncompromising Mode** enabled, it may also receive `Glassmail`.
- **Caves**: Uses a `Glass Cutter` instead, and draws armor from the **full vanilla + Uncompromising Mode armor pool**.

##### Enlightened Upgrades[#启迪强化] {#启迪强化}

When wearing the following equipment, it is replaced with the version listed under [启迪强化]:

<ComparisonTable label-id="启迪强化" class="">

| Equipment | Enlightened Effect |
|------|----------|
| `W.A.R.B.I.S. Armor` | Retains its original movement-speed bonus. Continually gains stacks after entering combat; the next attack at full stacks consumes them all to summon three waves of [虚影侵蚀区] on the target. |
| `Glassmail` | Loses its original effect. Instead, regenerates 1 lunar glass shard every 3 seconds (loses 1 when hit; maximum 8). In P1, fires 1–2 after each attack; in P2, regenerates 1 every 1.5 seconds and fires 1–2 with a delay after each attack. Each shard deals 30 planar damage. |

</ComparisonTable>

<span class="heimu" title="Behind the scenes">**Corpse Repair?**: Accepts Salt Crystals or Brightshade Husks from players to restore 20% of maximum health.</span>

#### Optional Combat Settings {#moon-settings}

"Orbital Deployment", "Total War", and "Moonscorched Earth" are off by default. Difficulty presets or changes to world settings may alter reinforcements, targeting, and laser zones; the world's settings take precedence.

See the [Mod Settings page](/en/mechanics/settings#芒伊月) for demonstration videos.

##### Orbital Deployment: Reinforcements with Extraterrestrial Strikes {#moon-order-66}

The default trigger chance is **0%**. Increasing it gives each periodic extraterrestrial strike the configured chance to add an [启迪陷阱空袭], bringing [敌意虚影·启迪]. P1 Lunar Lasers and both P2 sweep and spiral attacks can trigger it; **the finishing laser at the end of near death cannot**.

The airstrike begins **1 second later**, choosing landing points within a **14-unit** radius around the current target in P1 or around Mangelune in P2.

**Reinforcement count**: Without "Total War", it counts 1 player. With both settings enabled, it counts **up to 5 living players within 25 units** of Mangelune, still counting 1 if no players are present.

<ComparisonTable label-id="moon-order-66" class="moon-count-table">

| Players Counted | Arrays | Base Gestalt Count |
| :--- | :--- | :--- |
| 1–2 players | 10 | 1 |
| 3 players | 12 | 2 |
| 4 players | 14 | 3 |
| 5 players | 16 | 4 |

</ComparisonTable>

On top of the base count, independent rolls of **80%, 20%, and 1%** can each add another Gestalt, resulting in **1–7 Gestalts** per wave.

In the Caves, each landing point has a **50%** chance to be blocked by rock, preventing the corresponding Gestalt from appearing. Landing points must also meet terrain requirements. This setting does not affect player-summoned lasers.

##### Total War: Expanded Multiplayer Targeting and Melee Coverage {#moon-total-war}

**Off** by default. When enabled, the following attacks cover more targets:

- **Field and laser targeting**: Gestalt Fields search for players within **14 units**, P1 Lunar Lasers within **20 units**, and P2 Orbital Laser sweeps within **25 units**. Each locks onto at most **5 players**.
- **Field waves**: The first selected target receives all three waves. Other targets always receive the second wave, have a **50%** chance of receiving the first, and never receive the third.
- **Melee Counterattack and Triple Strike**: Become area attacks covering **180° in front with a 3-unit radius**, instead of single-target attacks. Target size also contributes to hit detection.
- **Glassmail - Enlightened**: In addition to the main target, attempts to distribute shards to **up to 5 players within 20 units**; available shards still limit shots if ammunition is insufficient. The regeneration interval is unchanged, but each refill becomes **1 + players in range**, still capped at **8 shards**. The chance to lose a shard when hit decreases with player count: **100%** for 1 player, halved for each additional 1 player, reaching **6.25%** at 5 players.

Multiplayer targeting only counts living players; P2's existing additional spiral targeting is independent of this toggle. The setting does not strengthen player-summoned lasers or Glassmail worn by Friendly Mangelune.

##### Moonscorched Earth: Lingering Laser Burn Zones {#moon-scorched-earth}

**Off** by default. When enabled, Orbital Lasers leave burning zones along their paths and lose their directional warning arrows. **The original path remains dangerous after the laser passes.** Straight sweeps, spiral patterns, and the finishing near-death sweep are all affected.

Targets in these zones continually take [月能灼烧伤害] and receive [极限催眠]. A sweep's damaging zone lasts up to **45 seconds**, while the ground effect can remain for **60 seconds**. The residual texture alone therefore cannot tell you whether damage has ended.

Burning zones exclude epic creatures and Gestalt-type targets. P1's tracking Lunar Laser does not create these tiles; player-summoned Orbital Lasers do not either, but this global setting still disables their warning arrows.

##### Health and Healing {#moon-health-settings}

<ComparisonTable label-id="moon-health-settings">

| Setting | Default | Combat Effect |
| :--- | :--- | :--- |
| **Mangelune: Max Health** | 1000 | Changes maximum health; phase transitions still use health percentage. |
| **Mangelune: Healing** | 1× | Changes healing out of combat, during hand-rubbing, panting, transition sleep, at the end of near death, and from feeding. Transition sleep duration is also divided by this multiplier. |

</ComparisonTable>

For example, at **2×** healing, P2 panting restores a base **20 health every 0.5 seconds**, and transition sleep drops from **30 seconds to 15 seconds**. Healing penalties from [位面实体降格] and similar effects still apply.

#### Death Drops {#死亡掉落}

<ComparisonTable label-id="死亡掉落" class="drop-table">

| Drop | Quantity | Condition |
|--------|:----:|------|
| `Nightmare Fuel` | 1 | Guaranteed |
| `Bone Shards` | 1 | Guaranteed |
| `Pure Brilliance` | 1 | Guaranteed |
| `Morsel` | 1 | Guaranteed |
| Equipment crafting materials | Rolled separately for each material; see below | Equipment shatters on death |
| `Nightmare Fuel` | +1 | In the Caves |
| [被囚禁的虚影] | +1 | Outside the Caves |

</ComparisonTable>

**Equipment material drops**: Each material from `Brambleshade Armor` and `W.A.R.B.I.S. Armor` has an independent **50%** drop chance; other equipment uses **80%**. Brambleshade Armor does not directly drop the Bramble Husk used in its recipe; that is further broken down into Bramble Husk's crafting materials.

#### [#被囚禁的虚影]Imprisoned Gestalt<DSTIcon icon="qjdxy" /> {#被囚禁的虚影}
An item that cannot be stacked.

- Give it to [芒芒的尸体] to revive [友善的芒伊月]. A grave must provide a follower slot; see [Obtaining Followers](#follower-lifecycle).
- Give it to [电锯惊魂] to upgrade it.
- Give it to **any plant** to have a `Deadly Brightshade` <DSTIcon icon="key" />**parasitize** it.

</section>

### Mangelune's Associated Creatures and Objects {#芒伊月衍生}

#### [#启迪陷阱阵列]Enlightened Strike Array<DSTIcon icon="trap" /> {#启迪陷阱阵列}
[启迪陷阱阵列] is the falling state of an `Enlightening Snare`, dealing 30 **armor-piercing damage** to targets at the landing point.
- Can form an [启迪陷阱空袭] (randomly spawning [敌意虚影·启迪] or `Enlightening Snares`) or an [启迪陷阱空投] (spawning only [启迪陷阱空投仓])
- Spawning in the Caves causes an **earthquake**, and an [启迪陷阱空袭] has a 50% chance to disappear because it cannot break through the surface
  - Any [敌意虚影·启迪] inside also disappear immediately.


#### [#敌意虚影·启迪]Enlightened Inimical Gestalt<DSTIcon icon="mem_gestalt_guard" /> {#敌意虚影·启迪}
<div class="archive-illustrated">

<MediaCard position="inline" loading="lazy"
  src="/box_dyxy.webp"
  caption="Enlightened Inimical Gestalt (left) and Inimical Gestalt (right)"
  width="320px"
/>

<div class="archive-copy">

An upgraded `Inimical Gestalt`.

- Identical stats and attack mechanics, but a more solid appearance
- Randomly applies [月光灼烧] or [位面实体降格] on hit
- Does not self-destruct upon losing aggro
- Actively targets all <DSTIcon icon="moonaligned" />**non-Lunar** creatures, prioritizing the <DSTIcon icon="shadowaligned" />**Shadow faction**
- Those spawned by [芒伊月] prioritize **players**

</div>
</div>



> Strictly speaking, [编织梦魇] are not derived from [芒伊月]; they are covered below in the [荒尹沐] section.

## [#暗影位面寄生]Shadow Parasitism: Mangmire<DSTIcon icon="shadowaligned" /> {#暗影位面寄生-荒尹沐}

When [暗影位面寄生] triggers, [芒芒的尸体] revives as the boss [荒尹沐].

<section class="shadow-combat">

### [#荒尹沐]Mangmire<DSTIcon icon="shadowmem" /> {#荒尹沐}

Mangmire has two combat phases: **in P1, the main unit fights in melee while shadows repeat certain moves after a delay. After reaching near death in P1, Mangmire revives and splits into a head and body, entering P2.** The body then pursues targets, the shadows surround players, and the head summons shadows and fires Ghost Fire that is relayed between units.

**In P2, the head's health determines the outcome.** The body takes no actual damage; **50%** of incoming damage is transferred to the head. The fight ends when the head's health reaches zero.

The following describes default settings. Shadow attack replication, targetability while invisible, and extra Ghost Fire when hit can be changed through [combat settings](#shadow-settings).

<nav class="phase-links" aria-label="Mangmire combat phases">

[Base Stats](#shadow-attributes) · [P1 · Main Unit and Shadows](#p1-阶段-同步率100) · [P2 · Head-Body Separation](#p2-阶段-女王馈赠) · [Mark Synergy](#特殊机制-灵魂驾驭) · [Combat Settings](#shadow-settings) · [Death Drops](#荒尹沐-死亡) · [Associated Creatures](#荒尹沐衍生)

</nav>

#### Base Stats and Traits {#shadow-attributes}

<CreatureDossier
  title="Mangmire"
  image="/shadowmem.webp"
  :stats="[
    { label: 'Health', value: '1000 (depends on mod settings)', icon: '/icons/icon_health.webp' },
    { label: 'Physical Damage', value: '38 (Shadow Reaper stats)'},
    { label: 'Physical Defense', value: '20% (mask stats)' },
    { label: 'Planar Damage', value: '18 (Shadow Reaper stats) + 20' },
    { label: 'Planar Defense', value: '10' },
    { label: 'Movement Speed', value: '4' },
    { label: 'Attack Range', value: '3' },
    { label: 'Attack Interval', value: '3' },
    { label: 'Sanity Aura', value: '-40/60', icon: '/icons/icon_sanity.webp' },
    { label: 'Faction', value: 'Shadow', icon: '/icons/icon_shadowaligned.webp' },
    { label: 'Faction Bonuses', value: '-20% damage taken from Shadow faction \n +20% damage dealt to Lunar faction' },
  ]"
  :details="[
    { label: 'Target Priority', value: 'Players > Lunar faction' },
    { label: 'Traits', value: 'Planar Entity resistance\nHeals 5% health per second out of combat\nImmune to freezing/sleep/burning/teleportation/electric stun\nExplosion resistance\nTreated as a masked creature\nMasked-creature group aggro' }
  ]"
/>

#### P1: Main Unit and Shadow Coordination {#p1-阶段-同步率100}
<div class="phase-condition">

**Head and body connected.** Mangmire spawns with **2 [沐尹荒] (shadows)** to support its melee attacks. These shadows are **invincible and untargetable** in this phase. They do not act independently, appear only to repeat moves, and quickly turn invisible after attacking.

</div>


##### Regular Attacks: Main Unit and Shadow Coordination {#shadow-p1-1}

<div class="media-float-section">

<MediaCard position="right" manual
  src="/videos/shadowmem-phase1-dual-dash.webm"
  caption="Mangmire and its shadows using Dash in phase one"
  width="320px"
  :intrinsic-width="960"
  :intrinsic-height="540"
/>

<span id="shadow-p1-2" class="dst-anchor"></span>

The main unit randomly chooses one of these moves for each attack. Sweep and Dash also trigger delayed shadow attacks:

- [#横扫]**[横扫]**: The main unit attacks a **180°** arc in front. After a short delay, shadows appear **to either side in front** of it and repeat the sweep **toward the main unit**.
- [#冲刺]**[冲刺]**: After a brief wind-up, the main unit dashes forward, damaging targets along a straight line. After a short delay, shadows appear **to either side behind** it and repeat the attack in the same direction as its dash.
- [#劈砍]**[劈砍]**: Damages a single target, randomly repeating **1–3 times**.

Melee hits from the main unit and shadows also apply [魂魄刻印], which later [鬼火] can detonate. See [Soul Control and Mark Synergy](#特殊机制-灵魂驾驭).

</div>

##### On-Hit Responses: Ranged Counter and Weaving Life {#特殊机制-编织生命}

**Ranged counter**: When the main unit is hit by a valid hostile target **more than 4 units away**, it fires an **extremely fast, non-homing, non-bouncing** [鬼火] at the attacker, with a **1-second** cooldown.

**Weaving Life**: A single hit of at least **10 damage** from a player or their direct follower has a **40%** chance to summon [编织梦魇] nearby, with a **3-second** cooldown, halved in the Caves. It crawls toward the main unit, then self-destructs on approach to heal **50 health** (adjustable in mod settings). Self-destruction also has an **80%** chance to spawn extra enemies; see [Woven Nightmare](#def-编织梦魇).


#### P2: Head-Body Separation and Encirclement {#p2-阶段-女王馈赠}
<div class="phase-condition">

**Begins after near death in P1.** The Shadow Queen takes Mangmire away. It **revives after 23 seconds**, enters **Head Out**<DSTIcon icon="ftxd" />, and separates into a head and body. The head summons **4 [沐尹荒]**, forming an encirclement and Ghost Fire relay formation with the body.

</div>

##### Transition: Revival and Separation {#shadow-transition}

While awaiting revival, **2** `Terrorbeaks` spawn as a rear guard, actively attacking players and <DSTIcon icon="moonaligned"/>**Lunar-aligned creatures**.

##### Roles of the Head, Body, and Shadows {#shadow-p2-roles}

<ComparisonTable label-id="shadow-p2-roles" class="shadow-role-table">

| Unit | Combat Role | Damage and Movement Rules |
| :--- | :--- | :--- |
| **Head** | Summons shadows, organizes encirclement, prepares and fires Ghost Fire | Does not actively pursue or use melee; ignores terrain barriers. The fight ends at zero health |
| **Body** | Continually pursues targets using P1's three melee moves | Takes no actual damage; **50% of incoming damage transfers to the head**. Does not trigger shadow replication by default |
| **[沐尹荒] (shadows)** | Surround players, fight in melee, and relay Ghost Fire | Targetable and damageable in P2; high sanity makes them visually invisible only by default |
| **[编织梦魇]** | Summoned when the head or body is hit; crawls to the head and self-destructs to heal it | Not prioritized by attacks, so usually requires force-attacking to target. High sanity makes it visually invisible only by default |

</ComparisonTable>

##### Regular Attacks: Body Pursuit and Shadow Encirclement {#合围与补充影子}

<div class="archive-illustrated">

<MediaCard position="inline" loading="lazy"
  src="/box_hym.webp"
  caption="Erimgnam spreading out into position (left)\nMangmire's body pursuing a player (bottom)\nMangem fleeing (right)"
  width="320px"
/>

<div class="archive-copy">

The body continually pursues its target with [横扫], [冲刺], and [劈砍]. Shadows act independently, using Sweep and Dash. Against players, the head prioritizes ordering shadows to surround the player at a **14-unit radius (roughly half a screen)**.

- **Target approaches a shadow**: The shadow leaves formation and attacks.
- **A shadow is killed**: The head replaces one every **40 seconds**.

</div>
</div>

##### Special Attack: Ghost Fire Relay {#鬼火传递}

<div class="media-float-section">

<MediaCard position="right" manual
  src="/videos/shadowmem-ghost-fire-relay.webm"
  caption="Ghost Fire relay"
  width="320px"
  :intrinsic-width="960"
  :intrinsic-height="540"
/>

The head prepares a [鬼火] every **6 seconds**, firing **1 second after it is ready**, with the lighting upgrade by default. In the Caves, the firing cooldown is **halved**.

**When targeting a player, Ghost Fire is relayed through participating units:**

1. **Head fires**: Sends Ghost Fire toward the body or [沐尹荒].
2. **Body/shadow relays**: Upon receiving Ghost Fire, fires a new one toward another associated unit.
3. **Ends on returning to the head**: There is **no limit** to relay count; it stops only when it returns to the head.

Relayed Ghost Fire does not harm allied associated units. It **only damages players it collides with, detonating their [魂魄刻印]**. The benefits of each detonation go to that Ghost Fire's shooter; see [Mark Synergy](#特殊机制-灵魂驾驭).

**Against non-player targets**: The head fires directly at the target, with up to **5 bounces**.

</div>

##### On-Hit Responses, Healing, and Reattachment {#恢复与接头}

- **Shadow support**: When hit, the head randomly calls shadows out of formation to attack the target.
- **Ranged counter**: The head, body, and P2 shadows all retain [Ranged Counter](#特殊机制-编织生命), firing fast Ghost Fire when attacked by valid hostile targets **more than 4 units away**, each with a **1-second** cooldown.
- **Weaving Life**: When a single hit from a player or their direct follower deals at least **10 damage**, the head has an **80%** chance to summon [编织梦魇], with a **5-second** cooldown. The body retains a **40%** chance and **3-second** cooldown. Both cooldowns are halved in the Caves; all resulting Woven Nightmares crawl toward and **heal the head**. Although the body loses no health, the 10-damage threshold is checked before damage transfer.
- **Self-repair**: The head heals **5 health per second**.
- **Reattachment**: After losing player aggro for more than **40 seconds**, the head rejoins the body and returns to **P1**.

#### Shared Mechanic: Soul Control and Mark Synergy {#特殊机制-灵魂驾驭}

<span id="def-闪耀刻印" class="dst-anchor"></span>

Mangmire and its associated units combine melee attacks and Ghost Fire as follows:

1. **Melee applies [魂魄刻印]**: A damaging melee hit from the main unit, body, or [沐尹荒] applies **1 + living shadows + living bodies** stacks. Only shadows and the body belonging to that Mangmire count; an existing body counts as 1, and Woven Nightmares do not count. For example, two shadows in P1 produce **3 stacks**; four shadows plus the body in P2 produce **6 stacks**. Marks have **planar and lighting upgrades** by default.
2. **Ghost Fire detonates marks**: A hit from a damaging [鬼火] detonates Soul Mark. The **Ghost Fire's shooter** gains [闪耀刻印] equal to the number of detonated stacks.
3. **The detonator gains buffs**: Mangmire and its associated units count as having **fully upgraded [灵魂实体专精]**, granting Shining Mark's evasion and recovery effects. See [status details](/en/mechanics/statuses#def-闪耀刻印) for full stack, duration, and recovery formulas.

#### Optional Combat Settings {#shadow-settings}

The following options are off by default. Difficulty presets or changes to world settings may alter combat behavior.

See the [Mod Settings page](/en/mechanics/settings#荒尹沐) for demonstration videos and available values.

- **Mangmire: In Lockstep**: When enabled, the P2 body still commands **2** extra shadows to repeat its attacks. These two do not act independently and are distinct from the encircling shadows summoned by the head.
- **Mangmire: Cognitive Blockade**: When enabled, [沐尹荒] and [编织梦魇] also become **untargetable** at high sanity. When disabled, high sanity only affects visibility.
- **Mangmire: Ghost Fire Overflow**: Default chance **0%**. When enabled, a single hit of at least **10 damage** from a player or their direct follower against the main unit, P2 head, body, or P2 shadow has the configured chance to fire an extra [鬼火] toward an ally capable of receiving it. Each has a **1-second** cooldown. P1's invincible shadows do not trigger this on-hit effect.
- **Mangmire: Soul Echo**: Default chance **0%**. Ghost Fire hits against enemies may spawn additional independently acting shadows; see below.

##### Soul Echo {#shadow-soul-echo}

When Ghost Fire from [荒尹沐]'s side hits a living non-allied target, and its shooter is still valid, the configured chance may spawn **1 [沐尹荒]** near the target. Shadows spawned this way act independently and do not follow normal formation commands.

Homing Ghost Fire directed at a player, homing Ghost Fire intercepted by a player, and Ghost Fire fired by ranged counters can all trigger this check on hit. Hitting an ally on Mangmire's side instead resolves Ghost Fire absorption and does not trigger Soul Echo; not every relay between allies can create a shadow.

With "Ghost Fire Overflow" also enabled, taking damage may produce extra Ghost Fire, which may in turn create shadows if it hits players. Each effect still follows its own trigger conditions and probability.

#### Muttering and World Effects {#其他机制}

- **Planar Muttering**: Occasionally speaks fragments of Mangem's dialogue, with a chance to cause **visual anomalies** on the screens of targeted players.
- **Shadow Forerunner**: While Mangmire exists, `masked creatures` in that world can synchronize their muttering **regardless of rift state**. If a creature killed by a masked creature can be parasitized, a `Herald of Tenebrau` appears and parasitizes it, ignoring rift and Cave restrictions.

#### Death and Drops {#荒尹沐-死亡}

When the head reaches zero health, the **Shadow Queen** rejoins head and body and takes them away.

<ComparisonTable label-id="荒尹沐-死亡" class="drop-table">

| Drop | Quantity | Condition |
|--------|:----:|------|
| `Nightmare Fuel` | 1 | Guaranteed |
| `Bone Shards` | 1 | Guaranteed |
| `Pure Horror` | 1 | Guaranteed |
| `Morsel` | 1 | Guaranteed |
| `Sage's Masque` | 1 | Guaranteed |
| `Nightmare Fuel` | +1 | Outside the Caves |
| [被侵蚀的虚影] | +1 | In the Caves |

</ComparisonTable>

</section>

### Mangmire's Associated Creatures {#荒尹沐衍生}

#### [#沐尹荒]Erimgnam<DSTIcon icon="shadowmem_minion" /> {#沐尹荒}

Shadows summoned by Mangmire. **In P1, they only repeat attacks and are invincible and untargetable; in P2, encircling shadows act independently, take damage, and relay Ghost Fire.** See [P1 Attacks](#shadow-p1-1) and [P2 Encirclement](#合围与补充影子) for each phase's coordination. The health and damage rules below primarily describe P2 encircling shadows. Extra shadows from [In Lockstep](#shadow-settings) still only repeat the body's moves.

<CreatureDossier
  title="Erimgnam (Shadow)"
  image="/shadowmem_minion.webp"
  :stats="[
    { label: 'Health', value: '250 (depends on mod settings)', icon: '/icons/icon_health.webp' },
    { label: 'Physical Damage', value: '68 (Dark Sword stats)'},
    { label: 'Physical Defense', value: '0' },
    { label: 'Planar Damage', value: '20' },
    { label: 'Planar Defense', value: '10' },
    { label: 'Movement Speed', value: '4' },
    { label: 'Attack Range', value: '3' },
    { label: 'Attack Interval', value: '4' },
    { label: 'Sanity Aura', value: '-40/60', icon: '/icons/icon_sanity.webp' },
    { label: 'Faction', value: 'Shadow', icon: '/icons/icon_shadowaligned.webp' },
    { label: 'Faction Bonuses', value: '-20% damage taken from Shadow faction \n +20% damage dealt to Lunar faction' },
  ]"
  :details="[
    { label: 'Target Priority', value: 'Players > Lunar faction' },
    { label: 'Traits', value: 'Planar Entity resistance\nImmune to freezing/sleep/burning/teleportation/electric stun\nExplosion resistance\nTreated as a masked creature/\nMasked-creature group aggro\nIgnores terrain and entity collision' }
  ]"
/>

**Visibility and damage**: Shadows share the traits of low-sanity nightmare creatures and are **more transparent** than regular ones. By default, P2 encircling shadows are **visually invisible only** at high sanity and remain targetable and damageable. Enabling [Cognitive Blockade](#shadow-settings) also makes them untargetable at high sanity. P1 shadows follow the invincibility and untargetability rules above.

**Attacks and inherited abilities**: Use [横扫] and [冲刺]; melee hits have Mangmire's [Soul Control](#特殊机制-灵魂驾驭) effect. Damageable P2 shadows also have [Ranged Counter](#特殊机制-编织生命). See [Encirclement](#合围与补充影子) for leaving formation and replenishment, and [Shadow Support](#恢复与接头) for their response when the head is hit.

#### [#编织梦魇]Woven Nightmare<DSTIcon icon="stalker_minion" /> {#编织梦魇}

Similar to the `Stalker's` `Woven Shadows`, these **approach a target and self-destruct to heal it**. They also appear when [Mangelune is near death](#不死暗影). For summon chances and cooldowns in Mangmire's phases, see [P1 Weaving Life](#特殊机制-编织生命) and [P2 Enhanced Weaving](#恢复与接头).

**Visibility and targeting**: Shares low-sanity nightmare creature traits and is **more transparent** than regular ones. By default, it is visually invisible only at high sanity and remains targetable; [Cognitive Blockade](#shadow-settings) also makes it untargetable at high sanity. When targetable, it is **not prioritized by attacks**, so usually requires force-attacking to select.<span class="heimu" title="Behind the scenes">This is actually a bug, but I thought it worked as a feature, so I left it.</span>

**Weaving Flesh**: Continually crawls toward its target after spawning, then self-destructs nearby to heal the target for **50 health** (adjustable in mod settings).

**Enemies after self-destruction**: Self-destruction has an **80%** chance to spawn a nightmare creature, with an **8-second** cooldown after each spawn. The species depends on the environment:

- **Surface**: Randomly spawns a `Crawling Horror`, `Terrorbeak`, or `Lurking Nightmare`.
- **Caves**: Instead spawns an `Ink Blight`, randomly choosing `Rasp`, `Jitters`, `Shriek`, or `Rictus`.

These enemies prioritize players, also actively attack the <DSTIcon icon="moonaligned" />**Lunar faction**, and can be called by Mangmire's **group aggro**. Their death drops are scarcer. They disappear **after 45 seconds**, or **immediately** when outside the loaded area, producing no drops when they disappear.

#### [#被侵蚀的虚影]Corrupted Gestalt<DSTIcon icon="shadow_gestalt" /> {#被侵蚀的虚影}
A food item that never spoils, classified as **Goodies**, with a stack size of 20.

- Eating it gives <DST icon="sanity" >-15</DST>
- Players gain [三个灵魂] after eating it.
- Non-player creatures take 500 **armor-piercing damage** on eating it and summon 1 `Greater Gestalt` and 1 `Terrorbeak` at their position.

<span id="def-三个灵魂" class="dst-anchor"></span>

[三个灵魂] lasts **480 seconds (1 day)**, granting dual faction alignment and no entity collision. See [status details](/en/mechanics/statuses#def-三个灵魂) for creatures that become neutral toward the player and additional effects.



## [#友善随从]Followers: Friendly Followers {#随从-友善随从}

Both followers are revived from [芒芒的尸体] and controlled through their respective tokens. **Friendly Mangelune focuses on direct combat, switching from ranged attacks to timed melee. Friendly Mangmire organizes shadows and a body for work and combat, and only follows by default.**

### Obtaining Followers, Slots, and Hibernation {#follower-lifecycle}

<ComparisonTable label-id="follower-lifecycle" class="follower-choice-table">

| Follower | Item Given to Corpse | Command Token | Main Role |
| :--- | :--- | :--- | :--- |
| [友善的芒伊月] | [被囚禁的虚影] | [光辉意志] | Ranged support, timed melee, orbital support |
| [友善的荒尹沐] | [被侵蚀的虚影] | [先驱意志] | Directing shadows and body to work and fight together |

</ComparisonTable>

Revival health depends on the **corpse's current freshness**. Each [芒芒的坟墓] supports one follower. If there are too few graves, a newly revived follower immediately begins hibernating and returns the revival item.

**Hibernation returns the key summoning material; death does not**: Selecting hibernation through the token turns the follower back into [芒芒的尸体], returns the appropriate [被囚禁的虚影] or [被侵蚀的虚影], and preserves [尸体防腐核心] and [易燃易爆] upgrades. A ghost haunting the token can also induce hibernation. Death only produces the drops listed in each entry, **returns neither Gestalt**, and destroys the bound token. [友善的芒伊月] also has a temporary [收回] command, which is different from hibernation.

<section class="pet-guide">

### [#友善的芒伊月]Friendly Mangelune<DSTIcon icon="mem_yue_pet" /> {#友善的芒伊月}

Uses ranged Ghost Fire attacks by default. Given a suitable weapon, it can enter timed melee; **the weapon is destroyed when melee time expires**. Healing, armor repairs, and recharging are the main ways to keep it fighting.

<nav class="phase-links" aria-label="Friendly Mangelune quick reference">

[Stats](#yue-pet-attributes) · [Commands and Token](#def-光辉意志) · [Attack Modes](#yue-pet-combat) · [Equipment and Care](#yue-pet-care) · [Skills and Settings](#yue-pet-upgrades)

</nav>

#### Base Stats and Traits {#yue-pet-attributes}

In the stats, **A → B** means **ranged → melee**.

<CreatureDossier
  title="Friendly Mangelune"
  image="/mem_yue_pet.webp"
  :stats="[
    { label: 'Health', value: '1000 (depends on mod settings)', icon: '/icons/icon_health.webp' },
    { label: 'Physical Damage', value: 'Depends on weapon'},
    { label: 'Physical Defense', value: 'Depends on armor' },
    { label: 'Planar Damage', value: 'Depends on weapon' },
    { label: 'Planar Defense', value: 'Depends on armor' },
    { label: 'Movement Speed', value: '6 → 11' },
    { label: 'Attack Range', value: '12 → 3 (Triple Strike) / 12 (Leaping Cleave)' },
    { label: 'Attack Interval', value: '6 → 8 (Triple Strike) / 0 (Leaping Cleave)' },
    { label: 'Sanity Aura', value: '+25/60 to owner\n+12.5/60 to others', icon: '/icons/icon_sanity.webp' },
    { label: 'Faction', value: 'Lunar', icon: '/icons/icon_moonaligned.webp' },
  ]"
  :details="[
    { label: 'Active Targets', value: 'Shadow faction' },
    { label: 'Traits', value: 'Immune to freezing/sleep/burning/electric stun\nGroup aggro when players or other friendly followers are attacked' },
  ]"
/>

#### [#光辉意志]Radiant Will: Commands and Support {#光辉意志}

<div class="archive-illustrated">

<MediaCard position="inline" loading="lazy"
  src="/box_7.webp"
  caption="Radiant Will's radial command menu"
  width="320px"
/>

<div class="archive-copy">

[光辉意志] is a token bound to the follower, similar to the Eye Bone. **Right-click to open the radial menu** and issue commands. Inspecting the token gives a brief summary; the "Status Info" command provides detailed reports of its target, health, and other status information.

Give [月亮装备], `Brightshade Repair Kits`, or `Brightshade Husks` to the token as if giving them directly to the follower. When replacing equipment through the token, old lunar equipment warps back into the player's inventory; other equipment drops near the follower.

</div>
</div>

##### Basic Commands {#轮盘菜单}

<ComparisonTable label-id="轮盘菜单" class="command-table">

| Command | Purpose | Cost / Cooldown |
| :--- | :--- | :--- |
| **Recall Servant / Summon Servant** | [#收回]Temporarily puts the follower away, immediately ending melee. Use again to summon it at a chosen location | 60-second cooldown after summoning |
| **Fight** | [#战斗]Sets a guard location and actively targets most creatures. Immediately gains aggro on targets within 1.5 units of the center and displays the guard area | — |
| **Broadcast Coordinates** | Summons Orbital Laser; flares change its position or direction. See [Strike Rules](#yue-pet-orbital) | 30 Soul / 60 seconds |
| **Orbital Reinforcement** | Summons a supply pod that teleports the follower and provides temporary equipment. See [Reinforcement Rules](#yue-pet-supply) | 40 Soul / 240 seconds |
| **Status Info** | Reports detailed status for the bound follower | — |
| **Hibernate** | Reverts to [芒芒的尸体] and returns [被囚禁的虚影]. See [Shared Rules](#follower-lifecycle) | — |

</ComparisonTable>

Click ongoing commands again to cancel them. Most commands are unavailable without a binding or while recalled. Dropping the token or changing its holder resets the Fight command. Commands with a targeting circle have a visual radius close to their actual effective range.

<span class="heimu" title="Behind the scenes">While recalled, the follower is actually frozen in place and does not interact with any entities.</span>

##### Broadcast Coordinates: Orbital Laser and Flares {#yue-pet-orbital}

Costs **30 Soul** to summon [天基激光], with a **60-second** cooldown. These lasers cannot destroy entities.

Each pattern has an equal chance: **spiral, single-pass seven-column sweep, or two-pass five-column sweep, each 1/3**. In a two-pass sweep, the second pass begins **4.3 seconds after** the first starts.

<ComparisonTable label-id="yue-pet-orbital">

| Item Carried | Strike Position and Direction | Additional Effect |
| :--- | :--- | :--- |
| No flare | Sweep advances from the aimed point toward the player; spiral centers on the player | No extra item consumed |
| `Flare` | Sweep advances from the player toward the aimed point; spiral centers on the aimed point | Consumes 1 |
| `Hostile Flare` | Same as an ordinary Flare | Consumes 1 and adds 10 airstrike arrays within 14 units of the target |

</ComparisonTable>

If carrying both flare types, Hostile Flares are consumed first. For strikes positioned using an aimed point, if that point almost overlaps the player, it is moved **5 units** in front of them. A spiral without a flare still centers on the player. These lasers do not create burning tiles under "Moonscorched Earth", but that setting still disables their warning arrows.

##### Orbital Reinforcement: Temporary Equipment and Airstrike Risk {#yue-pet-supply}

Costs **40 Soul** to summon [启迪陷阱空投仓], with a **240-second** cooldown. The pod can be activated within **120 seconds**, teleporting the follower to it and randomly equipping `Brambleshade Armor`, [W.A.R.B.I.S.盔甲·启迪], or [月光龙鳞甲·启迪]. The equipment lasts **240 seconds**.

There is a **5%** chance that signal disguise fails, triggering [启迪陷阱空袭] instead.

#### Attack Modes: Ranged and Timed Melee {#yue-pet-combat}

##### Ranged: Ghost Fire and Retreating {#远程攻击模式-默认}

Each attack repeats its firing animation three times, launching **1 special homing [鬼火]** each time, without bounces. Each deals **2 times the base Ghost Fire damage, or 20 damage by default**, changing with the base Ghost Fire Damage setting.

<span id="明哲保身·强化" class="dst-anchor"></span>**Cooldown behavior (Enhanced Self-Preservation)**: Tries to move away from the target while its attack is on cooldown, adjusting direction according to its distance from the owner and circling them. This usually does not break aggro.

##### Melee: Charging, Moves, and End Conditions {#月光注能-近战转换}

<div class="archive-illustrated">

<MediaCard position="inline" manual
  src="/videos/myytp_web.webm"
  caption="Friendly Mangelune wearing Brambleshade Armor against a pack of Hounds"
  width="320px"
/>

<div class="archive-copy">

After receiving a `Glass Cutter` or `Brightshade Sword`, the follower is first struck by [月能激光], then enters melee when the strike ends.

- **Charge duration**: A Glass Cutter lasts **480 seconds (1 day)**; a Brightshade Sword lasts **960 seconds (2 days)**. The weapon is not lost when durability reaches zero or knocked out of its hands by roars. **The weapon is destroyed when the charge expires**.
- **Regular moves**: Uses [三连击] (70%) or [跳劈] (30%), with the same attack patterns as Mangelune. Has super armor outside the weakened state, preventing hit stun.
- **Cooldown behavior**: Weakened for **8 seconds** after Triple Strike, with **80%** lower movement speed. Does not pant and continually retreats. After Leaping Cleave, gains **50% movement speed for 2 seconds** (Chained Pursuit).

**Target switching and kill follow-ups**: If at least **8 seconds** have passed since the last target switch, the first attack after another switch is always Leaping Cleave. A kill also sets the next attack to Leaping Cleave: a kill during Triple Strike waits until the next attack cycle; a direct Leaping Cleave kill immediately chains another Leaping Cleave. Kills from [月光灼烧] do not count as follower kills and do not refresh Leaping Cleave.

</div>
</div>

##### Enlightened Crown: Changes to Both Attack Modes {#-2}

The player currently being followed must have learned [死体精通]. When [友善的芒伊月] equips an `Enlightened Crown`:

- **Ranged**: Each attack instead summons three overlapping [虚影侵蚀区].
- **Melee transition**: Avoids the Lunar Laser strike during charging.
- **Melee moves and cooldown**: Only uses Leaping Cleave. If it does not kill the target, immediately becomes weakened, but the weakness slowdown decreases from **80%** to **40%**.

##### Status Spread: Planar Entity Ripple {#位面实体涟漪}

When affected by [位面实体降格], hitting another target removes the status from the follower and spreads it to non-player creatures over a large area centered on that target. It can also spread to another [友善的芒伊月].

#### Equipment, Healing, and Repairs {#yue-pet-care}

##### Equipping and Unequipping {#人偶武装}

Can wear **any armor type**, but only accepts `Brightshade Swords` or `Glass Cutters` as weapons. Right-click the follower to remove its equipment.

[#月亮装备]**Lunar equipment** includes `Bramble Husk`, `Brightshade Armor`, `Brightshade Helm`, `Brambleshade Armor`, `W.A.R.B.I.S. Head Gear`, `W.A.R.B.I.S. Armor`, `Glassmail`, `Enlightened Crown`, and their Enlightened versions.

##### Healing and Durability Restoration {#尸骸修复}

<ComparisonTable label-id="尸骸修复">

| Method | Restoration | Conditions or Restrictions |
| :--- | :--- | :--- |
| `Salt Crystals` / `Brightshade Husks` (Corpse Repair) | Heals 20% of maximum health; 40% with the [尸体防腐核心] upgrade | Give to the follower |
| `Brightshade Repair Kit` | Restores a total of 100% equipment durability, divided evenly among all [月亮装备] | Must be wearing lunar equipment with durability |
| Holding a `Brightshade Sword` (Brilliance Empowerment) | Heals 3 health every 5 seconds; 4.5 with the [尸体防腐核心] upgrade | While charged with a Brightshade Sword |
| Brightshade Sword kill (Brilliance Empowerment) | Restores a total of 20% lunar equipment durability | Kill a unit with health ≥ 150 and a soul; see [无灵魂生物] |

</ComparisonTable>

#### Skill Inheritance and Settings {#yue-pet-upgrades}

##### Skills of the Token Holder {#同源继承}

The following upgrades depend on skills learned by the **player currently holding the bound Radiant Will**, and apply to the follower:

- Learning level two of [灵魂实体专精] grants **+67% damage** to each [鬼火].
  - When the follower's fired [鬼火] detonates [魂魄刻印], the follower gains the [闪耀刻印] buff.
- Learning [彼世的光芒] grants [鬼火] the **lighting upgrade**, making it emit light.
- Learning [本源协调] reduces **melee mode's** weakened duration from 8 seconds to 6 seconds.

##### Optional Settings {#yue-pet-settings}

The values above are defaults. World settings can change these parameters:

<ComparisonTable label-id="yue-pet-settings">

| Setting | Default | Effect |
| :--- | :--- | :--- |
| Luna Ally: Max Health | 1000 | Maximum health |
| Luna Ally: Cooldown Scale | 1× | Cooldown multiplier for radial-menu abilities |
| Luna Ally: Melee Duration | 480 seconds | Glass Cutter melee duration; Brightshade Sword lasts 2 times as long |

</ComparisonTable>

Follower and token names can also be customized globally. Boss enhancements such as Orbital Deployment and Total War should not be directly applied to follower behavior.

#### Death and Drops {#死亡}

Drops **1 each** of `Nightmare Fuel`, `Bone Shards`, `Pure Brilliance`, and `Morsel`; the bound [光辉意志] disappears. To recover the Gestalt, use [Hibernation](#follower-lifecycle).

</section>

<section class="pet-guide">

### [#友善的荒尹沐]Friendly Mangmire<DSTIcon icon="shadowmem_pet" /> {#友善的荒尹沐}

By default, only follows [先驱意志], without actively working, attacking, counterattacking, or fleeing. **Issue a work or combat command first, then have shadows and the body perform the task.** The main unit bears summoning costs, stores collected items, and fires Ghost Fire during split-form combat.

<nav class="phase-links" aria-label="Friendly Mangmire quick reference">

[Stats](#shadow-pet-attributes) · [Unit Roles](#shadow-pet-roles) · [Commands and Token](#def-先驱意志) · [Summoning Costs](#shadow-pet-costs) · [Work](#随从工作模式) · [Combat](#shadow-pet-combat) · [Equipment and Care](#shadow-pet-care) · [Skills and Settings](#shadow-pet-upgrades)

</nav>

#### Base Stats and Traits {#shadow-pet-attributes}

<CreatureDossier
  title="Friendly Mangmire"
  image="/shadowmem_pet.webp"
  :stats="[
    { label: 'Health', value: '1000 (depends on mod settings)', icon: '/icons/icon_health.webp' },
    { label: 'Physical Damage', value: 'Depends on weapon'},
    { label: 'Physical Defense', value: 'Depends on armor' },
    { label: 'Planar Damage', value: 'Depends on weapon' },
    { label: 'Planar Defense', value: 'Depends on armor + (depends on mod settings)' },
    { label: 'Movement Speed', value: '4' },
    { label: 'Attack Range', value: '99 (no practical effect)' },
    { label: 'Attack Interval', value: '∞ ‌(no practical effect)' },
    { label: 'Sanity Aura', value: '+12.5/60 to owner\n-25/60 to others', icon: '/icons/icon_sanity.webp' },
    { label: 'Faction', value: 'Shadow', icon: '/icons/icon_shadowaligned.webp' },
  ]"
  :details="[
    { label: 'Active Targets', value: 'Lunar faction (combat mode only)' },
    { label: 'Traits', value: 'Planar Entity resistance (depends on mod settings)\nImmune to freezing/sleep/burning/electric stun\nGroup aggro when players or other friendly followers are attacked (combat mode only)' },
  ]"
/>

#### Roles of the Main Unit, Shadows, and Body {#shadow-pet-roles}

<span id="摸鱼-默认状态" class="dst-anchor"></span>

<ComparisonTable label-id="shadow-pet-roles" class="shadow-role-table">

| Unit | At Work | In Combat |
| :--- | :--- | :--- |
| **Main unit / separated head** | Moves to the chosen location as the coordination center; receives collected items in a 9-slot inventory | The intact main unit does not fight directly in melee; after Head Out, the head prepares and fires Ghost Fire |
| **[友善的沐尹荒] (shadows)** | Carry out work commands around the main unit | Usually keep away from the target, then teleport in to attack on command; melee hits apply Soul Mark |
| **[身体(友善的荒尹沐)]** | Carries out work commands around the main unit | Independently fights in melee with Sweep, Dash, and Slash; melee hits apply Soul Mark |

</ComparisonTable>

Shadows and the body follow commands from the main unit and token. They are Mangmire's followers, not direct player followers. **Summoning more units causes ongoing health loss, and damage to associated units feeds back to the main unit.** See [Summoning Costs](#shadow-pet-costs).

#### [#先驱意志]Pioneer Will: Commands and Modes {#先驱意志}

<div class="archive-illustrated">

<MediaCard position="inline" loading="lazy"
  src="/box_8.webp"
  caption="Pioneer Will's radial command menu"
  width="320px"
/>

<div class="archive-copy">

[先驱意志] is a token bound to the follower, similar to the Eye Bone. **Right-click to open the radial menu** to change modes, summon units, or dismiss them. Inspecting the token gives a brief summary; "Status Info" reports equipment durability, Shadow Level, and other details.

Give items with **[暗影等级]** to the token as if giving them directly to the follower. Replaced equipment warps back into the player's inventory.

</div>
</div>

##### Basic Commands {#轮盘菜单-1}

<ComparisonTable label-id="轮盘菜单-1" class="command-table">

| Command | Purpose | Base Cost |
| :--- | :--- | :--- |
| **Summon / Dismiss** | Spawns one shadow beside the main unit. At the cap, instead dismisses all shadows, refunding spent Soul according to the number dismissed | 25 Soul each |
| **Head Out / Regroup** | Separates or recalls the body; see [Summoning Rules](#shadow-pet-summon) | 50 Soul + weapon durability |
| **Dismiss** | Removes living shadows within 3 units of the selected point and refunds Soul | — |
| **Work Commands** | Chooses a location and switches to [Work Mode](#随从工作模式) | — |
| **Fight** | Chooses a location and switches to [Combat Mode](#shadow-pet-combat) | — |
| **Shadow Enhancement** | Changes subsequently summoned units. Weapon damage bonuses require extra durability; see [Empowerment Rules](#shadow-pet-empower) | Weapon damage empowerment costs additional durability |
| **Status Info** | Reports detailed status for the bound follower | — |
| **Hibernate** | Reverts to [芒芒的尸体] and returns [被侵蚀的虚影]; see [Shared Rules](#follower-lifecycle) | — |

</ComparisonTable>

Click ongoing commands again to cancel them. Most commands are unavailable without a binding. The targeting circle's visual radius is close to the actual effective range.

**Dropping or handing over the token resets the team**: When the token is dropped or changes holders, work and combat commands reset, and all bodies and shadows are dismissed.

#### Summon Limits, Costs, and Damage Feedback {#shadow-pet-costs}

##### Summoning and Head Out {#shadow-pet-summon}

Summoning one shadow costs **25 Soul**, with a default cap of **1**. [#解散]Manual dismissal refunds Soul only for living shadows. Shadows killed by attacks normally give no refund; the [Sage's Masque](#-3) changes this.

**Head Out** costs **50 Soul and weapon durability**, requires a usable weapon with a Shadow Level, and separates the main unit into a head and body. The head gains terrain-ignoring movement; while the body exists, the shadow cap gains **+1**. Use [汇合行动(解散)] to remove the body and refund Soul, also removing shadows above the new cap and refunding Soul for survivors.

Check weapon durability before splitting: the current implementation deducts Soul before checking the weapon. If that check fails and no body is created, the spent Soul is not automatically refunded.

##### Ongoing Burden and Damage Feedback {#shadow-pet-feedback}

[#暗影负载]**Shadow Overload**: For each following shadow or body, the main unit **loses 1 Health every 2 seconds**. Wearing a Sage's Masque removes this summoning burden.

**Damage feedback (One Heart, One Body)**: Shadows pass on **100%** of damage taken; the body passes on **50%** and loses no health itself. The main unit then multiplies this by its **current health percentage (minimum 25%)**, capped at **250 damage** per instance. Multiple feedback events in the same frame only use the highest value. For example, at half health, 100 damage to a shadow feeds back 50 damage, while the same hit on the body feeds back 25. See [Shadows](#def-友善的沐尹荒) and [Body](#def-身体(友善的荒尹沐)) for their separate stats.

##### Durability Costs and Shadow Level {#人偶武装·收集}

[#注能消耗]Summoning the body requires paying the **Infusion Cost** once. Granting weapon damage to a shadow or body requires another payment of the same weapon durability cost.

- **Use-count weapons**: **10%** of maximum uses, rounded up, with a base minimum of **1 use** and maximum of **10 uses**.
- **Timed / perishable weapons**: **10%** of total duration or freshness.
- **Discounts and multipliers**: Each Shadow Level reduces durability cost by **5%**, up to **100%**. Summoning costs are also multiplied by the world's "Summon Cost" setting, with use-count costs rounded up at the end.

Eligible weapons without a durability component cost no durability, but also grant no weapon damage bonus.

While shadows and the body actually work or fight, they **do not continue consuming durability from tools or weapons held by the main unit**. Durability is spent during the relevant command or empowerment step.

#### Work Mode: Location, Execution, and Collection {#随从工作模式}

[#工作命令]After selecting a work location through the token, the main unit moves to the center. The body and shadows perform the same work **within 14 units** of it. Wearing a Sage's Masque removes the body and shadows' ability to work.

<ComparisonTable label-id="随从工作模式" class="">

| Mode | Description |
|------|------|
| Dig | Digs all nearby diggable objects, including transplanted plants, then collects drops |
| Hammer | Hammers all nearby hammerable structures, then collects drops |
| Collect | Picks up all nearby collectible objects, teleporting them directly to [友善的荒尹沐] |
| Chop | Chops all nearby trees that an axe can cut, then collects drops |
| Mine | Mines all nearby mineable objects, including `Rift Crystals`, then collects drops |
| Pick | Harvests all nearby harvestable plants, plus finished Drying Racks and cooked Crock Pots |
| Till | Tills a 3×3 grid of holes in nearby moist, tillable ground |

</ComparisonTable>

Collected items enter the main unit's **9-slot inventory**. Right-click it to retrieve everything. If no collected items are stored, right-click instead removes equipment.

#### Combat Mode: Marks, Ghost Fire, and Empowerment {#shadow-pet-combat}

[#战斗(友善的荒尹沐)]After a combat location is selected through the token, the main unit enters combat mode, actively targeting Lunar-aligned creatures and targets attacked by the player. Body and shadow aggro synchronize; issuing the command immediately gains aggro on targets in the aiming circle.

##### Melee Units and Ghost Fire Coordination {#灵魂掌握}

Melee hits from shadows and the body apply **1 stack of [魂魄刻印]**. If their own planar damage is not 0, the mark receives the planar upgrade.

During [分头行动(友善的荒尹沐)], the head prepares a [鬼火] every **6 seconds** while in combat, firing **1 second after it is ready**, with **5 bounces** by default. See [魂魄刻印] and [闪耀刻印] for shared Ghost Fire and mark rules, and [Skill Inheritance](#同源继承-1) for follower-specific skill changes.

Shadows make intermittent assaults on the main unit's command, while the body can fight independently. Their specific moves, assault intervals, and damage feedback are retained in their individual entries below.

##### Empowerment: Weapon Damage and Teleportation {#shadow-pet-empower}

Enabling "Shadow Enhancement" on the token grants **subsequently summoned** shadows and bodies faster work and the ability to teleport toward targets. If the additional weapon durability cost is successfully paid, they also gain the weapon's **listed physical and planar damage**. Without enough extra durability, they still receive movement and work improvements, but not that damage bonus.

Teleport cooldown is **3 seconds** while working and **6 seconds** in combat. Target distance and other conditions must be met; it does not trigger while busy, and teleporting resets attack cooldown. Already empowered summons retain their empowerment; turning the enhancement toggle off does not remove it.

#### Equipment, Healing, and Repairs {#shadow-pet-care}

Can wear or equip items with a **Shadow Level**, except [暗项圈], and additionally accepts the `Halfwit's Masque` and `Toady's Masque`. The main unit wears equipment but does not directly perform actions with tools or weapons. Equipment also supplies Shadow Level, charging, and summon empowerment.

##### Healing and Mask Recovery {#尸骸修复-1}

Giving `Salt Crystals` or `Dreadstone` heals **20% of maximum health**, or **40%** with the [尸体防腐核心] upgrade.

<span id="面具生物" class="dst-anchor"></span>While wearing a `Halfwit's Masque` or `Toady's Masque` below full health, consumes **5 mask durability** every **5 seconds** to heal **2 health**, or **3** with the Corpse Embalming Core upgrade. Each mask counts as **Shadow Level 2**.

##### Sage's Masque: From Work Crew to Combat Team {#-3}

<div class="media-float-section">

<MediaCard position="right" manual
  src="/videos/ysdmyh_web.webm"
  caption="Three Friendly Erimgnam summoned while wearing a Sage's Masque attack a Treeguard"
  width="320px"
/>

The player currently being followed must have learned [死体精通]. When [友善的荒尹沐] wears a `Sage's Masque`:

- **Team changes**: Shadow cap **+2**. The body and shadows lose their ability to work, but no longer add Shadow Overload.
- **Soul refund**: Shadows killed by attacks can also refund Soul, costing a base **25 mask durability**, with Shadow Level durability discounts applied.
- **Disguise**: Without aggro, the main unit and its associated units count as masked creatures and are not attacked by them (Herald of Tenebrau Disguise).
- **Care and level**: Provides the health regeneration of the Halfwit's Masque and Toady's Masque, and counts as **Shadow Level 3**.
- **When removed**: Dismisses shadows above the summon cap.

</div>

#### Skill Inheritance and Settings {#shadow-pet-upgrades}

##### Skills of the Token Holder {#同源继承-1}

The following upgrades depend on skills learned by the **player currently holding the bound Pioneer Will**:

- Learning level two of [灵魂实体专精] grants **+5 bounces** to each [鬼火], increasing from 5 to 10 (excluding the initial hit).
  - When the follower's fired [鬼火] detonates [魂魄刻印], the follower gains the [闪耀刻印] buff.
- Learning [彼世的光芒] grants fired [鬼火] the **lighting upgrade**, making it emit light.
  - The **Ghost Fire visual effect** shown when [鬼火] is ready to fire is also upgraded to emit light.
  - [魂魄刻印] applied by [友善的沐尹荒]/[身体(友善的荒尹沐)] following this [友善的荒尹沐] are also upgraded to emit light.
- Learning [本源协调] allows fired [鬼火] to use any [友善随从], player, or follower of Mangem as a **bounce point**, without dealing damage.

##### Optional Settings {#shadow-pet-settings}

The values above are defaults. World settings can change these parameters:

<ComparisonTable label-id="shadow-pet-settings">

| Setting | Default | Effect |
| :--- | :--- | :--- |
| Shadow Ally: Max Health | 1000 | Main unit's maximum health |
| Shadow Minion: Max Health | 250 | Shadow's maximum health |
| Shadow Ally: Summon Cost | 1× | Multiplier for summoning Soul and durability costs; Soul refunds also follow the multiplier |
| Shadow Ally: Planar Resist | No Bonus | Choose +10 planar defense, Planar Entity resistance, or both; applies to the main unit and associated units |

</ComparisonTable>

Follower and token names can be customized globally. Mangmire's custom name splits when it separates.

#### Death and Drops {#死亡-1}

Drops **1 each** of `Nightmare Fuel`, `Bone Shards`, `Pure Horror`, and `Morsel`; the bound [先驱意志] disappears. To recover the Gestalt, use [Hibernation](#follower-lifecycle).

</section>

<section class="pet-guide creature-entry">

### [#友善的沐尹荒]Friendly Erimgnam<DSTIcon icon="shadowmem_minion_pet" /> {#友善的沐尹荒}

A shadow summoned through Pioneer Will and commanded by Friendly Mangmire. See [Team Management](#shadow-pet-costs) for summon caps, Soul refunds, and Shadow Overload.

<CreatureDossier
  title="Friendly Erimgnam (Shadow)"
  image="/shadowmem_minion_pet.webp"
  :stats="[
    { label: 'Health', value: '250 (depends on mod settings)', icon: '/icons/icon_health.webp' },
    { label: 'Physical Damage', value: '20 / Depends on main unit weapon (empowered only)'},
    { label: 'Physical Defense', value: '0' },
    { label: 'Planar Damage', value: '0 / Depends on main unit weapon (empowered only)' },
    { label: 'Planar Defense', value: '(depends on mod settings)' },
    { label: 'Movement Speed', value: '4' },
    { label: 'Attack Range', value: '3' },
    { label: 'Attack Interval', value: '4' },
    { label: 'Sanity Aura', value: 'To everyone except the Pioneer Will holder\n -12.5/60', icon: '/icons/icon_sanity.webp' },
    { label: 'Faction', value: 'Shadow', icon: '/icons/icon_shadowaligned.webp' },
  ]"
  :details="[
    { label: 'Active Targets', value: 'Lunar faction (combat mode only)' },
    { label: 'Traits', value: 'Planar Entity resistance (depends on mod settings)\nImmune to freezing/sleep/burning/electric stun\nGroup aggro when players or other friendly followers are attacked (combat mode only)\nIgnores terrain and entity collision' },
  ]"
/>

#### Combat Behavior and Damage Feedback {#shadow-pet-minion-behavior}

**Assault rhythm (1000% Synchronization)**: Continually keeps away from its target during combat, then is ordered to teleport beside it every **8 seconds** to use [横扫] or [冲刺]. More shadows shorten the command interval, **multiplying it by 50%** per shadow. If the main unit is below **50%** health, it shortens a further **25%**; below **25%** health, that extra reduction becomes **50%**.

**Attacks and protection**: Melee hits apply **1 stack of [魂魄刻印]**, gaining the planar upgrade if the shadow's own planar damage is not 0 (Soul Control: Suppression). On spawning, each Shadow Level of the main unit grants **5% direct damage reduction**, capped at **50%** (Shadow Empowerment).

**Damage feedback (One Heart, One Body)**: Passes incoming damage to the main unit, multiplied by its current health percentage (minimum **25%**), capped at **250** per instance. Multiple feedback events in the same frame only use the highest value. See [Damage Feedback](#shadow-pet-feedback) for examples.

Shadows act only on commands from the main unit and token (Puppet), and belong to Mangmire. See [Work Mode](#随从工作模式) and [Empowerment](#shadow-pet-empower) for work and upgrade rules.

</section>

<section class="pet-guide creature-entry">

### Friendly Mangmire's Body<DSTIcon icon="shadowmem_pet_body" />[#身体(友善的荒尹沐)] {#身体-友善的荒尹沐}

A body created through Head Out, capable of independent melee and following work commands. While it exists, the shadow cap increases by one; see [Head Out and Regroup](#shadow-pet-summon) for recalling it.

<CreatureDossier
  title="Friendly Mangmire's Body"
  image="/shadowmem_pet_body.webp"
  :stats="[
    { label: 'Health', value: '1000 (depends on mod settings)', icon: '/icons/icon_health.webp' },
    { label: 'Physical Damage', value: '20 / Depends on main unit weapon (empowered only)'},
    { label: 'Physical Defense', value: '0' },
    { label: 'Planar Damage', value: '0 / Depends on main unit weapon (empowered only)' },
    { label: 'Planar Defense', value: '(depends on mod settings)' },
    { label: 'Movement Speed', value: '4' },
    { label: 'Attack Range', value: '3' },
    { label: 'Attack Interval', value: '3' },
    { label: 'Sanity Aura', value: 'To everyone except the Pioneer Will holder\n -12.5/60', icon: '/icons/icon_sanity.webp' },
    { label: 'Faction', value: 'Shadow', icon: '/icons/icon_shadowaligned.webp' },
  ]"
  :details="[
    { label: 'Active Targets', value: 'Lunar faction (combat mode only)' },
    { label: 'Traits', value: 'Planar Entity resistance (depends on mod settings)\nImmune to freezing/sleep/burning/electric stun\nGroup aggro when players or other friendly followers are attacked (combat mode only)' },
  ]"
/>

#### Work, Combat, and Damage Transfer {#shadow-pet-body-behavior}

<div class="archive-illustrated">

<MediaCard position="inline" manual
  src="/videos/gd_web.webm"
  caption="An empowered body and Friendly Erimgnam carrying out the Till command"
  width="320px"
/>

<div class="archive-copy">

**Independent combat**: Uses [横扫], [冲刺], and [劈砍] with the same mechanics as [荒尹沐]. At work, follows the main unit and token's commands, working faster when empowered.

**Damage transfer (One Heart, One Body: Transfer)**: Takes no actual damage and does not suffer hit stun. Feeds **50%** of incoming damage back to the main unit; all remaining feedback rules match the shadows'.

The body also shares the shadows' **Puppet, Soul Control: Suppression, and Shadow Empowerment** traits: melee attacks stack marks, and spawning grants direct damage reduction based on the main unit's Shadow Level. See the [Shadow Entry](#shadow-pet-minion-behavior).

</div>
</div>

</section>

## Other Creatures {#其余生物}

<section class="creature-entry terror-guide">

### [#潜伏恐惧]Lurking Terror<DSTIcon icon="mem_ruinsnightmare" /> {#潜伏恐惧}

[潜伏恐惧] is a nightmare-type shadow creature Mangem may attract at low sanity. Its base stats resemble the vanilla `Lurking Nightmare`, but it is harder to notice and wanders near the player. **Approaching it can provoke an attack even before you become insane.** It can still spawn in enlightenment zones.

<nav class="phase-links" aria-label="Lurking Terror quick reference">

[Stats](#terror-attributes) · [Spawning and Lurking](#terror-spawn) · [Attacking and Disengaging](#terror-combat) · [Planar Empowerment](#位面状态强化) · [Drops and Sanity Recovery](#terror-loot) · [Related Settings](#terror-settings)

</nav>

#### Base Stats and Traits {#terror-attributes}

<CreatureDossier
  title="Lurking Terror"
  image="/mem_ruinsnightmare.webp"
  :stats="[
    { label: 'Health', value: '850', icon: '/icons/icon_health.webp' },
    { label: 'Physical Damage', value: '50'},
    { label: 'Physical Defense', value: '0' },
    { label: 'Planar Damage', value: '25 (planar empowerment only)' },
    { label: 'Planar Defense', value: '0' },
    { label: 'Movement Speed', value: '5 → 6.5 (planar empowerment)' },
    { label: 'Attack Range', value: '3.5' },
    { label: 'Attack Interval', value: '1.5' },
    { label: 'Sanity Aura', value: '-100/60 (to insane players while it has aggro)', icon: '/icons/icon_sanity.webp' },
    { label: 'Faction', value: 'Shadow', icon: '/icons/icon_shadowaligned.webp' },
  ]"
  :details="[
    { label: 'Active Targets', value: 'Players who are insane or enter within 3 units' },
    { label: 'Traits', value: 'Planar Entity resistance (planar empowerment only)\nImmune to freezing/sleep/burning/electric stun\nIgnores terrain and most entity collision' },
  ]"
/>

#### Spawning and Lurking {#terror-spawn}

##### Spawn Conditions {#terror-spawn-conditions}

While Mangem is alive and below **50%** maximum sanity, a spawn check occurs every **15–30 seconds**. Each Mangem can maintain at most **1 Lurking Terror that has not begun dissipating** at a time. On a successful roll, it tries to spawn on passable ground within **15 units** of the player.

The base spawn chance is **40%**, modified by local [位面能量]: it is higher when [暗影能量] exceeds [月亮能量], and lower in the reverse case. If there is no valid location, nothing spawns on that check.

##### Visibility and Enlightenment Zones {#terror-visibility}

Outside combat, it wanders near its target rather than always keeping its distance like ordinary nightmare-type shadow creatures. It may pass right beside the player. It is more transparent than ordinary nightmare creatures, becoming harder to notice at higher sanity.

**Enlightenment does not prevent spawning**: Spawning still checks sanity percentage. Under enlightenment, a Lurking Terror that is not yet targeting you is completely transparent, becoming visible only after targeting you. Being unable to see one therefore does not mean none are nearby.

<span class="heimu" title="Behind the scenes">Redesigned around the "lurking" in its name. Even in enlightenment zones, it remains a manifestation of Mangem's inner shadow power.</span>

#### Attacks, On-Hit Responses, and Disengaging {#terror-combat}

<div class="archive-illustrated">

<MediaCard position="inline" manual
  src="/videos/qfmy_web.webm"
  caption="A planar-empowered Lurking Terror resumes lurking after attacking a player"
  width="320px"
/>

<div class="archive-copy">

##### When It Attacks {#terror-aggro}

- **Insanity**: Actively searches for and pursues insane players.
- **Close contact**: Players entering within **3 units** may be targeted even if not insane.
- **Being attacked**: Gains aggro on the attacker and can share that target with nearby nightmare creatures.

The Shadow Lord's control effect still influences its willingness to attack.

##### Regular Attacks and On-Hit Counters {#terror-attacks}

Normally attacks in melee, with a base **1.5-second** interval and **3.5-unit** range. Planar empowerment also adds a forward lunge to melee attacks.

When hit, if it is not attacking, in a hit reaction, or in a state that prevents attacks, it has a **75%** chance to vanish, relocate, and summon a twin-horn attack. Otherwise, it vanishes, relocates, and reappears. After a regular attack, it has roughly a **1/3** chance to stop and taunt.

</div>
</div>

##### Losing Aggro and Dissipating {#terror-disengage}

Lurking Terror retains aggro on targets that remain insane. Non-insane players targeted through proximity must create distance: staying within **2.5 units** continually refreshes its disengagement timer. After leaving that range, disengagement usually takes **4 seconds**; recent attacks between the two can extend combat.

Once sanity recovers to **50% or above**, the spawning component requests existing Lurking Terrors to dissipate on its next check. Those already fighting first finish handling their current combat and actions before beginning to dissipate. **Restoring sanity does not immediately stop an incoming attack.**

#### Planar Empowerment {#位面状态强化}

Lurking Terror can gain planar empowerment in two ways:

- **Shadow Rift empowerment**: Gains planar empowerment while an open `Shadow Rift` exists in the current world. When the rift closes, individuals not innately empowered return to normal.
- **Random empowerment at spawn**: Innately empowered individuals can spawn even without a Shadow Rift. The base chance is **10%**, also modified by shadow and lunar energy at the spawn location. Innate empowerment does not disappear when a rift closes.

Empowerment grants **25 planar damage** and **Planar Entity resistance**, increases movement speed from **5 to 6.5**, adds a melee lunge, and changes drops and sanity rewards for killing it.

**During [位面封锁]**: Spawn chance falls to **20%** of its normal value, and random empowerment chance at spawn becomes zero. This restriction applies to random empowerment; empowerment from an existing Shadow Rift still depends on the rift's state.

#### Drops and Sanity Recovery {#terror-loot}

For a normal player kill, rewards depend on the Lurking Terror's state when it dies:

<ComparisonTable label-id="terror-loot">

| State | Drops | Sanity Restored on Kill |
| :--- | :--- | :--- |
| Normal | `Nightmare Fuel` ×3; additional independent 50% and 25% chances to drop 1 each | +55 |
| Planar empowered | `Pure Horror` ×3, with a 50% chance of +1; `Nightmare Fuel` ×2, with a 67% chance of +1 | +66 |

</ComparisonTable>

Compared with a vanilla `Lurking Nightmare` in the same state, a normal Lurking Terror drops **1 extra Nightmare Fuel**; a planar-empowered one drops **1 extra Nightmare Fuel and 1 extra Pure Horror**. The sanity reward goes to the attacker who lands the kill, provided they have sanity.

#### Related Settings {#terror-settings}

"**Taunt & Lurking Terror**" is on by default, with these choices:

- **On (Taunt + Nightmare)**: Keeps low-sanity taunting and Lurking Terror spawning.
- **Nightmare Only**: Keeps Lurking Terror spawning and disables low-sanity taunting.
- **Disabled**: Disables both mechanics.

"Low-sanity taunting" here means Mangem's ability to draw aggro from nearby creatures. It is separate from Lurking Terror's taunt animation after attacking.

</section>

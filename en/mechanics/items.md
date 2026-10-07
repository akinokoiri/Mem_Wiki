---
pageClass: ink-archive archive-items
title: Items and Food
description: Mangem's structures, items, equipment upgrades, food recipes, and related mechanics.
outline: [2, 4]
prev:
  text: Character Mechanics
  link: /en/mechanics/core
next:
  text: Enemies and Followers
  link: /en/mechanics/enemies
---

<div class="archive-eyebrow">Item Dossier <span>02 / Crafting and Use</span></div>

# Items and Food {#二、-建筑、物品、装备与料理}

This chapter mainly covers structures, items, equipment, and food **not obtained as creature drops**: those acquired through building, crafting, and similar methods.

<nav class="archive-index" aria-label="On this page">

- [Structures](#_1-建筑) Murder House, corpses, graves, and teleportation anchors
- [Items](#_2-物品) Repair tools and embalming upgrades
- [Equipment](#_3-装备) Collar levels, chainsaw upgrades, and Head Out
- [Food Recipes](#料理配方) Ingredients, stats, and special effects
- [Statuses and Mechanics](/en/mechanics/statuses#def-魂魄刻印) Stacking, detonation, and on-kill recovery

</nav>

## 1. Structures {#_1-建筑}

### [#狐狸的凶宅]Fox's Murder House <DSTIcon icon="hlxz" /> {#狐狸的凶宅}

<div class="archive-illustrated">

<MediaCard position="inline" loading="lazy"
  src="/mem_hlxz_open-0.webp"
  caption="Fox's Murder House"
  width="240px"
/>

<div class="archive-copy">

Cannot be crafted normally. **Haunt** a `Tent` as a ghost to convert it into [狐狸的凶宅].

- A sleeping structure without durability.
- **For Mangem**, it always provides a <DST icon="sanity">+26/60</DST> `Sanity aura`.
  - For **characters other than Mangem**, an unoccupied [狐狸的凶宅] has a <DST icon="sanity">-26/60</DST> `Sanity aura`. When occupied, this changes to <DST icon="sanity">-3/60</DST>.
- Sleeping causes <DST icon="sanity">-2/s</DST> instead of restoring `Sanity`; after learning [落叶归根], it restores `Sanity` normally.
- Stand nearby to unlock **Mangem Technology**.
- Each world allows up to 2 [狐狸的凶宅]; the limit increases by +2 for every Mangem character in the world.
- Can be **haunted**. If current [灵魂值] is at least 95%, all [灵魂值] is consumed to **resurrect** you.
- As a ghost, open the map to **teleport** to [狐狸的凶宅]; no skill is required.

</div>
</div>

### [#芒芒的尸体]Mangem's Corpse <DSTIcon icon="corpse" /> {#芒芒的尸体}

<ItemSummary
  title="Mangem's Corpse"
  image="/death2-54.webp"
  :stats="[
    { label: 'Recipe A', value: '6 Morsels + 4 Nightmare Fuel' },
    { label: 'Recipe B', value: '6 Morsels + 50 maximum Soul' },
    { label: 'Spoil time', value: '3 days', icon: '/icons/icon_spoil.webp' },
  ]"
/>

<div class="archive-illustrated">

<MediaCard position="inline" manual
  src="/videos/chainsaw-corpse-disassembly.webm"
  caption="Dismantling a corpse with Dreadsaw"
  width="320px"
  :intrinsic-width="560"
  :intrinsic-height="380"
/>

<div class="archive-copy">

- Equivalent to [芒芒的尸体] left behind at death.
- A `Deconstruction Staff` or [电锯惊魂] can dismantle it into 1 [芒头], 2 [芒手], 1 [芒身], and 2 [芒腿].
- Has freshness, with a default [腐烂时间] of 3 days.
- Crafting it by sacrificing maximum [灵魂值] treats the lost cap as [灵魂裂痕], repairable through the [灵魂池]. [魂墙(技能)] does not prevent this crafting cost.
- As a ghost, open the map to **teleport** to [芒芒的尸体]; no skill is required.
- After learning [落叶归根], resurrecting from a corpse leaves [归途之花] at a valid nearby location; spawning it starts a 1-day cooldown.
- With [易燃易爆] learned, [芒芒的尸体] created by crafting or death can be ignited and detonated as bombs.
- With [参点防腐剂] learned, [芒芒的尸体] created by crafting or death has a longer [腐烂时间].

</div>
</div>

### [#芒芒的坟墓]Mangem's Tombstone / Mangem's Grave <DSTIcon icon="mb" /> {#芒芒的墓碑-芒芒的坟墓}

<ItemSummary
  title="Mangem's Tombstone"
  image="/mem_fm.webp"
  :stats="[
    { label: 'Recipe', value: '3 Thulecite + 3 Dark Petals + 1 Purple Gem' },
  ]"
  :details="[
    { label: 'Technology', value: 'Mangem Technology' }
  ]"
/>

#### Burial and Construction {#埋葬与建造}

The tombstone requires **[芒芒科技]** to unlock. [#埋葬]Hold [芒芒的墓碑] on the cursor and right-click [芒芒的尸体] to **bury** it.<span id="def-maizang" class="dst-anchor"></span> Burial creates [芒芒的坟墓], which cannot be built directly.

Each world allows up to **2 graves**; the limit increases by **+2** for every Mangem in that world. A grave created by burial contains **1 [芒头], 2 [芒手], 1 [芒身], and 2 [芒腿]**.

#### Storage and Preservation {#容器与保鲜}

- **Capacity and restrictions**: 4 slots, accepting only [芒芒的肢体], Mangem-related dishes, Salt / Small Desiccant Bags / Large Desiccant Bags, and Petals / Dark Petals.
- **Base preservation**: Reduces [腐烂速率] by **70%**.
- **Additional preservation**: Salt / Small Desiccant Bags / Large Desiccant Bags add **10% / 20% / 30%** preservation respectively, based on the **number of slots they occupy**, up to **100% (permanent freshness)**.
- **Embalming upgrade**: Upgrading with [尸体防腐核心] maintains permanent freshness without salt-related products.

#### Haunting to Resurrect and Teleportation {#作祟复活与传送}

Mangem can haunt a grave to resurrect. After a successful resurrection, **the grave is destroyed if [落叶归根] has not been learned**. With the skill, the grave remains and enters a **1-day resurrection cooldown**.

- **Cooldown conditions**: Shared by this grave. Resurrection is unavailable while on cooldown or if no valid resurrection location exists nearby. A failed resurrection does not start the cooldown.
- **Resurrection effects**: Counts as resurrecting during [死亡回归], without affecting Death Return's cooldown. It also increases the proportion of pre-death Hunger and Sanity retained, and grants **+25%** post-resurrection [最低三维比例].
- **Map teleportation**: As a ghost, open the map to teleport to the grave; no skill is required.

### [#魂墙(物品)]Soul Wall <DSTIcon icon="soul_wall" /> {#魂墙}

<ItemSummary
  title="Soul Wall (Item)"
  image="/wall_segment-14.webp"
  :stats="[
    { label: 'Recipe', value: '1 Soul' },
    { label: 'Durability', value: '1 Health' }
  ]"
/>

Unlocked after learning and activating [魂墙(技能)].
- Equivalent to a `Stone Wall`, but translucent.
- Durability is only 1 `Health`.
- Faster to craft.

### [#芒芒尸体的设计图]Mangem's Corpse Blueprint <DSTIcon icon="mem_corpse_site" /> {#芒芒尸体的设计图}

- A free structure with no collision volume.
- Add **[芒芒的肢体]** one at a time to assemble [芒芒的尸体] with **random freshness** and the default skin.
- When placed, checks the **[位面寄生]** chance at that location. Its color and dialogue change according to the probabilities.
  - High [暗影位面寄生] chance produces a **black plan**; high [月亮位面寄生] chance produces a **blue plan**; **no planar parasitism** chance produces a **white plan**.
- Destroys itself 60 seconds after spawning.

### [#归途之花]Homeward Bloom <DSTIcon icon="mod" /> {#归途之花}

- With [落叶归根] learned, spawns at a valid location near the corpse when resurrecting from [芒芒的尸体]. It does not spawn if no valid nearby landing point exists.
- A **one-use anchor** for ghost map teleportation; it withers after you teleport to it once.
- Spawning it places the player on a **1-day cooldown**. Further corpse resurrections during the cooldown do not create another flower.

## 2. Items {#_2-物品}

### [#芒式修补工具]Mangem Technique: Repair <DSTIcon icon="mem_repair" /> {#芒式修补工具}

<ItemSummary
  title="Mangem Technique: Repair"
  image="/mem_repair-0.webp"
  :stats="[
    { label: 'Recipe', value: '5 Moon Rocks + 5 Living Logs + 1 Iridescent Gem' },
    { label: 'Durability', value: '100 (remains when depleted)' }
  ]"
  :details="[
    { label: 'Technology unlock', value: 'Requires: Mangem Technology' },
  ]"
/>

#### Use and Durability Refills {#使用与补充耐久}
- A repair tool with **100 durability**.
- Repairs most **items with durability**, including but not limited to **restoring freshness**, **item durability**, **recharging / resetting cooldowns**, and **restoring `Health`**.
- When repairing a stack, success chance and durability cost are **checked separately for each item**.
- A successful repair immediately restores the item to its healthiest state. For **freshness**, this means fully fresh; for **item durability**, 100% durability; for **recharging**, an immediately completed charge, and so on.
- Refill it with `Thulecite` / `Red, Blue, or Purple Gems` / `Yellow, Orange, or Green Gems` / `Iridescent Gems` for 5/10/20/100 durability respectively.

<div class="repair-workspace">

<aside class="repair-sidecar" id="修补模拟器" aria-label="Repair simulator" tabindex="-1">

<RepairCalculator />
<p class="repair-tool-note">Adjust the target's remaining durability to compare success chances, tool costs, and Soul changes under both mechanics.</p>

</aside>

<div class="repair-explanation">

#### Reverse Cursed Technique (Default) {#反转术式-默认}

- **Chance mechanic**: Repair chance is the **item's missing-durability percentage** (the lower its remaining durability, the higher the success chance).
- **Optimal cost**: The closer the success chance is to **30%**, the lower the durability cost (**no durability is spent** at a 30% success chance).
- **Success reward**: The closer the success chance is to **30%**, the more [灵魂值] a successful repair restores, up to <DST icon="soul">+70</DST>.
- **Failure penalty**: The closer the success chance is to **70%**, the more [灵魂值] a failed repair deducts, up to <DST icon="soul">-70</DST>.
- **Backlash**: Failed repairs cause a brief stagger. If [灵魂值] is insufficient (or full), the shortfall / overflow instead deducts / adds **double** the amount of `Sanity`. If `Sanity` is insufficient, it is further converted to `Health` (this conversion is nonlethal).

#### Gambler's Repair (Alternative) {#顺向修补-备用}

- **Chance mechanic**: Repair chance equals the **item's current remaining durability percentage** (the higher the percentage, the higher the success chance).
- **Fixed cost**: Each attempt costs **10 durability**.
- **Backlash**: A failed repair deducts <DST icon="sanity">-30</DST> Sanity, causes a brief stagger, and may summon nearby `Nightmare Creatures` with **no drops at all**.

</div>
</div>

### [#尸体防腐核心]Corpse Embalming Core<DSTIcon icon="tomb-upgrader" /> {#尸体防腐核心}

<ItemSummary
  title="Corpse Embalming Core"
  image="/mem_tomb_upgrader-0.webp"
  :stats="[
    { label: 'Recipe', value: '1 Blue Gem + 1 Salt + 1 Infused Moon Shard' },
  ]"
  :details="[
    { label: 'Skill unlock', value: 'Requires: Corpse Mastery' }
  ]"
/>

Unlocked after learning and activating [死体精通].

#### Eating Effects {#食用效果}

Counts as **Goodies**. Eating it restores <DST icon="sanity">66 Sanity</DST>, but has a **30%** chance to deduct <DST icon="health">10 Health</DST>.

#### Upgrade Effects {#升级效果}

Hold [尸体防腐核心] on the cursor and use it on the following targets to upgrade them. Effects vary by target:

<div class="archive-rules">

- **[芒芒的坟墓]** Gains **permanent freshness**. Haunting it to resurrect grants an additional **+25%** [最低三维比例].
- **[芒芒的尸体]** Improved preservation, prevention of parasitism, and stronger resurrection effects:
  - **Preservation**: [腐烂速率] is tied to **world moisture**. During spring rain, spoil time increases only slightly; without rain, it can increase greatly, even reaching **permanent freshness**.
  - **Parasitism prevention**: Cannot undergo [位面寄生].
  - **Resurrection**: Haunting it to resurrect further increases the proportion of pre-death Hunger and Sanity retained, and grants an additional **+25%** [最低三维比例].
- **Mangem** Gains **+50% drying rate** when drying from wet to dry.
- **[友善随从]** Receives **increased healing**.

</div>

#### Upgrade Inheritance {#升级继承}

- **Player and corpse**: On death, the [芒芒的尸体] left behind inherits the upgrade. Resurrecting by haunting an upgraded corpse also passes the upgrade to the player.
- **Follower and corpse**: [友善随从] and corpses inherit the upgrade when transforming into one another.
- **Follower dormancy / resurrection**: The upgrade is retained.

## 3. Equipment {#_3-装备}

### [#封印项圈]Seal Collar<DSTIcon icon="collar" /> {#封印项圈}

<div class="archive-illustrated">

<MediaCard position="inline" src="/mem_xq-0.webp" caption="Seal Collar" width="160px" loading="lazy" />

<div class="archive-copy">

Has **4 levels**. From Lv2 onward, it suppresses stat costs from changing forms. Lv4 branches into [暗项圈] and [月项圈].

Head armor that **does not disappear at 0 durability**. Repair it with Nightmare Fuel / Pure Horror for **150 / 300 durability** per item respectively.

- **Lv2**: Suppresses **50%** of the Sanity loss when leaving [兽化].
- **Lv3**: Keeps Lv2's effect and also suppresses **50%** of the Health-loss penalty when removing the collar.

</div>
</div>

#### Levels and Crafting Recipes {#等级与制作配方}

Upgrade in the order **Lv1 → Lv2 → Lv3**, then choose [暗项圈] or [月项圈]. Recipe difficulty for the Lunar / Shadow collars can be changed in [Mod Settings](/en/mechanics/settings).

<ComparisonTable label-id="等级与制作配方" class="collar-table">

| Level | Defense | Maximum durability | Technology | Recipe |
|---|---:|---:|---|---|
| Lv1 | 50% | 500 | No technology | 6 Nightmare Fuel |
| Lv2 | 65% | 800 | Science Machine | 1 Lv1 Collar + 3 Pig Skins + 2 Moon Rocks + 1 Stinger + 1 Petal |
| Lv3 | 80% | 1000 | Alchemy Engine | 1 Lv2 Collar + 6 Silk + 1 Bunny Puff + 2 Beefalo Wool + 2 Nightmare Fuel |
| [暗项圈] (Lv4) | 85% | 1250 | Mangem Technology | 1 Lv3 Collar + 5 Pure Horror + 5 Dreadstone + 1 Shadow Atrium + 3 Fossil Fragments |
| [月项圈] (Lv4) | 85% | 1250 | Mangem Technology | 1 Lv3 Collar + 1 Iridescent Gem + 5 Moon Gleams + 10 Infused Moon Shards + 40 Moon Shards |

</ComparisonTable>

#### Inventory Slot and Equipment Inheritance {#物品栏与装备继承}

<div class="archive-illustrated">

<MediaCard position="inline" src="/box_5.webp" caption="Equipment inside the collar also displays its appearance, but this does not pass on extra effects such as the Enlightened Crown's light." loading="lazy" />

<div class="archive-copy">

Every collar has **1 inventory slot**, accepting only head equipment.

- **Inherited effects**: Winter insulation, summer insulation, Sanity aura, sandstorm protection, waterproofing, and electrical insulation.
- **Equipment consumption**: Time-based equipment drains continuously; durability-based equipment loses durability alongside the collar when hit.
- **Effects not inherited**: Additional effects such as Moggles' night vision or the Ice Cube's cooling source.

</div>
</div>

#### [#暗项圈]Seal Collar Lv4 - Shadow<DSTIcon icon="collar-lv4-an" /> {#封印项圈-lv4·暗}
- Suppresses 100% of the `Health` penalty from removing the collar and 50% of the `Sanity` loss from leaving [兽化].
- +10 planar defense, -10% damage from the <DSTIcon icon="shadowaligned"/>**Shadow faction**.
- A `Shadow item` with 3 [暗影等级] (`Greater Gestalts` actively attack while it is worn).
- If durability is not full, applies a <DST icon="sanity">-20/60</DST> `Sanity aura` to repair itself (lower `Sanity` means faster repair, up to 1.5 durability/s).
- If [灵魂值] is not full, applies a <DST icon="sanity">-20/60</DST> `Sanity aura` to restore [灵魂值] (lower `Sanity` means faster restoration, up to <DST icon="soul">0.65/s</DST>).
- While worn, increases received [灵魂值] restoration (stronger at lower `Sanity`, up to +50%).

#### [#月项圈]Seal Collar Lv4 - Lunar<DSTIcon icon="collar-lv4-yue" /> {#封印项圈-lv4·月}
- Suppresses 100% of the `Sanity` loss from leaving [兽化] and 50% of the `Health` penalty from removing the collar.
- +10 planar defense, -10% damage from the <DSTIcon icon="moonaligned"/>**Lunar faction**.
- A `Gestalt item` (naturally spawned Gestalts do not actively attack while it is worn).
- Has an innate <DST icon="sanity">+3.3/60</DST> `Sanity aura` (stacks with equipment inside the collar's inventory slot).
- Emits light over a large area at <DST icon="soul">-0.2/s</DST> (does not glow if [灵魂值] is too low).
- While worn, increases received `Sanity` restoration (stronger at lower [灵魂值], up to +50%).

### [#电锯惊魂]Dreadsaw<DSTIcon icon="dj" /> {#电锯惊魂}

<ItemSummary
  title="Dreadsaw"
  image="/mem_dj-0.webp"
  :stats="[
    { label: 'Recipe', value: '1 Electrical Doodad + 2 Frazzled Wires \n+ 3 Scrap + 6 Nightmare Fuel' },
    { label: 'Damage', value: '49 physical damage' },
    { label: 'Durability', value: '200 (remains when depleted)' }
  ]"
/>

- **Base stats**: Hand equipment with 250% chopping efficiency; attacks consume double durability. Repairable with `Nightmare Fuel` for 44 durability each.
- **Dismantling**: With the chainsaw equipped or on the cursor, dismantle [芒芒的尸体] or produce **smaller cuts of meat**.
  - Dismantling [芒芒的尸体] costs 10 durability and yields 1 [芒头], 2 [芒手], 1 [芒身], and 2 [芒腿].
  - Further dismantling [芒芒的肢体] costs 1 durability and yields a `Morsel`.
  - Dismantling raw meat / cooked meat / jerky costs 2/1/3 durability (large cuts become their corresponding small cuts).
  > Dismantling `Monster Meat` requires the `Uncompromising Mode` mod. Without it, dismantled `Monster Meat` produces no `Monster Morsel`, only **thin air**.

#### Chainsaw Upgrades {#电锯升级}
Give it the specified items to obtain three upgrades, which can stack with one another:

<ComparisonTable label-id="电锯升级" class="effects-table chainsaw-upgrades">

| Upgrade | Material | Name change | Durability | Damage change | Additional effects |
|----------|------|------|:----:|----------|----------|
| Mark upgrade | `Shadow Atrium` | **Heartstopper** | +100 | — | Becomes a `Shadow item`, +3 [暗影等级]. Nightmare Fuel repair rises to 66. Right-click to enable [刻印形态] |
| Pioneer upgrade | [被囚禁的虚影] | **Pioneer's** (prefix) | +50 | +10 planar damage | Becomes a `Shadow item`, +1 [暗影等级]. Damage added by [魂魄刻印] and [电锯轰鸣] becomes planar damage |
| Roaring upgrade | [被侵蚀的虚影] | **Roaring** (suffix) | +50 | -26 physical, +26 planar | Becomes a `Shadow item`, +2 [暗影等级]. Each `Pure Horror` adds 120 seconds of [电锯轰鸣] (maximum 360 seconds); activating Roar also repairs 44 chainsaw durability |

</ComparisonTable>

<span id="特殊工作模式" class="dst-anchor"></span>

#### [#刻印形态]Mark Mode {#刻印形态}
- Unlocked after upgrading the chainsaw with a `Shadow Atrium`, wrapping the chainsaw in Ghost Fire.
- Each hit costs 3 [灵魂值] and applies 1 stack of [魂魄刻印] to the target (*cost is configurable*).

#### Revved Up {#电锯轰鸣}

<span id="def-电锯轰鸣" class="dst-anchor"></span><span id="def-魂魄刻印" class="dst-anchor"></span>

Give Pure Horror to the chainsaw to activate [电锯轰鸣]: consecutive hits stack damage, while pausing attacks or taking hits loses combo stacks. [闪耀刻印] can preserve the combo. See [Revved Up details](/en/mechanics/statuses#def-电锯轰鸣) for duration, decay, and upgrade rules.


#### [#分头行动]Head Out<DSTIcon icon="ftxd" /> {#分头行动}

After separation, **the player controls the head, while the body acts as a follower**. Both display Ghost Fire visual effects.

<div class="headless-guide">

##### Controls and Costs {#操作与消耗}

<div class="archive-rules">

- **Separate** Equip the chainsaw or hold it on the cursor, then right-click yourself. Immediately costs **10 [灵魂值]**.
- **Reattach** Right-click the body or press the [灵魂出窍] key; costs **10 [灵魂值]**. Success frightens nearby creatures; failure incurs a **10 drowsiness** penalty. Excessive distance or depleted Soul **forces reattachment**.
- **Recall the body** [#别捣鼓了，回来！]Once the body gains aggro, right-click yourself to perform [别捣鼓了，回来！], making it drop aggro.
- **Ongoing cost** Defaults to **0.5 [灵魂值] per second**; customize it in [Mod Settings](/en/mechanics/settings#机制结算设置), or set it to 0 to disable ongoing drain. Sanity falls faster the farther you are from the body, up to <DST icon="sanity">−60/60</DST>. Received Soul restoration is **halved** during separation.

</div>

##### Head: Movement and Concealment {#头部-移动与隐蔽}

- **Movement**: Ignores terrain and has no collision; cannot ride other creatures during separation.
- **Concealment**: Detection radius shrinks to **8 units**. Detection-radius reduction can receive a further bonus from [捕猎姿态].

##### Body: Combat and Equipment {#身体-战斗与装备}

- **Equipment**: Inherits the player's hand and body equipment; the player cannot equip either slot while separated.
- **Stats and attacks**: Inherits Mangem's [兽化] and [怨灵] stats, but its **attack multiplier is halved**, and it deals **splash damage** instead.
- **Unarmed Beast Form attacks**: Automatic body attacks occur every **8 frames** in Classic mode (**3.75 attacks/sec**) or every **12 frames** in Modern mode (**2.5 attacks/sec**), with ranges of **2.5 / 2**, respectively. See [unarmed attack timing](/en/mechanics/core#beast-combat).
- **Incoming damage**: Does not lose actual Health; damage received is **converted in full into [灵魂值] loss**.
- **Aggro and targets**: No unit targets it while it is out of combat. It actively attacks the head's target. If either the head or body enters combat, both count as in combat.

##### Skill Bonuses {#技能加成}

<div class="archive-rules">

- **[野兽体质]** In [兽化], command the body to perform most work, including chopping, digging, hammering, mining, gathering, and picking up items.
- **Body work timing**: Chopping, mining, and hammering have a fixed **7-frame** interval (about **4.29 actions/sec**) and perform work on frame **3**, unaffected by combat mode. Digging, gathering, and picking up items use their own actions. See [work details](/en/mechanics/skilltree#mem_skill_instinct_beastly).
- **[幽灵体质]** During separation, the player's detection radius is further reduced to **5 units**.
- **[魂魄逸散]** For **1 second** after the body is hit, subsequent incoming damage is **−80%**.

</div>

</div>

<div class="archive-media-pair">

<MediaCard position="inline" manual
  src="/videos/ftxd_web.webm"
  caption="The body attacks a Beefalo herd with a Dreadsaw\nthat has every upgrade,\nwith Mark Mode and Revved Up active"
/>

<MediaCard position="inline" manual
  src="/videos/ftxdgz_web.webm"
  caption="Commanding the body to work during Head Out after learning the skills"
  width="320px"
/>

</div>

## [#食物]4. Food and Cooking {#_4-食物与料理}

Table stats are ordered Hunger, Sanity, Health, and Soul. On narrow screens, scroll horizontally while the name column stays visible.

### [#芒芒的肢体]Mangem's Body Parts<DSTIcon icon="corpse" /> {#芒芒的肢体}

<MediaCard position="inline" loading="lazy"
  src="/box_6.webp"
  caption="Left to right: Mangem's Head, Torso, Arm, and Leg"
/>

<ComparisonTable label-id="芒芒的肢体">

| Name | <DSTIcon icon="hunger" /> Hunger | <DSTIcon icon="sanity" /> Sanity | <DSTIcon icon="health" /> Health | <DSTIcon icon="soul" /> Soul | <DSTIcon icon="spoil" /> Freshness | Notes |
|------|:----:|:----:|:----:|:----:|:----:|------|
| Mangem's Head | 25 | -30 | 0 | +20 | 2 days | Meat |
| Mangem's Head (cooked) | 30 | -15 | 3 | +20 | 10 days | Meat |
| Mangem's Torso | 62.5 | -30 | 0 | +30 | 2 days | Meat |
| Mangem's Torso (cooked) | 75 | -10 | 8 | +30 | 10 days | Meat |
| Mangem's Arm / Leg | 12.5 | -15 | 0 | +5 | 1.5 days | Meat |
| Mangem's Arm / Leg (cooked) | 18 | -5 | 12 | +5 | 7.5 days | Meat |

</ComparisonTable>

- After learning [易燃易爆], the player can throw [芒芒的肢体] and detonate them as bombs.

### Food Recipes {#料理配方}

<ComparisonTable label-id="料理配方" class="recipe-table">

| Name | Recipe | <DSTIcon icon="hunger" /> Hunger | <DSTIcon icon="sanity" /> Sanity | <DSTIcon icon="health" /> Health | <DSTIcon icon="soul" /> Soul | <DSTIcon icon="spoil" /> Freshness | Special effects |
|------|------|:----:|:----:|:----:|:----:|:----:|----------|
| [#红烧芒肘][红烧芒肘] | Mangem's Arm / Leg + meat + Onion / Garlic + filler | 75 | 55 | 30 | — | 15 days | [工作高效]: 2 times work efficiency for 240 seconds (half a day) |
| [#热心肠血冻][热心肠血冻] | Mangem's Torso + Nightmare Fuel + Ice + sweetener | 100 | -30 | 40 | — | 15 days | [体温恒定]: body temperature 20–50 degrees for 300 seconds (half a day plus 1 minute) |
| [#凉拌脑花][凉拌脑花] | Mangem's Head + Ice + Pepper + Bone Shards | 37.5 | 33 | 10 | — | 3 days | Grants [暗影臣民] (shadow creatures neutral); −1 Sanity per second, a [理智值修正]. Lasts 300 seconds (half a day plus 1 minute) |
| [#星期四特惠套餐][星期四特惠套餐] | Mangem's Arm / Leg + Winter / Summer Koalefant Trunk + Potato + any meat | 150 | 74 | -5 | — | 3 days | [强壮搬运]: heavy objects do not slow you, for 480 seconds (1 day) |
| [#烤全芒][烤全芒] | Mangem's Head + Mangem's Arm + Mangem's Torso + Mangem's Leg | 255 | 0 | 5 | +70 | 10 days | Adds 70 pending [灵魂值] to the [灵魂池] |

</ComparisonTable>

### Mangem's Special Edible Items {#芒伊木特殊可食用物品}

[兽化]'s immunity to food's negative basic-stat effects **does not remove** the `Sanity` penalties of the foods below.
<ComparisonTable label-id="芒伊木特殊可食用物品" class="effects-table">

| Name | <DSTIcon icon="hunger" /> Hunger | <DSTIcon icon="sanity" /> Sanity | <DSTIcon icon="health" /> Health | <DSTIcon icon="soul" /> Soul | Special effects |
|------|:----:|:----:|:----:|:----:|------|
| `Nightmare Fuel` | 0 | -15 | 0 | +30 | - |
| `Pure Horror` | 0 | -30 | 0 | +60 | - |
| `Telltale Heart` | 0 | +5 | 0 | 0 | Clears [灵魂震荡] and its three stat-cap penalties; does not clear [灵魂裂痕] |
| `Shadow Atrium` | 0 | Full | Full | Full | Clears [灵魂震荡] and restores Health, Sanity, and Soul to their currently available caps; also adds 60 pending [灵魂值] to the [灵魂池]; does not directly clear [灵魂裂痕] |
| `Possessed Shadow Atrium` | 0 | Full | Full | Full | Clears [灵魂震荡] and restores Health, Sanity, and Soul to their currently available caps; also adds 120 pending [灵魂值] to the [灵魂池]; does not directly clear [灵魂裂痕] |
| `Pure Brilliance` | 0 | 0 | 0 | 0 | Edible only after learning [本源协调]: grants [虚影协同] to you, all your followers, and their followers. |
| `Dreadstone` | 0 | 0 | 0 | 0 | Edible only after learning [本源协调]: grants [暗影协同] to you, all your followers, and their followers. |

</ComparisonTable>

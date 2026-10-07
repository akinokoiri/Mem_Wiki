### Corpse Explosions {#尸体爆炸}

[芒芒的尸体] that you craft or leave behind on death gains the explosive upgrade. When ignited and detonated, it deals **500 damage** to targets within **3.5 units** and sets them on fire.

### Throwing Limbs {#肢体投掷}

Hold [芒芒的肢体] on the cursor and perform <DSTIcon icon="key"/><u>Toss</u> to use it as a bomb: it deals **80 damage** to targets within **2.5 units** and sets them on fire. Both raw and cooked limbs work; setting a limb on fire does not make it explode.

### Materials Returned after Explosions {#爆炸后的材料返还}

| Exploding Object | Morsel Rolls | Bone Shard Roll |
| --- | --- | --- |
| Limb | 1 roll; returns 1 Morsel on success | None |
| Complete corpse | 6 independent limb meat-return rolls, potentially returning 0–6 Morsels in total | A separate fixed 25% chance to return 1 Bone Shard |

The base chance to return a Morsel is **25%**. Each **individual rank** learned in the following four skill groups adds **5 percentage points**:

- [灵魂实体专精]: ranks I, II, and III all count.
- [精准度“优化”]: ranks I, II, and III all count.
- [逐渐麻木]: ranks I, II, and III all count.
- [参点防腐剂]: ranks I, II, and III all count.

`Meat-return chance = 25% + 5% × number of basic skill ranks learned`

<div class="skill-probability-table">

| Basic Skill Ranks Learned | 0 | 3 | 6 | 9 | 12 |
| --- | --- | --- | --- | --- | --- |
| Meat-Return Chance per Roll | 25% | 40% | 55% | 70% | 85% |

</div>

The maximum is **85%**. This is the chance for each roll; the 6 rolls for a complete corpse are independent and do not guarantee a fixed quantity. The 25% Bone Shard chance is unaffected by these skill bonuses.

Returned Morsels have **random freshness from 10%–33%**. Returned materials scatter outward when the explosion occurs.

### When Return Probability Is Determined {#返还概率何时确定}

- **Limbs**: Calculated from the thrower's skills **at the moment of throwing**; this also applies to limbs left by other players.
- **Complete corpses**: Recorded from the dead player's skills **at death**, or the maker's skills **when crafting or assembling** the corpse.
- This record is preserved when the corpse becomes a follower and then a corpse again. Resetting skills, going offline, or entering caves afterward does not recalculate an existing corpse's probability.
- Old corpses without a recorded probability use the base **25%**.
- Material-return rolls also occur when a complete corpse explodes from being burned away or crushed.

### Explosive Upgrade Inheritance {#爆炸升级的继承}

[友善随从] retain the explosive upgrade through dormancy, revival, and transitions to or from corpses. Mangem also inherits it when reviving by haunting an upgraded [芒芒的尸体]; the corpse left on the next death retains the upgrade.

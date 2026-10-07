<div class="rich-text">

[魂魄逸散] includes protection after taking a hit, a [鬼火] counterattack after losing Soul, and a special version of [分头行动]: [意识转移]. During Hands-On, **the player controls the body while the head becomes a stationary follower**; many combat and survival rules change accordingly.

### Protection after Taking a Hit {#受击保护}

Once the skill is active, the body during [分头行动] and the player during [意识转移] gain a **1-second** protection window when first hit. **The first hit is not reduced**; subsequent damage during the window is reduced by **80%**.

Hits within the window do not extend that second. After it ends, the next hit starts a new protection window. This effect applies to the calculation that converts damage to the body into [灵魂值] loss.

### Ghost Fire Counterattack after Soul Loss {#损失灵魂后的鬼火反击}

Once the skill is active, every actual [灵魂值] loss is added to a counter. When it reaches **30**, your next attack that hits the main target fires a [鬼火] at that target.

- Only **one** counterattack can be stored; further Soul loss does not bank multiple shots.
- Firing resets the counter to zero, including any amount beyond 30.
- Splash targets from the same area attack do not each trigger a separate Ghost Fire.

### Hands-On {#意识转移}

Perform [意识转移] on yourself to separate your body and head. It shares many mechanics with ordinary [分头行动], but this time the player controls the **body**.

#### Activation & Ongoing Costs {#开启与持续消耗}

- Activation immediately costs <DST icon="soul">10 Soul</DST> and <DST icon="hunger">5 Hunger</DST>.
- The default drain is <DST icon="soul">0.5 Soul</DST> per second; customize it or set it to 0 in [Mod Settings](/en/mechanics/settings#机制结算设置). [灵魂值] recovery received during this state is halved.
- The farther the body is from the head, the faster `Sanity` drains, up to 60 per minute.
- You cannot ride other creatures during this state; both head and body produce Ghost Fire effects.

#### Head & Body Roles {#头部与身体的分工}

<ComparisonTable labelId="头部与身体的分工">

| Aspect | Body (Player) | Head (Follower) |
| --- | --- | --- |
| Control & Movement | Controlled by the player | Remains in place, cannot move, and has no means of attacking |
| Incoming Damage | Does not actually lose `Health`; damage instead deducts the player's [灵魂值], affected by the protection described above | All damage transfers to the player's `Health`; the head itself is not actually injured |
| Head Equipment | Cannot wear it; items equipped in this slot are passed to the head | Wears head equipment. As long as it still wears [封印项圈], the player does not enter [怨灵] |
| Equipment & Form Effects | Does not inherit stats or special effects from the head's [暗项圈], [月项圈], or other head equipment | Fully inherits Mangem's form effects, such as [兽化] damage reduction and the [怨灵] damage-taken multiplier that varies with the player's Sanity |
| Eating & Speaking | Cannot speak or eat directly | Can accept food given by the player, which counts as the player eating and has no eating animation delay |

</ComparisonTable>

#### The Body's Combat Rules {#身体的战斗规则}

- The body **does not stagger when hit**, and its attack multiplier is halved.
- Unarmed Beast Form attacks use [player attack timing](/en/mechanics/core#beast-combat), which differs from automatic body attacks during ordinary Head Out. Unarmed work uses [Beastly Instinct's work timing](/en/mechanics/skilltree#mem_skill_instinct_beastly).
- Attacks that hit produce splash damage within a **3-unit** radius; the main target must be hit before area damage occurs.
- When multiple targets are hit, the number receiving additional special effects is limited by [Body: Effect Limit](/en/mechanics/settings.html#身体-特效上限). For example, under the default settings, hitting 5 units applies [魂魄刻印] to only 3 of them.
- The range of [嘲讽] triggered by the body is halved.

#### Detection Range & Vision {#察觉范围与视野}

- The range at which enemies can notice the body is reduced to **8 units**, or **4.8 units** in [捕猎姿态]. For comparison, a `Clockwork Bishop` has an attack range of 12 units.
- After learning [幽灵体质], the detached body's detection range becomes **5 units**, with [捕猎姿态] still able to reduce it further.
- The head cannot be noticed by any unit while **out of combat**. If either the head or the body enters combat, both are considered in combat.
- If the player is in [怨灵], [暗影观察者] continuously obscure vision. The degree of obstruction depends jointly on head-to-body distance and the player's current Sanity; at lower Sanity ratios, distance has a greater effect.

#### Ending the Skill & Reattaching {#结束与接头}

Right-click the body to end [意识转移] and reattach it.

- Voluntary reattachment costs <DST icon="soul">10 Soul</DST>; if the cost is paid successfully, nearby creatures are frightened.
- If you cannot pay, you instead receive a penalty of **10 sleepiness**.
- Moving the body too far from the head (about one screen), or running out of [灵魂值], forces reattachment; forced reattachment also incurs **10 sleepiness**.

### Calculating the Awakening Condition {#觉醒条件的计算}

With [技能觉醒] enabled, you must lose Soul equal to your **current maximum Soul** within **5 seconds**.

Maximum Soul lost to effects such as [灵魂裂痕] or [灵魂震荡] lowers the actual amount required. For example, with a base maximum of 100 and the current maximum reduced by 25%, losing **75** within 5 seconds meets the condition.

Enter `/mem 魂魄逸散` or `/mem hpys` in the game to check challenge progress.

</div>

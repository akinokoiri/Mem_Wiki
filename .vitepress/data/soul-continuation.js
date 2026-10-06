// Defaults from mem_plus. Presets use the installed DST scripts/tuning.lua:
// SPIDER_DAMAGE=20, KNIGHT_DAMAGE=40, BEARGER_DAMAGE=175;
// prefabs/bearger.lua applies playerdamagepercent=.5 => 87.5 against players.
export const initialResources = Object.freeze({ health: 75, sanity: 200, soul: 150 })

export const damagePresets = Object.freeze([
  { id: 'spider', label: '蜘蛛', damage: 20 },
  { id: 'knight', label: '发条骑士', damage: 40 },
  { id: 'bearger', label: '熊獾', damage: 87.5 }
])

export function continuationCost(overflow) {
  const x = Math.max(0, overflow)
  return x * (0.40 + 48 / (40 + x))
}

// GetBerserkMultiplier in mem_combat_sys.lua: the same multiplier applies
// to outgoing attacks and incoming combat damage while in redeye form.
export function berserkMultiplier(sanity, numbLevel = 0) {
  const sanityRatio = Math.max(0, Math.min(1, sanity / initialResources.sanity))
  return 1 + (0.5 + 0.15 * numbLevel) * (1 - sanityRatio)
}

// Ordinary armour absorbs a percentage before the external damage-taken
// multiplier in DST's combat:GetAttacked. Model a fixed effective rate here.
export function damageAfterReduction(baseDamage, reductionPercent = 0) {
  const reduction = Math.max(0, Math.min(100, reductionPercent))
  return Math.max(0, baseDamage) * ((100 - reduction) / 100)
}

export function simulateAttack(resources, baseDamage, { applyBerserk = true, numbLevel = 0, reductionPercent = 0 } = {}) {
  // Snapshot sanity before paying any continuation cost. The lower sanity
  // after this hit affects only the next attack; there is no elapsed-time tick.
  const damageMultiplier = applyBerserk ? berserkMultiplier(resources.sanity, numbLevel) : 1
  const effectiveReduction = Math.max(0, Math.min(100, reductionPercent))
  const reducedDamage = damageAfterReduction(baseDamage, effectiveReduction)
  return {
    ...simulateHit(resources, reducedDamage * damageMultiplier),
    baseDamage, reducedDamage, reductionPercent: effectiveReduction,
    damageMultiplier, applyBerserk, numbLevel,
    sanityPercent: resources.sanity / initialResources.sanity * 100
  }
}

// Mirrors RedeyeHealthDeltaModifier in mem_plus/scripts/modules/mem_combat_sys.lua.
// Damage is the final health loss input; no armour or berserk multiplier is applied.
// Keep full precision between hits. Rounding belongs only to the display.
export function simulateHit(resources, damage) {
  const before = { ...resources }
  const after = { ...before }
  const result = {
    before, after, damage, overflow: 0, resourceCost: 0, uncoveredCost: 0,
    healthLost: 0, soulLost: 0, sanityLost: 0, continued: false,
    dead: before.health <= 0, ignored: before.health <= 0 || damage <= 0
  }
  if (result.ignored) return result

  if (damage < before.health) {
    after.health -= damage
  } else {
    result.continued = true
    const healthDeduct = Math.max(0, before.health - 1)
    result.overflow = damage - healthDeduct
    result.resourceCost = continuationCost(result.overflow)
    result.soulLost = Math.min(before.soul, result.resourceCost)
    after.soul -= result.soulLost
    const remaining = result.resourceCost - result.soulLost
    result.sanityLost = Math.min(before.sanity, remaining)
    after.sanity -= result.sanityLost
    result.uncoveredCost = remaining - result.sanityLost
    const remainingHealth = before.health - healthDeduct - result.uncoveredCost
    // Avoid displaying an alive character at an exact-zero decimal boundary
    // because binary arithmetic leaves a residual such as 1.8e-15.
    after.health = remainingHealth > 1e-12 ? remainingHealth : 0
  }
  result.healthLost = before.health - after.health
  result.dead = after.health <= 0
  return result
}

import test from 'node:test'
import assert from 'node:assert/strict'
import { berserkMultiplier, continuationCost, damagePresets, initialResources, simulateAttack, simulateHit } from '../.vitepress/data/soul-continuation.js'

const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} != ${expected}`)

test('the three official player-damage presets and normal nonfatal hit', () => {
  assert.deepEqual(damagePresets.map(p => p.damage), [20, 40, 87.5])
  const hit = simulateHit(initialResources, 20)
  assert.deepEqual(hit.after, { health: 55, sanity: 200, soul: 150 })
  assert.equal(hit.continued, false)
  assert.deepEqual(initialResources, { health: 75, sanity: 200, soul: 150 })
})

test('a hit exactly equal to health intercepts one point of overflow', () => {
  const hit = simulateHit({ health: 20, soul: 10, sanity: 10 }, 20)
  assert.equal(hit.after.health, 1)
  assert.equal(hit.overflow, 1)
  near(hit.soulLost, 1.5707317073170732)
  assert.equal(hit.after.sanity, 10)
  assert.equal(hit.dead, false)
})

test('updated formula agrees with independently evaluated Wiki examples', () => {
  near(continuationCost(50), 46.666666666666664)
  near(continuationCost(10), 13.6)
})

test('overflow is paid from soul first, then sanity one-for-one', () => {
  const hit = simulateHit({ health: 11, soul: 5, sanity: 20 }, 20)
  assert.equal(hit.after.health, 1)
  assert.equal(hit.after.soul, 0)
  near(hit.sanityLost, 8.6)
  near(hit.after.sanity, 11.4)
  assert.equal(hit.uncoveredCost, 0)
})

test('insufficient resources return the unpaid cost to health, including fractional survival', () => {
  const alive = simulateHit({ health: 11, soul: 5, sanity: 8.1 }, 20)
  near(alive.after.health, 0.5)
  assert.equal(alive.dead, false)
  const dead = simulateHit({ health: 11, soul: 5, sanity: 7.6 }, 20)
  assert.equal(dead.after.health, 0)
  assert.equal(dead.dead, true)
  assert.deepEqual(dead.after, { health: 0, soul: 0, sanity: 0 })
})

test('successive hits keep precision and use remaining resources; death freezes hits', () => {
  const first = simulateHit({ health: 1, soul: 30, sanity: 10 }, 20)
  const second = simulateHit(first.after, 20)
  near(first.after.soul, 6)
  assert.deepEqual(second.after, { health: 0, soul: 0, sanity: 0 })
  const third = simulateHit(second.after, 20)
  assert.equal(third.ignored, true)
  assert.deepEqual(third.after, second.after)
})

test('health below one is never raised by the interception', () => {
  const hit = simulateHit({ health: 0.5, soul: 100, sanity: 100 }, 20)
  assert.equal(hit.after.health, 0.5)
  assert.equal(hit.healthLost, 0)
  assert.equal(hit.dead, false)
})

test('all numb levels agree with the documented sanity examples and endpoints', () => {
  const halfSanity = [1.25, 1.325, 1.4, 1.475]
  const zeroSanity = [1.5, 1.65, 1.8, 1.95]
  for (let level = 0; level <= 3; level++) {
    near(berserkMultiplier(100, level), halfSanity[level])
    near(berserkMultiplier(0, level), zeroSanity[level])
    assert.equal(berserkMultiplier(200, level), 1)
  }
})

test('berserk is enabled by default and can turn a nonfatal preset into a lethal hit', () => {
  const state = { health: 24, soul: 100, sanity: 100 }
  const enabled = simulateAttack(state, 20)
  assert.equal(enabled.damage, 25)
  assert.equal(enabled.damageMultiplier, 1.25)
  assert.equal(enabled.overflow, 2)
  assert.equal(enabled.after.health, 1)
  assert.equal(enabled.continued, true)
  const disabled = simulateAttack(state, 20, { applyBerserk: false, numbLevel: 3 })
  assert.equal(disabled.damage, 20)
  assert.equal(disabled.damageMultiplier, 1)
  assert.equal(disabled.after.health, 4)
  assert.equal(disabled.continued, false)
})

test('selected numb level changes the damage applied, not just the displayed multiplier', () => {
  const hit = simulateAttack({ health: 75, sanity: 100, soul: 150 }, 20, { numbLevel: 3 })
  assert.equal(hit.damage, 29.5)
  assert.equal(hit.after.health, 45.5)
})

test('sanity paid by a hit changes only the next attack and keeps full precision', () => {
  const first = simulateAttack({ health: 1, sanity: 100, soul: 0 }, 20)
  assert.equal(first.sanityPercent, 50)
  assert.equal(first.damageMultiplier, 1.25)
  assert.equal(first.damage, 25)
  near(first.sanityLost, 28.46153846153846)
  near(first.after.sanity, 71.53846153846155)
  const second = simulateAttack(first.after, 20)
  near(second.damageMultiplier, 1.3211538461538461)
  near(second.damage, 26.423076923076923)
  near(second.after.sanity, 41.874847445548085)
  assert.equal(second.after.health, 1)
  assert.equal(second.after.soul, 0)
})

test('custom base damage is reduced before berserk and continuation', () => {
  // 100 base, 80% armour, half sanity: 20 remaining × 1.25 = 25.
  // At 20 HP this overflows by 6, costing 6 × (0.4 + 48 / 46).
  const hit = simulateAttack({ health: 20, sanity: 100, soul: 50 }, 100, { reductionPercent: 80 })
  near(hit.reducedDamage, 20)
  near(hit.damage, 25)
  near(hit.overflow, 6)
  near(hit.soulLost, 8.660869565217392)
  assert.equal(hit.after.health, 1)
  assert.equal(hit.after.sanity, 100)
})

test('reduction still applies with berserk off and supports fractional custom damage', () => {
  const hit = simulateAttack(initialResources, 123.45, { applyBerserk: false, numbLevel: 3, reductionPercent: 75 })
  near(hit.damage, 30.8625)
  near(hit.after.health, 44.1375)
  assert.equal(hit.damageMultiplier, 1)
  assert.equal(hit.continued, false)
})

test('full absorption causes no resource loss, including at one health', () => {
  const state = { health: 1, sanity: 50, soul: 5 }
  const hit = simulateAttack(state, 1000, { numbLevel: 3, reductionPercent: 100 })
  assert.equal(hit.damage, 0)
  assert.equal(hit.ignored, true)
  assert.equal(hit.continued, false)
  assert.deepEqual(hit.after, state)
})

test('reduction can prevent continuation or death and is shared by presets', () => {
  const state = { health: 20, sanity: 0, soul: 0 }
  const unarmoured = simulateAttack(state, damagePresets[2].damage)
  assert.equal(unarmoured.dead, true)
  const armoured = simulateAttack(state, damagePresets[2].damage, { reductionPercent: 90 })
  near(armoured.damage, 13.125)
  near(armoured.after.health, 6.875)
  assert.equal(armoured.continued, false)
  assert.equal(armoured.dead, false)
})

import test from 'node:test'
import assert from 'node:assert/strict'
import { actorById, actorDistance, findBounceTarget, fireMultiplier, fireStages, ghostFireRules, initialFireHealth, stageDuration } from '../.vitepress/data/ghost-fire-demo.js'

test('ghost fire uses linear bonuses and the agreed ten additional bounces', () => {
  assert.equal(ghostFireRules.bounces, 10)
  assert.equal(fireMultiplier(3), 1.3)
  assert.equal(ghostFireRules.range * fireMultiplier(3), 13)
  assert.equal(ghostFireRules.speed * fireMultiplier(3), 9.1)
})

test('first search retains range ten, then successful bounces enlarge later searches', () => {
  const searches = fireStages.filter(stage => stage.kind === 'search')
  assert.deepEqual(searches.map(stage => Math.round(ghostFireRules.range * fireMultiplier(stage.bounces))), [10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
  assert.deepEqual(searches.map(stage => stage.at), ['b', 'a', 'b', 'c', 'b', 'c', 'd', 'c', 'd', 'c'])
})

test('allies can return to an earlier target until the expanding range reaches an enemy', () => {
  assert.equal(findBounceTarget('b', 0), 'a')
  assert.equal(findBounceTarget('a', 1), 'b')
  assert.equal(findBounceTarget('b', 2), 'c')
  assert.ok(actorDistance(actorById.b, actorById.c) > 10)
  assert.ok(actorDistance(actorById.b, actorById.c) < 12)
  assert.ok(actorDistance(actorById.b, actorById.a) < actorDistance(actorById.b, actorById.c))
  assert.ok(actorDistance(actorById.a, actorById.c) > 11)
})

test('a new enemy is eligible only after entering, and enemy priority uses nearest living enemies', () => {
  assert.equal(findBounceTarget('c', 3), 'b')
  assert.equal(findBounceTarget('c', 5), 'd')
  assert.ok(actorDistance(actorById.c, actorById.d) < actorDistance(actorById.c, actorById.b))
  // Both enemies are in range at B, where the newly entered D is closer.
  assert.equal(findBounceTarget('b', 5), 'd')
  // At D, the surviving enemy C has priority even though friend B is nearer.
  assert.ok(actorDistance(actorById.d, actorById.b) < actorDistance(actorById.d, actorById.c))
  assert.equal(findBounceTarget('d', 6), 'c')
  assert.equal(findBounceTarget('d', 6, { c: 0, d: 20 }), 'b')
})

test('the whole example consumes all ten bounces, repeating enemies without damaging allies', () => {
  const flights = fireStages.filter(stage => stage.kind === 'flight')
  assert.deepEqual(flights.map(stage => stage.to), ['b', 'a', 'b', 'c', 'b', 'c', 'd', 'c', 'd', 'c', 'd'])
  assert.equal(fireStages.at(-1).kind, 'done')
  assert.equal(fireStages.at(-1).bounces, 10)
  const health = { ...initialFireHealth }
  flights.forEach(stage => {
    if (actorById[stage.to].faction === 'enemy') health[stage.to] -= ghostFireRules.damage
  })
  assert.deepEqual(health, { c: 0, d: 0 })
  assert.ok(flights.every(stage => stage.to !== 'caster'))
})

test('animated movement preserves the actual speed ratios despite different path lengths', () => {
  const flights = fireStages.filter(stage => stage.kind === 'flight')
  const speeds = flights.map(stage => actorDistance(actorById[stage.from], actorById[stage.to]) / (stageDuration(stage) / 1000))
  const expected = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]
  speeds.forEach((speed, index) => assert.ok(Math.abs(speed / speeds[0] - expected[index]) < 1e-10))
})

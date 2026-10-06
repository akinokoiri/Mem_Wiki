import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { SKILL_NODES } from '../.vitepress/data/skilltree.js'
import { LOCK_RULES, evaluateSkillLock, meetsSkillRequirements, canRefundSkill } from '../.vitepress/data/skill-presentation.js'
import { resolveSkillLocation } from '../.vitepress/data/skill-links.js'

test('all 28 skills and seven locks have readable detail sections and valid references', () => {
  assert.equal(Object.values(SKILL_NODES).filter(n => !n.isLock).length, 28)
  assert.equal(Object.keys(LOCK_RULES).length, 7)
  for (const node of Object.values(SKILL_NODES)) {
    const detail = fs.readFileSync(new URL('../mechanics/skills_desc/' + node.id + '.md', import.meta.url), 'utf8')
    assert.match(detail, /^### .+/m, node.id)
    for (const id of [...node.connects, ...node.locks]) assert.ok(SKILL_NODES[id], id)
  }
})

test('seven lock truth tables preserve threshold, AND and alternative requirements', () => {
  const cases = [
    ['mem_skill_soul_lock_1', ['mem_skill_soul_melt'], bits => bits[0]],
    ['mem_skill_soul_lock_2', ['mem_skill_soul_rest_2'], bits => bits[0]],
    ['mem_skill_soul_lock_3', ['mem_skill_soul_fire_3', 'mem_skill_soul_rest_2', 'mem_skill_soul_melt'], bits => bits.filter(Boolean).length >= 2],
    ['mem_skill_body_lock_spirit', ['mem_skill_soul_rest_2', 'mem_skill_body_precision_1', 'mem_skill_body_preservative_1', 'mem_skill_body_numb_1'], bits => bits.filter(Boolean).length >= 2],
    ['mem_skill_body_lock_exp', ['mem_skill_instinct_beastly', 'mem_skill_instinct_ghostly'], bits => bits[0] && bits[1]],
    ['mem_skill_body_lock_medicine', ['mem_skill_instinct_hide_2'], bits => bits[0]],
    ['mem_skill_body_lock_corpse', ['mem_skill_instinct_ghostly', 'mem_skill_body_preservative_3', 'mem_skill_instinct_beastly'], bits => bits[0] && (bits[1] || bits[2])],
  ]
  for (const [id, skills, expected] of cases) {
    for (let mask = 0; mask < 2 ** skills.length; mask++) {
      const bits = skills.map((_, index) => Boolean(mask & (1 << index)))
      const learned = new Set(skills.filter((_, index) => bits[index]))
      assert.equal(evaluateSkillLock(id, skill => learned.has(skill)), expected(bits), id + ' mask ' + mask)
      assert.equal(meetsSkillRequirements(SKILL_NODES[id].connects[0], learned), expected(bits), id + ' skill')
    }
  }
})

test('refund preserves real prerequisites while accepting alternative routes', () => {
  const spirit = new Set(['mem_skill_body_precision_1', 'mem_skill_body_numb_1', 'mem_skill_body_preservative_1', 'mem_spirit_link'])
  assert.equal(canRefundSkill('mem_skill_body_numb_1', spirit), true)
  spirit.delete('mem_skill_body_preservative_1')
  assert.equal(canRefundSkill('mem_skill_body_numb_1', spirit), false)
  const corpse = new Set([
    'mem_skill_body_precision_1', 'mem_skill_body_precision_2', 'mem_skill_body_precision_3', 'mem_skill_instinct_beastly',
    'mem_skill_body_numb_1', 'mem_skill_body_numb_2', 'mem_skill_body_numb_3', 'mem_skill_instinct_ghostly',
    'mem_corpse_mastery', 'mem_skill_soul_hand',
  ])
  // No hidden-instinct node is needed: the decorative line is not a prerequisite.
  assert.equal(canRefundSkill('mem_skill_soul_hand', corpse), true)
  assert.equal(canRefundSkill('mem_skill_instinct_beastly', corpse), false)
  assert.equal(canRefundSkill('mem_skill_body_numb_2', corpse), false)
  assert.equal(canRefundSkill('mem_corpse_mastery', corpse), true)
  assert.equal(canRefundSkill('missing', corpse), false)
})

test('detail bookmarks retain selected skill and support old spirit and precision links', () => {
  assert.deepEqual(resolveSkillLocation('#mem_explosive_body--' + encodeURIComponent('爆炸后的材料返还')),
    { id: 'mem_explosive_body', anchor: 'mem_explosive_body--爆炸后的材料返还' })
  assert.deepEqual(resolveSkillLocation('#意识转移'), { id: 'mem_spirit_link', anchor: 'mem_spirit_link--意识转移' })
  assert.deepEqual(resolveSkillLocation('#def-mem_skill_body_precision'), { id: 'mem_skill_body_precision_1', anchor: null })
  for (const hash of ['#%ZZ', '#unknown--details', '#constructor', '#技能树']) assert.equal(resolveSkillLocation(hash), null)
})

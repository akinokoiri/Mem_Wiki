import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { validateLinks } from '../scripts/check-links.mjs'
import { resolveSkillId } from '../.vitepress/data/skill-links.js'

test('rendered link check distinguishes anchors, client-side skills and missing pages', t => {
  const root = mkdtempSync(path.join(tmpdir(), 'mem-wiki-links-'))
  t.after(() => {
    assert.equal(path.dirname(root), path.resolve(tmpdir()))
    assert.ok(path.basename(root).startsWith('mem-wiki-links-'))
    rmSync(root, { recursive: true })
  })
  mkdirSync(path.join(root, 'mechanics'))
  writeFileSync(path.join(root, 'mechanics/core.html'), '<span id="def-跳跃"></span>')
  writeFileSync(path.join(root, 'mechanics/skilltree.html'), '<div>ClientOnly</div>')
  const skills = { mem_valid: {} }
  assert.deepEqual(validateLinks(root, {
    encoded: '/mechanics/core.html#def-%E8%B7%B3%E8%B7%83',
    clean: '/mechanics/core#def-跳跃',
    skill: '/mechanics/skilltree.html#mem_valid',
    external: 'https://example.com/ignored'
  }, skills), [])
  const errors = validateLinks(root, {
    anchor: '/mechanics/core.html#absent',
    page: '/absent.html',
    skill: '/mechanics/skilltree.html#mem_absent',
    malformed: '/mechanics/%ZZ.html'
  }, skills)
  assert.equal(errors.length, 4)
  assert.match(errors[0], /missing anchor/)
  assert.match(errors[1], /missing page/)
  assert.match(errors[2], /unknown skill/)
  assert.match(errors[3], /invalid URL/)
})

test('skill links accept real nodes and preserve the old precision bookmark', () => {
  assert.equal(resolveSkillId('#mem_skill_soul_fire_1'), 'mem_skill_soul_fire_1')
  assert.equal(resolveSkillId('#def-mem_skill_soul_fire_1'), 'mem_skill_soul_fire_1')
  assert.equal(resolveSkillId('#%6Dem_skill_soul_fire_1'), 'mem_skill_soul_fire_1')
  assert.equal(resolveSkillId('mem_skill_body_precision'), 'mem_skill_body_precision_1')
})

test('non-skill anchors and malformed URLs cannot select a node', () => {
  for (const value of ['#def-技能觉醒', '#mem_absent', '#%ZZ', '__proto__', 'constructor', '', null]) {
    assert.equal(resolveSkillId(value), null, String(value))
  }
})

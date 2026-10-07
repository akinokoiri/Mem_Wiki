import test from 'node:test'
import assert from 'node:assert/strict'
import { counterpartUrl, isEnglishPath, localizeWikiLink } from '../.vitepress/data/locale-routing.js'

test('locale switch preserves page, selected skill, encoded detail hash and query', () => {
  const paths = [
    '/', '/mechanics/core.html#def-%E8%B7%B3%E8%B7%83',
    '/mechanics/skilltree?view=details#mem_spirit_link--%E6%84%8F%E8%AF%86%E8%BD%AC%E7%A7%BB',
    '/mechanics/skills_desc/mem_skill_soul_fire_1.html#mem_skill_soul_fire_1',
    '/mechanics/statuses#soul-shock'
  ]
  for (const path of paths) {
    assert.equal(counterpartUrl(`https://wiki.example${path}`), `/en${path}`)
    assert.equal(counterpartUrl(counterpartUrl(path)), path)
  }
})

test('locale detection does not mistake unrelated English-looking prefixes for English', () => {
  assert.equal(isEnglishPath('/en/'), true)
  assert.equal(isEnglishPath('/en/mechanics/core.html'), true)
  assert.equal(isEnglishPath('/en'), true)
  assert.equal(isEnglishPath('/enemies'), false)
  assert.equal(isEnglishPath('/'), false)
})

test('localized noun links retain anchors and do not prefix assets or external destinations', () => {
  assert.equal(localizeWikiLink('/mechanics/core.html#def-跳跃', true), '/en/mechanics/core.html#def-跳跃')
  assert.equal(localizeWikiLink('/en/mechanics/core.html#def-跳跃', false), '/mechanics/core.html#def-跳跃')
  assert.equal(localizeWikiLink('/en/mechanics/core.html#def-跳跃', true), '/en/mechanics/core.html#def-跳跃')
  for (const link of ['/icons/icon_mod.webp', '/skills/example.webp', '/video/demo.webm', '#same-page', 'https://example.com/', '//example.com/']) {
    assert.equal(localizeWikiLink(link, true), link)
  }
})

test('English skill URLs retain client-side skill validation', async t => {
  const { mkdtempSync, mkdirSync, writeFileSync, rmSync } = await import('node:fs')
  const { tmpdir } = await import('node:os')
  const path = await import('node:path')
  const { validateLinks } = await import('../scripts/check-links.mjs')
  const root = mkdtempSync(path.join(tmpdir(), 'mem-wiki-en-links-'))
  t.after(() => rmSync(root, { recursive: true }))
  mkdirSync(path.join(root, 'en/mechanics'), { recursive: true })
  writeFileSync(path.join(root, 'en/mechanics/skilltree.html'), '<div>ClientOnly</div>')
  assert.deepEqual(validateLinks(root, { skill: '/en/mechanics/skilltree#mem_valid' }, { mem_valid: {} }), [])
  assert.match(validateLinks(root, { skill: '/en/mechanics/skilltree#mem_absent' }, {})[0], /unknown skill/)
})

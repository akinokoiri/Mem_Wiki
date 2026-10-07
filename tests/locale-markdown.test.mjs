import test from 'node:test'
import assert from 'node:assert/strict'
import { createMarkdownRenderer } from 'vitepress'
import config from '../.vitepress/config.mjs'
import { termTranslations, termDescriptionsEn } from '../.vitepress/data/terms-en.js'
import { nounMap } from '../.vitepress/theme/components/icons.js'
import { termDescriptions } from '../.vitepress/data/term-previews.js'

const md = await createMarkdownRenderer(process.cwd(), config.markdown)

test('English Markdown localizes noun labels before search indexing and retains canonical identity', () => {
  const en = md.render('[电锯惊魂] [电锯轰鸣] [灵魂值]', { relativePath: 'en/mechanics/items.md' })
  assert.match(en, /term="电锯惊魂" icon="dj">Dreadsaw<\/DST>/)
  assert.match(en, /term="电锯轰鸣" icon="djhm">Revved Up<\/DST>/)
  assert.match(en, />Soul<\/DST>/)
  assert.doesNotMatch(en, />电锯/)
  const zh = md.render('[电锯惊魂]', { relativePath: 'mechanics/items.md' })
  assert.match(zh, />电锯惊魂<\/DST>/)
})

test('canonical definition anchors remain stable in both locales', () => {
  for (const relativePath of ['mechanics/core.md', 'en/mechanics/core.md']) {
    assert.match(md.render('[#跳跃]', { relativePath }), /id="def-跳跃"/)
  }
})

test('all registered noun labels and preview summaries have English text', () => {
  for (const key of Object.keys(nounMap)) assert.ok(termTranslations[key], key)
  for (const key of Object.keys(termDescriptions)) assert.ok(termDescriptionsEn[key], key)
  assert.equal(termTranslations['芒伊木'], 'Mangem')
  assert.equal(termTranslations['芒伊月'], 'Mangelune')
  assert.equal(termTranslations['荒尹沐'], 'Mangmire')
  assert.equal(termTranslations['沐尹荒'], 'Erimgnam')
  for (const text of [...Object.values(termTranslations), ...Object.values(termDescriptionsEn)]) {
    assert.doesNotMatch(text, /\p{Script=Han}/u)
  }
})

test('English heading accessibility labels omit canonical IDs and Vue markup', () => {
  const result = md.render('## [#鬼火]Ghost Fire <DSTIcon icon="ghost_fire" /> {#鬼火}', { relativePath: 'en/mechanics/core.md' })
  assert.match(result, /aria-label="Permalink to &quot;Ghost Fire&quot;"/)
  assert.doesNotMatch(result, /aria-label="[^\"]*鬼火/)
})

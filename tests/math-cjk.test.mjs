import test from 'node:test'
import assert from 'node:assert/strict'
import { createMarkdownRenderer } from 'vitepress'
import { archiveMathCjk } from '../.vitepress/markdown/math-cjk.mjs'

const md = (await createMarkdownRenderer(process.cwd(), { math: true })).use(archiveMathCjk)
const archive = { frontmatter: { pageClass: 'ink-archive' } }

test('archive formulas mark Han fallbacks while preserving all other SVG and MathML', () => {
  for (const source of ['$\\text{溢出ABC伤害(码)} + x$', '$$\\text{溢出伤害} \\times \\frac{20}{30}$$']) {
    const original = md.render(source, {})
    const rendered = md.render(source, archive)
    assert.match(rendered, /class="archive-math-cjk"/)
    assert.equal(rendered.replaceAll(' class="archive-math-cjk"', ''), original)
    for (const [, character] of rendered.matchAll(/<text class="archive-math-cjk"[^>]*>(.*?)<\/text>/g)) {
      assert.match(character, /^\p{Script=Han}$/u)
    }
  }
})

test('ordinary pages and Latin-only formulas retain the original renderer output', async () => {
  const original = await createMarkdownRenderer(process.cwd(), { math: true })
  assert.equal(md.render('$\\text{中文}$', {}), original.render('$\\text{中文}$'))
  assert.equal(md.render('$x^2 + \\text{ABC}$', archive), original.render('$x^2 + \\text{ABC}$'))
})

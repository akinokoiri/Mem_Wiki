import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import * as Vue from 'vue'
import { renderToString } from 'vue/server-renderer'
import { parse, compileScript } from '@vue/compiler-sfc'
import * as icons from '../.vitepress/theme/components/icons.js'
import * as previews from '../.vitepress/data/term-previews.js'
import * as termsZh from '../.vitepress/data/terms-zh.js'
import * as terms from '../.vitepress/data/terms-en.js'
import * as ui from '../.vitepress/data/ui-en.js'
import * as routing from '../.vitepress/data/locale-routing.js'
import * as skills from '../.vitepress/data/skill-presentation.js'
import { SKILL_NODES } from '../.vitepress/data/skilltree.js'

const read = file => readFileSync(new URL(file, import.meta.url), 'utf8')

// Compile the production SFCs, replacing only module imports with explicit Node
// dependencies. The VitePress boundary supplies the current locale and root base;
// translation, canonical identity, URLs and component logic all remain real.
function injectImports(source) {
  return source.replace(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"];?/g,
    (_, names, module) => `const {${names.replace(/\s+as\s+/g, ': ')}} = dependencies[${JSON.stringify(module)}];`)
}
function fixture(language) {
  const lang = Vue.ref(language)
  const vitepress = { useData: () => ({ lang }), withBase: value => value }
  const localeSource = injectImports(read('../.vitepress/data/locale.js'))
    .replace('export function useWikiLocale', 'function useWikiLocale')
  const locale = new Function('dependencies', `${localeSource}\nreturn { useWikiLocale };`)({
    vue: Vue, vitepress, './ui-en.js': ui, './terms-en.js': terms, './terms-zh.js': termsZh, './locale-routing.js': routing,
  })
  function component(file) {
    const { descriptor } = parse(read(file), { filename: file })
    const script = compileScript(descriptor, {
      id: file, inlineTemplate: true,
      templateOptions: { compilerOptions: { hoistStatic: false } },
    })
    return new Function('dependencies', injectImports(script.content).replace('export default', 'return'))({
      vue: Vue, vitepress, './icons.js': icons,
      '../../data/locale.js': locale, '../data/locale.js': locale,
      '../../data/term-previews.js': previews, '../../data/terms-en.js': terms,
      '../theme/components/icons.js': icons, '../data/skill-presentation.js': skills,
    })
  }
  return {
    lang,
    DST: component('../.vitepress/theme/components/DST.vue'),
    SkillSummary: component('../.vitepress/components/SkillSummary.vue'),
  }
}

// A minimal in-memory Vue host exercises real updates and slot reuse without a
// browser, network access, browser automation or a separate DOM dependency.
function renderer() {
  const node = (type, text = '') => ({ type, text, props: {}, children: [], parent: null })
  function insert(child, parent, anchor = null) {
    remove(child)
    child.parent = parent
    const index = anchor ? parent.children.indexOf(anchor) : -1
    if (index < 0) parent.children.push(child)
    else parent.children.splice(index, 0, child)
  }
  function remove(child) {
    if (!child.parent) return
    const siblings = child.parent.children
    const index = siblings.indexOf(child)
    if (index >= 0) siblings.splice(index, 1)
    child.parent = null
  }
  const host = Vue.createRenderer({
    createElement: type => node(type),
    createText: text => node('#text', text),
    createComment: text => node('#comment', text),
    setText: (target, text) => { target.text = text },
    setElementText: (target, text) => { target.text = text; target.children = [] },
    patchProp: (target, key, previous, value) => {
      if (value == null) delete target.props[key]
      else target.props[key] = value
    },
    insert, remove,
    parentNode: target => target.parent,
    nextSibling: target => target.parent?.children[target.parent.children.indexOf(target) + 1] || null,
    insertStaticContent: (html, parent, anchor) => {
      const target = node('#static', html)
      insert(target, parent, anchor)
      return [target, target]
    },
  })
  return { host, root: node('root') }
}
const descendants = root => root.children.flatMap(child => [child, ...descendants(child)])
const text = target => target.type === '#comment' ? '' : target.text + target.children.map(text).join('')
const nounLinks = root => descendants(root).filter(target => target.props['data-term-preview'])

for (const language of ['en-US', 'zh-CN']) {
  test(`${language}: reused skill-summary nouns update their label, destination, icon and preview`, async t => {
    const { DST, SkillSummary } = fixture(language)
    const selected = Vue.ref(SKILL_NODES.mem_skill_soul_fire_1)
    const { host, root } = renderer()
    const app = host.createApp({
      setup: () => () => Vue.h(SkillSummary, {
        node: selected.value, points: 15, learned: false, canLearn: true,
        canRefund: false, learnedIds: new Set(),
      }),
    })
    app.component('DST', DST)
    app.mount(root)
    t.after(() => app.unmount())
    const prefix = language === 'en-US' ? '/en' : ''
    const cases = [
      ['mem_skill_soul_fire_1', '鬼火', 'Ghost Fire', 'ghost_fire'],
      ['mem_skill_soul_hand', '灵魂值', 'Soul', 'soul'],
      ['mem_skill_soul_fire_1', '鬼火', 'Ghost Fire', 'ghost_fire'],
    ]
    for (const [id, canonical, english, icon] of cases) {
      selected.value = SKILL_NODES[id]
      await Vue.nextTick()
      const noun = nounLinks(root)[0]
      assert.ok(noun, id)
      assert.equal(text(noun), language === 'en-US' ? english : canonical, `${id}: label`)
      assert.equal(noun.props.href, prefix + icons.linkMap[canonical], `${id}: destination`)
      assert.equal(noun.props['data-term-preview'], canonical, `${id}: preview identity`)
      assert.equal(descendants(noun).find(child => child.type === 'img')?.props.src, icons.iconMap[icon], `${id}: icon`)
    }
  })
}

test('approved English noun labels retain separate item and buff destinations in SSR', async () => {
  const { DST } = fixture('en-US')
  const app = Vue.createSSRApp({
    setup: () => () => Vue.h('div', [
      Vue.h(DST, { term: '电锯惊魂', icon: 'dj' }, { default: () => 'Dreadsaw' }),
      Vue.h(DST, { term: '电锯轰鸣', icon: 'djhm' }, { default: () => 'Revved Up' }),
    ]),
  })
  const html = await renderToString(app)
  assert.match(html, /Dreadsaw/)
  assert.match(html, /Revved Up/)
  assert.match(html, /href="\/en\/mechanics\/items.html#def-电锯惊魂"/)
  assert.match(html, /href="\/en\/mechanics\/statuses.html#def-电锯轰鸣"/)
  assert.match(html, /data-term-preview="电锯惊魂"/)
  assert.match(html, /data-term-preview="电锯轰鸣"/)
})

test('English numeric resource labels preserve authored values and canonical preview identity', async t => {
  const { DST } = fixture('en-US')
  const { host, root } = renderer()
  const app = host.createApp({
    setup: () => () => Vue.h('div', [
      Vue.h(DST, { icon: 'soul' }, { default: () => '−0.2/s' }),
      Vue.h(DST, { icon: 'health' }, { default: () => '+5' }),
    ]),
  })
  app.mount(root)
  t.after(() => app.unmount())
  const soul = nounLinks(root)[0]
  assert.equal(text(soul), '−0.2/s')
  assert.equal(soul.props['data-term-preview'], '灵魂值')
  assert.equal(soul.props.href, '/en' + icons.linkMap['灵魂值'])
  const health = descendants(root).find(target => target.type === 'span' && text(target) === '+5')
  assert.ok(health)
  assert.equal(health.props.href, undefined)
  assert.equal(health.props['data-term-preview'], undefined)
})

test('click-only language activation refreshes the actual URL before the router capture listener', () => {
  const listeners = []
  const window = {
    addEventListener: (type, listener, capture) => { listeners.push({ type, listener, capture }) },
    removeEventListener: () => {},
  }
  const location = { href: 'https://wiki.example/mechanics/skilltree.html#mem_skill_soul_fire_1' }
  class Element {
    constructor(anchor) { this.anchor = anchor }
    closest(selector) { return selector === 'a.wiki-language-switch' ? this.anchor : null }
  }
  const source = injectImports(read('../.vitepress/theme/language-switch-events.js'))
    .replaceAll('import.meta.hot', 'undefined')
  new Function('dependencies', 'window', 'Element', 'location', source)({
    '../data/locale-routing.js': routing,
  }, window, Element, location)
  assert.equal(listeners.length, 1)
  assert.equal(listeners[0].capture, true)
  const anchor = { href: '/en/mechanics/skilltree.html#mem_skill_soul_fire_1' }
  let routerDestination
  // VitePress installs its window capture handler after importing the theme.
  window.addEventListener('click', () => { routerDestination = anchor.href }, true)
  location.href = 'https://wiki.example/mechanics/skilltree.html?view=details#mem_spirit_link--意识转移'
  const event = { target: new Element(anchor) }
  for (const { listener } of listeners) listener(event)
  assert.equal(routerDestination, routing.counterpartUrl(location.href))
  assert.match(routerDestination, /#mem_spirit_link--/)
  assert.match(routerDestination, /\?view=details/)
})

 test('approved Chinese display label retains canonical skill identity', async () => {
 const { DST } = fixture('zh-CN')
 const html = await renderToString(Vue.h(DST, { term: '意识转移', icon: 'ftxd' }, { default: () => '意识转移' }))
 assert.match(html, /身体力行/)
 assert.match(html, /data-term-preview="意识转移"/)
 assert.match(html, /#mem_spirit_link/)
 })

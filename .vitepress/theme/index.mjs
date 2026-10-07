import DefaultTheme from 'vitepress/theme'
import LanguageSwitch from './components/LanguageSwitch.vue'
import './term-preview-events.js'
import './language-switch-events.js'
import '@fontsource-variable/noto-sans-sc'
import './custom.css'
import './archive.css'
import './items.css'
import './enemies.css'
import './statuses.css'
import './settings.css'
import CreatureDossier from './components/CreatureDossier.vue'
import CharacterDossier from './components/CharacterDossier.vue'
import ComparisonTable from './components/ComparisonTable.vue'
import ItemSummary from './components/ItemSummary.vue'
import Infobox from './components/Infobox.vue'
import DST from './components/DST.vue'
import MediaCard from './components/MediaCard.vue'
import DSTIcon from './components/DSTIcon.vue'
import ShowcaseBlock from './components/ShowcaseBlock.vue'
import ReturnCapsule from './components/ReturnCapsule.vue'
import TermPreview from './components/TermPreview.vue'
import MechanicCard from './components/MechanicCard.vue'
import MechanicItem from './components/MechanicItem.vue'
import HighlightCard from './components/HighlightCard.vue'
import InteractiveTimeline from './components/InteractiveTimeline.vue'
import BossCard from './components/BossCard.vue'
import RepairCalculator from './components/RepairCalculator.vue'

import { h, nextTick } from 'vue'
import { getScrollOffset } from 'vitepress'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(LanguageSwitch, { homeOnly: true }),
      'nav-bar-content-after': () => h(LanguageSwitch),
      'layout-bottom': () => [h(ReturnCapsule), h(TermPreview)]
    })
  },
  enhanceApp({ app, router }) {
    app.component('CharacterDossier', CharacterDossier)
    app.component('CreatureDossier', CreatureDossier)
    app.component('ComparisonTable', ComparisonTable)
    app.component('ItemSummary', ItemSummary)
    app.component('Infobox', Infobox)
    app.component('DST', DST)
    app.component('MediaCard', MediaCard)
    app.component('DSTIcon', DSTIcon)
    app.component('ShowcaseBlock', ShowcaseBlock)
    app.component('MechanicCard', MechanicCard)
    app.component('MechanicItem', MechanicItem)
    app.component('HighlightCard', HighlightCard)
    app.component('InteractiveTimeline', InteractiveTimeline)
    app.component('BossCard', BossCard)
    app.component('RepairCalculator', RepairCalculator)

    if (typeof window !== 'undefined') {
      let currentActiveUrl = location.href

      const revealHashTarget = (hash) => {
        if (!hash) return null
        try {
          const target = document.getElementById(decodeURIComponent(hash.slice(1)))
          let disclosure = target?.closest('details')
          while (disclosure) {
            disclosure.open = true
            disclosure = disclosure.parentElement?.closest('details')
          }
          return target
        } catch { return null }
      }

      const triggerHighlight = () => {
        if (!location.hash) return
        setTimeout(() => {
          try {
            const el = revealHashTarget(location.hash)
            if (el) {
              const block = el.closest('li, p, h2, h3, h4, h5, summary, tr') || el
              block.classList.remove('dst-highlight-pulse')
              void block.offsetWidth // trigger reflow
              block.classList.add('dst-highlight-pulse')
              setTimeout(() => block.classList.remove('dst-highlight-pulse'), 2500)
              
              if (block.closest('.ink-archive')) {
                // Match VitePress's own outline threshold and keep the heading
                // below the currently visible navigation bars.
                window.scrollTo({
                  top: window.scrollY + block.getBoundingClientRect().top - getScrollOffset(),
                  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
                })
              } else {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }
            }
          } catch (e) {}
        }, 150) // slight delay to ensure dom is ready and override native scroll
      }

      const normalizePathname = (pathname) => {
        return pathname.replace(/\.html$/, '').replace(/\/$/, '')
      }

      window.addEventListener('hashchange', triggerHighlight)
      router.onAfterRouteChanged = () => {
        currentActiveUrl = location.href
        triggerHighlight()
      }

      // Run before VitePress consumes same-hash navigation clicks.
      document.addEventListener('click', (e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        const a = e.target.closest('a')
        if (!a?.href || a.target === '_blank' || a.hasAttribute('download')) return
        const url = new URL(a.href)
        if (url.origin !== location.origin || !url.hash ||
            normalizePathname(url.pathname) !== normalizePathname(location.pathname)) return
        revealHashTarget(url.hash)
        if (url.hash === location.hash) triggerHighlight()
      }, true)
      
      // Global click interceptor to record "Return Capsule" state
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.vp-doc')) return
        const a = e.target.closest('a')
        if (!a || !a.href) return
        
        const url = new URL(a.href)
        const currentUrl = new URL(currentActiveUrl)
        
        const urlPath = normalizePathname(url.pathname)
        const currentPath = normalizePathname(currentUrl.pathname)
        const isSamePage = urlPath === currentPath

        // If it's a cross-page jump or a hash jump on the same page
        if (url.origin === currentUrl.origin && (!isSamePage || url.hash)) {
           // If it's an in-page jump, calculate distance to avoid "too close" jumps
           if (isSamePage && url.hash) {
             try {
               const targetId = decodeURIComponent(url.hash)
               const targetEl = document.querySelector(targetId)
               if (targetEl) {
                 const rectA = a.getBoundingClientRect()
                 const rectTarget = targetEl.getBoundingClientRect()
                 const distance = Math.abs(rectTarget.top - rectA.top)
                 
                 // If the jump distance is less than 1 viewport height, ignore it
                 if (distance < window.innerHeight) {
                   return
                 }
               }
             } catch (e) {
               // Ignore querySelector errors for invalid hashes
             }
           }

           // Find nearest heading and its anchor ID
           let foundHeading = null
           let headingId = null
           const headings = Array.from(document.querySelectorAll('.vp-doc h1, .vp-doc h2, .vp-doc h3, .vp-doc h4'))
           for (let i = headings.length - 1; i >= 0; i--) {
              // Find the closest heading BEFORE the clicked link
              if (headings[i].compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING) {
                 // Remove trailing '#' anchor link characters added by markdown
                 foundHeading = headings[i].textContent.replace(/#$/, '').trim()
                 
                 const anchor = headings[i].querySelector('.dst-anchor, span[id]')
                 headingId = anchor ? anchor.id : headings[i].id
                 break
              }
           }
           
           const titleText = foundHeading || document.title.split('|')[0].trim()
           sessionStorage.setItem('mem_wiki_return_text', titleText)
           
           // Append the closest heading ID as hash to the return URL for precise scroll positioning
           const returnUrlObj = new URL(currentActiveUrl)
           if (headingId) {
             returnUrlObj.hash = headingId.startsWith('#') ? headingId : `#${headingId}`
           } else {
             returnUrlObj.hash = ''
           }
           sessionStorage.setItem('mem_wiki_return_url', returnUrlObj.href)
           
           // Dispatch event so ReturnCapsule can pick it up if it's an in-page hash jump
           setTimeout(() => {
             window.dispatchEvent(new Event('mem-wiki-route-changed'))
           }, 100)
        }
      })

      // trigger on initial load
      setTimeout(triggerHighlight, 500)
    }
  }
}

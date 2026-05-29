import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Infobox from './components/Infobox.vue'
import DST from './components/DST.vue'
import MediaCard from './components/MediaCard.vue'
import DSTIcon from './components/DSTIcon.vue'
import ShowcaseBlock from './components/ShowcaseBlock.vue'
import ReturnCapsule from './components/ReturnCapsule.vue'

import { h, nextTick } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(ReturnCapsule)
    })
  },
  enhanceApp({ app, router }) {
    app.component('Infobox', Infobox)
    app.component('DST', DST)
    app.component('MediaCard', MediaCard)
    app.component('DSTIcon', DSTIcon)
    app.component('ShowcaseBlock', ShowcaseBlock)

    if (typeof window !== 'undefined') {
      let currentActiveUrl = location.href

      const triggerHighlight = () => {
        if (!location.hash) return
        setTimeout(() => {
          try {
            const hash = decodeURIComponent(location.hash)
            const el = document.querySelector(hash)
            if (el) {
              const block = el.closest('li, p, h2, h3, h4, tr') || el
              block.classList.remove('dst-highlight-pulse')
              void block.offsetWidth // trigger reflow
              block.classList.add('dst-highlight-pulse')
              
              // Ensure it's centered to solve the "hard to find" issue
              el.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
      
      // Global click interceptor to record "Return Capsule" state
      document.addEventListener('click', (e) => {
        const a = e.target.closest('a')
        if (!a || !a.href) return
        
        // Only track clicks inside the actual document content (ignore sidebar/nav)
        if (!e.target.closest('.vp-doc')) return
        
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

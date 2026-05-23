import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Infobox from './components/Infobox.vue'
import DST from './components/DST.vue'
import MediaCard from './components/MediaCard.vue'
import DSTIcon from './components/DSTIcon.vue'
import ShowcaseBlock from './components/ShowcaseBlock.vue'

import { nextTick } from 'vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('Infobox', Infobox)
    app.component('DST', DST)
    app.component('MediaCard', MediaCard)
    app.component('DSTIcon', DSTIcon)
    app.component('ShowcaseBlock', ShowcaseBlock)

    if (typeof window !== 'undefined') {
      const triggerHighlight = () => {
        if (!location.hash) return
        setTimeout(() => {
          try {
            const hash = decodeURIComponent(location.hash)
            // VitePress natively scrolls to ID, we just need to add the highlight class
            const el = document.querySelector(hash)
            if (el) {
              const block = el.closest('li, p, h2, h3, h4, tr') || el
              block.classList.remove('dst-highlight-pulse')
              void block.offsetWidth // trigger reflow
              block.classList.add('dst-highlight-pulse')
            }
          } catch (e) {}
        }, 100) // slight delay to ensure dom is ready
      }

      window.addEventListener('hashchange', triggerHighlight)
      router.onAfterRouteChanged = () => triggerHighlight()
      
      // trigger on initial load
      setTimeout(triggerHighlight, 500)
    }
  }
}

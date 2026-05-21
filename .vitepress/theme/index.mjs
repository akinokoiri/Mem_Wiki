import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Infobox from './components/Infobox.vue'
import DST from './components/DST.vue'
import MediaCard from './components/MediaCard.vue'
import DSTIcon from './components/DSTIcon.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Infobox', Infobox)
    app.component('DST', DST)
    app.component('MediaCard', MediaCard)
    app.component('DSTIcon', DSTIcon)
  }
}

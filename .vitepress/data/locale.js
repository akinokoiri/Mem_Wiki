import { termDisplayNamesZh } from './terms-zh.js'
import { computed } from 'vue'
import { useData } from 'vitepress'
import { uiTranslations } from './ui-en.js'
import { termTranslations } from './terms-en.js'
import { localizeWikiLink } from './locale-routing.js'

export function useWikiLocale() {
  const { lang } = useData()
  const isEnglish = computed(() => lang.value.startsWith('en'))
  const t = (text, fallback) => isEnglish.value
    ? uiTranslations[text] ?? fallback ?? termTranslations[text] ?? text
    : (termDisplayNamesZh[text] ?? text)
  const localizeLink = link => localizeWikiLink(link, isEnglish.value)
  return { isEnglish, t, localizeLink }
}

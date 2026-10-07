<script setup>
import { useWikiLocale } from '../data/locale.js'
const { t, isEnglish } = useWikiLocale()
import { shallowRef, ref, watch, nextTick } from 'vue'
const props = defineProps({ skillId: String })
const emit = defineEmits(['loaded'])
const descriptions = import.meta.glob('../../mechanics/skills_desc/*.md')
const englishDescriptions = import.meta.glob('../../en/mechanics/skills_desc/*.md')
const content = shallowRef(null)
const status = ref('loading')
let request = 0
async function load() {
  const token = ++request
  content.value = null
  status.value = 'loading'
  const loader = isEnglish.value
    ? englishDescriptions[`../../en/mechanics/skills_desc/${props.skillId}.md`]
    : descriptions[`../../mechanics/skills_desc/${props.skillId}.md`]
  if (!loader) { status.value = 'missing'; return }
  try {
    const module = await loader()
    if (token !== request) return
    content.value = module.default
    status.value = 'ready'
    await nextTick()
    if (token === request) emit('loaded')
  } catch {
    if (token === request) status.value = 'error'
  }
}
watch([() => props.skillId, isEnglish], load, { immediate: true })
</script>
<template>
  <div class="skill-detail-panel" :aria-busy="status === 'loading'">
    <component v-if="content" :is="content" :key="`${isEnglish ? 'en' : 'zh'}-${skillId}`" class="skill-info" />
    <p v-else-if="status === 'loading'" role="status">{{ t("正在载入详细机制……") }}</p>
    <p v-else-if="status === 'missing'">{{ t("此节点的详细说明尚未收录。") }}</p>
    <p v-else role="alert">{{ t("详细机制载入失败。") }}<button type="button" @click="load">{{ t("重新载入") }}</button></p>
  </div>
</template>
<style scoped>
.skill-detail-panel { width: 100%; min-width: 0; }
.skill-detail-panel button { color: var(--ink-link); text-decoration: underline; }
.skill-detail-panel :deep(.media-card) { float: none; margin: 24px 0; max-width: 720px; }
</style>

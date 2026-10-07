<script setup>
import { useWikiLocale } from '../../data/locale.js'
const { t, isEnglish } = useWikiLocale()
import { withBase } from 'vitepress'

defineProps({
  title: { type: String, required: true },
  image: String,
  stats: { type: Array, default: () => [] },
  details: { type: Array, default: () => [] }
})
const formatValue = (value) => typeof value === 'string' ? t(value).replace(/\\n/g, '\n') : value
</script>

<template>
  <section class="creature-dossier" :aria-label="isEnglish ? `${t(title)} stats and traits` : `${title}的属性与特征`">
    <div class="creature-portrait">
      <img v-if="image" :src="withBase(image)" :alt="t(title)" loading="lazy" />
      <p>{{ t("属性与特征") }}</p>
    </div>
    <dl class="creature-stats">
      <div v-for="stat in stats" :key="stat.label">
        <dt><img v-if="stat.icon" :src="withBase(stat.icon)" alt="" />{{ t(stat.label) }}</dt>
        <dd>{{ formatValue(stat.value) }}</dd>
      </div>
    </dl>
    <dl v-if="details.length" class="creature-traits">
      <div v-for="detail in details" :key="detail.label">
        <dt>{{ t(detail.label) }}</dt>
        <dd>{{ formatValue(detail.value) }}</dd>
      </div>
    </dl>
  </section>
</template>

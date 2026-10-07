<script setup>
import { useWikiLocale } from '../../data/locale.js'
const { t, isEnglish, localizeLink } = useWikiLocale()
import { withBase } from 'vitepress'

defineProps({
  name: { type: String, required: true },
  image: { type: String, required: true },
  stats: { type: Array, required: true },
  attack: { type: String, required: true },
  startingItem: { type: String, required: true }
})
</script>

<template>
  <section class="character-dossier" :aria-label="isEnglish ? `${t(name)} default stats` : `${name}默认属性`">
    <div class="dossier-data">
      <p class="dossier-label">{{ t("本体 · 默认属性") }}</p>
      <dl class="dossier-stats">
        <div v-for="stat in stats" :key="stat.label">
          <dt>{{ t(stat.label) }}</dt>
          <dd><img :src="withBase(stat.icon)" alt="" width="28" height="28" />{{ t(stat.value) }}</dd>
        </div>
      </dl>
      <dl class="dossier-facts">
        <div><dt>{{ t("攻击倍率") }}</dt><dd>{{ t(attack) }}</dd></div>
        <div><dt>{{ t("初始物品") }}</dt><dd>{{ t(startingItem) }}</dd></div>
      </dl>
      <p class="dossier-caption">{{ t("属性数值可在") }}{{ isEnglish ? ' ' : '' }}<a :href="withBase(localizeLink('/mechanics/settings.html'))">{{ t("模组设置") }}</a>{{ t("中调整。") }}</p>
    </div>
    <img class="dossier-portrait" :src="withBase(image)" :alt="isEnglish ? `${t(name)} character portrait` : `${name}角色立绘`" width="402" height="594" />
  </section>
</template>

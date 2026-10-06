<script setup>
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
  <section class="character-dossier" :aria-label="`${name}默认属性`">
    <div class="dossier-data">
      <p class="dossier-label">本体 · 默认属性</p>
      <dl class="dossier-stats">
        <div v-for="stat in stats" :key="stat.label">
          <dt>{{ stat.label }}</dt>
          <dd><img :src="withBase(stat.icon)" alt="" width="28" height="28" />{{ stat.value }}</dd>
        </div>
      </dl>
      <dl class="dossier-facts">
        <div><dt>攻击倍率</dt><dd>{{ attack }}</dd></div>
        <div><dt>初始物品</dt><dd>{{ startingItem }}</dd></div>
      </dl>
      <p class="dossier-caption">属性数值可在<a :href="withBase('/mechanics/settings.html')">模组设置</a>中调整。</p>
    </div>
    <img class="dossier-portrait" :src="withBase(image)" :alt="`${name}角色立绘`" width="402" height="594" />
  </section>
</template>

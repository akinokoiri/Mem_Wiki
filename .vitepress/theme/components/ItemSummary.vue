<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  title: { type: String, required: true },
  image: String,
  stats: { type: Array, default: () => [] },
  details: { type: Array, default: () => [] }
})
const facts = computed(() => [...props.stats, ...props.details])
const formatValue = value => typeof value === 'string' ? value.replace(/\\n/g, '\n') : value
</script>

<template>
  <section class="item-summary" :aria-label="`${title}的制作与属性`" :class="{ 'has-image': image }">
    <div v-if="image" class="item-summary-art">
      <img class="item-summary-image" :src="withBase(image)" :alt="title" loading="lazy" />
    </div>
    <div class="item-summary-body">
      <p class="item-summary-kicker">制作与属性</p>
      <dl class="item-summary-facts">
        <div v-for="fact in facts" :key="fact.label">
          <dt><img v-if="fact.icon" :src="withBase(fact.icon)" alt="" />{{ fact.label }}</dt>
          <dd>{{ formatValue(fact.value) }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

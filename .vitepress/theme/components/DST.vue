<template>
  <span class="dst-noun" :class="iconClass">
    <img :src="withBase(iconSrc)" class="noun-icon" />
    <slot></slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  icon: String, // health, sanity, hunger, soul, beast, ghost, collar
})

const iconMap = {
  health: '/health_icon.png',
  sanity: '/sanity_icon.png',
  hunger: '/hunger_icon.png',
  soul: '/soul_icon.png',
  beast: '/mem_beast_mode.png',
  ghost: '/mem_ghost_mode.png',
  collar: '/mem_xq.png',
  corpse: '/mem_corpse.png'
}

const iconSrc = computed(() => iconMap[props.icon] || props.icon)
const iconClass = computed(() => `dst-${props.icon}`)
</script>

<style scoped>
.dst-noun {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
  padding: 0 2px;
}

.noun-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  vertical-align: middle;
}

/* 根据不同属性设置特定的文字颜色（模仿 DST 习惯） */
.dst-health { color: #e33b3b; }
.dst-sanity { color: #d6ca36; }
.dst-hunger { color: #f0a624; }
.dst-soul { color: #b19cd9; }
.dst-beast { color: #c47b4d; }
.dst-ghost { color: #a4b0be; }
</style>

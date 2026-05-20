<template>
  <span class="dst-noun" :class="iconClass" :title="`模组词条: ${nounText}`">
    <img :src="withBase(iconSrc)" class="noun-icon" @error="handleImageError" />
    <slot></slot>
  </span>
</template>

<script setup>
import { computed, useSlots, ref } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  icon: String, // health, sanity, hunger, soul, beast, ghost, collar, etc.
})

const slots = useSlots()
const imageError = ref(false)

const nounText = computed(() => {
  if (slots.default) {
    return slots.default()[0]?.children || ''
  }
  return ''
})

const iconMap = {
  health: '/icon_health.png',
  sanity: '/icon_sanity.png',
  hunger: '/icon_hunger.png',
  soul: '/icon_soul.png',
  beast: '/icon_mem_beast_mode.png',
  ghost: '/icon_mem_ghost_mode.png',
  collar: '/icon_mem_xq.png',
  'collar-lv2': '/icon_mem_xq_lv2.png',
  'collar-lv3': '/icon_mem_xq_lv3.png',
  'collar-lv4-an': '/icon_mem_xq_lv4_an.png',
  'collar-lv4-yue': '/icon_mem_xq_lv4_yue.png',
  repair: '/icon_mem_repair.png',
  'tomb-upgrader': '/icon_mem_tomb_upgrader.png',
  corpse: '/icon_mem_corpse.png',
  'shadow-gestalt': '/icon_mem_shadow_gestalt.png',
  mod: '/icon_mod.png'
}

const iconSrc = computed(() => {
  if (imageError.value) {
    return '/icon_mod.png'
  }
  const iconKey = props.icon ? props.icon.toLowerCase().trim() : 'mod'
  return iconMap[iconKey] || '/icon_mod.png'
})

const iconClass = computed(() => `dst-${props.icon ? props.icon.toLowerCase().trim() : 'mod'}`)

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.dst-noun {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  padding: 2px 8px;
  margin: 0 4px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  cursor: help;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.noun-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  vertical-align: middle;
  transition: transform 0.25s ease;
}

/* 悬浮微动效与发光包边 */
.dst-noun:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1.5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.dst-noun:hover .noun-icon {
  transform: translateY(-1px) scale(1.1);
}

/* 基于 DST 经典的专属属性渐变色彩体系 */
.dst-health { 
  color: #ff4d4d; 
  border-color: rgba(255, 77, 77, 0.3);
}
.dst-health:hover {
  box-shadow: 0 0 12px rgba(255, 77, 77, 0.35);
  background: rgba(255, 77, 77, 0.08);
}

.dst-sanity { 
  color: #ffd633; 
  border-color: rgba(255, 214, 51, 0.3);
}
.dst-sanity:hover {
  box-shadow: 0 0 12px rgba(255, 214, 51, 0.35);
  background: rgba(255, 214, 51, 0.08);
}

.dst-hunger { 
  color: #ff9933; 
  border-color: rgba(255, 153, 51, 0.3);
}
.dst-hunger:hover {
  box-shadow: 0 0 12px rgba(255, 153, 51, 0.35);
  background: rgba(255, 153, 51, 0.08);
}

.dst-soul { 
  color: #c084fc; 
  border-color: rgba(192, 132, 252, 0.3);
}
.dst-soul:hover {
  box-shadow: 0 0 12px rgba(192, 132, 252, 0.35);
  background: rgba(192, 132, 252, 0.08);
}

.dst-beast { 
  color: #eab308; 
  border-color: rgba(234, 179, 8, 0.3);
}
.dst-beast:hover {
  box-shadow: 0 0 12px rgba(234, 179, 8, 0.35);
  background: rgba(234, 179, 8, 0.08);
}

.dst-ghost { 
  color: #94a3b8; 
  border-color: rgba(148, 163, 184, 0.3);
}
.dst-ghost:hover {
  box-shadow: 0 0 12px rgba(148, 163, 184, 0.35);
  background: rgba(148, 163, 184, 0.08);
}

/* 其它各种模组特有概念颜色统一收口 */
.dst-mod {
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.3);
}
.dst-mod:hover {
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
  background: rgba(56, 189, 248, 0.08);
}

/* 特殊封印项圈系列 */
.dst-collar, .dst-collar-lv2, .dst-collar-lv3, .dst-collar-lv4-an, .dst-collar-lv4-yue {
  color: #06b6d4;
  border-color: rgba(6, 182, 212, 0.3);
}
.dst-collar:hover, .dst-collar-lv2:hover, .dst-collar-lv3:hover, .dst-collar-lv4-an:hover, .dst-collar-lv4-yue:hover {
  box-shadow: 0 0 12px rgba(6, 182, 212, 0.35);
  background: rgba(6, 182, 212, 0.08);
}
</style>

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

// 递归提取 VNode 中的所有纯文本，完美支持嵌套标签与混合插槽
const extractText = (vnodes) => {
  if (!vnodes) return ''
  return vnodes.map(node => {
    if (!node) return ''
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node)
    }
    if (typeof node.children === 'string') {
      return node.children
    }
    if (Array.isArray(node.children)) {
      return extractText(node.children)
    }
    return ''
  }).join('')
}

const nounText = computed(() => {
  return slots.default ? extractText(slots.default()) : ''
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
/* 基类：高阶 CSS 变量定义 */
.dst-noun {
  --theme-color: #38bdf8; 
  --theme-color-rgb: 56, 189, 248;

  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  padding: 2px 8px;
  margin: 0 4px;
  border-radius: 6px;
  vertical-align: middle;
  cursor: help;
  position: relative;
  
  color: var(--theme-color);
  background: rgba(var(--theme-color-rgb), 0.03);
  border: 1px solid rgba(var(--theme-color-rgb), 0.2);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

  /* transition 性能调优，避免 all 带来的重绘开销 */
  transition: 
    background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.noun-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  vertical-align: middle;
  transition: transform 0.25s ease;
}

/* 统一 hover 发光与微动效 */
.dst-noun:hover {
  background: rgba(var(--theme-color-rgb), 0.09);
  border-color: rgba(var(--theme-color-rgb), 0.45);
  transform: translateY(-1.5px);
  box-shadow: 
    0 0 12px rgba(var(--theme-color-rgb), 0.35),
    0 4px 12px rgba(0, 0, 0, 0.25);
}

.dst-noun:hover .noun-icon {
  transform: translateY(-1px) scale(1.1);
}

/* 变量映射层：完美遵循 DRY */
.dst-health { 
  --theme-color: #ff4d4d; 
  --theme-color-rgb: 255, 77, 77;
}

.dst-sanity { 
  --theme-color: #ffd633; 
  --theme-color-rgb: 255, 214, 51;
}

.dst-hunger { 
  --theme-color: #ff9933; 
  --theme-color-rgb: 255, 153, 51;
}

.dst-soul { 
  --theme-color: #c084fc; 
  --theme-color-rgb: 192, 132, 252;
}

.dst-beast { 
  --theme-color: #eab308; 
  --theme-color-rgb: 234, 179, 8;
}

.dst-ghost { 
  --theme-color: #94a3b8; 
  --theme-color-rgb: 148, 163, 184;
}

.dst-mod {
  --theme-color: #38bdf8;
  --theme-color-rgb: 56, 189, 248;
}

/* 特殊封印项圈系列 */
.dst-collar, 
.dst-collar-lv2, 
.dst-collar-lv3, 
.dst-collar-lv4-an, 
.dst-collar-lv4-yue {
  --theme-color: #06b6d4;
  --theme-color-rgb: 6, 182, 212;
}
</style>

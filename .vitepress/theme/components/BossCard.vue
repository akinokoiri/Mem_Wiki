<template>
  <div :class="['boss-strategy-card', theme + '-theme']">
    <div class="card-main-content">
      <div class="boss-name-row">
        <div class="boss-name">
          <slot name="title">{{ title }}</slot>
        </div>
        <span class="theme-badge">{{ theme === 'moon' ? '天体机制' : '暗影机制' }}</span>
      </div>
      
      <div class="boss-key-action">{{ keyAction }}</div>
      
      <div class="boss-guide-content">
        <slot></slot>
      </div>
    </div>
    
    <div v-if="$slots.tucao" class="boss-alert-tucao">
      <slot name="tucao"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  theme: {
    type: String,
    default: 'moon' // 'moon' (blue) or 'shadow' (purple)
  },
  keyAction: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.boss-strategy-card {
  /* 统一为羊皮纸生存美学配色 */
  --bc-bg: var(--mem-bg-soft, #fdf6e3);
  --bc-border: var(--mem-border, #e6dbcc);
  --bc-text-title: var(--mem-heading, #5c3a21);
  --bc-text-sub: var(--mem-heading-sub, #7d5a44);
  --bc-text-main: var(--mem-text-1, #3d2e2e);
  --bc-panel-bg: rgba(255, 255, 255, 0.45);
  --bc-shadow: rgba(0, 0, 0, 0.05);

  /* 主题特有配色 (月亮/天体) */
  --bc-moon-accent: #2980b9;
  --bc-moon-bg: rgba(52, 152, 219, 0.1);
  
  /* 主题特有配色 (暗影) */
  --bc-shadow-accent: #8e44ad;
  --bc-shadow-bg: rgba(142, 68, 173, 0.1);

  background: var(--bc-panel-bg);
  border: 1px solid var(--bc-border);
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 12px var(--bc-shadow);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
  transition: transform 0.3s ease, border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.3s ease;
}

.dark .boss-strategy-card {
  --bc-bg: #1a1a1c;
  --bc-border: #2a2a2c;
  --bc-text-title: #e0d4c5;
  --bc-text-sub: #9e9389;
  --bc-text-main: #c4bbb0;
  --bc-panel-bg: rgba(255, 255, 255, 0.02);
  --bc-shadow: rgba(0, 0, 0, 0.3);

  --bc-moon-accent: #5ab4e6;
  --bc-moon-bg: rgba(90, 180, 230, 0.15);

  --bc-shadow-accent: #c084fc;
  --bc-shadow-bg: rgba(192, 132, 252, 0.15);
}

.boss-strategy-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 8px 20px var(--bc-shadow);
}

.dark .boss-strategy-card:hover {
  background: rgba(255, 255, 255, 0.04);
}

/* 顶部主题细条，进行柔和化改造 */
.boss-strategy-card.moon-theme {
  border-top: 4px solid var(--bc-moon-accent);
}

.boss-strategy-card.moon-theme:hover {
  border-color: var(--bc-moon-accent);
}

.boss-strategy-card.shadow-theme {
  border-top: 4px solid var(--bc-shadow-accent);
}

.boss-strategy-card.shadow-theme:hover {
  border-color: var(--bc-shadow-accent);
}

.boss-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.boss-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--bc-text-title);
  font-family: "Georgia", serif;
}

.theme-badge {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.moon-theme .theme-badge {
  background: var(--bc-moon-bg);
  color: var(--bc-moon-accent);
}

.shadow-theme .theme-badge {
  background: var(--bc-shadow-bg);
  color: var(--bc-shadow-accent);
}

.boss-key-action {
  font-size: 0.85rem;
  padding: 6px 12px;
  border-radius: 6px;
  margin-bottom: 18px;
  display: inline-block;
  font-weight: 700;
  border: 1px solid var(--bc-border);
}

.moon-theme .boss-key-action {
  color: var(--bc-moon-accent);
  background: var(--bc-moon-bg);
  border-color: rgba(52, 152, 219, 0.2);
}

.shadow-theme .boss-key-action {
  color: var(--bc-shadow-accent);
  background: var(--bc-shadow-bg);
  border-color: rgba(142, 68, 173, 0.2);
}

.boss-guide-content {
  flex-grow: 1;
}

.boss-guide-content :deep(ul) {
  margin: 0 !important;
  padding: 0 !important;
  list-style: none !important;
}

.boss-guide-content :deep(li) {
  margin-bottom: 10px;
  line-height: 1.6;
  font-size: 0.92rem;
  color: var(--bc-text-main);
  position: relative;
  padding-left: 18px !important;
}

.boss-guide-content :deep(li::before) {
  content: "✦";
  position: absolute;
  left: 0;
  font-size: 0.85rem;
}

.moon-theme .boss-guide-content :deep(li::before) {
  color: var(--bc-moon-accent);
}

.shadow-theme .boss-guide-content :deep(li::before) {
  color: var(--bc-shadow-accent);
}

.boss-guide-content :deep(strong) {
  color: var(--bc-text-title);
  font-weight: 700;
}

.boss-alert-tucao {
  margin-top: 20px;
  padding: 12px 14px;
  background: var(--bc-bg);
  border-left: 3px solid var(--bc-text-title);
  font-size: 0.85rem;
  color: var(--bc-text-sub);
  border-radius: 0 8px 8px 0;
  line-height: 1.5;
}

.boss-alert-tucao :deep(strong) {
  color: var(--bc-text-title);
}

.boss-alert-tucao :deep(code) {
  font-size: 0.85em;
  background-color: rgba(128, 128, 128, 0.15);
  padding: 2px 4px;
  border-radius: 4px;
}
</style>

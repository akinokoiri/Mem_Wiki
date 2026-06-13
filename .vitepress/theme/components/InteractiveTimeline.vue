<template>
  <div class="timeline-container">
    <div class="interactive-layout">
      <!-- 左侧时间线导航 -->
      <div class="timeline-sidebar">
        <!-- 连线背景线 -->
        <div class="sidebar-line"></div>
        
        <div 
          v-for="step in steps" 
          :key="step.id"
          :class="['timeline-nav-item', { active: activeStage === step.id }]"
          @click="activeStage = step.id"
        >
          <div class="nav-step-num">{{ step.label }}</div>
          <div class="nav-step-title">{{ step.title }}</div>
        </div>
      </div>

      <!-- 右侧展示卡片 -->
      <div class="content-display-area">
        <transition name="fade" mode="out-in">
          <div :key="activeStage" class="display-card">
            <slot :name="activeStage"></slot>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeStage = ref('day1')

const steps = [
  { id: 'day1', label: 'Step 1', title: '开局 Day 1' },
  { id: 'early', label: 'Step 2', title: '前期生存' },
  { id: 'mid', label: 'Step 3', title: '中期思路' },
  { id: 'late', label: 'Step 4', title: '后期思路' }
]
</script>

<style scoped>
.timeline-container {
  /* 统一为羊皮纸生存美学配色 */
  --tl-bg: var(--mem-bg-soft, #fdf6e3);
  --tl-border: var(--mem-border, #e6dbcc);
  --tl-text-title: var(--mem-heading, #5c3a21);
  --tl-text-sub: var(--mem-heading-sub, #7d5a44);
  --tl-text-main: var(--mem-text-1, #3d2e2e);
  --tl-panel-bg: rgba(255, 255, 255, 0.45);
  --tl-shadow: rgba(0, 0, 0, 0.05);
  --tl-active-bg: rgba(92, 58, 33, 0.08); /* 稍微深一点的木色背景 */
  --tl-active-border: var(--mem-heading, #5c3a21);
  --tl-brand: var(--vp-c-brand-1, #b19cd9);

  margin: 30px 0;
  width: 100%;
}

.dark .timeline-container {
  --tl-bg: #1a1a1c;
  --tl-border: #2a2a2c;
  --tl-text-title: #e0d4c5;
  --tl-text-sub: #9e9389;
  --tl-text-main: #c4bbb0;
  --tl-panel-bg: rgba(255, 255, 255, 0.02);
  --tl-shadow: rgba(0, 0, 0, 0.3);
  --tl-active-bg: rgba(177, 156, 217, 0.1);
  --tl-active-border: var(--vp-c-brand-1, #b19cd9);
}

.interactive-layout {
  display: flex;
  gap: 28px;
  min-height: 320px;
}

.timeline-sidebar {
  width: 180px;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 贯穿选项的垂直引导线 */
.sidebar-line {
  position: absolute;
  left: 20px;
  top: 15px;
  bottom: 15px;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 4px,
    var(--tl-border) 4px,
    var(--tl-border) 8px
  );
  z-index: 1;
}

.timeline-nav-item {
  padding: 12px 16px 12px 38px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--tl-border);
  position: relative;
  background: var(--tl-bg);
  z-index: 2;
  box-shadow: 0 2px 5px var(--tl-shadow);
}

.timeline-nav-item:hover {
  background: var(--tl-active-bg);
  border-color: var(--tl-text-sub);
  transform: translateX(3px);
}

.timeline-nav-item.active {
  background: var(--tl-active-bg);
  border-color: var(--tl-active-border);
  font-weight: 600;
  box-shadow: 0 4px 12px var(--tl-shadow);
  transform: translateX(5px);
}

/* 圆圈指示点 */
.timeline-nav-item::before {
  content: "";
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--tl-bg);
  border: 2px solid var(--tl-border);
  transition: all 0.3s ease;
  z-index: 3;
}

.timeline-nav-item:hover::before {
  border-color: var(--tl-text-sub);
}

.timeline-nav-item.active::before {
  background: var(--tl-active-border);
  border-color: var(--tl-bg);
  box-shadow: 0 0 0 3px rgba(177, 156, 217, 0.3);
  width: 14px;
  height: 14px;
}

.nav-step-num {
  font-size: 0.75rem;
  color: var(--tl-text-sub);
  text-transform: uppercase;
  margin-bottom: 2px;
  letter-spacing: 0.5px;
  font-weight: 700;
}

.nav-step-title {
  font-size: 0.95rem;
  color: var(--tl-text-main);
}

.timeline-nav-item.active .nav-step-title {
  color: var(--tl-text-title);
}

.content-display-area {
  flex-grow: 1;
  position: relative;
}

.display-card {
  background: var(--tl-panel-bg);
  border: 1px solid var(--tl-border);
  border-radius: 14px;
  padding: 24px;
  box-sizing: border-box;
  box-shadow: 0 6px 18px var(--tl-shadow);
  min-height: 100%;
}

/* 针对插槽内容的样式美化 */
.display-card :deep(h3) {
  margin-top: 0 !important;
  margin-bottom: 16px !important;
  font-size: 1.25rem !important;
  color: var(--tl-text-title) !important;
  font-weight: 700 !important;
  border-bottom: none !important;
  padding-bottom: 0 !important;
  font-family: "Georgia", serif;
}

.display-card :deep(ul) {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 16px 0 !important;
}

.display-card :deep(li) {
  position: relative;
  padding-left: 20px !important;
  margin-bottom: 10px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--tl-text-main);
}

.display-card :deep(li::before) {
  content: "✦";
  position: absolute;
  left: 0;
  color: var(--tl-text-sub);
  font-size: 0.85rem;
}

.display-card :deep(li > strong) {
  color: var(--tl-text-title);
  font-weight: 700;
}

/* 吐槽碎碎念部分的特定类名 */
.display-card :deep(.boss-alert-tucao) {
  margin: 16px 0 0 0;
  padding: 12px 16px;
  background: var(--tl-bg);
  border-left: 3px solid var(--tl-text-title);
  font-size: 0.85rem;
  color: var(--tl-text-sub);
  border-radius: 0 8px 8px 0;
  line-height: 1.5;
}

.display-card :deep(.boss-alert-tucao strong) {
  color: var(--tl-text-title);
}

.display-card :deep(code) {
  background-color: rgba(128, 128, 128, 0.15);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.85em;
  color: var(--vp-c-brand-1, #3498db);
}

/* Vue 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ================== 响应式设计 ================== */
@media (max-width: 768px) {
  .interactive-layout {
    flex-direction: column;
    gap: 16px;
  }
  
  .timeline-sidebar {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;
  }
  
  .sidebar-line {
    display: none;
  }
  
  .timeline-nav-item {
    flex: 1;
    padding: 10px 8px;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 0;
    transform: none !important;
  }
  
  .timeline-nav-item::before {
    display: none;
  }
  
  .nav-step-num {
    font-size: 0.65rem;
  }
  
  .nav-step-title {
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .timeline-nav-item.active {
    box-shadow: 0 2px 8px var(--tl-shadow);
  }
}
</style>

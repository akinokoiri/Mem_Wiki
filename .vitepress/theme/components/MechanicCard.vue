<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  pros: {
    type: Array,
    default: () => []
  },
  cons: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="mechanic-card-wrapper">
    <div class="mechanic-header">
      <h3 class="mechanic-title">
        <slot name="title">
          <DSTIcon v-if="icon" :icon="icon" />
          <span v-html="title"></span>
        </slot>
      </h3>
      <div v-if="subtitle || $slots.subtitle" class="mechanic-desc">
        <slot name="subtitle"><span v-html="subtitle"></span></slot>
      </div>
    </div>
    
    <div class="split-panel">
      <!-- 左侧：优势 -->
      <div class="split-side split-pro">
        <div class="split-title">优势收益</div>
        <slot name="pros">
          <div v-if="pros.length === 0" class="empty-state">暂无</div>
          <div v-for="(item, index) in pros" :key="'pro-'+index" class="stat-row">
            <span class="badge badge-pro">{{ item.label }}</span>
            <span class="detail-text" v-html="item.text"></span>
          </div>
        </slot>
      </div>

      <!-- 右侧：代价 -->
      <div class="split-side split-con">
        <div class="split-title">机制代价</div>
        <slot name="cons">
          <div v-if="cons.length === 0" class="empty-state">暂无</div>
          <div v-for="(item, index) in cons" :key="'con-'+index" class="stat-row">
            <span class="badge badge-con">{{ item.label }}</span>
            <span class="detail-text" v-html="item.text"></span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ================== 变量定义 (适配浅色与暗黑模式) ================== */
.mechanic-card-wrapper {
  /* 默认与全局主题绑定的羊皮纸生存美学配色 */
  --mc-bg: var(--mem-bg-soft, #fdf6e3);
  --mc-border: var(--mem-border, #e6dbcc);
  --mc-text-title: var(--mem-heading, #5c3a21);
  --mc-text-sub: var(--mem-heading-sub, #8b7355);
  --mc-text-main: var(--mem-text-1, #4a3e35);
  --mc-panel-bg: rgba(255, 255, 255, 0.6);
  --mc-shadow: rgba(0, 0, 0, 0.08);
  
  --mc-pro-accent: #388e3c;
  --mc-pro-bg: #e8f5e9;
  --mc-pro-border: #c8e6c9;
  
  --mc-con-accent: #d32f2f;
  --mc-con-bg: #ffebee;
  --mc-con-border: #ffcdd2;

  margin: 35px 0;
  padding: 28px;
  background: var(--mc-bg);
  border-radius: 16px;
  color: var(--mc-text-main);
  font-family: var(--vp-font-family-base, 'Inter', system-ui, sans-serif);
  box-shadow: 0 4px 20px var(--mc-shadow);
  border: 1px solid var(--mc-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

/* 深色模式适配 (VitePress 默认会在 html 标签上加 .dark) */
.dark .mechanic-card-wrapper {
  --mc-panel-bg: rgba(255, 255, 255, 0.02);
  --mc-shadow: rgba(0, 0, 0, 0.4);
  
  --mc-pro-accent: #81c784;
  --mc-pro-bg: rgba(76, 175, 80, 0.1);
  --mc-pro-border: rgba(76, 175, 80, 0.2);
  
  --mc-con-accent: #e57373;
  --mc-con-bg: rgba(244, 67, 54, 0.1);
  --mc-con-border: rgba(244, 67, 54, 0.2);
}

/* ================== 交互与排版 ================== */
.mechanic-card-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--mc-shadow);
}

.mechanic-header {
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--mc-border);
}

.mechanic-title {
  margin: 0 !important;
  font-size: 1.5rem !important;
  color: var(--mc-text-title) !important;
  font-weight: 700;
  letter-spacing: 0.5px;
  border: none !important;
  padding: 0 !important;
}

.mechanic-desc {
  color: var(--mc-text-sub);
  font-size: 0.95rem;
  margin-top: 8px;
  font-weight: 500;
}

/* 双栏对比 */
.split-panel {
  display: flex;
  gap: 24px;
}

@media (max-width: 768px) {
  .split-panel {
    flex-direction: column;
    gap: 16px;
  }
}

.split-side {
  flex: 1;
  padding: 24px;
  border-radius: 12px;
  background: var(--mc-panel-bg);
  display: flex;
  flex-direction: column;
}

.split-pro {
  border-left: 3px solid var(--mc-pro-accent);
}

.split-con {
  border-left: 3px solid var(--mc-con-accent);
}

.split-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--mc-border);
  letter-spacing: 1px;
}

.split-pro .split-title { color: var(--mc-pro-accent); text-align: left; }
.split-con .split-title { color: var(--mc-con-accent); text-align: left; }

.stat-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  font-size: 0.95rem;
  line-height: 1.6;
}
.stat-row:last-child { margin-bottom: 0; }

.split-pro .stat-row { justify-content: flex-start; text-align: left; }
.split-con .stat-row { justify-content: flex-start; text-align: left; }

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.badge-pro { 
  background: var(--mc-pro-bg); 
  color: var(--mc-pro-accent); 
  border: 1px solid var(--mc-pro-border); 
  margin-right: 12px;
}

.badge-con { 
  background: var(--mc-con-bg); 
  color: var(--mc-con-accent); 
  border: 1px solid var(--mc-con-border); 
  margin-right: 12px;
}

.detail-text {
  color: var(--mc-text-main);
  flex: 1;
}

/* 对 slot 传入的原生 ul / li 进行美化 */
.split-side :deep(ul) {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

.split-side :deep(li) {
  display: block;
  margin-bottom: 16px;
  font-size: 0.95rem;
  line-height: 1.6;
  position: relative;
  padding: 0 0 0 96px !important;
}

.split-side :deep(li:last-child) {
  margin-bottom: 0;
}

/* 将 li 下的第一个 strong 标签自动编译为圆角 Badge 徽章 */
.split-side :deep(li > strong:first-child) {
  position: absolute;
  left: 0;
  top: 1px;
  width: 84px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 2px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  line-height: 1.2;
}

.split-pro :deep(li > strong:first-child) {
  background: var(--mc-pro-bg);
  color: var(--mc-pro-accent);
  border: 1px solid var(--mc-pro-border);
}

.split-con :deep(li > strong:first-child) {
  background: var(--mc-con-bg);
  color: var(--mc-con-accent);
  border: 1px solid var(--mc-con-border);
}

/* Fix for nested markdown code blocks (e.g., <code>R</code>) */
:deep(code) {
  background-color: rgba(128, 128, 128, 0.15);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.85em;
  color: var(--vp-c-brand-1, #3498db);
}
:deep(strong), :deep(b) {
  font-weight: 700;
  color: var(--mc-text-title);
}

.empty-state {
  color: var(--mc-text-sub);
  font-style: italic;
  font-size: 0.9rem;
}
</style>

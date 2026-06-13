<script setup>
// No props needed as we use slots for rich formatting
</script>

<template>
  <div class="highlight-card-wrapper">
    <div class="highlight-header">
      <h3 class="highlight-title">
        <slot name="title">👤 模组特点</slot>
      </h3>
      <div class="highlight-desc">
        <slot name="subtitle"></slot>
      </div>
    </div>
    
    <div class="split-panel">
      <!-- 左侧：亮点优势 -->
      <div class="split-side split-pro">
        <div class="split-title">
          <span>✨ 核心设计</span>
        </div>
        <div class="side-content">
          <slot name="pros"></slot>
        </div>
      </div>

      <!-- 右侧：避雷缺点 -->
      <div class="split-side split-con">
        <div class="split-title">
          <span>⚠️ 避雷指南</span>
        </div>
        <div class="side-content">
          <slot name="cons"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.highlight-card-wrapper {
  /* 基础配色，完美契合 custom.css 变量 */
  --hl-bg: var(--mem-bg-soft, #fdf6e3);
  --hl-border: var(--mem-border, #e6dbcc);
  --hl-text-title: var(--mem-heading, #5c3a21);
  --hl-text-sub: var(--mem-heading-sub, #8b7355);
  --hl-text-main: var(--mem-text-1, #4a3e35);
  --hl-panel-bg: rgba(255, 255, 255, 0.4);
  --hl-shadow: rgba(0, 0, 0, 0.05);
  
  --hl-pro-accent: #388e3c;
  --hl-con-accent: #d32f2f;

  margin: 35px 0;
  padding: 28px;
  background: var(--hl-bg);
  border-radius: 16px;
  color: var(--hl-text-main);
  font-family: var(--vp-font-family-base, 'Inter', system-ui, sans-serif);
  box-shadow: 0 4px 20px var(--hl-shadow);
  border: 1px solid var(--hl-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dark .highlight-card-wrapper {
  --hl-panel-bg: rgba(255, 255, 255, 0.02);
  --hl-shadow: rgba(0, 0, 0, 0.3);
  --hl-pro-accent: #81c784;
  --hl-con-accent: #e57373;
}

.highlight-card-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--hl-shadow);
}

.highlight-header {
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--hl-border);
}

.highlight-title {
  margin: 0 !important;
  font-size: 1.5rem !important;
  color: var(--hl-text-title) !important;
  font-weight: 700;
  letter-spacing: 0.5px;
  border: none !important;
  padding: 0 !important;
  font-family: "Georgia", serif;
}

.highlight-desc {
  color: var(--hl-text-sub);
  font-size: 0.95rem;
  margin-top: 8px;
  font-weight: 500;
}

/* 双栏布局 */
.split-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .split-panel {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.split-side {
  padding: 24px;
  border-radius: 12px;
  background: var(--hl-panel-bg);
  display: flex;
  flex-direction: column;
}

.split-pro {
  border-left: 4px solid var(--hl-pro-accent);
}

.split-con {
  border-left: 4px solid var(--hl-con-accent);
}

.split-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px dashed var(--hl-border);
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
}

.split-pro .split-title {
  color: var(--hl-pro-accent);
}

.split-con .split-title {
  color: var(--hl-con-accent);
}

.side-content {
  font-size: 0.95rem;
  line-height: 1.6;
}

/* 对 slot 传进来的 ul, li 进行样式深度美化 */
:deep(ul) {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

:deep(li) {
  position: relative;
  padding-left: 20px !important;
  margin-bottom: 12px !important;
}

:deep(li:last-child) {
  margin-bottom: 0 !important;
}

/* 列表前的小图标 */
.split-pro :deep(li::before) {
  content: "✦";
  position: absolute;
  left: 0;
  top: 0;
  color: var(--hl-pro-accent);
  font-weight: bold;
}

.split-con :deep(li::before) {
  content: "⚠";
  position: absolute;
  left: 0;
  top: 0;
  color: var(--hl-con-accent);
  font-weight: bold;
}

:deep(strong), :deep(b) {
  font-weight: 700;
  color: var(--hl-text-title);
}

:deep(code) {
  background-color: rgba(128, 128, 128, 0.15);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.85em;
  color: var(--vp-c-brand-1, #3498db);
}
</style>

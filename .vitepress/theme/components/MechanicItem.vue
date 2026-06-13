<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'pro' // 'pro' 或 'con'
  }
})
</script>

<template>
  <div class="stat-row" :class="type === 'pro' ? 'row-pro' : 'row-con'">
    <template v-if="type === 'pro'">
      <span class="badge badge-pro">{{ label }}</span>
      <span class="detail-text"><slot></slot></span>
    </template>
    <template v-else>
      <span class="badge badge-con">{{ label }}</span>
      <span class="detail-text"><slot></slot></span>
    </template>
  </div>
</template>

<style scoped>
.stat-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  font-size: 0.95rem;
  line-height: 1.6;
}
.stat-row:last-child { margin-bottom: 0; }

.row-pro { justify-content: flex-start; text-align: left; }
.row-con { justify-content: flex-start; text-align: left; }

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
  background: var(--mc-pro-bg, #e8f5e9); 
  color: var(--mc-pro-accent, #388e3c); 
  border: 1px solid var(--mc-pro-border, #c8e6c9); 
  margin-right: 12px;
}

.badge-con { 
  background: var(--mc-con-bg, #ffebee); 
  color: var(--mc-con-accent, #d32f2f); 
  border: 1px solid var(--mc-con-border, #ffcdd2); 
  margin-right: 12px;
}

.detail-text {
  color: var(--mc-text-main, #4a3e35);
  flex: 1;
}

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
  color: var(--mc-text-title, inherit);
}
</style>

<template>
  <aside class="infobox" :style="{ width: width }">
    <div class="infobox-title">{{ title }}</div>
    <div v-if="image" class="infobox-image">
      <img :src="withBase(image)" :alt="title" />
    </div>
    <div class="infobox-section">数值属性</div>
    <div class="infobox-stats">
      <div v-for="stat in stats" :key="stat.label" class="infobox-stat-row">
        <div class="infobox-stat-label">
          <img v-if="stat.icon" :src="withBase(stat.icon)" class="stat-mini-icon" />
          {{ stat.label }}
        </div>
        <div class="infobox-stat-value">{{ formatValue(stat.value) }}</div>
      </div>
    </div>
    <div v-if="details && details.length" class="infobox-section">核心特征</div>
    <div class="infobox-details">
      <div v-for="detail in details" :key="detail.label" class="infobox-detail-row">
        <span class="detail-label">{{ detail.label }}:</span>
        <span class="detail-value">{{ formatValue(detail.value) }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { withBase } from 'vitepress'
defineProps({
  title: String,
  image: String,
  width: {
    type: String,
    default: '320px'
  },
  stats: Array, // [{ label: '生命', value: '75', icon: '/health_icon.png' }]
  details: Array // [{ label: '代码名', value: 'mem' }]
})

const formatValue = (val) => {
  if (typeof val !== 'string') return val
  return val.replace(/\\n/g, '\n') // 将字符串 "\n" 转换为真正的换行符
}
</script>

<style scoped>
.infobox {
  float: right;
  clear: right; /* 确保多个卡片垂直排列 */
  width: 320px;
  background: #fdfaf5;
  border: 2px solid #5c3a21;
  border-radius: 8px;
  margin: 0 0 24px 32px; /* 增加一点左侧留白让文字呼吸 */
  font-size: 0.9em;
  box-shadow: 4px 4px 0px rgba(92, 58, 33, 0.1);
  overflow: hidden;
  z-index: 10;
  transition: transform 0.2s ease;
}

.infobox:hover {
  transform: translateY(-2px);
}


@media (max-width: 768px) {
  .infobox {
    float: none;
    width: 100%;
    margin: 20px 0;
  }
}

.infobox-title {
  background: #5c3a21;
  color: #fff;
  padding: 8px;
  text-align: center;
  font-weight: bold;
  font-size: 1.1em;
}

.infobox-image {
  padding: 10px;
  background: #f5efe4;
  text-align: center;
  border-bottom: 1px solid #dcd1ba;
}

.infobox-image img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
  border-radius: 2px;
}

.infobox-section {
  background: #ebe2d0;
  color: #5c3a21;
  padding: 4px 8px;
  font-weight: bold;
  border-bottom: 1px solid #dcd1ba;
  font-size: 0.85em;
  text-align: center;
}

.infobox-stats {
  padding: 5px 0;
}

.infobox-stat-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 12px;
  border-bottom: 1px solid #f4eee1;
}

.infobox-stat-row:last-child {
  border-bottom: none;
}

.infobox-stat-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #5c4a4a;
}

.stat-mini-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.infobox-stat-value {
  font-weight: bold;
  color: #3d2e2e;
  white-space: pre-line; /* 支持换行符 */
}

.infobox-details {
  padding: 8px 12px;
}

.infobox-detail-row {
  margin-bottom: 4px;
  line-height: 1.4;
}

.detail-label {
  font-weight: bold;
  color: #5c4a4a;
  margin-right: 6px;
}

.detail-value {
  color: #3d2e2e;
  white-space: pre-line; /* 支持换行符 */
}
</style>

<template>
  <div class="repair-calc">
    <div class="calc-header">
      <span class="calc-icon">🔮</span>
      <h3 class="calc-title">反转术式模拟器</h3>
      <select v-model="mode" class="mode-select">
        <option value="new">新版(反转)</option>
        <option value="old">旧版(顺向)</option>
      </select>
    </div>
    <div class="calc-body">
      <div class="slider-container">
        <div class="slider-header">
          <span>目标物品剩余耐久</span>
          <span class="slider-val">{{ currentDur }}%</span>
        </div>
        <input 
          type="range" 
          v-model.number="currentDur" 
          min="0" 
          max="99" 
          class="dur-slider"
        />
        <div class="slider-labels">
          <span>0% (破损)</span>
          <span>100% (完好)</span>
        </div>
      </div>

      <div class="results-container">
        <div class="result-row border-dash">
          <span class="result-label">修补成功率</span>
          <span class="result-val highlight" :style="{ color: successColor }">
            {{ successChance }}%
          </span>
        </div>
        <div class="result-row border-dash">
          <span class="result-label">工具消耗耐久</span>
          <span class="result-val">{{ toolCost }} 点</span>
        </div>

        <div v-if="mode === 'new'" class="details-section">
          <div class="detail-card success-card">
            <div class="card-title text-success">👍 修补成功奖励</div>
            <div>灵魂值: <span class="text-soul">+{{ rewardSoul }}</span></div>
            <div class="card-desc">(满溢出时转换为理智值与生命值)</div>
          </div>
          <div class="detail-card failure-card">
            <div class="card-title text-danger">👎 修补失败代价</div>
            <div>扣除灵魂: <span class="text-danger">-{{ penaltySoul }}</span></div>
            <div class="card-desc">灵魂不足扣双倍理智，理智不足扣生命</div>
          </div>
        </div>

        <div v-else class="details-section">
          <div class="detail-card success-card">
            <div class="card-title text-success">👍 修补成功奖励</div>
            <div class="card-desc">无属性改变，目标直接恢复 100% 耐久。</div>
          </div>
          <div class="detail-card failure-card">
            <div class="card-title text-danger">👎 修补失败代价</div>
            <div>扣除理智: <span class="text-danger">-30</span></div>
            <div class="card-desc">概率在身边召唤无掉落的恶梦生物</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentDur = ref(50)
const mode = ref('new')

// 计算成功率
const successChance = computed(() => {
  return mode.value === 'new' ? 100 - currentDur.value : currentDur.value
})

// 成功率的颜色标识
const successColor = computed(() => {
  if (mode.value === 'new') return '#4caf50'
  return successChance.value > 50 ? '#4caf50' : '#f44336'
})

// 工具耐久消耗
const toolCost = computed(() => {
  if (mode.value === 'new') {
    return Math.floor(Math.min(30, Math.abs(successChance.value - 30)) + 0.5)
  }
  return 10
})

// 成功灵魂值奖励
const rewardSoul = computed(() => {
  if (mode.value === 'new') {
    return Math.floor(Math.max(0, 70 - Math.abs(successChance.value - 30)) + 0.5)
  }
  return 0
})

// 失败灵魂值惩罚
const penaltySoul = computed(() => {
  if (mode.value === 'new') {
    return Math.floor(Math.max(0, 70 - Math.abs(successChance.value - 70)) + 0.5)
  }
  return 0
})
</script>

<style scoped>
.repair-calc {
  border: 1px solid var(--mem-border);
  border-radius: 8px;
  background: var(--mem-bg-soft);
  padding: 16px;
  box-shadow: 0 4px 12px var(--mem-table-shadow);
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  font-family: inherit;
  transition: all 0.3s ease;
}

.repair-calc:hover {
  border-color: var(--mem-heading-sub);
  box-shadow: 0 6px 16px rgba(92, 58, 33, 0.08);
}

.calc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  border-bottom: 2px solid var(--mem-border);
  padding-bottom: 8px;
}

.calc-icon {
  font-size: 18px;
}

.calc-title {
  margin: 0 !important;
  font-size: 15px !important;
  color: var(--mem-heading) !important;
  font-weight: bold !important;
  flex: 1;
  border: none !important;
  padding: 0 !important;
}

.mode-select {
  background: var(--mem-bg);
  border: 1px solid var(--mem-border);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  color: var(--mem-text-1);
  outline: none;
  cursor: pointer;
}

.calc-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.slider-container {
  display: flex;
  flex-direction: column;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 4px;
  color: var(--mem-text-2);
}

.slider-val {
  font-weight: bold;
  color: var(--mem-heading-sub);
}

.dur-slider {
  width: 100%;
  cursor: pointer;
  margin: 4px 0;
  accent-color: var(--vp-c-brand, #8e7cc3);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--mem-text-2);
  margin-top: 2px;
}

.results-container {
  background: var(--mem-bg);
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--mem-border);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 6px;
}

.border-dash {
  border-bottom: 1px dashed var(--mem-border);
}

.result-label {
  font-size: 12px;
  color: var(--mem-text-2);
}

.result-val {
  font-size: 14px;
  font-weight: bold;
  color: var(--mem-text-1);
}

.result-val.highlight {
  font-size: 18px;
}

.details-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 11px;
  margin-top: 4px;
}

.detail-card {
  padding: 8px;
  border-radius: 4px;
  line-height: 1.4;
}

.success-card {
  background: rgba(76, 175, 80, 0.06);
  border-left: 3px solid #4caf50;
}

.failure-card {
  background: rgba(244, 67, 54, 0.06);
  border-left: 3px solid #f44336;
}

.card-title {
  font-weight: bold;
  margin-bottom: 2px;
}

.text-success {
  color: #388e3c;
}

.text-danger {
  color: #d32f2f;
}

.text-soul {
  font-weight: bold;
  color: var(--vp-c-brand, #8e7cc3);
}

.card-desc {
  color: var(--mem-text-2);
  margin-top: 1px;
}
</style>

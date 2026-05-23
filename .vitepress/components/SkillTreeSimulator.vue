<template>
  <div class="skilltree-root">
    <!-- 外层按 600/460 比例在文档流中占位 -->
    <div class="simulator-scaler" ref="scalerRef" @click="resetSelection">
      <!-- 内部是严格固定的 600x460 画布 -->
      <div class="simulator-canvas" :style="{ transform: `scale(${scaleFactor})` }">
        
        <!-- 顶部装饰组：木牌与左右标签 -->
        <div class="top-decorations">
          <!-- 左侧标签 (纯装饰) -->
          <div class="top-tab tab-left">
            <img src="/skills/office_icon/tab_skills_unselected.png" class="tab-bg" draggable="false" />
          </div>
          
          <!-- 中间主标题 -->
          <div class="top-title-banner">
            <img src="/skills/office_icon/playerinfo_bg.png" class="title-bg" draggable="false" />
            <span class="title-text">技能树模拟器</span>
          </div>
          
          <!-- 右侧标签 (假装当前选中) -->
          <div class="top-tab tab-right">
            <img src="/skills/office_icon/tab_skills_unselected.png" class="tab-bg" draggable="false" />
          </div>
        </div>

        <!-- 游戏内卷轴作为最底层背景 -->
        <img src="/skills/office_icon/background.png" class="main-bg" draggable="false" />
        
        <div class="content-layer">
          <!-- 顶部中心：剩余洞察点数显示 -->
          <div class="insight-points" @click.stop>
            <div class="insight-icon-wrapper">
              <img src="/skills/office_icon/skill_icon_textbox.png" class="insight-bg" draggable="false" />
              <span class="insight-number">{{ availablePoints }}</span>
            </div>
            <span class="insight-text">剩余洞察</span>
          </div>

          <!-- 技能树背景与交互区 -->
          <div class="skilltree-container">
            <img src="/skills/mem_background/mem_background.png" class="bg-img" draggable="false" />
            
            <SkillTreeNode
              v-for="node in SKILL_NODES"
              :key="node.id"
              :node="node"
              :status="getNodeStatus(node.id)"
              :is-focused="selectedNodeId === node.id"
              @click="handleNodeClick"
              @dblclick="handleNodeDoubleClick"
              @rightclick="handleNodeRightClick"
            />
          </div>

          <!-- 底部信息面板 -->
          <div class="info-panel" @click.stop>
            <img src="/skills/office_icon/wilson_background_text.png" class="info-bg" draggable="false" />
            <div class="info-content">
              <h3 class="info-title">{{ displayTitle }}</h3>
              <p class="info-desc">{{ displayDesc }}</p>
            </div>
            <div class="info-buttons">
              <button 
                v-if="displayNodeId && displayNodeId === selectedNodeId"
                class="action-btn learn-btn" 
                :class="{ 'is-learned': isNodeUnlocked(displayNodeId) }"
                :disabled="!canLearnDisplayNode"
                @click="learnDisplayNode"
              >
                {{ isNodeUnlocked(displayNodeId) ? '已掌握技能' : '学习' }}
              </button>
              <button class="action-btn reset-btn" @click="resetSkills">
                重置洞察
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { SKILL_NODES } from '../data/skilltree.js';
import SkillTreeNode from './SkillTreeNode.vue';

// ---------------- 动态缩放逻辑 ----------------
const scalerRef = ref(null);
const scaleFactor = ref(1);
let resizeObserver = null;

onMounted(() => {
  resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      // 通过外部容器宽度比例，等比缩放整个 600px 画布
      scaleFactor.value = entry.contentRect.width / 600;
    }
  });
  if (scalerRef.value) {
    resizeObserver.observe(scalerRef.value);
  }
});

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect();
});
// ----------------------------------------------

const props = defineProps({
  maxPoints: {
    type: Number,
    default: 15
  }
});

const emit = defineEmits(['select']);

const unlockedSkills = ref(new Set());
const selectedNodeId = ref(null);

const displayNodeId = computed(() => {
  return selectedNodeId.value;
});

const canLearnDisplayNode = computed(() => {
  if (!displayNodeId.value) return false;
  return isSelectable(displayNodeId.value);
});

function learnDisplayNode() {
  if (canLearnDisplayNode.value) {
    unlockedSkills.value.add(displayNodeId.value);
  }
}

const availablePoints = computed(() => props.maxPoints - unlockedSkills.value.size);

// 判断某个 Lock 节点是否满足条件
function evaluateLock(id, mockRemovedId = null) {
  const has = (skillId) => {
    if (skillId === mockRemovedId) return false;
    return unlockedSkills.value.has(skillId);
  };

  switch(id) {
    case 'mem_skill_soul_lock_1': return has('mem_skill_soul_melt');
    case 'mem_skill_soul_lock_3': {
        let c = 0;
        if (has('mem_skill_soul_fire_3')) c++;
        if (has('mem_skill_soul_rest_2')) c++;
        if (has('mem_skill_soul_melt')) c++;
        return c >= 2;
    }
    case 'mem_skill_soul_lock_2': return has('mem_skill_soul_rest_2');
    case 'mem_skill_body_lock_spirit': {
        let c = 0;
        if (has('mem_skill_soul_rest_2')) c++;
        if (has('mem_skill_body_precision_1')) c++;
        if (has('mem_skill_body_preservative_1')) c++;
        if (has('mem_skill_body_numb_1')) c++;
        return c >= 2;
    }
    case 'mem_skill_body_lock_exp': return has('mem_skill_instinct_beastly') && has('mem_skill_instinct_ghostly');
    case 'mem_skill_body_lock_medicine': return has('mem_skill_instinct_hide_2');
    case 'mem_skill_body_lock_corpse': return has('mem_skill_instinct_ghostly') && (has('mem_skill_body_preservative_3') || has('mem_skill_instinct_beastly'));
    default: return false;
  }
}

function isNodeUnlocked(id, mockRemovedId = null) {
  const node = SKILL_NODES[id];
  if (node.isLock) return evaluateLock(id, mockRemovedId);
  if (id === mockRemovedId) return false;
  return unlockedSkills.value.has(id);
}

function isReachable(id, mockRemovedId = null) {
  const node = SKILL_NODES[id];
  if (node.root) return true;
  for (const [otherId, otherNode] of Object.entries(SKILL_NODES)) {
    if (otherNode.connects && otherNode.connects.includes(id)) {
      if (isNodeUnlocked(otherId, mockRemovedId)) return true;
    }
  }
  return false;
}

function isSelectable(id) {
  const node = SKILL_NODES[id];
  if (node.isLock) return false; // Lock节点不能主动点击加点
  if (isNodeUnlocked(id)) return false;
  if (availablePoints.value <= 0) return false;
  
  if (node.locks && node.locks.length > 0) {
    for (const lockId of node.locks) {
      if (!isNodeUnlocked(lockId)) return false;
    }
  }
  
  return isReachable(id);
}

function getNodeStatus(id) {
  const node = SKILL_NODES[id];
  const unlocked = isNodeUnlocked(id);
  
  if (node.isLock) {
    return unlocked ? 'lock_open' : 'lock_closed';
  }
  
  if (unlocked) return 'normal_unlocked';
  if (isSelectable(id)) return 'normal_selectable';
  return 'normal_unselected';
}

function handleNodeClick(id) {
  selectedNodeId.value = id;
  emit('select', id);
}

function handleNodeDoubleClick(id) {
  selectedNodeId.value = id;
  emit('select', id);
  if (canLearnDisplayNode.value) {
    learnDisplayNode();
  }
}

// 退点合法性检测：DFS 遍历连通性与前置锁
function canRefund(removedId) {
  if (!unlockedSkills.value.has(removedId)) return false;
  
  // 1. 检查所有的 Lock 依赖是否依然满足
  for (const id of Array.from(unlockedSkills.value)) {
    if (id === removedId) continue;
    const node = SKILL_NODES[id];
    if (node.locks) {
      for (const lockId of node.locks) {
        if (!evaluateLock(lockId, removedId)) return false;
      }
    }
  }
  
  // 2. 检查连通性 (DFS)
  const visited = new Set();
  const stack = [];
  
  for (const [id, node] of Object.entries(SKILL_NODES)) {
    if (node.root && isNodeUnlocked(id, removedId)) {
      if (id !== removedId) {
        visited.add(id);
        stack.push(id);
      }
    }
  }
  
  while(stack.length > 0) {
    const currId = stack.pop();
    const node = SKILL_NODES[currId];
    if (node.connects) {
      for (const childId of node.connects) {
        if (childId !== removedId && !visited.has(childId)) {
          if (isNodeUnlocked(childId, removedId)) {
            visited.add(childId);
            stack.push(childId);
          }
        }
      }
    }
  }
  
  for (const id of Array.from(unlockedSkills.value)) {
    if (id !== removedId && !visited.has(id)) return false;
  }
  
  return true;
}

function handleNodeRightClick(id) {
  if (canRefund(id)) {
    unlockedSkills.value.delete(id);
  }
}

function resetSelection() {
  selectedNodeId.value = null;
  emit('select', null);
}

function resetSkills() {
  unlockedSkills.value.clear();
  resetSelection();
}

const displayTitle = computed(() => {
  if (!displayNodeId.value) return '成为一名经验丰富的芒伊木（？）';
  return SKILL_NODES[displayNodeId.value].title;
});

const displayDesc = computed(() => {
  if (!displayNodeId.value) return '';
  return SKILL_NODES[displayNodeId.value].desc;
});

defineExpose({
  selectNode: (id) => {
    selectedNodeId.value = id;
    emit('select', id);
  }
});
</script>

<style scoped>
.simulator-scaler {
  position: relative;
  width: 100%;
  margin-bottom: 12%; 
  aspect-ratio: 600 / 460;
}

.simulator-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 460px;
  transform-origin: top left;
  font-family: sans-serif;
  color: #333;
}

.main-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 543px; /* 460 * 1.18 = 542.8px */
  object-fit: fill; 
  z-index: -1;
  pointer-events: none;
}

.content-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 460px;
}

.skilltree-container {
  /* 恢复纯正的 Lua 设计大小，中心点定位 */
  position: absolute;
  width: 521px;
  height: 320px;
  left: 50%;
  top: 50%;
  margin-left: 5px;
  margin-top: -28px;
  transform: translate(-50%, -50%);
  background: transparent;
}

.bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill; 
}

.insight-points {
  position: absolute;
  top:56px; 
  left: 270px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 5;
  transform: scale(0.8);  /* 👈 加上这行，0.8 表示缩小为原来的 80% */
  transform-origin: center center; /* 👈 (可选) 设置缩放中心点 */
}

.insight-icon-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.insight-bg {
  position: absolute;
  top: 0; /* 修复了原先无效的 top: 20; */
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.insight-number {
  position: relative;
  z-index: 2;
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #3a2512;
  font-family: serif;
  transform: translateY(4px);
}

.insight-text {
  font-size: 18px;
  font-weight: bold;
  color: #3a2512;
  transform: translateY(5px);
}

.info-panel {
  position: absolute;
  width: 528px;
  height: 143px;
  left: 50%;
  top: 62%;
  margin-left: 0;
  margin-top: 158px;
  transform: translate(-50%, -65%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill; /* 允许非等比拉伸以满足X轴变长需求 */
}

.info-content {
  position: relative;
  z-index: 1;
  width: 501px;
  height: auto;
  padding: 5px 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-5px);
}

.info-title {
  margin: 0;
  padding: 0;
  font-size: 11.5px;
  color: #5c3a21;
  font-weight: bold;
  line-height: 1.2;
}

.info-desc {
  margin: 2px 0 0 0;
  padding: 0;
  font-size: 10px;
  color: #3a2512;
  white-space: pre-wrap;
  line-height: 1.3;
}

.info-buttons {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 60%);
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  z-index: 2;
}

.action-btn {
  background-image: url('/skills/office_icon2/button_carny_long_normal.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  width: 140px;
  height: 38px;
  color: #332414;
  font-weight: bold;
  font-family: inherit;
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover:not(:disabled) {
  background-image: url('/skills/office_icon2/button_carny_long_hover.png');
}

.action-btn:active:not(:disabled) {
  background-image: url('/skills/office_icon2/button_carny_long_down.png');
  transform: translateY(2px);
}

.action-btn:disabled {
  background-image: url('/skills/office_icon2/button_carny_long_disabled.png');
  color: #7a6652;
  cursor: not-allowed;
}

.action-btn.is-learned:disabled {
  background-image: url('/skills/office_icon/skilltree_backgroundart.png');
  color: #332414;
}

/* ================= 顶部装饰组与外层 ================= */
.skilltree-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 15%; /* 保持外部整体占据空间，如果想完全绝对，也可以保留 */
}

.top-decorations {
  position: absolute;
  top: -69px;
  left: 0;
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: -2;
  pointer-events: none;
  transform: translateY(-34px);
}

.top-tab {
  position: relative;
  width: 168px;
  height: 113px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 -24px;
  z-index: 1; 
}

.tab-left {
  transform: translate(67px, 11px);
  z-index: 3; 
}

.tab-right {
  transform: translate(-67px, 11px);
  z-index: 3; 
}

.tab-left .tab-bg {
  transform: scaleX(-1);
}

.tab-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tab-text {
  position: relative;
  z-index: 2;
  font-size: 19px;
  color: #5c3a21;
  font-weight: bold;
  padding-bottom: 6px;
}

.top-title-banner {
  position: relative;
  width: 330px; 
  height: 134px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; 
}

.title-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.title-text {
  position: relative;
  z-index: 2;
  font-size: 20px;
  color: #c04040;
  font-weight: bold;
  letter-spacing: 3px;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.6);
  padding-top: 9px;
  transform: translateY(8px);
}
</style>

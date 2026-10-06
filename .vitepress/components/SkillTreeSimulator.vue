<template>
  <div class="skilltree-root">
    <div class="skill-tree-stage">
      <slot name="tree-header" />
      <div class="skill-tree-board">
        <div class="tree-caption"><span>技能树</span><span>剩余 <strong>{{ availablePoints }}</strong> 洞察</span></div>
        <div class="simulator-scaler" ref="scalerRef" :style="{ height: `${scaleFactor * 320}px` }" @click="resetSelection">
          <div class="simulator-canvas" :style="{ transform: `scale(${scaleFactor})` }">
            <div class="content-layer">
              <div class="skilltree-container">
                <img :src="withBase('/skills/mem_background/mem_background.webp')" class="bg-img" draggable="false" alt="" />
                <SkillTreeNode v-for="node in SKILL_NODES" :key="node.id" :node="node"
                  :status="getNodeStatus(node.id)" :is-focused="selectedNodeId === node.id"
                  @click="handleNodeClick" @dblclick="handleNodeDoubleClick" @rightclick="handleNodeRightClick" />
              </div>
            </div>
          </div>
        </div>
        <p class="tree-help">选中节点后，在摘要中学习或退点。</p>
      </div>
    </div>
    <slot name="summary" :node="SKILL_NODES[selectedNodeId]" :points="availablePoints"
      :learned="unlockedSkills.has(selectedNodeId)" :learned-ids="unlockedSkills"
      :can-learn="canLearnDisplayNode" :can-refund="canRefundSkill(selectedNodeId, unlockedSkills)"
      :learn="learnDisplayNode" :refund="() => handleNodeRightClick(selectedNodeId)" :reset="resetSkills" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'
import { SKILL_NODES } from '../data/skilltree.js'
import { resolveSkillId } from '../data/skill-links.js'
import { evaluateSkillLock, meetsSkillRequirements, canRefundSkill } from '../data/skill-presentation.js'
import SkillTreeNode from './SkillTreeNode.vue'

const props = defineProps({ maxPoints: { type: Number, default: 15 } })
const emit = defineEmits(['select'])
const scalerRef = ref(null)
const scaleFactor = ref(1)
let resizeObserver
onMounted(() => {
  resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) scaleFactor.value = entry.contentRect.width / 521
  })
  if (scalerRef.value) resizeObserver.observe(scalerRef.value)
})
onUnmounted(() => resizeObserver?.disconnect())

const unlockedSkills = ref(new Set())
const selectedNodeId = ref(null)
const availablePoints = computed(() => props.maxPoints - unlockedSkills.value.size)
const isSelectable = id => {
  const node = SKILL_NODES[id]
  return Boolean(node && !node.isLock && !unlockedSkills.value.has(id)
    && availablePoints.value > 0 && meetsSkillRequirements(id, unlockedSkills.value))
}
const canLearnDisplayNode = computed(() => isSelectable(selectedNodeId.value))
function learnDisplayNode() {
  if (canLearnDisplayNode.value) unlockedSkills.value.add(selectedNodeId.value)
}
function getNodeStatus(id) {
  if (SKILL_NODES[id].isLock) return evaluateSkillLock(id, skill => unlockedSkills.value.has(skill)) ? 'lock_open' : 'lock_closed'
  if (unlockedSkills.value.has(id)) return 'normal_unlocked'
  return isSelectable(id) ? 'normal_selectable' : 'normal_unselected'
}
function handleNodeClick(id) {
  selectedNodeId.value = id
  emit('select', id)
}
function handleNodeDoubleClick(id) {
  handleNodeClick(id)
  learnDisplayNode()
}
function handleNodeRightClick(id) {
  if (canRefundSkill(id, unlockedSkills.value)) unlockedSkills.value.delete(id)
}
function resetSelection() {
  selectedNodeId.value = null
  emit('select', null)
}
function resetSkills() {
  unlockedSkills.value.clear()
  resetSelection()
}
defineExpose({
  resetSelection,
  selectNode(id) {
    const skillId = resolveSkillId(id)
    if (!skillId) return false
    handleNodeClick(skillId)
    return true
  },
})
</script>

<style scoped>
.skilltree-root { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: start; gap: 32px; width: 100%; }
.skill-tree-stage { width: 100%; min-width: 0; border-top: 2px solid var(--ink-stroke); padding-top: 18px; }
.skill-tree-board { width: 100%; min-width: 0; padding: 18px; border: 1px solid #6b5c47; border-radius: 5px; background: radial-gradient(ellipse at 45% 0%, #514536, #322c25 85%); box-shadow: inset 0 0 0 1px #d4b98914, 0 6px 16px #241d1414; }
.simulator-scaler { position: relative; width: 100%; margin-top: 16px; }
.simulator-canvas { position: absolute; top: 0; left: 0; width: 521px; height: 320px; transform-origin: top left; }
.content-layer, .skilltree-container { position: absolute; top: 0; left: 0; width: 521px; height: 320px; }
.bg-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; filter: grayscale(1) brightness(.84) sepia(.65) saturate(.75); }
.tree-caption { display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid #d4b98933; color: #e0d1b6; font-size: 14px; }
.tree-caption > span:first-child { font-weight: 600; letter-spacing: .08em; }
.tree-caption > span:last-child { padding: 2px 8px; border: 1px solid #9e876a66; border-radius: 3px; background: #201a1440; font-size: 12px; }
.tree-caption strong { color: #f0cc85; }
.vp-doc .tree-help { margin: 14px 0 0; color: #cbbc9f; font-size: 12px; line-height: 1.7; }
@container wiki-content (max-width: 760px) {
  .skilltree-root { grid-template-columns: 1fr; gap: 24px; }
  .skill-tree-board { padding: 12px; }
}
</style>

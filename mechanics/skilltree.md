
这里是《芒伊木》模组的专属技能树深度模拟器。你可以在这里自由分配技能点，预览各种加点路线的机制与效果。

> [!NOTE]操作介绍<DSTIcon icon="original" />
> - **加点**：**双击** 高亮的可用技能节点
>   - 或选中技能后点击 <U>学习</U> 
> - **退点**：**右键** 点击已解锁的技能节点（注意：如果有其他已解锁的技能依赖此节点，将无法退回）
>   - 或点击 <U>重置洞察</U> 来清空所有加点

<script setup>
import SkillTreeSimulator from '../.vitepress/components/SkillTreeSimulator.vue'
</script>

<ClientOnly>
  <SkillTreeSimulator :maxPoints="15" />
</ClientOnly>


<MediaCard 
  src="/box_3.png" 
  caption="灵魂裂痕和灵魂震荡叠加导致的三维上限损失" 
  width="320px"
/>
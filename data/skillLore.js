export const SKILL_LORES = {
    MEM_SKILL_SOUL_HAND: {
    // 单图模式：直接写字符串
    caption: "其他技能演示",
    text: `在这里写其他的描述...`
  },
  mem_skill_soul_light: {
    // 多图模式：使用数组
    media: [
      { src: "/box_sxlh.png", caption: "发着光的鬼火和魂魄刻印" }
    ],
    // 多行文本：必须使用反引号 `包裹
    text: `<ul>**这也会影响**：
    <li>跟随你的[友善的芒伊月] / [友善的荒尹沐]发射的[鬼火]</li>
    <li>跟随你的[友善的荒尹沐]在[分头行动(友善的荒尹沐)]下发射就绪时的鬼火特效</li>
    <li>芒伊木处于[分头行动]/[意识转移]时身体和头部产生的鬼火特效</li>
    <li>[电锯惊魂]开启[刻印形态]时的鬼火特效。</li>
    </ul>`
  },
  // 增加第二个技能只需要在这往下写
  mem_skill_another_one: {
    // 单图模式：直接写字符串
    media: "/box_3.png",
    caption: "其他技能演示",
    text: `在这里写其他的描述...`
  }
};

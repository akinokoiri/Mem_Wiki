export const SKILL_LORES = {
  // 第一个技能
  mem_skill_soul_light: {
    // 多图模式：使用数组
    media: [
      { src: "/box_sxlh.png", caption: "发着光的鬼火和魂魄刻印" }
    ],
    // 多行文本：必须使用反引号 `包裹
    text: `<ul>这也会影响：
    <li>[友善的芒伊月] / [友善的荒尹沐]发射的[鬼火]</li>
    <li>在[分头行动]发射的[鬼火]</li>也是一个自动解析**[生命值]**的测试。
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

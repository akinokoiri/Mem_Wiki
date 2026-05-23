const fs = require('fs');

const content = fs.readFileSync('.vitepress/theme/components/icons.js', 'utf-8');

// I will extract the blocks using regex.

const nounMapMatch = content.match(/export const nounMap = \{[\s\S]*?\n\};\n/);
const iconMapMatch = content.match(/export const iconMap = \{[\s\S]*?\n\};\n/);
const colorMapMatch = content.match(/export const colorMap = \{[\s\S]*?\n\};\n/);

const aliasMap = `export const aliasMap = {
  '灵魂值': '灵魂值系统',
  '月亮能量': '月亮位面寄生',
  '芒手': '芒芒的肢体',
  '芒腿': '芒芒的肢体',
  '芒头': '芒芒的肢体',
  '芒身': '芒芒的肢体',
  '芒芒科技': '狐狸的凶宅',
  '芒芒的墓碑': '芒芒的坟墓',
  '启迪陷阱空投仓': '启迪陷阱阵列',
  '启迪陷阱空投': '启迪陷阱阵列',
  'W.A.R.B.I.S.盔甲·启迪': '启迪强化',
  '月光龙鳞甲·启迪': '启迪强化',
};`;

const officialTerms = `export const officialTerms = [
  'health', 'sanity', 'hunger', 'spoil'
];`;

const specialLinks = `export const specialLinks = {
  '灵魂实体专精': '/mechanics/skilltree.html#mem_skill_soul_fire_1',
  '彼世的光芒': '/mechanics/skilltree.html#mem_skill_moon_1',
  '死体精通': '/mechanics/skilltree.html#mem_skill_body_surgery_1',
  '潜伏恐惧': '/mechanics/skilltree.html#mem_skill_instinct_hide_1',
};`;

const linkMap = `export const linkMap = {};`;

const newContent = [
  nounMapMatch[0].trim(),
  "",
  iconMapMatch[0].trim(),
  "",
  "// HSL 颜色配置：h (色相), s (饱和度%), l (亮度%)",
  colorMapMatch[0].trim(),
  "",
  aliasMap,
  "",
  officialTerms,
  "",
  specialLinks,
  "",
  linkMap
].join('\n');

fs.writeFileSync('.vitepress/theme/components/icons.js', newContent);
console.log('Fixed icons.js');

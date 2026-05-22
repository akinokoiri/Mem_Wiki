const fs = require('fs');

const filePath = 'G:/DSmod/Mem-Wiki/.vitepress/data/skilltree.js';
let content = fs.readFileSync(filePath, 'utf-8');

// Regex to match lock nodes and update them
// Wait, a simpler way is to just do string replacements for the specific lines.
const lockIds = [
  'mem_skill_soul_lock_1',
  'mem_skill_soul_lock_3',
  'mem_skill_soul_lock_2',
  'mem_skill_body_lock_spirit',
  'mem_skill_body_lock_exp',
  'mem_skill_body_lock_medicine',
  'mem_skill_body_lock_corpse'
];

// Instead of parsing, we can just replace the specific titles and move them to desc.
// Actually, it's safer to use eval or Function to parse the object, modify it, and write it back.
const dataCode = content.replace('export const SKILL_NODES = ', 'return ');
const getObj = new Function(dataCode);
const SKILL_NODES = getObj();

for (const key in SKILL_NODES) {
  const node = SKILL_NODES[key];
  if (node.isLock) {
    if (node.title.startsWith('前置要求')) {
      const oldTitle = node.title;
      node.title = '路径锁定';
      node.desc = oldTitle + (node.desc ? '\\n' + node.desc : '');
    }
  }
}

const newContent = 'export const SKILL_NODES = ' + JSON.stringify(SKILL_NODES, null, 2) + ';\n';
fs.writeFileSync(filePath, newContent, 'utf-8');
console.log("Updated skilltree.js successfully.");

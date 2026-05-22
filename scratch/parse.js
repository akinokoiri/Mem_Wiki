const fs = require('fs');

const luaStr = fs.readFileSync('G:/DSmod/Mem-Wiki/exp_PNG_or_Code/strings.lua', 'utf-8');
const luaSkills = fs.readFileSync('G:/DSmod/Mem-Wiki/exp_PNG_or_Code/skilltree_mem.lua', 'utf-8');

const strings = {};
const stringRegex = /([A-Z0-9_]+)\s*=\s*\{\s*TITLE\s*=\s*"([^"]+)",\s*DESC\s*=\s*"([^"]+)"/g;
let match;
while ((match = stringRegex.exec(luaStr)) !== null) {
    strings[match[1]] = { title: match[2].replace(/\\n/g, '\n'), desc: match[3].replace(/\\n/g, '\n') };
}
const lockRegex = /([A-Z0-9_]+)\s*=\s*\{\s*LOCK_REQ\s*=\s*"([^"]+)",\s*LOCK_DESC\s*=\s*"([^"]+)"/g;
while ((match = lockRegex.exec(luaStr)) !== null) {
    strings[match[1]] = { title: match[2].replace(/\\n/g, '\n'), desc: match[3].replace(/\\n/g, '\n') };
}

const nodes = {};
const blocks = luaSkills.split(/\['(mem_[^']+)'\]\s*=\s*\{/);

for (let i = 1; i < blocks.length; i += 2) {
    const id = blocks[i];
    const body = blocks[i+1];
    
    const posMatch = /pos\s*=\s*Pos\(([^,]+),\s*([^)]+)\)/.exec(body);
    const x = posMatch ? parseInt(posMatch[1].trim()) : 0;
    const y = posMatch ? parseInt(posMatch[2].trim()) : 0;
    
    const titleMatch = /title\s*=\s*LANG\.([A-Z0-9_]+)\.TITLE/.exec(body);
    const lockDescMatch = /desc\s*=\s*FormatLockDesc\([\s\S]*?LANG\.([A-Z0-9_]+)\.LOCK_REQ/.exec(body);
    
    let stringKey = "";
    if (titleMatch) stringKey = titleMatch[1];
    else if (lockDescMatch) stringKey = lockDescMatch[1];
    
    const connectsMatch = /connects\s*=\s*\{([^}]+)\}/.exec(body);
    let connects = [];
    if (connectsMatch) {
        connects = connectsMatch[1].split(',').map(s => s.match(/["']([^"']+)["']/)).filter(m => m).map(m => m[1]);
    }
    
    const locksMatch = /locks\s*=\s*\{([^}]+)\}/.exec(body);
    let locks = [];
    if (locksMatch) {
        locks = locksMatch[1].split(',').map(s => s.match(/["']([^"']+)["']/)).filter(m => m).map(m => m[1]);
    }
    
    const root = /root\s*=\s*true/.test(body);
    const isLock = /"lock"/.test(body) || /'lock'/.test(body);
    
    nodes[id] = {
        id,
        x, y,
        connects, locks,
        root,
        isLock,
        stringKey,
        title: strings[stringKey]?.title || "未定义",
        desc: strings[stringKey]?.desc || "未定义",
        icon: id
    };
}

if (!fs.existsSync('.vitepress/data')) {
    fs.mkdirSync('.vitepress/data', { recursive: true });
}

fs.writeFileSync('.vitepress/data/skilltree.js', 'export const SKILL_NODES = ' + JSON.stringify(nodes, null, 2) + ';\n');
console.log("Parsed " + Object.keys(nodes).length + " nodes.");

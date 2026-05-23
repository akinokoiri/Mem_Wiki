const fs = require('fs');
const path = require('path');

const iconsPath = path.join(__dirname, '../.vitepress/theme/components/icons.js');
let iconsContent = fs.readFileSync(iconsPath, 'utf-8');

// Extract nounMap keys
const nounMapMatch = iconsContent.match(/export const nounMap = \{([\s\S]*?)\};/);
const nounMap = {};
if (nounMapMatch) {
  const lines = nounMapMatch[1].split('\n');
  lines.forEach(line => {
    const m = line.match(/'([^']+)':/);
    if (m) nounMap[m[1]] = true;
  });
}

// Extract officialTerms
const officialMatch = iconsContent.match(/export const officialTerms = \[([\s\S]*?)\];/);
const officialTerms = new Set();
if (officialMatch) {
  const terms = officialMatch[1].match(/'([^']+)'/g) || [];
  terms.forEach(t => officialTerms.add(t.replace(/'/g, '')));
}

// Extract aliasMap
const aliasMatch = iconsContent.match(/export const aliasMap = \{([\s\S]*?)\};/);
const aliasMap = {};
if (aliasMatch) {
  const lines = aliasMatch[1].split('\n');
  lines.forEach(line => {
    const m = line.match(/'([^']+)':\s*'([^']+)'/);
    if (m) aliasMap[m[1]] = m[2];
  });
}

// Extract specialLinks
const specialLinksMatch = iconsContent.match(/export const specialLinks = \{([\s\S]*?)\};/);
const specialLinks = {};
if (specialLinksMatch) {
  const lines = specialLinksMatch[1].split('\n');
  lines.forEach(line => {
    const m = line.match(/'([^']+)':\s*'([^']+)'/);
    if (m) specialLinks[m[1]] = m[2];
  });
}

const validTerms = Object.keys(nounMap).filter(t => !officialTerms.has(nounMap[t]) && !aliasMap[t] && !specialLinks[t]);

const mechanicsDir = path.join(__dirname, '../mechanics');
const files = fs.readdirSync(mechanicsDir).filter(f => f.endsWith('.md'));

let linkMap = {};
const alreadyPlaced = new Set();

// PASS 1: Find existing anchors globally
files.forEach(file => {
  const filePath = path.join(mechanicsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  validTerms.forEach(term => {
    if (content.includes(`[#${term}]`)) {
      alreadyPlaced.add(term);
      linkMap[term] = `/mechanics/${file.replace('.md', '.html')}#def-${term}`;
    }
  });
});

// PASS 2: For terms NOT already placed, identify their globally best location
const termsToPlace = validTerms.filter(t => !alreadyPlaced.has(t));
const bestLocations = {}; // term -> { file, priority, matchRegexStr }

files.forEach(file => {
  const filePath = path.join(mechanicsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  termsToPlace.forEach(term => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
    const p1RegexStr = `(###\\s+)(?:\\[#[^\\]]+\\])?(${escapedTerm})(?=[\\s<]|$)`;
    const p2RegexStr = `(\\**\\[)(?:\\[#[^\\]]+\\])?(${escapedTerm})(\\]\\**)`;
    const p3RegexStr = `(\\*\\*)(?:\\[#[^\\]]+\\])?(${escapedTerm})(\\*\\*)`;

    let priority = 4;
    let matchRegexStr = null;

    if (new RegExp(p1RegexStr, 'm').test(content)) { priority = 1; matchRegexStr = `(###\\s+)(${escapedTerm})(?=[\\s<]|$)`; }
    else if (new RegExp(p2RegexStr, 'm').test(content)) { priority = 2; matchRegexStr = `(\\**\\[)(${escapedTerm})(\\]\\**)`; }
    else if (new RegExp(p3RegexStr, 'm').test(content)) { priority = 3; matchRegexStr = `(\\*\\*)(${escapedTerm})(\\*\\*)`; }

    if (priority < 4) {
      if (!bestLocations[term] || priority < bestLocations[term].priority) {
        bestLocations[term] = { file, priority, matchRegexStr };
      }
    }
  });
});

// PASS 3: Inject missing anchors at their best locations
Object.entries(bestLocations).forEach(([term, loc]) => {
  const filePath = path.join(mechanicsDir, loc.file);
  let content = fs.readFileSync(filePath, 'utf-8');

  const regex = new RegExp(loc.matchRegexStr, 'm');
  if (loc.priority === 1) {
    content = content.replace(regex, `$1[#${term}]$2`);
  } else {
    content = content.replace(regex, `[#${term}]$1$2$3`);
  }
  fs.writeFileSync(filePath, content);
  
  linkMap[term] = `/mechanics/${loc.file.replace('.md', '.html')}#def-${term}`;
});

// Update icons.js linkMap
let newLinkMapStr = "export const linkMap = {\n";
Object.entries(linkMap).forEach(([k, v]) => {
  newLinkMapStr += `  '${k}': '${v}',\n`;
});

// Resolve aliases
Object.entries(aliasMap).forEach(([alias, target]) => {
  if (linkMap[target]) {
    newLinkMapStr += `  '${alias}': '${linkMap[target]}',\n`;
  } else if (specialLinks[target]) {
    newLinkMapStr += `  '${alias}': '${specialLinks[target]}',\n`;
  } else {
    console.warn(`[Warning] Target for alias '${alias}' ('${target}') was not found in generated linkMap.`);
  }
});

// Inject specialLinks
Object.entries(specialLinks).forEach(([term, url]) => {
  newLinkMapStr += `  '${term}': '${url}',\n`;
});

newLinkMapStr += "};";

iconsContent = iconsContent.replace(/export const linkMap = \{[\s\S]*?\};/, newLinkMapStr);
fs.writeFileSync(iconsPath, iconsContent);

console.log('Auto-anchoring complete (Two-Pass Global Unique)! LinkMap updated.');

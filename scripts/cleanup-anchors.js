const fs = require('fs');
const path = require('path');

const mechanicsDir = path.join(__dirname, '../mechanics');
const files = fs.readdirSync(mechanicsDir).filter(f => f.endsWith('.md'));

// Find all existing anchors
const allOccurrences = {}; // term -> [ { file, lineIndex, isHeading, fullMatch } ]

const fileLines = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(mechanicsDir, file), 'utf-8');
  const lines = content.split('\n');
  fileLines[file] = lines;
  
  lines.forEach((line, index) => {
    // Match all [#XXX]
    const regex = /\[#([^\]]+)\]/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
      const term = match[1];
      if (!allOccurrences[term]) allOccurrences[term] = [];
      
      allOccurrences[term].push({
        file,
        lineIndex: index,
        isHeading: line.startsWith('### '),
        fullMatch: match[0],
        lineStr: line
      });
    }
  });
});

// Remove duplicates
let removedCount = 0;

Object.entries(allOccurrences).forEach(([term, occs]) => {
  if (occs.length > 1) {
    // Sort occurrences: headings first, then by file/line
    occs.sort((a, b) => {
      if (a.isHeading && !b.isHeading) return -1;
      if (!a.isHeading && b.isHeading) return 1;
      return 0; // Keep the first found otherwise
    });
    
    // Keep the first (best), remove the rest
    for (let i = 1; i < occs.length; i++) {
      const target = occs[i];
      const lines = fileLines[target.file];
      
      // Remove the [#term] from the line
      // Use replace with a string to only replace one instance in that line just in case
      lines[target.lineIndex] = lines[target.lineIndex].replace(target.fullMatch, '');
      removedCount++;
      console.log(`Removed duplicate [#${term}] from ${target.file} line ${target.lineIndex + 1}`);
    }
  }
});

// Write back files
files.forEach(file => {
  fs.writeFileSync(path.join(mechanicsDir, file), fileLines[file].join('\n'));
});

console.log(`Cleanup complete! Removed ${removedCount} duplicate anchors.`);

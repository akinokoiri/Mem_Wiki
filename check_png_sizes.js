const fs = require('fs');

function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.toString('ascii', 1, 4) !== 'PNG') {
    return 'Not a PNG file';
  }
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return `${width}x${height}`;
}

const dir = 'G:/DSmod/Mem-Wiki/public/skills/office_icon';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const dim = getPngDimensions(`${dir}/${file}`);
  console.log(`${file}: ${dim}`);
}

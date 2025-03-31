const fs = require('fs');
const path = require('path');

const requiredFiles = [
  path.join(__dirname, '../dist/server.js'),
  path.join(__dirname, '../dist/client/index.html')
];

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
});

console.log('✅ Build verification passed');

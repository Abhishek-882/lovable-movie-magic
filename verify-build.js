const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'dist/server.js',
  'dist/client/index.html'
];

let missingFiles = [];

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) {
    missingFiles.push(file);
    console.error(`❌ Missing: ${fullPath}`);
  }
});

if (missingFiles.length > 0) {
  console.error('\n🚨 Build failed: Missing required files');
  console.error('Run these commands to debug:');
  console.error('1. rm -rf dist');
  console.error('2. npm run build');
  process.exit(1);
}

console.log('✅ Build verification passed - all files present');

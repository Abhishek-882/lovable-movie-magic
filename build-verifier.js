const fs = require('fs');
const path = require('path');

const requiredFiles = [
  path.join(__dirname, 'dist', 'server.js'),
  path.join(__dirname, 'dist', 'client', 'index.html')
];

console.log('🔍 Verifying build files...');

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing: ${file}`);
    allFilesExist = false;
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

if (!allFilesExist) {
  console.error('\n🚨 Build verification failed');
  console.error('Run these commands to debug:');
  console.error('1. rm -rf dist');
  console.error('2. npm run build');
  process.exit(1);
}

console.log('\n✅ All files present - Build verified');

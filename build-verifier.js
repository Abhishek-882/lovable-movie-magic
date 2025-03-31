const fs = require('fs');
const path = require('path');

const requiredFiles = [
  path.join(__dirname, 'dist', 'server.js'),
  path.join(__dirname, 'dist', 'client', 'index.html')
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing required file: ${file}`);
    allFilesExist = false;
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

if (!allFilesExist) {
  console.error('\n🚨 Build verification failed - missing required files');
  console.error('Try these troubleshooting steps:');
  console.error('1. rm -rf dist');
  console.error('2. npm run build');
  console.error('3. Check for TypeScript errors');
  process.exit(1);
}

console.log('\n✅ Build verification passed - all files present');
try {
  require('./dist/server.js');
  console.log('✅ Server.js loads successfully');
} catch (e) {
  console.error('❌ Server.js failed to load:', e);
  process.exit(1);
}

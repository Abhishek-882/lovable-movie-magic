const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_DIR = path.join(__dirname, 'dist');
const SERVER_JS = path.join(DIST_DIR, 'server.js');

// Create dist directory if missing
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
  console.log('Created dist directory');
}

// Compile TypeScript if server.js is missing
if (!fs.existsSync(SERVER_JS)) {
  console.log('🛠️  Compiling TypeScript...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Compilation failed');
    process.exit(1);
  }
}

// Final verification
if (!fs.existsSync(SERVER_JS)) {
  console.error(`❌ Critical: ${SERVER_JS} still missing after compilation`);
  process.exit(1);
}

console.log(`✅ Server ready: ${SERVER_JS}`);

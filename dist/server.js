const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_PATH = path.join(__dirname, 'dist');
const SERVER_JS = path.join(DIST_PATH, 'server.js');

// Create dist directory if missing
if (!fs.existsSync(DIST_PATH)) {
  fs.mkdirSync(DIST_PATH, { recursive: true });
}

// Compile TypeScript if server.js doesn't exist
if (!fs.existsSync(SERVER_JS)) {
  console.log('🔨 Compiling server.ts...');
  try {
    execSync('tsc --project tsconfig.json', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Compilation failed');
    process.exit(1);
  }
}

// Final verification
if (!fs.existsSync(SERVER_JS)) {
  console.error(`💥 Critical Error: ${SERVER_JS} not found after compilation`);
  process.exit(1);
}

console.log(`✅ Verified: ${SERVER_JS} exists`);

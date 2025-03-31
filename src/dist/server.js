// /opt/render/project/src/create-server.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TARGET_PATH = '/opt/render/project/src/dist/server.js';
const DIST_DIR = path.dirname(TARGET_PATH);

// 1. Ensure directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
  console.log(`Created directory: ${DIST_DIR}`);
}

// 2. Compile server.ts if needed
if (!fs.existsSync(TARGET_PATH)) {
  console.log('Compiling server.ts...');
  try {
    execSync('tsc --project tsconfig.render.json', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Compilation failed');
    process.exit(1);
  }
}

// 3. Final verification
if (!fs.existsSync(TARGET_PATH)) {
  console.error(`❌ Failed to create: ${TARGET_PATH}`);
  process.exit(1);
}

console.log(`✅ Server ready at: ${TARGET_PATH}`);

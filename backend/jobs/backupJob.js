// backend/jobs/backupJob.js
const cron = require('node-cron');
const backupManager = require('../utils/backupManager');

// Daily backup at 2 AM
cron.schedule('0 2 * * *', () => {
  console.log('Running daily backup...');
  backupManager.createBackup();
});

// Weekly backup on Sundays
cron.schedule('0 2 * * 0', () => {
  console.log('Running weekly backup...');
  // Additional backup logic
});

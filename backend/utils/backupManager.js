// backend/utils/backupManager.js
const fs = require('fs');
const path = require('path');
const { Booking, User, Profile } = require('../models');

module.exports = {
  async createBackup() {
    try {
      const backupData = {
        users: await User.findAll(),
        profiles: await Profile.findAll(),
        bookings: await Booking.findAll()
      };

      const backupPath = path.join(__dirname, '../../backups');
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath);
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      fs.writeFileSync(
        path.join(backupPath, `backup-${timestamp}.json`),
        JSON.stringify(backupData, null, 2)
      );

      console.log(`Backup created at ${timestamp}`);
    } catch (error) {
      console.error('Backup failed:', error);
    }
  }
};

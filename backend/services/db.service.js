const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.production);

sequelize.authenticate()
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch(err => console.error('❌ Connection failed:', err));

module.exports = sequelize;

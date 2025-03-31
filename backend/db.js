const { Sequelize } = require('sequelize');
const config = require('./config/config');

const sequelize = new Sequelize(config.production);

// Test connection
sequelize.authenticate()
  .then(() => console.log('PostgreSQL connection established'))
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

module.exports = {
  sequelize,
  Sequelize
};

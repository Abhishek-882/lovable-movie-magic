import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import { Profile } from './models/profile.model';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  dialect: 'postgres',
  models: [User, Profile],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database connected and synchronized');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

export { sequelize };

import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/bookings',
  {
    dialect: 'postgres',
    logging: false
  }
);

// User Model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

// Booking Model
const Booking = sequelize.define('Booking', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  details: {
    type: DataTypes.TEXT
  }
});

// Relationships
User.hasMany(Booking);
Booking.belongsTo(User);

// Middleware
app.use(express.json());

// Routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/bookings/:userId', async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.params.userId },
      include: [User]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`
    ===========================
    🚀 Server running on port ${PORT}
    📦 Database: ${sequelize.config.database}
    ===========================
    `);
  });
}).catch(error => {
  console.error('Database connection failed:', error);
  process.exit(1);
});

import express from 'express';
import { Sequelize } from 'sequelize';

// Database setup
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/dbname');

// Express app
const app = express();
app.use(express.json());

// User model
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true }
});

// Booking model
const Booking = sequelize.define('Booking', {
  date: { type: DataTypes.DATE },
  userId: { type: DataTypes.INTEGER }
});

// Routes
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/bookings/:userId', async (req, res) => {
  const bookings = await Booking.findAll({ 
    where: { userId: req.params.userId }
  });
  res.json(bookings);
});

// Start server
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
});

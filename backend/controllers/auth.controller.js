const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { sequelize } = require('../db');

module.exports = {
  async register(req, res) {
    const transaction = await sequelize.transaction();
    
    try {
      const { email, password, name } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        await transaction.rollback();
        return res.status(409).json({ error: 'Email already exists' });
      }

      const user = await User.create({
        email,
        password,
        name
      }, { transaction });

      // Create associated profile
      await user.createProfile({}, { transaction });

      await transaction.commit();
      
      const token = generateToken(user);
      return res.status(201).json({ user: sanitizeUser(user), token });

    } catch (error) {
      await transaction.rollback();
      console.error('Registration error:', error);
      return res.status(500).json({ error: 'Registration failed' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ 
        where: { email },
        include: ['Profile'] 
      });

      if (!user || !(await user.verifyPassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user);
      return res.json({ user: sanitizeUser(user), token });

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Login failed' });
    }
  }
};

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function sanitizeUser(user) {
  const userJson = user.toJSON();
  delete userJson.password;
  return userJson;
}

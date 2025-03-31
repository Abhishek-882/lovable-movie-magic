import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { Profile } from '../models/profile.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const user = await User.create({ name, email, password });
      await Profile.create({ userId: user.id });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.status(201).json({ 
        token,
        user: user.toJSON()
      });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ 
        where: { email },
        include: [Profile]
      });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.json({
        token,
        user: user.toJSON()
      });
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
  }

  static async getCurrentUser(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] },
        include: [Profile]
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  }

  static async sendVerificationEmail(req: Request, res: Response) {
    try {
      // In production: Implement actual email sending
      // For demo, generate and return a code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      res.json({ code, message: 'Verification code generated' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send verification' });
    }
  }

  static async verifyEmail(req: Request, res: Response) {
    try {
      const { otp } = req.body;
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // In production: Verify OTP against stored value
      user.isEmailVerified = true;
      await user.save();

      res.json({ 
        user: user.toJSON(),
        message: 'Email verified successfully' 
      });
    } catch (error) {
      res.status(500).json({ message: 'Verification failed' });
    }
  }
}

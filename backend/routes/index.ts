import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { ProfileController } from '../controllers/profile.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

// Auth routes
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/send-verification', authenticateToken, AuthController.sendVerificationEmail);
router.post('/auth/verify-email', authenticateToken, AuthController.verifyEmail);
router.get('/auth/me', authenticateToken, AuthController.getCurrentUser);

// Profile routes
router.patch('/profile', authenticateToken, ProfileController.updateProfile);

export default router;

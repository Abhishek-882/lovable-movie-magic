import { Request, Response } from 'express';
import { User } from '../models/user.model';

export class ProfileController {
  static async updateProfile(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { name, ...profileData } = req.body;

      await user.update({ 
        name,
        isProfileComplete: true 
      });

      if (user.profile) {
        await user.profile.update(profileData);
      }

      res.json({
        ...user.toJSON(),
        profile: user.profile
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update profile' });
    }
  }
}

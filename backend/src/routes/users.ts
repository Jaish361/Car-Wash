import { Router, Request, Response } from 'express';
import { User } from '../models/User.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();

// Get all users (admin only)
router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    res.json({
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile
router.get('/profile', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json({
      message: 'Profile fetched successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, phone, avatar },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update user role (admin only)
router.put('/:id/role', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');

    res.json({
      message: 'User role updated successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

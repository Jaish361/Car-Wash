import { Router, Request, Response } from 'express';
import { Review } from '../models/Review.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Get all reviews
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name')
      .populate('serviceId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Reviews fetched successfully',
      data: reviews,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get reviews by service
router.get('/service/:serviceId', async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Reviews fetched successfully',
      data: reviews,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create review
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { serviceId, bookingId, rating, comment } = req.body;

    const review = new Review({
      userId: req.user.userId,
      serviceId,
      bookingId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({
      message: 'Review created successfully',
      data: review,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

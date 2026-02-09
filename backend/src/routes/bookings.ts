import { Router, Request, Response } from 'express';
import { Booking } from '../models/Booking.js';
import { Slot } from '../models/Slot.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();

// Get user bookings
router.get('/my-bookings', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .populate('serviceId')
      .populate('slotId');

    res.json({
      message: 'Bookings fetched successfully',
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings (admin only)
router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find()
      .populate('userId')
      .populate('serviceId')
      .populate('slotId');

    res.json({
      message: 'All bookings fetched successfully',
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create booking
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { serviceId, slotId, date, startTime, endTime, totalPrice } = req.body;

    // Check if slot is available
    const slot = await Slot.findById(slotId);
    if (!slot || slot.isBooked) {
      res.status(400).json({ message: 'Slot not available' });
      return;
    }

    const booking = new Booking({
      userId: req.user.userId,
      serviceId,
      slotId,
      date,
      startTime,
      endTime,
      totalPrice,
      status: 'confirmed',
    });

    await booking.save();

    // Mark slot as booked
    await Slot.findByIdAndUpdate(slotId, { isBooked: true });

    res.status(201).json({
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });

    res.json({
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel booking
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    if (booking.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }

    // Mark slot as available
    await Slot.findByIdAndUpdate(booking.slotId, { isBooked: false });

    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

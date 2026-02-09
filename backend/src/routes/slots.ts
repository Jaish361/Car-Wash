import { Router, Request, Response } from 'express';
import { Slot } from '../models/Slot.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();

// Get available slots
router.get('/available', async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, serviceId } = req.query;
    const query: any = { isBooked: false };

    if (date) {
      const startDate = new Date(date as string);
      const endDate = new Date(date as string);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    if (serviceId) {
      query.service = serviceId;
    }

    const slots = await Slot.find(query).populate('service');
    res.json({
      message: 'Slots fetched successfully',
      data: slots,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create slots (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, startTime, endTime, service } = req.body;

    const slot = new Slot({
      date,
      startTime,
      endTime,
      service,
    });

    await slot.save();
    res.status(201).json({
      message: 'Slot created successfully',
      data: slot,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create multiple slots (admin only)
router.post('/bulk', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { slots } = req.body;
    const createdSlots = await Slot.insertMany(slots);
    res.status(201).json({
      message: 'Slots created successfully',
      data: createdSlots,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update slot (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { isBooked, startTime, endTime, date } = req.body;
    const updateData: any = {};

    if (isBooked !== undefined) updateData.isBooked = isBooked === 'canceled';
    if (startTime) updateData.startTime = startTime;
    if (endTime) updateData.endTime = endTime;
    if (date) updateData.date = date;

    const slot = await Slot.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json({
      message: 'Slot updated successfully',
      data: slot,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete slot (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await Slot.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slot deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

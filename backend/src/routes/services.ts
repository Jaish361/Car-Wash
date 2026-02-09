import { Router, Request, Response } from 'express';
import { Service } from '../models/Service.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();

// Get all services
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find({ isActive: true });
    res.json({
      message: 'Services fetched successfully',
      data: services,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get service by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.json({
      message: 'Service fetched successfully',
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create service (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, duration } = req.body;

    const service = new Service({
      name,
      description,
      price,
      duration,
    });

    await service.save();
    res.status(201).json({
      message: 'Service created successfully',
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update service (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
      message: 'Service updated successfully',
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete service (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config.js';
import { connectDB } from './db.js';
import { seedDatabase } from './seed.js';

// Import routes
import authRoutes from './routes/auth.js';
import servicesRoutes from './routes/services.js';
import slotsRoutes from './routes/slots.js';
import bookingsRoutes from './routes/bookings.js';
import reviewsRoutes from './routes/reviews.js';
import usersRoutes from './routes/users.js';

const app: Express = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        config.frontendUrl,
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3000',
        'https://car-wash-gules.vercel.app'
      ];
      
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/slots', slotsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Car Wash Backend API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      services: '/api/services',
      slots: '/api/slots',
      bookings: '/api/bookings',
      reviews: '/api/reviews',
      users: '/api/users'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      message: 'CORS error: Origin not allowed',
      error: err.message 
    });
  }
  
  res.status(err.status || 500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();
    
    const server = app.listen(config.port, () => {
      console.log(`✓ Server running on http://localhost:${config.port}`);
      console.log(`✓ Frontend configured at ${config.frontendUrl}`);
      console.log(`✓ Environment: ${config.nodeEnv}`);
      console.log(`✓ API available at http://localhost:${config.port}/api`);
    });

    // Handle server errors
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`✗ Port ${config.port} is already in use`);
      } else {
        console.error('✗ Server error:', err);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

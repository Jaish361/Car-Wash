# Car Wash Backend

A Node.js/Express backend for a car wash booking system with MongoDB.

## Features

- User authentication (JWT)
- Service management
- Slot/time management
- Booking system
- Reviews
- Admin dashboard
- Role-based access control

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `FRONTEND_URL`: Your frontend URL

## Development

Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

## Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Deployment (Vercel)

### Prerequisites
- Vercel account connected to GitHub
- MongoDB Atlas cluster (or other cloud MongoDB service)

### Steps

1. Push your code to GitHub
```bash
git add .
git commit -m "Configure backend for production"
git push origin main
```

2. On Vercel Dashboard:
   - Import your repository
   - Select the `backend` folder as the root directory
   - Set environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A strong random secret
     - `REFRESH_TOKEN_SECRET`: Another strong random secret
     - `FRONTEND_URL`: Your deployed frontend URL
     - `NODE_ENV`: `production`

3. Click "Deploy"

After deployment, you'll get a backend URL like: `https://carwash-backend.vercel.app`

Update your frontend's `VITE_API_URL` to point to this URL.

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Slots
- `GET /api/slots/available` - Get available slots
- `POST /api/slots` - Create slot (admin)
- `POST /api/slots/bulk` - Create multiple slots (admin)
- `DELETE /api/slots/:id` - Delete slot (admin)

### Bookings
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings` - Get all bookings (admin)
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking (admin)
- `DELETE /api/bookings/:id` - Cancel booking

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/service/:serviceId` - Get reviews by service
- `POST /api/reviews` - Create review

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/:id/role` - Update user role (admin)
- `DELETE /api/users/:id` - Delete user (admin)

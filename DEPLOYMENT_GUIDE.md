# Car Wash Booking System - Deployment Guide

## Current Deployment Status

### Frontend: ✅ Deployed
- **URL**: https://car-wash-gules.vercel.app
- **Repository**: GitHub (main branch)
- **Built with**: React + TypeScript + Vite

### Backend: 🔄 Needs Configuration
- **Deployment Target**: Vercel
- **Database**: MongoDB Atlas (needs to be set up)
- **Current Issue**: Backend is not properly configured for production

## Quick Start - Complete Setup Guide

### Prerequisites
1. GitHub account with repository access
2. Vercel account (linked to GitHub)
3. MongoDB Atlas account (free tier available)

### Step 1: Setup MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and organization
3. Create a cluster (select free tier):
   - Choose AWS as provider
   - Select a region close to you
   - Cluster name: `carwash-cluster`
   - Create cluster
4. Wait 2-3 minutes for cluster to be ready
5. Create a database user:
   - Click "Database Access"
   - "Add New Database User"
   - Username: `carwash_user`
   - Password: Generate a secure password (save this!)
   - Add user
6. Whitelist IPs:
   - Click "Network Access"
   - "Add IP Address"
   - For development: Add your IP
   - For production: Add `0.0.0.0/0` (allow all IPs for Vercel)
7. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select Node.js
   - Copy the connection string (e.g., `mongodb+srv://carwash_user:password@carwash.mongodb.net/carwash_db?retryWrites=true&w=majority`)

### Step 2: Deploy Backend to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI (if not already)
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to backend directory
cd backend

# Deploy
vercel --prod
```

#### Option B: Using GitHub + Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Create/Login to your account
3. Click "New Project"
4. Import your GitHub repository
5. Select the backend folder as root directory
6. Add environment variables (Critical!):

```
MONGODB_URI=mongodb+srv://carwash_user:YOUR_PASSWORD@carwash.mongodb.net/carwash_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_here_make_it_random
FRONTEND_URL=https://car-wash-gules.vercel.app
NODE_ENV=production
```

7. Click "Deploy"
8. Wait for deployment to complete
9. You'll get a URL like: `https://carwash-backend-xxxxx.vercel.app`

### Step 3: Update Frontend with Backend URL

1. Open [vercel.com](https://vercel.com)
2. Select your frontend project
3. Go to Settings > Environment Variables
4. Add or update:
   ```
   VITE_API_URL=https://YOUR_BACKEND_URL/api
   ```
   (Replace `YOUR_BACKEND_URL` with the URL from Step 2)

5. Go to Deployments and click "Redeploy" on the latest deployment
6. Wait for redeployment to complete

### Step 4: Test the Application

1. Navigate to https://car-wash-gules.vercel.app
2. Try logging in with test credentials:
   - **Admin Account**:
     - Email: `admin@programming-hero.com`
     - Password: `ph-password`
   - **User Account**:
     - Email: `reviewer@carwash.com`
     - Password: `12345678`

3. If login fails, check:
   - Browser DevTools > Network tab for failed requests
   - Check backend URL is correct in frontend environment variables
   - Verify MongoDB connection string is correct
   - Check Vercel backend deployment logs

## Troubleshooting

### Backend deployment fails
- Check backend/vercel.json is present
- Ensure all dependencies are in package.json
- Check build output: `npm run build` locally
- Verify Node.js version compatibility

### Login returns "Network error"
- Verify backend deployment URL is correct
- Check FRONTEND_URL in backend environment variables matches your frontend URL
- Ensure CORS is properly configured
- Check backend logs in Vercel dashboard

### MongoDB connection failed
- Verify connection string is correct
- Check username and password are correct
- Ensure IP address is whitelisted in MongoDB Atlas
- For Vercel, make sure `0.0.0.0/0` is whitelisted

### Database is empty
- Backend automatically seeds sample data on first run
- Check backend logs to see if seeding completed
- Manually add test users/services if needed

## Environment Variables Reference

### Backend (.env or Vercel)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/db_name?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRE=30d
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend (.env or Vercel)
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

## Files to Commit

Before deploying, ensure these files are committed to GitHub:

### Backend
- ✅ `backend/.env.production` (included in this commit)
- ✅ `backend/vercel.json` (included in this commit)
- ✅ `backend/src/server.ts` (updated with better CORS)
- ✅ `backend/README.md` (updated with deployment guide)

### Frontend
- ✅ `src/redux/api/baseApi.ts` (uses environment variable)
- ✅ `.env` (included in this commit)
- ✅ `.env.example` (included in this commit)
- ✅ `src/pages/auth/Login.tsx` (better error handling)

## Next Steps

1. Commit all changes:
```bash
git add .
git commit -m "Configure backend for production deployment with MongoDB Atlas and Vercel"
git push origin main
```

2. Deploy backend to Vercel (follow Step 2 above)

3. Update frontend environment variables (Step 3 above)

4. Test the complete application (Step 4 above)

5. Monitor logs in Vercel dashboard if issues occur

## Support

If you encounter issues:
1. Check Vercel deployment logs (Deployments tab)
2. Check MongoDB Atlas logs (Activity Feed)
3. Check browser console for frontend errors
4. Check Network tab to see API responses

## Deployment URLs

- **Frontend**: https://car-wash-gules.vercel.app
- **Backend**: https://car-wash-backend-v2.vercel.app/api (update after your deployment)
- **MongoDB**: MongoDB Atlas dashboard

---

**Last Updated**: February 9, 2026
**Status**: Ready for production deployment

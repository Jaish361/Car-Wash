import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/carwash',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret',
  refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE || '30d',
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5174',
};

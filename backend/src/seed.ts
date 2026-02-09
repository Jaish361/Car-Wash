import { User } from './models/User.js';
import { hashPassword } from './utils/auth.js';

export const seedDatabase = async (): Promise<void> => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@programming-hero.com' });
    if (!adminExists) {
      const hashedPassword = await hashPassword('ph-password');
      await User.create({
        name: 'Admin User',
        email: 'admin@programming-hero.com',
        password: hashedPassword,
        phone: '+8801700000000',
        role: 'admin',
      });
      console.log('✓ Admin user created');
    }

    // Check if test user exists
    const testUserExists = await User.findOne({ email: 'reviewer@carwash.com' });
    if (!testUserExists) {
      const hashedPassword = await hashPassword('12345678');
      await User.create({
        name: 'Test User',
        email: 'reviewer@carwash.com',
        password: hashedPassword,
        phone: '+8801700000001',
        role: 'user',
      });
      console.log('✓ Test user created');
    }
  } catch (error: any) {
    console.error('Error seeding database:', error.message);
  }
};

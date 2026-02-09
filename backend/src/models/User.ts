import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: String,
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);

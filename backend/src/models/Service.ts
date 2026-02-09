import { Schema, model, Types } from 'mongoose';

interface IService {
  name: string;
  description: string;
  price: number;
  duration: number;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true, default: 30 }, // in minutes
    image: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service = model<IService>('Service', serviceSchema);

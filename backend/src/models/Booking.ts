import { Schema, model, Types } from 'mongoose';

interface IBooking {
  userId: Types.ObjectId;
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    slotId: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    notes: String,
  },
  { timestamps: true }
);

export const Booking = model<IBooking>('Booking', bookingSchema);

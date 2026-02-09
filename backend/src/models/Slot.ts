import { Schema, model, Types } from 'mongoose';

interface ISlot {
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  service: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const slotSchema = new Schema<ISlot>(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  },
  { timestamps: true }
);

export const Slot = model<ISlot>('Slot', slotSchema);

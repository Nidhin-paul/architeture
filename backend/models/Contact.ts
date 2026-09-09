import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    projectType: { type: String, default: 'Residential Architecture' },
    budget: { type: String, default: 'Over $500,000' },
    message: { type: String, required: [true, 'Message is required'] },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

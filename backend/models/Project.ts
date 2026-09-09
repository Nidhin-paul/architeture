import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  category: 'Residential' | 'Commercial' | 'Cultural' | 'Hospitality' | 'Public';
  location: string;
  year: number;
  area: string;
  description: string;
  story: string;
  coverImage: string;
  gallery: string[];
  featured: boolean;
  order: number;
  services: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Residential', 'Commercial', 'Cultural', 'Hospitality', 'Public'],
      default: 'Residential',
    },
    location: { type: String, required: true },
    year: { type: Number, required: true },
    area: { type: String, default: '10,000 sq.ft' },
    description: { type: String, required: true },
    story: { type: String, default: '' },
    coverImage: { type: String, required: true },
    gallery: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    services: { type: [String], default: ['Architecture', 'Interior Design'] },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

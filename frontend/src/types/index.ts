export interface Project {
  _id?: string;
  title: string;
  slug: string;
  category: 'Residential' | 'Commercial' | 'Cultural' | 'Hospitality' | 'Public';
  location: string;
  year: number;
  area: string;
  description: string;
  story?: string;
  coverImage: string;
  gallery: string[];
  featured: boolean;
  order: number;
  services?: string[];
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
}

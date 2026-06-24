// src/lib/agency-data.ts

export type Service = {
  id: number;
  title: string;
  tagline: string;
  description: string;
  image: string; // URL from Cloudinary via Django
  icon: string;
  deliverables: string[];
};

export type Post = {
  id: number;
  slug: string; 
  title: string;
  excerpt: string;
  content: string;
  category_name: string; // From Django Category model
  author_name: string;   // From Django Author model
  publish_at: string;
  read_time: number;
  image: string;
  tags: string[];
};

export type PortfolioImage = {
  id: number;
  title: string;
  category: string;
  image: string;
  // 👇 FIXED: Matched to the new Premium Portfolio requirements
  client_name: string; 
  location: string;
};

export type Testimonial = {
  id: number;
  author: string;
  role: string;
  quote: string;
  initial?: string;
  // 👇 FIXED: Matched to the new Premium Portfolio requirements
  company: string;
  image: string | null;
};

// ==== NEW: Added Partner Type ====
export type Partner = {
  id: number;
  name: string;
  logo: string; // URL from Cloudinary
  link?: string | null;
};

// Added PaginatedPosts interface
export interface PaginatedPosts {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

// ==== NEW: Added CaseStudy Type (For your new backend endpoint) ====
export interface CaseStudy {
  id: string | number;
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  project_type: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  hero_image: string;
  featured: boolean;
}
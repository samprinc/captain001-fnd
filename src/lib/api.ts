import { Service, Post, PortfolioImage, Testimonial, Partner } from "./agency-data";

const API_URL = "https://captain001-bnd-z8f2.onrender.com/api";
// ==== INTERFACES ====
export interface PaginatedPosts {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export interface CaseStudy {
  id: string;
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

// ==== UTILITY: HELPER TO UNWRAP DRF PAGINATION ====
const unwrap = (data: any) => (data.results ? data.results : data);

// ==== FETCH FUNCTIONS ====

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL}/services/`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return unwrap(await res.json());
}

export async function fetchPosts(
  page: number = 1,
  search: string = "",
  category: string = "All"
): Promise<PaginatedPosts> {
  const params = new URLSearchParams({ page: page.toString() });
  if (search.trim()) params.append("search", search.trim());
  if (category !== "All") params.append("category__name", category);

  const res = await fetch(`${API_URL}/posts/?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json(); // Keep as is because PaginatedPosts expects the full structure
}

export async function fetchPost(slug: string): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${slug}/`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function fetchGallery(): Promise<PortfolioImage[]> {
  const res = await fetch(`${API_URL}/portfolio/`);
  if (!res.ok) throw new Error("Failed to fetch portfolio");
  return unwrap(await res.json());
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${API_URL}/testimonials/`);
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return unwrap(await res.json());
}

export async function fetchPartners(): Promise<Partner[]> {
  const res = await fetch(`${API_URL}/partners/`);
  if (!res.ok) throw new Error("Failed to fetch partners");
  return unwrap(await res.json());
}

// Replace your existing fetchCaseStudies in api.ts with this robust version
export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const res = await fetch(`${API_URL}/case-studies/`);
  if (!res.ok) throw new Error("Failed to fetch case studies");
  
  const data = await res.json();
  
  // DRF often wraps lists in a 'results' object. 
  // If 'results' exists, use it. If not, assume it's a plain array.
  return data.results ? data.results : data;
}

// ==== FORMS & ACTIONS ====

export async function submitBooking(bookingData: any) {
  const response = await fetch(`${API_URL}/bookings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  if (!response.ok) throw new Error("Failed to submit booking");
  return response.json();
}

export async function subscribeNewsletter(email: string) {
  const response = await fetch(`${API_URL}/subscribers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw { status: response.status, data: errorData };
  }
  
  return response.json();
}
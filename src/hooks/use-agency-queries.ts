// src/hooks/use-agency-queries.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { 
  fetchServices, 
  fetchPosts, 
  fetchGallery, 
  fetchTestimonials, 
  fetchPartners, 
  fetchPost 
} from "../lib/api";

export const useServicesQuery = () => 
  useQuery({ queryKey: ["services"], queryFn: fetchServices });

// ==== UPDATED: Now handles Pagination, Search, and Filtering ====
export const usePostsQuery = (page: number = 1, search: string = "", category: string = "All") => 
  useQuery({ 
    // Adding them to the queryKey means if any of them change, React refetches automatically
    queryKey: ["posts", page, search, category], 
    queryFn: () => fetchPosts(page, search, category),
    // This stops the screen from flashing white when switching pages
    placeholderData: keepPreviousData, 
  });

export const useGalleryQuery = () => 
  useQuery({ queryKey: ["gallery"], queryFn: fetchGallery });

export const useTestimonialsQuery = () => 
  useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials });

// ==== NEW: For the Homepage Marquee ====
export const usePartnersQuery = () => 
  useQuery({ queryKey: ["partners"], queryFn: fetchPartners });

// ==== NEW: For the Individual Article Page ====
export const usePostQuery = (slug: string) => 
  useQuery({ 
    queryKey: ["post", slug], 
    queryFn: () => fetchPost(slug),
    enabled: !!slug 
  });
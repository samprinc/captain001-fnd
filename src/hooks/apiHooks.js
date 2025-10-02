import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchServices,
  fetchPosts,
  fetchPost,
  fetchAds,
  fetchPartners,
  fetchEvents,
  fetchCategories,
  fetchTags,
  fetchAuthors,
  fetchAuthor,
  submitComment,
  submitBooking,
  submitFeedback,
} from "../api";

// ✅ Services
export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });
}

// ✅ Posts (with filters: category, page, tag, search)
export function usePosts(params) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
  });
}

// ✅ Single Post
export function usePost(id) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });
}

// ✅ Ads / Promotions
export function useAds() {
  return useQuery({
    queryKey: ["ads"],
    queryFn: fetchAds,
  });
}

// ✅ Partners
export function usePartners() {
  return useQuery({
    queryKey: ["partners"],
    queryFn: fetchPartners,
  });
}

// ✅ Events
export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
}

// ✅ Categories
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

// ✅ Tags
export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
}

// ✅ Authors
export function useAuthors() {
  return useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
  });
}

// ✅ Single Author
export function useAuthor(id) {
  return useQuery({
    queryKey: ["author", id],
    queryFn: () => fetchAuthor(id),
    enabled: !!id,
  });
}

// ✅ Submit Comment
export function useSubmitComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); // refresh posts if needed
    },
  });
}

// ✅ Submit Booking
export function useSubmitBooking() {
  return useMutation({
    mutationFn: submitBooking,
  });
}

// ✅ Submit Feedback
export function useSubmitFeedback() {
  return useMutation({
    mutationFn: submitFeedback,
  });
}

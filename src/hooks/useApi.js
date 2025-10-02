import { useQuery, useMutation } from "@tanstack/react-query";
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

// --- Queries --- //
export const useServices = () =>
  useQuery({ queryKey: ["services"], queryFn: fetchServices });

export const usePosts = (params = {}) =>
  useQuery({
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
    keepPreviousData: true,
  });

export const usePost = (id) =>
  useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });

export const useAds = () =>
  useQuery({ queryKey: ["ads"], queryFn: fetchAds });

export const usePartners = () =>
  useQuery({ queryKey: ["partners"], queryFn: fetchPartners });

export const useEvents = () =>
  useQuery({ queryKey: ["events"], queryFn: fetchEvents });

export const useCategories = () =>
  useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

export const useTags = () =>
  useQuery({ queryKey: ["tags"], queryFn: fetchTags });

export const useAuthors = () =>
  useQuery({ queryKey: ["authors"], queryFn: fetchAuthors });

export const useAuthor = (id) =>
  useQuery({
    queryKey: ["author", id],
    queryFn: () => fetchAuthor(id),
    enabled: !!id,
  });

// --- Mutations --- //
export const useSubmitComment = () =>
  useMutation({ mutationFn: submitComment });

export const useSubmitBooking = () =>
  useMutation({ mutationFn: submitBooking });

export const useSubmitFeedback = () =>
  useMutation({ mutationFn: submitFeedback });

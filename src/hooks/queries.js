// queries.js
import { useQuery } from "@tanstack/react-query";
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
} from "../api/api";

// 📰 Posts
export const usePostsQuery = (params = {}) =>
  useQuery({
    queryKey: ["posts", params],
    queryFn: async () => {
      const res = await fetchPosts(params);
      return res?.data?.results || [];
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

export const usePostQuery = (id) =>
  useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetchPost(id);
      return res?.data || null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

// 📌 Services
export const useServicesQuery = () =>
  useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetchServices();
      return res?.data?.results || [];
    },
    staleTime: 1000 * 60 * 5,
  });

// 🎯 Ads
export const useAdsQuery = () =>
  useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const res = await fetchAds();
      // Always return an array
      return res?.data?.results || [];
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

// 🤝 Partners
export const usePartnersQuery = () =>
  useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const res = await fetchPartners();
      return res?.data?.results || [];
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

// 🎉 Events
export const useEventsQuery = () =>
  useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetchEvents();
      return res?.data?.results || [];
    },
    staleTime: 1000 * 60 * 10,
  });

// 🏷 Categories
export const useCategoriesQuery = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetchCategories();
      return res?.data?.results || [];
    },
    staleTime: 1000 * 60 * 10,
  });

// 🏷 Tags
export const useTagsQuery = () =>
  useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await fetchTags();
      return res?.data?.results || [];
    },
    staleTime: 1000 * 60 * 10,
  });

// 👥 Authors
export const useAuthorsQuery = () =>
  useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await fetchAuthors();
      return res?.data?.results || [];
    },
    staleTime: 1000 * 60 * 10,
  });

export const useAuthorQuery = (id) =>
  useQuery({
    queryKey: ["author", id],
    queryFn: async () => {
      const res = await fetchAuthor(id);
      return res?.data || null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });

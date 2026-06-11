import { useQuery } from "@tanstack/react-query";
import { posts, services, type Post, type Service } from "@/lib/agency-data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function usePostsQuery() {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      await delay(120);
      return posts;
    },
    staleTime: 60_000,
  });
}

export function useServicesQuery() {
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      await delay(80);
      return services;
    },
    staleTime: 60_000,
  });
}

export function usePostQuery(id: string) {
  return useQuery<Post | undefined>({
    queryKey: ["posts", id],
    queryFn: async () => {
      await delay(80);
      return posts.find((p) => p.id === id);
    },
    staleTime: 60_000,
  });
}

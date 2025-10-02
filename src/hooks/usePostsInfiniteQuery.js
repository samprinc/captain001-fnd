import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";
import { startProgress, stopProgress } from "../utils/nprogress";

export function usePostsInfiniteQuery({ search, category, tag, sort }) {
  return useInfiniteQuery({
    queryKey: ["posts", search, category, tag, sort],
    queryFn: async ({ pageParam = 1 }) => {
      startProgress();
      const params = {
        category: category || undefined,
        tags: tag || undefined,
        search: search || undefined,
        ordering: sort === "latest" ? "-publish_at" : "publish_at",
        page: pageParam,
      };
      const res = await fetchPosts(params);
      stopProgress();
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get("page");
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
  });
}

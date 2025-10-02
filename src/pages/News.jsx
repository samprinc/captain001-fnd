import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, fetchTags, fetchAds, fetchPost } from "../api/api";
import { usePostsInfiniteQuery } from "../hooks/usePostsInfiniteQuery";
import NewsCard from "../components/NewsCard";
import Spinner from "../components/Spinner";
import MobileAd from "../components/MobileAd";
import "./News.css";

function Posts() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // --- State ---
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sort, setSort] = useState("latest");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // --- Initialize from URL ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get("search") || "");
    setDebouncedSearch(params.get("search") || "");
    setSelectedCategory(params.get("category") || "");
    setSelectedTag(params.get("tag") || "");
    setSort(params.get("sort") || "latest");
  }, [location.search]);

  // --- Debounce search input ---
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // --- Fetch categories, tags, ads ---
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories().then(res => res.data.results || []),
    staleTime: 1000 * 60 * 10,
  });

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags().then(res => res.data.results || []),
    staleTime: 1000 * 60 * 10,
  });

  const { data: ads = [] } = useQuery({
    queryKey: ["ads"],
    queryFn: () => fetchAds().then(res => res.data.results || []),
    staleTime: 1000 * 60 * 5,
  });

  // --- Infinite posts query ---
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePostsInfiniteQuery({ 
    search: debouncedSearch, 
    category: selectedCategory, 
    tag: selectedTag, 
    sort 
  });

  const posts = data?.pages.flatMap(page => page.results) || [];

  // --- Prefetch individual post on hover ---
  const prefetchPost = (id) => {
    queryClient.prefetchQuery({
      queryKey: ["news", id],
      queryFn: () => fetchPost(id).then(res => res.data),
      staleTime: 1000 * 60 * 10,
    });
  };

  // --- Infinite scroll ---
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  // --- Sync URL with filters ---
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedTag) params.set("tag", selectedTag);
      if (sort !== "latest") params.set("sort", sort);
      navigate(`?${params.toString()}`, { replace: true });
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedSearch, selectedCategory, selectedTag, sort, navigate]);

  // --- Clear filters ---
  const clearFilters = useCallback(() => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedCategory("");
    setSelectedTag("");
    setSort("latest");
    navigate("/news", { replace: true });
  }, [navigate]);

  // --- Toggle search bar ---
  const toggleSearch = () => setIsSearchVisible(prev => !prev);

  const activeFilterCount = [selectedCategory, selectedTag, debouncedSearch].filter(Boolean).length;
  const getCategoryName = id => categories.find(c => c.id == id)?.name || "Unknown";
  const getTagName = id => tags.find(t => t.id == id)?.name || "Unknown";

  return (
    <div className="posts-container">
      <Helmet>
        <title>
          {debouncedSearch ? `Search: ${debouncedSearch} | Captain001Media` : "Latest News | Captain001Media"}
        </title>
        <meta
          name="description"
          content="Browse the latest news posts, filtered by category, tag, or keyword from Captain001Media."
        />
      </Helmet>

      {/* Header */}
      <div className="posts-header">
        <div>
          <h2 className="posts-title">Latest News</h2>
          {activeFilterCount > 0 && (
            <p className="posts-subtitle">
              {posts.length} {posts.length === 1 ? "post" : "posts"} found
            </p>
          )}
        </div>
        <button className="search-toggle" onClick={toggleSearch}>
          {isSearchVisible ? "✕" : "🔍"}
        </button>
      </div>

      {/* Search */}
      {isSearchVisible && (
        <form className="posts-search-container" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search news articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
          {search && (
            <button type="button" className="clear-search" onClick={() => setSearch("")}>
              ✕
            </button>
          )}
          <button className="search-button" type="submit">Search</button>
        </form>
      )}

      {/* Filters */}
      <div className="filters">
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <select value={selectedTag} onChange={e => setSelectedTag(e.target.value)}>
          <option value="">All Tags</option>
          {tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="latest">📅 Latest First</option>
          <option value="oldest">📅 Oldest First</option>
          <option value="popular">🔥 Most Popular</option>
        </select>
        {activeFilterCount > 0 && (
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="active-filters">
          {selectedCategory && <span className="filter-badge">📁 {getCategoryName(selectedCategory)}<button onClick={() => setSelectedCategory("")}>✕</button></span>}
          {selectedTag && <span className="filter-badge">🏷️ {getTagName(selectedTag)}<button onClick={() => setSelectedTag("")}>✕</button></span>}
          {debouncedSearch && <span className="filter-badge">🔍 "{debouncedSearch}"<button onClick={() => {setSearch(""); setDebouncedSearch("");}}>✕</button></span>}
        </div>
      )}

      {/* Mobile Ads */}
      {ads.length > 0 && <MobileAd ads={ads} />}

      {/* Loading */}
      {isLoading && (
        <div className="posts-grid">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card" />)}
        </div>
      )}

      {/* Error */}
      {isError && <div className="error-message">⚠️ {error?.message || "Failed to load posts."}</div>}

      {/* Empty */}
      {!isLoading && posts.length === 0 && (
        <div className="no-posts-msg">
          <div className="empty-state-icon">📭</div>
          <h3>No posts found</h3>
          <p>{activeFilterCount > 0 ? "Try adjusting filters or search terms" : "Check back later for new content"}</p>
          {activeFilterCount > 0 && <button onClick={clearFilters} className="cta-button">Clear Filters</button>}
        </div>
      )}

      {/* Posts Grid */}
      {!isLoading && posts.length > 0 && (
        <div className="posts-grid">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} onMouseEnter={() => prefetchPost(post.id)} />
          ))}
        </div>
      )}

      {/* Loading More */}
      {isFetchingNextPage && (
        <div className="loading-more">
          <Spinner />
          <span>Loading more posts...</span>
        </div>
      )}

      {/* End of Results */}
      {!isLoading && !hasNextPage && posts.length > 0 && (
        <div className="end-of-results">
          <p>🎉 You've reached the end!</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ Back to Top</button>
        </div>
      )}
    </div>
  );
}

// --- Utility: Throttle ---
function throttle(func, delay) {
  let timeoutId, lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (Date.now() - lastRan >= delay) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
}

export default Posts;

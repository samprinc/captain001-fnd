import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchTags, fetchAds } from "../api/api";
import { usePostsInfiniteQuery } from "../hooks/usePostsInfiniteQuery";
import NewsCard from "../components/NewsCard";
import Spinner from "../components/Spinner";
import MobileAd from "../components/MobileAd";
import "./News.css";

function Posts() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ State management
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sort, setSort] = useState("latest");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // ✅ Initialize from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialSearch = params.get("search") || "";
    const initialCategory = params.get("category") || "";
    const initialTag = params.get("tag") || "";
    const initialSort = params.get("sort") || "latest";

    setSearch(initialSearch);
    setDebouncedSearch(initialSearch);
    setSelectedCategory(initialCategory);
    setSelectedTag(initialTag);
    setSort(initialSort);
  }, []); // Only run once on mount

  // ✅ Debounce search input (wait 500ms after user stops typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ Fetch categories, tags, and ads with caching
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories().then(res => res.data.results || []),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags().then(res => res.data.results || []),
    staleTime: 1000 * 60 * 10,
  });

  const { data: ads = [] } = useQuery({
    queryKey: ["ads"],
    queryFn: () => fetchAds().then(res => res.data.results || []),
    staleTime: 1000 * 60 * 5, // 5 minutes for ads
  });

  // ✅ Infinite posts query with debounced search
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

  // ✅ Infinite scroll with better performance
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    const throttledScroll = throttle(handleScroll, 200);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  // ✅ Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedTag) params.set("tag", selectedTag);
    if (sort !== "latest") params.set("sort", sort);
    
    navigate(`?${params.toString()}`, { replace: true });
  }, [debouncedSearch, selectedCategory, selectedTag, sort, navigate]);

  // ✅ Clear all filters
  const clearFilters = useCallback(() => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedCategory("");
    setSelectedTag("");
    setSort("latest");
    navigate("/news", { replace: true });
  }, [navigate]);

  // ✅ Toggle search bar
  const toggleSearch = () => setIsSearchVisible(prev => !prev);

  // ✅ Get active filter count
  const activeFilterCount = [selectedCategory, selectedTag, debouncedSearch].filter(Boolean).length;

  // ✅ Get category/tag names for display
  const getCategoryName = (id) => categories.find(c => c.id == id)?.name || "Unknown";
  const getTagName = (id) => tags.find(t => t.id == id)?.name || "Unknown";

  return (
    <div className="posts-container">
      <Helmet>
        <title>
          {debouncedSearch 
            ? `Search: ${debouncedSearch} | Captain001Media` 
            : "Latest News | Captain001Media"}
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
        <button 
          className="search-toggle" 
          onClick={toggleSearch}
          aria-label="Toggle search"
        >
          {isSearchVisible ? "✕" : "🔍"}
        </button>
      </div>

      {/* Search Bar */}
      {isSearchVisible && (
        <form 
          className="posts-search-container" 
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search news articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
            aria-label="Search posts"
          />
          {search && (
            <button 
              type="button" 
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      )}

      {/* Filters */}
      <div className="filters">
        <select 
          onChange={e => setSelectedCategory(e.target.value)} 
          value={selectedCategory}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select 
          onChange={e => setSelectedTag(e.target.value)} 
          value={selectedTag}
          aria-label="Filter by tag"
        >
          <option value="">All Tags</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>

        <select 
          onChange={e => setSort(e.target.value)} 
          value={sort}
          aria-label="Sort posts"
        >
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

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="active-filters">
          {selectedCategory && (
            <span className="filter-badge">
              📁 {getCategoryName(selectedCategory)}
              <button 
                onClick={() => setSelectedCategory("")}
                aria-label="Remove category filter"
              >
                ✕
              </button>
            </span>
          )}
          {selectedTag && (
            <span className="filter-badge">
              🏷️ {getTagName(selectedTag)}
              <button 
                onClick={() => setSelectedTag("")}
                aria-label="Remove tag filter"
              >
                ✕
              </button>
            </span>
          )}
          {debouncedSearch && (
            <span className="filter-badge">
              🔍 "{debouncedSearch}"
              <button 
                onClick={() => {
                  setSearch("");
                  setDebouncedSearch("");
                }}
                aria-label="Remove search filter"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}

      {/* Mobile Ads */}
      {ads.length > 0 && <MobileAd ads={ads} />}

      {/* Error State */}
      {isError && (
        <div className="error-message" role="alert">
          <strong>⚠️ Error:</strong> {error?.message || "Failed to load posts. Please try again."}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="posts-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && posts.length === 0 && (
        <div className="no-posts-msg">
          <div className="empty-state-icon">📭</div>
          <h3>No posts found</h3>
          <p>
            {activeFilterCount > 0 
              ? "Try adjusting your filters or search terms" 
              : "Check back later for new content"}
          </p>
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="cta-button">
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Posts Grid */}
      {!isLoading && posts.length > 0 && (
        <div className="posts-grid">
          {posts.map((post, index) => (
            <NewsCard 
              key={post.id} 
              post={post} 
              style={{ animationDelay: `${(index % 6) * 0.05}s` }}
            />
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

      {/* End of results */}
      {!isLoading && !hasNextPage && posts.length > 0 && (
        <div className="end-of-results">
          <p>🎉 You've reached the end!</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ↑ Back to Top
          </button>
        </div>
      )}
    </div>
  );
}

// ✅ Utility: Throttle function for scroll performance
function throttle(func, delay) {
  let timeoutId;
  let lastRan;
  
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
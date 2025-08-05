import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPosts, fetchCategories, fetchTags } from "../api/api";
import NewsCard from "../components/NewsCard";
import { startProgress, stopProgress } from "../utils/nprogress";
import "./News.css";
import { Helmet } from "react-helmet";
import Spinner from "../components/Spinner"; // Make sure to have a Spinner component

function Posts() {
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // === DATA FETCHING & STATE MANAGEMENT ===
  // Fetch initial data (categories and tags)
  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data.results));
    fetchTags().then((res) => setTags(res.data.results));
  }, []);

  // Fetch posts based on URL parameters
  const fetchPostsFromAPI = useCallback(
    async (pageNum = 1, replace = false) => {
      // Use a separate loading state for initial load vs infinite scroll
      if (pageNum === 1) {
        startProgress();
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const params = {
        category: selectedCategory || undefined,
        tags: selectedTag || undefined,
        search: search || undefined,
        ordering: sort === "latest" ? "-publish_at" : "publish_at",
        page: pageNum,
      };

      try {
        const res = await fetchPosts(params);
        const newPosts = res.data.results;
        setPosts((prev) => (replace ? newPosts : [...prev, ...newPosts]));
        setHasNext(!!res.data.next);
        setPage(pageNum);
        setError("");
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
        stopProgress();
      }
    },
    [search, selectedCategory, selectedTag, sort]
  );

  // Effect to trigger post fetching when filters/sort change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedTag) params.set("tag", selectedTag);
    // You can also add sort to the URL if you wish
    navigate(`?${params.toString()}`, { replace: true });
    fetchPostsFromAPI(1, true);
  }, [search, selectedCategory, selectedTag, sort, navigate, fetchPostsFromAPI]);

  // Effect for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading &&
        !loadingMore && // Prevent multiple fetches
        hasNext
      ) {
        fetchPostsFromAPI(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, loadingMore, hasNext, page, fetchPostsFromAPI]);

  // === HANDLERS ===
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleTagChange = (e) => setSelectedTag(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPostsFromAPI(1, true);
  };
  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedTag("");
    setSort("latest");
    navigate("/news");
  };

  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

  // === RENDER ===
  return (
    <div className="posts-container">
      {/* CORRECT HELMET PLACEMENT */}
      <Helmet>
        <title>Latest News | Your Church Website</title>
        <meta name="description" content="Browse the latest news posts, filtered by category, tag, or keyword." />
      </Helmet>

      <div className="posts-header">
        <h2 className="posts-title">Latest News</h2>
        <button className="search-toggle" onClick={toggleSearch}>🔍</button>
      </div>

      <div className={`posts-search-container ${isSearchVisible ? "visible" : ""}`}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" type="submit">Search</button>
        </form>
      </div>

      <div className="filters">
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select onChange={handleTagChange} value={selectedTag}>
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
        <select onChange={handleSortChange} value={sort}>
          <option value="latest">Sort by: Latest</option>
          <option value="oldest">Sort by: Oldest</option>
        </select>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      {(selectedCategory || selectedTag || search) && (
        <div className="active-filters">
          {selectedCategory && (
            <span>Category: {categories.find((c) => c.id == selectedCategory)?.name}</span>
          )}
          {selectedTag && (
            <span>Tag: {tags.find((t) => t.id == selectedTag)?.name}</span>
          )}
          {search && <span>Search: “{search}”</span>}
        </div>
      )}

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            // Pass the entire post object for cleaner code
            <NewsCard key={`${post.id}-${post.title}`} post={post} />

          ))}
        </div>
      )}
      
      {loadingMore && <div className="loading-more"><Spinner /></div>}
    </div>
  );
}

export default Posts;
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchPosts,
  fetchCategories,
  fetchTags,
} from "../api/api";
import NewsCard from "../components/NewsCard";
import { startProgress, stopProgress } from "../utils/nprogress";
import "./News.css";

function Posts() {
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Parse URL params into state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get("search") || "");
    setSelectedCategory(params.get("category") || "");
    setSelectedTag(params.get("tag") || "");
  }, [location.search]);

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data.results));
    fetchTags().then((res) => setTags(res.data.results));
  }, []);

  const fetchFilteredPosts = useCallback(
    (pageNum = 1, replace = false) => {
      startProgress();
      setLoading(true);

      fetchPosts({
        category: selectedCategory || undefined,
        tags: selectedTag || undefined,
        search: search || undefined,
        ordering: sort === "latest" ? "-publish_at" : "publish_at",
        page: pageNum,
      })
        .then((res) => {
          const newPosts = res.data.results;
          setPosts((prev) => (replace ? newPosts : [...prev, ...newPosts]));
          setHasNext(!!res.data.next);
          setPage(pageNum);
          setError("");
        })
        .catch((err) => {
          console.error("Failed to fetch posts:", err);
          setError("Failed to load posts.");
        })
        .finally(() => {
          setLoading(false);
          stopProgress();
        });
    },
    [selectedCategory, selectedTag, search, sort]
  );

  // Update posts when filters change
  useEffect(() => {
    fetchFilteredPosts(1, true);

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedTag) params.set("tag", selectedTag);

    navigate(`?${params.toString()}`, { replace: true });
  }, [fetchFilteredPosts, navigate, search, selectedCategory, selectedTag]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading &&
        hasNext
      ) {
        fetchFilteredPosts(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasNext, page, fetchFilteredPosts]);

  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedTag("");
    setSort("latest");
    setPage(1);
    navigate("/news");
  };

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2 className="posts-title">Latest News</h2>
        <button className="search-toggle" onClick={toggleSearch}>🔍</button>
      </div>

      <div className={`posts-search-container ${isSearchVisible ? "visible" : ""}`}>
        <form onSubmit={(e) => { e.preventDefault(); fetchFilteredPosts(1, true); }}>
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button">Search</button>
        </form>
      </div>

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedTag(e.target.value)} value={selectedTag}>
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>

        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="latest">Sort by: Latest</option>
          <option value="oldest">Sort by: Oldest</option>
        </select>

        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      {/* Active Filters */}
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

      {/* Posts Grid */}
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <NewsCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              image={post.image}
              tags={post.tags}
              category={post.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;

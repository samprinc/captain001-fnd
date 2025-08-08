import { useEffect, useState } from "react";
import { fetchAuthors } from "../api/api";
import "./Author.css";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const res = await fetchAuthors();

        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.results)
          ? res.data.results
          : [];

        setAuthors(data);
      } catch (err) {
        console.error("Error fetching authors:", err);
        setError("Failed to load authors.");
      } finally {
        setLoading(false);
      }
    };

    loadAuthors();
  }, []);

  // Skeleton Loader
  if (loading) {
    return (
      <div className="authors-section">
        <div className="authors-header">
          <h1>Meet Our Authors</h1>
          <p>Passionate storytellers bringing you the latest and best from CaptainMedia.</p>
        </div>
        <div className="authors-list">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="author-card skeleton">
              <div className="skeleton-img"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-text long"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="authors-section">
      <div className="authors-header">
        <h1>Meet Our Authors</h1>
        <p>Passionate storytellers bringing you the latest and best from CaptainMedia.</p>
      </div>

      <div className="authors-list">
        {authors.map((author) => (
          <div key={author.id} className="author-card">
            <img src={author.profile_picture} alt={author.name} />
            <h3>{author.name}</h3>
            <p>{author.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Authors;

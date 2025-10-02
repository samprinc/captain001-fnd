import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthors } from "../api/api";
import { formatImage } from "../utils/formatImage";
import "./Author.css";

// Skeleton for loading state
function AuthorSkeleton() {
  return (
    <div className="author-card skeleton">
      <div className="skeleton-img"></div>
      <div className="skeleton-text short"></div>
      <div className="skeleton-text long"></div>
    </div>
  );
}

function Authors() {
  const { data: authors = [], isLoading, isError } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await fetchAuthors();
      // Ensure it's always an array
      return Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.results)
        ? res.data.results
        : [];
    },
    staleTime: 1000 * 60 * 10, // cache 10 minutes
  });

  if (isError) return <p className="error-message">Failed to load authors.</p>;

  return (
    <section className="authors-section">
      <header className="authors-header">
        <h1>Meet Our Authors</h1>
        <p>Passionate storytellers bringing you the latest and best from CaptainMedia.</p>
      </header>

      <div className="authors-list">
        {isLoading
          ? [...Array(4)].map((_, i) => <AuthorSkeleton key={i} />)
          : authors.map((author) => (
              <Link
                to={`/authors/${author.id}`}
                key={author.id}
                className="author-card-link"
              >
                <article className="author-card">
                  <img
                    src={formatImage(author.profile_pic)}
                    alt={author.name}
                    className="author-avatar"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <h3>{author.name}</h3>
                  <p>{author.bio}</p>
                </article>
              </Link>
            ))}
      </div>
    </section>
  );
}

export default Authors;

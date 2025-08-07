// Author.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Author.css"; // Import the CSS file here

function Author() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    // A more robust way to handle the API call
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`/api/authors/${id}/`);
        setAuthor(response.data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };
    
    if (id) {
      fetchAuthor();
    }
  }, [id]);

  // Use a dedicated class for the loading state
  if (!author) {
    return <p className="loading-message">Loading author profile...</p>;
  }

  // The main JSX with CSS classes applied
  return (
    <div className="author-profile">
      <img src={author.profile_pic} alt={author.name} />
      <h2>{author.name}</h2>
      <p className="bio">{author.bio}</p>
      <p>
        <strong>Email:</strong> {author.email}
      </p>
    </div>
  );
}

export default Author;
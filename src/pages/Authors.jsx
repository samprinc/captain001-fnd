import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function Author() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    axios.get(`/api/authors/${id}/`).then(res => setAuthor(res.data));
  }, [id]);

  if (!author) return <p>Loading...</p>;

  return (
    <div className="author-profile">
      <img src={author.profile_pic} alt={author.name} />
      <h2>{author.name}</h2>
      <p>{author.bio}</p>
      <p>Email: {author.email}</p>
    </div>
  );
}

export default Author;

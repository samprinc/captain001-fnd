import { Link } from "react-router-dom";
import "./PostCard.css";

function NewsCard({ post, id, title, image, content, layout = "horizontal" }) {
  // Prefer post destructure if provided
  const _id = post?.id || id;
  const _title = post?.title || title;
  const _image = post?.image || image;
  const _content = post?.content || content;
  const snippet = _content
    ? _content.length > 120
      ? _content.slice(0, 120).replace(/<[^>]+>/g, "") + "..."
      : _content.replace(/<[^>]+>/g, "")
    : post?.excerpt || "";

  const fullImageUrl = _image?.startsWith("http")
    ? _image
    : `https://res.cloudinary.com/dco3yxmss/${_image}`;

  return (
    <div className={`post-card ${layout}`}>
      {_image && <img src={fullImageUrl} alt={_title} className="post-image" />}
      <div className="post-content">
        <h3>{_title}</h3>
        <p>{snippet}</p>
        <Link to={`/news/${_id}`} className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default NewsCard;

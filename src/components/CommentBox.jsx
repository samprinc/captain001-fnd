import React from "react";
import "./CommentBox.css"; // ✅ Import CSS

function CommentBox({ name, content }) {
  return (
    <div className="comment-box">
      <div className="comment-header">
        <strong className="comment-author">{name}</strong>
      </div>
      <p className="comment-content">{content}</p>
    </div>
  );
}

export default CommentBox;

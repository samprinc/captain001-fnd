// src/components/Skeleton.js
import React from "react";
import "./Skeleton.css";

function Skeleton({ type, count = 1 }) {
  const classes = {
    avatar: "skeleton skeleton-avatar",
    text: "skeleton skeleton-text",
    rect: "skeleton skeleton-rect",
    circle: "skeleton skeleton-circle",
  };

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={classes[type] || "skeleton"}></div>
        ))}
    </>
  );
}

export default Skeleton;

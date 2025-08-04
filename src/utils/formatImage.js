const IMAGE_BASE_URL = "https://res.cloudinary.com/dco3yxmss/";
export const formatImage = (img) => {
  if (!img) return "/default-news-image.jpg"; // Handle null or undefined images
  return img.startsWith("http") ? img : `${IMAGE_BASE_URL}${img}`;
};
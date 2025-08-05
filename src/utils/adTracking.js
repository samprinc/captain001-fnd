import axios from "axios";

// ✅ Use deployed API instead of localhost
const BASE_API_URL = "https://captain001-bnd.onrender.com";
const IMAGE_BASE_URL = "https://res.cloudinary.com/dco3yxmss/";

export const formatImage = (img) =>
  img?.startsWith("http") ? img : `${IMAGE_BASE_URL}${img}`;

export const trackAdView = (adId) => {
  if (!adId) return;
  axios
    .post(`${BASE_API_URL}/api/promotions/${adId}/view/`)
    .catch((err) =>
      console.error(`Failed to track view for ad ${adId}:`, err)
    );
};

export const trackAdClick = (adId) => {
  if (!adId) return;
  axios
    .post(`${BASE_API_URL}/api/promotions/${adId}/click/`)
    .catch((err) =>
      console.error(`Failed to track click for ad ${adId}:`, err)
    );
};

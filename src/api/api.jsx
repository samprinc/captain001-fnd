import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ GET Requests
export const fetchServices = () => API.get("services/");
export const fetchPosts = (params) => API.get("posts/", { params });
export const fetchPost = (id) => API.get(`posts/${id}/`);
export const fetchAds = () => API.get("promotions/");
export const fetchPartners = () => API.get("partners/");
export const fetchEvents = () => API.get("events/");


// ✅ POST Requests
export const submitComment = (data) => API.post("comments/", data);
export const submitBooking = (data) => API.post("bookings/", data);
export const submitFeedback = (data) => API.post("feedback/", data);


export const fetchCategories = () => API.get('/categories/');
export const fetchTags = () => API.get('/tags/');
export const fetchAuthor = (id) => API.get(`/authors/${id}/`);

import axios from "axios";

/**
 * @constant {AxiosInstance} API - Configured Axios instance for making API requests.
 * Sets the base URL for all requests and ensures JSON content type.
 */
const API = axios.create({
  baseURL: "https://captain001-bnd.onrender.com/api/", // Base URL for the API
  headers: {
    "Content-Type": "application/json", // Default content type for requests
  },
});

// --- GET Requests ---

/**
 * Fetches a list of all available services.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response containing services data.
 */
export const fetchServices = () => API.get("services/");

/**
 * Fetches a list of posts, with optional query parameters for filtering/pagination.
 * @param {object} [params] - Optional query parameters (e.g., { category: 'news', page: 1 }).
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response containing posts data.
 */
export const fetchPosts = (params) => API.get("posts/", { params });

/**
 * Fetches a single post by its ID.
 * @param {string|number} id - The unique identifier of the post.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response containing the specific post data.
 */
export const fetchPost = (id) => API.get(`posts/${id}/`);

/**
 * Fetches a list of promotions or advertisements.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response containing ads data.
 */
export const fetchAds = () => API.get("promotions/");

/**
 * Fetches a list of partners.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response containing partners data.
 */
export const fetchPartners = () => API.get("partners/");

/**
 * Fetches a list of events.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response containing events data.
 */
export const fetchEvents = () => API.get("events/");

/**
 * Fetches a list of post categories.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response containing categories data.
 */
export const fetchCategories = () => API.get("categories/");

/**
 * Fetches a list of tags.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response containing tags data.
 */
export const fetchTags = () => API.get("tags/");

/**
 * Fetches a list of all authors.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response containing authors data.
 */
export const fetchAuthors = () => API.get("authors/");

/**
 * Fetches a single author's details by their ID.
 * @param {string|number} id - The unique identifier of the author.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response containing the specific author data.
 */
export const fetchAuthor = (id) => API.get(`authors/${id}/`);

// --- POST Requests ---

/**
 * Submits a new comment.
 * @param {object} data - The comment data to be submitted (e.g., { postId: 1, author: 'John Doe', content: 'Great post!' }).
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response after comment submission.
 */
export const submitComment = (data) => API.post("comments/", data);

/**
 * Submits a new booking.
 * @param {object} data - The booking data to be submitted.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response after booking submission.
 */
export const submitBooking = (data) => API.post("bookings/", data);

/**
 * Submits new feedback.
 * @param {object} data - The feedback data to be submitted.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the API response after feedback submission.
 */
export const submitFeedback = (data) => API.post("feedback/", data);

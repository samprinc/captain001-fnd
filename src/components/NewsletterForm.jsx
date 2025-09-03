import { useState } from "react";
import axios from "axios";
import "./NewsletterForm.css";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/newsletter/`, { email });

      setSuccess(true);
      setError(null);
      setEmail("");
    } catch (err) {
      console.error("Newsletter signup failed", err);
      setError("Failed to subscribe. Try again!");
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" className="visually-hidden">
        Email Address
      </label>
      <input 
        type="email"
        id="newsletter-email"
        name="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <button type="submit">Subscribe</button>
      {success && <p className="success-message">Thank you for subscribing!</p>}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default NewsletterForm;

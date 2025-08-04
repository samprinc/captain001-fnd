import { useState } from "react";
import axios from "axios";
import "./NewsletterForm.css";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/newsletter/", { email });
      setSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("Newsletter signup failed", error);
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
    </form>
  );
}

export default NewsletterForm;

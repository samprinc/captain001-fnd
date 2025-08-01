import { useState } from "react";
import { submitFeedback } from "../api/api";
import "./Feedback.css";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "", rating: 5 });
    } catch (err) {
      console.error("Feedback submission failed:", err);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Send Us Your Feedback</h2>
      {submitted && <p className="success-msg">Thank you for your feedback!</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" required value={formData.message} onChange={handleChange}></textarea>
        <label>
          Rating:
          <select name="rating" value={formData.rating} onChange={handleChange}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;

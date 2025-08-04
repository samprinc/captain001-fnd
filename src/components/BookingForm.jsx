// src/components/BookingForm.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to read URL parameters
import { fetchServices, submitBooking } from "../api/api";
import Spinner from "./Spinner";
import "./BookingForm.css";

function BookingForm() {
  // Use a URL parameter to get the service title
  const { serviceTitle } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: serviceTitle ? decodeURIComponent(serviceTitle) : "", // Pre-fill service if available
    message: "",
  });
  const [services, setServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  useEffect(() => {
    fetchServices()
      .then((res) => {
        if (Array.isArray(res.data.results)) {
          setServices(res.data.results);
        } else {
          console.error("API response is not an array:", res.data);
          setServices([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    setSubmissionError("");

    try {
      await submitBooking(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      console.error("Booking submission failed:", err);
      setSubmissionError("Failed to submit booking. Please try again.");
    } finally {
      setSubmissionLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="booking-form-page-container">
      <div className="booking-form-card">
        <header className="booking-form-header">
          <h2>Book a Service</h2>
          <p>
            Tell us about your project and we'll get back to you with a personalized quote.
          </p>
        </header>

        {submitted && <p className="success-msg">Booking submitted successfully! We'll be in touch soon.</p>}
        {submissionError && <p className="error-msg">{submissionError}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="service">Service of Interest</label>
            <select id="service" name="service" required value={formData.service} onChange={handleChange}>
              <option value="">-- Select a Service --</option>
              {services.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Project Details</label>
            <textarea id="message" name="message" rows="4" placeholder="Briefly describe your project..." value={formData.message} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={submissionLoading}>
            {submissionLoading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
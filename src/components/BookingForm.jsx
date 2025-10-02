import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchServices, submitBooking } from "../api/api";
import "./BookingForm.css";

function BookingForm() {
  const { serviceTitle } = useParams();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  // Fetch services with React Query and caching
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetchServices();
      return Array.isArray(res.data.results) ? res.data.results : [];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  // Set default service if URL param is provided
  useEffect(() => {
    if (serviceTitle && services.length > 0) {
      const decoded = decodeURIComponent(serviceTitle).toLowerCase();
      const match = services.find((s) => s.title.toLowerCase() === decoded);
      if (match) {
        setFormData((prev) => ({ ...prev, service: match.id }));
      }
    }
  }, [serviceTitle, services]);

  // React Query mutation for booking submission
  const mutation = useMutation({
    mutationFn: submitBooking,
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    },
    onError: (err) => {
      console.error("Booking submission failed:", err);
      setSubmissionError("Failed to submit booking. Please try again.");
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionError("");
    mutation.mutate(formData);
  };

  // Skeleton loader while fetching services
  if (servicesLoading) {
    return (
      <div className="booking-form-page-container">
        <div className="booking-form-card skeleton">
          <div className="skeleton-text title"></div>
          <div className="skeleton-text subtitle"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton-input"></div>
          ))}
          <div className="skeleton-btn"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-form-page-container">
      <div className="booking-form-card">
        <header className="booking-form-header">
          <h2>Book a Service</h2>
          <p>Tell us about your project and we'll get back to you with a personalized quote.</p>
        </header>

        {submitted && (
          <p className="success-msg">
            Booking submitted successfully! We'll be in touch soon.
          </p>
        )}
        {submissionError && <p className="error-msg">{submissionError}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="service">Service of Interest</label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
            >
              <option value="">-- Select a Service --</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Project Details</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Briefly describe your project..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;

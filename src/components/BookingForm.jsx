import { useState, useEffect } from "react";
import { fetchServices, submitBooking } from "../api/api";
import "./BookingForm.css";

function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [services, setServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchServices()
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitBooking(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      console.error("Booking submission failed:", err);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book a Service</h2>
      {submitted && <p className="success-msg">Booking submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Your Phone Number" required value={formData.phone} onChange={handleChange} />

        <select name="service" required value={formData.service} onChange={handleChange}>
          <option value="">-- Select a Service --</option>
          {services.map((s) => (
            <option key={s.id} value={s.title}>{s.title}</option>
          ))}
        </select>

        <textarea name="message" placeholder="Your Message" rows="4" value={formData.message} onChange={handleChange}></textarea>

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;

import { useState } from "react";
import { toast } from "react-toastify";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Your Name" required value={form.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Your Email" required value={form.email} onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" rows="5" required value={form.message} onChange={handleChange}></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;

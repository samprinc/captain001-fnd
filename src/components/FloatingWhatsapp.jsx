import React from "react";
import "./FloatingWhatsapp.css";

const phoneNumber = "254742267006"; // Replace with your WhatsApp number in international format without '+'

function FloatingWhatsapp() {
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="floating-whatsapp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="white"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.843 11.843 0 0 0 12 0C5.37 0 0 5.37 0 12a11.85 11.85 0 0 0 2.37 7.35L0 24l4.75-2.34A11.936 11.936 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 21.6a9.496 9.496 0 0 1-5.06-1.41l-.36-.22-2.83 1.39 1.42-2.75-.24-.36A9.54 9.54 0 1 1 21.6 12 9.49 9.49 0 0 1 12 21.6zm5.48-7.6c-.3-.15-1.78-.88-2.06-.98s-.48-.15-.68.15-.78.98-.95 1.18-.35.22-.65.08a8.57 8.57 0 0 1-2.52-1.56 9.54 9.54 0 0 1-1.76-2.18c-.18-.3 0-.46.13-.61.13-.14.3-.36.45-.54.15-.18.2-.3.3-.5a.67.67 0 0 0 0-.5c-.15-.15-.68-1.62-.94-2.22s-.5-.5-.68-.5h-.58a1.36 1.36 0 0 0-1 .48 4.28 4.28 0 0 0-1.3 3.08 8.17 8.17 0 0 0 3.84 5.7 8.3 8.3 0 0 0 4.68 1.58 4.92 4.92 0 0 0 3.37-1.42 4.26 4.26 0 0 0 1.3-3.16c0-.15-.15-.3-.3-.36z" />
      </svg>
    </a>
  );
}

export default FloatingWhatsapp;

// src/pages/TermsAndConditions.jsx
import React from "react";
import "./LegalPages.css";

const TermsAndConditions = () => {
  return (
    <div className="legal-container">
      <h1>Terms & Conditions</h1>
      <p>Last updated: August 8, 2025</p>

      <p>
        These Terms & Conditions govern your use of CaptainMedia’s website and
        services. By accessing or using our platform, you agree to these terms.
      </p>

      <h2>1. Use of Our Services</h2>
      <ul>
        <li>You must be at least 13 years old to use our services.</li>
        <li>
          You agree not to use the platform for unlawful, harmful, or
          misleading purposes.
        </li>
        <li>
          You are responsible for the accuracy of any content you submit.
        </li>
      </ul>

      <h2>2. Intellectual Property</h2>
      <p>
        All content on CaptainMedia, including text, graphics, and logos, is
        our intellectual property or licensed to us. You may not copy, modify,
        or distribute it without permission.
      </p>

      <h2>3. Limitation of Liability</h2>
      <p>
        CaptainMedia is not liable for any indirect, incidental, or
        consequential damages resulting from your use of the platform.
      </p>

      <h2>4. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your account if you
        violate these terms.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        For questions about these Terms & Conditions, contact us at{" "}
            <a href="mailto:stephenndemo55@gmail.com">stephenndemo55@gmail.com</a>
      </p>
    </div>
  );
};

export default TermsAndConditions;

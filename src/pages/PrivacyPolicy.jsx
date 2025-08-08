// src/pages/PrivacyPolicy.jsx
import React from "react";
import "./LegalPages.css";

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      <h1>Privacy Policy</h1>
      <p>Last updated: August 8, 2025</p>

      <p>
        At CaptainMedia, we value your privacy and are committed to protecting
        your personal information. This Privacy Policy explains how we collect,
        use, and safeguard your data when you interact with our website and
        services.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>Personal details such as name, email address, and phone number.</li>
        <li>Usage data such as IP address, browser type, and pages visited.</li>
        <li>Any content you submit (comments, inquiries, etc.).</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We may use your data to:</p>
      <ul>
        <li>Provide and improve our services.</li>
        <li>Send you newsletters and marketing updates.</li>
        <li>Respond to your inquiries or feedback.</li>
      </ul>

      <h2>3. Sharing of Information</h2>
      <p>
        We do not sell or rent your personal data. We may share it only with
        trusted third parties who help us operate our services, and only as
        required by law.
      </p>

      <h2>4. Your Rights</h2>
      <p>
        You can request access to, correction of, or deletion of your personal
        data by contacting us at{" "}
            <a href="mailto:stephenndemo55@gmail.com">stephenndemo55@gmail.com</a>
      </p>

      <h2>5. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Updates will be
        posted on this page with a revised date.
      </p>
    </div>
  );
};

export default PrivacyPolicy;

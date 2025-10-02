import React from "react";
import "./PartnerMarquee.css";

const CLOUDINARY_BASE = "https://res.cloudinary.com/dco3yxmss/image/upload/";

function PartnerLogo({ partner }) {
  // Build the Cloudinary URL if image exists
  const logoUrl = partner.image ? `${CLOUDINARY_BASE}${partner.image}` : null;

  // Generate initials if name exists
  const initials = partner.name
    ? partner.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  if (!logoUrl) {
    return <div className="partner-initials">{initials}</div>;
  }

  return (
    <img
      src={logoUrl}
      alt={partner.name || "Partner"}
      title={partner.name || "Partner"}
      loading="lazy"
      className="partner-logo"
      onError={(e) => {
        // hide broken image and show initials
        e.target.style.display = "none";
        const initialsDiv = document.createElement("div");
        initialsDiv.className = "partner-initials";
        initialsDiv.innerText = initials;
        e.target.parentNode.appendChild(initialsDiv);
      }}
    />
  );
}

function PartnerMarquee({ partners = [] }) {
  return (
    <section className="partner-marquee">
      <h2 className="marquee-title">Our Partners</h2>
      <div className="marquee-track">
        {partners.map((partner, index) => (
          <div className="marquee-item" key={`${partner.id}-${index}`}>
            <a
              href={partner.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-link"
            >
              <div className="logo-container">
                <PartnerLogo partner={partner} />
              </div>
              <p className="partner-name">{partner.name}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PartnerMarquee;

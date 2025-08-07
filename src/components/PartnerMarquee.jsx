import React from "react";
import "./PartnerMarquee.css"; // Ensure you have the appropriate CSS for styling
const CLOUDINARY_BASE = "https://res.cloudinary.com/dco3yxmss/";


function PartnerMarquee({ partners = [] }) {
const scrollingPartners = partners;

  return (
    <section className="partner-marquee">
      <h2 className="marquee-title">Our Partners</h2>
      <div className="marquee-track">
        {scrollingPartners.map((partner, index) => {
          const logoUrl = partner.logo?.startsWith("http")
            ? partner.logo
            : CLOUDINARY_BASE + (partner.logo || "default-partner");

          return (
            <div className="marquee-item" key={`${partner.id}-${index}`}>
              <a
                href={partner.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-link"
              >
                <div className="logo-container">
                  <img
                    src={logoUrl}
                    alt={partner.name || "Partner"}
                    title={partner.name}
                    loading="lazy"
                    className="partner-logo"
                    onError={(e) => {
                      e.target.src = `${CLOUDINARY_BASE}default-partner`;
                    }}
                  />
                </div>
                <p className="partner-name">{partner.name}</p>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PartnerMarquee;
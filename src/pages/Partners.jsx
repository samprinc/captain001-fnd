import "./Partners.css";

const partnerData = [
  {
    id: 1,
    name: "Tesh Football Academy",
    description: "A fast rising football academy in the Gusii Region, training kids from age 4 - 17 at Kisii School.",
    link: "https://www.facebook.com/profile.php?id=100063717282710", // Assuming this is the link
    image: "path/to/tesh-logo.png", // Placeholder - replace with actual logo path
  },
  {
    id: 2,
    name: "Global Connections Football Club",
    description: "Nyanza Regional League Champions 2024 playing in the FKF Division 2 Central Zone C league. The team is based in Rigoma, Nyamira County.",
    link: "https://www.facebook.com/globalconnectionsfc", // Assuming this is the link
    image: "path/to/global-logo.png", // Placeholder
  },
  {
    id: 3,
    name: "Gucha Stars Fc",
    description: "The soccer team is the 2024 FKF Division 2 champions playing in FKF Division 1. The team plays home matches at Sameta Grounds - Kisii.",
    link: "https://www.facebook.com/GuchaStarsFc", // Assuming this is the link
    image: "path/to/gucha-logo.png", // Placeholder
  },
  {
    id: 4,
    name: "Tabaka Ward Uongozi Wa Utu (TAWUWU)",
    description: "The CBO is based in Tabaka, South Mugirango (Kisii). It seeks to champion the rights of the elderly and women through grassroot sensitization activities.",
    link: null, // No link provided for this partner
    image: "path/to/tawuwu-logo.png", // Placeholder
  },
];



function Partners() {
  return (
    <div className="partners-page-container">
      <div className="partners-intro">
        <h2>Our Partners</h2>
        <p>We are proud to work with a diverse range of partners who share our values and vision. Below are some of the organizations we have the privilege of collaborating with.</p>
      </div>

      <div className="partners-grid">
        {partnerData.map((partner) => (
          <div key={partner.id} className="partner-card">
            {partner.link ? (
              <a href={partner.link} target="_blank" rel="noopener noreferrer" className="partner-link">
                <img src={partner.image} alt={`${partner.name} Logo`} className="partner-logo" />
                <h3>{partner.name}</h3>
              </a>
            ) : (
              <>
                <img src={partner.image} alt={`${partner.name} Logo`} className="partner-logo" />
                <h3>{partner.name}</h3>
              </>
            )}
            <p>{partner.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Partners;
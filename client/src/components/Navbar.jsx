import { createGeneralInquiryMessage, createWhatsAppLink } from "../lib/storefront";

const NAV_ITEMS = [
  { id: "home", label: "HOME" },
  { id: "collection", label: "COLLECTION" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
  { id: "sizes", label: "SIZE CHART" }
];

export default function Navbar({ currentPage, onNavigate, onTrackInquiry }) {
  return (
    <header className="site-header wix-header">
      <nav className="wix-nav" id="mainNav">
        <button className="wix-brand" type="button" onClick={() => onNavigate("home")} aria-label="Go to home">
          <span className="logo-container">
            <img src="/assets/home-references/brand-monogram.png" alt="" />
            <span className="brand-name">Sneha&apos;s Boutique</span>
          </span>
        </button>

        <div className="wix-nav-right">
          <div className="wix-nav-links" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`wix-nav-btn ${currentPage === item.id ? "active" : ""}`}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <a
            className="wix-inquire-btn wix-header-cta"
            href={createWhatsAppLink(createGeneralInquiryMessage())}
            target="_blank"
            rel="noreferrer"
            onClick={onTrackInquiry}
          >
            Inquire Now
          </a>
        </div>
      </nav>
    </header>
  );
}

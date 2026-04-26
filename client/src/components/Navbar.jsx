import { useEffect, useState } from "react";
import { createGeneralInquiryMessage, createWhatsAppLink } from "../lib/storefront";
import Icon from "./Icon";

const NAV_ITEMS = [
  { id: "home", label: "HOME", mobileLabel: "Home", description: "Start here for the boutique highlights and newest arrivals." },
  { id: "collection", label: "COLLECTION", mobileLabel: "Collection", description: "Browse fabrics, handlooms, materials, and custom-made pieces." },
  { id: "about", label: "ABOUT", mobileLabel: "About", description: "Learn the story behind Sneha's Boutique and the craft." },
  { id: "contact", label: "CONTACT", mobileLabel: "Contact", description: "Reach the boutique quickly for design help and order guidance." },
  { id: "sizes", label: "SIZE CHART", mobileLabel: "Size Chart", description: "Check measurements before you order or message us." }
];

export default function Navbar({ currentPage, onNavigate, onTrackInquiry }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 860px)").matches : false
  );

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(max-width: 860px)");
    const handleChange = (event) => {
      setIsMobileViewport(event.matches);
      if (!event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    setIsMobileViewport(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="site-header wix-header">
      <nav className="wix-nav" id="mainNav">
        <button className="wix-brand" type="button" onClick={() => onNavigate("home")} aria-label="Go to home">
          <span className="logo-container">
            <img src="/assets/home-references/brand-monogram.png" alt="" />
            <span className="brand-name">Sneha&apos;s Boutique</span>
          </span>
        </button>

        {isMobileViewport ? (
          <button
            className="wix-mobile-menu-toggle"
            type="button"
            onClick={() => setIsMobileMenuOpen((previous) => !previous)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? "close" : "menu"} />
          </button>
        ) : null}

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

      {isMobileViewport ? (
        <div
          className={`wix-mobile-menu-overlay ${isMobileMenuOpen ? "show" : ""}`.trim()}
          onClick={closeMobileMenu}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="wix-mobile-menu-panel" onClick={(event) => event.stopPropagation()}>
            <div className="wix-mobile-menu-header">
              <div>
                <span className="wix-eyebrow">MENU</span>
                <h2>Explore the boutique easily</h2>
              </div>
              <button className="wix-mobile-menu-close" type="button" onClick={closeMobileMenu} aria-label="Close menu">
                <Icon name="close" />
              </button>
            </div>

            <div className="wix-mobile-menu-links" role="menu" aria-label="Mobile navigation links">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className={`wix-mobile-menu-link ${currentPage === item.id ? "active" : ""}`.trim()}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onNavigate(item.id);
                    closeMobileMenu();
                  }}
                >
                  <span className="wix-mobile-menu-link-title">{item.mobileLabel}</span>
                  <span className="wix-mobile-menu-link-text">{item.description}</span>
                </button>
              ))}
            </div>

            <a
              className="wix-inquire-btn wix-mobile-menu-cta"
              href={createWhatsAppLink(createGeneralInquiryMessage())}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                onTrackInquiry();
                closeMobileMenu();
              }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

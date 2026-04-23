import Icon from "./Icon";
import { createGeneralInquiryMessage, createWhatsAppLink } from "../lib/storefront";

const NAV_ITEMS = [
  { id: "collection", label: "Shop All" },
  { id: "home", label: "Collections" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "sizes", label: "Size Chart" }
];

export default function Navbar({ currentPage, onNavigate, onOpenWishlist, isScrolled, favoriteCount }) {
  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="top-announcement">Pure cotton handlooms, custom fits, and heartfelt craftsmanship.</div>

      <nav className="nav" id="mainNav">
        <button className="nav-brand" type="button" onClick={() => onNavigate("home")} aria-label="Go to home">
          <span className="nav-mark" aria-hidden="true">
            <img src="/assets/nav-logo.png" alt="" />
          </span>
          <span className="nav-copy">
            <span className="nav-name">Sneha&apos;s Boutique</span>
            <span className="nav-sub">Made with love</span>
          </span>
        </button>

        <div className="nav-menu" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${currentPage === item.id ? "on" : ""}`}
              onClick={() => onNavigate(item.id)}
              type="button"
              id={`nb-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <button className="icon-action" type="button" onClick={onOpenWishlist} aria-label="Open wishlist">
            <Icon name="heart" />
            {favoriteCount > 0 ? <span className="badge-dot">{favoriteCount}</span> : null}
          </button>
          <a
            className="nav-link-btn"
            href={createWhatsAppLink(createGeneralInquiryMessage())}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="message" />
            <span>WhatsApp</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

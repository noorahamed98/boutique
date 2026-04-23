import { useState } from "react";
import Icon from "./Icon";
import { createWhatsAppLink } from "../lib/storefront";

const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", page: "collection" },
      { label: "Collections", page: "home" },
      { label: "About Us", page: "about" }
    ]
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", page: "contact" },
      { label: "Size Chart", page: "sizes" },
      { label: "WhatsApp Support", href: createWhatsAppLink("Namaste Sneha's Boutique, I need help with my order.") }
    ]
  }
];

export default function SiteFooter({ onNavigate }) {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const message = [
      "Namaste Sneha's Boutique,",
      "I would like to join your community and receive updates on new arrivals and offers.",
      email ? `Email: ${email}` : ""
    ]
      .filter(Boolean)
      .join(" ");

    window.open(createWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <footer className="site-footer">
      <section className="community-band">
        <div>
          <span className="section-kicker">Join Our Community</span>
          <h2>Be the first to know about new arrivals and boutique updates.</h2>
        </div>
        <form className="community-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
          />
          <button className="pill-btn solid" type="submit">
            Subscribe
          </button>
        </form>
      </section>

      <section className="footer-grid">
        <div className="footer-brand">
          <img src="/assets/nav-logo.png" alt="Snehas Boutique logo" />
          <h3>Snehas Boutique</h3>
          <p>Made with love, attention to detail, and a deep respect for comfort, craft, and heritage.</p>
          <div className="footer-socials">
            <a href={createWhatsAppLink("Namaste Sneha's Boutique, I found you through the website.")} target="_blank" rel="noreferrer">
              <Icon name="message" />
            </a>
            <a href="mailto:hello@snehasboutique.com">
              <Icon name="mail" />
            </a>
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div className="footer-column" key={column.title}>
            <h4>{column.title}</h4>
            <div className="footer-links">
              {column.links.map((link) =>
                link.page ? (
                  <button key={link.label} type="button" onClick={() => onNavigate(link.page)}>
                    {link.label}
                  </button>
                ) : (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>
        ))}

        <div className="footer-column">
          <h4>Get In Touch</h4>
          <div className="footer-contact-list">
            <div>
              <strong>Phone</strong>
              <span>8008088088</span>
            </div>
            <div>
              <strong>Email</strong>
              <span>hello@snehasboutique.com</span>
            </div>
            <div>
              <strong>Studio</strong>
              <span>Ongole, Andhra Pradesh</span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

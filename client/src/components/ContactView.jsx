import { useMemo, useState } from "react";
import Icon from "./Icon";
import { createGeneralInquiryMessage, createWhatsAppLink } from "../lib/storefront";

const FAQ_ITEMS = [
  {
    question: "How do I place an order?",
    answer: "Message us on WhatsApp with the design you like, your size or measurements, and your preferred delivery timeline."
  },
  {
    question: "Can I order only fabrics?",
    answer: "Yes. Fabrics can be purchased separately, and we can also help you plan styling or stitching around them."
  },
  {
    question: "Do you offer custom-made outfits?",
    answer: "Yes. Custom fits and custom styles are part of Snehas Boutique's core offering."
  },
  {
    question: "How should I share measurements?",
    answer: "You can share standard size details or exact body measurements on WhatsApp, and we will guide you if needed."
  }
];

export default function ContactView() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactMessage = useMemo(() => {
    return [
      "Namaste Sneha's Boutique,",
      form.name ? `Name: ${form.name}` : "",
      form.email ? `Email: ${form.email}` : "",
      form.subject ? `Subject: ${form.subject}` : "",
      form.message ? `Message: ${form.message}` : createGeneralInquiryMessage()
    ]
      .filter(Boolean)
      .join(" ");
  }, [form]);

  function handleChange(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.open(createWhatsAppLink(contactMessage), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <section className="contact-hero">
        <div>
          <span className="section-kicker">Get In Touch</span>
          <h1 className="contact-title">We&apos;d love to hear from you.</h1>
          <p className="contact-sub">
            Reach out for fabrics, handlooms, custom orders, sizing help, or delivery guidance.
          </p>
        </div>
      </section>

      <section className="contact-layout">
        <div className="contact-info-panel">
          <h2>Contact Information</h2>
          <div className="contact-list">
            <div className="contact-list-item">
              <span className="c-icon">
                <Icon name="mail" />
              </span>
              <div>
                <div className="c-label">Email</div>
                <div className="c-val">hello@snehasboutique.com</div>
              </div>
            </div>
            <div className="contact-list-item">
              <span className="c-icon">
                <Icon name="phone" />
              </span>
              <div>
                <div className="c-label">Phone / WhatsApp</div>
                <div className="c-val">8008088088</div>
              </div>
            </div>
            <div className="contact-list-item">
              <span className="c-icon">
                <Icon name="location" />
              </span>
              <div>
                <div className="c-label">Visit Us</div>
                <div className="c-val">Snehas Boutique, Ongole, Andhra Pradesh</div>
              </div>
            </div>
          </div>

          <a className="wa-link" href={createWhatsAppLink(createGeneralInquiryMessage())} target="_blank" rel="noreferrer">
            <Icon name="message" />
            Start WhatsApp Chat
          </a>
        </div>

        <form className="contact-form-panel" onSubmit={handleSubmit}>
          <h2>Send Us A Message</h2>
          <div className="contact-form-grid">
            <label className="contact-field">
              <span>Name</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => handleChange("name", event.target.value)}
                placeholder="Your name"
              />
            </label>
            <label className="contact-field">
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => handleChange("email", event.target.value)}
                placeholder="your@email.com"
              />
            </label>
            <label className="contact-field full">
              <span>Subject</span>
              <input
                type="text"
                value={form.subject}
                onChange={(event) => handleChange("subject", event.target.value)}
                placeholder="How can we help?"
              />
            </label>
            <label className="contact-field full">
              <span>Message</span>
              <textarea
                value={form.message}
                onChange={(event) => handleChange("message", event.target.value)}
                placeholder="Tell us about the design, category, or measurements you need help with."
              />
            </label>
          </div>
          <button className="pill-btn solid submit-btn" type="submit">
            Send Message
          </button>
        </form>
      </section>

      <section className="faq-section">
        <div className="section-heading centered">
          <div>
            <span className="section-kicker">Frequently Asked Questions</span>
            <h2>Common boutique questions</h2>
          </div>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

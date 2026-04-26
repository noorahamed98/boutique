import { useMemo, useState } from "react";
import {
  BUSINESS_ADDRESS,
  BUSINESS_PHONE_DISPLAY,
  createWhatsAppLink
} from "../lib/storefront";

const CONTACT_COLUMNS = [
  {
    title: "WHATSAPP",
    text: `${BUSINESS_PHONE_DISPLAY} for instant design inquiries and customization support.`
  },
  {
    title: "PHONE",
    text: `${BUSINESS_PHONE_DISPLAY} for boutique guidance and order updates.`
  },
  {
    title: "BOUTIQUE ADDRESS",
    text: BUSINESS_ADDRESS
  }
];

export default function ContactView({ onTrackInquiry }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    message: ""
  });

  const contactMessage = useMemo(() => {
    return [
      "Hai Sneha's Boutique,",
      form.firstName || form.lastName ? `Name: ${form.firstName} ${form.lastName}`.trim() : "",
      form.phone ? `Phone: ${form.phone}` : "",
      form.message ? `Message: ${form.message}` : "I would like help finding the right handcrafted piece for my collection."
    ]
      .filter(Boolean)
      .join(" ");
  }, [form.firstName, form.lastName, form.message, form.phone]);

  function handleChange(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onTrackInquiry();
    window.open(createWhatsAppLink(contactMessage), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <section className="wix-page-shell wix-contact-page">
        <h1>Get in Touch</h1>
        <p className="wix-contact-intro">
          We are here to help you find the perfect handcrafted piece for your collection.
          Reach out on WhatsApp or phone for fabrics, custom-made apparel, and size guidance.
        </p>

        <form className="wix-contact-form" onSubmit={handleSubmit}>
          <label>
            <span>First Name *</span>
            <input
              type="text"
              value={form.firstName}
              onChange={(event) => handleChange("firstName", event.target.value)}
              placeholder="How may we address you?"
            />
          </label>

          <label>
            <span>Last Name *</span>
            <input
              type="text"
              value={form.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
              placeholder="Your family name"
            />
          </label>

          <label>
            <span>Phone Number</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              placeholder="Your preferred contact number"
            />
          </label>

          <label className="full">
            <span>Message</span>
            <textarea
              value={form.message}
              onChange={(event) => handleChange("message", event.target.value)}
              placeholder="Tell us about the fabric, design style, occasion, or customization you have in mind."
            />
          </label>

          <div className="full">
            <button className="wix-inquire-btn inline" type="submit">
              Send Inquiry
            </button>
          </div>
        </form>
      </section>

      <section className="wix-page-shell wix-contact-columns">
        {CONTACT_COLUMNS.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

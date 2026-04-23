import Icon from "./Icon";
import { createGeneralInquiryMessage, createWhatsAppLink } from "../lib/storefront";

const VALUES = [
  {
    title: "Pure Comfort",
    text: "Beautiful clothing should also feel soft, breathable, and easy to wear every day.",
    icon: "cotton"
  },
  {
    title: "Heritage Craft",
    text: "Every handloom weave carries the beauty of craftsmanship and the story of skilled weavers.",
    icon: "loom"
  },
  {
    title: "Handmade With Love",
    text: "Each design is thoughtfully created with care in every stitch, detail, and finish.",
    icon: "handmade"
  },
  {
    title: "Trust & Happiness",
    text: "Customer loyalty, trust, and heartfelt service sit at the center of everything we do.",
    icon: "heart"
  }
];

function designImage(design) {
  return design?.image || "/assets/boutique-logo.jpg";
}

export default function AboutView({ heroDesign, galleryDesigns, onNavigate }) {
  return (
    <>
      <section
        className="about-hero-banner"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(28, 22, 24, 0.3), rgba(28, 22, 24, 0.5)), url(${designImage(
            heroDesign
          )})`
        }}
      >
        <div className="about-hero-copy">
          <span className="section-kicker light">Our Story</span>
          <h1 className="about-hero-title">Where style meets comfort and every outfit is made with care.</h1>
        </div>
      </section>

      <section className="about-story-shell">
        <div className="about-story-copy">
          <span className="section-kicker">About Us</span>
          <h2 className="about-h">Welcome to Snehas Boutique</h2>
          <p className="about-p">
            Welcome to Snehas Boutique, where style meets comfort and every outfit is made with care.
            We believe clothing should not only look beautiful but also feel soft, comfortable, and
            confident to wear every day.
          </p>
          <p className="about-p">
            At Snehas Boutique, we specialize in outfits crafted from pure cotton fabrics and
            traditional handloom weaves, chosen for their softness, breathability, and quality. From
            skilled weavers to you, every piece carries the beauty of craftsmanship and heritage.
          </p>
          <p className="about-p">
            Each design is thoughtfully created and handmade with love, with attention to every
            stitch, detail, and finish. Our goal is to bring you timeless fashion that blends
            elegance, comfort, and everyday wearability.
          </p>
          <p className="about-p">
            We value loyalty, trust, and customer happiness above everything. Every customer is part
            of the Snehas Boutique family, and we are committed to providing quality products and
            heartfelt service.
          </p>
        </div>

        <aside className="about-story-side">
          <div className="about-side-card">
            <span className="section-kicker">Signature Promise</span>
            <h3 className="about-contact-h">Made with Love, Worn with Confidence.</h3>
            <div className="contact-block">
              <div className="c-row">
                <div className="c-icon">
                  <Icon name="cotton" />
                </div>
                <div>
                  <div className="c-label">Materials</div>
                  <div className="c-val">Pure cotton, handloom weaves, and soft comfortable finishes.</div>
                </div>
              </div>
              <div className="c-row">
                <div className="c-icon">
                  <Icon name="ruler" />
                </div>
                <div>
                  <div className="c-label">Speciality</div>
                  <div className="c-val">Fabrics, handlooms, materials, and custom-made outfits.</div>
                </div>
              </div>
              <div className="c-row">
                <div className="c-icon">
                  <Icon name="message" />
                </div>
                <div>
                  <div className="c-label">Ordering</div>
                  <div className="c-val">Warm WhatsApp support for style, fit, pricing, and delivery.</div>
                </div>
              </div>
            </div>
            <div className="side-actions">
              <a className="wa-link" href={createWhatsAppLink(createGeneralInquiryMessage())} target="_blank" rel="noreferrer">
                <Icon name="message" />
                Chat on WhatsApp
              </a>
              <button className="pill-btn" type="button" onClick={() => onNavigate("collection")}>
                Explore Collection
              </button>
            </div>
          </div>
        </aside>
      </section>

      <section className="about-values-section">
        <div className="section-heading centered">
          <div>
            <span className="section-kicker">What We Stand For</span>
            <h2>Comfort, heritage, quality, and care</h2>
          </div>
        </div>
        <div className="about-values-grid">
          {VALUES.map((value) => (
            <article className="about-value-card" key={value.title}>
              <div className="val-icon">
                <Icon name={value.icon} />
              </div>
              <div className="val-title">{value.title}</div>
              <div className="val-desc">{value.text}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="founder-section">
        <div className="founder-media">
          <img src="/assets/boutique-logo.jpg" alt="Snehas Boutique founder placeholder" />
        </div>
        <div className="founder-copy">
          <span className="section-kicker">Meet the Founder</span>
          <h2>Built with heart, guided by comfort, and shaped by trust.</h2>
          <p>
            Snehas Boutique was created to offer timeless fashion that feels elegant, comfortable,
            and easy to wear. The vision is simple: make beautiful clothing that honors traditional
            weaving, careful craftsmanship, and the confidence women feel in well-made outfits.
          </p>
          <p>
            Every step of the boutique is rooted in care, quality, and the belief that fashion
            should feel as beautiful as it looks.
          </p>
        </div>
      </section>

      <section className="about-gallery-section">
        <div className="section-heading centered">
          <div>
            <span className="section-kicker">Behind the Scenes</span>
            <h2>A closer look at the boutique world</h2>
          </div>
        </div>
        {galleryDesigns.length > 0 ? (
          <div className="behind-scenes-grid">
            {galleryDesigns.map((design) => (
              <div className="behind-scenes-tile" key={design.id}>
                <img src={designImage(design)} alt={design.name} />
              </div>
            ))}
          </div>
        ) : (
          <div className="featured-empty">
            <strong>Behind-the-scenes visuals will appear here</strong>
            <span>Add a few collection images and this gallery will become a richer editorial section.</span>
          </div>
        )}
      </section>
    </>
  );
}

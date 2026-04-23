import Icon from "./Icon";
import {
  createGeneralInquiryMessage,
  createWhatsAppLink,
  formatCurrency
} from "../lib/storefront";

const CORE_PROMISES = [
  {
    icon: "cotton",
    title: "Pure Cotton Handlooms",
    text: "Soft, breathable, and comfortable for everyday wear."
  },
  {
    icon: "loom",
    title: "Handloom From Weavers",
    text: "Supporting traditional craftsmanship from skilled weaving communities."
  },
  {
    icon: "ruler",
    title: "Custom Fits For You",
    text: "Made to measure and styled around your preference."
  },
  {
    icon: "handmade",
    title: "Handmade With Love",
    text: "Every stitch, detail, and finish is crafted with care."
  },
  {
    icon: "package",
    title: "Packed With Care",
    text: "Thoughtful packaging for a beautiful boutique experience."
  }
];

const TRUST_VALUES = [
  {
    icon: "spark",
    title: "Everyday Wear",
    text: "Elegant silhouettes that stay easy and comfortable to wear."
  },
  {
    icon: "heart",
    title: "Loyalty & Trust",
    text: "Every customer is part of the Snehas Boutique family."
  },
  {
    icon: "shield",
    title: "Quality Promise",
    text: "Carefully chosen fabrics, refined finishing, and reliable quality."
  },
  {
    icon: "message",
    title: "Customer Happiness",
    text: "Warm, personal guidance before and after each order."
  }
];

const TESTIMONIALS = [
  {
    name: "Anitha R.",
    quote: "The fabrics feel so soft and the stitching looks very neat. It feels premium and comfortable at the same time."
  },
  {
    name: "Sindhu M.",
    quote: "I loved the handloom finish and the personal attention. The outfit looked elegant and fit beautifully."
  },
  {
    name: "Keerthana S.",
    quote: "Snehas Boutique has that rare mix of comfort, trust, and quality. The WhatsApp ordering flow was also very easy."
  }
];

function designImage(design) {
  return design?.image || "/assets/boutique-logo.jpg";
}

export default function HomeView({
  onNavigate,
  onExploreCategory,
  heroDesign,
  newArrivals,
  collectionHighlights,
  customerFavorites,
  inspirationDesigns,
  storyDesign,
  loading,
  onOpenDesign
}) {
  const fabricsDesign = collectionHighlights.find((item) => item.name === "Fabrics")?.design || null;
  const customDesign = collectionHighlights.find((item) => item.name === "Custom Made")?.design || null;

  return (
    <>
      <section
        className="editorial-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(26, 21, 23, 0.62), rgba(26, 21, 23, 0.18)), url(${designImage(
            heroDesign
          )})`
        }}
      >
        <div className="hero-overlay-copy">
          <div className="hero-tag">Soft Cotton. Timeless Handlooms.</div>
          <h1 className="hero-h1">Made with Love, Worn with Confidence.</h1>
          <p className="hero-p">
            Snehas Boutique brings together pure cotton fabrics, handloom weaves, elegant details,
            and custom-made styles designed to feel beautiful, soft, and comfortable every day.
          </p>
          <div className="hero-actions">
            <button className="pill-btn solid" type="button" onClick={() => onNavigate("collection")}>
              Shop Now
            </button>
            <button className="pill-btn soft-light" type="button" onClick={() => onNavigate("about")}>
              Our Story
            </button>
          </div>
        </div>
      </section>

      <section className="promise-strip">
        {CORE_PROMISES.map((item) => (
          <article className="promise-card" key={item.title}>
            <span className="promise-icon">
              <Icon name={item.icon} />
            </span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="dual-feature-band">
        <article className="feature-story-card">
          <div className="feature-story-copy">
            <span className="section-kicker">Shop Fabrics</span>
            <h2>Explore pure cotton and soft handpicked prints.</h2>
            <p>
              You can also shop fabrics separately and build your own look around breathable cotton,
              handloom textures, and boutique-ready finishing.
            </p>
            <button className="pill-btn" type="button" onClick={() => onExploreCategory("Fabrics")}>
              Explore Fabrics
            </button>
          </div>
          <div className="feature-story-media">
            <img src={designImage(fabricsDesign)} alt={fabricsDesign?.name || "Snehas Boutique fabrics"} />
          </div>
        </article>

        <article className="feature-story-card reverse">
          <div className="feature-story-copy">
            <span className="section-kicker">Customization</span>
            <h2>Custom fits and custom styles made just for you.</h2>
            <p>
              Share your measurements, styling ideas, and occasion details. We create clothing that
              feels personal, elegant, and easy to wear.
            </p>
            <button className="pill-btn" type="button" onClick={() => onExploreCategory("Custom Made")}>
              Start Custom Order
            </button>
          </div>
          <div className="feature-story-media">
            <img src={designImage(customDesign)} alt={customDesign?.name || "Snehas Boutique customization"} />
          </div>
        </article>
      </section>

      <section className="trust-band">
        {TRUST_VALUES.map((item) => (
          <article className="trust-card" key={item.title}>
            <span className="trust-icon">
              <Icon name={item.icon} />
            </span>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="featured-section">
        <div className="section-heading centered">
          <div>
            <span className="section-kicker">New Arrivals</span>
            <h2>Fresh styles for the current edit</h2>
            <p className="section-sub">Soft silhouettes, elegant details, and new additions to the boutique.</p>
          </div>
        </div>

        {newArrivals.length > 0 ? (
          <div className="product-gallery-grid">
            {newArrivals.map((design) => (
              <button className="gallery-card" type="button" key={design.id} onClick={() => onOpenDesign(design)}>
                <div className="gallery-card-media">
                  <img src={designImage(design)} alt={design.name} />
                  <span className="arrival-badge">{design.badge}</span>
                </div>
                <div className="gallery-card-copy">
                  <strong>{design.name}</strong>
                  <span>{design.category}</span>
                  <div>{formatCurrency(design.price)}</div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="featured-empty">
            <strong>{loading ? "Loading the latest boutique edit" : "New arrivals will appear here"}</strong>
            <span>
              {loading
                ? "Please wait while the collection is loading."
                : "Add a few designs to turn this area into a boutique-style arrivals section."}
            </span>
          </div>
        )}
      </section>

      <section className="featured-section soft-section">
        <div className="section-heading centered">
          <div>
            <span className="section-kicker">Shop By Collection</span>
            <h2>Collections built around comfort and craft</h2>
            <p className="section-sub">Each category carries its own story, finish, and boutique mood.</p>
          </div>
        </div>

        <div className="collection-story-grid">
          {collectionHighlights.map((item) => (
            <button
              key={item.name}
              className="collection-story-card"
              type="button"
              onClick={() => onExploreCategory(item.name)}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(23, 18, 19, 0.08), rgba(23, 18, 19, 0.62)), url(${designImage(
                  item.design
                )})`
              }}
            >
              <div className="collection-story-copy">
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                <span>Explore Collection</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading centered">
          <div>
            <span className="section-kicker">Customer Favorites</span>
            <h2>Most-loved boutique picks</h2>
            <p className="section-sub">Chosen for comfort, styling ease, and timeless appeal.</p>
          </div>
        </div>

        {customerFavorites.length > 0 ? (
          <div className="product-gallery-grid">
            {customerFavorites.map((design) => (
              <button className="gallery-card favorite" type="button" key={design.id} onClick={() => onOpenDesign(design)}>
                <div className="gallery-card-media">
                  <img src={designImage(design)} alt={design.name} />
                </div>
                <div className="gallery-card-copy">
                  <strong>{design.name}</strong>
                  <span>{design.category}</span>
                  <div>{formatCurrency(design.price)}</div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="featured-empty">
            <strong>Customer favorites will appear here</strong>
            <span>As the boutique collection grows, the most-loved pieces will be highlighted in this space.</span>
          </div>
        )}
      </section>

      <section className="story-split-section">
        <div className="story-split-media">
          <img src={designImage(storyDesign)} alt={storyDesign?.name || "Snehas Boutique story"} />
        </div>
        <div className="story-split-copy">
          <span className="section-kicker">Our Story</span>
          <h2>Where soft comfort meets handcrafted elegance.</h2>
          <p>
            At Snehas Boutique, we specialize in outfits made from pure cotton fabrics and traditional
            handloom weaves, chosen for their softness, breathability, and quality.
          </p>
          <p>
            Every piece is thoughtfully created and handmade with love, carrying the beauty of
            craftsmanship and heritage from skilled weavers to you.
          </p>
          <button className="pill-btn" type="button" onClick={() => onNavigate("about")}>
            Read More About Us
          </button>
        </div>
      </section>

      <section className="featured-section soft-section">
        <div className="section-heading centered">
          <div>
            <span className="section-kicker">Style Inspiration</span>
            <h2>Daily boutique moodboard</h2>
            <p className="section-sub">A softer, editorial gallery inspired by your shared references.</p>
          </div>
        </div>

        {inspirationDesigns.length > 0 ? (
          <div className="inspiration-grid">
            {inspirationDesigns.map((design) => (
              <button className="inspiration-tile" type="button" key={design.id} onClick={() => onOpenDesign(design)}>
                <img src={designImage(design)} alt={design.name} />
              </button>
            ))}
          </div>
        ) : (
          <div className="featured-empty">
            <strong>Style inspiration is on the way</strong>
            <span>As soon as more visuals are added, this gallery will feel much closer to your shared references.</span>
          </div>
        )}
      </section>

      <section className="testimonial-section">
        <div className="section-heading centered">
          <div>
            <span className="section-kicker">What Our Customers Say</span>
            <h2>Kind words from the Snehas Boutique family</h2>
          </div>
        </div>

        <div className="testimonial-grid">
          {TESTIMONIALS.map((item) => (
            <article className="testimonial-card" key={item.name}>
              <div className="rating-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon key={star} name="star" />
                ))}
              </div>
              <p>{item.quote}</p>
              <strong>{item.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <span className="section-kicker">Start Your Order</span>
          <h2>Message us for fabrics, handlooms, materials, or custom-made outfits.</h2>
        </div>
        <a className="pill-link" href={createWhatsAppLink(createGeneralInquiryMessage())} target="_blank" rel="noreferrer">
          <Icon name="message" />
          Chat on WhatsApp
        </a>
      </section>
    </>
  );
}

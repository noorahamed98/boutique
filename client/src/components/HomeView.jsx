import {
  createGeneralInquiryMessage,
  createWhatsAppLink
} from "../lib/storefront";
import ScrollReveal from "./ScrollReveal";
import AutoScrollGallery from "./AutoScrollGallery";

const HANDPICKED_REFERENCE_IMAGE = "/assets/home-references/handpicked-hd.png";
const HERO_REFERENCE_IMAGE = "/assets/nav-logo.png";

const TESTIMONIALS = [
  {
    quote: "The handcrafted fabrics at Sneha's Boutique are truly exceptional. Every piece feels like a work of art.",
    name: "ELENA R."
  },
  {
    quote: "A truly premium experience from start to finish. The customization process was seamless and the final product was beautiful.",
    name: "PRIYA S."
  }
];

const SIGNATURE_CARDS = [
  {
    name: "FABRICS",
    category: "Fabrics",
    image: "/assets/home-references/signature-fabrics-solo-hd.png",
    revealClass: "image-reveal-from-left"
  },
  {
    name: "HANDLOOMS",
    category: "Handlooms",
    image: "/assets/home-references/signature-handlooms-solo-hd.png",
    revealClass: "image-reveal-from-bottom"
  },
  {
    name: "MATERIALS",
    category: "Materials",
    image: "/assets/home-references/signature-materials-solo-hd.png",
    revealClass: "image-reveal-from-top"
  },
  {
    name: "CUSTOM MADE",
    category: "Custom Made",
    image: "/assets/home-references/signature-custom-solo-hd.png",
    revealClass: "image-reveal-from-right"
  }
];

const ARRIVAL_CARDS = [
  {
    name: "Handloom Silk Blend",
    image: "/assets/home-references/arrival-handloom-silk-blend-solo-hd.png",
    revealClass: "image-reveal-from-left"
  },
  {
    name: "Pure Cotton Organza",
    image: "/assets/home-references/arrival-pure-cotton-organza-solo-hd.png",
    revealClass: "image-reveal-from-bottom"
  },
  {
    name: "Custom Gold Thread",
    image: "/assets/home-references/arrival-custom-gold-thread-solo-hd.png",
    revealClass: "image-reveal-from-right"
  }
];

const HANDPICKED_HOTSPOT = {
  left: 52.7,
  top: 59.8,
  width: 17.4,
  height: 12.2
};

function featureInquiryMessage(name) {
  return [
    "Hai Sneha's Boutique,",
    `I am interested in "${name}" from the home page.`,
    "Please share pricing, availability, and customization options."
  ].join(" ");
}

function hotspotStyle({ left, top, width, height }) {
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${width}%`,
    height: `${height}%`
  };
}

export default function HomeView({
  onNavigate,
  onExploreCategory,
  onOpenFavorites,
  onTrackInquiry,
  heroDesign,
  collectionHighlights,
  favoriteCount,
  storyDesign,
  inspirationDesigns
}) {
  const collageDesigns = (
    inspirationDesigns.length ? inspirationDesigns : collectionHighlights.map((item) => item.design).filter(Boolean)
  ).slice(0, 6);
  const handleFavoritesClick = () => {
    if (favoriteCount > 0) {
      onOpenFavorites();
      return;
    }

    onNavigate("collection");
  };

  return (
    <>
      <section className="wix-page-shell home-wix-hero">
        <ScrollReveal className="home-hero-media home-hero-media-brand" direction="left">
          <div className="home-hero-brand-plate">
            <img
              src={HERO_REFERENCE_IMAGE}
              alt="Sneha's Boutique Fashion Studio logo"
              className="home-hero-brand-image"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal className="home-hero-copy" direction="right" delay={100}>
          <span className="wix-eyebrow">CURATED COLLECTION</span>
          <h1>
            <span>HANDCRAF</span>
            <span>TED</span>
            <span>ELEGANCE</span>
            <span>FOR THE</span>
            <span>MODERN</span>
            <span>SOUL</span>
          </h1>
          <p>
            We specialize in premium fabrics and bespoke apparel, blending artisanal craftsmanship
            with contemporary design for a truly unique boutique experience.
          </p>
          <button className="wix-inquire-btn inline home-hero-cta" type="button" onClick={() => onNavigate("collection")}>
            <>
              Shop the
              <br />
              Collection
            </>
          </button>
        </ScrollReveal>
      </section>

      <section className="home-signature-band">
        <div className="wix-page-shell home-curated-section home-curated-section-dark">
          <ScrollReveal as="h2" className="home-section-title home-section-title-light" direction="up">
            Our Signature Collections
          </ScrollReveal>

          <div className="home-image-card-grid signature-grid">
            {SIGNATURE_CARDS.map((item, index) => (
              <ScrollReveal
                key={item.category}
                className={`home-image-card image-reveal-card ${item.revealClass}`}
                direction="up"
                delay={index * 90}
              >
                <button
                  className="home-image-card-button home-image-card-button-dark"
                  type="button"
                  aria-label={`Explore ${item.category}`}
                  title={`Explore ${item.category}`}
                  onClick={() => onExploreCategory(item.category)}
                >
                  <div className="home-image-card-media signature-card-media">
                    <img src={item.image} alt={item.category} />
                  </div>
                  <span className="home-image-card-label">{item.name}</span>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wix-page-shell home-curated-section home-curated-section-light">
        <ScrollReveal as="h2" className="home-section-title home-section-title-dark" direction="up">
          New Arrivals
        </ScrollReveal>

        <div className="home-image-card-grid arrivals-grid">
          {ARRIVAL_CARDS.map((item, index) => (
            <ScrollReveal
              key={item.name}
              className={`home-image-card image-reveal-card ${item.revealClass}`}
              direction="up"
              delay={index * 110}
            >
              <div className="home-image-card-shell home-image-card-shell-light">
                <a
                  className="home-image-card-button home-image-card-button-light"
                  href={createWhatsAppLink(featureInquiryMessage(item.name))}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onTrackInquiry}
                  aria-label={`Inquire about ${item.name} on WhatsApp`}
                  title={`Inquire about ${item.name}`}
                >
                  <div className="home-image-card-media arrival-card-media">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <span className="home-arrival-card-label">{item.name}</span>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="wix-page-shell home-reference-section home-reference-section-light">
        <div className="home-reference-scroller">
          <ScrollReveal className="home-reference-display handpicked" direction="up">
            <img src={HANDPICKED_REFERENCE_IMAGE} alt="Handpicked section" />

            <div className="home-hotspot-layer">
              <button
                className="home-image-hotspot"
                type="button"
                style={hotspotStyle(HANDPICKED_HOTSPOT)}
                aria-label="View all favorites"
                title="View all favorites"
                onClick={handleFavoritesClick}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="wix-page-shell wix-testimonial-section">
        <ScrollReveal as="h2" direction="up">
          Kind Words from Our Community
        </ScrollReveal>
        {TESTIMONIALS.map((item, index) => (
          <ScrollReveal as="blockquote" key={item.name} className="wix-testimonial-quote" direction="up" delay={index * 120}>
            <p>"{item.quote}"</p>
            <footer>{item.name}</footer>
          </ScrollReveal>
        ))}
      </section>

      <section className="wix-page-shell wix-story-panel">
        <ScrollReveal className="wix-story-panel-inner" direction="up">
          <h2>Our Story</h2>
          <p>
            At Sneha's Boutique, we believe that true elegance lies in the details. Since 2014, we have
            been dedicated to sourcing and crafting pure cotton fabrics that breathe with life. Our journey
            is one of artisanal dedication, where every handloom tells a story of heritage and every custom-made
            piece is a testament to our commitment to quality.
          </p>
          <button className="wix-story-link" type="button" onClick={() => onNavigate("about")}>
            Read Full Story
          </button>
        </ScrollReveal>
      </section>

      <section className="wix-page-shell wix-home-collage">
        <ScrollReveal direction="up">
          <AutoScrollGallery
            designs={collageDesigns.length ? collageDesigns : [storyDesign].filter(Boolean)}
            ariaLabel="Recently uploaded boutique designs"
          />
        </ScrollReveal>
      </section>

      <section className="wix-page-shell wix-home-inquire-row">
        <ScrollReveal
          as="a"
          className="wix-inquire-btn inline"
          href={createWhatsAppLink(createGeneralInquiryMessage())}
          target="_blank"
          rel="noreferrer"
          onClick={onTrackInquiry}
          direction="up"
        >
          Inquire Now
        </ScrollReveal>
      </section>
    </>
  );
}

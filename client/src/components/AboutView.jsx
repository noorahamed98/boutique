import ScrollReveal from "./ScrollReveal";

function designImage(design) {
  return design?.image || "/assets/boutique-logo.jpg";
}

export default function AboutView({ heroDesign, galleryDesigns }) {
  const previewImages = (galleryDesigns || []).slice(0, 3);

  return (
    <>
      <section className="wix-page-shell wix-simple-page">
        <ScrollReveal direction="up">
          <h1>About Us - Snehas Boutique</h1>
          <p>
            Welcome to Snehas Boutique, where style meets comfort and every outfit is made with care.
            We believe clothing should not only look beautiful but also feel soft, comfortable, and
            confident to wear every day.
          </p>
          <p>
            At Snehas Boutique, we specialize in outfits crafted from pure cotton fabrics and traditional
            handloom weaves, chosen for their softness, breathability, and quality. From skilled weavers
            to you, every piece carries the beauty of craftsmanship and heritage. Each design is thoughtfully
            created and handmade with love, with attention to every stitch, detail, and finish.
          </p>
        </ScrollReveal>
      </section>

      <section className="wix-page-shell wix-story-panel about-story-panel">
        <ScrollReveal className="wix-story-panel-inner" direction="up">
          <h2>Our Story</h2>
          <p>
            At Sneha's Boutique, we believe that true elegance lies in the details. Since 2014, we have
            been dedicated to sourcing and crafting pure cotton fabrics that breathe with life. Our journey
            is one of artisanal dedication, where every handloom tells a story of heritage and every custom-made
            piece is a testament to our commitment to quality. We invite you to explore a world where premium
            craftsmanship meets contemporary style.
          </p>
        </ScrollReveal>
      </section>

      <section className="wix-page-shell wix-home-collage about-collage">
        {(previewImages.length ? previewImages : [heroDesign]).filter(Boolean).map((design, index) => (
          <ScrollReveal
            key={design?.id || index}
            className={`wix-home-collage-tile tile-${index + 1}`}
            direction={index === 1 ? "up" : index === 0 ? "left" : "right"}
            delay={index * 120}
          >
            <img src={designImage(design)} alt={design?.name || "Sneha's Boutique gallery"} />
          </ScrollReveal>
        ))}
      </section>
    </>
  );
}

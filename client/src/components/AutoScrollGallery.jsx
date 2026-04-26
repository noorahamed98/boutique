function designImage(design) {
  return design?.image || "/assets/boutique-logo.jpg";
}

function uniqueDesigns(designs = []) {
  const seen = new Set();

  return designs.filter((design, index) => {
    if (!design) return false;

    const key = design.id || `${design.name || "design"}-${index}`;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

export default function AutoScrollGallery({ designs = [], ariaLabel = "Boutique gallery" }) {
  const items = uniqueDesigns(designs);

  if (items.length === 0) return null;

  const shouldAnimate = items.length > 1;
  const loopGroups = shouldAnimate ? [0, 1] : [0];
  const durationSeconds = Math.min(32, Math.max(18, items.length * 6));

  return (
    <div className="auto-scroll-gallery" style={{ "--gallery-duration": `${durationSeconds}s` }}>
      <div className="auto-scroll-gallery-viewport" aria-label={ariaLabel}>
        <div className={`auto-scroll-gallery-track ${shouldAnimate ? "is-animated" : ""}`.trim()}>
          {loopGroups.map((groupIndex) => (
            <div
              className="auto-scroll-gallery-group"
              key={`group-${groupIndex}`}
              aria-hidden={shouldAnimate && groupIndex === 1 ? "true" : undefined}
            >
              {items.map((design, itemIndex) => (
                <article className="auto-scroll-gallery-card" key={`${design.id || design.name || "design"}-${groupIndex}-${itemIndex}`}>
                  <div className="auto-scroll-gallery-frame">
                    <img
                      src={designImage(design)}
                      alt={design.name || "Sneha's Boutique design"}
                      className="auto-scroll-gallery-image"
                    />
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

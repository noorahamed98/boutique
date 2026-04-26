import { useEffect, useMemo, useState } from "react";

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

export default function AutoFeatureSlider({ designs = [], ariaLabel = "Boutique feature slider" }) {
  const items = useMemo(() => uniqueDesigns(designs).slice(0, 8), [designs]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return undefined;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [isPaused, items.length]);

  if (items.length === 0) return null;

  return (
    <div
      className="feature-slider"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="feature-slider-viewport">
        <div className="feature-slider-track" style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}>
          {items.map((design, index) => (
            <article className="feature-slider-slide" key={`${design.id || design.name || "design"}-${index}`}>
              <div className="feature-slider-frame">
                <img
                  src={designImage(design)}
                  alt={design.name || "Sneha's Boutique design"}
                  className="feature-slider-image"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      {items.length > 1 ? (
        <div className="feature-slider-dots" aria-label="Choose a featured image">
          {items.map((design, index) => (
            <button
              key={`${design.id || design.name || "design"}-dot-${index}`}
              type="button"
              className={`feature-slider-dot ${index === activeIndex ? "is-active" : ""}`.trim()}
              aria-label={`Show featured design ${index + 1}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

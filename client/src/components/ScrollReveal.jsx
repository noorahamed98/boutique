import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  as: Component = "div",
  className = "",
  direction = "up",
  delay = 0,
  replay = true,
  children,
  style,
  ...props
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const rect = element.getBoundingClientRect();

    // Make above-the-fold content visible immediately so first-screen mobile content never feels blank.
    if (rect.top < viewportHeight * 0.95 && rect.bottom > 0) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            return;
          }

          if (replay) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [replay]);

  return (
    <Component
      ref={elementRef}
      className={`scroll-reveal reveal-${direction} ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={{
        ...style,
        "--reveal-delay": `${delay}ms`
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

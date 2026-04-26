import { useState } from "react";

function classifyImageShape(event) {
  const width = event.currentTarget.naturalWidth || 0;
  const height = event.currentTarget.naturalHeight || 0;

  if (!width || !height) return "standard";

  const ratio = width / height;
  if (ratio >= 1.25) return "wide";
  if (ratio <= 0.82) return "tall";
  return "standard";
}

export default function AdaptiveDesignImage({
  src,
  alt,
  variant,
  onShapeChange
}) {
  const [shape, setShape] = useState("standard");

  function handleLoad(event) {
    const nextShape = classifyImageShape(event);
    setShape(nextShape);
    onShapeChange?.(nextShape);
  }

  return (
    <div className={`adaptive-design-image ${variant} ${shape}`.trim()}>
      <img src={src} alt={alt} onLoad={handleLoad} />
    </div>
  );
}

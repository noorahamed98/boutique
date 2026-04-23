import { useEffect, useState } from "react";
import Icon from "./Icon";
import { createDesignInquiryMessage, createWhatsAppLink, formatCurrency } from "../lib/storefront";

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL"];

export default function DesignModal({ design, isFavorite, onToggleFavorite, onClose }) {
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!design) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [design, onClose]);

  useEffect(() => {
    setSelectedSize("S");
    setQuantity(1);
  }, [design]);

  if (!design) return null;

  return (
    <div className="modal-bg show" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-box product-modal">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close design preview">
          <Icon name="close" />
        </button>

        <div className="modal-media">
          {design.image ? (
            <img src={design.image} alt={design.name} className="modal-img" />
          ) : (
            <div className="modal-img">Design</div>
          )}
        </div>

        <div className="modal-content">
          <div className="modal-breadcrumbs">Home / Shop / {design.name}</div>

          <div className="modal-topline">
            <div className="modal-cat">{design.category}</div>
            <span className="modal-badge">{design.badge}</span>
          </div>

          <div className="modal-name">{design.name}</div>

          <div className="modal-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon key={star} name="star" />
            ))}
            <span>4.8 customer rating</span>
          </div>

          <div className="modal-price">
            {Number.isFinite(design.originalPrice) ? (
              <span className="modal-price-compare">{formatCurrency(design.originalPrice)}</span>
            ) : null}
            <strong>{formatCurrency(design.price)}</strong>
          </div>

          <div className="modal-note">Taxes included. Soft cotton comfort and boutique finishing.</div>
          <div className="modal-desc">{design.description}</div>

          <div className="modal-section">
            <div className="modal-section-title">Size</div>
            <div className="size-row">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-chip ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">Quantity</div>
            <div className="qty-stepper">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="detail-strip">
            <span>Selected size: {selectedSize}</span>
            <span>Custom fit support</span>
            <span>WhatsApp consultation</span>
          </div>

          <div className="modal-actions">
            <button
              className={`save-btn inline ${isFavorite ? "saved" : ""}`}
              type="button"
              onClick={() => onToggleFavorite(design)}
            >
              <Icon name="heart" />
              {isFavorite ? "Saved" : "Save"}
            </button>
            <a
              href={createWhatsAppLink(createDesignInquiryMessage(design))}
              target="_blank"
              rel="noreferrer"
              className="modal-link-primary"
            >
              <Icon name="message" />
              Order on WhatsApp
            </a>
            <button className="modal-btn modal-btn-secondary" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

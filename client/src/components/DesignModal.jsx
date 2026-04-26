import { useEffect, useState } from "react";
import Icon from "./Icon";
import AdaptiveDesignImage from "./AdaptiveDesignImage";
import { createDesignInquiryMessage, createWhatsAppLink, formatCurrency } from "../lib/storefront";

function hasPrice(design) {
  return Number.isFinite(design?.price);
}

export default function DesignModal({ design, onClose, onTrackInquiry }) {
  const [mediaShape, setMediaShape] = useState("standard");

  useEffect(() => {
    if (!design) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [design, onClose]);

  useEffect(() => {
    setMediaShape("standard");
  }, [design]);

  if (!design) return null;

  return (
    <div className="modal-bg show" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className={`modal-box wix-modal-box media-${mediaShape}`.trim()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close design preview">
          <Icon name="close" />
        </button>

        <div className="wix-modal-media">
          {design.image ? (
            <div className="wix-modal-media-frame">
              <AdaptiveDesignImage
                src={design.image}
                alt={design.name}
                variant="modal"
                onShapeChange={setMediaShape}
              />
            </div>
          ) : (
            <div className="modal-img">Design</div>
          )}
        </div>

        <div className="wix-modal-copy">
          <div className="modal-cat">{design.category}</div>
          <h2 className="modal-name">{design.name}</h2>
          <div className={`wix-modal-price ${hasPrice(design) ? "" : "is-request"}`.trim()}>
            {hasPrice(design) ? formatCurrency(design.price) : "Pricing shared on request"}
          </div>
          <div className="wix-modal-badge">{design.badge}</div>
          <p className="modal-desc">{design.description}</p>

          <div className="wix-modal-actions">
            <a
              href={createWhatsAppLink(createDesignInquiryMessage(design))}
              target="_blank"
              rel="noreferrer"
              className="wix-inquire-btn inline"
              onClick={onTrackInquiry}
            >
              Inquire via WhatsApp
            </a>
            <button className="wix-secondary-btn" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

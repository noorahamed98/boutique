import { getApiUrl } from "../api/apiBase";

export const STUDIO_HASH = "#studio-admin";
export const WHATSAPP_NUMBER = "918008088088";
export const BUSINESS_PHONE_DISPLAY = "+91 80080 88088";
export const BUSINESS_ADDRESS = "Ongole, AP 523001";
export const DEFAULT_BADGES = ["", "New Arrival", "Sale", "Handpicked", "Bestseller"];

export const PUBLIC_CATEGORIES = [
  {
    name: "Fabrics",
    description: "Handpicked pure cotton fabrics and soft prints for elegant everyday wear."
  },
  {
    name: "Handlooms",
    description: "Traditional handloom weaves that carry craftsmanship, texture, and heritage."
  },
  {
    name: "Materials",
    description: "Thoughtfully chosen materials, trims, and finishing details for polished outfits."
  },
  {
    name: "Custom Made",
    description: "Made-to-measure looks shaped around your fit, style, and occasion."
  }
];

const CATEGORY_LOOKUP = new Map([
  ["fabrics", "Fabrics"],
  ["fabric", "Fabrics"],
  ["textiles", "Fabrics"],
  ["textile", "Fabrics"],
  ["handloom", "Handlooms"],
  ["handlooms", "Handlooms"],
  ["materials", "Materials"],
  ["material", "Materials"],
  ["custom made", "Custom Made"],
  ["custom", "Custom Made"],
  ["custom-made", "Custom Made"],
  ["custommade", "Custom Made"]
]);

export const WHATSAPP_GREETING_TEMPLATE = [
  "Namaste! Welcome to Sneha's Boutique.",
  "Thank you for messaging us.",
  "Please share the design name or screenshot, your size or measurements, required category, and delivery date.",
  "We will guide you with availability, pricing, and customization options."
].join(" ");

export function normalizeCategory(value = "") {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "Custom Made";

  const normalized = trimmed.toLowerCase().replace(/\s+/g, " ");
  if (CATEGORY_LOOKUP.has(normalized)) {
    return CATEGORY_LOOKUP.get(normalized);
  }

  return "Custom Made";
}

export function parseAmount(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function formatCurrency(amount) {
  if (!Number.isFinite(amount)) return "Price on request";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function deriveBadge(design) {
  if (design.badge) return design.badge;
  if (Number.isFinite(design.originalPrice) && Number.isFinite(design.price) && design.originalPrice > design.price) {
    return "Sale";
  }
  return "New Arrival";
}

export function sanitizeDesign(design = {}) {
  const price = parseAmount(design.price);
  const originalPrice = parseAmount(design.original_price ?? design.originalPrice);
  const category = normalizeCategory(design.category);
  const badge = String(design.badge || "").trim();

  return {
    ...design,
    category,
    price,
    originalPrice,
    badge: deriveBadge({ badge, price, originalPrice })
  };
}

export function createWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function trackWhatsAppInquiry() {
  const endpoint = getApiUrl("/metrics/whatsapp-inquiries");

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([], { type: "application/octet-stream" }));
      return;
    }

    fetch(endpoint, {
      method: "POST",
      keepalive: true
    }).catch(() => {});
  } catch {
    // Ignore telemetry failures so the customer flow stays uninterrupted.
  }
}

export function createGeneralInquiryMessage() {
  return [
    "Namaste Sneha's Boutique,",
    "I came from the website and would like to explore your collection.",
    "Please guide me with the available designs, pricing, and customization options."
  ].join(" ");
}

export function createDesignInquiryMessage(design) {
  const details = [`Design: ${design.name}`, `Category: ${design.category}`];

  if (Number.isFinite(design.price)) {
    details.push(`Price: ${formatCurrency(design.price)}`);
  }

  return [
    "Namaste Sneha's Boutique,",
    "I am interested in this design from the website.",
    ...details,
    "Please share size help, delivery timeline, and customization details."
  ].join(" ");
}

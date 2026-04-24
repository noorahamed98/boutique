import { BUSINESS_ADDRESS, BUSINESS_PHONE_DISPLAY } from "../lib/storefront";

export default function SiteFooter({ designCount, imageCount, whatsappInquiryCount, onOpenAdmin }) {
  return (
    <footer className="site-footer wix-footer">
      <section className="wix-stats-band">
        <div>
          <strong>{designCount}</strong>
          <span>DESIGNS ADDED</span>
        </div>
        <div>
          <strong>{imageCount}</strong>
          <span>IMAGES UPLOADED</span>
        </div>
        <div>
          <strong>{whatsappInquiryCount}</strong>
          <span>ORDER REQUESTS</span>
        </div>
      </section>

      <section className="wix-page-shell wix-footer-grid">
        <div className="wix-footer-brand">
          <img src="/assets/home-references/brand-monogram.png" alt="Sneha's Boutique logo" />
          <h4>SNEHA&apos;S BOUTIQUE</h4>
          <p>ELEVATING HANDCRAFTED ELEGANCE THROUGH CURATED FABRICS AND BESPOKE CRAFTSMANSHIP.</p>
        </div>

        <div>
          <h4>CONTACT</h4>
          <p>{BUSINESS_PHONE_DISPLAY}</p>
          <p>{BUSINESS_ADDRESS}</p>
        </div>

        <div>
          <h4>STUDIO</h4>
          <p>Private access for the boutique team.</p>
          <button className="wix-footer-admin" type="button" onClick={onOpenAdmin}>
            Studio Login
          </button>
          <p className="wix-footer-meta">Shortcut: Ctrl + Shift + A</p>
        </div>
      </section>
    </footer>
  );
}

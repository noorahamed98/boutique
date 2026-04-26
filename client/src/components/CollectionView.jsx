import Icon from "./Icon";
import AdaptiveDesignImage from "./AdaptiveDesignImage";
import {
  createDesignInquiryMessage,
  createGeneralInquiryMessage,
  createWhatsAppLink,
  formatCurrency
} from "../lib/storefront";
import ScrollReveal from "./ScrollReveal";

function SkeletonGrid() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div className="wix-catalog-card skeleton-card" key={item}>
          <div className="skeleton-img" />
          <div className="design-info">
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line muted" />
          </div>
        </div>
      ))}
    </>
  );
}

function designImage(design) {
  return design?.image || "/assets/boutique-logo.jpg";
}

function hasPrice(design) {
  return Number.isFinite(design?.price);
}

export default function CollectionView({
  filteredDesigns,
  categories,
  loading,
  error,
  searchTerm,
  sortBy,
  currentFilter,
  onTrackInquiry,
  onRetry,
  onFilter,
  onSearch,
  onSort,
  onOpenDesign
}) {
  return (
    <>
      <section className="wix-page-shell wix-collection-toolbar-shell">
        <ScrollReveal className="wix-collection-toolbar wix-collection-toolbar-exact" direction="up">
          <div className="wix-collection-left">
            <label className="wix-search-field exact" htmlFor="collectionSearch">
              <input
                id="collectionSearch"
                type="search"
                value={searchTerm}
                onChange={(event) => onSearch(event.target.value)}
                placeholder="Search by design name, category, or description..."
              />
            </label>

            <a
              className="wix-inquire-btn inline"
              href={createWhatsAppLink(createGeneralInquiryMessage())}
              target="_blank"
              rel="noreferrer"
              onClick={onTrackInquiry}
            >
              Inquire Now
            </a>
          </div>

          <div className="wix-collection-right">
            <button
              type="button"
              className="wix-clear-btn"
              onClick={() => {
                onFilter("all");
                onSearch("");
              }}
            >
              Clear
            </button>

            <label className="wix-select-group" htmlFor="collectionCategory">
              <span>CATEGORY</span>
              <select
                id="collectionCategory"
                value={currentFilter === "favorites" ? "all" : currentFilter}
                onChange={(event) => onFilter(event.target.value)}
              >
                <option value="all">All</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="wix-select-group" htmlFor="collectionSort">
              <span>SORT BY</span>
              <select id="collectionSort" value={sortBy} onChange={(event) => onSort(event.target.value)}>
                <option value="newest">Newest</option>
                <option value="name">Name A-Z</option>
                <option value="category">Category</option>
              </select>
            </label>
          </div>
        </ScrollReveal>
      </section>

      <section className="wix-page-shell wix-collection-title-block">
        <ScrollReveal direction="up">
          <span className="wix-eyebrow">CURATED COLLECTION</span>
          <h1>Handcrafted pieces for refined everyday elegance.</h1>
        </ScrollReveal>
      </section>

      <section className="wix-page-shell wix-catalog-grid">
        {loading && <SkeletonGrid />}

        {!loading && error && (
          <div className="empty-state">
            <div className="empty-icon">!</div>
            <div className="empty-text">Could not load designs</div>
            <div className="empty-sub">{error}</div>
            <button className="wix-secondary-btn" type="button" onClick={onRetry}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredDesigns.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">No</div>
            <div className="empty-text">No designs found</div>
            <div className="empty-sub">Try a broader search or start a WhatsApp inquiry for custom recommendations.</div>
            <a
              className="wix-inquire-btn inline"
              href={createWhatsAppLink(createGeneralInquiryMessage())}
              target="_blank"
              rel="noreferrer"
              onClick={onTrackInquiry}
            >
              <Icon name="message" />
              Inquire Now
            </a>
          </div>
        )}

        {!loading &&
          !error &&
          filteredDesigns.length > 0 &&
          filteredDesigns.map((design, index) => (
            <ScrollReveal key={design.id} as="article" className="wix-catalog-card" direction="up" delay={Math.min(index, 8) * 70}>
              <button className="wix-catalog-image" type="button" onClick={() => onOpenDesign(design)}>
                <AdaptiveDesignImage src={designImage(design)} alt={design.name} variant="catalog" />
              </button>

              <div className={`wix-catalog-price ${hasPrice(design) ? "" : "is-request"}`.trim()}>
                {hasPrice(design) ? formatCurrency(design.price) : "Pricing shared on request"}
              </div>

              <a
                className="wix-catalog-cta"
                href={createWhatsAppLink(createDesignInquiryMessage(design))}
                target="_blank"
                rel="noreferrer"
                onClick={onTrackInquiry}
              >
                Inquire via WhatsApp
              </a>

              <div className="wix-catalog-badge">{design.badge}</div>

              <button className="wix-catalog-title" type="button" onClick={() => onOpenDesign(design)}>
                {design.name}
              </button>
              <div className="wix-catalog-category">{design.category}</div>
            </ScrollReveal>
          ))}
      </section>
    </>
  );
}

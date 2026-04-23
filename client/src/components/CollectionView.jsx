import Icon from "./Icon";
import {
  createDesignInquiryMessage,
  createGeneralInquiryMessage,
  createWhatsAppLink,
  formatCurrency
} from "../lib/storefront";

function SkeletonGrid() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div className="design-card skeleton-card" key={item}>
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

export default function CollectionView({
  filteredDesigns,
  totalDesigns,
  currentFilter,
  categories,
  loading,
  error,
  searchTerm,
  sortBy,
  viewMode,
  favoriteIds,
  favoriteCount,
  onRetry,
  onFilter,
  onSearch,
  onSort,
  onViewMode,
  onOpenDesign,
  onToggleFavorite
}) {
  const hasFilters = currentFilter !== "all" || searchTerm.trim();

  return (
    <>
      <section className="coll-header">
        <div>
          <div className="section-kicker">Shop All</div>
          <div className="coll-title">Curated boutique catalog</div>
          <div className="coll-count">
            Showing {filteredDesigns.length} of {totalDesigns} design{totalDesigns !== 1 ? "s" : ""}
          </div>
        </div>
        <a
          className="pill-link"
          href={createWhatsAppLink(createGeneralInquiryMessage())}
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="message" />
          Ask on WhatsApp
        </a>
      </section>

      <div className="collection-panel">
        <div className="collection-tools">
          <label className="search-box" htmlFor="collectionSearch">
            <Icon name="search" />
            <input
              id="collectionSearch"
              type="search"
              value={searchTerm}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search designs, categories, or details"
            />
          </label>

          <label className="sort-control" htmlFor="collectionSort">
            <span>Sort</span>
            <select id="collectionSort" value={sortBy} onChange={(event) => onSort(event.target.value)}>
              <option value="newest">Latest first</option>
              <option value="name">Name A-Z</option>
              <option value="category">Category</option>
            </select>
          </label>

          <div className="segmented-control" aria-label="Collection view">
            <button
              type="button"
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => onViewMode("grid")}
              title="Grid view"
              aria-label="Grid view"
            >
              <Icon name="grid" />
            </button>
            <button
              type="button"
              className={viewMode === "list" ? "active" : ""}
              onClick={() => onViewMode("list")}
              title="List view"
              aria-label="List view"
            >
              <Icon name="list" />
            </button>
          </div>
        </div>

        <div className="filter-row">
          <button
            type="button"
            className={`f-btn ${currentFilter === "all" ? "on" : ""}`}
            onClick={() => onFilter("all")}
          >
            All
            <span>{totalDesigns}</span>
          </button>
          <button
            type="button"
            className={`f-btn ${currentFilter === "favorites" ? "on" : ""}`}
            onClick={() => onFilter("favorites")}
          >
            Wishlist
            <span>{favoriteCount}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className={`f-btn ${currentFilter === category.name ? "on" : ""}`}
              onClick={() => onFilter(category.name)}
            >
              {category.name}
              <span>{category.count}</span>
            </button>
          ))}
          {hasFilters ? (
            <button
              type="button"
              className="f-btn clear"
              onClick={() => {
                onFilter("all");
                onSearch("");
              }}
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <div className={`coll-grid ${viewMode === "list" ? "list-mode" : ""}`}>
        {loading && <SkeletonGrid />}

        {!loading && error && (
          <div className="empty-state">
            <div className="empty-icon">!</div>
            <div className="empty-text">Could not load designs</div>
            <div className="empty-sub">{error}</div>
            <button className="pill-btn solid" type="button" onClick={onRetry}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredDesigns.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">{currentFilter === "favorites" ? "Saved" : "No"}</div>
            <div className="empty-text">
              {currentFilter === "favorites" ? "Your wishlist is empty" : "No designs found"}
            </div>
            <div className="empty-sub">
              {currentFilter === "favorites"
                ? "Save designs from the collection to compare them later."
                : hasFilters
                  ? "Try a broader search or clear the active filters."
                  : "Start a WhatsApp conversation to ask for fresh arrivals or custom-made looks."}
            </div>
            <a
              className="pill-link"
              href={createWhatsAppLink(createGeneralInquiryMessage())}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="message" />
              Chat on WhatsApp
            </a>
          </div>
        )}

        {!loading &&
          !error &&
          filteredDesigns.length > 0 &&
          filteredDesigns.map((design) => {
            const isFavorite = favoriteIds.includes(design.id);

            return (
              <article key={design.id} className="design-card product-card">
                <button className="design-media product-media" type="button" onClick={() => onOpenDesign(design)}>
                  {design.image ? (
                    <img src={design.image} alt={design.name} className="design-img" />
                  ) : (
                    <span className="design-img">Design</span>
                  )}
                  <span className="product-badge">{design.badge}</span>
                </button>

                <button
                  className={`save-btn ${isFavorite ? "saved" : ""}`}
                  type="button"
                  title={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
                  aria-label={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
                  onClick={() => onToggleFavorite(design)}
                >
                  <Icon name="heart" />
                </button>

                <div className="design-info">
                  <div className="design-cat">{design.category}</div>
                  <div className="design-name">{design.name}</div>
                  <div className="design-desc">{design.description}</div>

                  <div className="price-stack">
                    {Number.isFinite(design.originalPrice) ? (
                      <span className="price-compare">{formatCurrency(design.originalPrice)}</span>
                    ) : null}
                    <strong>{formatCurrency(design.price)}</strong>
                  </div>

                  <div className="card-actions">
                    <button className="text-action" type="button" onClick={() => onOpenDesign(design)}>
                      <Icon name="eye" />
                      Details
                    </button>
                    <a
                      className="text-action primary"
                      href={createWhatsAppLink(createDesignInquiryMessage(design))}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="message" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </>
  );
}

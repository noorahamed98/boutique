import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import { DEFAULT_BADGES } from "../lib/storefront";

const LOGIN_FEATURES = [
  {
    icon: "package",
    title: "Catalog control",
    text: "Add, refine, and retire pieces without touching the storefront code."
  },
  {
    icon: "loom",
    title: "Category clarity",
    text: "Keep the four public collection categories consistent and easy to manage."
  },
  {
    icon: "message",
    title: "Inquiry-first workflow",
    text: "Every design stays ready for WhatsApp-led customer conversations."
  }
];

function formatDate(value) {
  if (!value) return "Not synced";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not synced";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

export default function AdminModal({
  isOpen,
  isAuthenticated,
  loginForm,
  onLoginFormChange,
  onLoginSubmit,
  loginError,
  onLogout,
  onClose,
  adminTab,
  onTabChange,
  designForm,
  onDesignFormChange,
  onImageSelected,
  onDesignSubmit,
  onDesignReset,
  formError,
  formBusy,
  editingId,
  designs,
  categories,
  categoryStats,
  imageCount,
  whatsappInquiryCount,
  onEditDesign,
  onDeleteDesign
}) {
  const fileInputRef = useRef(null);
  const designNameInputRef = useRef(null);
  const designCategoryInputRef = useRef(null);
  const designDescriptionInputRef = useRef(null);
  const designBadgeInputRef = useRef(null);
  const [manageQuery, setManageQuery] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const filteredDesigns = useMemo(() => {
    const query = manageQuery.trim().toLowerCase();
    if (!query) return designs;

    return designs.filter((design) =>
      [design.name, design.category, design.description, design.badge]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [designs, manageQuery]);

  const stockedCategories = useMemo(() => {
    return categoryStats.filter((category) => category.count > 0);
  }, [categoryStats]);

  const recentDesigns = useMemo(() => {
    return designs.slice(0, 3);
  }, [designs]);

  const coveragePercent = categoryStats.length
    ? Math.round((stockedCategories.length / categoryStats.length) * 100)
    : 0;

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen]);

  const latestDesign = recentDesigns[0] || null;
  const studioMetrics = [
    {
      icon: "spark",
      label: "Designs added",
      value: designs.length,
      note: "Live catalog pieces"
    },
    {
      icon: "loom",
      label: "Core categories",
      value: categoryStats.length,
      note: `${stockedCategories.length} stocked right now`
    },
    {
      icon: "upload",
      label: "Images uploaded",
      value: imageCount,
      note: "Visual-ready collection entries"
    },
    {
      icon: "message",
      label: "Order requests",
      value: whatsappInquiryCount,
      note: "Tracked WhatsApp inquiries"
    }
  ];

  if (!isOpen) return null;

  function handleDrop(event) {
    event.preventDefault();
    const [file] = event.dataTransfer.files || [];
    onImageSelected(file || null);
  }

  function handleDesignFormSubmit(event) {
    event.preventDefault();
    onDesignSubmit({
      name: designNameInputRef.current?.value ?? designForm.name,
      category: designCategoryInputRef.current?.value ?? designForm.category,
      description: designDescriptionInputRef.current?.value ?? designForm.description,
      badge: designBadgeInputRef.current?.value ?? designForm.badge
    });
  }

  return (
    <div className="admin-bg show" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className={`admin-box admin-studio-shell ${isAuthenticated ? "is-authenticated" : "is-login"}`}>
        <div className="admin-hd">
          <div className="admin-hd-copy">
            <span className="admin-kicker">SNEHA&apos;S BOUTIQUE STUDIO</span>
            <span className="admin-hd-title">{isAuthenticated ? "Studio Console" : "Private Studio Access"}</span>
            <span className="admin-hd-sub">
              {isAuthenticated
                ? "Curate the live catalog, keep the four storefront categories clean, and monitor inquiry-driven activity."
                : "Sign in to add, organize, and polish the boutique catalog behind the scenes."}
            </span>
          </div>
          <div className="admin-hd-actions">
            {isAuthenticated && (
              <button id="logoutBtn" className="pill-btn ghost" type="button" onClick={onLogout}>
                <Icon name="logout" />
                Logout
              </button>
            )}
            <button className="modal-x" type="button" onClick={onClose} aria-label="Close admin panel">
              <Icon name="close" />
            </button>
          </div>
        </div>

        <div className="admin-inner">
          {!isAuthenticated ? (
            <div className="admin-auth-layout">
              <aside className="admin-auth-aside">
                <div className="admin-auth-mark">
                  <img src="/assets/home-references/brand-monogram.png" alt="Sneha's Boutique monogram" />
                </div>
                <div className="admin-chip admin-chip-soft">
                  <Icon name="shield" />
                  Restricted access
                </div>
                <h2>Keep the catalog polished, current, and inquiry-ready.</h2>
                <p>
                  The studio is built for quick boutique updates: upload new pieces, keep category presentation
                  clean, and prepare each design for customer WhatsApp conversations.
                </p>

                <div className="admin-auth-feature-grid">
                  {LOGIN_FEATURES.map((feature) => (
                    <article className="admin-auth-feature" key={feature.title}>
                      <span className="admin-auth-feature-icon">
                        <Icon name={feature.icon} />
                      </span>
                      <div>
                        <h3>{feature.title}</h3>
                        <p>{feature.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </aside>

              <div className="admin-auth">
                <div className="admin-auth-card">
                  <div className="admin-auth-title">Admin Login</div>
                  <div className="admin-auth-sub">Enter your credentials to open the studio console.</div>
                  <div className={`admin-auth-error ${loginError ? "show" : ""}`}>{loginError}</div>

                  <form onSubmit={onLoginSubmit}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="adminUsername">
                        Username
                      </label>
                      <input
                        id="adminUsername"
                        name="adminUsername"
                        type="text"
                        className="form-input"
                        autoComplete="username"
                        required
                        value={loginForm.username}
                        onChange={(event) => onLoginFormChange("username", event.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="adminPassword">
                        Password
                      </label>
                      <div className="password-field">
                        <input
                          id="adminPassword"
                          name="adminPassword"
                          type={showPassword ? "text" : "password"}
                          className="form-input password-input"
                          autoComplete="current-password"
                          required
                          value={loginForm.password}
                          onChange={(event) => onLoginFormChange("password", event.target.value)}
                        />
                        <button
                          className="password-visibility-btn"
                          type="button"
                          onClick={() => setShowPassword((previous) => !previous)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          <Icon name={showPassword ? "eye-off" : "eye"} />
                        </button>
                      </div>
                    </div>

                    <div className="btn-row">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="admin-studio-grid">
              <aside className="admin-sidebar">
                <section className="admin-overview-card admin-overview-hero">
                  <span className="admin-section-eyebrow">Live studio</span>
                  <h2>Catalog at a glance</h2>
                  <p>
                    Every change here directly shapes what customers discover on the storefront and how they begin
                    their WhatsApp inquiry journey.
                  </p>

                  <div className="admin-coverage">
                    <strong>{coveragePercent}%</strong>
                    <span>
                      {stockedCategories.length} of {categoryStats.length} categories currently stocked
                    </span>
                  </div>

                  <div className="admin-overview-meta">
                    <div>
                      <span>Latest update</span>
                      <strong>{latestDesign ? formatDate(latestDesign.updated_at || latestDesign.created_at) : "No designs yet"}</strong>
                    </div>
                    <div>
                      <span>Current mode</span>
                      <strong>{editingId ? "Editing design" : adminTab === "add" ? "Adding design" : "Managing catalog"}</strong>
                    </div>
                  </div>
                </section>

                <section className="admin-sidebar-card">
                  <div className="admin-section-heading compact">
                    <span className="admin-section-eyebrow">Category coverage</span>
                    <h3>Storefront categories</h3>
                  </div>

                  <div className="admin-category-pills">
                    {categoryStats.map((category) => (
                      <div
                        className={`admin-category-pill ${category.count > 0 ? "is-stocked" : ""}`.trim()}
                        key={category.name}
                      >
                        <span className="admin-category-pill-thumb">
                          <img src={category.previewImage} alt="" />
                        </span>
                        <div>
                          <strong>{category.name}</strong>
                          <span>{category.count} designs</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="admin-sidebar-card">
                  <div className="admin-section-heading compact">
                    <span className="admin-section-eyebrow">Recent updates</span>
                    <h3>Fresh catalog activity</h3>
                  </div>

                  {recentDesigns.length === 0 ? (
                    <p className="admin-empty-note">Add the first design to start building the boutique catalog.</p>
                  ) : (
                    <div className="admin-recent-list">
                      {recentDesigns.map((design) => (
                        <div className="admin-recent-item" key={design.id}>
                          <div>
                            <strong>{design.name}</strong>
                            <span>{design.category}</span>
                          </div>
                          <small>{formatDate(design.updated_at || design.created_at)}</small>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </aside>

              <div className="admin-main-panel">
                <div className="admin-stats">
                  {studioMetrics.map((metric) => (
                    <div className="admin-stat-card" key={metric.label}>
                      <span className="admin-stat-icon">
                        <Icon name={metric.icon} />
                      </span>
                      <div className="admin-stat-copy">
                        <span className="admin-stat-label">{metric.label}</span>
                        <strong>{metric.value}</strong>
                        <small className="admin-stat-note">{metric.note}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <section className="admin-workspace">
                  <div className="admin-tabs">
                    <button
                      className={`admin-tab ${adminTab === "add" ? "active" : ""}`}
                      type="button"
                      onClick={() => onTabChange("add")}
                    >
                      <Icon name="plus" />
                      {editingId ? "Edit Design" : "Add Design"}
                    </button>
                    <button
                      className={`admin-tab ${adminTab === "manage" ? "active" : ""}`}
                      type="button"
                      onClick={() => onTabChange("manage")}
                    >
                      <Icon name="list" />
                      Manage
                    </button>
                  </div>

                  {adminTab === "add" ? (
                    <>
                      <div className="admin-panel-heading">
                        <div>
                          <span className="admin-section-eyebrow">{editingId ? "Edit mode" : "Add mode"}</span>
                          <h3>{editingId ? "Refine this design entry" : "Add the next showcase design"}</h3>
                          <p>
                            Fill in the collection details, upload a clean visual, and keep the storefront presentation
                            elegant and consistent.
                          </p>
                        </div>
                      </div>

                      <form
                        key={editingId || "new-design"}
                        id="designForm"
                        className="admin-form-shell"
                        autoComplete="off"
                        onSubmit={handleDesignFormSubmit}
                      >
                        <div className="admin-form-layout">
                          <section className="admin-form-card">
                            <div className="admin-card-heading">
                              <span className="admin-card-icon">
                                <Icon name="spark" />
                              </span>
                              <div>
                                <h4>Design details</h4>
                                <p>Tell the storefront what this piece is and how it should be described.</p>
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="form-group">
                                <label className="form-label" htmlFor="designName">
                                  Design Name *
                                </label>
                                <input
                                  ref={designNameInputRef}
                                  id="designName"
                                  name="designName"
                                  type="text"
                                  className="form-input"
                                  required
                                  maxLength={120}
                                  placeholder="e.g., Mulberry V-neck Kurti"
                                  value={designForm.name}
                                  onChange={(event) => onDesignFormChange("name", event.target.value)}
                                />
                              </div>

                              <div className="form-group">
                                <label className="form-label" htmlFor="designCategory">
                                  Category *
                                </label>
                                <select
                                  ref={designCategoryInputRef}
                                  id="designCategory"
                                  name="designCategory"
                                  className="form-select"
                                  value={designForm.category}
                                  onChange={(event) => onDesignFormChange("category", event.target.value)}
                                >
                                  {categories.map((category) => (
                                    <option key={category} value={category}>
                                      {category}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="form-group">
                              <label className="form-label" htmlFor="designDesc">
                                Description *
                              </label>
                              <textarea
                                ref={designDescriptionInputRef}
                                id="designDesc"
                                name="designDescription"
                                className="form-textarea"
                                required
                                maxLength={600}
                                placeholder="Mention fabric, occasion, work details, or fit notes."
                                value={designForm.description}
                                onChange={(event) => onDesignFormChange("description", event.target.value)}
                              />
                              <div className="field-hint">{designForm.description.length}/600 characters</div>
                            </div>
                          </section>

                          <section className="admin-form-card">
                            <div className="admin-card-heading">
                              <span className="admin-card-icon">
                                <Icon name="upload" />
                              </span>
                              <div>
                                <h4>Image & presentation</h4>
                                <p>Upload the visual customers will notice first when browsing the collection.</p>
                              </div>
                            </div>

                            <div className="form-group">
                              <label className="form-label" htmlFor="designBadge">
                                Badge
                              </label>
                              <select
                                ref={designBadgeInputRef}
                                id="designBadge"
                                name="designBadge"
                                className="form-select"
                                value={designForm.badge}
                                onChange={(event) => onDesignFormChange("badge", event.target.value)}
                              >
                                {DEFAULT_BADGES.map((badge) => (
                                  <option key={badge || "none"} value={badge}>
                                    {badge || "Auto"}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="form-group">
                              <label className="form-label" htmlFor="imageInput">
                                Image
                              </label>
                              <div
                                className={`img-upload-area ${designForm.image ? "has-image" : ""}`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(event) => event.preventDefault()}
                                onDrop={handleDrop}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    fileInputRef.current?.click();
                                  }
                                }}
                              >
                                {designForm.image ? (
                                  <>
                                    <div className="img-upload-preview">
                                      <img src={designForm.image} className="preview-img" alt="Design preview" />
                                    </div>
                                    <div className="img-upload-note">Click anywhere on the preview to replace the image.</div>
                                    <button
                                      className="remove-image"
                                      type="button"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        onDesignFormChange("image", null);
                                      }}
                                    >
                                      <Icon name="close" />
                                      Remove image
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <Icon name="upload" className="upload-icon" />
                                    <div className="upload-text">Click or drop image here</div>
                                    <div className="upload-hint">JPG, PNG or GIF, up to 5MB</div>
                                  </>
                                )}
                              </div>

                              <input
                                id="imageInput"
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(event) => {
                                  const [file] = event.target.files || [];
                                  onImageSelected(file || null);
                                  event.target.value = "";
                                }}
                              />
                            </div>
                          </section>
                        </div>

                        {formError ? <div className="admin-auth-error show">{formError}</div> : null}

                        <div className="btn-row admin-form-actions">
                          <button type="submit" className="btn btn-primary" disabled={formBusy}>
                            {formBusy ? "Saving..." : editingId ? "Update Design" : "Add Design"}
                          </button>
                          <button type="button" className="btn btn-secondary" onClick={onDesignReset} disabled={formBusy}>
                            {editingId ? "Cancel Edit" : "Clear Form"}
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <div className="admin-panel-heading">
                        <div>
                          <span className="admin-section-eyebrow">Manage mode</span>
                          <h3>Review and maintain the live collection</h3>
                          <p>
                            {filteredDesigns.length} {filteredDesigns.length === 1 ? "design matches" : "designs match"} the
                            current search.
                          </p>
                        </div>
                      </div>

                      <label className="search-box admin-search" htmlFor="manageSearch">
                        <Icon name="search" />
                        <input
                          id="manageSearch"
                          type="search"
                          value={manageQuery}
                          onChange={(event) => setManageQuery(event.target.value)}
                          placeholder="Search designs to manage"
                        />
                      </label>

                      {filteredDesigns.length === 0 ? (
                        <div className="empty-state compact">
                          <div className="empty-icon">No</div>
                          <div className="empty-text">No matching designs</div>
                          <div className="empty-sub">Clear the search or add a new design from the Add tab.</div>
                        </div>
                      ) : (
                        <div className="manage-list">
                          {filteredDesigns.map((design) => (
                            <div className="manage-item" key={design.id}>
                              <div className="manage-item-main">
                                <div className="manage-thumb">
                                  {design.image ? <img src={design.image} alt="" /> : <Icon name="ruler" />}
                                </div>
                                <div className="manage-item-info">
                                  <div className="manage-item-topline">
                                    <div className="manage-item-name">{design.name}</div>
                                    <div className="manage-item-badge">{design.badge || "Auto badge"}</div>
                                  </div>
                                  <div className="manage-item-meta">
                                    <div className="manage-item-cat">{design.category}</div>
                                    <div className="manage-item-date">Updated {formatDate(design.updated_at)}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="manage-item-actions">
                                <button className="admin-action-btn" type="button" onClick={() => onEditDesign(design)}>
                                  <Icon name="edit" />
                                  Edit
                                </button>
                                <button
                                  className="admin-action-btn danger"
                                  type="button"
                                  onClick={() => onDeleteDesign(design.id)}
                                >
                                  <Icon name="trash" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

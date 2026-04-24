import { useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import { DEFAULT_BADGES } from "../lib/storefront";

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

  if (!isOpen) return null;

  function handleDrop(event) {
    event.preventDefault();
    const [file] = event.dataTransfer.files || [];
    onImageSelected(file || null);
  }

  return (
    <div className="admin-bg show" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="admin-box">
        <div className="admin-hd">
          <div>
            <span className="admin-hd-title">Studio Access</span>
            <span className="admin-hd-sub">Private catalog control for the boutique team</span>
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
            <div className="admin-auth">
              <div className="admin-auth-card">
                <div className="admin-auth-title">Admin Login</div>
                <div className="admin-auth-sub">Sign in to add, edit, and organize the boutique catalog.</div>
                <div className={`admin-auth-error ${loginError ? "show" : ""}`}>{loginError}</div>

                <form onSubmit={onLoginSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="adminUsername">
                      Username
                    </label>
                    <input
                      id="adminUsername"
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
          ) : (
            <>
              <div className="admin-stats">
                <div>
                  <strong>{designs.length}</strong>
                  <span>Designs added</span>
                </div>
                <div>
                  <strong>{categoryStats.length}</strong>
                  <span>Core categories</span>
                </div>
                <div>
                  <strong>{imageCount}</strong>
                  <span>Images uploaded</span>
                </div>
                <div>
                  <strong>{whatsappInquiryCount}</strong>
                  <span>Order requests</span>
                </div>
              </div>

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
                <form id="designForm" onSubmit={onDesignSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="designName">
                        Design Name *
                      </label>
                      <input
                        id="designName"
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
                        id="designCategory"
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
                    <label className="form-label" htmlFor="designBadge">
                      Badge
                    </label>
                    <select
                      id="designBadge"
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
                    <label className="form-label" htmlFor="designDesc">
                      Description *
                    </label>
                    <textarea
                      id="designDesc"
                      className="form-textarea"
                      required
                      maxLength={600}
                      placeholder="Mention fabric, occasion, work details, or fit notes."
                      value={designForm.description}
                      onChange={(event) => onDesignFormChange("description", event.target.value)}
                    />
                    <div className="field-hint">{designForm.description.length}/600 characters</div>
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
                          <img src={designForm.image} className="preview-img" alt="Design preview" />
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

                  {formError ? <div className="admin-auth-error show">{formError}</div> : null}

                  <div className="btn-row">
                    <button type="submit" className="btn btn-primary" disabled={formBusy}>
                      {formBusy ? "Saving..." : editingId ? "Update Design" : "Add Design"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onDesignReset} disabled={formBusy}>
                      {editingId ? "Cancel Edit" : "Clear Form"}
                    </button>
                  </div>
                </form>
              ) : (
                <>
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
                          <div className="manage-thumb">
                            {design.image ? <img src={design.image} alt="" /> : <Icon name="ruler" />}
                          </div>
                          <div className="manage-item-info">
                            <div className="manage-item-name">{design.name}</div>
                            <div className="manage-item-cat">{design.category}</div>
                            <div className="manage-item-date">{design.badge ? `Badge: ${design.badge}` : "Badge: Auto"}</div>
                            <div className="manage-item-date">Updated {formatDate(design.updated_at)}</div>
                          </div>
                          <div className="manage-item-actions">
                            <button className="icon-btn" type="button" title="Edit" onClick={() => onEditDesign(design)}>
                              <Icon name="edit" />
                            </button>
                            <button
                              className="icon-btn danger"
                              type="button"
                              title="Delete"
                              onClick={() => onDeleteDesign(design.id)}
                            >
                              <Icon name="trash" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

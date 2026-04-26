import { useEffect, useMemo, useState } from "react";
import {
  createDesign,
  deleteDesign,
  getDesigns,
  getSiteMetrics,
  loginAdmin,
  updateDesign,
  verifyAdminToken
} from "./api/designsApi";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import CollectionView from "./components/CollectionView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import SizesView from "./components/SizesView";
import DesignModal from "./components/DesignModal";
import AdminModal from "./components/AdminModal";
import SiteFooter from "./components/SiteFooter";
import Icon from "./components/Icon";
import {
  DEFAULT_BADGES,
  PUBLIC_CATEGORIES,
  STUDIO_HASH,
  sanitizeDesign,
  trackWhatsAppInquiry
} from "./lib/storefront";

const ADMIN_TOKEN_KEY = "snehas_boutique_admin_token";
const WISHLIST_KEY = "snehas_boutique_wishlist";
const EMPTY_FORM = {
  name: "",
  category: PUBLIC_CATEGORIES[0].name,
  description: "",
  image: null,
  badge: DEFAULT_BADGES[0]
};

function readWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function designTimestamp(design) {
  const value = new Date(design.updated_at || design.created_at || 0).getTime();
  return Number.isNaN(value) ? 0 : value;
}

function prepareDesigns(data) {
  return Array.isArray(data) ? data.map((design) => sanitizeDesign(design)) : [];
}

function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className={`toast ${toast.type || "info"}`} role="status">
      <span>{toast.message}</span>
      <button className="toast-close" type="button" onClick={onClose} aria-label="Close notification">
        <Icon name="close" />
      </button>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [whatsappInquiryCount, setWhatsAppInquiryCount] = useState(0);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSort, setCurrentSort] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState(readWishlist);
  const [toast, setToast] = useState(null);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || "");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [adminTab, setAdminTab] = useState("add");
  const [editingId, setEditingId] = useState(null);
  const [designForm, setDesignForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [formBusy, setFormBusy] = useState(false);

  const categories = useMemo(() => PUBLIC_CATEGORIES.map((category) => category.name), []);

  const categoryStats = useMemo(() => {
    const counts = new Map(PUBLIC_CATEGORIES.map((category) => [category.name, 0]));

    designs.forEach((design) => {
      counts.set(design.category, (counts.get(design.category) || 0) + 1);
    });

    return PUBLIC_CATEGORIES.map((category) => ({
      ...category,
      count: counts.get(category.name) || 0
    }));
  }, [designs]);

  const visibleDesigns = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return designs
      .filter((design) => {
        if (currentFilter === "favorites" && !favoriteIds.includes(design.id)) return false;
        if (currentFilter !== "all" && currentFilter !== "favorites" && design.category !== currentFilter) return false;

        if (!query) return true;

        return [design.name, design.category, design.description, design.badge]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query));
      })
      .sort((a, b) => {
        if (currentSort === "name") return a.name.localeCompare(b.name);
        if (currentSort === "category") {
          return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        }
        return designTimestamp(b) - designTimestamp(a);
      });
  }, [currentFilter, currentSort, designs, favoriteIds, searchTerm]);

  const featuredDesigns = useMemo(() => {
    return [...designs].sort((a, b) => designTimestamp(b) - designTimestamp(a)).slice(0, 4);
  }, [designs]);

  const latestDesign = featuredDesigns[0] || null;
  const imageCount = useMemo(() => designs.filter((design) => Boolean(design.image)).length, [designs]);

  const collectionHighlights = useMemo(() => {
    return PUBLIC_CATEGORIES.map((category) => ({
      ...category,
      design: designs.find((design) => design.category === category.name) || latestDesign || null
    }));
  }, [designs, latestDesign]);

  const inspirationDesigns = useMemo(() => {
    const ordered = [...designs].sort((a, b) => designTimestamp(b) - designTimestamp(a));
    return ordered.slice(4, 8).length > 0 ? ordered.slice(4, 8) : ordered.slice(0, 4);
  }, [designs]);

  const storyDesign = useMemo(() => {
    return designs.find((design) => design.category === "Handlooms") || designs.find((design) => design.image) || latestDesign;
  }, [designs, latestDesign]);

  const aboutGalleryDesigns = useMemo(() => {
    const gallery = [];

    [...designs]
      .filter((design) => Boolean(design.image))
      .forEach((design) => {
        if (gallery.some((item) => item.id === design.id)) return;
        if (gallery.length >= 4) return;
        gallery.push(design);
      });

    while (gallery.length < 4 && latestDesign) {
      gallery.push({ ...latestDesign, id: `${latestDesign.id}-placeholder-${gallery.length}` });
    }

    return gallery;
  }, [designs, latestDesign]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    if (!toast) return undefined;

    const timeout = window.setTimeout(() => setToast(null), 3600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (currentFilter !== "all" && currentFilter !== "favorites" && !categories.includes(currentFilter)) {
      setCurrentFilter("all");
    }
  }, [categories, currentFilter]);

  useEffect(() => {
    let cancelled = false;

    async function fetchInitialData() {
      setLoading(true);
      setFetchError("");

      try {
        const [designData, metricData] = await Promise.all([getDesigns(), getSiteMetrics()]);
        if (!cancelled) {
          setDesigns(prepareDesigns(designData));
          setWhatsAppInquiryCount(Number(metricData?.whatsappInquiries || 0));
        }
      } catch (error) {
        if (!cancelled) setFetchError(error.message || "Unable to fetch designs.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchInitialData();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!adminToken) {
      setIsAdminAuthenticated(false);
      return () => {
        cancelled = true;
      };
    }

    verifyAdminToken(adminToken)
      .then(() => {
        if (!cancelled) setIsAdminAuthenticated(true);
      })
      .catch(() => {
        if (!cancelled) {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
          setAdminToken("");
          setIsAdminAuthenticated(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [adminToken]);

  useEffect(() => {
    const applyStudioHash = () => {
      if (window.location.hash === STUDIO_HASH) {
        setIsAdminOpen(true);
        setLoginError("");
        setFormError("");
      } else {
        setIsAdminOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        const url = new URL(window.location.href);
        url.hash = STUDIO_HASH;
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
        applyStudioHash();
      }
    };

    applyStudioHash();
    window.addEventListener("hashchange", applyStudioHash);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("hashchange", applyStudioHash);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function showToast(message, type = "info") {
    setToast({ id: Date.now(), message, type });
  }

  function navigate(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function exploreCategory(categoryName) {
    setCurrentFilter(categoryName);
    setSearchTerm("");
    navigate("collection");
  }

  function openWishlist() {
    setCurrentFilter("favorites");
    navigate("collection");
  }

  function openAdminPanel() {
    const url = new URL(window.location.href);
    url.hash = STUDIO_HASH;
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    setIsAdminOpen(true);
    setLoginError("");
    setFormError("");
  }

  function handleWhatsAppInquiry() {
    setWhatsAppInquiryCount((previous) => previous + 1);
    trackWhatsAppInquiry();
  }

  async function refreshDesigns() {
    setLoading(true);
    setFetchError("");

    try {
      const data = await getDesigns();
      setDesigns(prepareDesigns(data));
      showToast("Collection refreshed.", "success");
    } catch (error) {
      setFetchError(error.message || "Unable to fetch designs.");
    } finally {
      setLoading(false);
    }
  }

  function clearStudioHash() {
    if (window.location.hash !== STUDIO_HASH) return;
    const url = new URL(window.location.href);
    url.hash = "";
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  }

  function closeAdmin() {
    setIsAdminOpen(false);
    setAdminTab("add");
    setEditingId(null);
    setDesignForm(EMPTY_FORM);
    setFormError("");
    clearStudioHash();
  }

  function handleLogout() {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setAdminToken("");
    setIsAdminAuthenticated(false);
    setAdminTab("add");
    setEditingId(null);
    setDesignForm(EMPTY_FORM);
    showToast("Admin session ended.", "info");
  }

  function handleLoginFormChange(field, value) {
    setLoginForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setLoginError("");

    try {
      const data = await loginAdmin(loginForm.username.trim(), loginForm.password);
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setAdminToken(data.token);
      setIsAdminAuthenticated(true);
      setLoginForm({ username: "", password: "" });
      showToast("Admin access confirmed.", "success");
    } catch (error) {
      setLoginError(error.message || "Invalid credentials.");
    }
  }

  function handleDesignFormChange(field, value) {
    setDesignForm((previous) => ({ ...previous, [field]: value }));
    setFormError("");
  }

  function handleImageSelected(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setDesignForm((previous) => ({ ...previous, image: String(event.target?.result || "") }));
      setFormError("");
    };
    reader.onerror = () => {
      setFormError("We couldn't read that image. Please try a different file.");
    };
    reader.readAsDataURL(file);
  }

  function resetDesignForm() {
    setEditingId(null);
    setDesignForm(EMPTY_FORM);
    setFormError("");
  }

  function beginEditDesign(design) {
    setEditingId(design.id);
    setAdminTab("add");
    setDesignForm({
      name: design.name,
      category: design.category,
      description: design.description,
      image: design.image || null,
      badge: design.badge || DEFAULT_BADGES[0]
    });
    setFormError("");
  }

  function handleFavoriteToggle(design) {
    const isSaved = favoriteIds.includes(design.id);
    setFavoriteIds((previous) =>
      isSaved ? previous.filter((id) => id !== design.id) : [...previous, design.id]
    );
    showToast(isSaved ? "Removed from wishlist." : "Saved to wishlist.", isSaved ? "info" : "success");
  }

  async function handleDesignSubmit(event) {
    event.preventDefault();

    if (!adminToken || !isAdminAuthenticated) {
      setFormError("Please log in as admin to make changes.");
      return;
    }

    const payload = {
      name: designForm.name.trim(),
      category: designForm.category,
      description: designForm.description.trim(),
      image: designForm.image || null,
      badge: designForm.badge || null
    };

    if (!payload.name || !payload.category || !payload.description) {
      setFormError("Please fill all required fields.");
      return;
    }

    setFormBusy(true);
    setFormError("");

    try {
      if (editingId) {
        const updated = sanitizeDesign(await updateDesign(adminToken, editingId, payload));
        setDesigns((previous) => previous.map((design) => (design.id === updated.id ? updated : design)));
        showToast("Design updated successfully.", "success");
      } else {
        const created = sanitizeDesign(await createDesign(adminToken, payload));
        setDesigns((previous) => [created, ...previous]);
        showToast("Design added successfully.", "success");
      }

      resetDesignForm();
      setAdminTab("manage");
      setCurrentFilter("all");
    } catch (error) {
      const message = error.message || "Unable to save design.";
      if (message.toLowerCase().includes("token")) {
        handleLogout();
        setLoginError("Session expired. Please log in again.");
      }
      setFormError(message);
    } finally {
      setFormBusy(false);
    }
  }

  async function handleDeleteDesign(designId) {
    if (!adminToken || !isAdminAuthenticated) {
      setLoginError("Please log in as admin to make changes.");
      return;
    }

    const confirmed = window.confirm("Delete this design from the collection?");
    if (!confirmed) return;

    try {
      await deleteDesign(adminToken, designId);
      setDesigns((previous) => previous.filter((design) => design.id !== designId));
      setFavoriteIds((previous) => previous.filter((id) => id !== designId));
      showToast("Design deleted.", "success");

      if (editingId === designId) {
        resetDesignForm();
      }

      if (selectedDesign?.id === designId) {
        setSelectedDesign(null);
      }
    } catch (error) {
      const message = error.message || "Unable to delete design.";
      if (message.toLowerCase().includes("token")) {
        handleLogout();
        setLoginError("Session expired. Please log in again.");
      } else {
        showToast(message, "error");
      }
    }
  }

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        onTrackInquiry={handleWhatsAppInquiry}
      />

      <div className={`view ${currentPage === "home" ? "show" : ""}`} id="v-home">
        <HomeView
          key={`home-${currentPage === "home" ? "active" : "inactive"}`}
          onNavigate={navigate}
          onExploreCategory={exploreCategory}
          onOpenFavorites={openWishlist}
          onTrackInquiry={handleWhatsAppInquiry}
          heroDesign={latestDesign}
          collectionHighlights={collectionHighlights}
          favoriteCount={favoriteIds.length}
          inspirationDesigns={inspirationDesigns}
          storyDesign={storyDesign}
          onOpenDesign={setSelectedDesign}
        />
      </div>

      <div className={`view ${currentPage === "collection" ? "show" : ""}`} id="v-collection">
        <CollectionView
          filteredDesigns={visibleDesigns}
          totalDesigns={designs.length}
          currentFilter={currentFilter}
          categories={categoryStats}
          loading={loading}
          error={fetchError}
          searchTerm={searchTerm}
          sortBy={currentSort}
          viewMode={viewMode}
          favoriteIds={favoriteIds}
          onTrackInquiry={handleWhatsAppInquiry}
          onRetry={refreshDesigns}
          onFilter={setCurrentFilter}
          onSearch={setSearchTerm}
          onSort={setCurrentSort}
          onViewMode={setViewMode}
          onOpenDesign={setSelectedDesign}
          onToggleFavorite={handleFavoriteToggle}
        />
      </div>

      <div className={`view ${currentPage === "about" ? "show" : ""}`} id="v-about">
        <AboutView heroDesign={storyDesign} galleryDesigns={aboutGalleryDesigns} onNavigate={navigate} />
      </div>

      <div className={`view ${currentPage === "contact" ? "show" : ""}`} id="v-contact">
        <ContactView onTrackInquiry={handleWhatsAppInquiry} />
      </div>

      <div className={`view ${currentPage === "sizes" ? "show" : ""}`} id="v-sizes">
        <SizesView onTrackInquiry={handleWhatsAppInquiry} />
      </div>

      <SiteFooter
        designCount={designs.length}
        imageCount={imageCount}
        whatsappInquiryCount={whatsappInquiryCount}
        onOpenAdmin={openAdminPanel}
      />

      <DesignModal
        design={selectedDesign}
        onTrackInquiry={handleWhatsAppInquiry}
        onClose={() => setSelectedDesign(null)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        isAuthenticated={isAdminAuthenticated}
        loginForm={loginForm}
        onLoginFormChange={handleLoginFormChange}
        onLoginSubmit={handleLoginSubmit}
        loginError={loginError}
        onLogout={handleLogout}
        onClose={closeAdmin}
        adminTab={adminTab}
        onTabChange={setAdminTab}
        designForm={designForm}
        onDesignFormChange={handleDesignFormChange}
        onImageSelected={handleImageSelected}
        onDesignSubmit={handleDesignSubmit}
        onDesignReset={resetDesignForm}
        formError={formError}
        formBusy={formBusy}
        editingId={editingId}
        designs={designs}
        categories={categories}
        categoryStats={categoryStats}
        imageCount={imageCount}
        whatsappInquiryCount={whatsappInquiryCount}
        onEditDesign={beginEditDesign}
        onDeleteDesign={handleDeleteDesign}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}

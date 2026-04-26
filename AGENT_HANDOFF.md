# Agent Handoff

Read this file first before continuing work on this repo.

## Project

Sneha's Boutique storefront with:

- `client/` React + Vite
- `server/` Express + PostgreSQL

## Current source of truth

- Build forward from the latest April 24, 2026 Wix-reference-aligned storefront, not from the older editorial layout.
- Public categories stay fixed as:
  - `Fabrics`
  - `Handlooms`
  - `Materials`
  - `Custom Made`
- WhatsApp remains the primary customer action flow.
- The slide effect the user asked about is a `scroll reveal` / `scroll-triggered slide-in animation`.
- `AGENT_HANDOFF.md` should be updated after each substantial code/content change so the next agent starts from the latest state.

## Current storefront behavior

- Visible `ADMIN DASHBOARD` was removed from the main navbar.
- Admin access now lives in three places:
  - URL hash: `#studio-admin`
  - Keyboard shortcut: `Ctrl + Shift + A`
  - footer button: `Studio Login`
- Header logo now uses the size-chart-style monogram asset.
- Header/footer monogram sizing was dialed back after an oversized polish pass so the logo feels balanced again.
- Header/navbar was further tightened toward the uploaded Wix reference:
  - smaller brand mark and wordmark scale
  - tighter nav spacing
  - more compact `Inquire Now` button
- Header brand block was refactored into a responsive left-side logo container plus a right-side nav/CTA flex group to stop SB logo overlap across desktop, tablet, and mobile.
- Business contact details are now:
  - phone / WhatsApp: `+91 80080 88088`
  - address: `Ongole, AP 523001`
- Social/email links were removed from the public footer/contact layout.

## Home page status

- Hero is a split Wix-style layout with:
  - left monogram hero image
  - right serif headline `HANDCRAFTED ELEGANCE FOR THE MODERN SOUL.`
  - supporting copy
  - `Shop the Collection` CTA
- The user-provided/reference-based sections are rendered as full image sections with invisible hotspot overlays:
  - `Our Signature Collections`
  - `New Arrivals`
  - `Handpicked`
- `Our Signature Collections` and `New Arrivals` were then rebuilt again from the composite references into individual image cards so each image can animate separately instead of the whole section appearing at once.
- Testimonial section includes the names:
  - `ELENA R.`
  - `PRIYA S.`
- Home page images use replayable scroll reveal motion.
- Signature/new-arrival cards now use a stronger per-image reveal/expand motion so the single image opens into view instead of showing the full composite screenshot immediately.
- Signature/new-arrival single cards now use directional wipe-mask reveals with a subtle hover bloom so each image feels closer to the Wix `Reveal` / `Blob` animation references.
- `HomeView` is keyed from page state so returning to Home resets the reveal sequence cleanly.
- Home hero and large reference-image sections were slightly narrowed on desktop to remove the overzoomed look.
- Home hero is now framed closer to the uploaded Wix screenshot:
  - narrower overall shell
  - taller left fabric image panel
  - top-aligned copy instead of vertically centered copy
  - smaller headline/body/button scale for a closer Wix match
- Home hero headline is now explicitly stacked into Wix-like line breaks so the text stays inside the right copy panel and no longer overlaps the left image.

## Collection / modal behavior

- Catalog still supports legacy price data if present.
- If a design has no price, the UI now shows a softer `Pricing shared on request` label instead of a large harsh fallback.
- WhatsApp CTA tracking is wired across:
  - navbar `Inquire Now`
  - home hotspots / CTAs
  - collection cards
  - design modal
  - contact form
  - size chart CTA

## Admin status

- Admin modal login now has a password visibility eye toggle.
- Admin add/edit form no longer shows:
  - `Current Price`
  - `Original Price`
- Admin dashboard cards are now oriented around real/store-managed values:
  - designs added
  - core categories
  - images uploaded
  - order requests
- Manage list now emphasizes:
  - name
  - category
  - badge
  - updated date
- The frontend admin flow no longer carries price/original-price form state for new edits/submits.
- Admin image upload preview now shows the full selected image in a contained frame instead of aggressively cropping/zooming it.
- Admin add/edit validation errors now clear as soon as the user changes a field again, so stale messages do not linger after corrections.
- Admin UI was redesigned into a more distinct studio-console layout:
  - richer branded header
  - split login experience with a private-studio info panel
  - left-side authenticated overview rail with category coverage and recent updates
  - more editorial metric cards and a clearer add/manage workspace
  - upgraded manage cards with badge/category chips and labeled action buttons
- Admin design submit now reads the live form field values at submit time in addition to React state, which fixes the false `Design name is required.` error when the visible input and submitted state drift out of sync.
- Admin submit is now hardened a second time: the studio form passes an explicit snapshot of the live input refs into `handleDesignSubmit()`, so mixed HMR/dev-server state cannot submit an empty `designName` while the field still looks filled in.
- Root cause of the persistent live 400 was finally identified in `client/src/api/designsApi.js`: the shared `request()` helper built a `headers` object with `Content-Type: application/json`, but then overwrote it with `...options`, dropping the content type on authenticated POST/PUT requests. Reordering to `{ ...options, headers }` preserves JSON parsing on the server.
- Branding polish pass: the React app now uses a more consistent brand lockup in the navbar/footer/size-chart/admin surfaces, swaps the home hero from the cramped square monogram to the wider wordmark treatment, and adds the monogram as the browser favicon/apple-touch icon via `client/index.html`.

## Real metrics now in use

- Footer stats are no longer fake marketing numbers.
- They now use:
  - total designs from the `designs` table
  - image count derived from designs with images
  - WhatsApp inquiry count from `site_metrics`
- There is still no true order-management backend yet.
- `Order requests` currently means tracked WhatsApp inquiries, which is the closest real user-action metric available in the current stack.

## Size chart status

- The old size chart presentation was replaced with the reference image layout.
- Current size chart page uses a sharper HD reference asset and a WhatsApp CTA below it.
- Size chart reference is now centered and width-capped so it stays readable without feeling overzoomed on desktop.
- Size chart is now shown more like the uploaded reference image itself:
  - smaller raw image framing
  - removed extra card-style border/shadow wrapper
  - slight contrast/saturation lift to keep the HD asset crisper
- The cropped reference-image approach was replaced again with a rebuilt styled size-chart layout:
  - actual table rows rendered in HTML
  - right-side fit guide + silhouette rendered in the page
  - satin/gold framed styling aimed to match the uploaded full-size reference more closely

## Image quality / assets

- Blur from the global reveal-image zoom was removed. Image containers still slide in, but the images themselves no longer scale during reveal.
- Header/modal overlay blur was also reduced/removed so the UI stays clearer.
- Current reference visuals aim to follow the uploaded screenshots directly rather than a looser interpretation.
- Reference assets currently used live in:
  - `client/public/assets/home-references/`
- Important current assets there include:
  - `brand-monogram.png`
  - `signature-collections-hd.png`
  - `signature-fabrics-solo-hd.png`
  - `signature-handlooms-solo-hd.png`
  - `signature-materials-solo-hd.png`
  - `signature-custom-solo-hd.png`
  - `new-arrivals-hd.png`
  - `arrival-handloom-silk-blend-solo-hd.png`
  - `arrival-pure-cotton-organza-solo-hd.png`
  - `arrival-custom-gold-thread-solo-hd.png`
  - `handpicked-hd.png`
  - `size-chart-reference-hd.jpg`
  - `brand-monogram.png`

## Backend / schema notes

- Server auto-runs schema sync from `server/db/schema.sql` on startup.
- `site_metrics` table exists and currently stores `whatsapp_inquiries`.
- Metrics API routes:
  - `GET /api/metrics`
  - `POST /api/metrics/whatsapp-inquiries`
- Design schema still includes `price` / `original_price` columns for backward compatibility, even though the admin UI no longer exposes them.

## Deployment / CI notes

- Frontend now supports `VITE_API_BASE_URL` for split hosting, while still defaulting to relative `/api` for the combined Express-served setup.
- Cloudflare Pages GitHub Actions workflow now lives at:
  - `.github/workflows/deploy-cloudflare-pages.yml`
- The current Cloudflare path is:
  - `client/` deploys to Cloudflare Pages
  - `server/` stays on Node + PostgreSQL hosting unless a separate backend migration happens later
- If Cloudflare repo secrets/variables are missing, the workflow now still builds the frontend and skips only the deploy step with a GitHub Actions summary note instead of failing the whole workflow immediately.
- Backend CORS now supports:
  - `FRONTEND_URL` for the primary origin
  - `FRONTEND_URLS` for extra exact origins
  - `FRONTEND_URL_SUFFIXES` for preview-domain suffixes such as `.pages.dev`
- Backend default allowlist now also includes the active local/dev storefront origins:
  - `http://localhost:4182`
  - `http://127.0.0.1:4182`
  - `https://app.snehasboutique.online`
- Recommended backend env when using Cloudflare Pages previews:
  - `FRONTEND_URL=https://<project>.pages.dev`
  - `FRONTEND_URL_SUFFIXES=.pages.dev`
- Mobile UX was then simplified again after the first pass felt too busy:
  - desktop now keeps the clean original header without leaked mobile UI
  - phones use a lighter menu-sheet pattern instead of extra persistent mobile bars/cards
  - above-the-fold mobile content now shows immediately instead of waiting on reveal animation
  - mobile hero now leads with the headline and CTA first, with the image moved below for clearer first-screen comprehension

## Important files

- `client/src/App.jsx`
- `client/src/api/apiBase.js`
- `client/src/lib/storefront.js`
- `client/src/api/designsApi.js`
- `client/src/components/Navbar.jsx`
- `client/src/components/HomeView.jsx`
- `client/src/components/ScrollReveal.jsx`
- `client/src/components/CollectionView.jsx`
- `client/src/components/DesignModal.jsx`
- `client/src/components/ContactView.jsx`
- `client/src/components/SizesView.jsx`
- `client/src/components/SiteFooter.jsx`
- `client/src/components/AdminModal.jsx`
- `client/src/components/ScrollReveal.jsx`
- `client/src/styles.css`
- `.github/workflows/deploy-cloudflare-pages.yml`
- `server/src/index.js`
- `server/src/routes/designRoutes.js`
- `server/src/routes/metricsRoutes.js`
- `server/db/schema.sql`

## Verification completed

- `npm.cmd run build --prefix client` succeeded on April 24, 2026 after:
  - replayable scroll reveal behavior
  - admin cleanup
  - HD asset swaps
  - footer/contact updates
  - size chart refresh
  - blur reduction polish
  - desktop scale correction for logo, home page reference panels, and size chart
  - tighter Wix-reference alignment for navbar, hero proportions, and raw size-chart presentation
  - rebuilt size-chart section from code instead of relying on the cropped banner asset
  - split composite home-reference screenshots into individual card assets with per-card reveal animation
  - upgraded the single-image card effect to a directional wipe-mask reveal with a light hover bloom closer to the Wix animation reference
  - responsive header refactor to keep the SB logo contained and prevent overlap with nav items or the CTA
- `node --check server/src/index.js`
- `node --check server/src/routes/designRoutes.js`
- `node --check server/src/routes/authRoutes.js`
- `node --check server/src/routes/metricsRoutes.js`
- `node --check server/src/schema.js`
  - all passed on April 24, 2026
- `npm.cmd run build --prefix client`
- `node --check server/src/index.js`
- `node --check server/src/routes/metricsRoutes.js`
  - all passed again on April 24, 2026 after adding Cloudflare Pages GitHub Actions deploy support, split-host API base configuration, and preview-friendly CORS options
- `npm.cmd run build --prefix client`
  - passed again on April 24, 2026 after the mobile UX pass that added a simplified phone header, mobile quick-start cards, and a sticky bottom mobile action bar
- `npm.cmd run build --prefix client`
  - passed on April 26, 2026 after the admin image-upload preview fix that switched the preview to a contained full-image frame and cleared stale form errors during editing
- `npm.cmd run build --prefix client`
  - passed on April 26, 2026 after the admin studio redesign that rebuilt the modal into a richer two-column console with new login, overview, add-design, and manage-collection layouts
- `npm.cmd run build --prefix client`
  - passed on April 26, 2026 after the admin submit-sync fix that reads the actual form values on submit to prevent false missing-name validation errors

## Reference material

- Wix video frame sources are under:
  - `tmp/wix_video_frames/`
  - `tmp/wix_video_frames_more/`
- Most useful current reference frames:
  - `frame_01_03.91s.jpg` hero
  - `frame_03_07.80s.jpg` signature collections
  - `frame_06_16.20s.jpg` testimonials
  - `frame_08_24.40s.jpg` story section
  - `frame_10_74.35s.jpg` size chart

## If work continues next

1. Check git diff first and do not revert unrelated user work.
2. Start from the files listed above instead of re-reading the entire repo.
3. Preserve the fixed four public categories.
4. Keep the WhatsApp inquiry flow customer-facing and intact.
5. Keep `AGENT_HANDOFF.md` updated whenever code/content changes in a meaningful way.
6. If a real order system is added later, replace the current WhatsApp inquiry metric with actual order counts instead of marketing placeholders.

## Resume prompt for next agent

`Read AGENT_HANDOFF.md first. Continue Sneha's Boutique from the current April 24, 2026 Wix-aligned code state. Preserve the four public categories, keep WhatsApp as the main customer action flow, keep the replayable scroll-reveal behavior, and update AGENT_HANDOFF.md again after any substantial change.`

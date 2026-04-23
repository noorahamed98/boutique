# Agent Handoff

Read this file first before continuing work on this repo.

## Project

Boutique storefront with:

- `client/` React + Vite
- `server/` Express + PostgreSQL

## Current goals already implemented

- Public users no longer see admin entry points in the storefront.
- Private admin access is hidden behind:
  - URL hash: `#studio-admin`
  - Keyboard shortcut: `Ctrl + Shift + A`
- User-facing categories are fixed to:
  - `Fabrics`
  - `Handlooms`
  - `Materials`
  - `Custom Made`
- WhatsApp links now use guided greeting/inquiry text.
- Storefront UI has been reshaped toward a softer editorial boutique look based on the user's shared references.
- Home page now includes:
  - editorial hero
  - promise/service strip
  - fabrics and customization feature cards
  - new arrivals
  - shop-by-collection
  - customer favorites
  - story split section
  - inspiration gallery
  - testimonials
  - footer/newsletter
- About page now uses the user's provided Snehas Boutique brand copy and includes a founder section placeholder ready for the real founder image.
- Contact page and FAQ content are implemented in `ContactView`.
- Size chart page was restyled to match the latest reference direction.
- Optional pricing fields were added to designs:
  - `price`
  - `original_price`
  - `badge`

## Important files

- `client/src/App.jsx`
- `client/src/lib/storefront.js`
- `client/src/components/HomeView.jsx`
- `client/src/components/AboutView.jsx`
- `client/src/components/ContactView.jsx`
- `client/src/components/CollectionView.jsx`
- `client/src/components/DesignModal.jsx`
- `client/src/components/SiteFooter.jsx`
- `client/src/components/AdminModal.jsx`
- `client/src/styles.css`
- `server/src/routes/designRoutes.js`
- `server/src/routes/authRoutes.js`
- `server/src/middleware/auth.js`
- `server/db/schema.sql`
- `WHATSAPP_GREETING_TEMPLATE.md`

## Backend notes

- Server now auto-runs schema sync from `server/db/schema.sql` on startup.
- In non-production mode, JWT falls back to a dev secret if `JWT_SECRET` is missing.
- In production, set a real `JWT_SECRET`.

## Verification already completed

- `client`: `npm.cmd run build` succeeded on April 23, 2026.
- `server`: `node --check` passed for `src/index.js`, `src/routes/designRoutes.js`, `src/routes/authRoutes.js`, and `src/schema.js`.

## If work needs to continue

1. Check current git diff and avoid reverting unrelated user changes.
2. Start from the files above instead of re-reading the whole repo.
3. Preserve the private admin access pattern unless the user explicitly asks to change it.
4. Keep the four public categories fixed.
5. Keep WhatsApp messaging polished and customer-facing.
6. The next expected change is replacing the founder placeholder visual with the real founder image once the user provides it.

## Resume prompt for the next agent

`Read AGENT_HANDOFF.md first. Continue the Sneha's Boutique storefront from the current code state without restarting from scratch. Keep admin hidden from public users, preserve the four public categories, keep the WhatsApp greeting/inquiry flow intact, and build forward from the latest implemented code instead of redoing already completed work.`

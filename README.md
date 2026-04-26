# Sneha's Boutique Full-Stack App

This project is now a full-stack application with:

- React.js frontend (`client`)
- Node.js + Express backend (`server`)
- PostgreSQL database (`server/db/schema.sql`)

## Current UX Features

- Professional responsive storefront with hero, studio highlights, featured designs, and fit guide
- Advanced collection controls: search, category filters, wishlist filter, sort, grid/list views
- Persistent browser wishlist stored in local storage
- WhatsApp inquiry links pre-filled with design details
- Admin studio with catalog metrics, searchable management list, drag/drop image upload, edit/delete actions, and toast feedback

## Project Structure

```text
boutique/
|- client/                  # React (Vite) frontend
|  |- public/assets/        # Boutique images/logo
|  |- src/
|     |- api/               # API client
|     |- components/        # UI components
|     |- App.jsx
|     |- main.jsx
|     |- styles.css
|
|- server/                  # Express backend
|  |- db/
|     |- schema.sql         # PostgreSQL schema
|  |- src/
|     |- middleware/
|     |- routes/
|     |- scripts/initDb.js
|     |- index.js
|
|- package.json             # Root scripts (run both apps)
```

## 1. Prerequisites

- Node.js 18+ (recommended: 20+)
- PostgreSQL 13+

## 2. Setup

From project root:

```bash
npm install
npm run install:all
```

Configure backend environment:

```bash
cp server/.env.example server/.env
```

Then edit `server/.env` with your PostgreSQL credentials and a strong `JWT_SECRET`.

If you deploy the frontend separately on Cloudflare Pages, also set these backend allowlist values in `server/.env` or your hosting provider:

```bash
FRONTEND_URL=https://your-project.pages.dev
FRONTEND_URL_SUFFIXES=.pages.dev
```

`FRONTEND_URL_SUFFIXES=.pages.dev` allows Cloudflare Pages preview deployments to reach the API. Leave it empty if you only want to allow exact origins.

Create the PostgreSQL database if it does not exist:

```sql
CREATE DATABASE boutique_db;
```

Initialize tables:

```bash
npm run db:init
```

## 3. Run In Development

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 4. Admin Login

Admin credentials come from `server/.env`:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

Default (from example env):

- username: `admin`
- password: `admin123`

## Deploy On Render

The fastest Render setup for this repo is a single web service plus one Render Postgres database. This repo now includes a root `render.yaml` Blueprint for that flow.

1. Push this repo to GitHub.
2. In Render, choose `New +` -> `Blueprint`.
3. Select this GitHub repo and keep the detected `render.yaml`.
4. When prompted, enter values for:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
5. Click `Apply`.

Render will:

- create a Node web service
- create a Postgres database
- inject `DATABASE_URL`
- generate `JWT_SECRET`
- build the React client
- serve the frontend and `/api` from the same Express app

After the first deploy, open the generated Render URL and use your configured admin credentials to sign in.

## Deploy Frontend On Cloudflare Pages

The current codebase is still a split deployment when using Cloudflare:

- `client/` can deploy to Cloudflare Pages
- `server/` should stay on Render or another Node.js + PostgreSQL host unless you do a separate Cloudflare backend migration

This repo now includes `.github/workflows/deploy-cloudflare-pages.yml` so every GitHub push builds the frontend and deploys it to Cloudflare Pages automatically.

If those Cloudflare repository secrets or variables are missing, the workflow now still builds the frontend but skips the Cloudflare deploy step and writes the missing settings into the GitHub Actions step summary.

1. Create a Cloudflare Pages project once in the Cloudflare dashboard.
2. In GitHub repository settings, add these secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. In GitHub repository settings, add these variables:
   - `CLOUDFLARE_PAGES_PROJECT_NAME`
   - `VITE_API_BASE_URL`
4. Set `VITE_API_BASE_URL` to your live backend API base, for example `https://your-api-host.example.com/api`.
5. Update the backend host environment so CORS allows your Pages domain:
   - `FRONTEND_URL=https://your-project.pages.dev`
   - optional: `FRONTEND_URL_SUFFIXES=.pages.dev`

When you push to `main`, Cloudflare Pages will create the production deployment. Pushes to other branches will create Pages preview deployments.

## API Endpoints

Public:

- `GET /api/health`
- `GET /api/designs`
- `GET /api/designs?category=<category>`
- `GET /api/designs/categories`
- `POST /api/auth/login`

Admin (Bearer token required):

- `GET /api/auth/verify`
- `POST /api/designs`
- `PUT /api/designs/:id`
- `DELETE /api/designs/:id`

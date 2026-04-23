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

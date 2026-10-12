# Velvora Solutions – website frontend

React + Vite + React Router + Lucide. Frontend only (no backend, API, CMS or auth).

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```
If you host the build statically, configure the host to serve `index.html` for all routes (SPA fallback).

## Where to edit
- `src/data/site.js` – navigation, services, company facts, resource content (`content[...]items`).
- `src/styles.css` – design tokens at the top (`:root`).
- `public/logo.png` – supplied logo (not modified; displayed with fixed aspect ratio).

## Content status
Facts come from https://www.velvorasolutions.com/. Services not described there (ePublishing specifics, website accessibility audits, data analytics, digital marketing) show a visible "to be confirmed" notice or empty state. News, case studies, testimonials, blog, guides and vacancies are empty states by design. No phone number or postal address is published on the official site, so none is shown.

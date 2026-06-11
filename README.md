# 🎬 Movie Tier List Maker

A tiny, single-page app for ranking a fixed list of ~68 movies into tiers
(S / A / B / C / D / F) plus a **"Missed that week"** row. Drag posters from the
tray into tiers, then export the board as a PNG. Your layout auto-saves in the
browser.

Built with Vite + React + TypeScript + [@dnd-kit](https://dndkit.com) +
[html-to-image](https://github.com/bubkoo/html-to-image). No backend, no API
keys — posters are baked into `src/data/movies.ts` as TMDB image URLs.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deploy to Vercel

It's a standard Vite app, so Vercel detects everything automatically.

**Option A — CLI**

```bash
npm i -g vercel
vercel          # first run links/creates the project (preview deploy)
vercel --prod   # production deploy
```

**Option B — Git**

Push this folder to a GitHub repo, then "Add New Project" in the Vercel
dashboard and pick it. Framework preset: **Vite**. Build command `npm run build`,
output directory `dist` (both auto-filled).

## Editing the movie list / posters

Everything lives in [`src/data/movies.ts`](src/data/movies.ts). Each entry:

```ts
{ id: 34, title: 'Shrek', year: 2001, boxd: 'https://boxd.it/29zi',
  poster: TMDB('iB64vpL3dIObOtMZgX3RqdVdQDc') }
```

- **Wrong/ugly poster?** Find the film on [themoviedb.org](https://www.themoviedb.org),
  open the poster, copy the hash from the image URL
  (`.../t/p/original/<HASH>.jpg`), and drop it into `TMDB('<HASH>')`. Or set
  `poster: null` to show a text-only card instead.
- **Add a movie?** Append a new object with a unique `id`. It shows up in the
  tray automatically (saved boards reconcile new entries into the tray).

## Tiers

Edit [`src/tiers.ts`](src/tiers.ts) to rename tiers, change colors, add/remove
rows, or relabel the "Missed that week" row.

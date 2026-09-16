# MovieExplorer

A responsive movie/show explorer built with React, React Router and Tailwind CSS, using the free [TVMaze API](https://www.tvmaze.com/api) (no key required).

## Running it

```bash
npm install
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`.

To build for production: `npm run build`, then `npm run preview` to check the output.

## Routes

| Route     | What it does                                       |
| --------- | -------------------------------------------------- |
| `/`       | Landing page: navbar, hero banner, footer           |
| `/movies` | Listing page: search bar, responsive card grid, modal |

The search query is kept in the URL (`/movies?q=girls`), so a search can be bookmarked, shared or reloaded without losing state.

## API endpoints used

- `GET /shows?page=0` — the default grid, sorted by rating, top 60 with posters
- `GET /search/shows?q=:query` — title search
- `GET /shows/:id?embed[]=cast` — fed to the details modal for genres, network and cast

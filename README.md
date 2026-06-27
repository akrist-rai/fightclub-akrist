# FIGHT CLUB // Project Mayhem

A purposeless homage, now a proper **Vite + React** frontend. The first rule is you do not talk about it.

## Run it

```bash
npm install
npm run dev      # dev server (http://localhost:5173)
npm run build    # production build -> dist/
npm run preview  # serve the production build
```

## Structure

```
index.html              Vite entry (loads /src/main.jsx)
src/
  main.jsx              React root
  App.jsx               composes every section + global effects
  index.css            all styling (verbatim from the original single-file build)
  data.js              copy, rules, catalog, homework, etc.
  lib/svg.js           original line-art icon + IKEA furniture markup
  context/Fx.jsx       subliminal flashes, screen "glitch", reduced-motion guard
  components/          one file per section / interactive element
public/img/            all artwork (movie stills + props)
```

The previous single-file version is kept as `legacy-standalone.html` (open directly, no build).

## Notes
- Artwork lives in `public/img` and is referenced as `img/...`.
- Respects `prefers-reduced-motion` (disables grain, flashes, shake).
- Unauthorized fan tribute. Not affiliated with anyone — least of all yourself.

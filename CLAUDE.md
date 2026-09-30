# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page landing site for "NEXUS Cyber Arena", a computer/esports club. It uses React 18 and Vite 5, with framer-motion for animation and Lenis for smooth scrolling. The code is plain JSX: no TypeScript, no router, no state library. The club is in Almaty, Kazakhstan, and prices are in tenge (₸). The site is bilingual, Russian and Kazakh (see Localization). Code comments and the README are in Russian, so keep new comments in Russian and add every new piece of UI copy in both languages.

The design source is `../desine/stitch_cyber_club_gaming_website_design/`, which lives outside this repo and is not tracked here. It holds `code.html` and `screen.png` mockups for each screen, plus `cyber_lounge_esports_arena/DESIGN.md`, which defines the design tokens mirrored in `src/styles.css`.

## Commands

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the built dist/
```

The project has no linter, formatter config or test suite. `npm run build` is the only automated check.

## Architecture

- **Composition**: `src/App.jsx` stacks the section components in page order. It owns the little cross-section state there is: `ready` (set once the Preloader finishes, then passed to Hero to start its entrance animation), `pickedZone` (clicking "Бронь" on a Zones card pre-filters the Booking seat map and selects the first free seat) and a global toast (`onToast`, used by Tournaments and Offers).
- **Content**: all data (nav, zones, seat map, packages/prices, games, tournaments, menu, offers, contacts) lives in `src/data/content.js` as named exports; UI strings (headings, buttons, labels, aria-labels) live in `src/i18n/ui.js`. Components hold no hard-coded copy. `content.js` is meant to be replaced by API data later.
- **Navigation**: section `id`s must match the `NAV` ids in `content.js`. `useActiveSection` watches those ids (plus `top`) with an IntersectionObserver to highlight the active menu item in both `Header` and the mobile `TabBar`, which is exported from `Header.jsx`.
- **Scrolling**: `src/hooks/useSmoothScroll.js` holds a module-level Lenis singleton. Always scroll with `scrollToId(id)` (it applies the header offset and falls back to native scrolling when reduced motion is on). Use `lockScroll(bool)` for modals and the mobile menu instead of toggling `overflow` directly, because it also stops and starts Lenis.
- **Animation helpers**: `src/components/Reveal.jsx` provides `Reveal` (fade/slide in on view), the `stagger`/`item` variants, `SectionHead` (eyebrow + H2 + lead) and the shared `EASE` curve. Reuse these rather than writing new motion variants per section. The app is wrapped in `<MotionConfig reducedMotion="user">`, and the reduced-motion case is also handled in the hooks and in `AutoVideo`.
- **Media**: `AutoVideo` plays muted looping video only while it is on screen. Videos in `public/media/` are pre-compressed for the web (no audio, faststart), and each has a `-poster.jpg`. Reference public assets by absolute path (`/media/...`, `/img/...`).
- **Icons**: `<Icon name="..." />` renders Material Symbols Outlined ligatures (the font is loaded in `index.html`). Pass `fill` to get the filled variant.

## Localization

`src/i18n/index.jsx` provides `LangProvider` (wraps `App` in `main.jsx`), `useLang()` and `Rich`. The language (`ru` | `kk`) is saved in `localStorage` under `nexus-lang`, and the provider keeps `<html lang>`, the title and the meta description in sync. The switcher (`LangSwitch`) is in `Header.jsx`.

- A translatable value is `{ ru, kk }`; a plain string is shared by both languages (brand names, hardware specs). Read content fields with `tr(value)` and UI strings with `t('key', params)`, where `{name}` placeholders get substituted.
- In `ui.js` strings, `*text*` marks the accent span and `\n` a line break; render them with `<Rich text={t('…')} className="text-cyan" />`. The Hero title splits on `\n` into animated lines.
- Format prices with `money(n)` → `2 430 ₸`. It always uses `ru-RU` grouping, because browsers format `kk-KZ` as `2,430`.
- Don't use a translatable field as a React `key`; use `id`/`icon`/index.
- Kazakh words run long. Check new headings at 360px width; `Hero` lines must stay ≤ ~12 characters.

## Styling

Everything is in one global stylesheet, `src/styles.css`, with no CSS modules or CSS-in-JS. The `:root` tokens hold the palette (`--cyan`, `--magenta`, `--lime`, …), the glow shadows, the fonts (`--f-head` Unbounded, `--f-body` Manrope, `--f-tech` JetBrains Mono) and the `--chamfer` / `--chamfer-sm` clip-path polygons that give the cut-corner look. Use these tokens instead of raw values. The responsive breakpoints sit at the end of the file: 1279px, 1100px, 767px (mobile, where TabBar is shown) and 420px, followed by a `prefers-reduced-motion` block.

## Backend (not implemented)

Integration points are marked `TODO(backend)`:
- `Booking.jsx`: booking submission (`POST /api/bookings { seat, package, name, phone, student }`). Seat occupancy is currently static (`SEAT_ZONES[].busy`).
- `Tournaments.jsx`: team/player registration.

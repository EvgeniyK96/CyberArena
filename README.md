# NEXUS Cyber Arena — сайт компьютерного клуба

React 18 + Vite 5, анимации — framer-motion, плавный скролл — Lenis.
Структура и стиль — по макетам из `../desine/stitch_cyber_club_gaming_website_design`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # сборка в dist/
```

## Структура

- `src/data/content.js` — весь контент (зоны, места, тарифы, игры, турниры, меню). Потом заменить на данные из API.
- `src/components/` — секции страницы: Hero, Telemetry, Zones, AegisShowcase, Booking, Games, Tournaments, Bar, Offers, Footer.
- `src/styles.css` — токены дизайна (цвета, glow, chamfer) и стили.
- `public/media/` — видео, пережатые для веба (без звука, faststart) + постеры.
- `public/img/` — изображения из макета.

## Бэкенд (не реализован)

Места для интеграции помечены `TODO(backend)`:
- `Booking.jsx` — отправка брони (`POST /api/bookings`), занятость мест сейчас статична (`SEAT_ZONES[].busy`).
- `Tournaments.jsx` — регистрация на турнир.

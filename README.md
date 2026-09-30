# NEXUS Cyber Arena — сайт компьютерного клуба

React 18 + Vite 5, анимации — framer-motion, плавный скролл — Lenis.
Структура и стиль — по макетам из `../desine/stitch_cyber_club_gaming_website_design`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # сборка в dist/
```

## Структура

- `src/data/content.js` — весь контент (зоны, места, тарифы, игры, турниры, меню). Цены — в тенге (₸). Потом заменить на данные из API.
- `src/i18n/` — мультиязычность (русский / казахский): `ui.js` — строки интерфейса, `index.jsx` — `LangProvider`, `useLang()` и `Rich`.
- `src/components/` — секции страницы: Hero, Telemetry, Zones, AegisShowcase, Booking, Games, Tournaments, Bar, Offers, Footer.
- `src/styles.css` — токены дизайна (цвета, glow, chamfer) и стили.
- `public/media/` — видео, пережатые для веба (без звука, faststart) + постеры.
- `public/img/` — изображения из макета.

## Языки

Сайт двуязычный: русский и казахский, переключатель ҚАЗ / РУС в шапке и мобильном меню. Выбор запоминается в `localStorage`; при первом визите язык берётся из браузера (`kk*` → казахский, иначе русский).

Переводимое значение — объект `{ ru, kk }` (в `content.js` и `i18n/ui.js`), обычная строка одинакова для обоих языков. В компонентах: `const { t, tr, money } = useLang()`:
- `t('ключ', { n })` — строка интерфейса из `ui.js` с подстановкой `{n}`;
- `tr(значение)` — выбрать язык у поля из `content.js`;
- `money(900)` → `900 ₸`.

В строках заголовков `*слово*` — акцентное выделение, `\n` — перенос строки (рендерит компонент `Rich`).

## Бэкенд (не реализован)

Места для интеграции помечены `TODO(backend)`:
- `Booking.jsx` — отправка брони (`POST /api/bookings`), занятость мест сейчас статична (`SEAT_ZONES[].busy`).
- `Tournaments.jsx` — регистрация на турнир.

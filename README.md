# 618TRENDS

A responsive React + Vite news dashboard for sports, politics, entertainment, social affairs and more.

## Run locally

```bash
npm install
npm run dev
```

Build for production with `npm run build`.

## Current functionality

- Responsive editorial homepage and category navigation
- Search stories by title, summary or category
- Category filtering and trending topic chips
- Save/bookmark stories locally in the browser
- Notification preferences with per-section toggles and “notify me about all”
- Settings drawer with language preference and compact/comfortable reading mode
- Story detail view and share action

## News data

The starter UI uses clearly labeled sample headlines so the interface works immediately. To publish real-time journalism, connect a trusted news API or your own backend, implement server-side API key handling, and replace the sample `stories` data in `src/App.jsx`. Do not expose provider API keys in frontend code.

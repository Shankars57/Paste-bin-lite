# Pastebin-Lite Backend

Minimal Pastebin-like backend built with Node.js, Express, and Neon (Postgres).

## Features
- Create pastes with optional TTL and view limits
- Fetch pastes via API
- View pastes via HTML
- Deterministic time testing using TEST_MODE and x-test-now-ms

## Persistence Layer
- PostgreSQL (Neon serverless Postgres)
- Uses a single `pastes` table

## Local Setup

```bash
npm install
export DATABASE_URL=postgresql://user:pass@host/db
node index.js
```

Before running, execute the SQL in `schema.sql` once.

## Notes
- No in-memory state
- Safe HTML rendering
- Compatible with serverless platforms like Vercel
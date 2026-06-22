# DAQS — Data Analytics & Quantitative Solutions

The marketing site and lightweight admin console for **DAQS**, a data
science, AI, quantitative finance, and accounting consulting and
training firm. Built as a single full-stack TypeScript app: a Vite/React
front end served by an Express + tRPC back end, with an optional MySQL
database that the app degrades gracefully without.

**Live site:** [daqs.com](https://www.daqs.com) (once the domain is
pointed at the deployment)

---

## Features

**Marketing pages**
- Home, Services, About, Training (with a course catalogue), Blog,
  Projects (live platforms + written case studies), Media Hub, Document
  Library, Contact
- Branded background imagery and a persistent left sidebar (Data
  Science / Machine Learning / Deep Learning / Agentic AI quick links)

**Lead generation**
- **Free AI & Data Readiness Assessment** (`/assessment`) — a 6-question
  quiz that scores a visitor's AI readiness and recommends a training
  track, gated behind an email-capture form
- **Gated lead magnet** — a real branded PDF checklist in the Document
  Library, unlocked via name/email capture before download
- Contact form and a floating chatbot widget, both wired to the same
  lead pipeline

**Live AI demos** (`/live-demo`)
- **Text Analyzer** — paste a customer review, email, or report excerpt
  and get real-time sentiment, key themes, and a business risk flag
- **Ask Our AI Analyst** — a focused Q&A tool for data/AI/finance
  questions
- Both call the same LLM gateway as the chatbot — genuine live calls,
  not canned responses

**Admin (authenticated, `role: admin` only)**
- Upload documents to the Document Library and media items to the Media
  Hub directly from the UI

---

## Tech Stack

| Layer | Technology |
|---|---|
| Front end | React 19, Vite 7, TypeScript, Tailwind CSS v4, wouter (routing), shadcn/ui + Radix primitives |
| Back end | Express, tRPC (typed API, no REST schema to maintain), Node.js |
| Database | MySQL via Drizzle ORM — **optional**, see [Database](#database) |
| LLM | Gemini 2.5 Flash via a configurable OpenAI-compatible gateway, see [Environment Variables](#environment-variables) |
| File storage | Pluggable storage proxy for document/media uploads (see note below) |
| Testing | Vitest |

---

## Project Structure

```
client/
  src/
    pages/        One file per route (Home.tsx, Services.tsx, ...)
    components/    Shared UI: Navigation, Footer, Sidebar, Chatbot,
                    live-demo components, shadcn/ui primitives
    lib/trpc.ts    tRPC client setup
    assets/        DAQS branded imagery
  public/
    downloads/     Static files served as-is (e.g. the lead-magnet PDF)
server/
  routers.ts       All tRPC routers (contact, documents, media,
                    chatbot, demo, auth)
  db.ts            Lazy MySQL connection (no-ops without DATABASE_URL)
  storage.ts       File upload/download proxy helpers
  _core/
    llm.ts         LLM gateway client (invokeLLM)
    env.ts         Centralised environment variable reads
    oauth.ts       OAuth login/callback routes
    vite.ts        Dev (Vite middleware) vs. production (static) serving
drizzle/
  schema.ts        Database table definitions
  *.sql            Generated migrations
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- [pnpm](https://pnpm.io/) (the project uses `pnpm-lock.yaml`)

### Install & run

```bash
pnpm install
pnpm dev          # starts the dev server (default port 3000, auto-picks the next free port if busy)
```

Open the printed `http://localhost:PORT/` URL. The app builds the React
bundle through Vite's dev middleware and runs the Express/tRPC API on
the same port.

### Build & run for production

```bash
pnpm build        # vite build (client) + esbuild bundle (server) -> dist/
pnpm start         # NODE_ENV=production node dist/index.js
```

---

## Environment Variables

None of these are required to run the app locally — every integration
degrades gracefully when its variable is missing (the database falls
back to in-memory/no-op, the LLM calls throw a clear "not configured"
error instead of crashing, etc.). Set what you need for the features
you're testing.

| Variable | Required for | Notes |
|---|---|---|
| `PORT` | — | Defaults to `3000`; the app auto-increments if the port is busy. **On Railway this is set automatically — don't override it.** |
| `NODE_ENV` | — | `development` uses Vite middleware; anything else serves the pre-built `dist/public`. |
| `DATABASE_URL` | Persisting leads, documents, media, chat history | MySQL connection string. Without it, forms still submit (and still trigger owner notifications/LLM calls) but nothing is written to a database. |
| `BUILT_IN_FORGE_API_KEY` | Chatbot, Live Demo, **and** admin file uploads | API key for the LLM gateway. ⚠️ See the callout below — this key is shared between two unrelated features. |
| `BUILT_IN_FORGE_API_URL` | Same as above | Base URL for the gateway. Defaults to a Manus-hosted gateway (`https://forge.manus.im`) if unset. |
| `OAUTH_SERVER_URL` | Admin login | OAuth provider base URL, used to gate admin-only actions (document/media upload). |
| `JWT_SECRET` | Admin login | Signs the session cookie. |
| `OWNER_OPEN_ID` | Admin role assignment | The OAuth `openId` that gets auto-promoted to `admin` on first login. |

### ⚠️ Important: `BUILT_IN_FORGE_API_URL`/`KEY` serve two unrelated purposes

This pair of variables is consumed by **two completely different
systems** that happen to share a config key:

1. **LLM calls** (`server/_core/llm.ts`) — the chatbot and the two
   `/live-demo` tools call this URL expecting an OpenAI-compatible
   `/chat/completions` endpoint. The model is hardcoded to
   `gemini-2.5-flash`, so a Google Gemini API key works here via
   Gemini's OpenAI-compatible endpoint:
   ```
   BUILT_IN_FORGE_API_URL=https://generativelanguage.googleapis.com/v1beta/openai/chat/completions
   BUILT_IN_FORGE_API_KEY=<your Gemini API key>
   ```
2. **File storage** (`server/storage.ts`) — admin document/media
   uploads call the *same* base URL expecting a Manus-specific
   `/v1/storage/upload` and `/v1/storage/downloadUrl` API. This is
   **not** OpenAI- or Google-compatible.

**Consequence:** pointing this URL at Google (or any other LLM
provider) to fix the chatbot/live demo will break admin file uploads,
since that provider won't understand the storage proxy calls. If you
need both working independently, the storage helper in
`server/storage.ts` will need its own, separately configured base
URL/key rather than reusing `ENV.forgeApiUrl`/`ENV.forgeApiKey`.

A starter `.env.example` is included — copy it to `.env` for local
development:

```bash
cp .env.example .env
```

---

## Database

The app runs perfectly well with **no database configured** — `getDb()`
in `server/db.ts` returns `null` if `DATABASE_URL` is unset, and every
caller checks for that before writing. This means leads, uploads, and
chat history simply aren't persisted until you connect one.

To set one up:

```bash
# 1. Set DATABASE_URL in your .env
# 2. Generate + run migrations
pnpm db:push
```

Schema lives in `drizzle/schema.ts`. Tables: `users`,
`contact_submissions`, `documents`, `media_items`, `chat_messages`,
`blogPosts`, `caseStudies`, `testimonials`.

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server with hot reload |
| `pnpm build` | Production build (client + server bundle) |
| `pnpm start` | Run the production build |
| `pnpm check` | TypeScript type-check, no emit |
| `pnpm format` | Format the codebase with Prettier |
| `pnpm test` | Run the Vitest test suite |
| `pnpm db:push` | Generate and run Drizzle migrations |

---

## Deployment

Currently deployed on [Railway](https://railway.app). Notes specific to
that platform:

- Railway injects `PORT` automatically — the app reads it via
  `process.env.PORT`, no action needed.
- Environment variables must be set on the **service itself**, not just
  under the project's "Shared Variables" — shared variables aren't
  injected into a service unless explicitly referenced from that
  service's own Variables tab.
- Changing a variable triggers a redeploy; confirm the **Deployments**
  tab shows a fresh "Active" deployment after any env var change before
  retesting.
- Build command: `pnpm build`. Start command: `pnpm start`.

---

## Known Limitations

- No automated CI/CD pipeline configured yet.
- The chatbot, live demos, and admin file uploads all depend on
  `BUILT_IN_FORGE_API_KEY`/`URL` being correctly configured (see the
  callout above) — without it, those features fail with a clear error
  rather than crashing the app.
- Several pages (Blog posts, Case Studies, Testimonials) currently use
  hardcoded sample data rather than reading from their corresponding
  database tables, even though those tables exist in the schema.

---

## License

MIT

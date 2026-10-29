# redvault

A TypeScript monorepo boilerplate for building a real API-backed app: an
Express 5 API server, PostgreSQL + Drizzle ORM, an OpenAPI 3.1 spec with
Orval codegen (React Query hooks + Zod schemas), and a small React demo
front end that consumes the API through the generated hooks. Nothing is
faked: the demo feature below runs end-to-end against a real database.

## Stack

- **Monorepo:** pnpm workspaces, Node.js 24, TypeScript 5.9
- **API:** Express 5, Pino logging, CORS, JSON parsing
- **Database:** PostgreSQL + Drizzle ORM (+ drizzle-zod for validation)
- **API contract:** OpenAPI 3.1 (`lib/api-spec/openapi.yaml`), Orval codegen
- **Front end:** React 19 + Vite + TanStack React Query (`artifacts/web`)
- **Build:** esbuild (API bundle), Vite (web), `tsc --build` (typecheck)

## What you get

- `GET /api/healthz` — health check, validated against the OpenAPI spec.
- **Tasks demo feature (working end-to-end):** a `tasks` table with full
  CRUD (`GET /tasks`, `POST /tasks`, `GET /tasks/{id}`,
  `PATCH /tasks/{id}`, `DELETE /tasks/{id}`), request validation with
  drizzle-zod, OpenAPI schemas, generated React Query hooks, and a Tasks
  page in `artifacts/web` that lists, creates, completes, and deletes
  tasks through those hooks. Copy this pattern to add your own resources:
  model → OpenAPI → codegen → route → page.
- Database migrations: `lib/db/drizzle/` holds generated SQL migrations
  (see below). Development can use `drizzle-kit push` instead.
- A supply-chain guard: `pnpm-workspace.yaml` requires packages to be at
  least 1 day old before install (`minimumReleaseAge: 1440`).

## Quickstart

Prerequisites: Node.js 24 and pnpm 10.

```bash
pnpm install
cp .env.example .env
```

### 1. Database

Either start local PostgreSQL with Docker Compose:

```bash
docker compose up -d
```

or point `DATABASE_URL` in `.env` at any hosted PostgreSQL database
(Neon, Supabase, Railway, or your own server). No Replit account or
provisioning is required — any PostgreSQL connection string works.

### 2. Apply the schema

For development, push the schema directly:

```bash
pnpm --filter @workspace/db run push
```

For production-style deploys, generate SQL migrations and apply them:

```bash
pnpm --filter @workspace/db exec drizzle-kit generate --config ./drizzle.config.ts
pnpm --filter @workspace/db exec drizzle-kit migrate --config ./drizzle.config.ts
```

The first migration (`drizzle/0000_*.sql`) is already generated and
committed; it creates the `tasks` table.

### 3. Run it

```bash
# API server on http://localhost:8080 (PORT in .env)
pnpm --filter @workspace/api-server run dev

# Web demo on http://localhost:5173 (proxies /api to the API server)
pnpm --filter @workspace/web run dev
```

Open http://localhost:5173 and use the Tasks page. `GET /api/healthz`
should return `{"status":"ok"}`.

### 4. Builds and typecheck

```bash
pnpm run typecheck   # tsc --build for libs, per-package typecheck for apps
pnpm run build       # typecheck, then every package's build script
```

The API production bundle is `artifacts/api-server/dist/index.mjs`
(`pnpm --filter @workspace/api-server run build`, then `run start`).

## Adding your own resource

1. Add a Drizzle table + insert schema in `lib/db/src/schema/<name>.ts`
   and export it from `lib/db/src/schema/index.ts`.
2. Add the paths and schemas to `lib/api-spec/openapi.yaml`.
3. Regenerate clients: `pnpm --filter @workspace/api-spec run codegen`
   (writes React Query hooks to `lib/api-client-react/src/generated/`
   and Zod schemas to `lib/api-zod/src/generated/` — never edit those
   folders by hand).
4. Add an Express router in `artifacts/api-server/src/routes/` and mount
   it in `artifacts/api-server/src/routes/index.ts`.
5. Use the generated hooks from `@workspace/api-client-react` in the
   front end. Do not change the API title in `openapi.yaml` — generated
   import paths depend on it being `Api`.

## Project structure

```text
artifacts/
  api-server/    # Express API server (@workspace/api-server)
  web/           # React demo front end (@workspace/web)
lib/
  api-spec/          # OpenAPI spec + Orval config
  api-client-react/  # Generated React Query hooks
  api-zod/           # Generated Zod schemas
  db/                # Drizzle schema, client, migrations
scripts/             # Utility scripts (@workspace/scripts)
pnpm-workspace.yaml  # Workspace + shared dependency catalog
tsconfig.base.json   # Shared TypeScript options
```

## NOT included — read this before buying

This is a **boilerplate**, not a finished product. You still need to
build, among other things:

- Authentication and authorization (there is no login, no users table,
  and no auth middleware — the Tasks API is open by design as a demo)
- Payments, email, file uploads, background jobs
- An admin UI, tests, and CI/CD configuration
- Any domain-specific features beyond the Tasks example

The Tasks feature is an example resource showing the full pattern, not
a product in itself.

## License

This repository is **MIT licensed** — see `LICENSE`. The root
`package.json` states `license: MIT` and is not marked private, so the
license on the sold repository is unambiguous. The workspace
sub-packages keep `"private": true` because they are internal modules
of this repo, not packages published to npm on their own; that flag does
not restrict the MIT license on the repository as a whole.

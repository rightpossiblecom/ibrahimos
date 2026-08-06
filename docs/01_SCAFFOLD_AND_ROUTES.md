# Phase 01 — Scaffold and routes

**Depends on:** Cloud Grant architecture structure (fixed route tree). Empty or near-empty project directory.

**Goal:** Stand up a fresh Next.js App Router app with TypeScript, Tailwind, and pnpm, and stub every marketing, auth, and dashboard route the BLUEPRINT requires — including IbrahimOS extras (Fields, Market, Weather) and a placeholder analyze API route.

**Why this is first:** Later phases fill real UI into known paths. Without the tree, marketing and dashboard work thrash.

---

## What we build

### Project scaffold
- Initialise Next.js (App Router, TypeScript, Tailwind, ESLint, pnpm) at the repo root.
- Confirm `pnpm build` / `pnpm dev` can run on stubs.

### Docs spine for the product
- Ensure this `docs/` plan set is the source of truth (already present).
- Add a short product identity note if needed for implementers (brand **IbrahimOS**, shortName **ibrahim**, tagline, lead paths). Prefer keeping identity in Phase 02 config; Phase 01 only needs routes and runnable app.

### Route stubs (BLUEPRINT)
Create stub pages for:

**Marketing:** home, about, product, team, pricing, waitlist, demo, early-access, privacy, terms — with a marketing layout shell placeholder.

**Auth (not linked from marketing):** login, signup.

**Dashboard (not linked from marketing):** layout shell placeholder; Overview (`/dashboard`); New; Result (`/projects/[id]`); Account; Fields; Market; Weather.

**API:** `POST /api/analyze` stub that returns not-implemented until Phase 06.

Stub copy may say the page is a scaffold placeholder **only inside this phase**; Phase 09 forbids leftover stub language on recorded paths.

## Files (indicative)

- `package.json`, Next/Tailwind/TS configs
- `app/layout.tsx`, `app/globals.css`
- `app/(marketing)/**`
- `app/(auth)/**`
- `app/(dashboard)/**`
- `app/api/analyze/route.ts`

## Exit criteria

- [ ] App scaffolds with pnpm; TypeScript App Router + Tailwind in place
- [ ] Every BLUEPRINT route above resolves without 404
- [ ] Dashboard extras Fields, Market, Weather exist
- [ ] Analyze route exists (even if not-implemented)
- [ ] `pnpm build` succeeds on stubs

## Handoff to Phase 02

Phase 02 needs a runnable app and stable paths so config can be wired without inventing new IA. shortName **ibrahim** and dual demo seeds are defined next.

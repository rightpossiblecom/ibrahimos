# IbrahimOS — master plan

**Created:** August 1, 2026  
**Status:** Shipped (demo v1) — phases 01–09 complete; owner media waived until provided.  
**Owners:** Cloud Grant / IbrahimOS

**Method:** [PLANNING.md](./PLANNING.md) · **Architecture:** [ARCHITECTURE.md](./ARCHITECTURE.md) · **Env:** [ENVIRONMENT.md](./ENVIRONMENT.md) · **Logging:** [LOGGING.md](./LOGGING.md) · **Intake:** [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md)

---

## 1. What we are building

**IbrahimOS Cloud Grant demo** — a high-fidelity startup demo platform for an AI farm operating system aimed at African agriculture.

```
Visitor ──▶ Marketing (credibility) ──▶ Waitlist / Demo / Early access
                                              (leads in browser storage)

Operator ──▶ /login ──▶ Overview ──▶ New assessment ──▶ Analyze ──▶ Result
                         ▲                                         │
                         └──────── recent activity ◀───────────────┘
```

Two audiences, one repo:

- **Public visitors** see a professional brand site and can leave contact details. They never get a Login / Dashboard / Open-app path from marketing chrome.
- **Operators** (founders recording for grants/investors) open `/login` directly, walk a believable farm product, run a crop/disease assessment demo, and hit conversion modals that toast successfully.

## 2. Why / key insight

Cloud Grant demos win when they look like **complete products on camera**, not when they have real backends. Persistence is browser storage; AI is one analyze route with a no-key fallback; brand strings live in config so the same factory shape can ship many orgs without cloning visuals.

IbrahimOS’s long-term product vision (Flutter, Nest, Postgres, marketplace, finance) is **out of scope** for this initiative. The demo proves the story and the core loop.

## 3. Product principles

- **Marketing captures leads only** — waitlist, book a demo, early access. No app entry links on public surfaces.
- **Dashboard is for video** — Overview, Account, New, Result, plus category nav; density over stubs.
- **No real backend** — session, leads, assessments in browser storage; optional Gemini on one route.
- **Config spine** — brand and demo copy in config modules, not hardcoded across JSX.
- **No house look** — professional, complete, unique to this org; never paste sibling Cloud Grant UI.
- **Africa-first product voice** — simple language, local crops/markets, naira where money appears.
- **Ask, don’t invent** — CAC numbers, founder LinkedIns, certificates, and demo media come from the owner or are explicitly waived.
- **Screen-record path must work without an API key** when choreography / fallback is configured.

## 4. Tech stack

Fixed by Cloud Grant architecture (details in [ARCHITECTURE.md](./ARCHITECTURE.md)):

- Next.js App Router, TypeScript, Tailwind, pnpm
- Optional framer-motion for intentional motion
- Gemini 2.5 Flash on `POST /api/analyze` only
- localStorage / sessionStorage for session, leads, assessments
- No Supabase, no production DB, no real auth provider, no payments

## 5. How to use this plan

1. Read [PLANNING.md](./PLANNING.md), then [ARCHITECTURE.md](./ARCHITECTURE.md), [ENVIRONMENT.md](./ENVIRONMENT.md), [LOGGING.md](./LOGGING.md) once.
2. Execute **Phase 01 → Phase 09 in order.** Later phases assume handoffs from earlier ones.
3. **First useful milestone:** after **Phase 05** — marketing + fake-auth dashboard look real enough to click through (analyze loop still thin).
4. **First recordable milestone:** after **Phase 08** — full New → Result → modals path works, including no-key fallback.
5. **Ship milestone:** after **Phase 09** — media/legal, stub purge, clean build, screen-record checklist green.

## 6. Phase index

| Phase | Document | In one sentence |
| ----- | -------- | --------------- |
| 01 | [01_SCAFFOLD_AND_ROUTES.md](./01_SCAFFOLD_AND_ROUTES.md) | Scaffold Next.js and stub every marketing, auth, and dashboard route in the Cloud Grant BLUEPRINT. |
| 02 | [02_CONFIG_AND_DEMO_SEEDS.md](./02_CONFIG_AND_DEMO_SEEDS.md) | Fill site + demo-flow config and at least two rich farm assessment seeds. |
| 03 | [03_MARKETING_SITE.md](./03_MARKETING_SITE.md) | Finish the public marketing site with lead-only CTAs and a unique professional look. |
| 04 | [04_LEAD_CAPTURE.md](./04_LEAD_CAPTURE.md) | Wire waitlist, demo, and early-access forms into browser lead storage. |
| 05 | [05_AUTH_AND_DASHBOARD.md](./05_AUTH_AND_DASHBOARD.md) | Fake auth plus a complete dashboard (Overview, Account, Fields, Market, Weather). |
| 06 | [06_ANALYZE_API.md](./06_ANALYZE_API.md) | Intake contract, assessments store, analyze route with Gemini + procedural fallback. |
| 07 | [07_NEW_ASSESSMENT_FLOW.md](./07_NEW_ASSESSMENT_FLOW.md) | `/new` upload and manual intake with choreographed pipeline for reliable demos. |
| 08 | [08_RESULTS_AND_CONVERSIONS.md](./08_RESULTS_AND_CONVERSIONS.md) | Full results page plus Premium, Financing, and Buyer modals with toasts. |
| 09 | [09_MEDIA_LEGAL_AND_SHIP.md](./09_MEDIA_LEGAL_AND_SHIP.md) | Product media, legal pages, asset gates, stub purge, build + screen-record checklist. |

## 7. Core demo loop (operator camera)

1. Open `/login` with any credentials → Overview (farm health, weather, tasks, recent assessments).
2. Start a new assessment → upload a crop photo and/or enter crop, symptom, location.
3. Pipeline overlay (and/or analyze API) produces a structured farm assessment.
4. Results show diagnosis, confidence, treatment, impact, and next actions.
5. Conversion modals (Premium AI, input financing, find buyers) succeed with toasts.
6. Return to Overview — the new assessment appears in recent activity.

## 8. Definition of done (whole initiative)

**Done when:**

- Public marketing has **zero** login / signup / dashboard / “Open app” links; primary CTAs are waitlist, demo, early access only.
- Direct `/login` → Overview feels like a finished agri OS product for this category.
- Account page works (profile / org / plan placeholders + sign out).
- New → pipeline or analyze → results → modals / toasts works end to end.
- Overview shows the new assessment after the loop.
- Demo works without `GEMINI_API_KEY` when fallback / choreography is on.
- `pnpm build` is clean.
- Owner assets are wired **or** missing assets are waived in writing (no invented CAC / founders / fake certs).

## 9. Out of scope for v1

- Production Flutter / NestJS / Postgres / Kubernetes stack from any earlier product notes
- Real authentication providers, databases, or payment processors
- Live marketplace, loans, insurance, IoT, or multi-tenant SaaS
- Copying UI from sibling Cloud Grant org repos
- Inventing legal registration details or founder identities

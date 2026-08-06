# Architecture

**Created:** August 1, 2026  
**Status:** Planning  
**Read with:** [00_OVERVIEW.md](./00_OVERVIEW.md), [ENVIRONMENT.md](./ENVIRONMENT.md), [LOGGING.md](./LOGGING.md)

This records IbrahimOS’s **Cloud Grant** technical shape so every phase builds the same thing.

---

## 1. System shape

```
┌─────────────────────────────────────────────────────────────┐
│  Next.js App Router (one deployable)                        │
│                                                             │
│  (marketing)/*     credibility + lead forms                 │
│  (auth)/*          login / signup — NOT linked from public  │
│  (dashboard)/*     operator screen-record product           │
│  POST /api/analyze Gemini 2.5 Flash OR procedural fallback  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
              Browser storage (keyed by shortName)
              · session · leads · assessments
```

No separate backend service. No production database. The only server AI call is the analyze route.

## 2. Public vs hidden

| Surface | Purpose | Linked from marketing? |
| ------- | ------- | ---------------------- |
| Marketing pages | Brand credibility + lead capture | Yes |
| `/waitlist`, `/demo`, `/early-access` | Lead forms | Yes (CTAs) |
| `/login`, `/signup` | Fake auth for operators | **No** |
| `/dashboard`, `/new`, `/projects/*`, `/account`, extras | Demo product | **No** |

**Forbidden on marketing chrome:** links or CTAs to login, signup, dashboard, or “Open app”.

## 3. Config spine

- `config/site.ts` — brand, nav, CTAs, problems, pricing, team, demo result seeds, locale/currency.
- `config/demo-flow.ts` — pipeline steps, conversion modal copy, `hardcodeVisionDemo` flag.
- Storage keys derive from `shortName` (for this org: `ibrahim`): session, leads, assessments.
- Zero company/product name strings hardcoded in JSX — pages read config.

## 4. Dashboard information architecture

Always ship:

- **Overview** (`/dashboard`) — farm health, weather strip, tasks, recent assessments, CTA into the core loop
- **Account** (`/account`) — session email, org/plan placeholders, sign out
- **New** (`/new`) — upload and/or manual intake
- **Result** (`/projects/[id]`) — full intake fields + conversion actions

IbrahimOS extras (1–3 category nav items):

- **Fields** — fields and crops
- **Market** — local crop prices
- **Weather** — localized weather intelligence

Polished believable content beats empty routes. Dashboard is the star of the recording.

## 5. AI loop

1. Client gathers input (image metadata and/or manual fields).
2. `POST /api/analyze` → Gemini when keyed, else procedural fallback (same JSON shape).
3. Client saves assessment JSON to browser storage and navigates to `/projects/{id}`.
4. Optional choreographed pipeline overlay on the upload path when `hardcodeVisionDemo` is true so video never depends on a key.

Shared shape is defined once in [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md).

## 6. Conversion layer

Results CTAs open **domain** modals (Premium AI, input financing, find buyers) with toast feedback. Never leave construction/BOQ/supplier language from other Cloud Grant orgs. Never dead-end primary buttons.

## 7. Scaffold rule

Fresh `create-next-app`. Recreate folders from Cloud Grant architecture structure. **Do not** copy components from sibling Cloud Grant repos.

## 8. Design variance

Cloud Grant does **not** prescribe fonts or palettes. Prefer a UI screenshot if the owner provides one; otherwise choose a coherent professional agri-tech direction and record it in a short design note during Phase 03. Sequential Cloud Grant orgs must not share the same builder fingerprint.

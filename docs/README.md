# IbrahimOS — documentation index

**Created:** August 1, 2026  
**Status:** Planning — follow phases in **numeric order** (01 → 09).  
**Owners:** Cloud Grant / IbrahimOS

**What this is:** A **Cloud Grant demo platform** for **IbrahimOS** — *The AI Operating System for African Agriculture*. Public marketing captures leads only. A hidden, complete-looking dashboard exists for operator screen-record demos. No production database, real auth, or payments.

**Where this lives:** `ibrahimos/` is its own project directory. Stack and IA are fixed by Cloud Grant skills; this `docs/` folder is the phased roadmap for building it.

---

## The big idea (in plain English)

IbrahimOS wants to be the single place African farmers go for AI advice, disease checks, records, weather, and (later) markets and finance.

This build is **not** that production OS. It is a **fundable, recordable demo**:

```
Public visitor  →  Marketing site  →  Waitlist / Book demo / Early access
Operator        →  /login (direct URL)  →  Dashboard  →  New assessment  →  Result
```

Marketing never links into the app. The dashboard must look finished on camera.

---

## How to read this folder

1. Read [PLANNING.md](./PLANNING.md) — how we write plans (no code in docs).
2. Read [00_OVERVIEW.md](./00_OVERVIEW.md) — master plan and **phase index**.
3. Skim [ARCHITECTURE.md](./ARCHITECTURE.md), [ENVIRONMENT.md](./ENVIRONMENT.md), [LOGGING.md](./LOGGING.md).
4. Skim [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md) before Phases 06–08.
5. Implement **Phase 01 → Phase 09 in order.** Each phase ends with a **Handoff**.

**Cloud Grant skills (agent must also follow at implement time):**

- `cloudgrant-factory`
- `cloudgrant-architecture` (+ structure)
- `cloudgrant-design-variance` (+ anti-clone)
- `cloudgrant-assets-intake` (+ asset checklist)

---

## All documents in this folder

| Doc | Description |
| --- | ----------- |
| [PLANNING.md](./PLANNING.md) | How we write phased plans (method). |
| [00_OVERVIEW.md](./00_OVERVIEW.md) | Master plan, principles, full **phase index**. |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Stack, public vs hidden surfaces, config spine, AI loop. |
| [ENVIRONMENT.md](./ENVIRONMENT.md) | Secrets vs hardcoded config. |
| [LOGGING.md](./LOGGING.md) | Console log conventions. |
| [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md) | Shared assessment JSON shape for analyze / fallback / seeds. |
| [01_SCAFFOLD_AND_ROUTES.md](./01_SCAFFOLD_AND_ROUTES.md) | Next.js scaffold + BLUEPRINT route stubs. |
| [02_CONFIG_AND_DEMO_SEEDS.md](./02_CONFIG_AND_DEMO_SEEDS.md) | `site` + `demo-flow` config; rich demo results. |
| [03_MARKETING_SITE.md](./03_MARKETING_SITE.md) | Public marketing; lead CTAs only. |
| [04_LEAD_CAPTURE.md](./04_LEAD_CAPTURE.md) | Waitlist / demo / early-access → localStorage. |
| [05_AUTH_AND_DASHBOARD.md](./05_AUTH_AND_DASHBOARD.md) | Fake auth + complete dashboard shell. |
| [06_ANALYZE_API.md](./06_ANALYZE_API.md) | Analyze route + procedural fallback. |
| [07_NEW_ASSESSMENT_FLOW.md](./07_NEW_ASSESSMENT_FLOW.md) | `/new` upload/manual + pipeline choreography. |
| [08_RESULTS_AND_CONVERSIONS.md](./08_RESULTS_AND_CONVERSIONS.md) | Results page + domain modals + toasts. |
| [09_MEDIA_LEGAL_AND_SHIP.md](./09_MEDIA_LEGAL_AND_SHIP.md) | Product media, legal, purge stubs, ship checklist. |

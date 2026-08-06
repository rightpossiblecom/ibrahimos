# Phase 06 — Analyze API and assessments store

**Depends on:** [05_AUTH_AND_DASHBOARD.md](./05_AUTH_AND_DASHBOARD.md), [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md), [ENVIRONMENT.md](./ENVIRONMENT.md).

**Goal:** Implement the shared assessment persistence layer and `POST /api/analyze` so every path (Gemini, procedural fallback, seeds) speaks the intake contract. Demo must remain viable with no API key.

---

## What we build

### Intake alignment
- Types and server/client helpers match [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md) field-for-field.
- Prompt module describes the contract to Gemini in plain schema language (no plan-doc code blocks required here — implementers write the prompt in code).

### Procedural fallback
- Deterministic-enough heuristic analyzer from crop + symptom (+ location) that always returns a **complete** assessment.
- Used when `GEMINI_API_KEY` is missing or Gemini fails / returns unusable JSON.

### Analyze route
- Accepts assessment input JSON.
- Validates required fields (crop, symptom at minimum; location required by contract).
- Tries Gemini 2.5 Flash when keyed; otherwise procedural.
- Never logs keys or image base64.
- Returns a full assessment object.

### Assessments store (browser)
- Key `ibrahim_assessments`.
- List / get-by-id / save.
- Overview reads this store; if empty on first paint, show config demo seeds so the UI never looks barren.
- New assessments prepend and remain visible after reload in the same browser.

## Files (indicative)

- `docs/INTAKE_CONTRACT.md` (already authored — keep in sync if fields change)
- `lib/analyze/types.ts`, `prompt.ts`, `procedural.ts`
- `lib/assessments.ts`
- `app/api/analyze/route.ts`

## Exit criteria

- [ ] Analyze returns a contract-complete assessment without an API key
- [ ] With a key, Gemini path works or cleanly falls back
- [ ] Assessments can be saved and reloaded from browser storage
- [ ] Overview can read list + seeds without crashing
- [ ] Logs follow [LOGGING.md](./LOGGING.md)

## Handoff to Phase 07

`/new` will gather input, optionally run choreography, call analyze, save, and route to `/projects/{id}`. The API and store must already be stable.

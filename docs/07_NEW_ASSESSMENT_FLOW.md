# Phase 07 — New assessment flow

**Depends on:** [06_ANALYZE_API.md](./06_ANALYZE_API.md), `config/demo-flow.ts` from Phase 02.

**Goal:** Build `/new` so an operator can start a farm assessment by photo upload and/or manual fields, see a choreographed pipeline when configured, persist the result, and land on the results route.

---

## What we build

### Intake UI
- Mode toggle or clear dual paths: **Upload** and **Manual**.
- Shared fields: crop, symptom/question, location, optional farm size and notes.
- Upload path: image file picker; send `imageName` (and only what the analyze path needs). No-key demos must not depend on uploading bytes to a server.
- Crop choices should feel local (maize, rice, cassava, tomato, pepper, yam, beans, etc.).

### Pipeline choreography
- When `hardcodeVisionDemo` is true (especially on upload), show an overlay that steps through `demoFlow.pipelineSteps` with short timed advances.
- After choreography, call analyze (or apply a seeded merge strategy that still saves a fresh id + timestamps + form input) so the operator always reaches a result.
- Manual path may use a shorter overlay but must still end in a saved assessment.

### Completion
- Save via assessments store.
- Navigate to `/projects/{id}`.
- Log pipeline/analyze completion per logging conventions.

## Files (indicative)

- `app/(dashboard)/new/page.tsx`
- `components/demo/PipelineOverlay.tsx`
- Any small form helpers under `components/`

## Exit criteria

- [ ] Upload path completes without `GEMINI_API_KEY`
- [ ] Manual path completes and saves an assessment
- [ ] Overlay steps match demo-flow labels
- [ ] Navigation lands on `/projects/{id}` for the saved id
- [ ] Invalid/missing required fields are blocked with user-friendly messaging

## Handoff to Phase 08

Results page must render every intake-contract field and host conversion modals. Phase 08 assumes assessments are already reachable by id.

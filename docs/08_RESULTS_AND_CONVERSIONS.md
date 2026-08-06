# Phase 08 — Results and conversions

**Depends on:** [07_NEW_ASSESSMENT_FLOW.md](./07_NEW_ASSESSMENT_FLOW.md), [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md), demo-flow conversion copy from Phase 02.

**Goal:** Make the assessment result page feel like a finished product: every contract field visible, clear next actions, and three domain conversion modals (Premium, Financing, Buyers) that never dead-end — each confirms with a toast. Overview recent activity stays in sync.

---

## What we build

### Results page (`/projects/[id]`)
- Load assessment by id from the store (and seeds if applicable).
- Missing id → return the operator to Overview.
- Render all intake-contract outputs: diagnosis/label, category, confidence, treatment steps, impact, fertilizer note, weather note, next actions, yield hint, plus echoed input context.
- Visual hierarchy suitable for screen-record (scannable, not a raw JSON dump).

### Conversion modals
- **Premium AI** — unlimited scans / priority tips interest.
- **Input financing** — seeds/fertilizer now, repay after harvest interest.
- **Find buyers** — marketplace notify interest.
- Copy from `demoFlow.conversion`.
- Confirm actions only need local success feedback (no real backend).

### Toasts
- Shared demo toast for success feedback after modal confirm.
- Accessible, brief, auto-dismiss.

### Overview sync
- After a new assessment, Overview recent list shows the new row without manual storage hacks.

### Language purity
- No leftover construction, BOQ, supplier-loan, or other-org template copy anywhere on this path.

## Files (indicative)

- `app/(dashboard)/projects/[id]/page.tsx`
- `components/demo/PremiumModal.tsx`
- `components/demo/FinancingModal.tsx`
- `components/demo/BuyerModal.tsx`
- `components/demo/DemoToast.tsx`
- Overview page updates as needed

## Exit criteria

- [ ] All intake-contract fields render for seeded and live assessments
- [ ] Each of the three CTAs opens a modal and completes with a toast
- [ ] No dead-end primary buttons on the results page
- [ ] Overview shows the newest assessment after the loop
- [ ] Full operator path works: login → overview → new → result → modals → overview

## Handoff to Phase 09

Product loop is recordable. Phase 09 wires real media/legal assets, purges any remaining stubs, and runs the ship checklist.

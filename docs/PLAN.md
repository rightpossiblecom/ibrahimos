# IbrahimOS Precision Command Implementation Plan

> **For agentic workers:** Implement task-by-task in this repository. Keep each task independently testable and preserve the existing browser-only demo architecture.

**Goal:** Turn IbrahimOS from a broad agricultural landing page into a venture-scale field incident command system for commercial farm managers.

**Architecture:** Keep the Next.js App Router application and localStorage demo model. Extend the existing assessment flow into a deterministic incident workflow, centralize its seeded Kaduna case, and have the dashboard, incident detail, marketing pages, and navigation read from that same product story. Replace the editorial green-and-gold presentation with the approved Precision Command system: obsidian surfaces, signal-lime actions, compact operational typography, maps, deadlines, costs, and severity states.

**Tech stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, localStorage, existing optional Gemini route.

## Locked product

- **Name:** IbrahimOS
- **Plain sentence:** Upload field evidence. IbrahimOS diagnoses the threat, builds the response plan, and tracks recovery.
- **First buyer:** Commercial farm managers operating 20–500 hectares.
- **Primary job:** Resolve a field incident from evidence through diagnosis, treatment, crew deployment, cost control, and recovery.
- **Seeded case:** North Block 04, Kaduna; 86 hectares of maize; fall armyworm across three zones.
- **Seed artifact:** `north-block-04-field-evidence.zip`, represented by crop photos and field notes in the browser demo.
- **Live result:** 18.4 hectares at risk, ₦428,000 response cost, six-hour action window, assigned crew checklist, and 72-hour recovery check.
- **Camera path:** Landing → Product → Sign up confirmation → Login → Command → New incident → Use sample → Analysis → Incident Room → Deploy crew → Dashboard metrics update.

## Global constraints

- Use pnpm only.
- Keep the existing Next.js application; do not create another app.
- Keep fake authentication and browser persistence; no database, payment, or paid service requirement.
- Missing Gemini keys must continue to fall back safely.
- Do not invent URLs, domains, email addresses, traction, customers, or institutional logos.
- Keep the existing supplied `ibrahimos.top`, `hello@ibrahimos.top`, founder profiles, and registration data, but move legal registration details out of the primary product narrative.
- Header and footer expose every major public and in-app room.
- The demo must remain useful after refresh and contain no empty states on the camera path.
- `.superpowers/` brainstorming artifacts must not be committed.

---

### Task 1: Precision Command foundation

**Files**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `components/BrandMark.tsx`
- Modify: `components/MarketingHeader.tsx`
- Modify: `components/MarketingFooter.tsx`
- Modify: `components/DashboardNav.tsx`
- Modify: `components/DashboardShell.tsx`
- Modify: `.gitignore`

**Deliverable**
- Replace the serif/editorial system with a dense sans-serif operational system.
- Define obsidian, elevated graphite, signal lime, warning coral, muted steel, and grid-line tokens.
- Add reusable panel, metric, eyebrow, grid, glow, and focus treatments.
- Brand reads `IBRAHIMOS/OPS`; navigation uses compact labels and clear active states.
- Marketing navigation includes Product, How it works, Pricing, Team, Command, Incidents, Fields, Market, and Weather without overwhelming mobile navigation.

**Verification**
- Run `pnpm lint`.
- Check header, mobile menu, app sidebar, focus states, and 320px overflow.

### Task 2: Product config and deterministic incident state

**Files**
- Modify: `config/site.ts`
- Modify: `lib/analyze/types.ts`
- Create: `lib/incidents.ts`
- Create: `lib/incidents.test.ts` if the repository test runner is added; otherwise keep pure functions type-checked by build.

**Interfaces**
- `Incident` contains identity, field, crop, severity, affected hectares, response cost, deadline, zones, crew tasks, and recovery status.
- `getActiveIncident(): Incident`
- `saveActiveIncident(incident: Incident): void`
- `updateIncidentTask(taskId: string, complete: boolean): Incident`
- `resetIncidentDemo(): void`

**Deliverable**
- Replace scattered demo numbers with one seeded Kaduna incident fixture.
- Derive dashboard totals and task progress from incident state.
- Preserve current assessments for compatibility while treating new assessments as incident evidence.

**Verification**
- Confirm fresh browser state loads the seed deterministically.
- Confirm completing a task survives refresh and updates progress.

### Task 3: Product-first marketing homepage

**Files**
- Rewrite: `app/(marketing)/page.tsx`
- Modify: `components/ProductPreview.tsx`
- Modify: `components/MarketingCtaBand.tsx`

**Deliverable**
- Reduce the 14-section brochure to a focused product narrative:
  1. Plain hero with live Incident Room preview.
  2. Operational proof strip using seeded product metrics, not traction claims.
  3. Evidence-to-recovery workflow.
  4. Precision Command capability stack.
  5. Kaduna seeded case.
  6. Pricing.
  7. FAQ and final CTA.
- Remove boutique farm prose, generic audience grids, repetitive testimonials, and duplicated feature sections from the homepage.
- Primary CTA opens login; secondary CTA opens Product.

**Verification**
- A first-time visitor can repeat what the product does after reading the hero.
- All hero metrics match the seeded incident fixture.

### Task 4: Serious Product page

**Files**
- Rewrite: `app/(marketing)/product/page.tsx`
- Modify: `lib/product-assets.ts` only if needed to keep optional media graceful.

**Deliverable**
- Lead with the locked plain sentence and show the complete incident workflow.
- Replace missing-media warning boxes with polished live product previews when video/screenshots are absent.
- Show at least four distinct UI preview states: Command, Intake, Incident Room, and Recovery.
- Move registration details into a compact company-information section near the footer.
- Keep real video/screenshots automatically preferred when assets are present.

**Verification**
- No public-facing “required,” “demo,” “placeholder,” or missing-file warning copy.
- Product remains complete without `public/product/demo.mp4`.

### Task 5: Incident intake and analysis

**Files**
- Rewrite: `app/(dashboard)/new/page.tsx`
- Modify: `components/demo/PipelineOverlay.tsx`
- Modify: `config/demo-flow.ts`

**Deliverable**
- Rename assessment language to incident language.
- Add “Use Kaduna sample” to populate crop, field, acreage, symptom, notes, and sample artifact.
- Stage the processing sequence as evidence review, threat classification, response calculation, and command-plan assembly.
- Keep a practical short demo wait while presenting a credible remaining-time treatment.
- Save the assessment and initialize/update the active incident before opening the incident detail.

**Verification**
- Manual form validation still works.
- Sample path works without an actual uploaded file or Gemini key.
- Refresh after processing keeps the result.

### Task 6: Incident Room and live action

**Files**
- Rewrite: `app/(dashboard)/projects/[id]/page.tsx`
- Create: `components/IncidentMap.tsx`
- Create: `components/IncidentActions.tsx`

**Deliverable**
- Present severity, affected zones, response deadline, projected loss, response cost, treatment, crew, and recovery in one dense screen.
- Add the live click: “Deploy crew” changes incident status and unlocks checklist actions.
- Completing tasks updates progress and dashboard metrics through shared localStorage state.
- Remove unrelated financing/buyer upsell modals from the incident camera path.

**Verification**
- Deploy and checklist actions persist after refresh.
- Every significant action gives immediate visual feedback.

### Task 7: Command dashboard and connected rooms

**Files**
- Rewrite: `components/OverviewClient.tsx`
- Modify: `app/(dashboard)/fields/page.tsx`
- Modify: `app/(dashboard)/market/page.tsx`
- Modify: `app/(dashboard)/weather/page.tsx`

**Deliverable**
- Replace generic yield and assessment charts with open incidents, hectares at risk, response budget, value protected, incident map, next actions, and recovery progress.
- Keep Fields, Market, and Weather recognizable, but connect their highlighted rows/callouts to North Block 04 and the current incident.
- Remove “demo data” wording from visible UI.

**Verification**
- Command metrics read from active incident state.
- Task completion changes at least progress, next action, and open-task count together.

### Task 8: Final product credibility and verification

**Files**
- Modify public copy/config pages only where old “smallholder assistant” positioning conflicts with the commercial incident product.
- Confirm: `public/robots.txt`
- Confirm: `public/llms.txt`

**Deliverable**
- Eliminate conflicting barber-shop/local-enterprise signals from prominent pages.
- Preserve founder/team facts and real contact/domain values.
- Ensure crawlers describe the new field incident command product and list public paths.

**Verification**
- Run `pnpm lint`.
- Run `pnpm build`.
- Run the app and verify the full camera path at desktop and mobile widths.
- Search visible source for `Demo mode`, `demo data`, `required`, and old hero copy.

# Phase 04 — Lead capture

**Depends on:** [03_MARKETING_SITE.md](./03_MARKETING_SITE.md).

**Goal:** Make waitlist, book-a-demo, and early-access forms live: validate basics, save leads in browser storage under the IbrahimOS key, and show a clear success state so CTAs never dead-end.

---

## What we build

### Lead storage
- A small client-side leads module keyed by `ibrahim_leads` (via `shortName`).
- Each lead records form id, name, email, timestamps, and optional phone / org / message as appropriate to the form.
- Ability to list leads (for debugging / future admin; not required on marketing UI).

### Shared form UX
- Reusable lead form and form page shell.
- User-friendly labels and success copy (no developer jargon).
- Waitlist: name, email, phone optional.
- Demo: name, email, org/farm name, message optional.
- Early access: name, email, and any short intent field useful for Premium interest.

### Pages
- `/waitlist`, `/demo`, `/early-access` use the shared form and persist on submit.

## Files (indicative)

- `lib/leads.ts`
- `components/LeadForm.tsx`
- `components/FormPageShell.tsx`
- `app/(marketing)/waitlist/page.tsx`
- `app/(marketing)/demo/page.tsx`
- `app/(marketing)/early-access/page.tsx`

## Exit criteria

- [ ] Submitting each of the three forms stores a lead under the IbrahimOS leads key
- [ ] Success state is visible after submit (not a blank reload)
- [ ] Forms still do not navigate users into the dashboard
- [ ] Logs follow [LOGGING.md](./LOGGING.md) on save

## Handoff to Phase 05

Public funnel is complete enough. Phase 05 builds the hidden product: fake auth and a dense dashboard shell for screen-record.

# Phase 05 — Fake auth and complete dashboard

**Depends on:** [04_LEAD_CAPTURE.md](./04_LEAD_CAPTURE.md), [02_CONFIG_AND_DEMO_SEEDS.md](./02_CONFIG_AND_DEMO_SEEDS.md) (demo seeds for Overview density).

**Goal:** Deliver operator login/signup that accepts any credentials into browser session storage, guard the dashboard, and ship a **complete-looking** agri OS shell: Overview, Account, Fields, Market, Weather — with believable demo content, not empty stubs.

**Why now:** This is the first major screen-record surface. Analyze/results can still be thin; chrome and Overview must already feel finished.

---

## What we build

### Fake auth
- Login and signup: any non-empty email + password writes `{ email, createdAt }` to `ibrahim_session`.
- Dashboard layout redirects to `/login` when session is missing.
- Sign out clears session and returns to login.
- Still **not** linked from marketing.

### Dashboard shell
- Sidebar (or equivalent app nav): Overview, New assessment, Fields, Market, Weather, Account.
- Brand mark from config.
- Auth guard + account menu entry point.

### Overview
- Farm health summary, weather strip, today’s tasks, recent assessments.
- Until the assessments store exists (Phase 06), seed recent activity from config `demoResults`.
- Primary CTA into `/new` (page may still be light until Phase 07).

### Account
- Show session email, org/plan placeholders (e.g. Free), sign out.

### Extras (polished placeholders)
- **Fields:** sample fields/crops with planting status.
- **Market:** sample daily prices for core crops (maize, rice, cassava, tomato, etc.) with naira formatting.
- **Weather:** sample localized forecast + planting/harvest style tips.

No “Phase stub” / “coming soon” on these recorded paths.

## Files (indicative)

- `lib/session.ts`
- `app/(auth)/login/page.tsx`, `signup/page.tsx`
- `app/(dashboard)/layout.tsx`
- `app/(dashboard)/dashboard/page.tsx`
- `app/(dashboard)/account/page.tsx`
- `app/(dashboard)/fields/page.tsx`
- `app/(dashboard)/market/page.tsx`
- `app/(dashboard)/weather/page.tsx`
- Shared dashboard nav / shell components under `components/`

## Exit criteria

- [ ] Any credentials create a session and reach Overview
- [ ] Logged-out users hitting dashboard routes go to `/login`
- [ ] Account shows email and can sign out
- [ ] Fields, Market, Weather feel populated for a farm OS demo
- [ ] Overview shows seeded recent assessments and a clear path to New
- [ ] Marketing still has no app entry links

## Handoff to Phase 06

Dashboard expects a real assessments list API/store next. Phase 06 defines persistence + analyze so New/Result can become real.

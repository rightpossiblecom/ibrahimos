# Phase 02 — Config and demo seeds

**Depends on:** [01_SCAFFOLD_AND_ROUTES.md](./01_SCAFFOLD_AND_ROUTES.md), [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md) (field names for seeds).

**Goal:** Create the config spine so brand strings and demo data live in one place: site config, demo-flow config, shared assessment types, currency helper, and at least two rich farm assessment seed objects that match the intake contract.

---

## What we build

### Site config
- Brand: IbrahimOS, shortName `ibrahim`, tagline, description, support email, founded year.
- Legal / domain fields present but empty until the owner provides them (do not invent CAC or entity names).
- Public nav items and the three lead CTAs (waitlist, demo, early access) with labels and hrefs.
- Exactly three problem statements for marketing.
- Pricing tiers that CTA only to lead paths (Free / Premium / Enterprise tone is fine).
- Team array ready for owner-provided names + LinkedIn URLs (empty until provided).
- Locale `en-NG`, currency NGN.
- `demoResults`: **≥2** full assessments (prefer different crops and categories).

### Demo-flow config
- Ordered pipeline step labels for the choreographed upload path.
- Conversion copy blocks for Premium, Financing, and Buyers.
- `hardcodeVisionDemo` set true so Phase 07 can guarantee a no-key video path.

### Shared types and helpers
- Assessment input/output types aligned to [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md).
- Naira formatting helper for any money UI later.

## Files (indicative)

- `config/site.ts`
- `config/demo-flow.ts`
- `lib/analyze/types.ts` (or equivalent shared types module)
- `lib/format-currency.ts`

## Exit criteria

- [ ] `siteConfig.shortName` is `ibrahim`
- [ ] No need to hardcode the brand name in pages once they read config (pages may still be stubs)
- [ ] At least two demo assessments satisfy every required intake-contract field
- [ ] Demo-flow exposes pipeline steps, three conversion blocks, and `hardcodeVisionDemo`
- [ ] Currency helper formats NGN for `en-NG`

## Handoff to Phase 03

Marketing pages will read nav, CTAs, problems, pricing, and brand from site config. Design variance work starts next; config must already be the single source for copy.

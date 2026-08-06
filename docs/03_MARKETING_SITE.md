# Phase 03 — Marketing site

**Depends on:** [02_CONFIG_AND_DEMO_SEEDS.md](./02_CONFIG_AND_DEMO_SEEDS.md), Cloud Grant design-variance skill.

**Goal:** Ship a complete, professional public marketing site for IbrahimOS. Primary CTAs are lead capture only. Visual direction is unique to this org (screenshot-led if provided; otherwise a deliberate agri-tech direction recorded in a short design note).

---

## What we build

### Design direction
- If the owner supplied a UI reference, follow it for colour, type vibe, density, and chrome feel.
- If not, choose a coherent professional direction suited to African agri-tech and write a short `docs` design note (what/why) — not a second design system mandate.
- Avoid Cloud Grant anti-patterns: purple AI SaaS gradients, cream+brass editorial Lagos defaults, Inter/Geist-only laziness, broadsheet newspaper layouts, glow/pill/emoji soup.
- Pass the logo-swap fingerprint test against other recent Cloud Grant orgs.

### Chrome
- Marketing header and footer driven by site config.
- Nav: Product, About, Team, Pricing (and home brand mark).
- CTAs: Join waitlist / Book a demo / Early access only.
- **Zero** links to login, signup, dashboard, or “Open app”.

### Pages
- **Landing:** brand-forward first viewport — IbrahimOS as hero signal, one headline, one supporting sentence, CTA group, dominant visual atmosphere. No stats strips or secondary marketing clutter in the first viewport.
- **About:** mission and Africa-first positioning from config problems/mission tone.
- **Product:** section structure ready for Phase 09 media order (intro → video → screenshots → reg proof → capabilities). Copy can be real; media slots wait for assets.
- **Team:** real people only when owner provides names + LinkedIns; do not invent founders.
- **Pricing:** tiers from config; CTAs only to lead paths.
- Forms themselves are Phase 04; pages may link to those routes now.

## Files (indicative)

- `docs` design note (e.g. short DESIGN note alongside this plan set)
- `components/MarketingHeader.tsx`, `MarketingFooter.tsx`
- `app/(marketing)/layout.tsx` and marketing pages
- `app/globals.css` tokens for this org

## Exit criteria

- [ ] Marketing pages read brand/nav/CTAs from config
- [ ] Grep/manual check: no login, signup, dashboard, or Open-app entry points in marketing chrome or landing/pricing
- [ ] Landing first viewport matches brand-first composition rules
- [ ] Design note exists when no screenshot was provided
- [ ] Look is intentionally distinct from sibling Cloud Grant demos

## Handoff to Phase 04

Lead routes exist and are linked from CTAs. Phase 04 makes those forms persist leads and show success states.

# Phase 09 — Media, legal, and ship

**Depends on:** [08_RESULTS_AND_CONVERSIONS.md](./08_RESULTS_AND_CONVERSIONS.md), Cloud Grant assets-intake skill.

**Goal:** Finish submission/recording readiness: wire owner media on `/product`, complete privacy/terms with real legal identity when provided, purge stub language, pass anti-clone and marketing-safety checks, and clear the Cloud Grant screen-record checklist with a clean `pnpm build`.

---

## What we build

### Asset intake (gate — ask, don’t invent)
Request from owner if missing:

1. Optional UI reference screenshot  
2. Registration / CAC certificate PDF  
3. Demo walkthrough video or GIF (prefer compressed MP4 under public product media)  
4. Four to eight product screenshots  
5. Logo / mark  
6. Founder names + LinkedIn URLs  

Placeholders only with **explicit owner waiver**. Never fabricate certificates or people.

### Product page order
1. Intro copy  
2. Demo video  
3. Screenshots gallery  
4. Registration proof (image on page + PDF download)  
5. How it works / capabilities  

### Legal
- Privacy and Terms use legal entity, brand, and support email from config.
- If entity/CAC still empty and owner promised them, pause and ask before calling the phase done.

### Team page
- Wire real LinkedIns when provided; otherwise do not invent.

### Purge and variance
- Remove Phase stub / TODO / coming soon language from marketing and recorded dashboard paths.
- Re-run anti-clone checklist (type, colour, hero composition uniqueness; marketing safety).
- Confirm no sibling-org domain language remains.

### Ship verification
Run the screen-record checklist from Cloud Grant phases:

- Marketing CTAs are waitlist / demo / early-access only  
- Direct `/login` → Overview looks finished for this category  
- Account works including sign out  
- New → pipeline/analyze → results → modals/toasts  
- Overview shows the new row afterward  
- Works without `GEMINI_API_KEY`  
- `pnpm build` clean  

## Files (indicative)

- `public/product/*` (demo video, screenshots, certificate raster)
- Registration PDF download path under `public/`
- `app/(marketing)/product/page.tsx`
- `app/(marketing)/privacy/page.tsx`, `terms/page.tsx`
- `app/(marketing)/team/page.tsx`
- `config/site.ts` legal/team fields updates from owner data
- Gitignore entries for oversized raw dumps if needed

## Exit criteria

- [ ] Asset checklist satisfied **or** written owner waivers recorded for gaps
- [ ] `/product` follows video → screenshots → reg proof → copy order
- [ ] Privacy/Terms reference real config identity fields (or blocked on owner gap)
- [ ] No stub/TODO/coming-soon on recorded or primary public paths
- [ ] Anti-clone + marketing-safety checks pass
- [ ] Full screen-record checklist green
- [ ] `pnpm build` succeeds

## Handoff

Initiative complete for Cloud Grant v1 demo. Future production OS work (mobile, real backend, marketplace, finance) is a **separate** plan — not a continuation phase of this folder unless explicitly added to [00_OVERVIEW.md](./00_OVERVIEW.md).

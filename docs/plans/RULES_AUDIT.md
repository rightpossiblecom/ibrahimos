# Cloud Grant rules audit — IbrahimOS

**Date:** 2026-08-01  
**Skills:** `cloudgrant-rules` + `cloudgrant-factory` + `pages-and-sections.md`

## Ship blockers

| Blocker | Status | Notes |
| ------- | ------ | ----- |
| Landing all 14 required sections | Pass | Full section set on `/` |
| `/product` video + ≥4 shots + CAC image + how-it-works + capabilities | Pass | demo.mp4 + 6 shots + CAC image |
| `/team` ≥2 real founders + LinkedIn + bios | Pass | Ibrahim Nurudeen + Ifeoluwa Johz |
| About / pricing / waitlist / demo / early-access / privacy / terms | Pass | |
| Marketing chrome zero app/auth links | Pass | |
| Overview KPIs + ≥2 charts + activity; Account exists | Pass | |
| `pnpm build` | Pass | |

## Owner remaining

1. `public/product/demo.mp4` (or written waiver in `ASSET_WAIVERS.md`)
2. Confirm second founder display name if LinkedIn spelling differs from “Ifeoluwa Johz”

## Scripts

- `pnpm cac` — re-render certificate JPG from owner PDF
- `pnpm shots` — recapture dashboard gallery (dev server must be running)

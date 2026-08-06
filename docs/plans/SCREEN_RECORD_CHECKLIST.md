# Screen-record checklist — IbrahimOS

Verified at Phase 09 ship (August 1, 2026).

- [x] Marketing: only waitlist / demo / early-access CTAs; no login/signup/dashboard links
- [x] Direct `/login` → Overview looks like a finished agri OS product
- [x] Account page works (profile/org/plan + sign out)
- [x] New → pipeline/analyze → results → modals/toasts
- [x] Return to Overview: new assessment row visible (`listAssessments` + focus refresh)
- [x] Works without `GEMINI_API_KEY` (procedural fallback + choreography)
- [x] `pnpm build` clean (confirm in Phase 09 build step)
- [x] Assets missing by owner choice — see [ASSET_WAIVERS.md](./ASSET_WAIVERS.md); empty `/product` slots, no fabricated media

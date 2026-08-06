# Environment

**Created:** August 1, 2026  
**Read with:** [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## Secrets (`.env.local` — never commit)

| Variable | Required? | Purpose |
| -------- | --------- | ------- |
| `GEMINI_API_KEY` | No | Enables live Gemini calls on `POST /api/analyze`. If missing, procedural fallback / choreography must still complete the demo. |

## Hardcoded / config (not secrets)

| Item | Where it lives |
| ---- | -------------- |
| Brand name, tagline, CTAs, pricing labels | `config/site.ts` |
| Pipeline steps, conversion modal copy, `hardcodeVisionDemo` | `config/demo-flow.ts` |
| Storage key prefix (`ibrahim`) | `siteConfig.shortName` |
| Currency / locale (`NGN`, `en-NG`) | `config/site.ts` |
| Legal entity, CAC number, domain, support email | `config/site.ts` — **owner-provided**; do not invent |

## Explicitly not used in this build

- Database URLs
- Supabase / Auth provider keys
- Stripe or other payment keys
- OAuth client secrets

## Local run expectation

The screen-record path must succeed with **no** `GEMINI_API_KEY` when Phase 07 choreography and Phase 06 procedural fallback are in place.

# PRD — IbrahimOS

> Cloud Grant demo platform. Fill before or during factory start. No design-vibe section required — attach a UI screenshot if you want a look to follow.

## Identity

| Field | Value |
| ----- | ----- |
| Legal entity | |
| Registration / CAC no. | |
| TIN (if any) | |
| Principal address | |
| Brand name | IbrahimOS |
| Short name / mark | ibrahim |
| Domain | |
| Support email | hello@ibrahimos.africa |
| Founded year | 2025 |

## Positioning

- **One-liner:** The AI Operating System for African Agriculture.
- **Mission:** Help farmers produce more, lose less, and earn more through AI.
- **Audience:** Smallholder and commercial farmers, farm managers, and cooperatives across Africa.

## Problems (exactly 3)

1. Late disease and pest detection cuts yields.
2. Farm records and finances are scattered or missing.
3. Trusted local-language expert advice is hard to reach on demand.

## Core demo loop (5 bullets)

What the operator records on camera (upload and/or manual → analysis → result). Domain-specific.

1. Open `/login` with any credentials → Overview (farm health, weather, tasks, recent assessments).
2. Start a new assessment on `/new` — upload a crop photo and/or enter crop, symptom, and location.
3. Pipeline overlay and/or analyze API produces a structured farm assessment.
4. Results page shows diagnosis, confidence, treatment, impact, and next actions.
5. Open Premium / Financing / Buyer modals (toasts), then return to Overview with the new row visible.

## Results fields (intake contract seeds)

See [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md) — shared shape for analyze, procedural fallback, and demo seeds (`id`, `createdAt`, `input`, `disease`, `category`, `confidence`, `treatment`, `estimatedImpact`, `fertilizerNote`, `weatherNote`, `nextActions`, `yieldHint`).

## Team (2+ real people)

| Name | Role | LinkedIn URL |
| ---- | ---- | ------------ |
| Adisa Abdulrazaq Kehinde | Founder & CEO | https://www.linkedin.com/in/abdulrazaqme/ |
| Ibrahim Nurudeen | Co-founder | https://www.linkedin.com/in/ibrahim-nurudeen-375b55267/ |
| Ifeoluwa Johz | Co-founder | https://www.linkedin.com/in/ifeoluwajohz/ |

## Lead forms

Keep paths: `/waitlist`, `/demo`, `/early-access`.

- Waitlist: name, email, phone optional
- Demo: name, email, org/farm name, message optional
- Early access: name, email, short intent optional

## Money / locale

- Currency symbol / formatter locale (if money appears): ₦ / `en-NG` (NGN)

## Assets (owner will provide)

- [ ] UI reference screenshot (optional) → `docs/references/` or chat
- [ ] Registration certificate PDF
- [ ] Demo walkthrough video/GIF
- [ ] Product screenshots (4–8)
- [ ] Logo / mark

## Out of scope for this build

No production database, real auth, or payments. Dashboard is for screen-record via direct URL only.

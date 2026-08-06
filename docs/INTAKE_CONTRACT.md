# Intake contract — farm assessment

**Created:** August 1, 2026  
**Status:** Binding for Phases 06–08  
**Consumers:** Gemini prompt, procedural fallback, `config/site.ts` demo seeds, results page, assessments store

This is the **one JSON shape** every path must produce. Field names below are the contract; implementers use the same names in types and UI.

---

## Input (client → analyze)

| Field | Type | Required | Meaning |
| ----- | ---- | -------- | ------- |
| `mode` | `"upload"` \| `"manual"` | yes | How the operator entered the case |
| `crop` | string | yes | Crop name (e.g. Maize, Tomato) |
| `symptom` | string | yes | What the farmer sees or asks |
| `location` | string | yes | Farm location text |
| `farmSizeHa` | number | no | Farm size in hectares |
| `notes` | string | no | Extra context |
| `imageName` | string | no | Original filename when mode is upload |

Do not require raw image bytes for the no-key choreography path; filename + form fields are enough for demo.

---

## Output (analyze → storage → results)

| Field | Type | Required | Meaning |
| ----- | ---- | -------- | ------- |
| `id` | string | yes | Stable id for routing `/projects/[id]` |
| `createdAt` | string (ISO) | yes | When the assessment was created |
| `input` | object | yes | Echo of the input fields above |
| `disease` | string | yes | Primary label (disease, deficiency, pest, or advice title) |
| `category` | `"disease"` \| `"nutrient"` \| `"pest"` \| `"advice"` | yes | Bucket for badges/filters |
| `confidence` | number 0–100 | yes | Model or fallback confidence |
| `treatment` | string[] | yes | Ordered practical steps |
| `estimatedImpact` | string | yes | Yield / timing impact if untreated or if acted on |
| `fertilizerNote` | string | yes | Fertilizer or input guidance |
| `weatherNote` | string | yes | Weather-aware timing note |
| `nextActions` | string[] | yes | Short task-style reminders |
| `yieldHint` | string | yes | Rough yield expectation language |

---

## Seed requirement

`config/site.ts` must ship **at least two** complete objects matching this output shape (different crops / categories preferred) so Overview and results look alive before the operator runs a live case.

## Compatibility rule

If Gemini returns partial JSON, the server must fill missing required fields via procedural logic or reject and fall back entirely — the client and results page never render a half-contract.

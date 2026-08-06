# Logging

**Created:** August 1, 2026  
**Read with:** [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## Convention

Prefix meaningful console lines with a short product action tag:

`[IbrahimOS <Action>] …`

Examples of actions: `Lead`, `Auth`, `Analyze`, `Assessment`, `Pipeline`.

## What to log

- Lead saved (form id + lead id — not full PII dumps in production-facing demos if avoidable; email alone is fine for local demo)
- Session start / sign out
- Analyze path chosen (Gemini vs procedural) and assessment id
- Assessment persisted and navigation target id
- Pipeline step transitions during choreography (optional, keep brief)

## What never to log

- API keys
- Raw file base64 or full image payloads
- Passwords

## Style

Short, greppable, one line per event. No noisy logs on every render.

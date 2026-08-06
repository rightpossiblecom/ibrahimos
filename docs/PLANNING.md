# How we write plans (IbrahimOS)

**Status:** Active — follow this for all phased work in this repo.
**Canonical method:** Rightal Relay writing-plans skill (`~/.cursor/skills/writing-plans/SKILL.md`).

---

## What a good plan is

A plan is a **roadmap**, not code. It tells any developer or agent **what** to build, **why**, **in what order**, and **how to know when a step is done** — without prescribing exact implementations.

## Folder layout

```
docs/
├── PLANNING.md          ← this file
├── README.md            ← index + how to read
├── 00_OVERVIEW.md       ← master plan + phase index
├── ARCHITECTURE.md
├── ENVIRONMENT.md
├── LOGGING.md
├── INTAKE_CONTRACT.md
├── 01_….md
└── …
```

Phases use two-digit prefixes and run **in order**.

## Writing rules (strict)

1. **No code samples** — no full functions, class definitions, or syntax blocks in plan docs.
2. **Plain English** — behaviour, flows, responsibilities.
3. **References allowed** — file paths and symbol names as **names only**.
4. **What, not how** — architecture and relationships, not implementation detail.
5. Read real code **during implementation**; plans do not replace that.

## Phase doc required sections

Depends on → Goal → What we build → Files (indicative) → Exit criteria → Handoff to next phase.

## Agent workflow

1. Read `README.md` and `00_OVERVIEW.md`.
2. Read this file if needed.
3. Read `ARCHITECTURE.md` and Depends-on docs for the **current phase only**.
4. Implement only the current phase; satisfy Exit criteria before moving on.
5. Do not skip phases.

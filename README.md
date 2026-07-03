# Timesheet Pal

A lightweight web app that helps consultants submit weekly timesheets against
charge codes faster and with fewer errors, replacing the slow, manual
process of the legacy MyTime&Expenses (MyTE) system.

## Origin

This project began as a Level 5 assignment (Technology in Business,
Jan 2026), which scored 60/100. Tutor feedback identified three gaps:

1. Technology choices were stated but not evaluated against alternatives.
2. Several claims lacked citation.
3. localStorage was pragmatic for a prototype but doesn't address
   multi-device access.

This rebuild, used as the basis for the Level 6 EPA project report,
directly addresses all three:

- See `docs/adr-001-persistence.md` for the localStorage → backend
  decision, with alternatives considered and trade-offs evaluated.
- The Teams-embedded chatbot concept from the original proposal has been
  descoped — it isn't required by the EPA brief, and building it would
  have consumed time better spent on evidencing real outcomes.
- Automated tests have been added (the original explicitly flagged this
  as a testing limitation).

## Stack

- **Frontend:** React + TypeScript + Vite (unchanged from the original —
  this choice worked well and wasn't something feedback challenged)
- **Backend:** Node.js + Express + SQLite — a real, persistent backend
  replacing localStorage, chosen over a heavier option (e.g. Postgres +
  ORM) because a single-table, low-concurrency prototype doesn't justify
  that operational overhead. See ADR for full reasoning.
- **Testing:** Vitest (frontend logic), Jest + Supertest (backend API)

## Status

🚧 In active development for the EPA report (deadline 29 July 2026).

## Baseline metrics (captured before rebuild)

See `docs/baseline-metrics.md` — captured so the EPA report can measure
real improvement rather than project it.

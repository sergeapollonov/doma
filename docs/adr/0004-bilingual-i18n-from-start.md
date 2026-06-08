# ADR 0004: Treat Russian and Polish Localization as First-Class Requirements

Status: Accepted
Date: 2026-06-08

## Context

Doma is intended for a bilingual household context. Russian and Polish are part of the MVP product definition, not a later marketing localization step.

If localization is postponed, visible strings, validation messages, notification text, and product terminology will become harder to maintain.

## Decision

Doma will keep Russian and Polish localization as first-class product requirements from the alpha stage.

The app should:

- keep visible UI copy in `src/i18n` where practical;
- maintain matching keys between Russian and Polish files;
- document terminology choices;
- include localization checks in contribution work;
- avoid adding new user-facing strings in only one language.

## Consequences

Contributors need to consider copy, tone, and terminology when changing screens or user flows.

The codebase should separate product strings from layout and state logic.

Some early UI prototypes may still contain hardcoded strings, but cleanup should be tracked openly and handled in small PRs.

## Follow-up

- Complete the RU/PL i18n audit.
- Add lightweight localization coverage checks.
- Keep `docs/localization.md` current when terminology changes.

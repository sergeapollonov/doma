# Localization: move visible strings into i18n files

Labels: `localization`, `roadmap`

## Summary

Move visible UI strings into the localization structure and keep RU/PL keys aligned.

## Context

The current prototype still includes hardcoded visible strings in the main app component. The public project should make localization a first-class part of the architecture.

## Suggested Files

- `App.tsx`
- `src/i18n/index.ts`
- `src/i18n/ru.json`
- `src/i18n/pl.json`

## Acceptance Criteria

- Avoidable hardcoded RU/PL UI strings are moved into i18n.
- RU and PL files expose matching keys.
- Temporary mock data is clearly separated from UI copy.
- `npm run typecheck` passes.

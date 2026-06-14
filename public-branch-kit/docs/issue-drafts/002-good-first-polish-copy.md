# Good first issue: audit Polish localization copy

Labels: `good first issue`, `localization`

## Summary

Review the current Polish copy and suggest improvements that sound natural for a family planning app.

## Context

Doma supports Russian and Polish. The Polish copy should feel human and household-oriented, not corporate or literal.

## Suggested Files

- `src/i18n/pl.json`
- `src/i18n/index.ts`
- `docs/localization.md`
- `docs/product-brief.md`

## Acceptance Criteria

- Polish terms are consistent with `docs/localization.md`.
- Suggested copy avoids corporate task-management language.
- RU and PL i18n keys stay aligned.
- `npm run typecheck` passes.

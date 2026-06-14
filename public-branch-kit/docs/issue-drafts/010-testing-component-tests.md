# Testing: add component tests for core UI

Labels: `testing`, `design-system`, `developer experience`

## Summary

Add the first component tests for reusable Doma UI components after the component foundation is extracted.

## Context

The current CI runs TypeScript checks. Once repeated UI blocks are extracted into components, the project should add focused tests for core states and props without requiring a real backend or private data.

## Suggested Files

- `package.json`
- `.github/workflows/ci.yml`
- `src/components/`
- future test files under `src`

## Suggested Test Coverage

- `Button` renders label and disabled state.
- `Chip` renders selected/unselected state.
- `Avatar` renders fallback initials.
- `TaskRow` renders completed and incomplete states.
- `ShoppingItemRow` renders purchased and active states.

## Out of Scope

- end-to-end tests;
- real device automation;
- backend integration tests;
- snapshot-heavy tests that make design iteration painful.

## Acceptance Criteria

- A test runner is configured.
- `npm test` or an equivalent script is added.
- CI runs TypeScript and tests.
- Tests use mock data only.
- `npm run typecheck` passes.

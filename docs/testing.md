# Testing

Doma uses a small, layered verification workflow.

## Local Checks

Run the full local verification set before opening a pull request:

```bash
npm run typecheck
npm test
npm run verify:web
```

For documentation-only changes that do not touch source files, run:

```bash
npm run typecheck
npm test
```

If any source file changes, include `npm run verify:web`.

## What Each Check Covers

- `npm run typecheck` verifies strict TypeScript contracts.
- `npm test` runs Vitest unit tests for Zod validation schemas, domain actions, and local state.
- `npm run verify:web` exports the Expo web bundle without relying on a local dev server port.

Form flow pull requests should keep React Hook Form state, Zod schemas, localized validation messages, and local submit handlers in sync.
Local state pull requests should keep Zustand store actions, pure state helpers, and domain tests aligned.

## Test Scope

Current unit tests cover:

- Zod form validation schemas;
- household task domain actions;
- shopping list domain actions;
- local app state actions;
- Zustand local store actions.
- typed form error-code guards.

UI rendering and accessibility tests are planned for a later milestone.

## Privacy Rule

Tests must use public demo data only. Do not add real family names, emails, invite links, logs, screenshots, or production fixtures.

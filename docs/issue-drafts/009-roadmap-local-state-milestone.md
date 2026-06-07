# Roadmap: implement local state milestone

Labels: `roadmap`, `local-state`, `alpha`

## Summary

Implement the local-first state milestone so Doma is usable without a backend.

## Context

Doma should work locally before Supabase, realtime sync, notifications, or account logic are added. This keeps the app easy to test, safer to contribute to, and useful in offline-first scenarios.

## Suggested Files

- `src/store/`
- `src/mocks/`
- `src/types/`
- `App.tsx`
- `docs/milestones.md`
- `docs/oss-roadmap.md`

## Scope

- selected date state;
- language state;
- local events;
- local tasks;
- local shopping items;
- add event locally;
- add task locally;
- complete task locally;
- add shopping item locally;
- mark shopping item purchased locally.

## Out of Scope

- Supabase;
- realtime sync;
- push notifications;
- authentication;
- persistence across app reinstalls.

## Acceptance Criteria

- Users can add a local event and see it in Today/Calendar.
- Users can add and complete a local task.
- Users can add and purchase a shopping item.
- State logic is typed and separated from visual components.
- Mock data remains deterministic and privacy-safe.
- `npm run typecheck` passes.

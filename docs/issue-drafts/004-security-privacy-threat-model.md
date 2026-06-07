# Security: add privacy threat model

Labels: `security`, `privacy`, `documentation`

## Summary

Add a practical privacy threat model for Doma before backend sync is implemented.

## Context

Doma may eventually handle family schedules, reminders, shopping items, invite links, and profile data. The project should document privacy risks before adding Supabase auth and sync.

## Suggested Files

- `docs/privacy-notes.md`
- `docs/oss-roadmap.md`
- `SECURITY.md`

## Acceptance Criteria

- Threat model covers local data, backend sync, invite links, logs, analytics, screenshots, and test fixtures.
- Recommendations are actionable for contributors.
- No real personal examples are used.
- Backend milestones include security gates.

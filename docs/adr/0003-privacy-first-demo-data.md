# ADR 0003: Use Privacy-Safe Demo Data

Status: Accepted
Date: 2026-06-08

## Context

Doma deals with household routines, events, tasks, shopping, reminders, family membership, and future notification settings. Even harmless-looking examples can reveal sensitive patterns if they come from real people.

The public project needs realistic examples so contributors can understand the app, but those examples must not disclose private household data.

## Decision

All public examples, mock data, screenshots, and docs should use privacy-safe demo data.

Public examples should use generic names such as:

```text
Alex
Maya
```

Public examples should avoid:

- real names;
- real emails;
- real addresses;
- real invite tokens;
- real appointment details;
- exact private routines;
- medical, financial, or child-related private details.

If a scenario needs sensitive product behavior, describe it in generic terms instead of copying real content.

## Consequences

The project can show credible household workflows while keeping private data out of the repository.

Contributors should not add real family data to fixtures, tests, screenshots, issues, pull requests, or docs.

Screenshots and image references require extra review because embedded text cannot be caught reliably by text search.

## Follow-up

- Add a privacy threat model.
- Add a release checklist item for screenshot review.
- Keep mock data aligned with `docs/mock-data.md`.

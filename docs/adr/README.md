# Architecture Decision Records

This folder documents the architectural decisions that shape Doma.

ADRs are intentionally short. Each record should explain:

- the context behind the decision;
- the decision itself;
- the consequences for contributors and maintainers;
- the documents or issues that should be updated if the decision changes.

## Index

| ADR | Status | Decision |
| --- | --- | --- |
| [0001](./0001-public-branch-sanitization.md) | Accepted | Publish a sanitized public branch instead of the private working tree |
| [0002](./0002-local-first-before-backend.md) | Accepted | Build local-first product behavior before shared backend sync |
| [0003](./0003-privacy-first-demo-data.md) | Accepted | Use privacy-safe demo data in public examples |
| [0004](./0004-bilingual-i18n-from-start.md) | Accepted | Keep Russian and Polish localization as first-class product requirements |

## Writing New ADRs

Use this format:

```text
# ADR NNNN: Title

Status: Proposed | Accepted | Superseded
Date: YYYY-MM-DD

## Context

## Decision

## Consequences

## Follow-up
```

Keep records focused on decisions that affect product behavior, privacy, architecture, contributor workflow, or long-term maintainability.

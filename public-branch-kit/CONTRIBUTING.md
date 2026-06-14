# Contributing to Doma

Thank you for considering a contribution to Doma.

Doma is an early-stage open-source family planning app. The project values small, focused, reviewable changes that preserve the product direction: calm, privacy-first, multilingual, and mobile-first.

## Project Priorities

Before contributing, read:

- `docs/PROJECT-INDEX.md`
- `docs/product-brief.md`
- `docs/design-system.md`
- `docs/screens.md`
- `docs/user-flows.md`
- `docs/privacy-notes.md`
- `docs/oss-roadmap.md`

If files conflict, follow `docs/PROJECT-INDEX.md`.

## Local Setup

Install dependencies:

```bash
npm install
```

Run the app on web:

```bash
npm run web
```

Run TypeScript checks:

```bash
npm run typecheck
```

## Contribution Workflow

1. Pick an existing issue or open a short proposal.
2. Keep each pull request focused on one change.
3. Use the existing design tokens and project structure.
4. Do not add backend services or new product areas without an accepted issue.
5. Run `npm run typecheck` before opening a pull request.
6. Include screenshots for UI changes.

## Branch Naming

Recommended branch names:

```text
feature/local-state-events
fix/typecheck-tabs
docs/privacy-threat-model
i18n/polish-copy-audit
```

## Pull Request Checklist

Before opening a pull request:

- TypeScript passes.
- UI strings are localized or intentionally mock data.
- No real personal data is included.
- No unrelated refactors are included.
- Design tokens are used instead of hardcoded colors when possible.
- Docs are updated when behavior changes.

## Privacy Rules

Do not include:

- real names beyond demo data;
- real emails;
- real family schedules;
- real medical, school, or finance information;
- private screenshots;
- production credentials;
- API keys or access tokens.

Use mock data from the repository.

## Design Rules

Doma should feel:

- calm;
- warm;
- premium;
- family-oriented;
- iOS-first;
- simple enough to use in seconds.

Avoid turning Doma into a corporate task manager, calendar clone, or generic productivity dashboard.

## Good First Issues

Good first contribution areas:

- localization coverage;
- accessibility labels;
- documentation cleanup;
- small TypeScript fixes;
- issue template improvements;
- tests for pure utility functions.

Thank you for helping make Doma useful and maintainable.

# Doma Open Source Roadmap

Doma is an early-stage open-source, privacy-first family planning app and a reusable Expo/React Native reference project.

This roadmap describes how the public project should grow in small, reviewable milestones.

## Current Status

Last synchronized: 2026-06-11.

```text
Completed: Milestone A — Public Repository Readiness
Completed: Milestone B — Component Foundation
Completed: Milestone C — Localization Cleanup
Completed: Milestone D — Local State
Completed: Milestone E — Forms and Validation
Completed: Milestone F — Privacy and Security Baseline
Not started: Milestone G — Backend Foundation
```

Open follow-up work should focus on tests, accessibility, and localization polish before backend features expand.

## Open Source Goals

Doma should be useful to:

- contributors who want to learn Expo, React Native, and TypeScript through a real product;
- maintainers building privacy-first mobile apps;
- designers and developers studying documented product-to-code workflows;
- teams looking for bilingual localization patterns;
- people interested in local-first and offline-first family coordination software.

## Project Principles

- Privacy first: never require real family data for development or contribution.
- Local first before backend: make the app useful with mock/local data before sync.
- Small milestones: avoid broad rewrites and large PRs.
- Documentation as source of truth: product, design, data, and privacy docs should guide code.
- Calm UI: avoid corporate productivity patterns and overloaded dashboards.
- Multilingual by design: Russian and Polish support are part of the MVP, not an afterthought.

## Milestone A: Public Repository Readiness

Status: completed for public alpha.

Goal: make the repository safe and understandable for public contributors.

Scope:

- public README;
- MIT license;
- contribution guide;
- code of conduct;
- security policy;
- maintainer guide;
- issue and pull request templates;
- CI for TypeScript;
- Dependabot configuration;
- sanitized repository with no chat history, archives, secrets, or private screenshots.

Exit criteria:

- `npm run typecheck` passes;
- GitHub Actions CI passes;
- public branch does not include `chat_history`, `old`, `zip`, or `.trashed-*` files;
- README explains project status and contribution paths.

## Milestone B: Component Foundation

Status: completed for public alpha; component-level tests remain open follow-up work.

Goal: turn repeated UI patterns into reusable components.

Scope:

- `Button`;
- `Card`;
- `Chip`;
- `Input`;
- `Avatar`;
- `IconButton`;
- `Screen`;
- `Header`;
- `TabBar`;
- `EventCard`;
- `TaskRow`;
- `ShoppingItemRow`;
- `ShoppingCategory`;
- `AvatarGroup`;
- `CalendarMonth`;
- `CalendarDay`.

Exit criteria:

- components are typed;
- components use `src/theme/tokens.ts`;
- no large repeated UI blocks remain in screens;
- TypeScript passes.

## Milestone C: Localization Cleanup

Status: completed for visible app copy; Polish copy audit remains open follow-up work.

Goal: make Russian and Polish localization maintainable.

Scope:

- move visible UI strings from components into `src/i18n`;
- expand `ru.json` and `pl.json`;
- document terminology rules;
- add a simple localization coverage checklist.

Exit criteria:

- no avoidable hardcoded RU/PL UI strings in component code;
- RU and PL files use matching keys;
- TypeScript passes.

## Milestone D: Local State

Status: completed for non-persistent local alpha flows.

Goal: make Doma usable without a backend.

Scope:

- local event state;
- local task state;
- local shopping state;
- selected date state;
- language state;
- local add/complete flows;
- deterministic mock data.

Exit criteria:

- users can add an event locally;
- users can add and complete a task locally;
- users can add and purchase a shopping item locally;
- no backend required;
- TypeScript passes.

## Milestone E: Forms and Validation

Status: completed for the five documented MVP forms.

Goal: add reliable form flows.

Scope:

- login form;
- create family form;
- new event form;
- new task form;
- new shopping item form;
- React Hook Form;
- Zod validation;
- localized validation messages.

Exit criteria:

- invalid submit is blocked;
- required fields show localized errors;
- form submit handlers update local/mock state;
- TypeScript passes.

## Milestone F: Privacy and Security Baseline

Status: completed for the pre-backend public alpha baseline.

Goal: prepare for backend work without leaking sensitive data.

Scope:

- privacy threat model;
- logging rules;
- analytics rules;
- invite token handling notes;
- dependency review;
- security issue workflow.

Exit criteria:

- no private data in logs or fixtures;
- `SECURITY.md` is current;
- privacy review checklist exists;
- backend milestones have explicit security gates.

Current artifact:

```text
docs/privacy-threat-model.md
```

## Milestone G: Backend Foundation

Status: not started.

Goal: introduce Supabase after UI and local flows are stable.

Scope:

- Supabase client setup;
- environment variable docs;
- database schema;
- Row Level Security policies;
- auth foundation;
- storage plan for avatars.

Exit criteria:

- no secrets in the repository;
- local app can still run without production credentials;
- RLS policies are documented and tested before shared sync is enabled.

## Public Contribution Areas

Good areas for new contributors:

- localization;
- accessibility;
- documentation;
- small reusable components;
- issue templates;
- TypeScript cleanup;
- privacy checklists;
- visual consistency with design tokens.

Areas that need maintainer approval first:

- backend schema changes;
- authentication changes;
- notification behavior;
- data sync behavior;
- new product areas;
- redesigns;
- new dependencies.

## Codex Maintenance Workflows

Planned Codex-assisted workflows:

- PR review for TypeScript, UI consistency, and privacy risks;
- test generation for local state and forms;
- refactoring repeated UI into components;
- release notes and changelog drafting;
- issue triage and milestone grouping;
- localization key audits;
- documentation synchronization;
- dependency update review.

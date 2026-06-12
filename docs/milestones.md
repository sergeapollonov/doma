# Doma — Milestones

## 1. Purpose

This document defines the development roadmap for Doma.

Build Doma in small, reviewable milestones.

## 2. Milestone rules

- One milestone at a time.
- Do not skip ahead.
- Do not connect backend before UI and local logic are stable.
- Review after each milestone.
- Each milestone should pass TypeScript checks.
- Each milestone should avoid unrelated changes.

## Current public alpha status

Last synchronized: 2026-06-11.

```text
Completed: Milestone 0 — Project understanding
Completed: Milestone 1 — App skeleton
Completed: Milestone 2 — Static UI screens
Completed: Milestone 3 — Base components
Completed: Milestone 4 — Local state and interactions
Completed: Milestone 5 — Forms and validation
Next: Milestone 6 — Supabase foundation
```

Notes:

- The app still runs without backend credentials.
- Local state is intentionally non-persistent for now.
- Forms use React Hook Form + Zod with localized validation messages.
- Reusable UI components exist, but component-level UI tests remain a follow-up task.
- Accessibility remains an open quality milestone.
- Privacy threat modeling is documented in `docs/privacy-threat-model.md` and must gate backend-connected work.

## 3. Milestone 0 — Project understanding

### Goal

Make Codex understand the full project before writing code.

### Tasks

- Read `PROJECT-INDEX.md`.
- Read source-of-truth docs.
- Read supporting docs.
- Review screen references.
- Summarize the project.
- Identify contradictions, gaps or risks.
- Wait for approval.

### Output

```text
Doma Project Understanding
```

With sections:

```text
Files reviewed
Product summary
MVP scope
Tech stack
Data model summary
Navigation
Design system
Key screens
Auth flow
Offline/sync
Notifications
Permissions
Localization
Privacy
Risks and missing details
Implementation phases
```

### Do not

```text
Do not write code.
Do not create files.
Do not change docs.
```

## 4. Milestone 1 — App skeleton

### Goal

Create the initial Expo React Native TypeScript app structure.

### Scope

- Expo project;
- TypeScript;
- folder structure;
- theme tokens;
- i18n structure;
- placeholder bottom tabs;
- placeholder auth routes.

### Required folders

```text
/src/components
/src/features
/src/hooks
/src/i18n
/src/lib
/src/mocks
/src/store
/src/theme
/src/types
/src/utils
/app or /src/screens
```

### Required files

```text
/src/theme/tokens.ts
/src/theme/index.ts
/src/i18n/index.ts
/src/i18n/ru.json
/src/i18n/pl.json
```

### Do not

- do not connect Supabase;
- do not implement real screens;
- do not build real business logic.

## 5. Milestone 2 — Static UI screens

### Goal

Build main static screens using mock data and Doma design system.

### Screens

```text
Welcome
Login / Registration
Create Family
Invite Maya
Today
Calendar
Tasks
Shopping
New Event
```

### Data source

Use:

```text
/src/mocks/demoData.ts
```

### Do not

- no backend;
- no real auth;
- no realtime sync;
- no push notifications.

## 6. Milestone 3 — Base components

### Goal

Create reusable components to prevent duplicated UI.

### Components

```text
Button
Card
Chip
Input
Avatar
IconButton
BottomSheet
SectionHeader
Screen
Header
TabBar
EventCard
TaskRow
ShoppingItemRow
ShoppingCategory
AvatarGroup
CalendarMonth
CalendarDay
```

### Requirement

All components must use design tokens.

## 7. Milestone 4 — Local state and interactions

### Goal

Make the app usable locally without backend.

### Scope

- Zustand store;
- add event locally;
- add task locally;
- complete task locally;
- add shopping item locally;
- mark shopping item purchased locally;
- selected date state;
- language state.

### Do not

- no Supabase yet;
- no server sync yet.

## 8. Milestone 5 — Forms and validation

### Goal

Implement form logic with validation.

### Forms

```text
Login
Create Family
New Event
New Task
New Shopping Item
```

### Stack

```text
React Hook Form
Zod
```

### Requirements

- title required;
- email validation;
- family name required;
- user name required;
- save button disabled when invalid.

## 9. Milestone 6 — Supabase foundation

### Goal

Add backend infrastructure, but keep feature migration controlled.

Use `docs/privacy-threat-model.md` as the security gate for schema, RLS,
invite handling, logging, and future sync decisions.

### Scope

- Supabase client;
- env variables;
- SQL schema;
- RLS policies;
- profiles;
- families;
- family_members;
- events;
- tasks;
- shopping_items.

### Do not

- do not rewrite UI;
- do not add features outside data model.

### Security gates

- no service role key in the app bundle or docs examples;
- every shared table must have a family-scoped access rule;
- Row Level Security must be documented before UI reads/writes are connected;
- invite token handling must include expiry and revocation states;
- logs, analytics, screenshots, and test fixtures must not contain private family data.

## 10. Milestone 7 — Auth and family flow

### Goal

Connect authentication and family onboarding.

### Scope

- email login;
- create profile;
- create family;
- create owner member;
- invite Maya;
- accept invite;
- route based on auth/family state.

### MVP auth

```text
Email magic link preferred.
Email/password acceptable for early development.
```

## 11. Milestone 8 — Backend-connected features

### Goal

Move local features to Supabase.

### Scope

- events CRUD;
- tasks CRUD;
- shopping CRUD;
- optimistic updates;
- realtime subscriptions;
- sync status.

## 12. Milestone 9 — Reminders and notifications

### Goal

Add local reminders.

### Scope

- notification permission flow;
- event reminders;
- task reminders;
- schedule / cancel / update local notifications.

### Do not

- no noisy partner activity notifications by default;
- no server notification worker yet.

## 13. Milestone 10 — Empty, loading, error and offline states

### Goal

Make product feel stable and complete.

### Scope

- empty states;
- skeleton loading;
- save errors;
- sync errors;
- offline banner/status;
- undo messages.

## 14. Milestone 11 — Localization polish

### Goal

Make RU/PL complete.

### Scope

- all UI strings localized;
- validation messages localized;
- dates localized;
- category names localized;
- reminder/repeat labels localized.

## 15. Milestone 12 — QA and cleanup

### Goal

Prepare the MVP for real testing.

### Scope

- typecheck;
- lint;
- basic tests;
- manual QA checklist;
- visual consistency pass;
- remove dead code;
- check no private data in logs.

## 16. Milestone 13 — Widget planning / implementation

### Goal

Plan or implement medium Today widget.

First widget:

```text
Medium Today Widget
```

Content:

```text
Doma
Сегодня
09:00 Врач
14:30 Посылка
19:00 Ужин
2 дела · 6 покупок
```

Do not implement widget before core app and local data are stable.

## 17. Recommended next development prompt

```text
Read /docs/PROJECT-INDEX.md and /docs/milestones.md.

Proceed only with Milestone 6:
- add Supabase foundation;
- document required environment variables;
- add schema and RLS planning artifacts;
- keep the app runnable without backend credentials;
- keep local/mock mode intact.

Do not connect backend.
Do not migrate app screens to backend data yet.
Do not redesign UI.
After finishing, show created files and explain backend foundation boundaries.
```

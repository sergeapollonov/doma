# Doma — Project Index

## 1. Purpose

This document is the main navigation file for the Doma project.

Before writing code, read this file first. It explains:

- what Doma is;
- which documents are the source of truth;
- which files are supporting context;
- implementation order;
- what must not be changed without approval.

## 2. Product summary

**Doma** is a shared family planning app.

It is not just a calendar. It is a calm family command center for:

- shared events;
- household tasks;
- shopping lists;
- reminders;
- sync between two adults;
- future child profile;
- iOS-first premium UI;
- Android adaptation with minimal visual changes.

Current demo family:

```text
Alex
Maya
```

MVP languages:

```text
Russian
Polish
```

## 3. Product positioning

Doma should feel like:

```text
a warm, premium, minimal iOS-first family management app
```

Doma should not feel like:

```text
corporate task manager
Trello
Jira
Notion clone
Google Calendar clone
children’s cartoon app
```

Core product idea:

```text
A shared family plan for everyday life.
```

## 4. Source of truth

Read these first:

```text
/docs/product-brief.md
/docs/design-system.md
/docs/screens.md
/docs/user-flows.md
/docs/data-model.md
/docs/tech-stack.md
/docs/codex-tasks.md
```

If there is a conflict, priority is:

1. `PROJECT-INDEX.md`
2. `product-brief.md`
3. `design-system.md`
4. `screens.md`
5. `user-flows.md`
6. `data-model.md`
7. `tech-stack.md`
8. `codex-tasks.md`

## 5. Supporting documents

Read these after the main source-of-truth docs:

```text
/docs/auth-screens.md
/docs/permissions.md
/docs/notifications.md
/docs/offline-sync.md
/docs/empty-error-states.md
/docs/localization.md
/docs/mock-data.md
/docs/recurrence.md
/docs/analytics.md
/docs/testing.md
/docs/privacy-notes.md
/docs/milestones.md
/docs/definition-of-done.md
/docs/adr/README.md
```

## 6. Visual references

Visual references should be stored separately:

```text
/design-references/welcome.png
/design-references/login.png
/design-references/create-family.png
/design-references/today.png
/design-references/calendar.png
/design-references/tasks.png
/design-references/shopping.png
/design-references/new-event.png
```

Rules:

```text
Use references as visual direction.
Follow design-system.md for colors, spacing, typography, radius and component behavior.
If reference conflicts with design-system.md, follow design-system.md.
Do not invent a new visual style.
```

## 7. Public repository context

The public repository should rely on documented project files only.

Rules:

```text
Use docs to understand decisions.
Do not require private chat history, exported conversations or local archives.
Do not publish private planning exports.
Do not reintroduce rejected old ideas.
```

## 8. MVP scope

MVP includes:

- welcome screen;
- login / registration;
- create family;
- invite Maya;
- accept invite;
- Today screen;
- Calendar screen;
- New Event screen;
- Tasks screen;
- New Task screen;
- Shopping screen;
- New Shopping Item screen;
- reminders;
- RU / PL localization;
- local mock state first;
- later Supabase sync;
- basic offline/sync behavior;
- basic medium Today widget later.

MVP does not include:

- chat;
- family finances;
- documents;
- complex roles;
- full child login;
- Google Calendar / Apple Calendar integration;
- attachments;
- location;
- custom recurrence builder;
- dark theme;
- advanced analytics;
- real payment or subscription logic.

## 9. Technical stack

Use the selected stack:

```text
React Native + Expo
TypeScript
Expo Router or React Navigation
Supabase
PostgreSQL
Supabase Auth
Supabase Realtime
Zustand
TanStack Query
React Hook Form
Zod
i18next / react-i18next
expo-notifications
date-fns
EAS Build
```

Do not change the stack without explicit approval.

## 10. Design system summary

Doma style:

```text
warm premium iOS
soft beige / cream background
deep navy primary accent
warm gold secondary accent
soft glass panels
rounded cards
subtle shadows
minimal human interface
```

Use tokens from:

```text
/src/theme/tokens.ts
```

Do not hardcode random colors, spacing or shadows.

## 11. Core navigation

```text
Auth
 ├── Welcome
 ├── Login / Registration
 ├── Create Family
 ├── Invite Maya
 └── Accept Invite

Main Tabs
 ├── Today
 ├── Calendar
 ├── Tasks
 └── Shopping

Stack / Modals
 ├── New Event
 ├── Event Details
 ├── New Task
 ├── Task Details
 ├── New Shopping Item
 ├── Family Settings
 ├── Language Settings
 └── Notification Settings
```

## 12. Implementation rule

Do not build everything at once.

First:

```text
Milestone 0 — Project understanding
Milestone 1 — App skeleton
Milestone 2 — Static UI
Milestone 3 — Local state
Milestone 4 — Forms
Milestone 5 — Supabase backend
Milestone 6 — Auth + family
Milestone 7 — Realtime sync
Milestone 8 — Reminders
Milestone 9 — Polish + QA
Milestone 10 — Widget
```

## 13. First task for Codex

```text
Read /docs/PROJECT-INDEX.md first.
Then read all documents referenced in it.

Do not write code yet.

Summarize:
1. product concept;
2. MVP scope;
3. source-of-truth docs;
4. tech stack;
5. data model;
6. navigation;
7. design system;
8. auth flow;
9. offline/sync rules;
10. notification rules;
11. privacy constraints;
12. implementation phases;
13. contradictions or missing details.

Wait for approval before writing code.
```

## 14. Coding rules

When code begins:

- one milestone at a time;
- one task at a time;
- no backend before static UI and local state;
- no visual redesign;
- no new features outside MVP;
- TypeScript strict;
- no `any` unless justified;
- no private data in analytics;
- all strings localized;
- all colors from tokens;
- no platform-specific hacks unless documented.

## 15. What requires approval

Do not change these without approval:

- app name;
- main navigation;
- tech stack;
- backend choice;
- MVP scope;
- design language;
- color palette;
- data model direction;
- auth strategy;
- permission model;
- privacy assumptions.

## 16. Final note

Doma should stay simple. The biggest risk is scope creep.

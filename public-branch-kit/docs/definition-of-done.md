# Doma — Definition of Done

## 1. Purpose

This document defines what “done” means for each development phase.

A task is not done just because it compiles. It must follow product, design, code and documentation rules.

## 2. Global Definition of Done

Every completed task must satisfy:

```text
TypeScript passes
No obvious runtime errors
No unrelated changes
No visual redesign
No new features outside scope
All UI strings localized
Design tokens used for styling
No private content in analytics/logs
Code is readable and structured
```

## 3. Code quality checklist

Before marking any task done:

- `typecheck` passes;
- `lint` passes if configured;
- no `any` unless justified;
- no dead code;
- no unused imports;
- no random hardcoded colors;
- no duplicated large UI blocks;
- components are reusable where appropriate.

## 4. Design checklist

Every UI screen must:

- follow Doma warm premium style;
- use tokens from `/src/theme/tokens.ts`;
- use correct spacing and radii;
- respect iOS-first layout;
- use bottom tab style from design system;
- not introduce new palette;
- keep typography consistent;
- use human household language.

## 5. Localization checklist

Every visible string must exist in:

```text
/src/i18n/ru.json
/src/i18n/pl.json
```

No hardcoded Russian/Polish strings inside components, except temporary mock data.

## 6. Privacy checklist

Do not log or track:

- emails;
- names;
- family names;
- event titles;
- task titles;
- shopping item names;
- notes;
- comments;
- invite tokens.

Do not request:

- contacts permission;
- location permission;
- phone number.

Unless explicitly approved later.

## 7. Milestone 0 DoD — Project understanding

Done when Codex provides:

- list of reviewed files;
- product summary;
- MVP scope;
- tech stack;
- data model summary;
- navigation;
- design system summary;
- auth flow;
- offline/sync rules;
- notification rules;
- permissions;
- localization;
- privacy constraints;
- risks / contradictions;
- implementation phases.

No code should be written in Milestone 0.

## 8. Milestone 1 DoD — App skeleton

Done when:

- project runs locally;
- TypeScript is enabled;
- folder structure exists;
- theme tokens are added;
- i18n structure exists;
- placeholder auth screens exist;
- placeholder bottom tabs exist;
- no backend is connected;
- no real screens implemented yet.

Required tabs:

```text
Today
Calendar
Tasks
Shopping
```

## 9. Milestone 2 DoD — Static UI

Done when static screens exist for:

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

And:

- screens use mock data;
- design matches Doma style;
- tabs work;
- no backend required;
- no hardcoded styling outside tokens.

## 10. Milestone 3 DoD — Base components

Done when components exist:

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

And:

- components are typed;
- components use tokens;
- components are not screen-specific;
- variants are documented in code or simple props.

## 11. Milestone 4 DoD — Local state

Done when:

- Zustand store exists;
- events stored locally;
- tasks stored locally;
- shopping items stored locally;
- selected date stored locally;
- language stored locally;
- user can add local event;
- user can add local task;
- user can complete local task;
- user can add shopping item;
- user can mark shopping item purchased.

## 12. Milestone 5 DoD — Forms

Done when:

- React Hook Form is used;
- Zod validation is used;
- invalid fields show localized errors;
- save button disabled when invalid;
- form submit works with local/mock handlers.

Forms:

```text
Login
Create Family
New Event
New Task
New Shopping Item
```

## 13. Milestone 6 DoD — Supabase foundation

Done when:

- Supabase client exists;
- env variables documented;
- SQL schema exists;
- RLS policies exist;
- no service role key in app;
- backend access assumes family membership;
- app can still run in mock mode if env missing.

## 14. Milestone 7 DoD — Auth and family

Done when:

- user can log in;
- profile is created;
- family is created;
- owner family_member is created;
- Maya can be invited in dev flow;
- invite can be accepted in dev flow;
- routing works based on auth/family state.

## 15. Milestone 8 DoD — Backend-connected features

Done when:

- events load from Supabase;
- tasks load from Supabase;
- shopping items load from Supabase;
- create/update/complete/purchase mutations work;
- optimistic UI works;
- realtime updates work for current family;
- sync status displays correctly.

## 16. Milestone 9 DoD — Reminders

Done when:

- notification permission request works;
- event reminder can be scheduled;
- task reminder can be scheduled;
- reminder can be cancelled or updated;
- notification opens relevant screen if possible;
- denied permission state is handled.

## 17. Milestone 10 DoD — States

Done when app has:

- empty states;
- skeleton loading;
- save error states;
- sync error states;
- offline state;
- undo messages;
- invite error states.

## 18. Milestone 11 DoD — Localization

Done when:

- RU and PL are complete;
- no visible untranslated labels;
- date formatting respects locale;
- shopping categories translated;
- reminder labels translated;
- repeat labels translated;
- validation messages translated.

## 19. Milestone 12 DoD — QA

Done when:

- typecheck passes;
- lint passes;
- basic tests pass if configured;
- manual QA checklist exists;
- no known critical UI blockers;
- no obvious privacy violations;
- no accidental scope creep.

## 20. Milestone 13 DoD — Widget

Done when:

- widget plan is documented or implemented;
- medium Today widget shows correct content;
- tapping widget opens app;
- widget does not break app build;
- platform limitations are documented.

## 21. Review rule

After each milestone, Codex must report:

```text
What was done
Files created
Files changed
How to run/check
Known limitations
Next recommended step
```

Do not proceed to the next milestone until approved.

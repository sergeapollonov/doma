# Doma — Codex Tasks

## 1. How to use this document

Use this file as the task backlog for Codex.

Do not ask Codex to “build the whole app” in one prompt. Give it one task at a time, review the diff, then continue.

Recommended instruction style:

```text
Read the relevant docs in /docs.
Implement only the requested task.
Do not redesign the UI.
Use the design tokens.
Keep TypeScript strict.
Add comments only where helpful.
```

## 2. Required docs

Before starting, Codex should read:

```text
/docs/product-brief.md
/docs/design-system.md
/docs/screens.md
/docs/user-flows.md
/docs/data-model.md
/docs/tech-stack.md
/docs/codex-tasks.md
```

## 3. Phase 0 — repository setup

### Task 0.1 — Create Expo app

Prompt:

```text
Create a new Expo React Native app with TypeScript for the Doma project.
Use a clean structure prepared for iOS and Android.
Do not implement backend yet.
Add a README with basic run instructions.
```

Acceptance criteria:

- app runs locally;
- TypeScript enabled;
- no backend code yet;
- README exists.

### Task 0.2 — Add linting and formatting

Prompt:

```text
Add ESLint, Prettier, and TypeScript typecheck scripts.
Add npm scripts: lint, format, typecheck.
Make sure the project passes typecheck.
```

Acceptance criteria:

- `npm run typecheck` works;
- `npm run lint` works;
- `npm run format` works.

## 4. Phase 1 — project architecture

### Task 1.1 — Create folder structure

Prompt:

```text
Create the Doma folder structure described in /docs/tech-stack.md.
Add folders for components, features, hooks, i18n, lib, store, theme, types, and utils.
Do not add complex logic yet.
```

Acceptance criteria:

```text
/src/components
/src/features
/src/hooks
/src/i18n
/src/lib
/src/store
/src/theme
/src/types
/src/utils
```

### Task 1.2 — Add design tokens

Prompt:

```text
Read /docs/design-system.md.
Create /src/theme tokens for colors, spacing, radius, typography, and shadows.
Export them from /src/theme/index.ts.
Use exact values from the design system.
```

Acceptance criteria:

- colors match design-system.md;
- spacing, radius, shadows exist;
- no random hardcoded colors in components later.

### Task 1.3 — Add localization structure

Prompt:

```text
Add i18n structure for Russian and Polish.
Create ru.json and pl.json with all common tab labels, buttons, states, and screen titles from /docs/screens.md.
Set Russian as default language.
```

Acceptance criteria:

- `ru.json` exists;
- `pl.json` exists;
- translation helper/provider exists;
- no hardcoded tab labels.

## 5. Phase 2 — navigation shell

### Task 2.1 — Add app navigation

Prompt:

```text
Implement app navigation with the following areas:
- auth/onboarding placeholder screens
- main bottom tabs: Today, Calendar, Tasks, Shopping
- modal/stack screens: New Event, New Task, New Shopping Item, Family Settings

Use the structure recommended in /docs/tech-stack.md.
```

Acceptance criteria:

- bottom tabs visible;
- four main screens reachable;
- new screens reachable with placeholder content;
- navigation is typed if possible.

### Task 2.2 — Custom Doma tab bar

Prompt:

```text
Create a custom bottom tab bar matching Doma Design System v1:
warm glass surface, rounded corners, soft shadow, four tabs.
Active colors:
- Today: Doma Blue
- Calendar: Doma Blue
- Tasks: Task Orange
- Shopping: Shopping Green
```

Acceptance criteria:

- tab bar looks custom, not default;
- uses tokens;
- active tab state works;
- labels are localized.

## 6. Phase 3 — base UI components

### Task 3.1 — Build core UI components

Prompt:

```text
Create reusable UI components:
Button, Card, Chip, Input, Avatar, IconButton, SectionHeader, Screen.
Use the Doma design tokens.
Do not implement business logic.
```

Acceptance criteria:

- components are typed;
- components use tokens;
- components support basic variants;
- no screen-specific styling inside generic components.

### Task 3.2 — Build family avatar components

Prompt:

```text
Create MemberAvatar and AvatarGroup components.
They should support Alex and Maya mock data.
Support small, medium, large sizes from the design system.
```

Acceptance criteria:

- avatar component supports image URL and fallback initials;
- AvatarGroup supports 1–3 members;
- names can be shown below avatars.

## 7. Phase 4 — mock data

### Task 4.1 — Add domain types

Prompt:

```text
Read /docs/data-model.md.
Create TypeScript domain types for Profile, Family, FamilyMember, Event, Task, ShoppingCategory, ShoppingItem, Reminder.
Add union types for statuses and roles.
```

Acceptance criteria:

- types mirror data-model.md;
- exports from /src/types;
- no `any`.

### Task 4.2 — Add mock data

Prompt:

```text
Create mock data for Alex, Maya, events, tasks, shopping categories, and shopping items.
Use seed data from /docs/data-model.md.
```

Acceptance criteria:

- mock members: Алексей and Мая;
- mock events include Врач, Забрать посылку, Ужин с родителями;
- mock tasks include Позвонить мастеру, Оплатить интернет, Купить подарок для Маи;
- mock shopping includes Молоко, Сыр, Помидоры, Огурцы.

## 8. Phase 5 — static screens

### Task 5.1 — Today screen

Prompt:

```text
Implement the static Today screen using mock data.
Follow /docs/screens.md and /docs/design-system.md.
The screen must include:
- Doma logo/header
- greeting for Alex
- date
- Alex and Maya avatars
- sync status
- upcoming events
- tasks preview
- shopping summary
- bottom tab bar
```

Acceptance criteria:

- visually close to selected Doma style;
- uses mock data;
- no backend;
- no random colors.

### Task 5.2 — Calendar screen

Prompt:

```text
Implement the static Calendar screen using mock data.
Include:
- month grid for June 2026
- selected date 3 June
- event dots
- selected day event list
- event cards with avatars
```

Acceptance criteria:

- week starts Monday;
- selected day is Doma Blue;
- event cards match design system;
- bottom tab Calendar active.

### Task 5.3 — Tasks screen

Prompt:

```text
Implement the static Tasks screen using mock data.
Include:
- Doma header
- title Дела
- Alex and Maya avatars
- filters: Все, Мои, Маи, Общие, Выполнено
- sections: Сегодня, На неделе, Без срока, Выполнено
- task cards with checkbox, metadata, avatars
```

Acceptance criteria:

- filters are visible;
- completed task has checked state and strikethrough;
- active tab is Tasks;
- uses Task Orange.

### Task 5.4 — Shopping screen

Prompt:

```text
Implement the static Shopping screen using mock data.
Include:
- Doma header
- title Покупки
- Alex and Maya avatars
- Add item row
- frequently bought items
- categories: Молочное, Овощи и фрукты, Дом, Мясо и рыба
- shopping rows with checkboxes and quantities
```

Acceptance criteria:

- active tab is Shopping;
- uses Shopping Green and warm gold accents;
- category cards are collapsible-ready but can be static for now.

## 9. Phase 6 — forms

### Task 6.1 — New Event screen

Prompt:

```text
Implement New Event screen using React Hook Form and Zod.
Fields:
- title
- date
- time
- participants
- reminder
- repeat
- comment

Use static options and mock save handler.
Follow /docs/screens.md.
```

Acceptance criteria:

- title required;
- participants default to Alex and Maya;
- reminder default 30 minutes;
- save button disabled if title empty;
- no backend yet.

### Task 6.2 — New Task screen

Prompt:

```text
Implement New Task screen or bottom sheet.
Fields:
- title
- assignee
- due date
- reminder
- repeat
- comment

Use static options and mock save handler.
```

Acceptance criteria:

- title required;
- assignee options: Alex, Maya, Shared;
- default due date: none;
- default reminder: none.

### Task 6.3 — New Shopping Item screen

Prompt:

```text
Implement New Shopping Item bottom sheet.
Fields:
- title
- quantity
- category
- note

Add quick input behavior for strings like "Молоко 2 л".
Use mock save handler.
```

Acceptance criteria:

- title required;
- category can be selected;
- quantity optional;
- quick add works locally.

## 10. Phase 7 — local state

### Task 7.1 — Add Zustand store

Prompt:

```text
Add Zustand store for local mock state:
- current family
- members
- events
- tasks
- shopping items
- selected date
- language

Connect Today, Calendar, Tasks and Shopping screens to the store.
```

Acceptance criteria:

- screens no longer import static arrays directly;
- data comes from store;
- TypeScript types are correct.

### Task 7.2 — Implement local mutations

Prompt:

```text
Implement local mutations:
- add event
- add task
- complete task
- add shopping item
- mark shopping item purchased
- undo last task/shopping action where practical
```

Acceptance criteria:

- creating event updates Today/Calendar;
- completing task updates Tasks/Today;
- purchasing item updates Shopping/Today;
- no backend yet.

## 11. Phase 8 — Supabase backend

### Task 8.1 — Add Supabase client

Prompt:

```text
Add Supabase client setup using environment variables:
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY

Create /src/lib/supabase.ts.
Do not commit real credentials.
```

Acceptance criteria:

- supabase client exported;
- env vars documented;
- app still runs without real credentials in mock mode.

### Task 8.2 — Create SQL schema

Prompt:

```text
Read /docs/data-model.md.
Create Supabase SQL migration for MVP tables:
profiles, families, family_members, family_invites, events, event_participants, tasks, shopping_categories, shopping_items, reminders, notification_settings, device_tokens, activity_log.
Include indexes and updated_at triggers where useful.
```

Acceptance criteria:

- SQL file exists;
- primary/foreign keys included;
- indexes for family_id;
- no destructive assumptions.

### Task 8.3 — Add RLS policies

Prompt:

```text
Add Supabase Row Level Security policies so users can only access data for families where they are active members.
Add policies for families, family_members, events, tasks, shopping_items, reminders.
```

Acceptance criteria:

- RLS enabled;
- access limited by family membership;
- no public unrestricted policies.

### Task 8.4 — Implement auth

Prompt:

```text
Implement Supabase Auth for email login.
Start with email/password for development or magic link if straightforward.
Add basic auth state handling.
```

Acceptance criteria:

- login works;
- logout works;
- auth state persists;
- unauthenticated users see auth screens.

### Task 8.5 — Implement family creation

Prompt:

```text
Implement create family flow:
- create profile if needed
- create family
- create family_member for current user as owner
- navigate to Today
```

Acceptance criteria:

- user can create family;
- family appears in backend;
- member row created.

### Task 8.6 — Implement partner invite

Prompt:

```text
Implement invite partner flow using family_invites.
Generate invite token.
Create invite link placeholder.
Allow accepting invite in development flow.
```

Acceptance criteria:

- invite row created;
- invited user can join family;
- family_member row created for invited user.

## 12. Phase 9 — backend-connected features

### Task 9.1 — Connect events to Supabase

Prompt:

```text
Replace local-only events with Supabase-backed queries and mutations.
Keep optimistic updates.
Subscribe to realtime changes for current family events.
```

Acceptance criteria:

- create event saves to Supabase;
- event appears on both clients;
- realtime update works.

### Task 9.2 — Connect tasks to Supabase

Prompt:

```text
Replace local-only tasks with Supabase-backed queries and mutations.
Implement complete task mutation.
Subscribe to realtime changes.
```

Acceptance criteria:

- tasks load from backend;
- new task saves;
- completed task syncs;
- realtime update works.

### Task 9.3 — Connect shopping to Supabase

Prompt:

```text
Replace local-only shopping items with Supabase-backed queries and mutations.
Implement add item and mark purchased.
Subscribe to realtime changes.
```

Acceptance criteria:

- shopping list loads from backend;
- adding item syncs;
- purchased state syncs;
- realtime update works.

## 13. Phase 10 — notifications

### Task 10.1 — Add notification permissions

Prompt:

```text
Add expo-notifications setup.
Request notification permissions.
Store device token in device_tokens table when backend is available.
```

Acceptance criteria:

- permission prompt works;
- token retrieved;
- token saved if logged in.

### Task 10.2 — Local reminders

Prompt:

```text
Schedule local notifications for event and task reminders.
Use reminder values from New Event and New Task forms.
```

Acceptance criteria:

- event reminder schedules;
- task reminder schedules;
- reminder cancels/updates if object changes.

## 14. Phase 11 — states and polish

### Task 11.1 — Empty states

Prompt:

```text
Add empty states for Today, Tasks, Shopping, and selected Calendar day using /docs/screens.md.
```

Acceptance criteria:

- no blank screens;
- empty states match Doma style.

### Task 11.2 — Loading and error states

Prompt:

```text
Add loading skeletons and error states for backend-connected screens.
Use warm Doma styling.
```

Acceptance criteria:

- loading states visible;
- retry button exists on errors.

### Task 11.3 — Offline state

Prompt:

```text
Add offline detection and sync status UI.
Show:
Нет соединения
Изменения сохранятся и синхронизируются позже.
```

Acceptance criteria:

- offline state appears;
- UI remains usable for local actions where possible.

## 15. Phase 12 — widget

### Task 12.1 — Widget planning

Prompt:

```text
Create a technical plan for implementing the Doma medium Today widget for iOS and Android.
Do not implement native widget yet.
Explain required native/config plugin work.
```

Acceptance criteria:

- plan exists;
- iOS and Android differences explained;
- data source for widget defined.

### Task 12.2 — Implement widget after MVP UI

Prompt:

```text
Implement the medium Today widget if the chosen Expo/native setup supports it.
The widget should show:
Doma
Сегодня
09:00 Врач
14:30 Посылка
19:00 Ужин
2 дела · 6 покупок
```

Acceptance criteria:

- widget renders current data;
- tap opens app;
- works on target platform.

## 16. Phase 13 — QA

### Task 13.1 — Run quality checks

Prompt:

```text
Run typecheck, lint, and tests.
Fix all errors.
Do not change product behavior unless needed.
```

Acceptance criteria:

- typecheck passes;
- lint passes;
- tests pass.

### Task 13.2 — Manual QA checklist

Prompt:

```text
Create a manual QA checklist for the Doma MVP:
- auth
- family creation
- invite partner
- event creation
- task creation/completion
- shopping add/purchase
- reminders
- localization
- offline/sync
```

Acceptance criteria:

- checklist exists in /docs/qa-checklist.md.

## 17. First prompt to Codex

Use this as the first Codex prompt:

```text
You are working on the Doma app.

Read:
- /docs/product-brief.md
- /docs/design-system.md
- /docs/screens.md
- /docs/user-flows.md
- /docs/data-model.md
- /docs/tech-stack.md
- /docs/codex-tasks.md

Create the initial Expo React Native TypeScript project structure for Doma.

Implement only:
1. project folder structure,
2. theme tokens,
3. localization structure for RU/PL,
4. placeholder bottom tabs: Today, Calendar, Tasks, Shopping.

Do not implement backend yet.
Do not redesign the UI.
Use the Doma design system.
Keep TypeScript strict.
```

## 18. Important rule for Codex

Do not allow Codex to invent a new visual style.

Every UI task should include:

```text
Use /docs/design-system.md.
Do not introduce new colors, spacing, or typography unless required.
```

## 19. Stop conditions

Stop and review after each phase:

- after project setup;
- after design tokens;
- after navigation shell;
- after static Today screen;
- after all static screens;
- before backend;
- before notifications;
- before widgets.

Do not merge huge unreviewed changes.

# Additional Codex Tasks — Auth / First Launch

## Phase A — Auth and first launch UI

### Task A.1 — Welcome screen

Prompt:

```text
Read /docs/screens.md and /docs/design-system.md.
Implement the Doma Welcome screen.

It must include:
- Doma logo/wordmark area
- title: “Общий план вашей семьи”
- subtitle: “События, дела и покупки — в одном спокойном месте.”
- glass preview card with Today/Event/Task/Shopping examples
- primary button: “Создать семью”
- secondary button: “У меня есть приглашение”
- legal text

Use the warm Doma style.
Do not implement backend yet.
```

Acceptance criteria:

- screen matches Doma visual style;
- buttons navigate to placeholder auth routes;
- strings are localized via i18n;
- no backend dependency.

### Task A.2 — Login / Registration screen

Prompt:

```text
Implement the Login / Registration screen.

It must include:
- title: “Войти в Doma”
- email input
- primary button: “Продолжить”
- optional buttons: “Войти через Apple”, “Войти через Google”
- helper text explaining email is used for login and sync
- legal text

Use React Hook Form and Zod for email validation.
For now, use a mock submit handler.
```

Acceptance criteria:

- invalid email shows validation error;
- valid email triggers mock submit;
- screen uses design tokens;
- strings are localized.

### Task A.3 — Create Family screen

Prompt:

```text
Implement Create Family screen.

Fields:
- family name
- user display name
- optional profile photo placeholder

Defaults for demo:
- Семья Алексея
- Алексей

Primary button:
- Создать Doma

Use React Hook Form and Zod.
For now, use a mock submit handler.
```

Acceptance criteria:

- family name required;
- user name required;
- mock submit navigates to Invite Maya placeholder;
- uses Doma design system.

### Task A.4 — Invite Maya screen

Prompt:

```text
Implement Invite Maya screen.

It must include:
- title: “Пригласите Маю”
- description about sharing invite link
- primary button: “Поделиться ссылкой”
- secondary button: “Сделать позже”

For now, primary button can open native share with a placeholder invite link.
```

Acceptance criteria:

- native share opens or mock share works;
- skip navigates to Today;
- uses Doma visual style.

### Task A.5 — Accept Invite screen

Prompt:

```text
Implement Accept Invite screen.

It must include:
- title: “Вас пригласили в Doma”
- text: “Алексей приглашает вас в общий план семьи.”
- primary button: “Присоединиться”
- secondary button: “Войти другим аккаунтом”

For now, use mock accept handler.
```

Acceptance criteria:

- accept navigates to Today;
- invite error states are represented in code as placeholders;
- uses localization.

## Phase A placement

These tasks should be done before building the full backend.

Recommended order:

```text
A.1 Welcome
A.2 Login / Registration
A.3 Create Family
A.4 Invite Maya
A.5 Accept Invite
```

# Doma — Tech Stack

## 1. Goal

This document defines the recommended technical stack for building the Doma MVP.

Doma should be iOS-first visually, available on iOS and Android, fast to build, maintainable, ready for shared sync, compatible with reminders and widgets, and easy to hand off to Codex or a developer.

## 2. Recommended stack summary

```text
App: React Native + Expo
Language: TypeScript
Navigation: Expo Router or React Navigation
Backend: Supabase
Database: PostgreSQL
Auth: Supabase Auth
Storage: Supabase Storage
Realtime: Supabase Realtime
State management: Zustand
Server state/data fetching: TanStack Query
Forms: React Hook Form + Zod
Localization: i18next / react-i18next
Notifications: expo-notifications
Date handling: date-fns
Icons: lucide-react-native or custom icon set
Styling: React Native StyleSheet + design tokens
Builds: EAS Build
```

## 3. Why Expo + React Native

Expo is the best practical choice for MVP because it allows one TypeScript codebase for iOS and Android, with access to native APIs and a faster development loop. Expo’s official documentation describes creating universal Android, iOS, and web apps from one JavaScript/TypeScript project. Expo also has official TypeScript guidance and notification APIs.

Use Expo unless there is a very specific native requirement that Expo cannot handle.

## 4. TypeScript

Use TypeScript from day one.

Reasons:

- safer data model;
- better Codex output;
- easier refactoring;
- typed navigation;
- typed Supabase responses;
- fewer runtime mistakes.

Recommended settings:

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true
}
```

## 5. Navigation

### Option A — Expo Router

Pros:

- file-based routing;
- modern Expo default direction;
- good for structured app screens;
- fast setup.

Cons:

- can be slightly less explicit for beginners.

### Option B — React Navigation

Pros:

- mature;
- explicit stack/tab navigation;
- widely used across React Native;
- official docs describe stack and tabbed navigation patterns.

Cons:

- more boilerplate.

### Recommendation

Use **Expo Router** if starting a fresh Expo app. If Codex struggles with Expo Router, use React Navigation.

Possible structure:

```text
/app
  /(auth)
    onboarding.tsx
    login.tsx
    create-family.tsx
    invite.tsx
  /(tabs)
    today.tsx
    calendar.tsx
    tasks.tsx
    shopping.tsx
  /event
    new.tsx
    [id].tsx
  /task
    new.tsx
    [id].tsx
  /shopping
    new-item.tsx
  /family
    index.tsx
    language.tsx
    notifications.tsx
```

## 6. Backend choice

### Recommended: Supabase

Use Supabase for authentication, PostgreSQL database, realtime sync, avatar storage, and Row Level Security.

Supabase’s Expo React Native documentation covers using Supabase with Expo and includes Auth, Database, Storage, and Row Level Security.

### Why Supabase over Firebase for Doma

Supabase is better for Doma because Doma data is relational:

- families;
- members;
- events;
- participants;
- tasks;
- shopping categories;
- reminders.

PostgreSQL fits this model well.

Firebase would be faster for simple realtime prototypes, but the relational model will become messy as features grow.

## 7. Authentication

Use Supabase Auth.

MVP auth options:

1. Email + magic link.
2. Email + password.
3. Apple sign-in later.
4. Google sign-in later.

Recommended MVP:

```text
Email + magic link
```

For early development, email + password may be easier.

## 8. Database

Use Supabase PostgreSQL.

Core tables:

```text
profiles
families
family_members
family_invites
events
event_participants
tasks
shopping_categories
shopping_items
reminders
notification_settings
device_tokens
activity_log
```

See:

```text
/docs/data-model.md
```

## 9. Realtime sync

Use Supabase Realtime for events, tasks, shopping_items, and family_members.

MVP behavior:

- subscribe to current family data;
- update UI when Maya changes something;
- show sync status on Today screen.

Avoid overengineering conflict resolution in MVP.

Simple rule:

```text
latest updated_at wins
```

## 10. Local state

Use Zustand for client UI state.

Examples:

```text
currentFamilyId
selectedDate
currentLanguage
temporary form state
bottom sheet state
offline sync state
```

Do not put all server data only in Zustand. Use TanStack Query for server data.

## 11. Server state

Use TanStack Query for fetching events, tasks, shopping list, mutations, optimistic updates, and cache invalidation.

Example query keys:

```ts
['family', familyId]
['events', familyId, month]
['tasks', familyId]
['shoppingItems', familyId]
```

## 12. Forms and validation

Use:

```text
React Hook Form
Zod
```

Forms:

- New Event;
- New Task;
- New Shopping Item;
- Create Family;
- Invite Partner.

Example validation:

```ts
const NewEventSchema = z.object({
  title: z.string().min(1),
  startsAt: z.string(),
  participants: z.array(z.string()).min(1),
});
```

## 13. Localization

Use:

```text
i18next
react-i18next
```

Languages:

```text
ru
pl
```

File structure:

```text
/src/i18n
  index.ts
  ru.json
  pl.json
```

Rules:

- Do not hardcode UI strings in components.
- Keep names like “Алексей” and “Мая” as user data, not translation strings.
- Dates should localize.

## 14. Date and time

Use:

```text
date-fns
date-fns/locale
```

Supported locales:

- ru
- pl

Use device timezone by default.

Important:

- Store timestamps as UTC / timestamptz in backend.
- Display dates in user timezone.
- Week starts on Monday for RU/PL.

## 15. Notifications

Use:

```text
expo-notifications
```

Expo provides APIs to fetch push notification tokens and schedule, present, receive, and respond to notifications. Expo also documents push notification setup for iOS and Android.

MVP notification types:

- event reminder;
- task reminder.

Later notification types:

- partner completed task;
- partner bought shopping items;
- invite accepted;
- sync issue.

Important:

- Avoid too many notifications.
- Shopping updates should be off by default.
- Partner activity notifications should be off by default.

## 16. Widgets

Widgets are platform-specific.

### iOS

Use WidgetKit via Expo config plugin or native module after MVP UI is stable.

### Android

Use Android App Widgets via native module/config plugin.

### MVP recommendation

Start with in-app screens first. Then implement widgets after the data model and local cache are stable.

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

## 17. Styling approach

Use:

```text
React Native StyleSheet
centralized design tokens
```

Avoid:

- random inline colors;
- duplicated spacing values;
- heavy UI kits that fight the custom design;
- default Material UI look.

Recommended structure:

```text
/src/theme
  tokens.ts
  colors.ts
  typography.ts
  spacing.ts
  radius.ts
  shadows.ts
```

## 18. UI component structure

```text
/src/components
  /ui
    Button.tsx
    Card.tsx
    Chip.tsx
    Input.tsx
    Avatar.tsx
    IconButton.tsx
    BottomSheet.tsx
    SectionHeader.tsx
  /layout
    Screen.tsx
    Header.tsx
    TabBar.tsx
  /calendar
    CalendarMonth.tsx
    CalendarDay.tsx
    EventCard.tsx
  /tasks
    TaskRow.tsx
    TaskSection.tsx
    TaskFilters.tsx
  /shopping
    ShoppingCategory.tsx
    ShoppingItemRow.tsx
    FrequentItemChip.tsx
  /family
    MemberAvatar.tsx
    AvatarGroup.tsx
```

## 19. Project structure

Recommended structure:

```text
/src
  /app or /screens
  /components
  /features
    /auth
    /family
    /events
    /tasks
    /shopping
    /reminders
  /hooks
  /i18n
  /lib
    supabase.ts
    dates.ts
    notifications.ts
  /store
  /theme
  /types
  /utils
/docs
```

If using Expo Router, routes live in `/app`, while feature logic stays in `/src/features`.

## 20. Testing

MVP testing stack:

```text
Jest
React Native Testing Library
```

Test first:

- date formatting;
- data transforms;
- task completion;
- shopping item purchase;
- localization fallback;
- form validation.

Do not overinvest in end-to-end testing before the MVP stabilizes.

Later:

```text
Maestro
Detox
```

## 21. Linting and formatting

Use:

```text
ESLint
Prettier
TypeScript strict mode
```

Recommended scripts:

```json
{
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write ."
}
```

## 22. Build and deployment

Use:

```text
EAS Build
EAS Submit
```

Build profiles:

```text
development
preview
production
```

## 23. Environment variables

Use `.env` for local development.

```text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Never commit secret service role keys.

## 24. Security notes

Required:

- Supabase Row Level Security;
- family-level access policies;
- no direct access to other families;
- invite token should be unguessable;
- validate all mutations by family membership.

## 25. Performance notes

Important:

- avoid rendering too many calendar items in month cells;
- use FlatList for long task/shopping lists;
- memoize rows where useful;
- keep image/avatar sizes optimized;
- avoid heavy blur everywhere.

## 26. Accessibility

MVP should include:

- tappable areas at least 44x44 px;
- readable contrast;
- labels for icon-only buttons;
- dynamic font support where possible;
- no color-only status meaning.

## 27. Development order

Recommended order:

1. Expo app setup.
2. Theme tokens.
3. Static UI components.
4. Static screens with mock data.
5. Navigation.
6. Forms.
7. Local state.
8. Supabase schema.
9. Supabase Auth.
10. Family creation/invites.
11. Events sync.
12. Tasks sync.
13. Shopping sync.
14. Reminders.
15. Empty/loading/error/offline states.
16. Widget.
17. Polish and QA.

## 28. References

Technical direction is based on current official documentation for Expo, Expo TypeScript, Expo Notifications, React Navigation, and Supabase with Expo React Native.

# Auth Implementation Notes

## 1. MVP auth recommendation

Product UX target:

```text
Email + magic link
```

Early development shortcut:

```text
Email + password
```

Magic link is better for the final family-app experience because it reduces password friction.

## 2. Auth routing states

The app should route users based on these conditions:

```text
Unauthenticated → Welcome / Login
Authenticated without profile → Create profile
Authenticated with profile but no family → Create Family
Authenticated active family member → Today
Invite token present → Accept Invite
```

## 3. Supabase Auth

Use Supabase Auth.

Recommended development path:

1. Implement UI with mock submit handlers.
2. Add Supabase client.
3. Add email/password or magic link auth.
4. Add profile creation.
5. Add family creation.
6. Add invite acceptance.

## 4. Screens to implement before backend

```text
Welcome
Login / Registration
Create Family
Invite Maya
Accept Invite
```

# Doma — Privacy Notes

## 1. Purpose

This document defines privacy principles and minimum privacy requirements for Doma.

Doma handles family-related data. Even if the app starts as a personal MVP, privacy must be considered from the beginning.

For practical threat scenarios, mitigations, contributor checks, and backend security gates, see:

```text
/docs/privacy-threat-model.md
```

## 2. Type of data Doma may process

Doma may process:

- email address;
- display name;
- avatar;
- family name;
- family membership;
- shared events;
- event times;
- task titles;
- shopping item titles;
- reminders;
- notification tokens;
- device/platform information;
- language setting;
- activity logs.

Some of this data may reveal sensitive household routines.

## 3. Privacy principles

Doma should follow these principles:

1. Collect only what is needed.
2. Do not sell user data.
3. Do not expose one family’s data to another family.
4. Do not use private content for analytics.
5. Make deletion possible.
6. Keep notifications user-controlled.
7. Keep invite links secure.
8. Store access rules in backend, not only in frontend.

## 4. Data minimization

Do not collect:

- phone number in MVP;
- precise location in MVP;
- contacts list in MVP;
- calendar integration data in MVP;
- payment data in MVP;
- unnecessary device identifiers.

Collect only:

```text
email
display name
family membership
events/tasks/shopping data created by user
notification token if notifications enabled
language
timezone
```

## 5. Authentication

Use Supabase Auth.

Auth data:

```text
email
auth user id
session tokens
```

Rules:

- do not expose service role key in app;
- use anon key only on client;
- use Row Level Security;
- invite links must use random tokens.

## 6. Family data isolation

Every query must be scoped by:

```text
family_id
```

Every protected table must enforce RLS:

```text
user must be active member of family
```

No frontend-only permission checks.

## 7. Invite links

Invite links should:

- use unguessable token;
- expire;
- be revocable later;
- not expose raw family permissions;
- not automatically grant access without authentication.

Recommended fields:

```text
invite_token
expires_at
status
accepted_by
accepted_at
```

## 8. Notifications privacy

Push notifications can appear on lock screen.

Avoid overly sensitive text by default.

Acceptable:

```text
Напоминание: Врач через 30 минут
```

Potentially sensitive:

```text
Напоминание: Кардиолог, результаты анализов, клиника XYZ
```

Recommendation:

- MVP can show normal titles;
- later add setting “Скрывать детали уведомлений”.

Future setting:

```text
Показывать детали уведомлений
Да / Нет
```

If disabled:

```text
Doma
У вас новое напоминание
```

## 9. Analytics privacy

Analytics must not include:

- event titles;
- task titles;
- shopping item names;
- comments;
- notes;
- emails;
- names;
- family name;
- invite tokens.

Use non-sensitive properties only:

```text
has_reminder
has_repeat
participant_count
category
screen
language
platform
```

## 10. Activity log privacy

Activity log is product data, not analytics.

It may store actions like:

```text
task.completed
shopping_item.purchased
event.created
```

Avoid storing full private content in metadata unless required.

Prefer IDs and action types.

## 11. Deletion

MVP should support:

- delete event;
- delete task;
- delete shopping item;
- leave family;
- delete family by owner.

Future must support:

- delete account;
- export data;
- delete all personal data;
- transfer ownership before owner leaves.

## 12. Data retention

MVP recommendation:

- soft-delete user-facing objects with `deleted_at`;
- hide deleted data in UI;
- later add permanent cleanup job.

Future retention policy:

```text
Soft deleted items are permanently deleted after N days.
```

## 13. Children

The app may later include a child profile.

Important:

- child profile in MVP is not a real login;
- do not collect child email;
- do not collect child precise personal data unnecessarily;
- do not expose child profile publicly.

If child login is added later, privacy review must be repeated.

## 14. Legal pages

Before public release, Doma needs:

```text
Privacy Policy
Terms of Use
```

Minimum Privacy Policy topics:

- what data is collected;
- why data is collected;
- how data is stored;
- who can access family data;
- notifications;
- analytics;
- data deletion;
- contact email;
- children data if applicable.

## 15. Security checklist

Before production:

```text
RLS enabled on all family tables
No service role key in app
Invite tokens are random and expiring
Storage bucket access is restricted
Auth redirect URLs are configured
Push tokens are tied to user id
No private content in analytics
Logs do not leak private data
```

## 16. App store privacy labels

Before release, prepare disclosures for:

- contact info: email;
- user content: events/tasks/shopping data;
- identifiers: user ID;
- usage data if analytics enabled;
- diagnostics if crash reporting enabled.

## 17. MVP privacy decision

For MVP:

```text
Use Supabase Auth.
Use RLS from the start.
Do not integrate external analytics initially.
Do not collect phone numbers or contacts.
Do not collect location.
Keep child as non-login profile only.
Add placeholder Terms and Privacy links in auth screens.
```

## 18. Codex task

Prompt:

```text
Create privacy-safe defaults for Doma.

Rules:
- do not add external analytics provider;
- do not collect phone number, contacts or location;
- do not store private content in analytics;
- keep invite tokens separate from family IDs;
- assume all family data must be protected by RLS;
- add placeholder links for Terms of Use and Privacy Policy on auth screens.
```

## 19. Acceptance criteria

- Auth screens include Terms and Privacy links.
- No external analytics provider is added.
- No location/contacts permissions are requested.
- Invite token flow does not expose raw permissions.
- Data access assumes RLS and active family membership.

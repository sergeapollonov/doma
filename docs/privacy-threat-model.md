# Doma — Privacy Threat Model

## 1. Purpose

This document defines the practical privacy threat model for Doma before backend
sync, real authentication, realtime updates, notifications, analytics, and
native widgets are implemented.

Doma may handle family schedules, household tasks, shopping items, invite
links, reminders, profile data, and device state. Even ordinary household data
can reveal routines, locations, health context, school context, travel plans, or
who is home.

This threat model is a required gate before Supabase-connected features.

## 2. Current Scope

Current public alpha:

- local/mock app state;
- public demo names only;
- deterministic demo data;
- no real authentication;
- no backend sync;
- no push notifications;
- no analytics provider;
- no native widgets;
- no persistent local store.

Planned but not connected yet:

- Supabase Auth;
- PostgreSQL tables;
- Row Level Security;
- realtime subscriptions;
- push notifications;
- offline mutation queue;
- local persistence;
- widgets.

## 3. Privacy Assets

Protect these data classes:

| Data class | Examples | Sensitivity |
|---|---|---|
| Identity | email, display name, avatar | medium |
| Family graph | family name, members, roles, invite status | high |
| Schedule | event titles, times, participants, locations | high |
| Household tasks | task titles, assignees, due dates, completion status | medium/high |
| Shopping data | item names, quantities, purchase state | medium |
| Invite links | invite token, invited email, accepted_by | high |
| Reminders | notification text, timing, device token | high |
| Offline queue | pending mutations and payloads | high |
| Activity log | action type, actor, target IDs, timestamps | medium/high |
| Screenshots/logs | UI captures, debug output, test failures | high if real data appears |

## 4. Trust Boundaries

The main boundaries are:

1. Device UI and local state.
2. Local persistent cache and pending mutation queue.
3. Supabase Auth session.
4. Supabase database and Row Level Security.
5. Supabase Realtime channels.
6. Push notification service.
7. Analytics and crash reporting tools.
8. GitHub issues, PRs, screenshots, fixtures, and logs.

Do not assume frontend checks are sufficient. Backend access must be enforced by
Row Level Security and scoped to active family membership.

## 5. Threats And Mitigations

### T1. Cross-family data exposure

Risk: a user reads or writes events, tasks, shopping items, or members from a
family they do not belong to.

Mitigations:

- every shared table includes `family_id`;
- every protected query is scoped by the active family;
- RLS requires an active `family_members` row for `auth.uid()`;
- child profiles without `user_id` cannot authenticate or query data directly;
- tests or SQL review must cover cross-family denial.

Backend gate:

```text
Do not connect UI reads/writes until RLS policies exist for every shared table.
```

### T2. Invite token leakage

Risk: invite links grant access too broadly, are guessable, do not expire, or
appear in logs, analytics, screenshots, or public issues.

Mitigations:

- use unguessable random tokens;
- store only token hashes if practical;
- include `expires_at`, `status`, `accepted_by`, and `accepted_at`;
- allow revoked and expired states;
- require authentication before accepting an invite;
- never log invite tokens;
- public examples must use fake tokens.

Backend gate:

```text
Do not ship real invite acceptance until expiry, revocation, and authenticated
acceptance are implemented.
```

### T3. Sensitive content in analytics

Risk: analytics captures event titles, task titles, shopping item names,
family names, emails, comments, invite tokens, or notification content.

Mitigations:

- analytics events use action names and non-sensitive booleans/counts only;
- analytics payloads must be reviewed before adding an SDK;
- private content must not be used as event properties;
- analytics defaults to off until a privacy review is complete.

Allowed examples:

```text
screen=today
language=ru
has_reminder=true
participant_count=2
```

Forbidden examples:

```text
event_title
task_title
shopping_item_name
family_name
email
invite_token
```

### T4. Sensitive content in logs and crash reports

Risk: local errors, sync failures, validation errors, or crash reports expose
private content.

Mitigations:

- logs use IDs, action names, and error codes;
- logs do not include form values or mutation payload content;
- network errors redact request bodies and auth headers;
- crash reporting must be configured with PII scrubbing before release.

Contributor rule:

```text
Do not paste logs containing real family data into GitHub.
```

### T5. Offline queue leaks private payloads

Risk: pending mutations persist event/task/shopping content on device, survive
logout, or sync under the wrong family/user.

Mitigations:

- queue entries include `family_id`, actor ID, mutation type, and timestamps;
- queue flush verifies the current authenticated user is still an active member;
- logout clears or locks pending mutations;
- deletion uses `deleted_at` and avoids storing extra metadata;
- future persistence should document storage location and cleanup rules.

Backend gate:

```text
Do not enable persistent offline queue until logout, family switch, and failed
sync behavior are documented and tested.
```

### T6. Notification privacy on lock screen

Risk: reminders reveal sensitive event titles, locations, or household routines
on a lock screen.

Mitigations:

- notification details remain user-controlled;
- add a future setting to hide reminder details;
- notification tokens are never logged;
- notification payloads avoid comments, notes, and invite tokens.

Safe fallback copy:

```text
Doma
You have a reminder.
```

### T7. Realtime channel overexposure

Risk: a realtime subscription receives rows from another family or continues
after membership changes.

Mitigations:

- subscribe only to the current active family;
- RLS applies to realtime-enabled tables;
- unsubscribe on logout, family switch, or membership removal;
- refresh membership before enabling realtime after reconnect.

Backend gate:

```text
Do not enable realtime until family-scoped RLS policies are verified.
```

### T8. Public development artifacts expose private data

Risk: issues, pull requests, screenshots, fixtures, generated docs, or test
failures include real names, emails, schedules, medical context, school context,
invite links, or device identifiers.

Mitigations:

- use only public demo names and generic household examples;
- screenshots must use mock data;
- tests must use deterministic public fixtures;
- issue templates and review checklists remind contributors to avoid private
data;
- privacy scans should check for token patterns and known private exports.

## 6. Backend Security Gates

Milestone 6, Supabase foundation, may start when this document exists and is
reviewed.

Before backend-connected reads/writes:

1. SQL schema includes `family_id` on shared tables.
2. RLS policies exist for every shared table.
3. RLS denies cross-family access.
4. Client uses only the Supabase anon key.
5. No service role key is present in app code, docs examples, or env examples.
6. Invite handling includes expiry and revocation states.
7. Logs and analytics rules are documented.

Before auth/family flow:

1. Profile creation is tied to `auth.uid()`.
2. Family owner membership is created atomically with family creation.
3. Invite acceptance requires an authenticated user.
4. Accepted invites create active membership once only.
5. Child profiles cannot authenticate directly.

Before realtime sync:

1. Realtime channels are family-scoped.
2. Unsubscribe behavior exists for logout and family switch.
3. Membership changes revoke access.
4. RLS policies are verified for realtime-enabled tables.

Before notifications:

1. Notification permission is explicit.
2. Notification tokens are scoped to profile/device.
3. Sensitive payload fields are avoided by default.
4. A hidden-details mode is planned before production release.

Before analytics/crash reporting:

1. No private content in event properties.
2. PII scrubbing is configured.
3. Error reports redact request bodies and headers.
4. Analytics remains optional until privacy policy text exists.

## 7. Contributor Checklist

Before opening a PR, confirm:

- no real names, emails, schedules, medical details, school details, or private
  screenshots were added;
- no secrets, service role keys, access tokens, invite tokens, or auth headers
  were added;
- tests and fixtures use public demo data only;
- logs and errors avoid private content;
- new backend or sync work references RLS and family membership;
- new notification or analytics work updates this threat model if needed.

## 8. Review Cadence

Review this threat model when any of these change:

- Supabase schema or RLS policies;
- authentication and invite acceptance;
- realtime sync;
- persistent local storage;
- push notifications;
- analytics or crash reporting;
- native widgets;
- child profile behavior.

## 9. Current Decision

For the current public alpha, Doma remains local/mock only. Supabase foundation
may begin next, but application screens must not be connected to backend data
until the schema and RLS policies are reviewed against this threat model.

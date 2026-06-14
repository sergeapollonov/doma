# Doma — Analytics

## 1. Purpose

This document defines basic analytics events for Doma.

Analytics should help understand whether the app is useful, not track private family behavior in detail.

Doma contains sensitive household data. Analytics must be minimal and privacy-conscious.

## 2. Principles

Analytics should:

- avoid storing event/task/shopping item titles;
- avoid storing personal notes;
- avoid storing partner names;
- avoid storing exact family content;
- measure product usage and friction;
- be easy to disable later if needed.

Do not send:

```text
event title
task title
shopping item name
comments
notes
exact invite link
email
full name
```

## 3. MVP analytics provider

For MVP, analytics can be postponed.

If implemented, use a privacy-conscious setup.

Possible options later:

```text
PostHog
Firebase Analytics
Amplitude
Supabase custom events
```

Recommendation for first prototype:

```text
No external analytics until core MVP works.
Use local logs or Supabase activity_log for product debugging.
```

## 4. Core events

## App lifecycle

```text
app_opened
app_backgrounded
app_first_launch
```

Properties:

```json
{
  "platform": "ios",
  "language": "ru",
  "app_version": "0.1.0"
}
```

## Auth and onboarding

```text
welcome_viewed
login_started
login_completed
family_create_started
family_created
partner_invite_started
partner_invite_shared
partner_invite_skipped
invite_accepted
```

Allowed properties:

```json
{
  "method": "email",
  "language": "ru"
}
```

Do not include email.

## Events

```text
event_created
event_updated
event_deleted
event_completed_not_applicable
event_reminder_added
```

Allowed properties:

```json
{
  "has_reminder": true,
  "has_repeat": false,
  "participant_count": 2,
  "event_type": "appointment"
}
```

Do not include event title or description.

## Tasks

```text
task_created
task_updated
task_completed
task_deleted
task_reminder_added
```

Allowed properties:

```json
{
  "has_due_date": true,
  "has_reminder": true,
  "assignee_type": "self",
  "has_repeat": false
}
```

Do not include task title or comment.

## Shopping

```text
shopping_item_added
shopping_item_purchased
shopping_item_deleted
shopping_duplicate_detected
frequent_item_used
```

Allowed properties:

```json
{
  "category": "dairy",
  "has_quantity": true,
  "source": "quick_add"
}
```

Do not include shopping item title.

## Navigation

```text
tab_opened
screen_opened
```

Properties:

```json
{
  "screen": "today"
}
```

## Localization

```text
language_changed
```

Properties:

```json
{
  "from": "ru",
  "to": "pl"
}
```

## Notifications

```text
notification_permission_requested
notification_permission_granted
notification_permission_denied
reminder_scheduled
reminder_cancelled
notification_opened
```

Allowed properties:

```json
{
  "type": "event_reminder"
}
```

## Sync and offline

```text
offline_detected
sync_started
sync_completed
sync_failed
pending_mutation_created
pending_mutation_resolved
```

Allowed properties:

```json
{
  "mutation_type": "task.complete",
  "retry_count": 1
}
```

## 5. Event naming rules

Use:

```text
snake_case
past tense for completed actions
```

Examples:

```text
family_created
task_completed
shopping_item_purchased
```

Avoid:

```text
clickButton1
userDidThing
track_event_screen
```

## 6. Privacy rules

Never send:

- emails;
- names;
- family name;
- event titles;
- task titles;
- shopping item names;
- notes;
- comments;
- invite tokens;
- exact addresses;
- precise timestamps of private family activities unless needed.

Use derived properties instead:

```text
has_reminder
participant_count
category
source
screen
language
platform
```

## 7. Activity log vs analytics

Doma already has `activity_log` in the data model.

Difference:

### activity_log

Used inside the product:

- sync confidence;
- future activity feed;
- debugging family changes.

May include more specific references, but still should be careful.

### analytics

Used for product metrics:

- feature adoption;
- onboarding completion;
- errors;
- retention.

Should not include private content.

## 8. MVP recommendation

For first build:

```text
Do not integrate external analytics immediately.
Add a lightweight analytics wrapper with no-op implementation.
```

Example:

```ts
analytics.track('task_completed', {
  has_due_date: true,
  has_reminder: false,
});
```

Then later plug in a provider.

## 9. Analytics wrapper

Recommended file:

```text
/src/lib/analytics.ts
```

Example:

```ts
type AnalyticsEvent =
  | 'app_opened'
  | 'family_created'
  | 'partner_invite_shared'
  | 'event_created'
  | 'task_created'
  | 'task_completed'
  | 'shopping_item_added'
  | 'shopping_item_purchased'
  | 'language_changed'
  | 'sync_failed';

export function track(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  if (__DEV__) {
    console.log('[analytics]', event, properties);
  }

  // Later: send to provider
}
```

## 10. Codex task

Prompt:

```text
Create /src/lib/analytics.ts with a typed no-op analytics wrapper.

Add event types for:
- app_opened
- family_created
- partner_invite_shared
- event_created
- task_created
- task_completed
- shopping_item_added
- shopping_item_purchased
- language_changed
- sync_failed

Do not integrate any external analytics provider yet.
Do not send private content such as titles, notes, emails, names or invite tokens.
```

## 11. Acceptance criteria

- Analytics wrapper exists.
- Events are typed.
- No external provider is required.
- No private content is tracked.
- Development mode logs events to console.

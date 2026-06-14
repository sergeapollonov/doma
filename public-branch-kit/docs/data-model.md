# Doma — Data Model

## 1. Purpose

This document defines the core data model for the Doma MVP.

Doma is a shared family planning app for events, household tasks, shopping lists, reminders, and widgets. The first version is designed for two adults — Alex and Maya — with the ability to add a child profile later.

The data model must support shared family space, two adult users, future child profile, shared events, shared household tasks, shared shopping list, reminders, sync between iOS and Android, Russian and Polish localization, and offline-friendly client behavior.

## 2. Backend recommendation

Recommended backend for MVP: **Supabase**.

Reason: PostgreSQL database, Supabase Auth, Realtime subscriptions, Storage for avatars, and Row Level Security. Supabase is a better fit than Firebase for Doma because the app data is relational: families, members, events, event participants, tasks, shopping categories, shopping items, and reminders.

## 3. Entity overview

Core entities:

```text
auth.users
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

Future entities:

```text
child_permissions
recurring_rules
attachments
calendar_integrations
```

## 4. Naming conventions

Use snake_case for database columns, UUID primary keys, `created_at` and `updated_at` timestamps, and soft-delete where useful through `deleted_at`.

Recommended timestamp type:

```sql
timestamptz
```

Recommended ID type:

```sql
uuid
```

## 5. Profiles

Supabase Auth stores authentication user records in `auth.users`. App-specific user data should be stored in `profiles`.

### Table: profiles

```sql
profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  email text,
  avatar_url text,
  language text not null default 'ru',
  timezone text not null default 'Europe/Warsaw',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
)
```

Notes:

- `id` must match Supabase auth user ID.
- `language` supports `ru` and `pl`.
- `timezone` should default to the user device timezone if available.
- Avatar images can be stored in Supabase Storage.

## 6. Families

A family is the shared planning space.

### Table: families

```sql
families (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
)
```

Example:

```json
{
  "name": "Семья Алексея",
  "created_by": "profile_uuid"
}
```

## 7. Family members

Connects users or future child profiles to a family.

### Table: family_members

```sql
family_members (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  display_name text not null,
  avatar_url text,
  role text not null default 'adult',
  member_type text not null default 'adult',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
)
```

Role values:

```text
owner
adult
child
```

Member type values:

```text
adult
child_profile
```

Status values:

```text
active
invited
inactive
```

For Alex and Maya, `member_type = adult` and `user_id` points to profile. For a child profile later, `member_type = child_profile` and `user_id` can be null initially.

## 8. Family invites

Used to invite Maya or future family members.

### Table: family_invites

```sql
family_invites (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  invited_by uuid not null references profiles(id),
  invite_token text not null unique,
  invited_email text,
  role text not null default 'adult',
  status text not null default 'pending',
  expires_at timestamptz not null,
  accepted_by uuid references profiles(id),
  accepted_at timestamptz,
  created_at timestamptz not null default now()
)
```

Status values:

```text
pending
accepted
expired
revoked
```

Invitation links should include `invite_token`, not raw family IDs.

## 9. Events

Shared calendar events.

### Table: events

```sql
events (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  title text not null,
  description text,
  location text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  all_day boolean not null default false,
  visibility text not null default 'shared',
  event_type text not null default 'general',
  color_key text,
  repeat_rule text,
  created_by uuid not null references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
)
```

Visibility values:

```text
shared
private
```

Event type values:

```text
general
family
appointment
delivery
meal
school
other
```

Color key values:

```text
doma_blue
task_orange
shopping_green
family_sand
doma_gold
```

Events are shared by default. MVP can start without advanced recurrence; `repeat_rule` can later store RFC5545 RRULE strings.

## 10. Event participants

Participants of each event.

### Table: event_participants

```sql
event_participants (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  family_member_id uuid not null references family_members(id) on delete cascade,
  response_status text not null default 'accepted',
  created_at timestamptz not null default now()
)
```

Response status values:

```text
accepted
tentative
declined
none
```

## 11. Tasks

Household tasks without strict calendar dependency.

### Table: tasks

```sql
tasks (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  title text not null,
  description text,
  assignee_member_id uuid references family_members(id),
  is_shared boolean not null default true,
  due_at timestamptz,
  status text not null default 'active',
  priority text not null default 'normal',
  created_by uuid not null references profiles(id),
  updated_by uuid references profiles(id),
  completed_by uuid references profiles(id),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
)
```

Status values:

```text
active
completed
archived
```

Priority values:

```text
low
normal
high
```

If `assignee_member_id` is null and `is_shared = true`, treat as “Общее”. Completed tasks should not be hard deleted.

## 12. Shopping categories

Default shopping categories can be seeded per family or kept static in the app.

### Table: shopping_categories

```sql
shopping_categories (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references families(id) on delete cascade,
  name_ru text not null,
  name_pl text not null,
  icon_key text,
  color_key text,
  sort_order int not null default 0,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
)
```

Default categories:

```text
Молочное / Nabiał
Овощи и фрукты / Warzywa i owoce
Дом / Dom
Мясо и рыба / Mięso i ryby
Хлеб и выпечка / Chleb i wypieki
Другое / Inne
```

## 13. Shopping items

Shared shopping list items.

### Table: shopping_items

```sql
shopping_items (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  category_id uuid references shopping_categories(id),
  title text not null,
  quantity text,
  note text,
  status text not null default 'active',
  sort_order int not null default 0,
  created_by uuid not null references profiles(id),
  updated_by uuid references profiles(id),
  purchased_by uuid references profiles(id),
  purchased_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
)
```

Status values:

```text
active
purchased
archived
```

Examples:

```json
{
  "title": "Молоко",
  "quantity": "2 л",
  "category": "Молочное"
}
```

```json
{
  "title": "Помидоры",
  "quantity": "500 г",
  "category": "Овощи и фрукты"
}
```

## 14. Reminders

Universal reminders for events and tasks.

### Table: reminders

```sql
reminders (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  target_type text not null,
  target_id uuid not null,
  remind_at timestamptz not null,
  recipient_type text not null default 'participants',
  recipient_member_id uuid references family_members(id),
  status text not null default 'scheduled',
  created_by uuid not null references profiles(id),
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
)
```

Target type values:

```text
event
task
```

Recipient type values:

```text
me
partner
both
participants
specific_member
```

Status values:

```text
scheduled
sent
cancelled
failed
```

For MVP, local notifications are enough if sync is clear.

## 15. Notification settings

Per user per family.

### Table: notification_settings

```sql
notification_settings (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  event_reminders_enabled boolean not null default true,
  task_reminders_enabled boolean not null default true,
  shopping_updates_enabled boolean not null default false,
  partner_activity_enabled boolean not null default false,
  quiet_hours_enabled boolean not null default false,
  quiet_hours_start time,
  quiet_hours_end time,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (family_id, user_id)
)
```

## 16. Device tokens

Stores push notification tokens.

### Table: device_tokens

```sql
device_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  platform text not null,
  token text not null unique,
  device_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
)
```

Platform values:

```text
ios
android
web
```

## 17. Activity log

Useful for sync confidence and future activity feed.

### Table: activity_log

```sql
activity_log (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  actor_id uuid references profiles(id),
  action text not null,
  target_type text not null,
  target_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
)
```

Example actions:

```text
event.created
event.updated
task.completed
shopping_item.purchased
member.invited
member.joined
```

## 18. Row Level Security concept

RLS should enforce:

1. A user can read only families where they are an active member.
2. A user can read/write events for their families.
3. A user can read/write tasks for their families.
4. A user can read/write shopping items for their families.
5. A user cannot access another family’s data.
6. A child account later should have restricted write permissions.

Pseudo-policy concept:

```sql
exists (
  select 1
  from family_members fm
  where fm.family_id = target.family_id
    and fm.user_id = auth.uid()
    and fm.status = 'active'
)
```

## 19. Offline and sync behavior

Client should support optimistic UI:

- create locally first;
- mark item as `pending_sync`;
- sync when online;
- resolve conflicts using `updated_at`.

Recommended client-side extra fields, not necessarily stored in backend:

```ts
type SyncMeta = {
  pendingSync?: boolean;
  localOnly?: boolean;
  syncError?: string;
};
```

## 20. Conflict strategy for MVP

Simple strategy:

- latest `updated_at` wins;
- show sync error only when save fails;
- do not build complex conflict UI in MVP.

## 21. Seed data for demo

### Members

```text
Алексей
Мая
```

### Events

```text
Врач — 3 июня, 09:00 — Алексей и Мая
Забрать посылку — 3 июня, 14:30 — Алексей
Ужин с родителями — 3 июня, 19:00 — Алексей и Мая
```

### Tasks

```text
Позвонить мастеру — Алексей — сегодня 18:00
Оплатить интернет — Мая — сегодня
Купить подарок для Маи — Алексей — до 5 июня
Записать машину на сервис — Мая — без срока
Разобрать документы — общее
```

### Shopping items

```text
Молоко — 2 л — Молочное
Сыр — Молочное
Помидоры — 500 г — Овощи и фрукты
Огурцы — Овощи и фрукты
Бумажные полотенца — Дом
Средство для мытья посуды — Дом
Куриное филе — Мясо и рыба
```

## 22. TypeScript domain types

```ts
export type Language = 'ru' | 'pl';

export type MemberRole = 'owner' | 'adult' | 'child';
export type MemberType = 'adult' | 'child_profile';
export type MemberStatus = 'active' | 'invited' | 'inactive';

export type EventVisibility = 'shared' | 'private';
export type EventType =
  | 'general'
  | 'family'
  | 'appointment'
  | 'delivery'
  | 'meal'
  | 'school'
  | 'other';

export type TaskStatus = 'active' | 'completed' | 'archived';
export type TaskPriority = 'low' | 'normal' | 'high';

export type ShoppingItemStatus = 'active' | 'purchased' | 'archived';

export type ReminderTargetType = 'event' | 'task';
export type ReminderRecipientType =
  | 'me'
  | 'partner'
  | 'both'
  | 'participants'
  | 'specific_member';
```

## 23. Implementation priority

Implement in this order:

1. Profiles.
2. Families.
3. Family members.
4. Events.
5. Tasks.
6. Shopping items.
7. Reminders.
8. Notification settings.
9. Device tokens.
10. Activity log.

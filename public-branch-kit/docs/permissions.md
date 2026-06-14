# Doma — Permissions

## Purpose

This document defines roles, permissions, deletion rules, and future child access for Doma.

## MVP roles

### Owner

Default demo owner:

```text
Alex
```

Owner can:

- create family;
- invite adult members;
- remove invited members;
- edit family name;
- edit own profile;
- create, edit and delete shared events;
- create, edit and delete shared tasks;
- create, edit and delete shopping items;
- manage own notifications;
- delete family.

### Adult

Default demo adult:

```text
Maya
```

Adult can:

- view shared family data;
- create, edit and delete shared events;
- create, edit and delete shared tasks;
- create, edit and delete shopping items;
- mark tasks completed;
- mark shopping items purchased;
- edit own profile;
- manage own notifications;
- leave family.

Adult cannot by default:

- delete the whole family;
- remove the owner;
- change owner-level settings.

### Child profile

Future role. Initially this is not a login account.

Child profile can:

- appear as participant;
- appear as assignee;
- have name and avatar inside family.

Child profile cannot:

- log in;
- edit data;
- receive push notifications;
- access family data directly.

## Permission matrix

| Action | Owner | Adult | Child profile |
|---|---:|---:|---:|
| View shared family data | Yes | Yes | No direct login |
| Create event | Yes | Yes | No |
| Edit shared event | Yes | Yes | No |
| Delete shared event | Yes | Yes | No |
| Create task | Yes | Yes | No |
| Complete task | Yes | Yes | Future: own tasks only |
| Add shopping item | Yes | Yes | No |
| Mark item purchased | Yes | Yes | No |
| Invite member | Yes | Optional later | No |
| Remove adult member | Yes | No | No |
| Delete family | Yes | No | No |

## MVP decision

Doma is a trusted family app, not a corporate workspace.

```text
Alex = owner
Maya = adult
Owner and adult have equal access to shared events, tasks and shopping.
Only owner can delete family or remove adult members.
```

## Private events

Private events are not required for the first MVP.

Future option:

```text
visibility = shared | private
```

If implemented:

- shared events visible to all adults;
- private events visible only to creator;
- private events may later show as “Занято”.

## Deletion rules

Use soft delete for user-facing data:

```text
deleted_at
```

Applies to:

- events;
- tasks;
- shopping items;
- families;
- members where useful.

## Undo

After destructive action, show undo:

```text
Событие удалено · Отменить
Дело удалено · Отменить
Товар удалён · Отменить
```

Undo window:

```text
5–10 seconds
```

## Backend security

Supabase Row Level Security must enforce:

1. A user can access only families where they are an active member.
2. A user cannot access another family’s data.
3. Family member status must be `active`.
4. Child profile without `user_id` has no direct access.
5. Invite token must not expose raw family permissions.

Pseudo-policy:

```sql
exists (
  select 1
  from family_members fm
  where fm.family_id = target.family_id
    and fm.user_id = auth.uid()
    and fm.status = 'active'
)
```

# Doma — Offline and Sync

## Purpose

This document defines offline behavior, sync rules, conflict handling, and user-facing sync states.

Doma must remain useful without internet, especially for shopping and quick tasks.

## Offline-first principles

Users should be able to:

- view cached family data;
- add shopping items offline;
- mark shopping items purchased offline;
- add tasks offline;
- complete tasks offline;
- add events offline if possible;
- sync changes when online again.

## User-facing sync states

### Synced

```text
Всё синхронизировано
Обновлено только что
```

### Syncing

```text
Синхронизация...
```

### Offline

```text
Нет соединения
Изменения сохранятся и синхронизируются позже.
```

### Sync error

```text
Не удалось синхронизировать
Повторить
```

## Pending mutation queue

Recommended local shape:

```ts
type PendingMutation = {
  id: string;
  type:
    | 'event.create'
    | 'event.update'
    | 'event.delete'
    | 'task.create'
    | 'task.update'
    | 'task.complete'
    | 'task.delete'
    | 'shoppingItem.create'
    | 'shoppingItem.update'
    | 'shoppingItem.purchase'
    | 'shoppingItem.delete';
  payload: unknown;
  createdAt: string;
  retryCount: number;
  status: 'pending' | 'syncing' | 'failed';
};
```

## Optimistic UI

MVP should use optimistic UI:

```text
User action updates UI immediately
Mutation is queued/sent
If success → keep change
If failure → show sync error and allow retry
```

## Conflict strategy

MVP strategy:

```text
latest updated_at wins
```

This is acceptable for MVP, but not perfect.

## Conflict examples

### Same task edited by two people

```text
Alex changes task title offline.
Maya changes the same task online.
Alex reconnects.
```

MVP behavior:

```text
Last update wins based on updated_at.
```

### Same shopping item added twice

```text
Alex adds “Молоко” offline.
Maya adds “Молоко” online.
Alex reconnects.
```

MVP behavior:

```text
Both items may appear.
Duplicate handling can suggest merge later.
```

## Shopping duplicate handling

If user adds an active item with same normalized title:

```text
Молоко уже есть в списке
```

Actions:

```text
Обновить
Добавить ещё
```

Normalization:

- trim spaces;
- lowercase;
- ignore simple punctuation;
- compare within same family and active list.

Do not auto-merge without confirmation.

## Sync priority

On reconnect, sync in this order:

1. Family/profile changes.
2. Events.
3. Tasks.
4. Shopping items.
5. Reminders.
6. Activity log.

## Retry rules

Auto retry failed mutations up to 3 times.

Retry delays:

```text
1s
3s
10s
```

Manual retry:

```text
Повторить
```

## Offline deletion

Deletes should be soft deletes.

Behavior:

```text
hide item immediately
queue deleted_at update
show undo
sync when online
```

## Local storage

Cache:

- current user profile;
- current family ID;
- events;
- tasks;
- shopping items;
- pending mutations;
- language;
- last sync timestamp.

Recommended for MVP:

```text
AsyncStorage + TanStack Query persistence
```

SQLite can be added later if needed.

## Realtime sync

When online:

- subscribe to current family events;
- subscribe to tasks;
- subscribe to shopping items;
- update UI when partner changes data.

## MVP scope

Implement:

```text
cached display
optimistic local mutations
basic retry
sync status UI
latest updated_at wins
```

Do not implement:

```text
complex conflict resolution UI
manual merge screen
full offline invite acceptance
```

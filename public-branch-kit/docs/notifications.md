# Doma — Notifications and Reminders

## Purpose

This document defines notification and reminder behavior for Doma MVP.

Notifications must help the family remember important things without creating noise.

## Principles

Doma notifications should be:

- useful;
- calm;
- limited;
- user-controlled;
- personal where possible.

Do not notify users about every small action by default.

## Notification types

### Event reminder

Example:

```text
Врач через 30 минут
Сегодня в 09:00 · Алексей и Мая
```

Default:

```text
Enabled
```

### Task reminder

Example:

```text
Напоминание: Позвонить мастеру
Сегодня в 18:00
```

Default:

```text
Enabled
```

### Invite accepted

Example:

```text
Мая подключилась к Doma
Теперь вы видите общий план вместе.
```

Default:

```text
Enabled
```

### Partner completed task

Example:

```text
Мая выполнила: Оплатить интернет
```

Default:

```text
Disabled
```

### Partner purchased shopping item

Example:

```text
Алексей купил: молоко, хлеб
```

Default:

```text
Disabled
```

### Partner added data

Example:

```text
Мая добавила событие: Врач
```

Default:

```text
Disabled
```

## Reminder recipients

For events and tasks:

```text
Мне
Оле
Обоим
Участникам
```

Internal values:

```text
me
partner
both
participants
specific_member
```

Default for shared event:

```text
participants
```

Default for personal task:

```text
assignee
```

## Reminder timing

MVP options:

```text
Не напоминать
За 5 минут
За 15 минут
За 30 минут
За 1 час
За день
Настроить
```

Defaults:

```text
Event: За 30 минут
Task: Не напоминать
```

## Notification settings

Per user per family:

```text
event_reminders_enabled: true
task_reminders_enabled: true
shopping_updates_enabled: false
partner_activity_enabled: false
quiet_hours_enabled: false
quiet_hours_start: null
quiet_hours_end: null
```

## Quiet hours

Not required in first UI, but database fields should exist.

Future copy:

```text
Тихие часы
22:00 – 08:00
```

Rules:

- partner activity notifications should not appear during quiet hours;
- important explicit reminders may still appear if user chooses;
- daily summaries can wait until morning.

## Local vs push notifications

### MVP

Use local notifications first:

- event reminders;
- task reminders.

### Later

Use server push notifications for:

- invite accepted;
- partner actions;
- cross-device reminder sync;
- shared activity.

## Permission request timing

Do not ask for notification permission on first launch.

Recommended moment:

```text
After user creates first event or task with reminder.
```

Permission copy:

```text
Включить напоминания?

Doma будет напоминать о семейных событиях и важных делах.
```

Actions:

```text
Разрешить
Позже
```

## Tapping notification

| Notification | Opens |
|---|---|
| Event reminder | Event Details |
| Task reminder | Task Details |
| Invite accepted | Family / Today |
| Shopping update | Shopping |
| Task completed | Task Details or Tasks |

## Failure states

If permissions denied:

```text
Уведомления выключены
Включите их в настройках телефона, чтобы получать напоминания.
```

If scheduling fails:

```text
Не удалось создать напоминание
Проверьте настройки уведомлений.
```

## MVP decision

```text
Implement local event reminders.
Implement local task reminders.
Do not send notifications for every partner action.
Shopping and task activity notifications are off by default.
```

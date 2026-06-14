# Doma — Recurrence

## 1. Purpose

This document defines how repeating events and tasks should work in Doma.

Recurring items are important for a family app because many household activities repeat:

- rent payment;
- internet payment;
- child activities;
- cleaning;
- medicine;
- school events;
- shopping-related reminders;
- weekly family routines.

## 2. MVP decision

For the first MVP, support only simple recurrence presets.

Do not implement a complex custom recurrence builder in the first version.

## 3. Supported recurrence options in MVP

For events and tasks:

```text
Не повторять
Каждый день
Каждую неделю
Каждый месяц
Каждый год
```

Polish:

```text
Nie powtarzaj
Codziennie
Co tydzień
Co miesiąc
Co rok
```

Internal values:

```ts
export type RecurrencePreset =
  | 'none'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly';
```

## 4. Future recurrence options

Future versions may support:

```text
по будням
каждые выходные
каждые 2 недели
каждый понедельник и четверг
последний день месяца
кастомный повтор
до даты
N повторений
```

Internal future support can use RFC5545 RRULE.

Examples:

```text
FREQ=WEEKLY;BYDAY=MO,TH
FREQ=MONTHLY;BYMONTHDAY=1
FREQ=YEARLY;BYMONTH=6;BYMONTHDAY=3
```

## 5. Recurring events

### Example

```text
Тренировка ребёнка
Каждую неделю
Вторник, 18:00
```

### Data model

For MVP, store:

```text
repeat_rule
```

Recommended values:

```text
null
DAILY
WEEKLY
MONTHLY
YEARLY
```

Later these can be migrated to RRULE strings.

## 6. Recurring tasks

### Example

```text
Оплатить интернет
Каждый месяц
До 10 числа
```

### MVP behavior

Recurring task creates the next occurrence after completion.

Example:

```text
Task: Оплатить интернет
Repeat: monthly
Due: 10 June
Completed: 8 June
Next task appears: 10 July
```

## 7. Editing recurring items

This is where apps get complicated. MVP must keep it simple.

When editing a recurring event/task, show:

```text
Изменить только это
Изменить все будущие
```

MVP can support only:

```text
Изменить все будущие
```

and show a clear warning if needed.

Better future options:

```text
Only this occurrence
This and following
Entire series
```

## 8. Deleting recurring items

When deleting a recurring event/task, show:

```text
Удалить только это
Удалить все будущие
```

MVP can support:

```text
Удалить все будущие
```

or simply:

```text
Удалить повтор
```

## 9. Completion behavior for recurring tasks

When a recurring task is completed:

1. Mark current task as completed.
2. Create next task occurrence.
3. Keep the same assignee.
4. Keep the same reminder offset if configured.
5. Do not duplicate if next occurrence already exists.

## 10. Reminder behavior

For recurring items, reminder repeats with each occurrence.

Example:

```text
Оплатить аренду
Каждый месяц
Напомнить за день
```

The app should schedule reminder for each generated occurrence.

## 11. UI copy

### Event/task form

```text
Повтор
Не повторять
Каждый день
Каждую неделю
Каждый месяц
Каждый год
```

### Delete recurring item

```text
Это повторяющееся событие
Что удалить?
```

Actions:

```text
Только это
Все будущие
Отмена
```

## 12. MVP implementation recommendation

Start with a simple field:

```ts
repeatRule: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
```

For backend:

```text
repeat_rule text
```

In UI:

```text
Do not show advanced recurrence editor in MVP.
```

## 13. Codex task

Prompt:

```text
Implement simple recurrence support for events and tasks.

Supported presets:
- none
- daily
- weekly
- monthly
- yearly

Use the existing repeat_rule field.
Do not implement custom RRULE builder yet.
For recurring tasks, when a task is completed, create the next occurrence based on the preset.
Add localized labels in RU and PL.
```

## 14. Acceptance criteria

- New Event form shows recurrence options.
- New Task form shows recurrence options.
- Saved event/task stores repeat value.
- Recurring task creates next occurrence after completion.
- UI strings exist in RU and PL.
- No custom recurrence builder in MVP.

# Doma — User Flows

## 1. Flow overview

Core MVP flows:

1. First launch and onboarding.
2. Create family.
3. Invite partner.
4. View Today dashboard.
5. Add event.
6. View calendar.
7. Add task.
8. Complete task.
9. Add shopping item.
10. Mark shopping item purchased.
11. Manage reminders.
12. Add child profile in the future.
13. Change language.
14. Use widget.

## 2. First launch flow

### Goal

Introduce Doma and guide user to create or join a family plan.

### Steps

```text
Open app
→ Onboarding screen 1
→ Onboarding screen 2
→ Onboarding screen 3
→ Choose:
   → Create family
   → Join with invitation
```

### Main actions

- Create family.
- Use invitation link.

### Success state

User reaches Today screen.

## 3. Create family flow

### Goal

Create the shared family space.

### Steps

```text
Tap “Создать семью”
→ Enter family name
→ Enter user name
→ Add profile photo optionally
→ Tap “Создать Doma”
→ Family space is created
→ Prompt to invite partner
```

### Default data

```text
Family name: Семья Алексея
User name: Алексей
```

### Success state

Family created and user can invite Maya.

## 4. Invite partner flow

### Goal

Connect Maya to the shared family plan.

### Steps

```text
Open Invite Partner screen
→ Tap “Поделиться ссылкой”
→ Send invitation link to Maya
→ Maya opens link
→ Maya installs/opens app
→ Maya joins family
→ Alex sees “Мая подключилась”
```

### Success state

Both users are visible in the family plan:

```text
Алексей
Мая
```

### Sync confirmation

```text
Всё синхронизировано
```

## 5. Today dashboard flow

### Goal

Give immediate understanding of the family day.

### Steps

```text
Open Doma
→ Land on Today screen
→ View sync status
→ View upcoming events
→ View tasks
→ View shopping summary
→ Tap any section to see details
```

### Possible actions

- Tap event → Event Details.
- Tap “Смотреть все” in Upcoming → Calendar.
- Tap task checkbox → Complete task.
- Tap “Смотреть все” in Tasks → Tasks screen.
- Tap Shopping summary → Shopping screen.
- Tap + → Add bottom sheet.

## 6. Add from global plus flow

### Goal

Let user quickly add any main object.

### Steps

```text
Tap +
→ Bottom sheet appears
→ Choose:
   → Событие
   → Дело
   → Покупку
   → Напоминание
```

### Rules

- Bottom sheet should be short.
- Each option should have icon and label.
- Cancel by swipe down or tapping outside.

## 7. Add event flow

### Goal

Create a shared family event.

### Steps

```text
Tap +
→ Select “Событие”
→ New Event screen opens
→ Enter title
→ Select date
→ Select time
→ Confirm participants
→ Select reminder
→ Tap “Сохранить”
→ Event appears on Today and Calendar
→ Partner sees synced event
```

### Defaults

```text
Participants: Alex + Maya
Visibility: Shared
Reminder: 30 minutes before
Repeat: Never
```

### Example

```text
Title: Врач
Date: 3 июня
Time: 09:00
Participants: Алексей и Мая
Reminder: За 30 минут
```

### Success state

```text
Событие добавлено
```

### Error state

```text
Не удалось сохранить событие
Повторить
```

## 8. View calendar flow

### Goal

See month overview and selected day plan.

### Steps

```text
Tap “Календарь”
→ Calendar screen opens
→ Current month is shown
→ Selected day is today
→ Event dots appear under dates
→ User taps another day
→ Event list updates
```

### Possible actions

- Tap date → select date.
- Tap event card → Event Details.
- Tap + → New Event.
- Swipe month or tap arrows → change month.

## 9. Add task flow

### Goal

Create household task.

### Steps

```text
Tap +
→ Select “Дело”
→ New Task screen opens
→ Enter task title
→ Choose assignee
→ Optional due date
→ Optional reminder
→ Tap “Сохранить”
→ Task appears on Today/Tasks
```

### Example

```text
Title: Позвонить мастеру
Assignee: Алексей
Due date: Без срока
Reminder: Не напоминать
```

### Success state

```text
Дело добавлено
```

## 10. Complete task flow

### Goal

Mark household task as completed.

### Steps

```text
Open Today or Tasks
→ Tap circular checkbox
→ Task becomes completed
→ Text is muted/struck through
→ Task moves to completed or stays briefly
→ Undo is available
```

### Optional notification

If enabled:

```text
Алексей выполнил: Позвонить мастеру
```

### Undo

```text
Дело выполнено
Отменить
```

## 11. Add shopping item flow

### Goal

Add shopping item quickly.

### Steps

```text
Open Shopping
→ Tap “+ Добавить товар”
→ Type item
→ Tap Add / press Enter
→ Item appears in relevant category
```

### Example

```text
Молоко 2 л
```

### Smart behavior

The app may infer:

```text
Item: Молоко
Quantity: 2 л
Category: Молочное
```

### Alternative flow

```text
Tap frequent chip “Молоко”
→ Item instantly added to list
```

## 12. Mark shopping item purchased flow

### Goal

Use shopping list in store.

### Steps

```text
Open Shopping
→ Tap checkbox next to item
→ Item is marked purchased
→ Item moves down or becomes hidden
→ Undo is available
```

### Optional partner notification

If enabled:

```text
Мая купила: молоко, хлеб
```

### Undo

```text
Товар отмечен как купленный
Отменить
```

## 13. Reminder flow

### Goal

Set reminders for events and tasks.

### Reminder recipients

```text
Мне
Оле
Обоим
```

### Reminder timing

```text
За 5 минут
За 15 минут
За 30 минут
За 1 час
За день
Настроить
```

### Event reminder flow

```text
New Event
→ Tap “Напомнить”
→ Choose timing
→ Choose recipient
→ Save
```

### Task reminder flow

```text
New Task
→ Tap “Напомнить”
→ Choose timing
→ Choose recipient
→ Save
```

## 14. Offline sync flow

### Goal

Allow use without internet and sync later.

### Steps

```text
User loses internet
→ App shows offline sync state
→ User adds task/event/shopping item
→ App stores change locally
→ Internet returns
→ App syncs changes
→ User sees success state
```

### Offline state

```text
Нет соединения
Изменения сохранятся и синхронизируются позже.
```

### Sync success

```text
Всё синхронизировано
Обновлено только что
```

## 15. Add child profile flow — future

### Goal

Prepare family structure for child without forcing full account.

### Steps

```text
Open Family
→ Tap “Добавить ребёнка”
→ Enter child name
→ Choose avatar
→ Save
→ Child appears as family profile
```

### Initial child profile

```text
No separate login
Can be assigned child-related tasks/events
Visible to parents
```

### Future child account

```text
Create child access
Limited permissions
Parent controls
```

## 16. Change language flow

### Goal

Switch app language between Russian and Polish.

### Steps

```text
Open Family/Settings
→ Tap Language
→ Choose Русский or Polski
→ App updates interface language
```

### Rules

- Language switch should not change user data.
- User names remain unchanged unless user edits them.
- Dates should localize.

## 17. Widget flow

### Goal

Let user see family day without opening app.

### Medium widget default

```text
Doma

Сегодня

09:00 Врач
14:30 Посылка
19:00 Ужин

2 дела · 6 покупок
```

### Tap behavior

- Tap event → opens Event Details.
- Tap widget body → opens Today.
- Tap tasks line → opens Tasks.
- Tap shopping line → opens Shopping.

## 18. Error handling flows

### Failed save

```text
Не удалось сохранить
Повторить
```

### Failed sync

```text
Не удалось синхронизировать
Повторить
```

### Deleted item undo

```text
Удалено
Отменить
```

### Permission denied

```text
Нет доступа
Попросите участника семьи изменить настройки.
```

## 19. Core flow map

```text
Onboarding
→ Create Family
→ Invite Partner
→ Today
   → Calendar
      → Event Details
      → New Event
   → Tasks
      → New Task
      → Complete Task
   → Shopping
      → New Shopping Item
      → Mark Purchased
   → Family
      → Members
      → Language
      → Notifications
      → Child Profile
```

## 20. MVP acceptance criteria

The MVP should support these successful scenarios:

1. Alex creates a family.
2. Alex invites Maya.
3. Maya joins the family.
4. Alex adds an event.
5. Maya sees the event.
6. Maya adds a shopping item.
7. Alex sees the item.
8. Alex marks it as purchased.
9. Maya sees the updated list.
10. Alex adds a task.
11. Maya or Alex marks the task done.
12. Both users see sync status.
13. User receives a reminder.
14. Widget shows today’s key information.

# Auth / First Launch User Flows

## 1. New family owner flow

### Goal

Alex creates a family space and invites Maya.

### Steps

```text
Open app
→ Welcome screen
→ Tap “Создать семью”
→ Login / Registration
→ Enter email
→ Continue
→ Confirm login
→ Create Family screen
→ Enter family name
→ Enter own name
→ Optional photo
→ Tap “Создать Doma”
→ Invite Maya screen
→ Share invite link or skip
→ Today screen
```

### Success state

```text
Family created
Alex is owner
Today screen opens
```

## 2. Login / registration flow

### Goal

Let user continue using email with minimal friction.

### Steps

```text
Open Login screen
→ Enter email
→ Tap “Продолжить”
→ Receive magic link / authenticate
→ Continue to next step
```

### Development shortcut

During early development, email/password auth may be used instead of magic link if it speeds up implementation.

### Error states

```text
Invalid email
Login failed
Network error
```

## 3. Create family flow

### Goal

Create shared Doma space.

### Steps

```text
Open Create Family
→ Fill “Название семьи”
→ Fill “Ваше имя”
→ Optional profile photo
→ Tap “Создать Doma”
→ Create family record
→ Create owner family_member record
→ Navigate to Invite Maya
```

### Default values for demo

```text
Название семьи: Семья Алексея
Ваше имя: Алексей
```

## 4. Invite Maya flow

### Goal

Connect Maya to the family plan.

### Steps

```text
Open Invite Maya
→ Tap “Поделиться ссылкой”
→ System share sheet opens
→ Alex sends link to Maya
→ Maya opens link
→ Maya logs in
→ Maya accepts invite
→ Maya becomes active family member
→ Alex sees Maya connected
```

### Skip path

```text
Open Invite Maya
→ Tap “Сделать позже”
→ Today screen opens
```

## 5. Invited partner flow

### Goal

Maya joins Alex’s Doma family.

### Steps

```text
Maya opens invite link
→ Doma opens
→ Welcome / Accept Invite context
→ Login / Registration
→ Accept Invite screen
→ Tap “Присоединиться”
→ Family member is created or activated
→ Today screen opens
```

### Success state

```text
Готово

Теперь вы с Алексеем видите общий план вместе.
```

## 6. Invite error states

### Expired invite

```text
Ссылка приглашения истекла
Попросите отправить новое приглашение.
```

### Revoked invite

```text
Это приглашение больше недоступно
```

### Already accepted

```text
Вы уже подключены к этой семье
```

## 7. Auth-to-main transition

After a successful auth flow, route user based on state:

```text
No profile → create profile
Profile but no family → Create Family
Family exists and active member → Today
Invite token present → Accept Invite
```

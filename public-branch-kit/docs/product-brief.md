# Doma — Product Brief

## 1. Product name

**Doma**

## 2. Tagline

**RU:** Doma — общий план вашей семьи.  
**PL:** Doma — wspólny plan rodziny.

## 3. Product idea

Doma is a shared family life management app for a couple, with the ability to later add a child profile. It is not positioned as “just another calendar”. It is a calm family command center for everyday life: shared events, household tasks, shopping lists, reminders, and widgets.

The product should answer one simple question:

> What is happening at home today, what needs to be done, and what should not be forgotten?

## 4. Target users

Primary users for MVP:

- Alex — Android user.
- Maya — iPhone user.
- Family couple using one shared plan.

Future users:

- Child profile, initially without separate login.
- Later: limited child account with controlled access.

## 5. Core value proposition

Doma gives a family one shared view of everyday life:

- shared calendar;
- shared tasks;
- shared shopping list;
- reminders for one or both partners;
- quick visibility via home screen widgets;
- bilingual interface: Russian and Polish.

The product should feel simpler and more personal than Google Calendar, Apple Calendar, Notion, Todoist, or Trello.

## 6. Positioning

Doma is not a productivity app for work.  
Doma is not a complex family ERP.  
Doma is not a corporate task manager.

Doma is:

- calm;
- premium;
- minimal;
- warm;
- family-oriented;
- iOS-first;
- easy to use in 5–10 seconds.

## 7. MVP scope

The first version should include:

1. Onboarding.
2. Family creation.
3. Partner invitation.
4. Shared Today screen.
5. Shared calendar.
6. Event creation.
7. Shared household tasks.
8. Task creation.
9. Shared shopping list.
10. Shopping item creation.
11. Reminders.
12. Sync status.
13. Russian and Polish interface.
14. iOS-first UI.
15. Android adaptation with minimal visual changes.
16. Medium home screen widget.

## 8. Main navigation

Primary bottom navigation:

**RU:**

- Сегодня
- Календарь
- Дела
- Покупки

**PL:**

- Dzisiaj
- Kalendarz
- Sprawy
- Zakupy

The app should avoid a fifth tab. Family settings should be accessible through avatar group or profile/menu area, not from the bottom tab bar.

## 9. Product principles

### 9.1. Today first

The main screen is Today, not Calendar.  
The user should instantly understand the day’s family plan.

### 9.2. Fast adding

Adding a shopping item, task, or event should be quick.  
Shopping items and tasks should be addable in a few seconds.

### 9.3. Shared by default

Events and tasks should be shared by default. Personal visibility is an advanced option.

### 9.4. Human language

The interface should use natural household language, not corporate task-management terms.

Good:

- Дела
- Покупки
- Всё синхронизировано
- Что добавить?

Avoid:

- Workspace
- Entity
- Assigned executor
- Task pipeline
- Status in progress

### 9.5. Controlled notifications

Notifications should be useful, not noisy.  
Users should be able to choose whether reminders go to Alex, Maya, or both.

## 10. Languages

MVP languages:

- Russian
- Polish

Core terminology:

| RU | PL |
|---|---|
| Сегодня | Dzisiaj |
| Календарь | Kalendarz |
| Дела | Sprawy |
| Покупки | Zakupy |
| Сохранить | Zapisz |
| Добавить | Dodaj |
| Отмена | Anuluj |
| Смотреть все | Zobacz wszystko |
| Всё синхронизировано | Wszystko zsynchronizowane |
| Нет соединения | Brak połączenia |
| Выполнено | Zrobione |
| Общее | Wspólne |
| Мои | Moje |
| Алексей | Alex |
| Мая | Maja |
| Алексей и Мая | Alex i Maja |

## 11. User roles

### Adult user

Can:

- add/edit/delete events;
- add/edit/delete tasks;
- add/edit/delete shopping items;
- mark tasks/items completed;
- invite partner;
- manage reminders;
- manage family settings.

### Partner

Same rights as primary adult user.

### Child profile — future

Initial version:

- profile only;
- no separate login;
- can be assigned events/tasks indirectly.

Future version:

- limited account;
- restricted editing;
- child-specific tasks;
- parental controls.

## 12. Key differentiator

The main differentiator is the “family command center” model:

- not just dates;
- not just tasks;
- not just shopping;
- one calm place for everyday shared life.

## 13. Recommended tech direction

Recommended implementation direction:

- React Native / Expo for cross-platform iOS + Android.
- iOS-first visual design.
- Shared design tokens.
- Local storage for offline support.
- Cloud sync.
- Push notifications.
- Widget support: iOS WidgetKit + Android widgets.
- Localization files for RU and PL.

## 14. Risks

### Risk 1: Becoming too complex

Avoid turning Doma into Notion/Trello for family.

### Risk 2: Too many notifications

Family apps can become annoying if every action sends a push.

### Risk 3: Calendar competition

The app should not compete with Google/Apple Calendar feature-by-feature. It should win with family context and simplicity.

### Risk 4: Overusing glassmorphism

Glass effect should be subtle. Too much glass will make the UI look cheap and hard to read.

## 15. Success criteria for MVP

Doma MVP succeeds if users can:

- create a family;
- invite a partner;
- see today’s shared plan;
- add an event in under 10 seconds;
- add a task in under 5 seconds;
- add a shopping item in under 3 seconds;
- see changes synced on both devices;
- receive reminders;
- use a widget to view today’s plan.

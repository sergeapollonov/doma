# Doma — Screens Specification

## 1. Screen list for MVP

Primary MVP screens:

1. Onboarding
2. Create Family
3. Invite Partner
4. Today
5. Calendar
6. Event Details
7. New Event
8. Tasks
9. New Task
10. Shopping
11. New Shopping Item
12. Family / Members
13. Settings
14. Widget — Small
15. Widget — Medium
16. Widget — Large

## 2. Global navigation

Bottom tab bar:

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

Global plus button:

- On main screens, `+` opens a bottom sheet:
  - Событие
  - Дело
  - Покупку
  - Напоминание

## 3. Onboarding

### Purpose

Explain Doma quickly and guide the user to create a family or join with invitation.

### Screen 1

Title:

```text
Doma
```

Subtitle:

```text
Общий план вашей семьи
```

Description:

```text
События, дела и покупки в одном спокойном месте.
```

CTA:

```text
Начать
```

### Screen 2

Title:

```text
Планируйте вместе
```

Description:

```text
Пригласите партнёра и синхронизируйте всё, что важно дома.
```

### Screen 3

Title:

```text
Начните с сегодняшнего дня
```

Description:

```text
Добавьте первое событие, дело или покупку.
```

Actions:

```text
Создать семью
У меня есть приглашение
```

## 4. Create Family

### Purpose

Create the shared family space.

### Fields

```text
Название семьи
Ваше имя
Добавить фото
```

Example:

```text
Название семьи: Семья Алексея
Ваше имя: Алексей
```

CTA:

```text
Создать Doma
```

### Notes

Avoid the word “workspace”. Use “семья”, “общий план”, or “Doma”.

## 5. Invite Partner

### Purpose

Invite Maya to the shared plan.

### Content

Title:

```text
Пригласите Маю
```

Description:

```text
Отправьте ссылку, чтобы подключить общий план.
```

Actions:

```text
Поделиться ссылкой
Позже
```

Success state:

```text
Мая подключилась
Теперь вы видите общий план вместе.
```

## 6. Today Screen

### Purpose

The central family dashboard.

The user should understand in three seconds:

- what is planned today;
- what needs to be done;
- what needs to be bought;
- whether the app is synced with Maya.

### Header

```text
Doma
Доброе утро, Алексей
Сегодня, 3 июня
```

Right side:

- notification bell;
- optional plus button.

### Family sync block

Content:

```text
[Avatar Alex] Алексей
[Avatar Maya] Мая

Всё синхронизировано
Обновлено 1 мин назад
```

Offline state:

```text
Нет соединения
Изменения сохранятся позже
```

### Section: Upcoming

Header:

```text
Ближайшее       Смотреть все
```

Show maximum 3 events.

Example rows:

```text
09:00  Врач
       Алексей и Мая

14:30  Забрать посылку
       Алексей

19:00  Ужин с родителями
       Алексей и Мая
```

Tapping a row opens Event Details.

### Section: Tasks

Header:

```text
Дела       Смотреть все
```

Show 2–3 tasks.

Example:

```text
○ Позвонить мастеру
  Алексей

○ Оплатить интернет
  Мая
```

Interaction:

- tap checkbox: mark complete;
- tap row: open task details;
- swipe left: delete or postpone;
- undo after destructive action.

### Section: Shopping

Header:

```text
Покупки       Смотреть все
```

Example:

```text
Молоко, хлеб, яйца
+ ещё 4 товара
```

Tap opens Shopping.

### Bottom tab

Active tab:

```text
Сегодня
```

## 7. Calendar Screen

### Purpose

Monthly overview and selected day plan.

### Header

```text
Doma
Календарь
+
```

### Month navigation

```text
<  Июнь 2026  >
```

### Calendar grid

Week starts on Monday.

Selected day:

```text
3
```

Selected day style:

- Doma Blue circular background;
- white text.

Event dots:

- blue: events;
- orange: tasks;
- green: shopping;
- sand: family.

### Selected day list

Header:

```text
3 июня, среда
```

Example cards:

```text
09:00
Врач
Алексей и Мая

14:30
Забрать посылку
Алексей

19:00
Ужин с родителями
Алексей и Мая
```

Each card includes:

- colored time block;
- icon;
- title;
- avatars;
- participants;
- chevron.

### Bottom tab

Active tab:

```text
Календарь
```

## 8. Event Details

### Purpose

View event details and allow editing/deleting.

### Content

```text
Врач

Дата: 3 июня
Время: 09:00
Участники: Алексей и Мая
Напомнить: За 30 минут
Повтор: Не повторять
Комментарий: —
```

Actions:

```text
Редактировать
Удалить
```

## 9. New Event

### Purpose

Quickly create a family event.

### Header

```text
Отмена     Новое событие     Сохранить
```

or use bottom save button in warm gold style.

### Fields

```text
Название
Дата
Время
Участники
Напомнить
Повтор
Комментарий
```

Example:

```text
Название: Врач
Дата: 3 июня
Время: 09:00
Участники: Алексей и Мая
Напомнить: За 30 минут
Повтор: Не повторять
Комментарий: Добавить комментарий
```

### Defaults

```text
Участники: Алексей и Мая
Видимость: Общее
Напомнить: За 30 минут
Повтор: Не повторять
```

### Advanced fields hidden under “Ещё”

```text
Место
Ссылка
Цвет
Личное событие
```

## 10. Tasks Screen

### Purpose

Household tasks without strict calendar dependency.

### Header

```text
Дела      +
```

### Filters

```text
Все | Мои | Общие | Выполнено
```

### Task rows

Examples:

```text
○ Позвонить мастеру
  Алексей

○ Купить подарок для Маи
  Алексей

○ Записать машину на сервис
  Мая

✓ Оплатить интернет
  Алексей
```

### Row elements

- checkbox;
- title;
- assignee avatar;
- assignee name;
- optional due date;
- optional reminder icon.

### States

Default:

```text
○ Название
```

Completed:

```text
✓ Название
```

Completed style:

- strikethrough;
- tertiary text;
- checked icon.

Overdue:

- small red marker;
- due date in Danger Red.

With reminder:

- bell icon.

Shared:

- family/group icon or both avatars.

### Bottom tab

Active tab:

```text
Дела
```

## 11. New Task

### Purpose

Create a household task.

### Fields

```text
Название
Ответственный
Срок
Напомнить
Комментарий
```

Example:

```text
Название: Позвонить мастеру
Ответственный: Алексей
Срок: Без срока
Напомнить: Не напоминать
Комментарий: Добавить заметку
```

### Assignee bottom sheet

```text
Кому назначить?

Алексей
Мая
Общее
```

Future option:

```text
Дочь
```

## 12. Shopping Screen

### Purpose

Fast shared shopping list for use in store.

### Header

```text
Покупки      +
```

### Add field

```text
+ Добавить товар
```

Alternative:

```text
Найти или добавить товар
```

### Frequently bought

```text
Часто покупаем

Молоко
Хлеб
Яйца
Бананы
Кофе
```

Tap on chip adds item to list.

### Categories

```text
Молочное
□ Молоко
□ Сыр

Овощи
□ Помидоры
□ Огурцы

Дом
□ Бумажные полотенца
```

### Interaction

- tap checkbox: mark purchased;
- purchased items move down or hide;
- undo after purchase;
- one shared list for Alex and Maya;
- optional notification when partner bought items.

### Bottom tab

Active tab:

```text
Покупки
```

## 13. New Shopping Item

### Purpose

Add an item as fast as possible.

### Minimal input

```text
Молоко 2 л
```

CTA:

```text
Добавить
```

### Expanded fields

```text
Название
Количество
Категория
Комментарий
```

Example:

```text
Название: Молоко
Количество: 2 л
Категория: Молочное
Комментарий: Без лактозы
```

## 14. Family / Members

### Purpose

Manage family members and future child profile.

### Access

Open by tapping avatar group on Today screen.

### Content

```text
Семья

Алексей
Мая

+ Добавить ребёнка

Пригласить участника
Язык приложения
Уведомления
Виджеты
Синхронизация
```

### Child profile

Initial version:

```text
Добавить профиль ребёнка
Без отдельного входа
```

Future version:

```text
Создать детский доступ
```

## 15. Settings

### Sections

```text
Профиль
Семья
Язык
Уведомления
Виджеты
Синхронизация
Тема
Безопасность
```

### Language setting

Options:

```text
Русский
Polski
```

## 16. Widgets

### Small widget

```text
Doma

19:00
Ужин
```

### Medium widget

```text
Doma

Сегодня

09:00 Врач
14:30 Посылка
19:00 Ужин

2 дела · 6 покупок
```

### Large widget

```text
Сегодня

09:00 Врач
14:30 Посылка

Дела
○ Позвонить мастеру
○ Оплатить интернет

Покупки
Молоко, хлеб +5
```

## 17. Key empty states

### Today empty

```text
Сегодня ничего не запланировано
Добавьте первое событие, дело или покупку.
```

### Tasks empty

```text
Пока нет дел
Добавьте первое дело для себя или семьи.
```

### Shopping empty

```text
Список покупок пуст
Добавьте то, что нужно купить.
```

### Calendar selected day empty

```text
На этот день ничего нет
Добавить событие
```

# Auth / First Launch Screens

## 1. Overview

This section defines the screens shown before the user reaches the main Doma app.

There are two core first-launch paths.

### New family owner path

```text
Welcome
→ Login / Registration
→ Create Family
→ Invite Partner
→ Today
```

### Invited partner path

```text
Welcome
→ I have an invitation
→ Login / Registration
→ Accept Invite
→ Today
```

## 2. Welcome Screen

### Purpose

Explain Doma in under three seconds.

Doma is not just a calendar. It is a shared family plan for events, household tasks, shopping, and reminders.

### Main content

```text
Doma

Общий план вашей семьи

События, дела и покупки —
в одном спокойном месте.
```

### Primary action

```text
Создать семью
```

### Secondary action

```text
У меня есть приглашение
```

### Legal text

```text
Продолжая, вы соглашаетесь
с условиями использования и политикой конфиденциальности.
```

### Visual structure

The screen should include:

- Doma logo;
- warm premium background;
- short value proposition;
- glass preview card showing:
  - Today event;
  - one task;
  - shopping summary;
- gold primary button;
- outlined secondary button.

### Preview card example

```text
Сегодня

09:00 Врач
○ Позвонить мастеру
Молоко, хлеб, яйца
```

## 3. Login / Registration Screen

### Purpose

Let the user enter Doma with minimal friction.

Do not split into old-fashioned separate “Login” and “Register” screens. Use one continuation screen.

### Title

```text
Войти в Doma
```

### Description

```text
Введите email, чтобы продолжить.
Мы отправим ссылку для входа.
```

### Input

```text
Email
sergey@example.com
```

### Primary action

```text
Продолжить
```

### Optional social actions

```text
Войти через Apple
Войти через Google
```

### Helper text

```text
Мы используем email только для входа
и синхронизации вашего семейного плана.
```

### Legal text

```text
Продолжая, вы соглашаетесь
с условиями использования и политикой конфиденциальности.
```

### MVP recommendation

For product UX:

```text
Email + magic link
```

For early development:

```text
Email + password can be used temporarily if it speeds up implementation.
```

## 4. Create Family Screen

### Purpose

Create the shared Doma family space.

### Title

```text
Создайте вашу семью
```

### Description

```text
Так Doma поймёт, чей общий план
нужно синхронизировать.
```

### Fields

```text
Название семьи
Семья Алексея

Ваше имя
Алексей
```

### Profile photo block

```text
Фото профиля
Добавить фото
```

### Primary action

```text
Создать Doma
```

### Legal text

```text
Продолжая, вы соглашаетесь
с условиями использования и политикой конфиденциальности.
```

### UX rules

Use:

```text
семья
общий план
Doma
```

Avoid:

```text
workspace
organization
team
команда
организация
рабочее пространство
```

## 5. Invite Maya Screen

### Purpose

Invite Maya to the shared family plan after Alex creates the family.

### Title

```text
Пригласите Маю
```

### Description

```text
Отправьте ссылку, чтобы подключить общий план.
После подключения вы оба будете видеть события, дела и покупки.
```

### Primary action

```text
Поделиться ссылкой
```

### Secondary action

```text
Сделать позже
```

### Success state

```text
Мая подключилась

Теперь вы видите общий план вместе.
```

### Success action

```text
Открыть Doma
```

### Notes

If partner name is not known yet, use:

```text
Пригласите партнёра
```

For the demo and current project context, use:

```text
Мая
```

## 6. Accept Invite Screen

### Purpose

Allow Maya to join Alex’s family plan from an invite link.

### Title

```text
Вас пригласили в Doma
```

### Description

```text
Алексей приглашает вас в общий план семьи.
```

### Primary action

```text
Присоединиться
```

### Secondary action

```text
Войти другим аккаунтом
```

### Success state

```text
Готово

Теперь вы с Алексеем видите общий план вместе.
```

### Success action

```text
Открыть Doma
```

## 7. Auth empty/error states

### Invalid email

```text
Введите корректный email
```

### Magic link sent

```text
Ссылка отправлена

Проверьте почту и откройте ссылку для входа.
```

### Login failed

```text
Не удалось войти
Попробуйте ещё раз.
```

### Invite expired

```text
Ссылка приглашения истекла

Попросите отправить новое приглашение.
```

### Invite already accepted

```text
Вы уже подключены к этой семье
```

## 8. Auth navigation map

```text
Welcome
 ├── Создать семью
 │    └── Login / Registration
 │         └── Create Family
 │              └── Invite Maya
 │                   └── Today
 │
 └── У меня есть приглашение
      └── Login / Registration
           └── Accept Invite
                └── Today
```

## 9. Auth design rules

- Use the same warm Doma visual style.
- Use one main action per screen.
- Keep forms short.
- Do not use corporate language.
- Keep the tone calm and human.
- Maintain iOS-first spacing, rounded cards, soft glass, and gold primary CTA.

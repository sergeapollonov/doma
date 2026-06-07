# Doma — Empty, Loading and Error States

## Purpose

This document defines empty states, loading states, errors, validation messages, and undo messages.

These states are part of the product experience.

## Tone

Doma should sound:

- calm;
- human;
- short;
- helpful.

Avoid:

```text
Fatal error
Operation failed
Entity not found
```

Use:

```text
Не удалось сохранить
Попробуйте ещё раз
```

## Empty states

### Today empty

Title:

```text
Сегодня спокойно
```

Description:

```text
На сегодня пока нет событий, дел или покупок.
```

Action:

```text
Добавить первое
```

### Calendar day empty

Title:

```text
На этот день ничего нет
```

Description:

```text
Добавьте событие, чтобы оно появилось в общем плане.
```

Action:

```text
Добавить событие
```

### Tasks empty

Title:

```text
Пока нет дел
```

Description:

```text
Добавьте первое дело для себя или семьи.
```

Action:

```text
Добавить дело
```

### Shopping empty

Title:

```text
Список покупок пуст
```

Description:

```text
Добавьте то, что нужно купить.
```

Action:

```text
Добавить товар
```

### Partner not connected

Title:

```text
Мая ещё не подключилась
```

Description:

```text
Отправьте приглашение, чтобы планировать вместе.
```

Action:

```text
Пригласить Маю
```

Secondary:

```text
Позже
```

### Notifications disabled

Title:

```text
Уведомления выключены
```

Description:

```text
Включите уведомления, чтобы получать напоминания о событиях и делах.
```

Action:

```text
Открыть настройки
```

Secondary:

```text
Позже
```

## Loading states

Use skeleton cards instead of big spinners.

### Today loading

Skeletons:

- sync card;
- upcoming events;
- tasks preview;
- shopping summary.

### Calendar loading

Skeletons:

- month grid;
- selected day events.

### Tasks loading

Skeletons:

- filters visible;
- 3–5 task rows.

### Shopping loading

Skeletons:

- add item row;
- category cards.

## Error states

### General load error

Title:

```text
Не удалось загрузить данные
```

Description:

```text
Проверьте соединение и попробуйте ещё раз.
```

Action:

```text
Повторить
```

### Save error

Title:

```text
Не удалось сохранить
```

Description:

```text
Изменения не потеряны. Попробуйте ещё раз.
```

Action:

```text
Повторить
```

### Sync error

Title:

```text
Не удалось синхронизировать
```

Description:

```text
Некоторые изменения пока видны только на этом устройстве.
```

Action:

```text
Повторить
```

### Login error

Title:

```text
Не удалось войти
```

Description:

```text
Проверьте email и попробуйте ещё раз.
```

Action:

```text
Повторить
```

### Invite expired

Title:

```text
Ссылка приглашения истекла
```

Description:

```text
Попросите отправить новое приглашение.
```

Action:

```text
Понятно
```

### Access denied

Title:

```text
Нет доступа
```

Description:

```text
Вы не состоите в этой семье или приглашение больше недоступно.
```

Action:

```text
Вернуться
```

## Undo messages

```text
Событие удалено · Отменить
Дело удалено · Отменить
Дело выполнено · Отменить
Товар удалён · Отменить
Товар отмечен как купленный · Отменить
Купленные товары скрыты · Отменить
```

## Form validation

```text
Введите название
Введите email
Введите корректный email
Введите название семьи
Введите ваше имя
```

## Button loading labels

```text
Сохраняем...
Создаём...
Отправляем...
Подключаем...
```

## Visual rules

- Empty state should use soft glass card.
- Error state should not use full red background.
- Use Danger Red only for icon/accent/text.
- Keep one main action.
- Avoid long paragraphs.
- Use icons only if they help.

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
alex@example.com
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

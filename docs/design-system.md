# Doma — Design System v1

## 1. Design direction

Doma uses a warm premium iOS-first visual language.

Core style:

- warm off-white background;
- soft glass panels;
- deep navy primary accent;
- gold secondary accent;
- rounded cards;
- subtle shadows;
- clean iOS-like structure;
- premium but not decorative;
- family-oriented but not childish.

The design should feel like a calm home-management app, not a corporate productivity tool.

## 2. Design keywords

- Warm
- Calm
- Premium
- Minimal
- iOS-first
- Soft glass
- Thin lines
- Rounded cards
- Human
- Family-centered

## 3. Color system

### Background

```css
--warm-background: #F7F1E8;
```

Use for main app background, onboarding, screen background, and presentation background.

### Surfaces

```css
--surface-primary: #FFFFFF;
--surface-warm: #FFFBF5;
--glass-surface: rgba(255, 255, 255, 0.68);
```

Use `surface-primary` for normal cards and lists.  
Use `surface-warm` for softer blocks like sync status and shopping summaries.  
Use `glass-surface` only for major panels: tab bar, top brand card, widget, sync card.

### Text

```css
--text-primary: #152235;
--text-secondary: #6F747C;
--text-tertiary: #A2A6AD;
```

### Strokes

```css
--stroke-soft: #E8DED2;
--stroke-light: #F1E8DD;
```

### Accent colors

```css
--doma-blue: #163A5F;
--doma-gold: #D69A45;
--task-orange: #EF8A1F;
--shopping-green: #5F9669;
--family-sand: #D7B98B;
--danger-red: #D85C4A;
```

Usage:

- `doma-blue`: calendar, active Today tab, selected date, core brand elements.
- `doma-gold`: primary CTA, family/brand accents.
- `task-orange`: tasks and task indicators.
- `shopping-green`: shopping list and sync success.
- `family-sand`: family-related accents, neutral shared status.
- `danger-red`: errors, deletion, overdue items.

## 4. Gradients

### Warm app background

```css
background: linear-gradient(180deg, #FFF8EE 0%, #F7F1E8 55%, #F3E8DA 100%);
```

### Gold CTA

```css
background: linear-gradient(180deg, #E5B76C 0%, #D69A45 100%);
```

### Blue active element

```css
background: linear-gradient(180deg, #1D4A76 0%, #163A5F 100%);
```

## 5. Typography

### Main UI font

- iOS: `SF Pro Text`
- Android: `Roboto` or `Google Sans`

### Brand/headline font

- `Playfair Display`

Use for the Doma wordmark and selected large brand headings. Do not overuse serif typography in dense UI.

## 6. Type scale

### Large Title

```text
Size: 34
Weight: 700
Line height: 40
Color: Text Primary
```

### Screen Title

```text
Size: 28
Weight: 700
Line height: 34
Color: Text Primary
```

### Section Title

```text
Size: 17–20
Weight: 600
Line height: 22–25
Color: Text Primary
```

### Body

```text
Size: 15–16
Weight: 400/500
Line height: 21
Color: Text Primary
```

### Caption

```text
Size: 12–13
Weight: 400
Line height: 16
Color: Text Secondary
```

### Button

```text
Size: 16
Weight: 600
Line height: 20
```

## 7. Spacing and layout

```text
Screen horizontal padding: 20 px
Card inner padding: 14–16 px
Section spacing: 24 px
Card spacing: 10–12 px
List row height: 52–68 px
Bottom tab height: 76–84 px
```

## 8. Radius

```text
Small radius: 10 px
Medium radius: 14 px
Large radius: 20 px
Extra large radius: 28 px
```

Usage:

- 10 px: small badges and chips.
- 14 px: inputs and compact controls.
- 20 px: cards.
- 28 px: glass panels and bottom tab bar.

## 9. Shadows

### Soft card shadow

```css
box-shadow: 0 8px 24px rgba(55, 38, 20, 0.08);
```

### Glass shadow

```css
box-shadow: 0 12px 36px rgba(55, 38, 20, 0.10);
```

### Button shadow

```css
box-shadow: 0 6px 16px rgba(214, 154, 69, 0.24);
```

Shadows should be soft and warm. Avoid harsh Material-style shadows.

## 10. Glassmorphism

Glass should be used sparingly.

### Glass panel style

```css
background: rgba(255, 255, 255, 0.68);
backdrop-filter: blur(18px);
border: 1px solid rgba(255, 255, 255, 0.72);
border-radius: 24px;
box-shadow: 0 12px 36px rgba(55, 38, 20, 0.10);
```

Use for bottom tab bar, sync card, top brand block, widget, and onboarding panels. Do not use for every row or dense form field.

## 11. Components

### Bottom tab bar

Tabs:

- Сегодня
- Календарь
- Дела
- Покупки

Height: `76–84 px`.

Style:

- glass surface;
- radius 24–28 px;
- soft border;
- soft shadow.

Active state:

- icon and label use section color;
- optional soft rounded background behind active icon.

Inactive state:

- icon: `#8A8F98`;
- label: `#8A8F98`.

### Header

Main screen:

```text
Doma
Доброе утро, Алексей
Сегодня, 3 июня
Notification icon
```

Inner screens:

```text
Back / Screen title / Plus
```

### Event card

Structure:

```text
[Icon] 09:00  Врач             >
       Алексей и Мая
```

Recommended height: `52–64 px`.  
Radius: `16 px`.

States:

- default;
- pressed;
- past;
- with reminder;
- shared;
- personal.

### Calendar day cell

Size: `36–40 px`.

Selected day:

- circle background: Doma Blue;
- text: white.

Today:

- thin Doma Gold border;
- text: Text Primary.

Days with events:

- 1–3 small colored dots under the day number.

Dot colors:

- blue: calendar event;
- orange: task;
- green: shopping;
- sand: family.

### Task row

Structure:

```text
[○] Позвонить мастеру        [avatar]
    Алексей
```

Height: `58–68 px`.

Checkbox:

- size: 24 px;
- stroke: Task Orange;
- checked fill: Task Orange or Shopping Green.

Completed:

- checked icon;
- text tertiary;
- strikethrough.

### Shopping row

Structure:

```text
[□] Молоко
    2 л
```

Height: `48–56 px`.

Checkbox:

- size: 22–24 px;
- stroke: Shopping Green;
- checked fill: Shopping Green.

Purchased item:

- opacity 45%;
- strikethrough;
- moves to bottom.

### Chips

Examples:

- Все
- Мои
- Общие
- Выполнено
- Молоко
- Хлеб
- Яйца

Size:

```text
Height: 32–36 px
Horizontal padding: 12–16 px
Radius: 14–18 px
```

Default:

- background: Surface Warm;
- border: Stroke Soft;
- text: Text Secondary.

Active:

- background: Doma Blue;
- text: white.

Shopping chip:

- background: rgba(95, 150, 105, 0.10);
- border: rgba(95, 150, 105, 0.22);
- text: Shopping Green.

### Primary button

Examples:

- Сохранить
- Создать семью
- Пригласить партнёра

Height: `52–56 px`.  
Radius: `16 px`.  
Background: Gold gradient.

Disabled:

- background: `#E6DED4`;
- text: `#A2A6AD`.

### Secondary button

Examples:

- Отмена
- Позже
- Смотреть все

Style:

- transparent or Surface Warm background;
- text: Doma Blue or Doma Gold depending on context.

### Input field

Height: `52–58 px`.

Style:

- background: Surface Primary;
- border: Stroke Light;
- radius: 14–16 px;
- placeholder: Text Tertiary.

Focused:

- border: Doma Gold;
- very soft gold glow.

## 12. Avatars

Sizes:

```text
Small: 20 px
Medium: 32 px
Large: 48 px
Profile: 72 px
```

People:

- Алексей
- Мая
- Later: child profile.

Pair display:

- RU: Алексей и Мая
- PL: Alex i Maja

## 13. Icons

Style:

- rounded;
- thin stroke;
- iOS-like;
- no heavy detail.

Stroke: `1.7–2 px`.

Sizes:

```text
Tab icon: 22–24 px
Card icon: 20–22 px
Small icon: 16 px
```

Key icons:

- Today: house/sun;
- Calendar: calendar;
- Tasks: check circle;
- Shopping: shopping bag/cart;
- Event: calendar dot;
- Reminder: bell;
- Sync: check circle;
- Family: users.

## 14. Interface states

### Empty state

Example:

```text
Сегодня ничего не запланировано
Добавьте первое событие, дело или покупку.
```

### Loading

Use skeleton cards instead of heavy spinners.

### Offline

```text
Нет соединения
Изменения сохранятся и синхронизируются позже.
```

### Sync success

```text
Всё синхронизировано
Обновлено 1 мин назад
```

### Error

```text
Не удалось синхронизировать
Повторить
```

## 15. Composition rules

1. Each screen must have one main job.
2. Use color only for meaning.
3. Use glass only for major panels.
4. Do not overload the Today screen.
5. Maintain generous spacing.
6. Keep household language simple and human.

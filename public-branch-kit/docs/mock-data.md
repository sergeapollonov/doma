# Doma — Mock Data

## Purpose

This document defines stable demo data for design, development and Codex implementation.

Use before backend is connected.

## Demo assumptions

```text
Current user: Alex
Partner: Maya
Current date: 3 June 2026
Current language: Russian
Current family: Семья Алексея
```

## Family

```ts
export const mockFamily = {
  id: 'family-1',
  name: 'Семья Алексея',
  createdBy: 'user-sergey',
};
```

## Profiles

```ts
export const mockProfiles = [
  {
    id: 'user-sergey',
    displayName: 'Алексей',
    email: 'sergey@example.com',
    avatarUrl: null,
    language: 'ru',
    timezone: 'Europe/Warsaw',
  },
  {
    id: 'user-olya',
    displayName: 'Мая',
    email: 'olya@example.com',
    avatarUrl: null,
    language: 'ru',
    timezone: 'Europe/Warsaw',
  },
];
```

## Family members

```ts
export const mockFamilyMembers = [
  {
    id: 'member-sergey',
    familyId: 'family-1',
    userId: 'user-sergey',
    displayName: 'Алексей',
    role: 'owner',
    memberType: 'adult',
    status: 'active',
  },
  {
    id: 'member-olya',
    familyId: 'family-1',
    userId: 'user-olya',
    displayName: 'Мая',
    role: 'adult',
    memberType: 'adult',
    status: 'active',
  },
];
```

## Events

```ts
export const mockEvents = [
  {
    id: 'event-1',
    familyId: 'family-1',
    title: 'Врач',
    description: 'Клиника на Сенной',
    startsAt: '2026-06-03T09:00:00+02:00',
    endsAt: '2026-06-03T09:30:00+02:00',
    participants: ['member-sergey', 'member-olya'],
    reminder: '30m',
    repeatRule: null,
    eventType: 'appointment',
    colorKey: 'doma_blue',
    createdBy: 'user-sergey',
  },
  {
    id: 'event-2',
    familyId: 'family-1',
    title: 'Забрать посылку',
    description: 'Пункт выдачи СДЭК',
    startsAt: '2026-06-03T14:30:00+02:00',
    endsAt: null,
    participants: ['member-sergey'],
    reminder: '1h',
    repeatRule: null,
    eventType: 'delivery',
    colorKey: 'task_orange',
    createdBy: 'user-sergey',
  },
  {
    id: 'event-3',
    familyId: 'family-1',
    title: 'Ужин с родителями',
    description: 'Ресторан «Маивия»',
    startsAt: '2026-06-03T19:00:00+02:00',
    endsAt: '2026-06-03T21:00:00+02:00',
    participants: ['member-sergey', 'member-olya'],
    reminder: '30m',
    repeatRule: null,
    eventType: 'meal',
    colorKey: 'family_sand',
    createdBy: 'user-olya',
  },
];
```

## Tasks

```ts
export const mockTasks = [
  {
    id: 'task-1',
    familyId: 'family-1',
    title: 'Позвонить мастеру',
    assigneeMemberId: 'member-sergey',
    isShared: true,
    dueAt: '2026-06-03T18:00:00+02:00',
    reminder: '2026-06-03T18:00:00+02:00',
    status: 'active',
    priority: 'normal',
    createdBy: 'user-sergey',
  },
  {
    id: 'task-2',
    familyId: 'family-1',
    title: 'Оплатить интернет',
    assigneeMemberId: 'member-olya',
    isShared: true,
    dueAt: '2026-06-03T20:00:00+02:00',
    reminder: null,
    status: 'active',
    priority: 'normal',
    createdBy: 'user-sergey',
  },
  {
    id: 'task-3',
    familyId: 'family-1',
    title: 'Купить подарок для Маи',
    assigneeMemberId: 'member-sergey',
    isShared: true,
    dueAt: '2026-06-05T18:00:00+02:00',
    reminder: null,
    status: 'active',
    priority: 'normal',
    createdBy: 'user-sergey',
  },
  {
    id: 'task-4',
    familyId: 'family-1',
    title: 'Записать машину на сервис',
    assigneeMemberId: 'member-olya',
    isShared: true,
    dueAt: null,
    reminder: null,
    status: 'active',
    priority: 'normal',
    createdBy: 'user-olya',
  },
  {
    id: 'task-5',
    familyId: 'family-1',
    title: 'Разобрать документы',
    assigneeMemberId: null,
    isShared: true,
    dueAt: null,
    reminder: null,
    status: 'active',
    priority: 'normal',
    createdBy: 'user-sergey',
  },
  {
    id: 'task-6',
    familyId: 'family-1',
    title: 'Оплатить страховку',
    assigneeMemberId: 'member-sergey',
    isShared: true,
    dueAt: '2026-06-02T18:00:00+02:00',
    reminder: null,
    status: 'completed',
    completedBy: 'user-sergey',
    completedAt: '2026-06-03T08:30:00+02:00',
    priority: 'normal',
    createdBy: 'user-sergey',
  },
];
```

## Shopping categories

```ts
export const mockShoppingCategories = [
  { id: 'cat-dairy', nameRu: 'Молочное', namePl: 'Nabiał', iconKey: 'milk', colorKey: 'doma_blue', sortOrder: 1 },
  { id: 'cat-fruit-veg', nameRu: 'Овощи и фрукты', namePl: 'Warzywa i owoce', iconKey: 'leaf', colorKey: 'shopping_green', sortOrder: 2 },
  { id: 'cat-home', nameRu: 'Дом', namePl: 'Dom', iconKey: 'home', colorKey: 'doma_blue', sortOrder: 3 },
  { id: 'cat-meat-fish', nameRu: 'Мясо и рыба', namePl: 'Mięso i ryby', iconKey: 'meat', colorKey: 'danger_red', sortOrder: 4 },
  { id: 'cat-other', nameRu: 'Другое', namePl: 'Inne', iconKey: 'more', colorKey: 'family_sand', sortOrder: 99 },
];
```

## Shopping items

```ts
export const mockShoppingItems = [
  { id: 'shop-1', familyId: 'family-1', categoryId: 'cat-dairy', title: 'Молоко', quantity: '2 л', status: 'active', sortOrder: 1, createdBy: 'user-olya' },
  { id: 'shop-2', familyId: 'family-1', categoryId: 'cat-dairy', title: 'Сыр', quantity: null, status: 'active', sortOrder: 2, createdBy: 'user-sergey' },
  { id: 'shop-3', familyId: 'family-1', categoryId: 'cat-fruit-veg', title: 'Помидоры', quantity: '500 г', status: 'active', sortOrder: 1, createdBy: 'user-olya' },
  { id: 'shop-4', familyId: 'family-1', categoryId: 'cat-fruit-veg', title: 'Огурцы', quantity: null, status: 'active', sortOrder: 2, createdBy: 'user-sergey' },
  { id: 'shop-5', familyId: 'family-1', categoryId: 'cat-home', title: 'Бумажные полотенца', quantity: null, status: 'active', sortOrder: 1, createdBy: 'user-sergey' },
  { id: 'shop-6', familyId: 'family-1', categoryId: 'cat-home', title: 'Средство для мытья посуды', quantity: null, status: 'active', sortOrder: 2, createdBy: 'user-olya' },
  { id: 'shop-7', familyId: 'family-1', categoryId: 'cat-meat-fish', title: 'Куриное филе', quantity: null, status: 'active', sortOrder: 1, createdBy: 'user-sergey' },
];
```

## Frequently bought

```ts
export const mockFrequentShoppingItems = [
  { id: 'freq-1', title: 'Молоко', categoryId: 'cat-dairy', imageKey: 'milk' },
  { id: 'freq-2', title: 'Хлеб', categoryId: 'cat-other', imageKey: 'bread' },
  { id: 'freq-3', title: 'Яйца', categoryId: 'cat-other', imageKey: 'eggs' },
  { id: 'freq-4', title: 'Бананы', categoryId: 'cat-fruit-veg', imageKey: 'bananas' },
  { id: 'freq-5', title: 'Кофе', categoryId: 'cat-other', imageKey: 'coffee' },
];
```

## Target code file

Create in app:

```text
/src/mocks/demoData.ts
```

import type { EventItem, HouseholdTask, PersonId, ShoppingItem, TaskItem } from "./types";

export const people: Record<PersonId, { name: string; initials: string; color: string }> = {
  alex: { name: "Алексей", initials: "С", color: "#163A5F" },
  maya: { name: "Мая", initials: "О", color: "#D69A45" }
};

export const initialEvents: EventItem[] = [
  {
    id: "event-1",
    title: "Врач",
    date: "3 июня",
    time: "09:00",
    participants: ["alex", "maya"],
    reminder: "За 30 минут"
  },
  {
    id: "event-2",
    title: "Забрать посылку",
    date: "3 июня",
    time: "14:30",
    participants: ["alex"],
    reminder: "За 1 час"
  },
  {
    id: "event-3",
    title: "Ужин с родителями",
    date: "3 июня",
    time: "19:00",
    participants: ["alex", "maya"],
    reminder: "За 30 минут"
  }
];

export const initialHouseholdTasks = [
  {
    id: "task-1",
    familyId: "family-1",
    title: "Позвонить мастеру",
    description: null,
    assigneeMemberId: "member-alex",
    isShared: true,
    dueAt: "2026-06-03T18:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "normal",
    createdBy: "user-alex",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-03T08:00:00+02:00",
    updatedAt: "2026-06-03T08:00:00+02:00",
    deletedAt: null
  },
  {
    id: "task-2",
    familyId: "family-1",
    title: "Оплатить интернет",
    description: null,
    assigneeMemberId: "member-maya",
    isShared: true,
    dueAt: "2026-06-03T20:00:00+02:00",
    reminderAt: "2026-06-03T19:00:00+02:00",
    status: "active",
    priority: "normal",
    createdBy: "user-alex",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-03T08:05:00+02:00",
    updatedAt: "2026-06-03T08:05:00+02:00",
    deletedAt: null
  },
  {
    id: "task-3",
    familyId: "family-1",
    title: "Купить подарок",
    description: null,
    assigneeMemberId: "member-alex",
    isShared: true,
    dueAt: "2026-06-05T18:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "high",
    createdBy: "user-alex",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-03T08:10:00+02:00",
    updatedAt: "2026-06-03T08:10:00+02:00",
    deletedAt: null
  },
  {
    id: "task-4",
    familyId: "family-1",
    title: "Записать машину на сервис",
    description: null,
    assigneeMemberId: "member-maya",
    isShared: true,
    dueAt: null,
    reminderAt: null,
    status: "active",
    priority: "normal",
    createdBy: "user-maya",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-03T08:15:00+02:00",
    updatedAt: "2026-06-03T08:15:00+02:00",
    deletedAt: null
  },
  {
    id: "task-5",
    familyId: "family-1",
    title: "Разобрать документы",
    description: null,
    assigneeMemberId: null,
    isShared: true,
    dueAt: null,
    reminderAt: null,
    status: "active",
    priority: "low",
    createdBy: "user-alex",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-03T08:20:00+02:00",
    updatedAt: "2026-06-03T08:20:00+02:00",
    deletedAt: null
  },
  {
    id: "task-6",
    familyId: "family-1",
    title: "Оплатить страховку",
    description: null,
    assigneeMemberId: "member-alex",
    isShared: true,
    dueAt: "2026-06-02T18:00:00+02:00",
    reminderAt: null,
    status: "completed",
    priority: "normal",
    createdBy: "user-alex",
    updatedBy: "user-alex",
    completedBy: "user-alex",
    completedAt: "2026-06-03T08:30:00+02:00",
    createdAt: "2026-06-02T09:00:00+02:00",
    updatedAt: "2026-06-03T08:30:00+02:00",
    deletedAt: null
  }
] satisfies HouseholdTask[];

export const initialTasks: TaskItem[] = [
  {
    id: "task-1",
    title: "Позвонить мастеру",
    assignee: "alex",
    due: "Сегодня",
    reminder: "Не напоминать",
    completed: false
  },
  {
    id: "task-2",
    title: "Оплатить интернет",
    assignee: "maya",
    due: "Сегодня",
    reminder: "За 1 час",
    completed: false
  },
  {
    id: "task-3",
    title: "Купить подарок для Маи",
    assignee: "alex",
    due: "До 5 июня",
    reminder: "За день",
    completed: false
  },
  {
    id: "task-4",
    title: "Записать машину на сервис",
    assignee: "maya",
    due: "Без срока",
    reminder: "Не напоминать",
    completed: false
  },
  {
    id: "task-5",
    title: "Разобрать документы",
    assignee: "shared",
    due: "Без срока",
    reminder: "Не напоминать",
    completed: false
  },
  {
    id: "task-6",
    title: "Оплатить страховку",
    assignee: "alex",
    due: "Сегодня",
    reminder: "Не напоминать",
    completed: true
  }
];

export const initialShopping: ShoppingItem[] = [
  { id: "shop-1", title: "Молоко", quantity: "2 л", category: "Молочное", purchased: false },
  { id: "shop-2", title: "Сыр", category: "Молочное", purchased: false },
  { id: "shop-3", title: "Помидоры", quantity: "500 г", category: "Овощи и фрукты", purchased: false },
  { id: "shop-4", title: "Огурцы", category: "Овощи и фрукты", purchased: false },
  { id: "shop-5", title: "Бумажные полотенца", category: "Дом", purchased: false },
  { id: "shop-6", title: "Средство для мытья посуды", category: "Дом", purchased: false },
  { id: "shop-7", title: "Куриное филе", category: "Мясо и рыба", purchased: false }
];

export const frequentShopping = ["Молоко", "Хлеб", "Яйца", "Бананы", "Кофе"];

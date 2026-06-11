import type {
  EventItem,
  HouseholdTask,
  PersonId,
  ShoppingCategory,
  ShoppingItem,
  ShoppingListItem,
  ShoppingListState,
  TaskItem
} from "./types";

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
  { id: "shop-1", title: "Молоко", quantity: "2 л", categoryId: "cat-dairy", category: "Молочное", purchased: false },
  { id: "shop-2", title: "Сыр", categoryId: "cat-dairy", category: "Молочное", purchased: false },
  { id: "shop-3", title: "Помидоры", quantity: "500 г", categoryId: "cat-fruit-veg", category: "Овощи и фрукты", purchased: false },
  { id: "shop-4", title: "Огурцы", categoryId: "cat-fruit-veg", category: "Овощи и фрукты", purchased: false },
  { id: "shop-5", title: "Бумажные полотенца", categoryId: "cat-home", category: "Дом", purchased: false },
  { id: "shop-6", title: "Средство для мытья посуды", categoryId: "cat-home", category: "Дом", purchased: false },
  { id: "shop-7", title: "Куриное филе", categoryId: "cat-meat-fish", category: "Мясо и рыба", purchased: false }
];

export const initialShoppingCategories = [
  {
    id: "cat-dairy",
    familyId: null,
    nameRu: "Молочное",
    namePl: "Nabiał",
    iconKey: "milk",
    colorKey: "doma_blue",
    sortOrder: 1,
    isDefault: true,
    createdAt: "2026-06-03T08:00:00+02:00"
  },
  {
    id: "cat-fruit-veg",
    familyId: null,
    nameRu: "Овощи и фрукты",
    namePl: "Warzywa i owoce",
    iconKey: "leaf",
    colorKey: "shopping_green",
    sortOrder: 2,
    isDefault: true,
    createdAt: "2026-06-03T08:00:00+02:00"
  },
  {
    id: "cat-home",
    familyId: null,
    nameRu: "Дом",
    namePl: "Dom",
    iconKey: "home",
    colorKey: "doma_blue",
    sortOrder: 3,
    isDefault: true,
    createdAt: "2026-06-03T08:00:00+02:00"
  },
  {
    id: "cat-meat-fish",
    familyId: null,
    nameRu: "Мясо и рыба",
    namePl: "Mięso i ryby",
    iconKey: "meat",
    colorKey: "danger_red",
    sortOrder: 4,
    isDefault: true,
    createdAt: "2026-06-03T08:00:00+02:00"
  },
  {
    id: "cat-other",
    familyId: null,
    nameRu: "Другое",
    namePl: "Inne",
    iconKey: "more",
    colorKey: "family_sand",
    sortOrder: 99,
    isDefault: true,
    createdAt: "2026-06-03T08:00:00+02:00"
  }
] satisfies ShoppingCategory[];

export const initialShoppingListItems = [
  {
    id: "shop-1",
    familyId: "family-1",
    categoryId: "cat-dairy",
    title: "Молоко",
    quantity: "2 л",
    note: null,
    status: "active",
    sortOrder: 1,
    createdBy: "user-maya",
    updatedBy: null,
    purchasedBy: null,
    purchasedAt: null,
    createdAt: "2026-06-03T08:00:00+02:00",
    updatedAt: "2026-06-03T08:00:00+02:00",
    deletedAt: null
  },
  {
    id: "shop-2",
    familyId: "family-1",
    categoryId: "cat-dairy",
    title: "Сыр",
    quantity: null,
    note: null,
    status: "active",
    sortOrder: 2,
    createdBy: "user-alex",
    updatedBy: null,
    purchasedBy: null,
    purchasedAt: null,
    createdAt: "2026-06-03T08:02:00+02:00",
    updatedAt: "2026-06-03T08:02:00+02:00",
    deletedAt: null
  },
  {
    id: "shop-3",
    familyId: "family-1",
    categoryId: "cat-fruit-veg",
    title: "Помидоры",
    quantity: "500 г",
    note: null,
    status: "active",
    sortOrder: 1,
    createdBy: "user-maya",
    updatedBy: null,
    purchasedBy: null,
    purchasedAt: null,
    createdAt: "2026-06-03T08:04:00+02:00",
    updatedAt: "2026-06-03T08:04:00+02:00",
    deletedAt: null
  },
  {
    id: "shop-4",
    familyId: "family-1",
    categoryId: "cat-fruit-veg",
    title: "Огурцы",
    quantity: null,
    note: null,
    status: "active",
    sortOrder: 2,
    createdBy: "user-alex",
    updatedBy: null,
    purchasedBy: null,
    purchasedAt: null,
    createdAt: "2026-06-03T08:06:00+02:00",
    updatedAt: "2026-06-03T08:06:00+02:00",
    deletedAt: null
  },
  {
    id: "shop-5",
    familyId: "family-1",
    categoryId: "cat-home",
    title: "Бумажные полотенца",
    quantity: null,
    note: null,
    status: "active",
    sortOrder: 1,
    createdBy: "user-alex",
    updatedBy: null,
    purchasedBy: null,
    purchasedAt: null,
    createdAt: "2026-06-03T08:08:00+02:00",
    updatedAt: "2026-06-03T08:08:00+02:00",
    deletedAt: null
  },
  {
    id: "shop-6",
    familyId: "family-1",
    categoryId: "cat-home",
    title: "Средство для мытья посуды",
    quantity: null,
    note: null,
    status: "active",
    sortOrder: 2,
    createdBy: "user-maya",
    updatedBy: null,
    purchasedBy: null,
    purchasedAt: null,
    createdAt: "2026-06-03T08:10:00+02:00",
    updatedAt: "2026-06-03T08:10:00+02:00",
    deletedAt: null
  },
  {
    id: "shop-7",
    familyId: "family-1",
    categoryId: "cat-meat-fish",
    title: "Куриное филе",
    quantity: null,
    note: null,
    status: "active",
    sortOrder: 1,
    createdBy: "user-alex",
    updatedBy: null,
    purchasedBy: null,
    purchasedAt: null,
    createdAt: "2026-06-03T08:12:00+02:00",
    updatedAt: "2026-06-03T08:12:00+02:00",
    deletedAt: null
  }
] satisfies ShoppingListItem[];

export const frequentShopping = ["Молоко", "Хлеб", "Яйца", "Бананы", "Кофе"];

export const initialShoppingListState = {
  categories: initialShoppingCategories,
  items: initialShoppingListItems,
  frequentItemTitles: frequentShopping
} satisfies ShoppingListState;

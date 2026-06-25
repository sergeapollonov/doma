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
    title: "Детский врач",
    date: "3 июня",
    time: "15:30",
    participants: ["alex", "maya"],
    location: "Поликлиника №4",
  },
  {
    id: "event-2",
    title: "Школьное собрание",
    date: "3 июня",
    time: "15:30",
    participants: ["alex", "maya"],
    location: "Кабинет 302",
    reminder: "За 1 час"
  },
  {
    id: "event-3",
    title: "Тренировка по плаванию",
    date: "3 июня",
    time: "18:00",
    participants: ["maya"],
    location: "Бассейн «Олимп»",
    reminder: "За 30 минут"
  }
];

export const householdAreas: import("./types").HouseholdArea[] = [
  { id: "area-home", emoji: "🏠", nameRu: "Дом", namePl: "Dom" },
  { id: "area-car", emoji: "🚗", nameRu: "Машина", namePl: "Samochód" },
  { id: "area-child", emoji: "👶", nameRu: "Ребёнок", namePl: "Dziecko" },
  { id: "area-pet", emoji: "🐶", nameRu: "Питомец", namePl: "Zwierzak" },
  { id: "area-finance", emoji: "💰", nameRu: "Финансы", namePl: "Finanse" }
];

export const initialHouseholdTasks = [
  // --- ПРОСРОЧЕННЫЕ (2) ---
  {
    id: "task-1",
    familyId: "family-1",
    title: "Оплатить интернет",
    description: null,
    assigneeMemberId: "member-alex",
    isShared: false,
    dueAt: "2026-06-02T12:00:00+02:00",
    reminderAt: "2026-06-02T11:00:00+02:00",
    status: "active",
    priority: "high",
    categoryId: "area-finance",
    recurrence: { type: "monthly", interval: 1 },
    subtasks: [],
    comments: [],
    history: [
      { id: "h1", type: "created", actorId: "alex", createdAt: "2026-06-01T09:00:00+02:00" }
    ],
    createdBy: "user-alex",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-01T09:00:00+02:00",
    updatedAt: "2026-06-01T09:00:00+02:00",
    deletedAt: null
  },
  {
    id: "task-2",
    familyId: "family-1",
    title: "Записать ребёнка к врачу",
    description: null,
    assigneeMemberId: "member-maya",
    isShared: false,
    dueAt: "2026-06-01T10:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "high",
    categoryId: "area-child",
    recurrence: null,
    subtasks: [],
    comments: [],
    history: [
      { id: "h2", type: "created", actorId: "maya", createdAt: "2026-05-30T09:00:00+02:00" }
    ],
    createdBy: "user-maya",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-05-30T09:00:00+02:00",
    updatedAt: "2026-05-30T09:00:00+02:00",
    deletedAt: null
  },
  // --- СЕГОДНЯ (4) ---
  {
    id: "task-3",
    familyId: "family-1",
    title: "Позвонить в садик",
    description: null,
    assigneeMemberId: "member-maya",
    isShared: false,
    dueAt: "2026-06-03T10:00:00+02:00",
    reminderAt: "2026-06-03T09:50:00+02:00",
    status: "active",
    priority: "normal",
    categoryId: "area-child",
    recurrence: null,
    subtasks: [],
    comments: [],
    history: [
      { id: "h3", type: "created", actorId: "maya", createdAt: "2026-06-02T20:00:00+02:00" }
    ],
    createdBy: "user-maya",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-02T20:00:00+02:00",
    updatedAt: "2026-06-02T20:00:00+02:00",
    deletedAt: null
  },
  {
    id: "task-4",
    familyId: "family-1",
    title: "Купить подарок для учителя",
    description: "Выбрать и купить хороший подарок для Марии Ивановны. Бюджет до 1500 ₽.",
    assigneeMemberId: "member-alex",
    isShared: false,
    dueAt: "2026-06-03T12:00:00+02:00",
    reminderAt: "2026-06-03T11:00:00+02:00",
    status: "active",
    priority: "normal",
    categoryId: "area-home",
    recurrence: null,
    subtasks: [
      { id: "sub-1", title: "Выбрать подарок", completed: true },
      { id: "sub-2", title: "Купить подарок", completed: true },
      { id: "sub-3", title: "Упаковать подарок", completed: false }
    ],
    comments: [
      { id: "c1", authorId: "maya", text: "Может подарим сертификат в книжный? Она любит читать.", createdAt: "2026-06-03T09:20:00+02:00" },
      { id: "c2", authorId: "alex", text: "Хорошая идея! Я заеду после работы и куплю.", createdAt: "2026-06-03T09:35:00+02:00" }
    ],
    history: [
      { id: "h4", type: "created", actorId: "alex", createdAt: "2026-06-03T09:10:00+02:00" },
      { id: "h5", type: "due_changed", actorId: "alex", createdAt: "2026-06-03T09:15:00+02:00", details: "13 июня → 12 июня" },
      { id: "h6", type: "comment_added", actorId: "maya", createdAt: "2026-06-03T09:20:00+02:00" }
    ],
    createdBy: "user-alex",
    updatedBy: "user-alex",
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-03T09:10:00+02:00",
    updatedAt: "2026-06-03T09:15:00+02:00",
    deletedAt: null
  },
  {
    id: "task-5",
    familyId: "family-1",
    title: "Оплатить страховку",
    description: null,
    assigneeMemberId: "member-alex",
    isShared: false,
    dueAt: "2026-06-03T16:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "normal",
    categoryId: "area-finance",
    recurrence: null,
    subtasks: [],
    comments: [],
    history: [
      { id: "h7", type: "created", actorId: "alex", createdAt: "2026-06-02T10:00:00+02:00" }
    ],
    createdBy: "user-alex",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-02T10:00:00+02:00",
    updatedAt: "2026-06-02T10:00:00+02:00",
    deletedAt: null
  },
  {
    id: "task-6",
    familyId: "family-1",
    title: "Полить цветы",
    description: null,
    assigneeMemberId: "member-maya",
    isShared: false,
    dueAt: "2026-06-03T18:00:00+02:00",
    reminderAt: null,
    status: "completed",
    priority: "low",
    categoryId: "area-home",
    recurrence: { type: "custom", interval: 3 },
    subtasks: [],
    comments: [],
    history: [
      { id: "h8", type: "created", actorId: "maya", createdAt: "2026-06-01T08:00:00+02:00" },
      { id: "h9", type: "completed", actorId: "maya", createdAt: "2026-06-03T17:30:00+02:00" }
    ],
    createdBy: "user-maya",
    updatedBy: "user-maya",
    completedBy: "user-maya",
    completedAt: "2026-06-03T17:30:00+02:00",
    createdAt: "2026-06-01T08:00:00+02:00",
    updatedAt: "2026-06-03T17:30:00+02:00",
    deletedAt: null
  },
  // --- НА ЭТОЙ НЕДЕЛЕ (5) ---
  {
    id: "task-7",
    familyId: "family-1",
    title: "Записаться на шиномонтаж",
    description: null,
    assigneeMemberId: "member-alex",
    isShared: false,
    dueAt: "2026-06-04T12:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "low",
    categoryId: "area-car",
    recurrence: null,
    subtasks: [],
    comments: [],
    history: [
      { id: "h10", type: "created", actorId: "alex", createdAt: "2026-06-02T09:00:00+02:00" }
    ],
    createdBy: "user-alex",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-02T09:00:00+02:00",
    updatedAt: "2026-06-02T09:00:00+02:00",
    deletedAt: null
  },
  {
    id: "task-8",
    familyId: "family-1",
    title: "Купить корм для кота",
    description: null,
    assigneeMemberId: "member-maya",
    isShared: false,
    dueAt: "2026-06-05T12:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "low",
    categoryId: "area-pet",
    recurrence: null,
    subtasks: [],
    comments: [],
    history: [
      { id: "h11", type: "created", actorId: "maya", createdAt: "2026-06-02T10:00:00+02:00" }
    ],
    createdBy: "user-maya",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-02T10:00:00+02:00",
    updatedAt: "2026-06-02T10:00:00+02:00",
    deletedAt: null
  },
  {
    id: "task-9",
    familyId: "family-1",
    title: "Подготовить документы на отпуск",
    description: null,
    assigneeMemberId: "member-alex",
    isShared: false,
    dueAt: "2026-06-06T12:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "normal",
    categoryId: "area-home",
    recurrence: null,
    subtasks: [],
    comments: [],
    history: [
      { id: "h12", type: "created", actorId: "alex", createdAt: "2026-06-01T11:00:00+02:00" }
    ],
    createdBy: "user-alex",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-01T11:00:00+02:00",
    updatedAt: "2026-06-01T11:00:00+02:00",
    deletedAt: null
  },
  {
    id: "task-10",
    familyId: "family-1",
    title: "Отвезти вещи в химчистку",
    description: null,
    assigneeMemberId: "member-maya",
    isShared: false,
    dueAt: "2026-06-05T14:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "low",
    categoryId: "area-home",
    recurrence: null,
    subtasks: [],
    comments: [],
    history: [
      { id: "h13", type: "created", actorId: "maya", createdAt: "2026-06-02T15:00:00+02:00" }
    ],
    createdBy: "user-maya",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-02T15:00:00+02:00",
    updatedAt: "2026-06-02T15:00:00+02:00",
    deletedAt: null
  },
  {
    id: "task-11",
    familyId: "family-1",
    title: "Заказать воду",
    description: null,
    assigneeMemberId: "member-alex",
    isShared: false,
    dueAt: "2026-06-06T10:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "low",
    categoryId: "area-home",
    recurrence: null,
    subtasks: [],
    comments: [],
    history: [
      { id: "h14", type: "created", actorId: "alex", createdAt: "2026-06-02T16:00:00+02:00" }
    ],
    createdBy: "user-alex",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-02T16:00:00+02:00",
    updatedAt: "2026-06-02T16:00:00+02:00",
    deletedAt: null
  },
  // --- ПОЗЖЕ (3) ---
  {
    id: "task-12",
    familyId: "family-1",
    title: "Забронировать отпуск",
    description: null,
    assigneeMemberId: null,
    isShared: true,
    dueAt: "2026-06-10T12:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "normal",
    categoryId: null,
    recurrence: null,
    subtasks: [],
    comments: [],
    history: [
      { id: "h15", type: "created", actorId: "alex", createdAt: "2026-06-01T09:00:00+02:00" }
    ],
    createdBy: "user-alex",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-01T09:00:00+02:00",
    updatedAt: "2026-06-01T09:00:00+02:00",
    deletedAt: null
  },
  {
    id: "task-13",
    familyId: "family-1",
    title: "Купить новую кровать",
    description: null,
    assigneeMemberId: "member-maya",
    isShared: false,
    dueAt: "2026-07-01T12:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "low",
    categoryId: "area-home",
    recurrence: null,
    subtasks: [],
    comments: [],
    history: [
      { id: "h16", type: "created", actorId: "maya", createdAt: "2026-06-01T10:00:00+02:00" }
    ],
    createdBy: "user-maya",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-01T10:00:00+02:00",
    updatedAt: "2026-06-01T10:00:00+02:00",
    deletedAt: null
  },
  {
    id: "task-14",
    familyId: "family-1",
    title: "Обновить страховку на машину",
    description: null,
    assigneeMemberId: "member-alex",
    isShared: false,
    dueAt: "2026-06-15T12:00:00+02:00",
    reminderAt: null,
    status: "active",
    priority: "normal",
    categoryId: "area-car",
    recurrence: null,
    subtasks: [],
    comments: [],
    history: [
      { id: "h17", type: "created", actorId: "alex", createdAt: "2026-06-01T11:00:00+02:00" }
    ],
    createdBy: "user-alex",
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt: "2026-06-01T11:00:00+02:00",
    updatedAt: "2026-06-01T11:00:00+02:00",
    deletedAt: null
  },
  // --- ЗАВЕРШЁННЫЕ (2) ---
  {
    id: "task-15",
    familyId: "family-1",
    title: "Оплатить коммуналку",
    description: null,
    assigneeMemberId: "member-alex",
    isShared: false,
    dueAt: "2026-06-01T18:00:00+02:00",
    reminderAt: null,
    status: "completed",
    priority: "normal",
    categoryId: "area-finance",
    recurrence: { type: "monthly", interval: 1 },
    subtasks: [],
    comments: [],
    history: [
      { id: "h18", type: "created", actorId: "alex", createdAt: "2026-05-28T09:00:00+02:00" },
      { id: "h19", type: "completed", actorId: "alex", createdAt: "2026-06-01T17:00:00+02:00" }
    ],
    createdBy: "user-alex",
    updatedBy: "user-alex",
    completedBy: "user-alex",
    completedAt: "2026-06-01T17:00:00+02:00",
    createdAt: "2026-05-28T09:00:00+02:00",
    updatedAt: "2026-06-01T17:00:00+02:00",
    deletedAt: null
  }
] satisfies HouseholdTask[];

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
    deletedAt: null,
    priority: "high"
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
    deletedAt: null,
    priority: "high"
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
    deletedAt: null,
    priority: "high"
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
  frequentItemTitles: frequentShopping,
  templates: [
    {
      id: "tpl-1",
      name: "Продукты на неделю",
      category: "Продукты",
      iconBg: "rgba(95, 150, 105, 0.15)",
      iconColor: "#5F9669",
      iconName: "basket-outline",
      itemCount: 12,
      scope: "family",
      lastUsedDaysAgo: 3,
      items: [
        { title: "Молоко", quantity: "2" },
        { title: "Хлеб", quantity: "1" },
        { title: "Яйца", quantity: "10" },
        { title: "Куриное филе", quantity: "1 кг" },
        { title: "Помидоры", quantity: "500 г" },
      ]
    },
    {
      id: "tpl-2",
      name: "Большая закупка",
      category: "Продукты",
      iconBg: "rgba(116, 92, 219, 0.15)",
      iconColor: "#745CDB",
      iconName: "cart-outline",
      itemCount: 24,
      scope: "family",
      lastUsedDaysAgo: 7,
      items: [
        { title: "Макароны", quantity: "3 уп" },
        { title: "Рис", quantity: "1 кг" },
      ]
    },
    {
      id: "tpl-3",
      name: "Аптечка",
      category: "Аптека",
      iconBg: "rgba(229, 57, 53, 0.15)",
      iconColor: "#E53935",
      iconName: "medkit-outline",
      itemCount: 15,
      scope: "personal",
      lastUsedDaysAgo: 14,
      items: [
        { title: "Ибупрофен" },
        { title: "Пластыри" },
      ]
    },
    {
      id: "tpl-4",
      name: "Все для малыша",
      category: "Детям",
      iconBg: "rgba(41, 128, 185, 0.15)",
      iconColor: "#2980B9",
      iconName: "water-outline",
      itemCount: 18,
      scope: "family",
      lastUsedDaysAgo: 5,
      items: [
        { title: "Подгузники" },
        { title: "Влажные салфетки" },
      ]
    },
    {
      id: "tpl-5",
      name: "Подготовка к поездке",
      category: "Для дома",
      iconBg: "rgba(214, 154, 69, 0.15)",
      iconColor: "#D69A45",
      iconName: "briefcase-outline",
      itemCount: 20,
      scope: "family",
      lastUsedDaysAgo: 30,
      items: [
        { title: "Шампунь" },
        { title: "Зубная паста" },
      ]
    }
  ]
} satisfies ShoppingListState;

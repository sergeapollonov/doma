import { EventItem, PersonId, ShoppingItem, TaskItem } from "./types";

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

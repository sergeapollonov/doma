import type {
  FamilyMemberId,
  HouseholdAreaId,
  HouseholdTask,
  ISODateTimeString,
  Language,
  PersonId,
  ShoppingCategory,
  ShoppingCategoryId,
  ShoppingItem,
  ShoppingListItem,
  TaskItem,
  EventItem
} from "../types";
import { householdAreas } from "../data";

export type TaskMapperCopy = {
  noDue: string;
  dueJune5: string;
  taskToday: string;
  dueWeek: string;
  thirtyMin: string;
  noReminder: string;
};

export type ShoppingMapperCopy = {
  categoryOther: string;
};

export const taskAssigneeToMemberId: Record<PersonId, FamilyMemberId> = {
  alex: "member-alex",
  maya: "member-maya"
};

export function dueLabelToDateTime(dueLabel: string, text: TaskMapperCopy): ISODateTimeString | null {
  if (dueLabel.trim() === text.noDue) {
    return null;
  }

  if (dueLabel.trim() === text.dueJune5) {
    return "2026-06-05T18:00:00+02:00";
  }

  return "2026-06-03T18:00:00+02:00";
}

function mapCategoryId(categoryId: HouseholdAreaId | null, language: Language): TaskItem["category"] {
  if (!categoryId) return null;
  const area = householdAreas.find((a) => a.id === categoryId);
  if (!area) return null;
  return { emoji: area.emoji, name: language === "pl" ? area.namePl : area.nameRu };
}

function mapRecurrence(recurrence: HouseholdTask["recurrence"], language: Language): string | null {
  if (!recurrence) return null;
  const labels: Record<string, Record<Language, string>> = {
    daily: { ru: "Ежедневно", pl: "Codziennie" },
    weekly: { ru: "Еженедельно", pl: "Co tydzień" },
    monthly: { ru: "Ежемесячно", pl: "Co miesiąc" },
  };
  if (recurrence.type === "custom") {
    return language === "pl" ? `Каждые ${recurrence.interval} дн.` : `Каждые ${recurrence.interval} дн.`;
  }
  return labels[recurrence.type]?.[language] ?? null;
}

const TODAY_ISO = "2026-06-03";

function isOverdue(dueAt: ISODateTimeString | null, status: string): boolean {
  if (!dueAt || status === "completed") return false;
  return dueAt.slice(0, 10) < TODAY_ISO;
}

export function toTaskItem(task: HouseholdTask, text: TaskMapperCopy, language: Language = "ru"): TaskItem {
  const dueAtDate = task.dueAt ? task.dueAt.slice(0, 10) : null;
  const dueAtTime = task.dueAt ? task.dueAt.slice(11, 16) : null;

  return {
    id: task.id,
    title: task.title,
    description: task.description,
    assignee: memberIdToTaskAssignee(task.assigneeMemberId),
    due: dueDateToLabel(task.dueAt, text),
    dueDate: dueAtDate,
    dueTime: dueAtTime,
    reminder: task.reminderAt ? text.thirtyMin : text.noReminder,
    completed: task.status === "completed",
    priority: task.priority,
    isOverdue: isOverdue(task.dueAt, task.status),
    category: mapCategoryId(task.categoryId, language),
    recurrence: mapRecurrence(task.recurrence, language),
    subtasks: task.subtasks,
    comments: task.comments,
    history: task.history,
  };
}

export function memberIdToTaskAssignee(memberId: HouseholdTask["assigneeMemberId"]): TaskItem["assignee"] {
  if (memberId === "member-alex") {
    return "alex";
  }

  if (memberId === "member-maya") {
    return "maya";
  }

  return "shared";
}

export function dueDateToLabel(dueAt: ISODateTimeString | null, text: TaskMapperCopy) {
  if (dueAt === null) {
    return text.noDue;
  }

  const date = dueAt.slice(0, 10);

  if (date === "2026-06-03") {
    return text.taskToday;
  }

  if (date === "2026-06-05") {
    return text.dueJune5;
  }

  return text.dueWeek;
}

export function toShoppingItem(
  item: ShoppingListItem,
  categories: ShoppingCategory[],
  language: Language,
  text: ShoppingMapperCopy
): ShoppingItem {
  const categoryModel = categories.find((c) => c.id === item.categoryId);
  const ICONS: Record<string, string> = { "milk": "🥛", "leaf": "🥬", "home": "🏠", "meat": "🥩", "more": "📦", "dairy": "🥛", "fruit-veg": "🥬" };
  const COLORS: Record<string, string> = { "doma_blue": "#4A90D9", "danger_red": "#E74C3C", "warning_yellow": "#F39C12", "success_green": "#27AE60", "family_sand": "#D7B98B" };
  
  const category = categoryModel ? {
    name: language === "pl" ? categoryModel.namePl : categoryModel.nameRu,
    icon: ICONS[categoryModel.iconKey] || "🛒",
    color: COLORS[categoryModel.colorKey] || "#6D5DF6"
  } : null;

  return {
    id: item.id,
    title: item.title,
    quantity: item.quantity ?? undefined,
    categoryId: item.categoryId,
    category: category?.name || text.categoryOther,
    categoryColor: category?.color,
    categoryIcon: category?.icon,
    purchased: item.status === "purchased",
    assignee: item.assignee,
    dueDate: item.dueDate,
    priority: item.priority,
    recurrence: item.recurrence,
    note: item.note,
    isTemplate: item.isTemplate
  };
}

export function shoppingCategoryName(
  categoryId: ShoppingCategoryId | null,
  categories: ShoppingCategory[],
  language: Language,
  text: ShoppingMapperCopy
) {
  const category = categories.find((item) => item.id === categoryId);
  return category ? (language === "pl" ? category.namePl : category.nameRu) : text.categoryOther;
}

export function shoppingCategoryLabelToId(categoryLabel: string, categories: ShoppingCategory[]) {
  const normalizedLabel = categoryLabel.trim().toLowerCase();
  const category = categories.find(
    (item) => item.nameRu.toLowerCase() === normalizedLabel || item.namePl.toLowerCase() === normalizedLabel
  );

  return category?.id ?? "cat-other";
}

export function getNextEvent(events: EventItem[], todayIso: string): EventItem | null {
  // Находим события на сегодня
  const todayEvents = events.filter(e => e.date.startsWith(todayIso));
  if (todayEvents.length === 0) return null;
  // В реальном приложении здесь будет сортировка по времени и фильтрация прошедших
  // Пока возвращаем первое ближайшее
  return todayEvents[0];
}

export function getTodayBriefing(events: EventItem[], tasks: TaskItem[], shopping: ShoppingItem[], todayIso: string) {
  // Поскольку в TodayScreen уже передаются отфильтрованные массивы на сегодняшний день,
  // мы можем просто взять их length.
  return { 
    eventsCount: events.length, 
    tasksCount: tasks.length, 
    shoppingCount: shopping.length 
  };
}

export function getFamilyPulse(tasks: TaskItem[], events: EventItem[], todayIso: string) {
  const tasksDoneToday = tasks.filter(t => t.completed).length; // В реальном приложении фильтруем по completedAt
  const eventsAhead = events.filter(e => e.date.startsWith(todayIso)).length; // Кол-во событий сегодня
  
  return { tasksDoneToday, eventsAhead };
}

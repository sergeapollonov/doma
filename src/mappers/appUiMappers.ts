import type {
  FamilyMemberId,
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

export function toTaskItem(task: HouseholdTask, text: TaskMapperCopy): TaskItem {
  return {
    id: task.id,
    title: task.title,
    assignee: memberIdToTaskAssignee(task.assigneeMemberId),
    due: dueDateToLabel(task.dueAt, text),
    reminder: task.reminderAt ? text.thirtyMin : text.noReminder,
    completed: task.status === "completed"
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
  return {
    id: item.id,
    title: item.title,
    quantity: item.quantity ?? undefined,
    categoryId: item.categoryId,
    category: shoppingCategoryName(item.categoryId, categories, language, text),
    purchased: item.status === "purchased"
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

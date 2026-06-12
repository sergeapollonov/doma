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
  TaskItem
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

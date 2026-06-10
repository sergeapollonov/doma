import type {
  CompleteHouseholdTaskInput,
  HouseholdTask,
  HouseholdTaskId,
  ISODateTimeString,
  NewHouseholdTaskInput,
  ReopenHouseholdTaskInput
} from "./types";

export function createHouseholdTask(
  input: NewHouseholdTaskInput,
  id: HouseholdTaskId,
  createdAt: ISODateTimeString
): HouseholdTask {
  return {
    id,
    familyId: input.familyId,
    title: input.title.trim(),
    description: input.description?.trim() || null,
    assigneeMemberId: input.assigneeMemberId ?? null,
    isShared: true,
    dueAt: input.dueAt ?? null,
    reminderAt: input.reminderAt ?? null,
    status: "active",
    priority: input.priority ?? "normal",
    createdBy: input.createdBy,
    updatedBy: null,
    completedBy: null,
    completedAt: null,
    createdAt,
    updatedAt: createdAt,
    deletedAt: null
  };
}

export function completeHouseholdTask(task: HouseholdTask, input: CompleteHouseholdTaskInput): HouseholdTask {
  if (task.id !== input.taskId || task.status === "completed") {
    return task;
  }

  return {
    ...task,
    status: "completed",
    completedBy: input.completedBy,
    completedAt: input.completedAt,
    updatedBy: input.completedBy,
    updatedAt: input.completedAt
  };
}

export function reopenHouseholdTask(task: HouseholdTask, input: ReopenHouseholdTaskInput): HouseholdTask {
  if (task.id !== input.taskId || task.status !== "completed") {
    return task;
  }

  return {
    ...task,
    status: "active",
    completedBy: null,
    completedAt: null,
    updatedBy: input.updatedBy,
    updatedAt: input.updatedAt
  };
}

export function isActiveHouseholdTask(task: HouseholdTask) {
  return task.status === "active" && task.deletedAt === null;
}

export function isCompletedHouseholdTask(task: HouseholdTask) {
  return task.status === "completed" && task.completedAt !== null;
}

export function isSharedHouseholdTask(task: HouseholdTask) {
  return task.isShared && task.assigneeMemberId === null;
}

export function isOverdueHouseholdTask(task: HouseholdTask, now: Date) {
  if (!isActiveHouseholdTask(task) || task.dueAt === null) {
    return false;
  }

  return new Date(task.dueAt).getTime() < now.getTime();
}

export function sortHouseholdTasksByPriorityAndDueDate(tasks: HouseholdTask[]) {
  const priorityRank: Record<HouseholdTask["priority"], number> = {
    high: 0,
    normal: 1,
    low: 2
  };

  return [...tasks].sort((first, second) => {
    const priorityDelta = priorityRank[first.priority] - priorityRank[second.priority];

    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    if (first.dueAt === null && second.dueAt === null) {
      return first.createdAt.localeCompare(second.createdAt);
    }

    if (first.dueAt === null) {
      return 1;
    }

    if (second.dueAt === null) {
      return -1;
    }

    return first.dueAt.localeCompare(second.dueAt);
  });
}

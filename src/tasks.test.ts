import { describe, expect, it } from "vitest";

import {
  completeHouseholdTask,
  createHouseholdTask,
  isActiveHouseholdTask,
  isCompletedHouseholdTask,
  reopenHouseholdTask
} from "./tasks";

describe("household task domain actions", () => {
  it("creates an active task with normalized optional fields", () => {
    const task = createHouseholdTask(
      {
        familyId: "family-1",
        title: "  Позвонить мастеру  ",
        assigneeMemberId: "member-alex",
        createdBy: "user-alex"
      },
      "task-test",
      "2026-06-04T09:00:00+02:00"
    );

    expect(task.title).toBe("Позвонить мастеру");
    expect(task.status).toBe("active");
    expect(task.description).toBeNull();
    expect(task.completedAt).toBeNull();
    expect(isActiveHouseholdTask(task)).toBe(true);
  });

  it("completes and reopens a task without mutating unrelated tasks", () => {
    const task = createHouseholdTask(
      {
        familyId: "family-1",
        title: "Оплатить интернет",
        createdBy: "user-alex"
      },
      "task-internet",
      "2026-06-04T09:00:00+02:00"
    );

    const completed = completeHouseholdTask(task, {
      taskId: "task-internet",
      completedBy: "user-maya",
      completedAt: "2026-06-04T10:00:00+02:00"
    });

    expect(completed.status).toBe("completed");
    expect(completed.completedBy).toBe("user-maya");
    expect(isCompletedHouseholdTask(completed)).toBe(true);

    const reopened = reopenHouseholdTask(completed, {
      taskId: "task-internet",
      updatedBy: "user-alex",
      updatedAt: "2026-06-04T10:05:00+02:00"
    });

    expect(reopened.status).toBe("active");
    expect(reopened.completedBy).toBeNull();
    expect(reopened.completedAt).toBeNull();
    expect(reopened.updatedBy).toBe("user-alex");
  });

  it("ignores completion input for a different task id", () => {
    const task = createHouseholdTask(
      {
        familyId: "family-1",
        title: "Купить подарок",
        createdBy: "user-alex"
      },
      "task-gift",
      "2026-06-04T09:00:00+02:00"
    );

    expect(
      completeHouseholdTask(task, {
        taskId: "task-other",
        completedBy: "user-alex",
        completedAt: "2026-06-04T10:00:00+02:00"
      })
    ).toBe(task);
  });
});

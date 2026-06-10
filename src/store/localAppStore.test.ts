import { beforeEach, describe, expect, it } from "vitest";

import { useLocalAppStore } from "./localAppStore";

describe("local app Zustand store", () => {
  beforeEach(() => {
    useLocalAppStore.getState().reset();
  });

  it("updates language and selected date through store actions", () => {
    useLocalAppStore.getState().setLanguage("pl");
    useLocalAppStore.getState().selectDate("2026-06-05");

    expect(useLocalAppStore.getState().language).toBe("pl");
    expect(useLocalAppStore.getState().selectedDate).toBe("2026-06-05");
  });

  it("adds events and moves selected date when provided", () => {
    const initialEventCount = useLocalAppStore.getState().events.length;

    useLocalAppStore.getState().addEvent(
      {
        id: "event-store-test",
        title: "Семейный завтрак",
        date: "4 июня",
        time: "09:00",
        participants: ["alex", "maya"],
        reminder: "За 30 минут"
      },
      "2026-06-04"
    );

    expect(useLocalAppStore.getState().events).toHaveLength(initialEventCount + 1);
    expect(useLocalAppStore.getState().selectedDate).toBe("2026-06-04");
  });

  it("adds and completes a task through store actions", () => {
    const state = useLocalAppStore.getState();

    state.addHouseholdTask({
      id: "task-store-test",
      familyId: state.familyId,
      title: "Проверить список",
      assigneeMemberId: "member-alex",
      createdBy: state.currentUserId,
      createdAt: "2026-06-04T09:00:00+02:00"
    });

    useLocalAppStore.getState().completeTask({
      taskId: "task-store-test",
      completedBy: state.currentUserId,
      completedAt: "2026-06-04T10:00:00+02:00"
    });

    expect(useLocalAppStore.getState().householdTasks[0].status).toBe("completed");
  });
});

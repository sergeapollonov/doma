import { describe, expect, it } from "vitest";

import {
  addEvent,
  addHouseholdTask,
  addShoppingItem,
  completeTask,
  createInitialLocalAppState,
  purchaseShoppingItem,
  reopenTask,
  selectDate,
  setLanguage,
  unpurchaseShoppingItem
} from "./appState";

describe("local app state actions", () => {
  it("creates deterministic privacy-safe local app state copies", () => {
    const firstState = createInitialLocalAppState();
    const secondState = createInitialLocalAppState();

    expect(firstState.familyId).toBe("family-1");
    expect(firstState.currentUserId).toBe("user-alex");
    expect(firstState.selectedDate).toBe("2026-06-03");
    expect(firstState.language).toBe("ru");
    expect(firstState.events[0].id).toBe("event-1");
    expect(firstState.householdTasks[0].id).toBe("task-1");
    expect(firstState.shoppingList.items[0].id).toBe("shop-1");
    expect(firstState.events).not.toBe(secondState.events);
    expect(firstState.householdTasks).not.toBe(secondState.householdTasks);
    expect(firstState.shoppingList.items).not.toBe(secondState.shoppingList.items);
  });

  it("updates language and selected date", () => {
    const state = createInitialLocalAppState();
    const languageState = setLanguage(state, "pl");
    const dateState = selectDate(languageState, "2026-06-05");

    expect(languageState.language).toBe("pl");
    expect(dateState.selectedDate).toBe("2026-06-05");
  });

  it("adds local events and optionally moves the selected date", () => {
    const state = createInitialLocalAppState();
    const withEvent = addEvent(
      state,
      {
        id: "event-local-test",
        title: "Семейный завтрак",
        date: "4 июня",
        time: "09:00",
        participants: ["alex", "maya"],
        reminder: "За 30 минут"
      },
      "2026-06-04"
    );
    const withoutDateMove = addEvent(withEvent, {
      id: "event-local-test-2",
      title: "Звонок",
      date: "5 июня",
      time: "12:00",
      participants: ["alex"],
      reminder: "За 30 минут"
    });

    expect(withEvent.events).toHaveLength(state.events.length + 1);
    expect(withEvent.events.at(-1)?.id).toBe("event-local-test");
    expect(withEvent.selectedDate).toBe("2026-06-04");
    expect(withoutDateMove.selectedDate).toBe("2026-06-04");
  });

  it("adds, completes, and reopens household tasks", () => {
    const state = createInitialLocalAppState();
    const withTask = addHouseholdTask(state, {
      id: "task-local-test",
      familyId: state.familyId,
      title: "Собрать документы",
      assigneeMemberId: "member-alex",
      dueAt: "2026-06-04T18:00:00+02:00",
      createdBy: state.currentUserId,
      createdAt: "2026-06-04T09:00:00+02:00"
    });

    expect(withTask.householdTasks[0].id).toBe("task-local-test");

    const completed = completeTask(withTask, {
      taskId: "task-local-test",
      completedBy: state.currentUserId,
      completedAt: "2026-06-04T19:00:00+02:00"
    });

    expect(completed.householdTasks[0].status).toBe("completed");

    const reopened = reopenTask(completed, {
      taskId: "task-local-test",
      updatedBy: state.currentUserId,
      updatedAt: "2026-06-04T19:05:00+02:00"
    });

    expect(reopened.householdTasks[0].status).toBe("active");
  });

  it("adds, purchases, and unpurchases shopping items", () => {
    const state = createInitialLocalAppState();
    const withItem = addShoppingItem(state, {
      id: "shop-local-test",
      familyId: state.familyId,
      categoryId: "cat-home",
      title: "Салфетки",
      quantity: "1 уп",
      createdBy: state.currentUserId,
      createdAt: "2026-06-04T09:00:00+02:00"
    });

    expect(withItem.shoppingList.items[0].id).toBe("shop-local-test");

    const purchased = purchaseShoppingItem(withItem, {
      itemId: "shop-local-test",
      purchasedBy: state.currentUserId,
      purchasedAt: "2026-06-04T09:30:00+02:00"
    });

    expect(purchased.shoppingList.items[0].status).toBe("purchased");

    const active = unpurchaseShoppingItem(purchased, {
      itemId: "shop-local-test",
      updatedBy: state.currentUserId,
      updatedAt: "2026-06-04T09:35:00+02:00"
    });

    expect(active.shoppingList.items[0].status).toBe("active");
  });
});

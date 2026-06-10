import { describe, expect, it } from "vitest";

import {
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
  it("updates language and selected date", () => {
    const state = createInitialLocalAppState();
    const languageState = setLanguage(state, "pl");
    const dateState = selectDate(languageState, "2026-06-05");

    expect(languageState.language).toBe("pl");
    expect(dateState.selectedDate).toBe("2026-06-05");
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

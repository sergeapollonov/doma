import { describe, expect, it } from "vitest";

import { initialHouseholdTasks, initialShoppingCategories, initialShoppingListItems } from "../data";
import { copy } from "../i18n";
import {
  dueLabelToDateTime,
  shoppingCategoryLabelToId,
  shoppingCategoryName,
  taskAssigneeToMemberId,
  toShoppingItem,
  toTaskItem
} from "./appUiMappers";

describe("app UI mappers", () => {
  it("maps household tasks to task rows", () => {
    expect(taskAssigneeToMemberId.alex).toBe("member-alex");
    expect(dueLabelToDateTime(copy.ru.noDue, copy.ru)).toBeNull();
    expect(dueLabelToDateTime(copy.ru.dueJune5, copy.ru)).toBe("2026-06-05T18:00:00+02:00");

    const mapped = toTaskItem(initialHouseholdTasks[0], copy.ru);
    expect(mapped).toMatchObject({
      id: "task-1",
      title: "Оплатить интернет",
      assignee: "alex",
      completed: false,
      priority: "high",
      isOverdue: true
    });

    // task-6 is "Полить цветы" (completed), index 5
    expect(toTaskItem(initialHouseholdTasks[5], copy.ru).completed).toBe(true);
  });

  it("maps shopping items and localized category labels", () => {
    expect(shoppingCategoryName("cat-dairy", initialShoppingCategories, "ru", copy.ru)).toBe("Молочное");
    expect(shoppingCategoryName("cat-dairy", initialShoppingCategories, "pl", copy.pl)).toBe("Nabiał");
    expect(shoppingCategoryLabelToId("nabiał", initialShoppingCategories)).toBe("cat-dairy");
    expect(shoppingCategoryLabelToId("unknown", initialShoppingCategories)).toBe("cat-other");

    expect(toShoppingItem(initialShoppingListItems[0], initialShoppingCategories, "ru", copy.ru)).toMatchObject({
      id: "shop-1",
      title: "Молоко",
      categoryId: "cat-dairy",
      category: "Молочное",
      purchased: false
    });
  });
});

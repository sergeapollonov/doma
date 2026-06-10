import { describe, expect, it } from "vitest";

import {
  createShoppingListItem,
  isActiveShoppingListItem,
  isPurchasedShoppingListItem,
  purchaseShoppingListItem,
  sortShoppingItemsByStatusAndOrder,
  unpurchaseShoppingListItem
} from "./shopping";

describe("shopping list domain actions", () => {
  it("creates active shopping items with normalized optional fields", () => {
    const item = createShoppingListItem(
      {
        familyId: "family-1",
        categoryId: "cat-dairy",
        title: "  Молоко  ",
        quantity: "  2 л  ",
        createdBy: "user-maya"
      },
      "shop-milk",
      "2026-06-04T09:00:00+02:00"
    );

    expect(item.title).toBe("Молоко");
    expect(item.quantity).toBe("2 л");
    expect(item.status).toBe("active");
    expect(isActiveShoppingListItem(item)).toBe(true);
  });

  it("purchases and unpurchases an item", () => {
    const item = createShoppingListItem(
      {
        familyId: "family-1",
        title: "Салфетки",
        createdBy: "user-alex"
      },
      "shop-napkins",
      "2026-06-04T09:00:00+02:00"
    );

    const purchased = purchaseShoppingListItem(item, {
      itemId: "shop-napkins",
      purchasedBy: "user-maya",
      purchasedAt: "2026-06-04T09:30:00+02:00"
    });

    expect(purchased.status).toBe("purchased");
    expect(purchased.purchasedBy).toBe("user-maya");
    expect(isPurchasedShoppingListItem(purchased)).toBe(true);

    const active = unpurchaseShoppingListItem(purchased, {
      itemId: "shop-napkins",
      updatedBy: "user-alex",
      updatedAt: "2026-06-04T09:35:00+02:00"
    });

    expect(active.status).toBe("active");
    expect(active.purchasedBy).toBeNull();
    expect(active.purchasedAt).toBeNull();
  });

  it("sorts active items before purchased items", () => {
    const first = createShoppingListItem(
      {
        familyId: "family-1",
        title: "Хлеб",
        sortOrder: 1,
        createdBy: "user-alex"
      },
      "shop-bread",
      "2026-06-04T09:00:00+02:00"
    );
    const second = purchaseShoppingListItem(
      createShoppingListItem(
        {
          familyId: "family-1",
          title: "Кофе",
          sortOrder: 0,
          createdBy: "user-alex"
        },
        "shop-coffee",
        "2026-06-04T09:01:00+02:00"
      ),
      {
        itemId: "shop-coffee",
        purchasedBy: "user-alex",
        purchasedAt: "2026-06-04T09:30:00+02:00"
      }
    );

    expect(sortShoppingItemsByStatusAndOrder([second, first]).map((item) => item.id)).toEqual([
      "shop-bread",
      "shop-coffee"
    ]);
  });
});

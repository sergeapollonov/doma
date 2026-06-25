import type {
  DeleteShoppingListItemInput,
  NewShoppingListItemInput,
  PurchaseShoppingListItemInput,
  ShoppingCategoryId,
  ShoppingItemId,
  ShoppingListItem,
  ISODateTimeString,
  UnpurchaseShoppingListItemInput,
  UpdateShoppingListItemInput
} from "./types";

export function createShoppingListItem(
  input: NewShoppingListItemInput,
  id: ShoppingItemId,
  createdAt: ISODateTimeString
): ShoppingListItem {
  return {
    id,
    familyId: input.familyId,
    categoryId: input.categoryId ?? null,
    title: input.title.trim(),
    quantity: input.quantity?.trim() || null,
    note: input.note?.trim() || null,
    status: "active",
    sortOrder: input.sortOrder ?? 0,
    createdBy: input.createdBy,
    updatedBy: null,
    purchasedBy: null,
    purchasedAt: null,
    createdAt,
    updatedAt: createdAt,
    deletedAt: null
  };
}

export function purchaseShoppingListItem(
  item: ShoppingListItem,
  input: PurchaseShoppingListItemInput
): ShoppingListItem {
  if (item.id !== input.itemId || item.status === "purchased") {
    return item;
  }

  return {
    ...item,
    status: "purchased",
    purchasedBy: input.purchasedBy,
    purchasedAt: input.purchasedAt,
    updatedBy: input.purchasedBy,
    updatedAt: input.purchasedAt
  };
}

export function unpurchaseShoppingListItem(
  item: ShoppingListItem,
  input: UnpurchaseShoppingListItemInput
): ShoppingListItem {
  if (item.id !== input.itemId || item.status !== "purchased") {
    return item;
  }

  return {
    ...item,
    status: "active",
    purchasedBy: null,
    purchasedAt: null,
    updatedBy: input.updatedBy,
    updatedAt: input.updatedAt
  };
}

export function updateShoppingListItem(
  item: ShoppingListItem,
  input: UpdateShoppingListItemInput
): ShoppingListItem {
  if (item.id !== input.itemId) {
    return item;
  }

  return {
    ...item,
    ...(input.title !== undefined && { title: input.title.trim() }),
    ...(input.quantity !== undefined && { quantity: input.quantity?.trim() || null }),
    ...(input.categoryId !== undefined && { categoryId: input.categoryId }),
    ...(input.note !== undefined && { note: input.note?.trim() || null }),
    ...(input.assignee !== undefined && { assignee: input.assignee }),
    ...(input.dueDate !== undefined && { dueDate: input.dueDate }),
    ...(input.priority !== undefined && { priority: input.priority }),
    ...(input.recurrence !== undefined && { recurrence: input.recurrence }),
    ...(input.isTemplate !== undefined && { isTemplate: input.isTemplate }),
    updatedBy: input.updatedBy,
    updatedAt: input.updatedAt
  };
}

export function deleteShoppingListItem(
  item: ShoppingListItem,
  input: DeleteShoppingListItemInput
): ShoppingListItem {
  if (item.id !== input.itemId) {
    return item;
  }

  return {
    ...item,
    deletedAt: input.deletedAt,
    updatedBy: input.deletedBy,
    updatedAt: input.deletedAt
  };
}

export function isActiveShoppingListItem(item: ShoppingListItem) {
  return item.status === "active" && item.deletedAt === null;
}

export function isPurchasedShoppingListItem(item: ShoppingListItem) {
  return item.status === "purchased" && item.purchasedAt !== null;
}

export function groupShoppingItemsByCategory(items: ShoppingListItem[]) {
  return items.reduce<Partial<Record<ShoppingCategoryId | "uncategorized", ShoppingListItem[]>>>((groups, item) => {
    const categoryKey = item.categoryId ?? "uncategorized";
    groups[categoryKey] = [...(groups[categoryKey] ?? []), item];
    return groups;
  }, {});
}

export function sortShoppingItemsByStatusAndOrder(items: ShoppingListItem[]) {
  const statusRank: Record<ShoppingListItem["status"], number> = {
    active: 0,
    purchased: 1,
    archived: 2
  };

  return [...items].sort((first, second) => {
    const statusDelta = statusRank[first.status] - statusRank[second.status];

    if (statusDelta !== 0) {
      return statusDelta;
    }

    const orderDelta = first.sortOrder - second.sortOrder;

    if (orderDelta !== 0) {
      return orderDelta;
    }

    return first.createdAt.localeCompare(second.createdAt);
  });
}

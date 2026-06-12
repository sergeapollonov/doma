import type { HouseholdTaskId, ShoppingItemId } from "../types";

export function createHouseholdTaskId(timestamp = Date.now()): HouseholdTaskId {
  return `task-${timestamp}` as HouseholdTaskId;
}

export function createShoppingItemId(title: string, timestamp = Date.now()): ShoppingItemId {
  return `shop-${timestamp}-${title.toLowerCase().replace(/\s+/g, "-")}` as ShoppingItemId;
}

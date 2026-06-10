import {
  initialEvents,
  initialHouseholdTasks,
  initialShoppingListState
} from "../data";
import { completeHouseholdTask, createHouseholdTask, reopenHouseholdTask } from "../tasks";
import { createShoppingListItem, purchaseShoppingListItem, unpurchaseShoppingListItem } from "../shopping";
import type {
  AddHouseholdTaskActionInput,
  AddShoppingListItemActionInput,
  CompleteHouseholdTaskInput,
  FamilyId,
  ISODateString,
  Language,
  LocalAppState,
  PurchaseShoppingListItemInput,
  ReopenHouseholdTaskInput,
  UnpurchaseShoppingListItemInput,
  UserId
} from "../types";

export const defaultFamilyId: FamilyId = "family-1";
export const defaultCurrentUserId: UserId = "user-alex";
export const defaultSelectedDate: ISODateString = "2026-06-03";
export const defaultLanguage: Language = "ru";

export function createInitialLocalAppState(): LocalAppState {
  return {
    language: defaultLanguage,
    familyId: defaultFamilyId,
    currentUserId: defaultCurrentUserId,
    selectedDate: defaultSelectedDate,
    events: [...initialEvents],
    householdTasks: [...initialHouseholdTasks],
    shoppingList: {
      categories: [...initialShoppingListState.categories],
      items: [...initialShoppingListState.items],
      frequentItemTitles: [...initialShoppingListState.frequentItemTitles]
    }
  };
}

export function setLanguage(state: LocalAppState, language: Language): LocalAppState {
  return {
    ...state,
    language
  };
}

export function selectDate(state: LocalAppState, selectedDate: ISODateString): LocalAppState {
  return {
    ...state,
    selectedDate
  };
}

export function addHouseholdTask(state: LocalAppState, input: AddHouseholdTaskActionInput): LocalAppState {
  const task = createHouseholdTask(input, input.id, input.createdAt);

  return {
    ...state,
    householdTasks: [task, ...state.householdTasks]
  };
}

export function completeTask(state: LocalAppState, input: CompleteHouseholdTaskInput): LocalAppState {
  return {
    ...state,
    householdTasks: state.householdTasks.map((task) => completeHouseholdTask(task, input))
  };
}

export function reopenTask(state: LocalAppState, input: ReopenHouseholdTaskInput): LocalAppState {
  return {
    ...state,
    householdTasks: state.householdTasks.map((task) => reopenHouseholdTask(task, input))
  };
}

export function addShoppingItem(state: LocalAppState, input: AddShoppingListItemActionInput): LocalAppState {
  const item = createShoppingListItem(input, input.id, input.createdAt);

  return {
    ...state,
    shoppingList: {
      ...state.shoppingList,
      items: [item, ...state.shoppingList.items]
    }
  };
}

export function purchaseShoppingItem(state: LocalAppState, input: PurchaseShoppingListItemInput): LocalAppState {
  return {
    ...state,
    shoppingList: {
      ...state.shoppingList,
      items: state.shoppingList.items.map((item) => purchaseShoppingListItem(item, input))
    }
  };
}

export function unpurchaseShoppingItem(state: LocalAppState, input: UnpurchaseShoppingListItemInput): LocalAppState {
  return {
    ...state,
    shoppingList: {
      ...state.shoppingList,
      items: state.shoppingList.items.map((item) => unpurchaseShoppingListItem(item, input))
    }
  };
}

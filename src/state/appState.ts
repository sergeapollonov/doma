import {
  initialEvents,
  initialHouseholdTasks,
  initialShoppingListState
} from "../data";
import { completeHouseholdTask, createHouseholdTask, deleteHouseholdTask, reopenHouseholdTask, updateHouseholdTask } from "../tasks";
import { createShoppingListItem, purchaseShoppingListItem, unpurchaseShoppingListItem, updateShoppingListItem, deleteShoppingListItem } from "../shopping";
import type {
  AddHouseholdTaskActionInput,
  AddShoppingListItemActionInput,
  CompleteHouseholdTaskInput,
  DeleteHouseholdTaskInput,
  DeleteShoppingListItemInput,
  EventItem,
  FamilyId,
  ISODateString,
  Language,
  LocalAppState,
  PurchaseShoppingListItemInput,
  ReopenHouseholdTaskInput,
  UnpurchaseShoppingListItemInput,
  UpdateHouseholdTaskInput,
  UpdateShoppingListItemInput,
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
      frequentItemTitles: [...initialShoppingListState.frequentItemTitles],
      templates: [...(initialShoppingListState.templates || [])]
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

export function addEvent(state: LocalAppState, event: EventItem, selectedDate?: ISODateString | null): LocalAppState {
  return {
    ...state,
    selectedDate: selectedDate ?? state.selectedDate,
    events: [...state.events, event]
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

export function updateShoppingItem(state: LocalAppState, input: UpdateShoppingListItemInput): LocalAppState {
  return {
    ...state,
    shoppingList: {
      ...state.shoppingList,
      items: state.shoppingList.items.map((item) => updateShoppingListItem(item, input))
    }
  };
}

export function deleteShoppingItem(state: LocalAppState, input: DeleteShoppingListItemInput): LocalAppState {
  return {
    ...state,
    shoppingList: {
      ...state.shoppingList,
      items: state.shoppingList.items.map((item) => deleteShoppingListItem(item, input))
    }
  };
}

export function updateTask(state: LocalAppState, input: UpdateHouseholdTaskInput): LocalAppState {
  return {
    ...state,
    householdTasks: state.householdTasks.map((task) => updateHouseholdTask(task, input))
  };
}

export function deleteTask(state: LocalAppState, input: DeleteHouseholdTaskInput): LocalAppState {
  return {
    ...state,
    householdTasks: state.householdTasks.map((task) => deleteHouseholdTask(task, input))
  };
}

export function applyShoppingTemplate(state: LocalAppState, templateId: string): LocalAppState {
  const template = state.shoppingList.templates.find(t => t.id === templateId);
  if (!template || !template.items || template.items.length === 0) {
    return state;
  }

  const now = new Date().toISOString();
  const currentItems = state.shoppingList.items;
  
  // Find items that are NOT already in the active list
  const newItemsToCreate = template.items.filter(templateItem => {
    // Check if there is an active (not purchased, not deleted) item with the same title
    const existingActive = currentItems.find(i => 
      i.title.toLowerCase() === templateItem.title.toLowerCase() && 
      i.status === "active" && 
      i.deletedAt === null
    );
    return !existingActive; // Keep if NO active item exists (prevent duplicates)
  });

  const generatedItems = newItemsToCreate.map((item, index) => {
    return createShoppingListItem({
      familyId: state.familyId,
      title: item.title,
      quantity: item.quantity,
      categoryId: item.categoryId as any,
      createdBy: state.currentUserId,
    }, `shop-tpl-gen-${Date.now()}-${index}` as any, now as any);
  });

  if (generatedItems.length === 0) {
    return state; // Nothing new to add
  }

  return {
    ...state,
    shoppingList: {
      ...state.shoppingList,
      items: [...generatedItems, ...state.shoppingList.items]
    }
  };
}

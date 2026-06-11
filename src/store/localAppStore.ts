import { create } from "zustand";

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
} from "../state/appState";
import type {
  AddHouseholdTaskActionInput,
  AddShoppingListItemActionInput,
  CompleteHouseholdTaskInput,
  EventItem,
  ISODateString,
  Language,
  LocalAppState,
  PurchaseShoppingListItemInput,
  ReopenHouseholdTaskInput,
  UnpurchaseShoppingListItemInput
} from "../types";

type LocalAppStore = LocalAppState & {
  reset: () => void;
  setLanguage: (language: Language) => void;
  selectDate: (selectedDate: ISODateString) => void;
  addEvent: (event: EventItem, selectedDate?: ISODateString | null) => void;
  addHouseholdTask: (input: AddHouseholdTaskActionInput) => void;
  completeTask: (input: CompleteHouseholdTaskInput) => void;
  reopenTask: (input: ReopenHouseholdTaskInput) => void;
  addShoppingItem: (input: AddShoppingListItemActionInput) => void;
  purchaseShoppingItem: (input: PurchaseShoppingListItemInput) => void;
  unpurchaseShoppingItem: (input: UnpurchaseShoppingListItemInput) => void;
};

export const useLocalAppStore = create<LocalAppStore>((set) => ({
  ...createInitialLocalAppState(),
  reset: () => set(createInitialLocalAppState()),
  setLanguage: (language) => set((state) => setLanguage(state, language)),
  selectDate: (selectedDate) => set((state) => selectDate(state, selectedDate)),
  addEvent: (event, selectedDate) => set((state) => addEvent(state, event, selectedDate)),
  addHouseholdTask: (input) => set((state) => addHouseholdTask(state, input)),
  completeTask: (input) => set((state) => completeTask(state, input)),
  reopenTask: (input) => set((state) => reopenTask(state, input)),
  addShoppingItem: (input) => set((state) => addShoppingItem(state, input)),
  purchaseShoppingItem: (input) => set((state) => purchaseShoppingItem(state, input)),
  unpurchaseShoppingItem: (input) => set((state) => unpurchaseShoppingItem(state, input))
}));

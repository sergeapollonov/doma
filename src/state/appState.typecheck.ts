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
import type {
  AddHouseholdTaskActionInput,
  AddShoppingListItemActionInput,
  CompleteHouseholdTaskInput,
  EventItem,
  LocalAppState,
  PurchaseShoppingListItemInput,
  ReopenHouseholdTaskInput,
  UnpurchaseShoppingListItemInput
} from "../types";

type Expect<T extends true> = T;
type IsAssignable<Actual, Expected> = Actual extends Expected ? true : false;

const initialState: LocalAppState = createInitialLocalAppState();

type _InitialStateMatchesLocalAppState = Expect<IsAssignable<typeof initialState, LocalAppState>>;

const languageState: LocalAppState = setLanguage(initialState, "pl");
const selectedDateState: LocalAppState = selectDate(languageState, "2026-06-04");

const eventInput: EventItem = {
  id: "event-state-typecheck",
  title: "Семейный завтрак",
  date: "4 июня",
  time: "09:00",
  participants: ["alex", "maya"],
  reminder: "За 30 минут"
};

const eventState: LocalAppState = addEvent(selectedDateState, eventInput, "2026-06-04");

const addTaskInput: AddHouseholdTaskActionInput = {
  id: "task-state-typecheck",
  familyId: "family-1",
  title: "Собрать документы",
  assigneeMemberId: "member-alex",
  dueAt: "2026-06-04T18:00:00+02:00",
  createdBy: "user-alex",
  createdAt: "2026-06-04T09:00:00+02:00"
};

const taskState: LocalAppState = addHouseholdTask(eventState, addTaskInput);

const completeTaskInput: CompleteHouseholdTaskInput = {
  taskId: "task-state-typecheck",
  completedBy: "user-alex",
  completedAt: "2026-06-04T19:00:00+02:00"
};

const completedTaskState: LocalAppState = completeTask(taskState, completeTaskInput);

const reopenTaskInput: ReopenHouseholdTaskInput = {
  taskId: "task-state-typecheck",
  updatedBy: "user-alex",
  updatedAt: "2026-06-04T19:05:00+02:00"
};

const reopenedTaskState: LocalAppState = reopenTask(completedTaskState, reopenTaskInput);

const addShoppingInput: AddShoppingListItemActionInput = {
  id: "shop-state-typecheck",
  familyId: "family-1",
  categoryId: "cat-home",
  title: "Салфетки",
  quantity: "1 уп",
  createdBy: "user-maya",
  createdAt: "2026-06-04T09:05:00+02:00"
};

const shoppingState: LocalAppState = addShoppingItem(reopenedTaskState, addShoppingInput);

const purchaseShoppingInput: PurchaseShoppingListItemInput = {
  itemId: "shop-state-typecheck",
  purchasedBy: "user-maya",
  purchasedAt: "2026-06-04T09:30:00+02:00"
};

const purchasedShoppingState: LocalAppState = purchaseShoppingItem(shoppingState, purchaseShoppingInput);

const unpurchaseShoppingInput: UnpurchaseShoppingListItemInput = {
  itemId: "shop-state-typecheck",
  updatedBy: "user-maya",
  updatedAt: "2026-06-04T09:35:00+02:00"
};

const activeShoppingState: LocalAppState = unpurchaseShoppingItem(purchasedShoppingState, unpurchaseShoppingInput);

void activeShoppingState;

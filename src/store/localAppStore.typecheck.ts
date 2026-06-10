import { useLocalAppStore } from "./localAppStore";
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

const storeState = useLocalAppStore.getState();

type _StoreStateMatchesLocalAppState = Expect<IsAssignable<typeof storeState, LocalAppState>>;

const eventInput: EventItem = {
  id: "event-store-typecheck",
  title: "Семейный завтрак",
  date: "4 июня",
  time: "09:00",
  participants: ["alex", "maya"],
  reminder: "За 30 минут"
};

const addTaskInput: AddHouseholdTaskActionInput = {
  id: "task-store-typecheck",
  familyId: "family-1",
  title: "Проверить календарь",
  assigneeMemberId: "member-alex",
  dueAt: "2026-06-04T18:00:00+02:00",
  createdBy: "user-alex",
  createdAt: "2026-06-04T09:00:00+02:00"
};

const completeTaskInput: CompleteHouseholdTaskInput = {
  taskId: "task-store-typecheck",
  completedBy: "user-alex",
  completedAt: "2026-06-04T19:00:00+02:00"
};

const reopenTaskInput: ReopenHouseholdTaskInput = {
  taskId: "task-store-typecheck",
  updatedBy: "user-alex",
  updatedAt: "2026-06-04T19:05:00+02:00"
};

const addShoppingInput: AddShoppingListItemActionInput = {
  id: "shop-store-typecheck",
  familyId: "family-1",
  categoryId: "cat-home",
  title: "Салфетки",
  quantity: "1 уп",
  createdBy: "user-maya",
  createdAt: "2026-06-04T09:05:00+02:00"
};

const purchaseShoppingInput: PurchaseShoppingListItemInput = {
  itemId: "shop-store-typecheck",
  purchasedBy: "user-maya",
  purchasedAt: "2026-06-04T09:30:00+02:00"
};

const unpurchaseShoppingInput: UnpurchaseShoppingListItemInput = {
  itemId: "shop-store-typecheck",
  updatedBy: "user-maya",
  updatedAt: "2026-06-04T09:35:00+02:00"
};

storeState.addEvent(eventInput, "2026-06-04");
storeState.addHouseholdTask(addTaskInput);
storeState.completeTask(completeTaskInput);
storeState.reopenTask(reopenTaskInput);
storeState.addShoppingItem(addShoppingInput);
storeState.purchaseShoppingItem(purchaseShoppingInput);
storeState.unpurchaseShoppingItem(unpurchaseShoppingInput);
storeState.setLanguage("pl");
storeState.selectDate("2026-06-05");

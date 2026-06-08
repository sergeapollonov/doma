import {
  initialEvents,
  initialHouseholdTasks,
  initialShopping,
  initialShoppingCategories,
  initialShoppingListItems,
  initialShoppingListState,
  initialTasks,
  people
} from "./data";
import { completeHouseholdTask, createHouseholdTask } from "./tasks";
import { createShoppingListItem, purchaseShoppingListItem } from "./shopping";
import type {
  CompleteHouseholdTaskInput,
  EventItem,
  HouseholdTask,
  NewHouseholdTaskInput,
  NewShoppingListItemInput,
  PersonId,
  PurchaseShoppingListItemInput,
  ShoppingCategory,
  ShoppingItem,
  ShoppingListItem,
  ShoppingListState,
  TaskItem
} from "./types";

type Expect<T extends true> = T;
type IsAssignable<Actual, Expected> = Actual extends Expected ? true : false;

type _PeopleUseKnownPersonIds = Expect<IsAssignable<keyof typeof people, PersonId>>;
type _EventsMatchUiModel = Expect<IsAssignable<(typeof initialEvents)[number], EventItem>>;
type _TasksMatchUiModel = Expect<IsAssignable<(typeof initialTasks)[number], TaskItem>>;
type _ShoppingMatchesUiModel = Expect<IsAssignable<(typeof initialShopping)[number], ShoppingItem>>;
type _HouseholdTasksMatchDomainModel = Expect<IsAssignable<(typeof initialHouseholdTasks)[number], HouseholdTask>>;
type _ShoppingCategoriesMatchDomainModel = Expect<
  IsAssignable<(typeof initialShoppingCategories)[number], ShoppingCategory>
>;
type _ShoppingItemsMatchDomainModel = Expect<IsAssignable<(typeof initialShoppingListItems)[number], ShoppingListItem>>;
type _ShoppingStateMatchesDomainModel = Expect<IsAssignable<typeof initialShoppingListState, ShoppingListState>>;

const newTaskInput: NewHouseholdTaskInput = {
  familyId: "family-1",
  title: "Проверить список дел",
  assigneeMemberId: "member-alex",
  dueAt: "2026-06-04T10:00:00+02:00",
  createdBy: "user-alex"
};

const createdTask: HouseholdTask = createHouseholdTask(
  newTaskInput,
  "task-typecheck",
  "2026-06-04T09:00:00+02:00"
);

const completeTaskInput: CompleteHouseholdTaskInput = {
  taskId: createdTask.id,
  completedBy: "user-alex",
  completedAt: "2026-06-04T11:00:00+02:00"
};

const completedTask: HouseholdTask = completeHouseholdTask(createdTask, completeTaskInput);

const newShoppingItemInput: NewShoppingListItemInput = {
  familyId: "family-1",
  categoryId: "cat-dairy",
  title: "Йогурт",
  quantity: "4 шт",
  createdBy: "user-maya"
};

const createdShoppingItem: ShoppingListItem = createShoppingListItem(
  newShoppingItemInput,
  "shop-typecheck",
  "2026-06-04T09:00:00+02:00"
);

const purchaseShoppingItemInput: PurchaseShoppingListItemInput = {
  itemId: createdShoppingItem.id,
  purchasedBy: "user-maya",
  purchasedAt: "2026-06-04T09:30:00+02:00"
};

const purchasedShoppingItem: ShoppingListItem = purchaseShoppingListItem(createdShoppingItem, purchaseShoppingItemInput);

void completedTask;
void purchasedShoppingItem;

export type Language = "ru" | "pl";

export type UserId = `user-${string}`;

export type FamilyId = `family-${string}`;

export type FamilyMemberId = `member-${string}`;

export type PersonId = "alex" | "maya";

export type TabKey = "today" | "calendar" | "tasks" | "shopping";

export type ISODateTimeString = `${number}-${number}-${number}T${string}`;

export type ISODateString = `${number}-${number}-${number}`;

export type HouseholdTaskId = `task-${string}`;

export type HouseholdTaskStatus = "active" | "completed" | "archived";

export type HouseholdTaskPriority = "low" | "normal" | "high";

export type HouseholdAreaId = "area-home" | "area-car" | "area-child" | "area-pet" | "area-finance";

export type RecurrenceType = "daily" | "weekly" | "monthly" | "custom";

export type RecurrenceRule = {
  type: RecurrenceType;
  interval: number;
};

export type HouseholdArea = {
  id: HouseholdAreaId;
  emoji: string;
  nameRu: string;
  namePl: string;
};

export type TaskSubtask = {
  id: string;
  title: string;
  completed: boolean;
};

export type TaskComment = {
  id: string;
  authorId: PersonId;
  text: string;
  createdAt: ISODateTimeString;
};

export type TaskHistoryEntry = {
  id: string;
  type: "created" | "due_changed" | "comment_added" | "completed" | "reopened" | "assigned";
  actorId: PersonId;
  createdAt: ISODateTimeString;
  details?: string;
};

export type ShoppingCategoryId = `cat-${string}`;

export type ShoppingItemId = `shop-${string}`;

export type ShoppingItemStatus = "active" | "purchased" | "archived";

export type SelectedDateKey = ISODateString;

export type HouseholdTask = {
  id: HouseholdTaskId;
  familyId: FamilyId;
  title: string;
  description: string | null;
  assigneeMemberId: FamilyMemberId | null;
  isShared: boolean;
  dueAt: ISODateTimeString | null;
  reminderAt: ISODateTimeString | null;
  status: HouseholdTaskStatus;
  priority: HouseholdTaskPriority;
  categoryId: HouseholdAreaId | null;
  recurrence: RecurrenceRule | null;
  subtasks: TaskSubtask[];
  comments: TaskComment[];
  history: TaskHistoryEntry[];
  createdBy: UserId;
  updatedBy: UserId | null;
  completedBy: UserId | null;
  completedAt: ISODateTimeString | null;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
  deletedAt: ISODateTimeString | null;
};

export type NewHouseholdTaskInput = {
  familyId: FamilyId;
  title: string;
  description?: string;
  assigneeMemberId?: FamilyMemberId | null;
  dueAt?: ISODateTimeString | null;
  reminderAt?: ISODateTimeString | null;
  priority?: HouseholdTaskPriority;
  createdBy: UserId;
};

export type CompleteHouseholdTaskInput = {
  taskId: HouseholdTaskId;
  completedBy: UserId;
  completedAt: ISODateTimeString;
};

export type ReopenHouseholdTaskInput = {
  taskId: HouseholdTaskId;
  updatedBy: UserId;
  updatedAt: ISODateTimeString;
};

export type UpdateHouseholdTaskInput = {
  taskId: HouseholdTaskId;
  title?: string;
  description?: string | null;
  assigneeMemberId?: FamilyMemberId | null;
  dueAt?: ISODateTimeString | null;
  reminderAt?: ISODateTimeString | null;
  priority?: HouseholdTaskPriority;
  categoryId?: HouseholdAreaId | null;
  updatedBy: UserId;
  updatedAt: ISODateTimeString;
};

export type DeleteHouseholdTaskInput = {
  taskId: HouseholdTaskId;
  deletedAt: ISODateTimeString;
};

export type ShoppingCategory = {
  id: ShoppingCategoryId;
  familyId: FamilyId | null;
  nameRu: string;
  namePl: string;
  iconKey: string;
  colorKey: string;
  sortOrder: number;
  isDefault: boolean;
  createdAt: ISODateTimeString;
};

export type ShoppingListItem = {
  id: ShoppingItemId;
  familyId: FamilyId;
  categoryId: ShoppingCategoryId | null;
  title: string;
  quantity: string | null;
  note: string | null;
  assignee?: "alex" | "maya" | "shared" | "unassigned";
  dueDate?: string | null;
  priority?: HouseholdTaskPriority;
  recurrence?: string | null;
  isTemplate?: boolean;
  status: ShoppingItemStatus;
  sortOrder: number;
  createdBy: UserId;
  updatedBy: UserId | null;
  purchasedBy: UserId | null;
  purchasedAt: ISODateTimeString | null;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
  deletedAt: ISODateTimeString | null;
};

export type ShoppingListState = {
  categories: ShoppingCategory[];
  items: ShoppingListItem[];
  frequentItemTitles: string[];
};

export type NewShoppingListItemInput = {
  familyId: FamilyId;
  categoryId?: ShoppingCategoryId | null;
  title: string;
  quantity?: string | null;
  note?: string | null;
  assignee?: "alex" | "maya" | "shared" | "unassigned";
  dueDate?: string | null;
  priority?: HouseholdTaskPriority;
  recurrence?: string | null;
  isTemplate?: boolean;
  sortOrder?: number;
  createdBy: UserId;
};

export type PurchaseShoppingListItemInput = {
  itemId: ShoppingItemId;
  purchasedBy: UserId;
  purchasedAt: ISODateTimeString;
};

export type UnpurchaseShoppingListItemInput = {
  itemId: ShoppingItemId;
  updatedBy: UserId;
  updatedAt: ISODateTimeString;
};

export type LocalAppState = {
  language: Language;
  familyId: FamilyId;
  currentUserId: UserId;
  selectedDate: SelectedDateKey;
  events: EventItem[];
  householdTasks: HouseholdTask[];
  shoppingList: ShoppingListState;
};

export type AddHouseholdTaskActionInput = NewHouseholdTaskInput & {
  id: HouseholdTaskId;
  createdAt: ISODateTimeString;
};

export type AddShoppingListItemActionInput = NewShoppingListItemInput & {
  id: ShoppingItemId;
  createdAt: ISODateTimeString;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: PersonId[];
  reminder?: string;
  comment?: string;
  location?: string;
};

export type TaskItem = {
  id: string;
  title: string;
  description: string | null;
  assignee: PersonId | "shared";
  due: string;
  dueDate: string | null;
  dueTime: string | null;
  reminder: string;
  completed: boolean;
  priority: HouseholdTaskPriority;
  isOverdue: boolean;
  category: { emoji: string; name: string } | null;
  recurrence: string | null;
  subtasks: TaskSubtask[];
  comments: TaskComment[];
  history: TaskHistoryEntry[];
};

export type ShoppingItem = {
  id: string;
  title: string;
  quantity?: string;
  categoryId: ShoppingCategoryId | null;
  category: string;
  categoryColor?: string;
  categoryIcon?: string;
  purchased: boolean;
  assignee?: PersonId | 'shared';
  dueDate?: string | null;
  priority?: HouseholdTaskPriority;
  recurrence?: string | null;
  note?: string | null;
  isTemplate?: boolean;
  estimatedPrice?: number;
};

export type ShoppingTemplate = {
  id: string;
  name: string;
  iconBg: string;
  iconColor: string;
  iconName: string;
  itemCount: number;
  scope: 'family' | 'personal';
  lastUsedDaysAgo?: number;
  description?: string;
};

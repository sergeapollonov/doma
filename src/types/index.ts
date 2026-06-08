export type Language = "ru" | "pl";

export type UserId = `user-${string}`;

export type FamilyId = `family-${string}`;

export type FamilyMemberId = `member-${string}`;

export type PersonId = "alex" | "maya";

export type TabKey = "today" | "calendar" | "tasks" | "shopping";

export type ISODateTimeString = `${number}-${number}-${number}T${string}`;

export type HouseholdTaskId = `task-${string}`;

export type HouseholdTaskStatus = "active" | "completed" | "archived";

export type HouseholdTaskPriority = "low" | "normal" | "high";

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

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: PersonId[];
  reminder: string;
  comment?: string;
};

export type TaskItem = {
  id: string;
  title: string;
  assignee: PersonId | "shared";
  due: string;
  reminder: string;
  completed: boolean;
};

export type ShoppingItem = {
  id: string;
  title: string;
  quantity?: string;
  category: string;
  purchased: boolean;
};

export type Language = "ru" | "pl";

export type PersonId = "alex" | "maya";

export type TabKey = "today" | "calendar" | "tasks" | "shopping";

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

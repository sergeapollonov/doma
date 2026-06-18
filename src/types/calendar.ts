export type EventStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type TaskStatus = 'open' | 'in_progress' | 'completed' | 'overdue';
export type ShoppingStatus = 'pending' | 'purchased';

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  timeStart: string;
  timeEnd: string;
  status: EventStatus;
  participants: User[];
  location?: string;
  hasNotes: boolean;
  isRecurring: boolean;
  isConflict?: boolean;
}

export interface CalendarTask {
  id: string;
  title: string;
  dueTime?: string;
  status: TaskStatus;
  assignee?: User;
}

export interface CalendarShoppingItem {
  id: string;
  title: string;
  quantity?: string;
  status: ShoppingStatus;
  category: string;
  iconUrl?: string;
}

export interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
  colorTheme: 'purple' | 'orange' | 'green';
}

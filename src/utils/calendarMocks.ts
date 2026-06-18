import { CalendarEvent, CalendarTask, CalendarShoppingItem, User } from '../types/calendar';

export const mockUsers: Record<string, User> = {
  alex: { id: 'alex', name: 'Алексей' },
  maya: { id: 'maya', name: 'Мая' },
};

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Детский врач',
    location: 'Поликлиника №4',
    timeStart: '09:30',
    timeEnd: '10:15',
    status: 'completed',
    participants: [mockUsers.alex, mockUsers.maya],
    hasNotes: true,
    isRecurring: false,
  },
  {
    id: 'e2',
    title: 'Забрать посылку',
    location: 'Пункт выдачи Ozon',
    timeStart: '15:30',
    timeEnd: '16:00',
    status: 'upcoming',
    participants: [mockUsers.alex],
    hasNotes: false,
    isRecurring: false,
  },
  // Конфликтующее событие с e2
  {
    id: 'e3',
    title: 'Школьное собрание',
    location: 'Школа №12',
    timeStart: '15:45',
    timeEnd: '17:00',
    status: 'upcoming',
    participants: [mockUsers.maya],
    hasNotes: false,
    isRecurring: false,
  },
  {
    id: 'e4',
    title: 'Плавание',
    location: 'Бассейн «Олимп»',
    timeStart: '18:00',
    timeEnd: '19:00',
    status: 'upcoming',
    participants: [mockUsers.alex, mockUsers.maya],
    hasNotes: false,
    isRecurring: true,
  },
];

export const mockCalendarTasks: CalendarTask[] = [
  { id: 't1', title: 'Купить подарок для учителя', dueTime: '10:00', status: 'open', assignee: mockUsers.maya },
  { id: 't2', title: 'Оплатить интернет', dueTime: '12:00', status: 'open', assignee: mockUsers.alex },
  { id: 't3', title: 'Позвонить в садик', dueTime: '16:00', status: 'overdue', assignee: mockUsers.alex },
  { id: 't4', title: 'Позвонить мастеру по стиральной машине', status: 'completed' },
];

export const mockCalendarShopping: CalendarShoppingItem[] = [
  { id: 's1', title: 'Молоко', quantity: '1 л', status: 'pending', category: 'Молочное', iconUrl: '🥛' },
  { id: 's2', title: 'Хлеб', quantity: '1 шт', status: 'pending', category: 'Выпечка', iconUrl: '🍞' },
  { id: 's3', title: 'Бананы', quantity: '1 кг', status: 'pending', category: 'Фрукты', iconUrl: '🍌' },
  { id: 's4', title: 'Сыр', quantity: '300 г', status: 'pending', category: 'Молочное', iconUrl: '🧀' },
  { id: 's5', title: 'Кофе', quantity: '1 пачка', status: 'purchased', category: 'Бакалея', iconUrl: '☕' },
];

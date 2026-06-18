# Calendar Screen Specification & Architecture Plan


**Version:** 1.2 (Technical & UX Freeze)  
**Product:** Doma  
**Status:** Ready for Implementation  


## 1. Concept & UX Rules
Экран **Calendar** — центр планирования семьи. 
* **Family First:** Всегда отображать участников (аватары/имена).
* **One-Day Focus:** Фокус на конкретном дне, несмотря на недельную ленту.
* **Event Priority:** 🟣 Events (Высший) -> 🟠 Tasks (Средний) -> 🟢 Shopping (Низший).


---


## 2. File Structure
Агент должен строго придерживаться следующей файловой структуры при генерации:


```text
src/
  ├── screens/Calendar/
  │    ├── CalendarScreen.tsx          # Главный экран (Animated.ScrollView)
  │    ├── components/
  │    │    ├── FilterPanel.tsx        # Sticky блок фильтров
  │    │    ├── WeekStrip.tsx          # Sticky лента дней недели
  │    │    ├── DaySummaryCard.tsx     # Сводка + Погода
  │    │    ├── SectionHeader.tsx      # Заголовок секций с действием '>'
  │    │    ├── EventsTimeline.tsx     # Вертикальный таймлайн
  │    │    ├── TasksSection.tsx       # Список задач
  │    │    ├── ShoppingSection.tsx    # Горизонтальный скролл покупок
  │    │    └── WeeklyOverviewCard.tsx # Итоги недели (bottom)
  │    └── hooks/
  │         ├── useCalendarConflicts.ts # Логика поиска наложений времени
  │         └── useWeather.ts           # Интеграция погоды
  ├── types/
  │    └── calendar.ts                  # Интерфейсы
  └── utils/
       └── calendarMocks.ts             # Мок-данные


3. Data Structures (TypeScript)
Создать src/types/calendar.ts:
export type EventStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type TaskStatus = 'open' | 'in_progress' | 'completed' | 'overdue';
export type ShoppingStatus = 'pending' | 'purchased';


export interface User { id: string; name: string; avatarUrl?: string; }
export interface CalendarEvent {
  id: string; title: string; timeStart: string; timeEnd: string;
  status: EventStatus; participants: User[]; location?: string;
  hasNotes: boolean; isRecurring: boolean; isConflict?: boolean;
}
export interface CalendarTask {
  id: string; title: string; dueTime?: string; status: TaskStatus; assignee?: User;
}
export interface CalendarShoppingItem {
  id: string; title: string; quantity?: string; status: ShoppingStatus;
  category: string; iconUrl?: string;
}
export interface SectionHeaderProps {
  title: string; actionLabel?: string; onPressAction?: () => void;
  colorTheme: 'purple' | 'orange' | 'green';
}
4. Technical Challenges & Solutions (ВНИМАНИЕ АГЕНТУ)
Performance (Производительность): Экран содержит много списков. Избегать вложенных ScrollView, если это вызывает warning. Использовать React.memo для компонентов CalendarEvent и CalendarTask, чтобы избежать лишних ререндеров при скролле.
Weather API Placeholder: В DaySummaryCard требуется погода. Создать хук useWeather, который сейчас возвращает мок-данные (например, { temp: 23, condition: 'sunny', location: 'Kraków' }), но архитектурно готов к подключению OpenWeatherMap API.
Conflict Detection: События, пересекающиеся по времени, должны маркироваться флагом isConflict. Реализовать это изолированно в useCalendarConflicts(events), который просчитывает массив перед рендером EventsTimeline.
5. Execution Phases
Phase 1: Setup & Data Layer
Создать файловую структуру из раздела 2.
Внедрить типы из раздела 3.
Создать мок-данные calendarMocks.ts (Использовать реалистичный сценарий для семьи: Алексей, Мая, опционально ребенок. Задать минимум 2 пересекающихся события, 1 выполненную задачу и 5 покупок).
Написать черновые хуки useWeather и useCalendarConflicts.
Phase 2: Core Animation (Collapsible & Sticky)
В CalendarScreen.tsx настроить useSharedValue и useAnimatedScrollHandler (из react-native-reanimated).
Создать Animated.View для верхнего заголовка («Календарь», Месяц, Кнопки). Высота и прозрачность уходят в 0 при скролле вниз.
Создать блок StickyPanel (включает FilterPanel и WeekStrip). Использовать stickyHeaderIndices у корневого скролла (или transform: translateY), чтобы панель прилипала к верху экрана при прокрутке.
Phase 3: UI Components (Fixed)
FilterPanel.tsx: Горизонтальный скролл с chips (Семья, Алексей, Мая) и типами (Все, События, Задачи, Покупки).
WeekStrip.tsx: Лента дней. Отображать индикаторы (до 3 цветных точек) под датой, если есть данные.
DaySummaryCard.tsx: Дата, вызов хука useWeather, счетчики задач/событий.
Phase 4: Lists & Business Logic
EventsTimeline.tsx: Вертикальный таймлайн. Использовать useCalendarConflicts. Если isConflict === true, выводить бейдж "⚠ Schedule Conflict".
TasksSection.tsx: Если статус задачи completed — текст должен иметь textDecorationLine: 'line-through', серый цвет, а чекбокс заменяется на оранжевую галочку.
ShoppingSection.tsx: Строго горизонтальный скролл (FlatList horizontal={true}). В конце добавить карточку "ещё X товаров".
Phase 5: Layout Assembly
WeeklyOverviewCard.tsx: Карточка итогов недели.
Собрать всё в CalendarScreen.tsx.
Установить paddingBottom: 120 у корневого Animated.ScrollView, чтобы контент не перекрывался глобальным кастомным Bottom Tab Bar. (FAB на этом экране не используется).
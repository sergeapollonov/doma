\# Today Screen Specification & Architecture Plan

\*\*Version:\*\* 1.1 (UX & Visual Freeze)  

\*\*Product:\*\* Doma  

\*\*Status:\*\* Ready for Implementation


\#\# 1\. Concept & UX Rules

Экран \*\*Today\*\* — ежедневный семейный брифинг. 

\* \*\*5-Second Rule:\*\* Мгновенное понимание статуса дня.

\* \*\*Priority Hierarchy:\*\* 🟣 Events \-\> 🟠 Tasks \-\> 🟢 Shopping.

\* \*\*Visual Match:\*\* Строгое соответствие макету по радиусам скругления, теням и разделителям.

\---

\#\# 2\. File Structure

\`\`\`text

src/

  ├── screens/Today/

  │    ├── TodayScreen.tsx             \# Главный экран (ScrollView с Pull-to-Refresh)

  │    ├── components/

  │    │    ├── OfflineBanner.tsx      \# Плашка "Offline Mode"

  │    │    ├── GreetingHeader.tsx     \# Приветствие \+ Аватары с именами

  │    │    ├── TodaySummaryRow.tsx    \# 3 верхних счетчика (тап открывает Календарь)

  │    │    ├── NextEventCard.tsx      \# Ближайшее событие (Hero-карточка с картой)

  │    │    ├── TasksBriefBlock.tsx    \# Список задач (макс. 5 шт)

  │    │    ├── ShoppingPreviewBlock.tsx \# Горизонтальный скролл покупок

  │    │    ├── WeeklySummaryCard.tsx  \# Итоги недели (единая плашка)

  │    │    ├── FamilyPulseCard.tsx    \# Пульс семьи (единая плашка)

  │    │    ├── EmptyStateCard.tsx     \# Компонент для пустых состояний

  │    │    └── TodaySkeleton.tsx      \# Loading state (скелетоны блоков)

  │    └── hooks/

  │         ├── useGreeting.ts         \# Логика Доброе утро/день/вечер

  │         ├── useNextEventTimer.ts   \# Таймер ближайшего события

  │         └── useFamilySync.ts       \# Статус синхронизации

**3\. Data Structures & Types** 

import { CalendarEvent, CalendarTask, CalendarShoppingItem, User as BaseUser } from '../../types/calendar';

export interface User extends BaseUser {

  colorTheme: 'purple' | 'orange' | 'green' | 'blue'; // Для бейджей в задачах

}

export interface TodaySummary { eventsCount: number; tasksCount: number; shoppingCount: number; }

export interface PulseStats { tasksCompleted: number; eventsRemaining: number; shoppingLeft: number; statusText: string; }

**4\. Technical Challenges & Visual Rules (ВНИМАНИЕ АГЕНТУ)**

1. **Map Background (NextEventCard):** Карточка ближайшего события имеет сложный слоистый фон. Использовать Image (абсолютное позиционирование) с прозрачностью/градиентом для карты, а поверх разместить фиолетовый иконку-пин.  
2. **Lists Separators:** В компонентах Events и Tasks между строками списка должны быть тонкие серые горизонтальные линии (dividers).  
3. **Tasks Constraint:** Максимум 5 задач. Выполненные задачи (Completed) отображать внизу, текст зачеркнут.  
4. **Bottom Navigation Clearance:** Дизайн использует 5 табов (Сегодня, Календарь, Центральный Плюс, Покупки, Семья). У корневого ScrollView должен быть contentContainerStyle={{ paddingBottom: 120 }}.

**5\. Execution Phases**

**Phase 1: Setup, Hooks & States**

1. Создать файловую структуру и типы.  
2. Написать useGreeting с временными промежутками (05-11:59 "Доброе утро", 12-17:59 "Добрый день", 18-04:59 "Добрый вечер"). Добавить иконку солнца/луны рядом с именем пользователя.  
3. Создать TodaySkeleton.tsx с пульсирующей анимацией (Reanimated).

**Phase 2: Top Section & Summary**

1. **GreetingHeader.tsx:** Слева приветствие ("Доброе утро, Сергей" жирным шрифтом) и дата. Справа аватары с подписанными именами. Под аватарами мелким текстом статус из useFamilySync (например, "Синхронизировано").  
2. **TodaySummaryRow.tsx:** 3 белые карточки (События, Задачи, Покупки). Иконки внутри карточек имеют легкий тонированный фон.

**Phase 3: The Hero Block (NextEventCard.tsx)**

1. **Слой фона:** Светло-фиолетовый фон. Справа абсолютно спозиционированная картинка карты.  
2. **Верхняя часть:** Бейдж "БЛИЖАЙШЕЕ СОБЫТИЕ" (uppercase).  
3. **Контент:** Слева фиолетовый квадрат "12 июня". По центру Название ("Детский врач") и локация ("Поликлиника №4"). Справа поверх карты — иконка гео-пина.  
4. **Бейджи:** "Сегодня" (фиолетовый), "🕒 15:30" (серый). Если isLive — бейдж "NOW".  
5. **Подвал:** Отделен тонкой линией. Текст "через 5 ч 49 мин" (из useNextEventTimer) и шеврон \>.

**Phase 4: Lists & Constraints**

1. **TodayEventsList.tsx:** Заголовок секции ("СОБЫТИЯ СЕГОДНЯ", action: "2 события \>"). В строке: слева время (15:30), по центру данные. **Важно:** Справа каждая строка заканчивается квадратной кнопкой (иконка календаря \+ шеврон). Добавить dividers.  
2. **TasksBriefBlock.tsx:** Заголовок ("ЗАДАЧИ СЕГОДНЯ", action: "4 задачи \>"). Строка: чекбокс, текст, цветной pill с именем ответственного (цвет по colorTheme), время (справа). Максимум 5 элементов. Добавить dividers.  
3. **ShoppingPreviewBlock.tsx:** Заголовок ("ПОКУПКИ", action: "3 из 17 \>"). Горизонтальный список карточек (Иконка, Название, Кол-во). Последняя карточка: "ещё X товаров".

**Phase 5: Pulse, Pull-to-Refresh & Assembly**

1. **WeeklySummaryCard.tsx:** Единый белый блок "НА ЭТОЙ НЕДЕЛЕ", разделенный внутри вертикальными серыми линиями на 3 части (8 событий, 12 задач, 5 покупок).  
2. **FamilyPulseCard.tsx:** Единый белый блок "ПУЛЬС СЕМЬИ", 4 колонки с вертикальными разделителями. Последняя колонка: иконка сердца и текст "Всё под контролем".  
3. Собрать всё в TodayScreen.tsx внутри ScrollView.  
4. Добавить RefreshControl для обновления данных (Pull to Refresh).


import { useMemo } from 'react';
import { CalendarEvent } from '../../../types/calendar';

/**
 * Конвертирует строку "HH:mm" в минуты от начала дня.
 */
function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

/**
 * Хук для определения пересекающихся событий (наложений).
 * Возвращает новый массив событий, где конфликтующим проставлен флаг `isConflict = true`.
 */
export function useCalendarConflicts(events: CalendarEvent[]): CalendarEvent[] {
  return useMemo(() => {
    if (!events || events.length === 0) return [];

    // 1. Сортируем события по времени начала
    const sorted = [...events].sort((a, b) => timeToMinutes(a.timeStart) - timeToMinutes(b.timeStart));
    const processedEvents: CalendarEvent[] = [];

    for (let i = 0; i < sorted.length; i++) {
      let isConflict = false;
      const current = sorted[i];
      const currentStart = timeToMinutes(current.timeStart);
      const currentEnd = timeToMinutes(current.timeEnd);

      // Проверяем все остальные события на пересечение
      for (let j = 0; j < sorted.length; j++) {
        if (i === j) continue;
        const other = sorted[j];
        const otherStart = timeToMinutes(other.timeStart);
        const otherEnd = timeToMinutes(other.timeEnd);

        // Условие пересечения: (StartA < EndB) && (EndA > StartB)
        if (currentStart < otherEnd && currentEnd > otherStart) {
          isConflict = true;
          break;
        }
      }

      processedEvents.push({
        ...current,
        isConflict,
      });
    }

    return processedEvents;
  }, [events]);
}

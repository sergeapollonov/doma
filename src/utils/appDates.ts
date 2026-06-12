import type { ISODateString, ISODateTimeString } from "../types";

export type CalendarDateCopy = {
  formatTodayDate: (day: number) => string;
  formatMonthDay: (day: number) => string;
};

export function nowDateTime(): ISODateTimeString {
  return new Date().toISOString() as ISODateTimeString;
}

export function juneDate(day: number): ISODateString {
  return `2026-06-${String(day).padStart(2, "0")}` as ISODateString;
}

export function eventDateToDay(dateLabel: string): number | null {
  const match = dateLabel.match(/^(\d{1,2})\s/);

  if (match === null) {
    return null;
  }

  return Number(match[1]);
}

export function eventDateToISODate(dateLabel: string): ISODateString | null {
  const day = eventDateToDay(dateLabel);

  if (day === null) {
    return null;
  }

  return juneDate(day);
}

export function formatSelectedDate(date: ISODateString, text: CalendarDateCopy) {
  const day = Number(date.slice(-2));

  if (date === "2026-06-03") {
    return text.formatTodayDate(day);
  }

  return formatCalendarSectionDate(date, text);
}

export function formatCalendarSectionDate(date: ISODateString, text: CalendarDateCopy) {
  const day = Number(date.slice(-2));
  return text.formatMonthDay(day);
}

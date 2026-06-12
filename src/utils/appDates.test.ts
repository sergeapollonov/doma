import { describe, expect, it } from "vitest";

import { copy } from "../i18n";
import { eventDateToDay, eventDateToISODate, formatSelectedDate, juneDate } from "./appDates";
import { createHouseholdTaskId, createShoppingItemId } from "./localIds";

describe("app date helpers", () => {
  it("maps June demo date labels to stable ISO dates", () => {
    expect(eventDateToDay("3 июня")).toBe(3);
    expect(eventDateToISODate("3 июня")).toBe("2026-06-03");
    expect(juneDate(5)).toBe("2026-06-05");
    expect(eventDateToISODate("июнь")).toBeNull();
  });

  it("formats selected dates with localized copy helpers", () => {
    expect(formatSelectedDate("2026-06-03", copy.ru)).toBe(copy.ru.formatTodayDate(3));
    expect(formatSelectedDate("2026-06-05", copy.ru)).toBe(copy.ru.formatMonthDay(5));
  });
});

describe("local id helpers", () => {
  it("creates deterministic IDs when a timestamp is provided", () => {
    expect(createHouseholdTaskId(123)).toBe("task-123");
    expect(createShoppingItemId("Молоко 2 л", 123)).toBe("shop-123-молоко-2-л");
  });
});

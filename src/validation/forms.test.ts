import { describe, expect, it } from "vitest";

import {
  validateEventForm,
  validateFamilySetupForm,
  validateLoginForm,
  validateShoppingForm,
  validateTaskForm
} from "./forms";

describe("form validation", () => {
  it("accepts valid login and family setup input", () => {
    expect(validateLoginForm({ email: "alex@example.com" })).toEqual({
      isValid: true,
      errors: {}
    });

    expect(
      validateFamilySetupForm({
        familyName: "Семья Алексея",
        userName: "Алексей"
      })
    ).toEqual({
      isValid: true,
      errors: {}
    });
  });

  it("returns typed errors for invalid login and family setup input", () => {
    expect(validateLoginForm({ email: "not-an-email" }).errors.email).toBe("email_invalid");
    expect(validateLoginForm({ email: " " }).errors.email).toBe("email_required");

    const result = validateFamilySetupForm({
      familyName: "",
      userName: ""
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.familyName).toBe("family_name_required");
    expect(result.errors.userName).toBe("user_name_required");
  });

  it("validates event, task, and shopping titles", () => {
    expect(validateEventForm({ title: "", date: "3 июня", time: "09:00" }).errors.title).toBe("title_required");
    expect(validateTaskForm({ title: "A", due: "Сегодня" }).errors.title).toBe("title_too_short");
    expect(validateShoppingForm({ title: "Молоко", quantity: "2 л", category: "Молочное" }).isValid).toBe(true);
  });

  it("validates shopping quantity and category", () => {
    const result = validateShoppingForm({
      title: "Салфетки",
      quantity: "Очень длинное количество для компактной формы",
      category: ""
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.quantity).toBe("quantity_too_long");
    expect(result.errors.category).toBe("category_required");
  });
});

import { z } from "zod";

export type FormValidationErrorCode =
  | "title_required"
  | "title_too_short"
  | "title_too_long"
  | "email_required"
  | "email_invalid"
  | "family_name_required"
  | "user_name_required"
  | "name_too_long"
  | "date_required"
  | "time_required"
  | "quantity_too_long"
  | "category_required";

export type FormValidationResult<Field extends string> = {
  isValid: boolean;
  errors: Partial<Record<Field, FormValidationErrorCode>>;
};

export type EventFormField = "title" | "date" | "time" | "participants";
export type TaskFormField = "title" | "assignee" | "due";
export type ShoppingFormField = "title" | "quantity" | "category";
export type LoginFormField = "email";
export type FamilySetupFormField = "familyName" | "userName";

export type EventFormInput = {
  title: string;
  date: string;
  time: string;
  participants: "both" | "alex";
};

export type TaskFormInput = {
  title: string;
  assignee: "alex" | "maya" | "shared";
  due: string;
};

export type ShoppingFormInput = {
  title: string;
  quantity: string;
  category: string;
};

export type LoginFormInput = {
  email: string;
};

export type FamilySetupFormInput = {
  familyName: string;
  userName: string;
};

const MIN_TITLE_LENGTH = 2;
const MAX_TITLE_LENGTH = 80;
const MAX_QUANTITY_LENGTH = 32;
const MAX_NAME_LENGTH = 60;

export const titleSchema = z
  .string()
  .trim()
  .min(1, "title_required")
  .min(MIN_TITLE_LENGTH, "title_too_short")
  .max(MAX_TITLE_LENGTH, "title_too_long");

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, "email_required").email("email_invalid")
});

export const familySetupFormSchema = z.object({
  familyName: z.string().trim().min(1, "family_name_required").max(MAX_NAME_LENGTH, "name_too_long"),
  userName: z.string().trim().min(1, "user_name_required").max(MAX_NAME_LENGTH, "name_too_long")
});

export const eventFormSchema = z.object({
  title: titleSchema,
  date: z.string().trim().min(1, "date_required"),
  time: z.string().trim().min(1, "time_required"),
  participants: z.enum(["both", "alex"])
});

export const taskFormSchema = z.object({
  title: titleSchema,
  assignee: z.enum(["alex", "maya", "shared"]),
  due: z.string()
});

export const shoppingFormSchema = z.object({
  title: titleSchema,
  quantity: z.string().trim().max(MAX_QUANTITY_LENGTH, "quantity_too_long"),
  category: z.string().trim().min(1, "category_required")
});

export function validateLoginForm(input: LoginFormInput): FormValidationResult<LoginFormField> {
  return validateForm(loginFormSchema, input);
}

export function validateFamilySetupForm(input: FamilySetupFormInput): FormValidationResult<FamilySetupFormField> {
  return validateForm(familySetupFormSchema, input);
}

export function validateEventForm(input: EventFormInput): FormValidationResult<EventFormField> {
  return validateForm(eventFormSchema, input);
}

export function validateTaskForm(input: TaskFormInput): FormValidationResult<TaskFormField> {
  return validateForm(taskFormSchema, input);
}

export function validateShoppingForm(input: ShoppingFormInput): FormValidationResult<ShoppingFormField> {
  return validateForm(shoppingFormSchema, input);
}

function validateForm<Field extends string, Input>(
  schema: z.ZodType<Input>,
  input: Input
): FormValidationResult<Field> {
  const result = schema.safeParse(input);

  if (result.success) {
    return {
      isValid: true,
      errors: {}
    };
  }

  return {
    isValid: false,
    errors: issuesToErrors<Field>(result.error.issues)
  };
}

function issuesToErrors<Field extends string>(issues: z.ZodIssue[]): Partial<Record<Field, FormValidationErrorCode>> {
  return issues.reduce<Partial<Record<Field, FormValidationErrorCode>>>((errors, issue) => {
    const field = issue.path[0];

    if (typeof field !== "string" || errors[field as Field] !== undefined) {
      return errors;
    }

    errors[field as Field] = toErrorCode(issue.message);
    return errors;
  }, {});
}

function toErrorCode(message: string): FormValidationErrorCode {
  if (isFormValidationErrorCode(message)) {
    return message;
  }

  return "title_required";
}

function isFormValidationErrorCode(message: string): message is FormValidationErrorCode {
  const errorCodes = new Set<FormValidationErrorCode>([
    "title_required",
    "title_too_short",
    "title_too_long",
    "email_required",
    "email_invalid",
    "family_name_required",
    "user_name_required",
    "name_too_long",
    "date_required",
    "time_required",
    "quantity_too_long",
    "category_required"
  ]);

  return errorCodes.has(message as FormValidationErrorCode);
}

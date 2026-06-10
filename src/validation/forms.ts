export type FormValidationErrorCode =
  | "title_required"
  | "title_too_short"
  | "title_too_long"
  | "date_required"
  | "time_required"
  | "quantity_too_long"
  | "category_required";

export type FormValidationResult<Field extends string> = {
  isValid: boolean;
  errors: Partial<Record<Field, FormValidationErrorCode>>;
};

export type EventFormField = "title" | "date" | "time";
export type TaskFormField = "title" | "due";
export type ShoppingFormField = "title" | "quantity" | "category";

export type EventFormInput = {
  title: string;
  date: string;
  time: string;
};

export type TaskFormInput = {
  title: string;
  due: string;
};

export type ShoppingFormInput = {
  title: string;
  quantity: string;
  category: string;
};

const MIN_TITLE_LENGTH = 2;
const MAX_TITLE_LENGTH = 80;
const MAX_QUANTITY_LENGTH = 32;

export function validateEventForm(input: EventFormInput): FormValidationResult<EventFormField> {
  const errors: FormValidationResult<EventFormField>["errors"] = {};
  assignTitleError(errors, input.title);

  if (input.date.trim().length === 0) {
    errors.date = "date_required";
  }

  if (input.time.trim().length === 0) {
    errors.time = "time_required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateTaskForm(input: TaskFormInput): FormValidationResult<TaskFormField> {
  const errors: FormValidationResult<TaskFormField>["errors"] = {};
  assignTitleError(errors, input.title);

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateShoppingForm(input: ShoppingFormInput): FormValidationResult<ShoppingFormField> {
  const errors: FormValidationResult<ShoppingFormField>["errors"] = {};
  assignTitleError(errors, input.title);

  if (input.quantity.trim().length > MAX_QUANTITY_LENGTH) {
    errors.quantity = "quantity_too_long";
  }

  if (input.category.trim().length === 0) {
    errors.category = "category_required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function assignTitleError<Field extends string>(
  errors: Partial<Record<Field | "title", FormValidationErrorCode>>,
  title: string
) {
  const trimmedTitle = title.trim();

  if (trimmedTitle.length === 0) {
    errors.title = "title_required";
    return;
  }

  if (trimmedTitle.length < MIN_TITLE_LENGTH) {
    errors.title = "title_too_short";
    return;
  }

  if (trimmedTitle.length > MAX_TITLE_LENGTH) {
    errors.title = "title_too_long";
  }
}

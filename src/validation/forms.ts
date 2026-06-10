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

export type EventFormField = "title" | "date" | "time";
export type TaskFormField = "title" | "due";
export type ShoppingFormField = "title" | "quantity" | "category";
export type LoginFormField = "email";
export type FamilySetupFormField = "familyName" | "userName";

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
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginForm(input: LoginFormInput): FormValidationResult<LoginFormField> {
  const errors: FormValidationResult<LoginFormField>["errors"] = {};
  const email = input.email.trim();

  if (email.length === 0) {
    errors.email = "email_required";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "email_invalid";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateFamilySetupForm(input: FamilySetupFormInput): FormValidationResult<FamilySetupFormField> {
  const errors: FormValidationResult<FamilySetupFormField>["errors"] = {};
  const familyName = input.familyName.trim();
  const userName = input.userName.trim();

  if (familyName.length === 0) {
    errors.familyName = "family_name_required";
  } else if (familyName.length > MAX_NAME_LENGTH) {
    errors.familyName = "name_too_long";
  }

  if (userName.length === 0) {
    errors.userName = "user_name_required";
  } else if (userName.length > MAX_NAME_LENGTH) {
    errors.userName = "name_too_long";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

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

import {
  validateEventForm,
  validateFamilySetupForm,
  validateLoginForm,
  validateShoppingForm,
  validateTaskForm
} from "./forms";
import type {
  EventFormField,
  FamilySetupFormField,
  FormValidationErrorCode,
  FormValidationResult,
  LoginFormField,
  ShoppingFormField,
  TaskFormField
} from "./forms";

type Expect<T extends true> = T;
type IsAssignable<Actual, Expected> = Actual extends Expected ? true : false;

const eventResult = validateEventForm({
  title: "Врач",
  date: "3 июня",
  time: "09:00",
  participants: "both"
});

const loginResult = validateLoginForm({
  email: "alex@example.com"
});

const familySetupResult = validateFamilySetupForm({
  familyName: "Семья Алексея",
  userName: "Алексей"
});

const taskResult = validateTaskForm({
  title: "Позвонить мастеру",
  assignee: "alex",
  due: "Сегодня"
});

const shoppingResult = validateShoppingForm({
  title: "Молоко",
  quantity: "2 л",
  category: "Молочное"
});

const invalidShoppingResult = validateShoppingForm({
  title: "",
  quantity: "Очень длинное количество для быстрой формы",
  category: ""
});

type _EventResultShape = Expect<IsAssignable<typeof eventResult, FormValidationResult<EventFormField>>>;
type _LoginResultShape = Expect<IsAssignable<typeof loginResult, FormValidationResult<LoginFormField>>>;
type _FamilySetupResultShape = Expect<IsAssignable<typeof familySetupResult, FormValidationResult<FamilySetupFormField>>>;
type _TaskResultShape = Expect<IsAssignable<typeof taskResult, FormValidationResult<TaskFormField>>>;
type _ShoppingResultShape = Expect<IsAssignable<typeof shoppingResult, FormValidationResult<ShoppingFormField>>>;
type _ShoppingErrorCode = Expect<IsAssignable<typeof invalidShoppingResult.errors.title, FormValidationErrorCode | undefined>>;

void eventResult;
void loginResult;
void familySetupResult;
void taskResult;
void shoppingResult;
void invalidShoppingResult;

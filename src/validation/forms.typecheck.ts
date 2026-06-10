import {
  validateEventForm,
  validateShoppingForm,
  validateTaskForm
} from "./forms";
import type {
  EventFormField,
  FormValidationErrorCode,
  FormValidationResult,
  ShoppingFormField,
  TaskFormField
} from "./forms";

type Expect<T extends true> = T;
type IsAssignable<Actual, Expected> = Actual extends Expected ? true : false;

const eventResult = validateEventForm({
  title: "Врач",
  date: "3 июня",
  time: "09:00"
});

const taskResult = validateTaskForm({
  title: "Позвонить мастеру",
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
type _TaskResultShape = Expect<IsAssignable<typeof taskResult, FormValidationResult<TaskFormField>>>;
type _ShoppingResultShape = Expect<IsAssignable<typeof shoppingResult, FormValidationResult<ShoppingFormField>>>;
type _ShoppingErrorCode = Expect<IsAssignable<typeof invalidShoppingResult.errors.title, FormValidationErrorCode | undefined>>;

void eventResult;
void taskResult;
void shoppingResult;
void invalidShoppingResult;

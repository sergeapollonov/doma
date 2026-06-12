import { copy } from "../i18n";
import type { Language } from "../types";
import { isFormValidationErrorCode, type FormValidationErrorCode } from "./forms";

export function fieldValidationMessage(error: { message?: unknown } | undefined, language: Language) {
  const code = error?.message;

  if (typeof code !== "string" || !isFormValidationErrorCode(code)) {
    return undefined;
  }

  return validationMessage(code, language);
}

export function validationMessage(code: FormValidationErrorCode, language: Language) {
  return copy[language].validation[code];
}

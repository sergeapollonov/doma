import React from "react";
import { StyleSheet, View } from "react-native";
import { Controller, type UseFormReturn } from "react-hook-form";

import type { Language } from "../../types";
import type { copy } from "../../i18n";
import type { ShoppingFormInput } from "../../validation/forms";
import { fieldValidationMessage } from "../../validation/messages";
import { Input, PrimaryButton, SheetTitle } from "../ui";

type ShoppingFormSheetProps = {
  form: UseFormReturn<ShoppingFormInput>;
  language: Language;
  text: typeof copy.ru;
  isValid: boolean;
  onSubmit: () => void;
};

export function ShoppingFormSheet({ form, language, text, isValid, onSubmit }: ShoppingFormSheetProps) {
  const shoppingTitleError = fieldValidationMessage(form.formState.errors.title, language);
  const shoppingQuantityError = fieldValidationMessage(form.formState.errors.quantity, language);
  const shoppingCategoryError = fieldValidationMessage(form.formState.errors.category, language);

  return (
    <View>
      <SheetTitle title={text.newShopping} />
      <Controller
        control={form.control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <Input label={text.title} value={value} onChangeText={onChange} error={shoppingTitleError} autoFocus />
        )}
      />
      <View style={styles.formRow}>
        <Controller
          control={form.control}
          name="quantity"
          render={({ field: { value, onChange } }) => (
            <Input compact label={text.quantity} value={value} onChangeText={onChange} error={shoppingQuantityError} />
          )}
        />
        <Controller
          control={form.control}
          name="category"
          render={({ field: { value, onChange } }) => (
            <Input compact label={text.category} value={value} onChangeText={onChange} error={shoppingCategoryError} />
          )}
        />
      </View>
      <PrimaryButton label={text.add} onPress={onSubmit} disabled={!isValid} />
    </View>
  );
}

const styles = StyleSheet.create({
  formRow: {
    flexDirection: "row",
    gap: 10
  }
});

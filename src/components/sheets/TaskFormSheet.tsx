import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Controller, type UseFormReturn } from "react-hook-form";

import { people } from "../../data";
import { colors } from "../../theme";
import type { Language } from "../../types";
import type { copy } from "../../i18n";
import type { TaskFormInput } from "../../validation/forms";
import { fieldValidationMessage } from "../../validation/messages";
import { Input, PrimaryButton, Segment, SheetTitle } from "../ui";

type TaskFormSheetProps = {
  form: UseFormReturn<TaskFormInput>;
  language: Language;
  text: typeof copy.ru;
  isValid: boolean;
  onSubmit: () => void;
};

export function TaskFormSheet({ form, language, text, isValid, onSubmit }: TaskFormSheetProps) {
  const taskTitleError = fieldValidationMessage(form.formState.errors.title, language);
  const taskAssigneeError = fieldValidationMessage(form.formState.errors.assignee, language);
  const taskDueError = fieldValidationMessage(form.formState.errors.due, language);

  return (
    <View>
      <SheetTitle title={text.newTask} />
      <Controller
        control={form.control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <Input label={text.title} value={value} onChangeText={onChange} error={taskTitleError} autoFocus />
        )}
      />
      <Text style={styles.fieldLabel}>{text.assignee}</Text>
      <Controller
        control={form.control}
        name="assignee"
        render={({ field: { value, onChange } }) => (
          <View style={styles.segment}>
            <Segment label={people.alex.name} active={value === "alex"} onPress={() => onChange("alex")} />
            <Segment label={people.maya.name} active={value === "maya"} onPress={() => onChange("maya")} />
            <Segment label={text.shared} active={value === "shared"} onPress={() => onChange("shared")} />
          </View>
        )}
      />
      <View style={styles.errorContainer}>
        {taskAssigneeError ? <Text style={styles.formError}>{taskAssigneeError}</Text> : null}
      </View>
      <Controller
        control={form.control}
        name="due"
        render={({ field: { value, onChange } }) => (
          <Input label={text.due} value={value} onChangeText={onChange} error={taskDueError} />
        )}
      />
      <PrimaryButton label={text.save} onPress={onSubmit} disabled={!isValid} />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 12.5,
    fontWeight: "800",
    marginBottom: 7
  },
  errorContainer: {
    minHeight: 24,
    justifyContent: "flex-start",
    marginBottom: 4
  },
  formError: {
    color: colors.dangerRed,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    marginTop: 8
  },
  segment: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    flexWrap: "wrap"
  }
});

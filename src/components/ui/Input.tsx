import React from "react";
import { StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native";

import { colors } from "../../theme";

type InputProps = Pick<TextInputProps, "autoFocus"> & {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  compact?: boolean;
};

export function Input({ label, value, onChangeText, error, compact, autoFocus }: InputProps) {
  return (
    <View style={[styles.inputWrap, compact && styles.inputCompact]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textTertiary}
        autoFocus={autoFocus}
      />
      {error && <Text style={styles.formError}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    marginBottom: 14
  },
  inputCompact: {
    flex: 1
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 12.5,
    fontWeight: "800",
    marginBottom: 7
  },
  input: {
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    paddingHorizontal: 14,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600"
  },
  inputError: {
    borderColor: colors.dangerRed
  },
  formError: {
    color: colors.dangerRed,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    marginTop: 7
  }
});

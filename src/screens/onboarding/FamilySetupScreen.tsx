import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { Controller, type UseFormReturn } from "react-hook-form";

import { AppShell } from "../../components/layout";
import { Input, PrimaryButton } from "../../components/ui";
import { colors, spacing } from "../../theme";
import type { Language } from "../../types";
import type { FamilySetupFormInput } from "../../validation/forms";
import { fieldValidationMessage } from "../../validation/messages";
import type { copy } from "../../i18n";

type FamilySetupScreenProps = {
  form: UseFormReturn<FamilySetupFormInput>;
  language: Language;
  text: typeof copy.ru;
  isValid: boolean;
  onContinue: () => void;
};

export function FamilySetupScreen({ form, language, text, isValid, onContinue }: FamilySetupScreenProps) {
  const familyNameError = fieldValidationMessage(form.formState.errors.familyName, language);
  const userNameError = fieldValidationMessage(form.formState.errors.userName, language);

  return (
    <AppShell>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.setupScreen}>
          <Text style={styles.wordmarkSmall}>Doma</Text>
          <Text style={styles.screenTitle}>{text.familySetupTitle}</Text>
          <Text style={styles.setupCopy}>{text.familySetupCopy}</Text>
          <Controller
            control={form.control}
            name="familyName"
            render={({ field: { value, onChange } }) => (
              <Input label={text.familyNameLabel} value={value} onChangeText={onChange} error={familyNameError} />
            )}
          />
          <Controller
            control={form.control}
            name="userName"
            render={({ field: { value, onChange } }) => (
              <Input label={text.userNameLabel} value={value} onChangeText={onChange} error={userNameError} />
            )}
          />
          <Pressable style={styles.photoButton}>
            <Ionicons name="camera-outline" size={20} color={colors.domaBlue} />
            <Text style={styles.photoButtonText}>{text.addPhoto}</Text>
          </Pressable>
          <PrimaryButton label={text.createFamily} onPress={onContinue} disabled={!isValid} />
        </ScrollView>
      </SafeAreaView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  wordmarkSmall: {
    color: colors.domaBlue,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 18
  },
  setupScreen: {
    padding: spacing.screen,
    paddingTop: 34
  },
  screenTitle: {
    color: colors.textPrimary,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginBottom: 10
  },
  setupCopy: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 22
  },
  photoButton: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    backgroundColor: colors.surfaceWarm,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 16
  },
  photoButtonText: {
    color: colors.domaBlue,
    fontSize: 15,
    fontWeight: "800"
  }
});

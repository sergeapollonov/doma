import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, type UseFormReturn } from "react-hook-form";

import { AppShell } from "../../components/layout";
import { Card, DomaLogo, PrimaryButton } from "../../components/ui";
import { colors, spacing, typography } from "../../theme";
import type { Language } from "../../types";
import type { LoginFormInput } from "../../validation/forms";
import { fieldValidationMessage } from "../../validation/messages";
import type { copy } from "../../i18n";

type LoginScreenProps = {
  form: UseFormReturn<LoginFormInput>;
  language: Language;
  text: typeof copy.ru;
  isInvite: boolean;
  isValid: boolean;
  onBack: () => void;
  onContinue: () => void;
};

export function LoginScreen({ form, language, text, isInvite, isValid, onBack, onContinue }: LoginScreenProps) {
  const loginEmailError = fieldValidationMessage(form.formState.errors.email, language);

  return (
    <AppShell>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.authScreen} showsVerticalScrollIndicator={false}>
          <View style={styles.authTopBar}>
            <Pressable style={styles.authBackButton} onPress={onBack}>
              <Ionicons name="chevron-back" size={22} color={colors.domaBlue} />
            </Pressable>
            <DomaLogo />
            <View style={styles.authBackSpacer} />
          </View>
          <Text style={styles.authTitle}>{text.authLoginTitle}</Text>
          <Text style={styles.authSubtitle}>{isInvite ? text.authInviteSubtitle : text.authLoginSubtitle}</Text>

          <Card style={styles.authCard}>
            <Text style={styles.fieldLabel}>{text.authEmailLabel}</Text>
            <Controller
              control={form.control}
              name="email"
              render={({ field: { value, onBlur, onChange } }) => (
                <TextInput
                  style={[styles.authInput, loginEmailError && styles.authInputError]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="alex@example.com"
                  placeholderTextColor={colors.textTertiary}
                />
              )}
            />
            <View style={styles.authErrorContainer}>
              {loginEmailError ? (
                <Text style={styles.validationText}>{loginEmailError}</Text>
              ) : (
                <Text style={styles.authHelp}>{text.authEmailHelp}</Text>
              )}
            </View>
          </Card>

          <PrimaryButton label={text.authContinue} onPress={onContinue} disabled={!isValid} arrow />

          <View style={styles.socialBlock}>
            <Text style={styles.socialDivider}>{text.authOr}</Text>
            <Pressable style={styles.socialButton}>
              <Ionicons name="logo-apple" size={20} color={colors.textPrimary} />
              <Text style={styles.socialButtonText}>{text.authApple}</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Ionicons name="logo-google" size={20} color={colors.textPrimary} />
              <Text style={styles.socialButtonText}>{text.authGoogle}</Text>
            </Pressable>
          </View>

          <Text style={styles.legalText}>{text.legalText}</Text>
        </ScrollView>
      </SafeAreaView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 12.5,
    fontWeight: "800",
    marginBottom: 7
  },
  legalText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 24
  },
  authScreen: {
    minHeight: Platform.OS === "web" ? 760 : undefined,
    paddingHorizontal: spacing.screen,
    paddingTop: 34,
    paddingBottom: 38
  },
  authTopBar: {
    minHeight: 58,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  authBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.glass.medium,
    borderWidth: 1,
    borderColor: colors.glass.borderHeavy
  },
  authBackSpacer: {
    width: 48
  },
  authTitle: {
    color: colors.domaBlue,
    fontSize: 45,
    lineHeight: 53,
    fontWeight: "500",
    fontFamily: typography.fontFamily.brand,
    marginBottom: 14
  },
  authSubtitle: {
    color: colors.textSecondary,
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 22
  },
  authCard: {
    padding: 18,
    borderRadius: 26,
    marginBottom: 14
  },
  authInput: {
    height: 58,
    borderRadius: 16,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    paddingHorizontal: 14,
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "700"
  },
  authInputError: {
    borderColor: colors.dangerRed
  },
  authErrorContainer: {
    minHeight: 28,
    justifyContent: "flex-start"
  },
  validationText: {
    color: colors.dangerRed,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 9
  },
  authHelp: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 10
  },
  socialBlock: {
    marginTop: 18,
    gap: 10
  },
  socialDivider: {
    color: colors.textTertiary,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 2
  },
  socialButton: {
    height: 54,
    borderRadius: 17,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.borderHeavy,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  socialButtonText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800"
  }
});

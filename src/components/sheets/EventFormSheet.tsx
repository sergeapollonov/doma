import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, type UseFormReturn } from "react-hook-form";

import { people } from "../../data";
import { colors } from "../../theme";
import type { Language } from "../../types";
import type { copy } from "../../i18n";
import type { EventFormInput } from "../../validation/forms";
import { fieldValidationMessage } from "../../validation/messages";
import { AvatarGroup } from "../family";
import { Card, DomaLogo, PrimaryButton, SecondaryButton, type IconName } from "../ui";

type EventFormSheetProps = {
  form: UseFormReturn<EventFormInput>;
  language: Language;
  text: typeof copy.ru;
  isValid: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export function EventFormSheet({ form, language, text, isValid, onCancel, onSubmit }: EventFormSheetProps) {
  const eventValues = form.watch();
  const eventErrorMessage =
    fieldValidationMessage(form.formState.errors.title, language) ??
    fieldValidationMessage(form.formState.errors.date, language) ??
    fieldValidationMessage(form.formState.errors.time, language) ??
    fieldValidationMessage(form.formState.errors.participants, language);

  return (
    <View>
      <View style={styles.eventSheetBrand}>
        <SecondaryButton label={text.cancel} onPress={onCancel} />
        <DomaLogo />
        <View style={styles.eventSheetSpacer} />
      </View>
      <Text style={styles.eventSheetTitle}>{text.newEvent}</Text>
      <Card style={styles.eventFormCard}>
        <EventFormRow icon="pencil-outline" color={colors.domaGold} label={text.title}>
          <Controller
            control={form.control}
            name="title"
            render={({ field: { value, onBlur, onChange } }) => (
              <TextInput
                style={styles.eventFormValueInput}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={text.eventTitlePlaceholder}
                placeholderTextColor={colors.domaBlue}
                autoFocus
              />
            )}
          />
        </EventFormRow>
        <EventFormRow icon="calendar-outline" color={colors.domaBlue} label={text.date} value={eventValues.date} chevron />
        <EventFormRow icon="time-outline" color={colors.taskOrange} label={text.time} value={eventValues.time} chevron />
        <EventFormRow icon="people-outline" color={colors.domaBlue} label={text.participants} chevron>
          <View style={styles.eventParticipantsValue}>
            <AvatarGroup participants={eventValues.participants === "both" ? ["alex", "maya"] : ["alex"]} small />
            <Text style={styles.eventFormValue}>{eventValues.participants === "both" ? text.both : people.alex.name}</Text>
          </View>
        </EventFormRow>
        <EventFormRow icon="notifications-outline" color={colors.domaGold} label={text.reminder} value={text.thirtyMin} chevron />
        <EventFormRow icon="repeat-outline" color={colors.domaBlue} label={text.repeat} value={text.noRepeat} chevron last />
      </Card>
      <View style={styles.errorContainer}>
        {eventErrorMessage !== null ? <Text style={styles.formError}>{eventErrorMessage}</Text> : null}
      </View>
      <Card style={styles.eventCommentCard}>
        <EventFormRow icon="chatbubble-outline" color={colors.domaBlue} label={text.comment} value={text.addComment} last />
      </Card>
      <PrimaryButton label={text.save} onPress={onSubmit} disabled={!isValid} />
    </View>
  );
}

function EventFormRow({
  icon,
  color,
  label,
  value,
  chevron = false,
  last = false,
  children
}: {
  icon: IconName;
  color: string;
  label: string;
  value?: string;
  chevron?: boolean;
  last?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <View style={[styles.eventFormRow, last && styles.eventFormRowLast]}>
      <View style={styles.eventFormIcon}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.eventFormLabel}>{label}</Text>
      <View style={styles.eventFormValueWrap}>{children ?? <Text style={styles.eventFormValue}>{value}</Text>}</View>
      {chevron ? <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  eventSheetBrand: {
    minHeight: 58,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  eventSheetSpacer: {
    width: 76
  },
  eventSheetTitle: {
    color: colors.domaBlue,
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "500",
    marginBottom: 20,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  eventFormCard: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 28,
    marginBottom: 14
  },
  eventFormRow: {
    minHeight: 76,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232,222,210,0.72)"
  },
  eventFormRowLast: {
    borderBottomWidth: 0
  },
  eventFormIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.82)",
    borderWidth: 1,
    borderColor: "rgba(232,222,210,0.72)"
  },
  eventFormLabel: {
    flex: 1,
    color: colors.domaBlue,
    fontSize: 22,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  eventFormValueWrap: {
    maxWidth: "47%",
    alignItems: "flex-end",
    flexShrink: 1
  },
  eventFormValue: {
    color: colors.domaBlue,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "600",
    textAlign: "right"
  },
  eventFormValueInput: {
    minWidth: 92,
    color: colors.domaBlue,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "600",
    textAlign: "right",
    paddingVertical: 0
  },
  eventParticipantsValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  eventCommentCard: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 24,
    marginBottom: 18
  },
  errorContainer: {
    minHeight: 24,
    justifyContent: "flex-start",
    marginBottom: 4,
    paddingHorizontal: 8
  },
  formError: {
    color: colors.dangerRed,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    marginTop: 8
  }
});

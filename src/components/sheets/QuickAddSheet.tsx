import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import { SheetTitle, type IconName } from "../ui";
import type { AppSheet } from "./types";

type QuickAddSheetProps = {
  text: {
    quickAddTitle: string;
    event: string;
    task: string;
    item: string;
    reminder: string;
  };
  onSelectSheet: (sheet: AppSheet) => void;
};

export function QuickAddSheet({ text, onSelectSheet }: QuickAddSheetProps) {
  const options: Array<{ label: string; icon: IconName; color: string; next: AppSheet }> = [
    { label: text.event, icon: "calendar-outline", color: colors.domaBlue, next: "event" },
    { label: text.task, icon: "checkmark-circle-outline", color: colors.taskOrange, next: "task" },
    { label: text.item, icon: "bag-outline", color: colors.shoppingGreen, next: "shopping" },
    { label: text.reminder, icon: "notifications-outline", color: colors.familySand, next: "event" }
  ];

  return (
    <View>
      <SheetTitle title={text.quickAddTitle} />
      {options.map((option) => (
        <Pressable key={option.label} style={styles.sheetOption} onPress={() => onSelectSheet(option.next)}>
          <View style={[styles.sheetOptionIcon, { backgroundColor: `${option.color}18` }]}>
            <Ionicons name={option.icon} size={22} color={option.color} />
          </View>
          <Text style={styles.sheetOptionText}>{option.label}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sheetOption: {
    minHeight: 62,
    borderRadius: 18,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    marginBottom: 10
  },
  sheetOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  sheetOptionText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800"
  }
});

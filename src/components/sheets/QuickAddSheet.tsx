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
  const options: Array<{ label: string; description: string; icon: IconName; color: string; next: AppSheet | "cancel" }> = [
    { label: "Создать событие", description: "Добавить в календарь", icon: "calendar-outline", color: colors.domaPurple, next: "event" },
    { label: "Создать задачу", description: "Добавить дело для себя или семьи", icon: "checkmark-circle-outline", color: colors.taskOrange, next: "task" },
    { label: "Добавить покупку", description: "Добавить товар в список покупок", icon: "cart-outline", color: colors.shoppingGreen, next: "shopping" },
    { label: "Отмена", description: "", icon: "close-outline", color: colors.textSecondary, next: "cancel" }
  ];

  return (
    <View>
      <View style={{ marginBottom: 16 }} />
      {options.map((option) => (
        <Pressable 
          key={option.label} 
          style={[styles.sheetOption, option.next === "cancel" && { borderWidth: 0, backgroundColor: 'transparent' }]} 
          onPress={() => option.next === "cancel" ? onSelectSheet(null as any) : onSelectSheet(option.next)}
        >
          <View style={[styles.sheetOptionIcon, { backgroundColor: option.next === "cancel" ? "#F2F2F7" : `${option.color}18` }]}>
            <Ionicons name={option.icon} size={22} color={option.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.sheetOptionText, option.next === "cancel" && { color: colors.textSecondary }]}>{option.label}</Text>
            {!!option.description && <Text style={styles.sheetOptionDesc}>{option.description}</Text>}
          </View>
          {option.next !== "cancel" && <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />}
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
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800"
  },
  sheetOptionDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2
  }
});

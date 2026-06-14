import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import type { TaskItem } from "../../types";
import { Avatar } from "../family";

type TaskRowProps = {
  task: TaskItem;
  assignee: string;
  completedLabel: string;
  noReminderLabel: string;
  onToggle: () => void;
  grouped?: boolean;
};

export function TaskRow({ task, assignee, completedLabel, noReminderLabel, onToggle, grouped = false }: TaskRowProps) {
  return (
    <Pressable style={[styles.taskRow, grouped && styles.groupedRow]}>
      <View style={[styles.taskAccent, task.completed && styles.taskAccentDone]} />
      <Pressable style={[styles.checkbox, task.completed && styles.checkboxDone]} onPress={onToggle}>
        {task.completed && <Ionicons name="checkmark" size={16} color={colors.white} />}
      </Pressable>
      <View style={styles.rowGrow}>
        <Text style={[styles.rowTitle, task.completed && styles.completedText]}>{task.title}</Text>
        <View style={styles.inlineMeta}>
          <Ionicons
            name={task.reminder === noReminderLabel ? "calendar-outline" : "notifications-outline"}
            size={15}
            color={task.completed ? colors.shoppingGreen : colors.taskOrange}
          />
          <Text style={styles.caption}>{task.completed ? completedLabel : `${task.due} · ${assignee}`}</Text>
        </View>
      </View>
      {task.assignee !== "shared" ? <Avatar person={task.assignee} size={28} /> : <Ionicons name="people-outline" size={22} color={colors.familySand} />}
      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  taskRow: {
    minHeight: 84,
    borderRadius: 0,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  groupedRow: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider
  },
  taskAccent: {
    width: 4,
    height: 51,
    borderRadius: 4,
    backgroundColor: colors.taskOrange
  },
  taskAccentDone: {
    backgroundColor: colors.shoppingGreen
  },
  checkbox: {
    width: 31,
    height: 31,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.taskOrange,
    alignItems: "center",
    justifyContent: "center"
  },
  checkboxDone: {
    borderColor: colors.taskOrange,
    backgroundColor: colors.taskOrange
  },
  rowGrow: {
    flex: 1
  },
  rowTitle: {
    color: colors.domaBlue,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "500"
  },
  completedText: {
    color: colors.textTertiary,
    textDecorationLine: "line-through"
  },
  inlineMeta: {
    marginTop: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 12.5,
    lineHeight: 17
  }
});

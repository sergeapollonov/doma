import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../../theme";
import type { HouseholdTaskPriority, TaskItem } from "../../../types";
import { people } from "../../../data";

type TaskCardProps = {
  task: TaskItem;
  onToggle: () => void;
  onPress?: () => void;
};

const priorityColors: Record<HouseholdTaskPriority, string> = {
  high: "#E53935",
  normal: colors.taskOrange,
  low: colors.inactive,
};

const priorityLabels: Record<HouseholdTaskPriority, string> = {
  high: "Высокий",
  normal: "Средний",
  low: "Низкий",
};

export function TaskCard({ task, onToggle, onPress }: TaskCardProps) {
  const pColor = priorityColors[task.priority];
  const pLabel = priorityLabels[task.priority];
  const assigneeName = task.assignee === "shared" ? "Семейная" : people[task.assignee]?.name ?? task.assignee;
  const assigneeData = task.assignee !== "shared" ? people[task.assignee] : null;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* Checkbox */}
      <Pressable style={styles.checkboxWrap} onPress={onToggle} hitSlop={8}>
        {task.completed ? (
          <View style={[styles.checkbox, styles.checkboxDone]}>
            <Ionicons name="checkmark" size={14} color={colors.white} />
          </View>
        ) : (
          <View style={[styles.checkbox, task.isOverdue && styles.checkboxOverdue]} />
        )}
      </Pressable>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[styles.title, task.completed && styles.titleDone]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
        {task.isOverdue && !task.completed && task.dueDate && (
          <Text style={styles.overdueText}>
            Просрочено {getOverdueLabel(task.dueDate)}
          </Text>
        )}
        <View style={styles.metaRow}>
          {assigneeData ? (
            <View style={styles.assigneeChip}>
              <View style={[styles.avatarMini, { backgroundColor: assigneeData.color }]}>
                <Text style={styles.avatarText}>{assigneeData.initials}</Text>
              </View>
              <Text style={styles.assigneeName}>{assigneeName}</Text>
            </View>
          ) : (
            <View style={styles.assigneeChip}>
              <Ionicons name="people-outline" size={14} color={colors.taskOrange} />
              <Text style={styles.assigneeName}>{assigneeName}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Right side */}
      <View style={styles.rightCol}>
        {task.dueTime && !task.completed && (
          <Text style={[styles.timeText, task.isOverdue && { color: "#E53935" }]}>
            {task.dueTime}
          </Text>
        )}
        {!task.completed && (
          <View style={[styles.priorityBadge, { backgroundColor: `${pColor}18` }]}>
            <Text style={[styles.priorityText, { color: pColor }]}>{pLabel}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

function getOverdueLabel(dueDate: string): string {
  const due = new Date(dueDate);
  const today = new Date("2026-06-03");
  const diffDays = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return "вчера";
  return `${diffDays} дн. назад`;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeLight,
    gap: 12,
  },
  checkboxWrap: {
    paddingTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.taskOrange,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxOverdue: {
    borderColor: "#E53935",
  },
  checkboxDone: {
    backgroundColor: "#52B788",
    borderColor: "#52B788",
  },
  content: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: colors.textTertiary,
  },
  overdueText: {
    fontSize: 12,
    color: "#E53935",
    fontWeight: "500",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  assigneeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  avatarMini: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.white,
  },
  assigneeName: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  rightCol: {
    alignItems: "flex-end",
    gap: 6,
    paddingTop: 2,
  },
  timeText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "700",
  },
});

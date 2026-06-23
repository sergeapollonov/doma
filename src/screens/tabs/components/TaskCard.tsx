import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../../theme";
import type { HouseholdTaskPriority, PersonId, TaskItem } from "../../../types";
import { people } from "../../../data";
import { Avatar, AvatarGroup } from "../../../components/family";
import { MOCK_TODAY } from "../../../utils/appDates";
import { copy } from "../../../i18n";

type TaskCardProps = {
  text: typeof copy.ru;
  task: TaskItem;
  onToggle: () => void;
  onPress?: () => void;
};

const priorityColors: Record<HouseholdTaskPriority, string> = {
  high: colors.overdueRed,
  normal: colors.taskOrange,
  low: colors.shoppingGreen,
};

export function TaskCard({ text, task, onToggle, onPress }: TaskCardProps) {
  const pColor = priorityColors[task.priority];
  const priorityLabels: Record<HouseholdTaskPriority, string> = {
    high: text.priorityHigh,
    normal: text.priorityMedium,
    low: text.priorityLow,
  };
  const pLabel = priorityLabels[task.priority];
  const assigneeName = task.assignee === "shared" ? text.sharedAssignee : people[task.assignee]?.name ?? task.assignee;

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
            {getOverdueLabel(task.dueDate, text)}
          </Text>
        )}
        <View style={styles.metaRow}>
          {task.assignee !== "shared" ? (
            <View style={styles.assigneeChip}>
              <Avatar person={task.assignee as PersonId} size={20} />
              <Text style={styles.assigneeName}>{assigneeName}</Text>
            </View>
          ) : (
            <View style={styles.assigneeChip}>
              <View style={{ marginLeft: 6 }}>
                <AvatarGroup participants={["alex", "maya"]} small />
              </View>
              <Text style={styles.assigneeName}>{assigneeName}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Right side */}
      <View style={styles.rightCol}>
        {task.dueTime && !task.completed && (
          <Text style={[styles.timeText, task.isOverdue && { color: colors.overdueRed }]}>
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

function getOverdueLabel(dueDate: string, text: typeof copy.ru): string {
  const due = new Date(dueDate);
  const today = new Date(MOCK_TODAY);
  const diffDays = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return text.overdueYesterday;
  return text.overdueDaysAgo(diffDays);
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
    borderColor: colors.overdueRed,
  },
  checkboxDone: {
    backgroundColor: colors.shoppingGreen,
    borderColor: colors.shoppingGreen,
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
    color: colors.overdueRed,
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
    backgroundColor: "rgba(239, 138, 31, 0.08)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  assigneeName: {
    fontSize: 12,
    color: colors.taskOrange,
    marginLeft: 6,
    fontWeight: "600",
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

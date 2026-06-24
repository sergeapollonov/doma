import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { colors, spacing } from "../../theme";
import type { HouseholdTaskPriority, PersonId, TaskComment, TaskHistoryEntry, TaskItem, TaskSubtask } from "../../types";
import { people } from "../../data";
import { Avatar, AvatarGroup } from "../../components/family";
import { MOCK_TODAY } from "../../utils/appDates";
import { copy } from "../../i18n";

type TaskDetailScreenProps = {
  text: typeof copy.ru;
  task: TaskItem;
  onBack: () => void;
  onToggleTask: (taskId: string) => void;
};

const priorityColors: Record<HouseholdTaskPriority, string> = {
  high: colors.overdueRed,
  normal: colors.taskOrange,
  low: colors.inactive,
};

function getPersonName(id: PersonId): string {
  return people[id]?.name ?? id;
}

function getPersonInitials(id: PersonId): string {
  return people[id]?.initials ?? id[0].toUpperCase();
}

function getPersonColor(id: PersonId): string {
  return people[id]?.color ?? colors.inactive;
}

function formatDueDate(dueDate: string | null, dueTime: string | null, text: typeof copy.ru): string {
  if (!dueDate) return text.noDueDate;
  const d = new Date(dueDate);
  const day = d.getDate();
  const month = text.monthNamesGenitive[d.getMonth()];
  const year = d.getFullYear();
  const weekDay = text.weekDaysFullSundayFirst[d.getDay()];
  let result = `${day} ${month} ${year}\n${weekDay}`;
  if (dueTime) result += `, ${dueTime}`;
  return result;
}

function formatHistoryTime(createdAt: string, text: typeof copy.ru): string {
  const d = new Date(createdAt);
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${text.preview.today}, ${h}:${m}`;
}

function formatCommentTime(createdAt: string, text: typeof copy.ru): string {
  const d = new Date(createdAt);
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${text.preview.today}, ${h}:${m}`;
}

const historyIcons: Record<TaskHistoryEntry["type"], string> = {
  created: "add-circle-outline",
  due_changed: "calendar-outline",
  comment_added: "chatbubble-outline",
  completed: "checkmark-circle-outline",
  reopened: "refresh-outline",
  assigned: "person-outline",
};

export function TaskDetailScreen({ text, task, onBack, onToggleTask }: TaskDetailScreenProps) {
  const pColor = priorityColors[task.priority];
  const priorityLabels: Record<HouseholdTaskPriority, string> = {
    high: text.priorityHighFull,
    normal: text.priorityMediumFull,
    low: text.priorityLowFull,
  };
  const pLabel = priorityLabels[task.priority];
  const assigneeName = task.assignee === "shared" ? text.sharedAssignee : getPersonName(task.assignee);
  const assigneeData = task.assignee !== "shared" ? people[task.assignee] : null;
  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
  const totalSubtasks = task.subtasks.length;
  const subtaskProgress = totalSubtasks > 0 ? completedSubtasks / totalSubtasks : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable style={styles.moreButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="ellipsis-horizontal" size={22} color={colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.title}>{task.title}</Text>

        {/* Priority badge */}
        <View style={[styles.priorityBadge, { backgroundColor: `${pColor}18` }]}>
          <Text style={[styles.priorityText, { color: pColor }]}>{pLabel}</Text>
        </View>

        {/* Info rows */}
        <View style={styles.infoSection}>
          <InfoRow
            icon="person-outline"
            label={text.responsible}
            value={assigneeName}
            rightContent={
              task.assignee !== "shared" ? (
                <Avatar person={task.assignee as PersonId} size={28} />
              ) : (
                <AvatarGroup participants={["alex", "maya"]} small />
              )
            }
          />
          <InfoRow icon="calendar-outline" label={text.deadline} value={formatDueDate(task.dueDate, task.dueTime, text)} />
          <InfoRow icon="repeat-outline" label={text.repeat} value={task.recurrence ?? text.noRepeatLabel} />
          <InfoRow icon="notifications-outline" label={text.reminder} value={task.reminder} />
          {task.category && (
            <InfoRow
              icon="pricetag-outline"
              label={text.category}
              value={`${task.category.name} ${task.category.emoji}`}
            />
          )}
        </View>

        {/* Description */}
        {task.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{text.description}</Text>
            <Text style={styles.descriptionText}>{task.description}</Text>
          </View>
        )}

        {/* Subtasks */}
        {totalSubtasks > 0 && (
          <View style={styles.section}>
            <View style={styles.subtasksHeader}>
              <Text style={styles.sectionTitle}>{text.subtasks}</Text>
              <Text style={styles.subtasksCount}>{completedSubtasks}/{totalSubtasks}</Text>
              <View style={styles.progressBarWrap}>
                <View style={[styles.progressBar, { width: `${subtaskProgress * 100}%` }]} />
              </View>
            </View>
            {task.subtasks.map((sub) => (
              <SubtaskRow key={sub.id} subtask={sub} />
            ))}
            <Pressable style={styles.addSubtaskButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.addSubtaskText}>{text.addSubtask}</Text>
              <View style={styles.addSubtaskIcon}>
                <Ionicons name="add" size={16} color={colors.white} />
              </View>
            </Pressable>
          </View>
        )}

        {/* Comments */}
        {task.comments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{text.comments}</Text>
            {task.comments.map((comment) => (
              <CommentRow key={comment.id} comment={comment} text={text} />
            ))}
            <TextInput
              style={styles.commentInput}
              placeholder={text.addComment}
              placeholderTextColor={colors.textTertiary}
            />
          </View>
        )}

        {/* History */}
        {task.history.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{text.history}</Text>
            {task.history.map((entry) => (
              <HistoryRow key={entry.id} entry={entry} text={text} />
            ))}
          </View>
        )}

        {/* Bottom action buttons */}
        {!task.completed && (
          <View style={styles.bottomAction}>
            <Pressable
              style={styles.completeButton}
              onPress={() => onToggleTask(task.id)}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color={colors.white} />
              <Text style={styles.completeButtonText}>{text.markComplete}</Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => {
                // Delete mocked for now, just go back
                onBack();
              }}
            >
              <Ionicons name="trash-outline" size={20} color={colors.dangerRed} />
              <Text style={styles.deleteButtonText}>{text.deleteTask}</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

/* --- Sub-components --- */

function InfoRow({
  icon,
  label,
  value,
  rightContent,
}: {
  icon: string;
  label: string;
  value: string;
  rightContent?: React.ReactNode;
}) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon as any} size={20} color={colors.textSecondary} />
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={styles.infoValueWrap}>
        {rightContent && <View style={{ marginRight: 8 }}>{rightContent}</View>}
        <Text style={styles.infoValue}>{value}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
    </View>
  );
}

function SubtaskRow({ subtask }: { subtask: TaskSubtask }) {
  return (
    <View style={styles.subtaskRow}>
      <View
        style={[
          styles.subtaskCheckbox,
          subtask.completed && styles.subtaskCheckboxDone,
        ]}
      >
        {subtask.completed && <Ionicons name="checkmark" size={12} color={colors.white} />}
      </View>
      <Text style={[styles.subtaskTitle, subtask.completed && styles.subtaskTitleDone]}>
        {subtask.title}
      </Text>
    </View>
  );
}

function CommentRow({ comment, text }: { comment: TaskComment, text: typeof copy.ru }) {
  const name = getPersonName(comment.authorId);

  return (
    <View style={styles.commentRow}>
      <Avatar person={comment.authorId as PersonId} size={32} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentAuthor}>{name}</Text>
          <Text style={styles.commentTime}>{formatCommentTime(comment.createdAt, text)}</Text>
        </View>
        <Text style={styles.commentText}>{comment.text}</Text>
      </View>
    </View>
  );
}

function HistoryRow({ entry, text }: { entry: TaskHistoryEntry, text: typeof copy.ru }) {
  const name = getPersonName(entry.actorId);
  const iconName = historyIcons[entry.type] ?? "ellipse-outline";

  const labels: Record<TaskHistoryEntry["type"], string> = {
    created: text.historyCreated,
    due_changed: text.historyDueChanged,
    comment_added: text.historyCommentAdded,
    completed: text.historyCompleted,
    reopened: text.historyReopened,
    assigned: text.historyAssigned,
  };

  return (
    <View style={styles.historyRow}>
      <Ionicons name={iconName as any} size={18} color={colors.textTertiary} />
      <View style={styles.historyContent}>
        <Text style={styles.historyLabel}>{labels[entry.type]}</Text>
        <Text style={styles.historyMeta}>
          {formatHistoryTime(entry.createdAt, text)}
          {entry.details ? `\n${entry.details}` : ""}
        </Text>
      </View>
      <Text style={styles.historyActor}>{name}</Text>
    </View>
  );
}

/* --- Styles --- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warmBackground,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.textPrimary,
    lineHeight: 34,
    marginBottom: 12,
  },
  priorityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 24,
  },
  priorityText: {
    fontSize: 13,
    fontWeight: "700",
  },
  infoSection: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeLight,
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    width: 110,
  },
  infoValueWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "right",
  },

  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  subtasksHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  subtasksCount: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  progressBarWrap: {
    flex: 1,
    height: 4,
    backgroundColor: colors.strokeLight,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.taskOrange,
    borderRadius: 2,
  },
  subtaskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  subtaskCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.strokeSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  subtaskCheckboxOverdue: {
    borderColor: colors.overdueRed,
  },
  subtaskCheckboxDone: {
    backgroundColor: colors.shoppingGreen,
    borderColor: colors.shoppingGreen,
  },
  subtaskTitle: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  subtaskTitleDone: {
    textDecorationLine: "line-through",
    color: colors.textTertiary,
  },
  addSubtaskButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.strokeLight,
    marginTop: 4,
  },
  addSubtaskText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.taskOrange,
  },
  addSubtaskIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.taskOrange,
    alignItems: "center",
    justifyContent: "center",
  },
  commentRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 3,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.taskOrange,
  },
  commentTime: {
    fontSize: 11,
    color: colors.textTertiary,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: colors.textPrimary,
    marginTop: 4,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeLight,
  },
  historyContent: {
    flex: 1,
  },
  historyLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  historyMeta: {
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 2,
  },
  historyActor: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  bottomAction: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 100,
    backgroundColor: colors.warmBackground,
    gap: 12,
  },
  completeButton: {
    backgroundColor: colors.taskOrange,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingRight: 4, // optical alignment
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
  deleteButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.dangerRed,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingRight: 4, // optical alignment
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.dangerRed,
  },
});

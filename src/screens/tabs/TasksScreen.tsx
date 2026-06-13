import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { TaskRow } from "../../components/tasks";
import { Card, Chip, SectionHeader } from "../../components/ui";
import { colors } from "../../theme";
import type { TaskItem } from "../../types";
import type { copy } from "../../i18n";

export type TaskFilter = "all" | "mine" | "maya" | "shared" | "done";

type TasksScreenProps = {
  text: typeof copy.ru;
  tasks: TaskItem[];
  filter: TaskFilter;
  filteredTasks: TaskItem[];
  assigneeLabel: (assignee: TaskItem["assignee"]) => string;
  onChangeFilter: (filter: TaskFilter) => void;
  onOpenTaskSheet: () => void;
  onToggleTask: (taskId: string) => void;
};

export function TasksScreen({
  text,
  tasks,
  filter,
  filteredTasks,
  assigneeLabel,
  onChangeFilter,
  onOpenTaskSheet,
  onToggleTask
}: TasksScreenProps) {
  const todayLabel = text.taskToday;
  const todayTasks = tasks.filter((task) => !task.completed && task.due === todayLabel);
  const weekTasks = tasks.filter((task) => !task.completed && task.due !== todayLabel && task.due !== text.noDue);
  const noDueTasks = tasks.filter((task) => !task.completed && task.due === text.noDue);
  const doneTasks = tasks.filter((task) => task.completed);
  const groups = [
    { title: text.taskToday, items: todayTasks },
    { title: text.taskWeek, items: weekTasks },
    { title: text.taskNoDue, items: noDueTasks },
    { title: text.done, items: doneTasks }
  ].filter((group) => group.items.length > 0);

  return (
    <View>
      <View style={styles.chipRow}>
        <Chip label={text.all} active={filter === "all"} onPress={() => onChangeFilter("all")} />
        <Chip label={text.mine} active={filter === "mine"} onPress={() => onChangeFilter("mine")} />
        <Chip label={text.taskMaya} active={filter === "maya"} onPress={() => onChangeFilter("maya")} />
        <Chip label={text.shared} active={filter === "shared"} onPress={() => onChangeFilter("shared")} />
        <Chip label={text.done} active={filter === "done"} onPress={() => onChangeFilter("done")} />
      </View>
      {filter === "all" ? (
        groups.map((group) => (
          <View key={group.title}>
            <SectionHeader title={group.title} action={`${group.items.length}`} />
            <Card style={styles.groupCard}>
              {group.items.map((task) => (
                <TaskRow
                  key={`tasks-${task.id}`}
                  task={task}
                  assignee={assigneeLabel(task.assignee)}
                  completedLabel={text.completedToday}
                  noReminderLabel={text.noReminder}
                  onToggle={() => onToggleTask(task.id)}
                  grouped
                />
              ))}
            </Card>
          </View>
        ))
      ) : (
        <Card style={styles.groupCard}>
          {filteredTasks.map((task) => (
            <TaskRow
              key={`tasks-${task.id}`}
              task={task}
              assignee={assigneeLabel(task.assignee)}
              completedLabel={text.completedToday}
              noReminderLabel={text.noReminder}
              onToggle={() => onToggleTask(task.id)}
              grouped
            />
          ))}
        </Card>
      )}
      <Pressable style={styles.newTaskCard} onPress={onOpenTaskSheet}>
        <View style={styles.newTaskIcon}>
          <Ionicons name="add" size={34} color={colors.domaGold} />
        </View>
        <View style={styles.rowGrow}>
          <Text style={styles.cardTitle}>{text.newTask}</Text>
          <Text style={styles.caption}>{text.newTaskHint}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 24,
    padding: 5,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.68)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.86)"
  },
  groupCard: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 25,
    marginBottom: 14
  },
  newTaskCard: {
    minHeight: 98,
    borderRadius: 24,
    padding: 16,
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.74)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.88)",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    shadowColor: "#372614",
    shadowOpacity: 0.09,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 }
  },
  newTaskIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#372614",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 }
  },
  rowGrow: {
    flex: 1
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800"
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 12.5,
    lineHeight: 17
  }
});

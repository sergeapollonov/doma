import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Card, Chip } from "../../components/ui";
import { colors, spacing } from "../../theme";
import type { TaskItem } from "../../types";
import { TaskCard } from "./components/TaskCard";

export type TaskFilter = "all" | "mine" | "family" | "done";

type TasksScreenProps = {
  text: {
    tasks: string;
    all: string;
    mine: string;
    done: string;
  };
  tasks: TaskItem[];
  filter: TaskFilter;
  onChangeFilter: (filter: TaskFilter) => void;
  onOpenTaskSheet: () => void;
  onToggleTask: (taskId: string) => void;
  onSelectTask?: (taskId: string) => void;
};

const TODAY_ISO = "2026-06-03";
const WEEK_END_ISO = "2026-06-08";

type TaskGroup = {
  key: string;
  title: string;
  count: number;
  color: string;
  tasks: TaskItem[];
  collapsedByDefault?: boolean;
  maxVisible?: number;
};

function groupTasks(tasks: TaskItem[]): TaskGroup[] {
  const overdue: TaskItem[] = [];
  const today: TaskItem[] = [];
  const thisWeek: TaskItem[] = [];
  const later: TaskItem[] = [];
  const completed: TaskItem[] = [];

  for (const task of tasks) {
    if (task.completed) {
      completed.push(task);
    } else if (task.isOverdue) {
      overdue.push(task);
    } else if (task.dueDate === TODAY_ISO) {
      today.push(task);
    } else if (task.dueDate && task.dueDate > TODAY_ISO && task.dueDate <= WEEK_END_ISO) {
      thisWeek.push(task);
    } else {
      later.push(task);
    }
  }

  const groups: TaskGroup[] = [];

  if (overdue.length > 0) {
    groups.push({
      key: "overdue",
      title: "ПРОСРОЧЕННЫЕ",
      count: overdue.length,
      color: "#E53935",
      tasks: overdue,
    });
  }

  if (today.length > 0) {
    groups.push({
      key: "today",
      title: "СЕГОДНЯ",
      count: today.length,
      color: colors.taskOrange,
      tasks: today,
    });
  }

  if (thisWeek.length > 0) {
    groups.push({
      key: "week",
      title: "НА ЭТОЙ НЕДЕЛЕ",
      count: thisWeek.length,
      color: colors.textSecondary,
      tasks: thisWeek,
      maxVisible: 3,
    });
  }

  if (later.length > 0) {
    groups.push({
      key: "later",
      title: "ПОЗЖЕ",
      count: later.length,
      color: colors.textSecondary,
      tasks: later,
      maxVisible: 2,
    });
  }

  if (completed.length > 0) {
    groups.push({
      key: "completed",
      title: `Показать выполненные (${completed.length})`,
      count: completed.length,
      color: colors.textTertiary,
      tasks: completed,
      collapsedByDefault: true,
    });
  }

  return groups;
}

export function TasksScreen({
  text,
  tasks,
  filter,
  onChangeFilter,
  onOpenTaskSheet,
  onToggleTask,
  onSelectTask,
}: TasksScreenProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const filteredTasks = useMemo(() => {
    if (filter === "mine") return tasks.filter((t) => t.assignee === "alex" && !t.completed);
    if (filter === "family") return tasks.filter((t) => (t.assignee === "shared" || t.assignee !== "alex") && !t.completed);
    if (filter === "done") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const groups = useMemo(() => {
    if (filter === "done") {
      return [{
        key: "completed-all",
        title: `ВЫПОЛНЕННЫЕ`,
        count: filteredTasks.length,
        color: colors.textTertiary,
        tasks: filteredTasks,
      }];
    }
    return groupTasks(filteredTasks);
  }, [filteredTasks, filter]);

  const toggleGroupExpanded = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filters: Array<{ key: TaskFilter; label: string }> = [
    { key: "all", label: text.all },
    { key: "mine", label: text.mine },
    { key: "family", label: "Семейные" },
    { key: "done", label: text.done },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Задачи</Text>
        <View style={styles.headerActions}>
          <Pressable style={styles.headerButton}>
            <Ionicons name="search-outline" size={22} color={colors.textPrimary} />
          </Pressable>
          <Pressable style={styles.addButton} onPress={onOpenTaskSheet}>
            <Ionicons name="add" size={24} color={colors.white} />
          </Pressable>
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {filters.map((f) => (
          <Chip
            key={f.key}
            label={f.label}
            active={filter === f.key}
            onPress={() => onChangeFilter(f.key)}
          />
        ))}
      </ScrollView>

      {/* Task Groups */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {groups.map((group) => {
          const isExpanded = expandedGroups[group.key] ?? !group.collapsedByDefault;
          const visibleTasks = isExpanded
            ? (group.maxVisible && !expandedGroups[group.key] ? group.tasks.slice(0, group.maxVisible) : group.tasks)
            : [];
          const hasMore = group.maxVisible && !expandedGroups[group.key] && group.tasks.length > group.maxVisible;

          return (
            <View key={group.key} style={styles.groupWrap}>
              <Pressable
                style={styles.groupHeader}
                onPress={() => group.collapsedByDefault ? toggleGroupExpanded(group.key) : undefined}
              >
                <Text style={[styles.groupTitle, { color: group.color }]}>
                  {group.title}
                </Text>
                <Text style={[styles.groupCount, { color: group.color }]}>
                  {group.collapsedByDefault ? "" : group.count}
                </Text>
                {group.collapsedByDefault && (
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={18}
                    color={group.color}
                  />
                )}
                {group.key === "overdue" && (
                  <Ionicons name="chevron-up" size={18} color={group.color} />
                )}
              </Pressable>

              {isExpanded && (
                <Card>
                  {visibleTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={() => onToggleTask(task.id)}
                      onPress={() => onSelectTask?.(task.id)}
                    />
                  ))}
                </Card>
              )}

              {group.key === "today" && isExpanded && (
                <Pressable
                  style={styles.showCompletedButton}
                  onPress={() => toggleGroupExpanded("today-completed")}
                >
                  <Text style={styles.showCompletedText}>
                    Показать выполненные ({tasks.filter(t => t.completed && t.dueDate === TODAY_ISO).length})
                  </Text>
                  <Ionicons name="chevron-down" size={16} color={colors.textTertiary} />
                </Pressable>
              )}

              {hasMore && (
                <Pressable
                  style={styles.showMoreButton}
                  onPress={() => toggleGroupExpanded(group.key)}
                >
                  <Text style={styles.showMoreText}>
                    Показать ещё {group.tasks.length - (group.maxVisible ?? 0)} задач
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                </Pressable>
              )}
            </View>
          );
        })}

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.taskOrange,
    alignItems: "center",
    justifyContent: "center",
  },
  filterRow: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  groupWrap: {
    marginBottom: 16,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  groupCount: {
    fontSize: 13,
    fontWeight: "700",
  },
  showCompletedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 4,
  },
  showCompletedText: {
    fontSize: 13,
    color: colors.textTertiary,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 4,
  },
  showMoreText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "500",
  },
});

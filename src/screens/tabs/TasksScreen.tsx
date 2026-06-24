import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "../../components/ui";
import { colors, radius, spacing, typography } from "../../theme";
import type { TaskItem } from "../../types";
import { TaskCard } from "./components/TaskCard";
import { MOCK_TODAY } from "../../utils/appDates";
import { copy } from "../../i18n";

export type TaskFilter = "all" | "mine" | "family" | "done";

type TasksScreenProps = {
  text: typeof copy.ru;
  tasks: TaskItem[];
  filter: TaskFilter;
  onChangeFilter: (filter: TaskFilter) => void;
  onOpenTaskSheet: () => void;
  onToggleTask: (taskId: string) => void;
  onSelectTask?: (taskId: string) => void;
};

const TODAY_ISO = MOCK_TODAY;
// Helper to get Sunday of the current week based on MOCK_TODAY
function getWeekEndISO(todayISO: string): string {
  const d = new Date(todayISO);
  const day = d.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}
const WEEK_END_ISO = getWeekEndISO(TODAY_ISO);

type TaskGroup = {
  key: string;
  title: string;
  count: number;
  color: string;
  tasks: TaskItem[];
  collapsedByDefault?: boolean;
  maxVisible?: number;
};

function groupTasks(tasks: TaskItem[], text: typeof copy.ru): TaskGroup[] {
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
      title: text.overdue.toUpperCase(),
      count: overdue.length,
      color: colors.overdueRed,
      tasks: overdue,
    });
  }

  if (today.length > 0) {
    groups.push({
      key: "today",
      title: text.taskToday.toUpperCase(),
      count: today.length,
      color: colors.taskOrange,
      tasks: today,
    });
  }

  if (thisWeek.length > 0) {
    groups.push({
      key: "week",
      title: text.thisWeek.toUpperCase(),
      count: thisWeek.length,
      color: colors.textSecondary,
      tasks: thisWeek,
      maxVisible: 3,
    });
  }

  if (later.length > 0) {
    groups.push({
      key: "later",
      title: text.later.toUpperCase(),
      count: later.length,
      color: colors.textSecondary,
      tasks: later,
      maxVisible: 2,
    });
  }

  if (completed.length > 0) {
    groups.push({
      key: "completed",
      title: `${text.showCompleted} (${completed.length})`,
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
        title: text.done.toUpperCase(),
        count: filteredTasks.length,
        color: colors.textTertiary,
        tasks: filteredTasks,
      }];
    }
    return groupTasks(filteredTasks, text);
  }, [filteredTasks, filter, text]);

  const toggleGroupExpanded = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filters: Array<{ key: TaskFilter; label: string }> = [
    { key: "all", label: text.all },
    { key: "mine", label: text.mine },
    { key: "family", label: text.familyFilter },
    { key: "done", label: text.done },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{text.tasksScreenTitle}</Text>
        <View style={styles.headerActions}>
          <Pressable style={styles.headerButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="search-outline" size={22} color={colors.textPrimary} />
          </Pressable>
          <Pressable style={styles.addButton} onPress={onOpenTaskSheet}>
            <Ionicons name="add" size={24} color={colors.white} />
          </Pressable>
        </View>
      </View>

      {/* Segmented Filter Control */}
      <View style={styles.filterContainer}>
        <View style={styles.segmentedControl}>
          {filters.map((f) => (
            <Pressable
              key={f.key}
              style={[styles.segmentItem, filter === f.key && styles.segmentItemActive]}
              onPress={() => onChangeFilter(f.key)}
            >
              <Text style={[styles.segmentText, filter === f.key && styles.segmentTextActive]}>
                {f.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

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
                <View style={styles.headerLeft}>
                  <Text style={[styles.groupTitle, { color: group.color }]}>
                    {group.title}
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
                </View>
                {!group.collapsedByDefault && group.count > 0 && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{group.count}</Text>
                  </View>
                )}
              </Pressable>

              {isExpanded && (
                <View style={styles.taskListContainer}>
                  {visibleTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      text={text}
                      task={task}
                      onToggle={() => onToggleTask(task.id)}
                      onPress={() => onSelectTask?.(task.id)}
                    />
                  ))}
                </View>
              )}

              {group.key === "today" && isExpanded && (
                <Pressable
                  style={styles.showCompletedButton}
                  onPress={() => toggleGroupExpanded("today-completed")}
                >
                  <Text style={styles.showCompletedText}>
                    {text.showCompleted} ({tasks.filter(t => t.completed && t.dueDate === TODAY_ISO).length})
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
                    {text.showMoreN(group.tasks.length - (group.maxVisible ?? 0))}
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
    backgroundColor: colors.warmBackground,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: colors.textPrimary,
    fontFamily: "Playfair Display",
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
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: colors.surfacePrimary,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentItemActive: {
    backgroundColor: colors.taskOrange,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: colors.white,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  groupWrap: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    paddingTop: 20,
    paddingBottom: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  countBadge: {
    backgroundColor: colors.surfaceWarm,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  countText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
    fontVariant: ['tabular-nums'],
  },
  taskListContainer: {
    gap: 8,
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

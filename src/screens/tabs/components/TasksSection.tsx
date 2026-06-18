import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { CalendarTask } from '../../../types/calendar';
import { Ionicons } from '@expo/vector-icons';

type TasksSectionProps = {
  tasks: CalendarTask[];
};

export function TasksSection({ tasks }: TasksSectionProps) {
  return (
    <View style={styles.container}>
      {tasks.map((task) => {
        const isCompleted = task.status === 'completed';
        const isOverdue = task.status === 'overdue';

        return (
          <TouchableOpacity key={task.id} style={[styles.taskRow, isCompleted && styles.taskCompleted]}>
            {/* Checkbox */}
            <View style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}>
              {isCompleted && <Ionicons name="checkmark" size={14} color={colors.white} />}
            </View>

            {/* Title */}
            <Text style={[styles.title, isCompleted && styles.titleCompleted, isOverdue && styles.titleOverdue]}>
              {isOverdue && <Text style={{ color: colors.dangerRed }}>Overdue </Text>}
              {task.title}
            </Text>

            {/* Assignee / Time */}
            <View style={styles.rightInfo}>
              {task.assignee && (
                <View style={styles.assigneeBadge}>
                  <Text style={styles.assigneeText}>{task.assignee.name}</Text>
                </View>
              )}
              {task.dueTime && (
                <Text style={styles.timeText}>{task.dueTime}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  taskCompleted: {
    opacity: 0.5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.taskOrange,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: colors.taskOrange,
  },
  title: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  titleOverdue: {
    // В референсе красный текст для "Overdue", но мы добавили приставку.
    // Можно просто сделать шрифт жирнее
  },
  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  assigneeBadge: {
    backgroundColor: 'rgba(239, 138, 31, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  assigneeText: {
    fontSize: 11,
    color: colors.taskOrange,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
    minWidth: 40,
    textAlign: 'right',
  }
});

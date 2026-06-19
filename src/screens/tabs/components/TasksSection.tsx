import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { CalendarTask } from '../../../types/calendar';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../../components/family';

type TasksSectionProps = {
  tasks: any[];
  title?: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function TasksSection({ tasks, title = 'ЗАДАЧИ НА ДЕНЬ', actionLabel, onActionPress }: TasksSectionProps) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{title}</Text>
        {actionLabel && (
          <TouchableOpacity onPress={onActionPress} style={styles.actionButton}>
            <Text style={styles.actionLabel}>{actionLabel}</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.taskOrange} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.tasksList}>
        {tasks.map((task) => {
          const isCompleted = task.status === 'completed' || task.completed === true;
          const isOverdue = task.status === 'overdue';

          return (
            <TouchableOpacity key={task.id} style={[styles.taskRow, isCompleted && styles.taskCompleted]}>
              {/* Checkbox */}
              <View style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}>
                {isCompleted && <Ionicons name="checkmark" size={14} color={colors.white} />}
              </View>

              {/* Title & Details */}
              <View style={styles.contentContainer}>
                <Text style={[styles.title, isCompleted && styles.titleCompleted, isOverdue && styles.titleOverdue]} numberOfLines={2}>
                  {isOverdue && <Text style={{ color: colors.dangerRed }}>Просрочено • </Text>}
                  {task.title}
                </Text>

                <View style={styles.detailsRow}>
                  {task.assignee && (
                    <View style={styles.participantsChip}>
                      <Avatar person={task.assignee.id as any} size={20} />
                      <Text style={styles.participantsText} numberOfLines={1}>{task.assignee.name}</Text>
                    </View>
                  )}

                  {task.dueTime && (
                    <Text style={styles.timeText}>{task.dueTime}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {!actionLabel && (
        <TouchableOpacity style={styles.showAllButton}>
          <Text style={styles.showAllText}>Показать все задачи ({tasks.length})</Text>
          <Ionicons name="chevron-down" size={16} color={colors.taskOrange} style={{ marginLeft: 4, marginTop: 2 }} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: colors.strokeLight,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.taskOrange,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 13,
    color: colors.taskOrange,
    fontWeight: '600',
    marginRight: 2,
  },
  tasksList: {
    paddingLeft: 4,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
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
    marginTop: 2, // Выравнивание с первой строкой текста
  },
  checkboxCompleted: {
    backgroundColor: colors.taskOrange,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  titleOverdue: {
    // Специфические стили для просроченной задачи, если нужно
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  participantsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 138, 31, 0.08)', // Светлая оранжевая подложка
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    flexShrink: 1,
  },
  participantsText: {
    fontSize: 12,
    color: colors.taskOrange,
    marginLeft: 6,
    fontWeight: '600',
    flexShrink: 1,
  },
  timeText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  showAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    paddingVertical: spacing.sm,
  },
  showAllText: {
    color: colors.taskOrange,
    fontWeight: '600',
    fontSize: 14,
  }
});

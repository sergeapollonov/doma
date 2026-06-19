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
        {tasks.slice(0, 2).map((task, index) => {
          const isCompleted = task.status === 'completed' || task.completed === true;
          const isOverdue = task.status === 'overdue';

          return (
            <TouchableOpacity key={task.id} style={[styles.taskRow, index > 0 && styles.rowBorder, isCompleted && styles.taskCompleted]}>
              <View style={styles.accentLine} />
              
              <View style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}>
                {isCompleted && <Ionicons name="checkmark" size={14} color={colors.white} />}
              </View>

              <View style={styles.contentContainer}>
                <Text style={[styles.title, isCompleted && styles.titleCompleted, isOverdue && styles.titleOverdue]} numberOfLines={1}>
                  {isOverdue && <Text style={{ color: colors.dangerRed }}>Просрочено • </Text>}
                  {task.title}
                </Text>

                {task.dueTime && (
                  <Text style={styles.timeText}>{task.dueTime}</Text>
                )}
              </View>

              <View style={styles.iconColumn}>
                {task.assignee && task.assignee !== 'shared' && (
                  <View style={styles.participantsChip}>
                    <Avatar person={task.assignee as any} size={22} />
                  </View>
                )}
                <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    paddingTop: 20,
    paddingBottom: 4,
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
    paddingHorizontal: spacing.md,
    marginBottom: 4,
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
    paddingHorizontal: spacing.md,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.strokeLight,
  },
  accentLine: {
    position: 'absolute',
    left: -spacing.md,
    width: 3,
    height: 32,
    backgroundColor: colors.taskOrange,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: spacing.md,
  },
  title: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 0,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  titleOverdue: {
    // Специфические стили
  },
  iconColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 138, 31, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  timeText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  }
});

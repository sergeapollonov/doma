import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { CalendarEvent } from '../../../types/calendar';
import { Ionicons } from '@expo/vector-icons';

type TodayEventsListProps = {
  events: any[]; // EventItem[]
  onPressEvent?: (event: any) => void;
};

export function TodayEventsList({ events, onPressEvent }: TodayEventsListProps) {
  if (!events || events.length === 0) return null;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>СОБЫТИЯ СЕГОДНЯ</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionLabel}>{events.length} события</Text>
          <Ionicons name="chevron-forward" size={14} color="#8C77F6" />
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {events.map((event, index) => (
          <TouchableOpacity 
            key={event.id} 
            style={[styles.eventRow, index > 0 && styles.rowBorder]}
            onPress={() => onPressEvent?.(event)}
          >
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>{event.startTime}</Text>
            </View>
            
            <View style={styles.detailsColumn}>
              <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
              {event.location && (
                <Text style={styles.location} numberOfLines={1}>{event.location}</Text>
              )}
            </View>

            <View style={styles.iconColumn}>
              <View style={styles.calendarIconBg}>
                <Ionicons name="calendar-outline" size={16} color="#8C77F6" />
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
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
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8C77F6',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 13,
    color: '#8C77F6',
    fontWeight: '600',
    marginRight: 2,
  },
  list: {
    paddingHorizontal: spacing.md,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.strokeLight,
  },
  timeColumn: {
    width: 60,
  },
  timeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8C77F6', // Фиолетовый
  },
  detailsColumn: {
    flex: 1,
    paddingRight: spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  iconColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIconBg: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(140, 119, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  }
});

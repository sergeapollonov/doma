import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { CalendarEvent } from '../../../types/calendar';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../../components/family';

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
        <TouchableOpacity style={styles.actionButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.actionLabel}>{events.length > 2 ? '2 события' : `${events.length} события`}</Text>
          <Ionicons name="chevron-forward" size={14} color="#8C77F6" />
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {events.slice(0, 2).map((event, index) => (
          <TouchableOpacity 
            key={event.id} 
            style={[styles.eventRow, index > 0 && styles.rowBorder]}
            onPress={() => onPressEvent?.(event)}
          >
            <View style={styles.accentLine} />
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>{event.time}</Text>
            </View>
            
            <View style={styles.detailsColumn}>
              <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
              {event.location && (
                <Text style={styles.location} numberOfLines={1}>{event.location}</Text>
              )}
            </View>

            <View style={styles.iconColumn}>
              <View style={styles.participantsChip}>
                {event.participants?.map((p: string, idx: number) => (
                  <View key={p} style={{ marginLeft: idx > 0 ? -6 : 0, zIndex: 10 - idx }}>
                    <Avatar person={p as any} size={22} />
                  </View>
                ))}
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
    paddingTop: 20,
    paddingBottom: 4,
    marginBottom: spacing.md,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
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
    backgroundColor: '#8C77F6',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  timeColumn: {
    width: 50,
  },
  timeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#8C77F6',
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
  participantsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(140, 119, 246, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  }
});

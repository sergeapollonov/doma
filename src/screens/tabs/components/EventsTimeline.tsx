import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { CalendarEvent } from '../../../types/calendar';
import { useCalendarConflicts } from '../hooks/useCalendarConflicts';
import { Ionicons } from '@expo/vector-icons';

type EventsTimelineProps = {
  events: CalendarEvent[];
};

export function EventsTimeline({ events }: EventsTimelineProps) {
  // Хук просчитает наложения (isConflict = true)
  const processedEvents = useCalendarConflicts(events);

  return (
    <View style={styles.container}>
      {processedEvents.map((event, index) => {
        const isPast = event.status === 'completed' || event.status === 'cancelled';
        const isActive = event.status === 'active';
        const hasConflict = event.isConflict;

        return (
          <View key={event.id} style={[styles.eventRow, isPast && styles.eventPast]}>
            {/* Timeline (Время и линия) */}
            <View style={styles.timeColumn}>
              <Text style={[styles.timeText, isActive && styles.timeActive]}>{event.timeStart}</Text>
              {/* Кружок на таймлайне */}
              <View style={[styles.timelineDot, isActive && styles.timelineDotActive]} />
              {/* Линия до следующего (если не последний) */}
              {index < processedEvents.length - 1 && <View style={styles.timelineLine} />}
            </View>

            {/* Карточка события */}
            <View style={styles.cardContainer}>
              {/* Алерт конфликта если есть */}
              {hasConflict && (
                <View style={styles.conflictBadge}>
                  <Ionicons name="warning" size={12} color={colors.dangerRed} />
                  <Text style={styles.conflictText}>⚠ Schedule Conflict</Text>
                </View>
              )}

              <View style={[styles.card, isActive && styles.cardActive]}>
                <View style={styles.cardLeft}>
                  {/* Иконка */}
                  <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
                    <Ionicons name="calendar-outline" size={20} color={isActive ? colors.white : colors.domaBlue} />
                  </View>
                  
                  <View style={styles.details}>
                    <Text style={[styles.title, isPast && styles.textPast]}>{event.title}</Text>
                    {event.location && (
                      <Text style={styles.location}>{event.location}</Text>
                    )}
                    
                    {/* Участники */}
                    <View style={styles.participants}>
                      {event.participants.map((p, idx) => (
                        <Image key={p.id} source={{ uri: p.avatarUrl }} style={[styles.avatar, { marginLeft: idx > 0 ? -8 : 0 }]} />
                      ))}
                      <Text style={styles.participantsText}>
                        {event.participants.map(p => p.name).join(', ')}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Время справа и NOW бейдж */}
                <View style={styles.cardRight}>
                  {isActive ? (
                    <View style={styles.nowBadge}>
                      <Text style={styles.nowText}>NOW</Text>
                    </View>
                  ) : (
                    <Text style={styles.durationText}>{event.timeStart} – {event.timeEnd}</Text>
                  )}
                  <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} style={{ marginTop: 4 }} />
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
  },
  eventRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    minHeight: 80,
  },
  eventPast: {
    opacity: 0.5,
  },
  timeColumn: {
    width: 50,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  timeActive: {
    color: colors.domaBlue,
    fontWeight: '700',
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.strokeSoft,
    zIndex: 2,
  },
  timelineDotActive: {
    backgroundColor: colors.domaBlue,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.strokeLight,
    marginTop: 4,
  },
  cardContainer: {
    flex: 1,
    paddingBottom: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.large,
    // В референсе у событий почти нет фона, они просто лежат на поверхности,
    // Но мы сделаем легкий фон, если это не активное событие.
  },
  cardActive: {
    backgroundColor: 'rgba(29, 74, 118, 0.05)', // Очень легкий фиолетовый/синий оттенок
    borderWidth: 1,
    borderColor: 'rgba(29, 74, 118, 0.1)',
  },
  cardLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: radius.small,
    backgroundColor: 'rgba(29, 74, 118, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  iconWrapperActive: {
    backgroundColor: colors.domaBlue,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  textPast: {
    textDecorationLine: 'line-through',
  },
  location: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.surfacePrimary,
  },
  participantsText: {
    fontSize: 12,
    color: colors.domaBlue, // Фиолетовый акцент для участников в событиях
    marginLeft: 6,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  durationText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  nowBadge: {
    backgroundColor: colors.domaBlue,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  nowText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  conflictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(216, 92, 74, 0.1)', // Light Red
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.small,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  conflictText: {
    fontSize: 11,
    color: colors.dangerRed,
    fontWeight: '600',
    marginLeft: 4,
  }
});

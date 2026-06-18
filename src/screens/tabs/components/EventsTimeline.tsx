import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { CalendarEvent } from '../../../types/calendar';
import { useCalendarConflicts } from '../hooks/useCalendarConflicts';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../../components/family';

type EventsTimelineProps = {
  events: CalendarEvent[];
};

function getEventIcon(title: string): keyof typeof Ionicons.glyphMap {
  const t = title.toLowerCase();
  if (t.includes('врач') || t.includes('поликлиника')) return 'medical-outline';
  if (t.includes('посылк')) return 'cube-outline';
  if (t.includes('плаван') || t.includes('бассейн')) return 'water-outline';
  if (t.includes('школ')) return 'school-outline';
  return 'calendar-outline';
}

export function EventsTimeline({ events }: EventsTimelineProps) {
  const processedEvents = useCalendarConflicts(events);

  return (
    <View style={styles.container}>
      {processedEvents.map((event, index) => {
        const isPast = event.status === 'completed' || event.status === 'cancelled';
        const isActive = event.status === 'active';
        const hasConflict = event.isConflict;
        const iconName = getEventIcon(event.title);

        return (
          <View key={event.id} style={[styles.eventRow, isPast && styles.eventPast]}>
            {/* Timeline (Время и линия) */}
            <View style={styles.timeColumn}>
              <Text style={[styles.timeText, isActive && styles.timeActive]}>{event.timeStart}</Text>
              <View style={[styles.timelineDot, isActive && styles.timelineDotActive]} />
              {index < processedEvents.length - 1 && <View style={styles.timelineLine} />}
            </View>

            {/* Карточка события */}
            <View style={styles.cardContainer}>
              {/* Алерт конфликта */}
              {hasConflict && (
                <View style={styles.conflictBadge}>
                  <Ionicons name="warning" size={12} color={colors.dangerRed} />
                  <Text style={styles.conflictText}>⚠ Schedule Conflict</Text>
                </View>
              )}

              <View style={[styles.card, isActive && styles.cardActive]}>
                
                <View style={styles.cardMain}>
                  {/* Иконка слева */}
                  <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
                    <Ionicons name={iconName} size={24} color={isActive ? colors.white : '#8C77F6'} />
                  </View>
                  
                  <View style={styles.details}>
                    <Text style={[styles.title, isPast && styles.textPast]}>{event.title}</Text>
                    {event.location && (
                      <Text style={styles.location}>{event.location}</Text>
                    )}
                    
                    {/* Участники */}
                    <View style={styles.participants}>
                      {event.participants.map((p, idx) => (
                        <View key={p.id} style={{ marginLeft: idx > 0 ? -8 : 0 }}>
                          <Avatar person={p.id} size={20} />
                        </View>
                      ))}
                      <Text style={styles.participantsText}>
                        {event.participants.map(p => p.name).join(', ')}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Время справа вверху */}
                <View style={styles.cardRight}>
                  {isActive ? (
                    <View style={styles.nowBadge}>
                      <Text style={styles.nowText}>NOW</Text>
                    </View>
                  ) : (
                    <Text style={styles.durationText}>{event.timeStart} – {event.timeEnd}</Text>
                  )}
                  <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} style={{ marginLeft: 8 }} />
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
    marginBottom: spacing.md,
    minHeight: 100,
  },
  eventPast: {
    opacity: 0.6,
  },
  timeColumn: {
    width: 50,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  timeActive: {
    color: colors.domaBlue,
    fontWeight: '700',
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8C77F6', // Фиолетовая точка как на макете
    zIndex: 2,
  },
  timelineDotActive: {
    backgroundColor: colors.domaBlue,
    transform: [{ scale: 1.2 }],
  },
  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: colors.strokeSoft,
    marginTop: 6,
  },
  cardContainer: {
    flex: 1,
    paddingBottom: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xl, // Крупное скругление (20px)
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: colors.strokeLight,
  },
  cardActive: {
    backgroundColor: 'rgba(29, 74, 118, 0.03)',
    borderColor: 'rgba(29, 74, 118, 0.1)',
  },
  cardMain: {
    flexDirection: 'row',
    flex: 1,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(140, 119, 246, 0.1)', // Светло-фиолетовый фон для иконки
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
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  textPast: {
    color: colors.textSecondary,
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
    color: '#8C77F6', // Фиолетовый
    marginLeft: 6,
    fontWeight: '500',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Выравнивание по верху
  },
  durationText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2, // Чтобы выровнять с заголовком
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
    backgroundColor: 'rgba(216, 92, 74, 0.1)', 
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

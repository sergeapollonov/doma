import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
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
    <View style={styles.outerContainer}>
      <Text style={styles.headerTitle}>СОБЫТИЯ</Text>
      
      <View style={styles.eventsList}>
        {processedEvents.map((event, index) => {
          const isPast = event.status === 'completed' || event.status === 'cancelled';
          const isActive = event.status === 'active';
          const hasConflict = event.isConflict;
          const iconName = getEventIcon(event.title);

          return (
            <View key={event.id} style={[styles.eventRow, isPast && styles.eventPast]}>
              {/* Timeline (Время и линия) */}
              <View style={styles.timeColumn}>
                {/* Центрируем время относительно иконки (которая 40x40, значит центр на 20px). Отступ сверху зададим так, чтобы середина текста была на высоте 20px */}
                <View style={styles.timeBlock}>
                  <Text style={[styles.timeText, isActive && styles.timeActive]}>{event.timeStart}</Text>
                  <View style={[styles.timelineDot, isActive && styles.timelineDotActive]} />
                </View>
                {index < processedEvents.length - 1 && <View style={styles.timelineLine} />}
              </View>

              {/* Содержимое события */}
              <View style={styles.eventContent}>
                
                <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
                  <Ionicons name={iconName} size={24} color={colors.white} />
                </View>

                <View style={styles.details}>
                  <Text style={[styles.title, isPast && styles.textPast]}>{event.title}</Text>
                  {event.location && (
                    <Text style={styles.location}>{event.location}</Text>
                  )}
                  
                  {/* Беджи: Участники и Конфликт (в одну строку) */}
                  <View style={styles.chipsRow}>
                    {/* Участники в фиолетовом чипсе */}
                    <View style={styles.participantsChip}>
                      <View style={styles.avatarsRow}>
                        {event.participants.map((p, idx) => (
                          <View key={p.id} style={{ marginLeft: idx > 0 ? -8 : 0, zIndex: 10 - idx }}>
                            <Avatar person={p.id as any} size={20} />
                          </View>
                        ))}
                      </View>
                      <Text style={styles.participantsText} numberOfLines={1}>
                        {event.participants.map(p => p.name).join(', ')}
                      </Text>
                    </View>

                    {/* Алерт конфликта */}
                    {hasConflict && (
                      <View style={styles.conflictBadge}>
                        <Text style={styles.conflictText} numberOfLines={1}>Конфликт расписания</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Время и стрелочка справа */}
                <View style={styles.cardRight}>
                  {isActive ? (
                    <View style={styles.nowBadge}>
                      <Text style={styles.nowText}>NOW</Text>
                    </View>
                  ) : (
                    <View style={styles.timeRightContainer}>
                      <Text style={styles.durationText}>{event.timeStart} – {event.timeEnd}</Text>
                      <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} style={{ marginLeft: 4 }} />
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.showAllButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.showAllText}>Показать весь день (2)</Text>
        <Ionicons name="chevron-down" size={16} color="#8C77F6" style={{ marginLeft: 4, marginTop: 2 }} />
      </TouchableOpacity>
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
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8C77F6',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
  },
  eventsList: {
    paddingLeft: 4,
  },
  eventRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  eventPast: {
    opacity: 0.6,
  },
  timeColumn: {
    width: 44,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  timeBlock: {
    height: 48, // Высота иконки, чтобы центрировать относительно нее
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 4,
  },
  timeActive: {
    color: '#8C77F6',
    fontWeight: '700',
  },
  timelineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8C77F6',
    zIndex: 2,
  },
  timelineDotActive: {
    backgroundColor: '#8C77F6',
    transform: [{ scale: 1.5 }],
  },
  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: colors.strokeSoft,
    marginTop: -8, // Чтобы линия начиналась ближе к точке
    marginBottom: -8,
  },
  eventContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#9A86F9', // Светло-фиолетовый фон для иконки
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  iconWrapperActive: {
    backgroundColor: '#8C77F6', // Более насыщенный для активного
  },
  details: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  textPast: {
    color: colors.textSecondary,
  },
  location: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  chipsRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  participantsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(140, 119, 246, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    flexShrink: 1,
    marginRight: 8, // Вместо gap в chipsRow
  },
  avatarsRow: {
    flexDirection: 'row',
  },
  participantsText: {
    fontSize: 12,
    color: '#8C77F6',
    marginLeft: 6,
    fontWeight: '600',
    flexShrink: 1, // Позволяет тексту усекаться
  },
  conflictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(216, 92, 74, 0.1)', 
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: radius.pill,
    flexShrink: 0,
    marginTop: 6,
  },
  conflictText: {
    fontSize: 10,
    color: colors.dangerRed,
    fontWeight: '600',
  },
  cardRight: {
    marginLeft: 8,
    paddingTop: 4,
  },
  timeRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 11,
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
  showAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    paddingVertical: spacing.sm,
  },
  showAllText: {
    color: '#8C77F6',
    fontWeight: '600',
    fontSize: 14,
  }
});

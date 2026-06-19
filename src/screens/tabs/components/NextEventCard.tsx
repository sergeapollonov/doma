import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type NextEventCardProps = {
  event: any; // EventItem
  onPress?: () => void;
  timeUntilStart?: string;
};

export function NextEventCard({ event, onPress, timeUntilStart }: NextEventCardProps) {
  if (!event) return null;

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        {/* Placeholder for map */}
        <Image 
          source={require('../../../../assets/map.png')} 
          style={styles.mapBackground}
          resizeMode="cover"
        />
        <LinearGradient
          colors={[colors.surfacePrimary, colors.surfacePrimary, 'rgba(255,255,255,0)']}
          locations={[0, 0.45, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
        
        <Text style={styles.headerTitle}>БЛИЖАЙШЕЕ СОБЫТИЕ</Text>

        <View style={styles.mainContent}>
          {/* Date Square */}
          <View style={styles.dateSquare}>
            <Text style={styles.dateNumber}>12</Text>
            <Text style={styles.dateMonth}>июня</Text>
          </View>

          {/* Details */}
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
            {event.location && (
              <Text style={styles.location} numberOfLines={1}>{event.location}</Text>
            )}
            <View style={styles.timeRow}>
              <View style={styles.todayChip}>
                <Text style={styles.todayText}>Сегодня</Text>
              </View>
              <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
              <Text style={styles.timeText}>{event.time}</Text>
            </View>
          </View>
          
          {/* Map Pin icon */}
          <View style={styles.pinIcon}>
             <Ionicons name="location" size={18} color={colors.white} />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Text style={styles.timeUntil}>{timeUntilStart || 'скоро'}</Text>
          <Ionicons name="chevron-forward" size={14} color="#8C77F6" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8C77F6',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    marginBottom: spacing.xs,
  },
  card: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    overflow: 'hidden',
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: colors.strokeLight,
  },
  mapBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '55%',
    opacity: 0.35,
  },
  mainContent: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    position: 'relative',
  },
  dateSquare: {
    width: 56,
    height: 56,
    backgroundColor: '#8C77F6',
    borderRadius: radius.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  dateNumber: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
  dateMonth: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.9,
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
  location: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayChip: {
    backgroundColor: 'rgba(140, 119, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginRight: 8,
  },
  todayText: {
    color: '#8C77F6',
    fontSize: 11,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  pinIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8C77F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.strokeLight,
    marginHorizontal: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  timeUntil: {
    fontSize: 13,
    color: '#8C77F6',
    fontWeight: '600',
  }
});

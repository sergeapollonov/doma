import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

type FamilyPulseCardProps = {
  eventsCount?: number;
  tasksCount?: number;
  shoppingCount?: number;
  progress?: number;
};

export function FamilyPulseCard({
  eventsCount = 4,
  tasksCount = 3,
  shoppingCount = 3,
  progress = 0.65,
}: FamilyPulseCardProps) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>ПУЛЬС СЕМЬИ</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>

        <View style={styles.statsRow}>
          {/* События */}
          <View style={styles.statColumn}>
            <Text style={styles.statNumber}>{eventsCount}</Text>
            <Text style={styles.statLabelMain}>события</Text>
            <Text style={styles.statLabelSub}>впереди</Text>
          </View>

          <View style={styles.divider} />
          
          {/* Задачи */}
          <View style={styles.statColumn}>
            <Text style={styles.statNumber}>{tasksCount}</Text>
            <Text style={styles.statLabelMain}>задачи</Text>
            <Text style={styles.statLabelSub}>в процессе</Text>
          </View>

          <View style={styles.divider} />

          {/* Покупки */}
          <View style={styles.statColumn}>
            <Text style={styles.statNumber}>{shoppingCount}</Text>
            <Text style={styles.statLabelMain}>покупки</Text>
            <Text style={styles.statLabelSub}>осталось</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: spacing.md,
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
    color: '#8C77F6',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(140, 119, 246, 0.15)',
    borderRadius: 3,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#8C77F6',
    borderRadius: 3,
  },
  card: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: 20,
    paddingBottom: spacing.lg,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: colors.strokeLight,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 24,
    marginBottom: 4,
  },
  statLabelMain: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabelSub: {
    fontSize: 10,
    color: colors.textTertiary,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.strokeLight,
    marginHorizontal: spacing.md,
  }
});

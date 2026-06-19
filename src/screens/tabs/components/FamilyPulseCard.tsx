import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

type FamilyPulseCardProps = {
  eventsCount?: number;
  tasksCount?: number;
  shoppingCount?: number;
};

export function FamilyPulseCard({
  eventsCount = 4,
  tasksCount = 3,
  shoppingCount = 3,
}: FamilyPulseCardProps) {
  return (
    <View style={styles.outerContainer}>
      <Text style={styles.headerTitle}>ПУЛЬС СЕМЬИ</Text>

      <View style={styles.card}>
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

          {/* Статус */}
          <View style={styles.statusColumn}>
            <View style={styles.statusCircle}>
              <Ionicons name="heart" size={24} color={colors.white} />
            </View>
            <Text style={styles.statusLabelMain}>Всё под</Text>
            <Text style={styles.statusLabelSub}>контролем</Text>
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
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8C77F6',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.sm,
  },
  card: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.lg,
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
    marginHorizontal: 4,
  },
  statusColumn: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  statusCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8C77F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    shadowColor: '#8C77F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  statusLabelMain: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 14,
  },
  statusLabelSub: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 14,
  }
});

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, radius, spacing } from '../../../theme';

export function WeeklyOverviewCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Неделя: 8 – 14 июня</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#8C77F6' }]}>8</Text>
          <Text style={styles.statLabel}>событий</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.taskOrange }]}>12</Text>
          <Text style={styles.statLabel}>задач</Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.shoppingGreen }]}>17</Text>
          <Text style={styles.statLabel}>покупок</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xlarge,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    alignItems: 'center',
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colors.strokeLight,
  }
});

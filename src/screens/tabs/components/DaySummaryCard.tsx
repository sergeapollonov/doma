import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { useWeather } from '../hooks/useWeather';

export function DaySummaryCard() {
  const { weather } = useWeather();

  return (
    <View style={styles.outerShell}>
      <View style={styles.innerCore}>
        {/* Заголовок и погода */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Четверг, 12 июня</Text>
          <View style={styles.weatherBadge}>
            <Text style={styles.weatherText}>
              {weather ? (weather.condition === 'sunny' ? '☀️' : '☁️') : '...'} {weather?.temp ?? '--'}°
            </Text>
          </View>
        </View>

        {/* Счетчики */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={[styles.statDot, { backgroundColor: colors.domaBlue }]} />
            <Text style={styles.statText}>
              <Text style={styles.statNumber}>2</Text> события
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statDot, { backgroundColor: colors.taskOrange }]} />
            <Text style={styles.statText}>
              <Text style={styles.statNumber}>4</Text> задачи
            </Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statDot, { backgroundColor: colors.shoppingGreen }]} />
            <Text style={styles.statText}>
              <Text style={styles.statNumber}>3</Text> покупки
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerShell: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 6,
    borderRadius: radius.xlarge,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    marginBottom: spacing.xxl,
  },
  innerCore: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    padding: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  weatherBadge: {
    backgroundColor: colors.surfaceWarm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
  },
  weatherText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.warmBackground,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  statNumber: {
    fontWeight: '700',
    color: colors.textPrimary,
  }
});

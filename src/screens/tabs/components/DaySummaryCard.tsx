import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { useWeather } from '../hooks/useWeather';
import { Ionicons } from '@expo/vector-icons';

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
            <Ionicons name="chevron-down" size={12} color={colors.textSecondary} style={{ marginLeft: 4 }} />
          </View>
        </View>

        {/* Счетчики */}
        <View style={styles.statsRow}>
          {/* События */}
          <View style={styles.statColumn}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(140, 119, 246, 0.1)' }]}>
              <Ionicons name="calendar-outline" size={20} color="#8C77F6" />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabelMain}>события</Text>
              <Text style={styles.statLabelSub}>запланировано</Text>
            </View>
          </View>

          <View style={styles.divider} />
          
          {/* Задачи */}
          <View style={styles.statColumn}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(239, 138, 31, 0.1)' }]}>
              <Ionicons name="checkmark-circle-outline" size={20} color={colors.taskOrange} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabelMain}>задачи</Text>
              <Text style={styles.statLabelSub}>на сегодня</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Покупки */}
          <View style={styles.statColumn}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(95, 150, 105, 0.1)' }]}>
              <Ionicons name="cart-outline" size={20} color={colors.shoppingGreen} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabelMain}>покупки</Text>
              <Text style={styles.statLabelSub}>нужно купить</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerShell: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 4,
    borderRadius: radius.xlarge,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    marginBottom: spacing.md,
  },
  innerCore: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  weatherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceWarm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
  },
  weatherText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  iconBox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  statInfo: {
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 22,
  },
  statLabelMain: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 16,
  },
  statLabelSub: {
    fontSize: 11,
    color: colors.textTertiary,
    lineHeight: 13,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: colors.strokeLight,
    marginTop: 6,
    marginHorizontal: 8,
  }
});

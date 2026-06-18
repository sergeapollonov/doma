import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

type WeekStripProps = {
  selectedDate: number;
};

// Мок данных недели для визуализации
const weekDays = [
  { dayName: 'Пн', date: 8, dots: [colors.domaBlue, colors.taskOrange] },
  { dayName: 'Вт', date: 9, dots: [colors.taskOrange, colors.shoppingGreen] },
  { dayName: 'Ср', date: 10, dots: [colors.domaBlue, colors.taskOrange] },
  { dayName: 'Чт', date: 11, dots: [colors.domaBlue, colors.taskOrange, colors.shoppingGreen] },
  { dayName: 'Пт', date: 12, dots: [colors.domaBlue, colors.taskOrange, colors.shoppingGreen] },
  { dayName: 'Сб', date: 13, dots: [colors.domaBlue, colors.shoppingGreen] },
  { dayName: 'Вс', date: 14, dots: [colors.taskOrange, colors.shoppingGreen] },
];

export function WeekStrip({ selectedDate }: WeekStripProps) {
  return (
    <View style={styles.outerShell}>
      <View style={styles.innerCore}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.daysContainer}>
          {weekDays.map((item) => {
            const isSelected = item.date === selectedDate;
            return (
              <TouchableOpacity key={item.date} style={[styles.dayCell, isSelected && styles.dayCellSelected]}>
                <Text style={[styles.dayName, isSelected && styles.textWhite]}>{item.dayName}</Text>
                <Text style={[styles.dateNumber, isSelected && styles.textWhite]}>{item.date}</Text>
                
                <View style={styles.dotsContainer}>
                  {item.dots.map((dotColor, idx) => (
                    <View key={idx} style={[styles.dot, { backgroundColor: dotColor }]} />
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
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
    marginBottom: spacing.sm,
    marginHorizontal: 20,
    width: 'auto',
  },
  innerCore: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    padding: 2,
  },
  daysContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  dayCell: {
    width: 36,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.md,
  },
  dayCellSelected: {
    backgroundColor: '#8C77F6', // Фиолетовый вместо domaBlue
    shadowColor: '#8C77F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  dayName: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  dateNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  textWhite: {
    color: colors.white,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 3,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  }
});

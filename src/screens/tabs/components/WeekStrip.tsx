import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../../../theme';

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
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    width: '100%',
  },
  dayCell: {
    width: 44,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.md,
  },
  dayCellSelected: {
    backgroundColor: colors.domaBlue,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  dayName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  dateNumber: {
    fontSize: 16,
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

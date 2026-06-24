import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";

type CalendarDayProps = {
  day: number;
  selected: boolean;
  today: boolean;
  hasEvents: boolean;
  onPress: () => void;
};

export function CalendarDay({ day, selected, today, hasEvents, onPress }: CalendarDayProps) {
  return (
    <Pressable style={[styles.dayCell, selected && styles.dayCellSelected, today && !selected && styles.dayCellToday]} onPress={onPress}>
      <Text style={[styles.dayText, selected && styles.dayTextSelected]}>{day}</Text>
      <View style={styles.dotLine}>
        {hasEvents && (
          <>
            <View style={[styles.eventDot, { backgroundColor: colors.domaBlue }]} />
            <View style={[styles.eventDot, { backgroundColor: colors.taskOrange }]} />
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dayCell: {
    width: `${100 / 7}%`,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25
  },
  dayCellSelected: {
    backgroundColor: colors.domaBlue
  },
  dayCellToday: {
    borderWidth: 1,
    borderColor: colors.domaGold
  },
  dayText: {
    color: colors.textPrimary,
    fontSize: 25,
    fontWeight: "500",
    fontVariant: ['tabular-nums'],
  },
  dayTextSelected: {
    color: colors.white
  },
  dotLine: {
    height: 7,
    marginTop: 3,
    flexDirection: "row",
    gap: 2
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  }
});

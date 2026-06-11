import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import { IconButton } from "../ui";
import { CalendarDay } from "./CalendarDay";

type CalendarMonthProps = {
  title: string;
  days: number[];
  weekDays: string[];
  selectedDay: number;
  todayDay: number;
  eventDays: ReadonlySet<number>;
  onSelectDay: (day: number) => void;
};

export function CalendarMonth({ title, days, weekDays, selectedDay, todayDay, eventDays, onSelectDay }: CalendarMonthProps) {
  return (
    <>
      <View style={styles.monthHeader}>
        <IconButton icon="chevron-back" />
        <Text style={styles.monthTitle}>{title}</Text>
        <IconButton icon="chevron-forward" />
      </View>
      <View style={styles.calendarCard}>
        <View style={styles.weekRow}>
          {weekDays.map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.calendarGrid}>
          {days.map((day) => (
            <CalendarDay
              key={day}
              day={day}
              selected={day === selectedDay}
              today={day === todayDay}
              hasEvents={eventDays.has(day)}
              onPress={() => onSelectDay(day)}
            />
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 22
  },
  monthTitle: {
    color: colors.domaBlue,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "600"
  },
  calendarCard: {
    paddingHorizontal: 2,
    paddingBottom: 16
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 10
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 18,
    fontWeight: "500"
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

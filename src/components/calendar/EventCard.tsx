import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import type { EventItem } from "../../types";
import { AvatarGroup } from "../family";
import type { IconName } from "../ui";

const eventVisuals = [
  { color: colors.domaBlue, icon: "calendar-outline" as IconName },
  { color: colors.taskOrange, icon: "cube-outline" as IconName },
  { color: colors.domaGold, icon: "restaurant-outline" as IconName }
];

type EventCardProps = {
  event: EventItem;
  participantsLabel: string;
  index?: number;
  grouped?: boolean;
};

export function EventCard({ event, participantsLabel, index = 0, grouped = false }: EventCardProps) {
  const visual = eventVisuals[index % eventVisuals.length];

  return (
    <Pressable style={[styles.eventRow, grouped && styles.groupedRow]}>
      <View style={[styles.rowAccent, { backgroundColor: visual.color }]} />
      <View style={[styles.eventIconTile, { backgroundColor: visual.color }]}>
        <Ionicons name={visual.icon} size={22} color={colors.white} />
      </View>
      <Text style={styles.eventTimeText}>{event.time}</Text>
      <View style={styles.rowGrow}>
        <Text style={styles.rowTitle}>{event.title}</Text>
        <Text style={styles.caption}>{participantsLabel}</Text>
      </View>
      <AvatarGroup participants={event.participants} />
      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
    </Pressable>
  );
}

export function CalendarEventCard({ event, participantsLabel, index = 0 }: Omit<EventCardProps, "grouped">) {
  const visual = eventVisuals[index % eventVisuals.length];

  return (
    <Pressable style={styles.calendarEventRow}>
      <View style={[styles.calendarTimeTile, { backgroundColor: visual.color }]}>
        <Ionicons name={visual.icon} size={25} color={colors.white} />
        <Text style={styles.calendarTimeText}>{event.time}</Text>
      </View>
      <View style={styles.rowGrow}>
        <Text style={styles.calendarEventTitle}>{event.title}</Text>
        <View style={styles.inlineMeta}>
          <AvatarGroup participants={event.participants} small />
          <Text style={styles.caption}>{participantsLabel}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  eventRow: {
    minHeight: 82,
    borderRadius: 0,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider
  },
  groupedRow: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider
  },
  rowAccent: {
    width: 4,
    height: 54,
    borderRadius: 4
  },
  eventIconTile: {
    width: 56,
    height: 56,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#372614",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 }
  },
  eventTimeText: {
    color: colors.domaBlue,
    fontSize: 24,
    fontWeight: "500",
    minWidth: 66
  },
  rowGrow: {
    flex: 1
  },
  rowTitle: {
    color: colors.domaBlue,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "500"
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 12.5,
    lineHeight: 17
  },
  calendarEventRow: {
    minHeight: 108,
    borderRadius: 24,
    padding: 12,
    marginBottom: 12,
    backgroundColor: colors.glass.medium,
    borderWidth: 1,
    borderColor: colors.glass.borderHeavy,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#372614",
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 }
  },
  calendarTimeTile: {
    width: 86,
    height: 86,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    gap: 6
  },
  calendarTimeText: {
    color: colors.white,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "600"
  },
  calendarEventTitle: {
    color: colors.domaBlue,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "500"
  },
  inlineMeta: {
    marginTop: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  }
});

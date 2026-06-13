import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text } from "react-native";

import { CalendarEventCard, CalendarMonth } from "../../components/calendar";
import { Card, SectionHeader } from "../../components/ui";
import { colors } from "../../theme";
import type { EventItem } from "../../types";
import type { copy } from "../../i18n";

type CalendarScreenProps = {
  text: typeof copy.ru;
  selectedDateTitle: string;
  selectedDay: number;
  selectedEvents: EventItem[];
  eventDays: ReadonlySet<number>;
  participantsLabel: (participants: EventItem["participants"]) => string;
  onSelectDay: (day: number) => void;
  onAddEvent: () => void;
};

export function CalendarScreen({
  text,
  selectedDateTitle,
  selectedDay,
  selectedEvents,
  eventDays,
  participantsLabel,
  onSelectDay,
  onAddEvent
}: CalendarScreenProps) {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);

  return (
    <>
      <CalendarMonth
        title={text.monthJune2026}
        days={days}
        weekDays={text.weekDays}
        selectedDay={selectedDay}
        todayDay={3}
        eventDays={eventDays}
        onSelectDay={onSelectDay}
      />
      <SectionHeader title={selectedDateTitle} action={text.add} onPress={onAddEvent} />
      {selectedEvents.length > 0 ? (
        selectedEvents.map((event, index) => (
          <CalendarEventCard key={`cal-${event.id}`} event={event} participantsLabel={participantsLabel(event.participants)} index={index} />
        ))
      ) : (
        <EmptyState title={text.emptyToday} description={text.emptyTodayHint} />
      )}
    </>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card style={styles.emptyState}>
      <Ionicons name="sparkles-outline" size={24} color={colors.domaGold} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.captionCentered}>{description}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800"
  },
  captionCentered: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center"
  },
  emptyState: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 24
  }
});

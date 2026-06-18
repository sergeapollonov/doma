import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { colors } from "../../theme";
import type { EventItem } from "../../types";
import type { copy } from "../../i18n";

import { FilterPanel } from "./components/FilterPanel";
import { WeekStrip } from "./components/WeekStrip";
import { DaySummaryCard } from "./components/DaySummaryCard";
import { SectionHeader } from "./components/SectionHeader";
import { EventsTimeline } from "./components/EventsTimeline";
import { TasksSection } from "./components/TasksSection";
import { ShoppingSection } from "./components/ShoppingSection";
import { WeeklyOverviewCard } from "./components/WeeklyOverviewCard";
import { mockCalendarEvents, mockCalendarTasks, mockCalendarShopping } from "../../utils/calendarMocks";

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
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Animated.ScrollView
      style={styles.container}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      stickyHeaderIndices={[1]} // Индекс элемента, который будет липким
      contentContainerStyle={styles.scrollContent}
    >
      {/* 0. Схлопывающийся Header */}
      <View style={styles.headerPlaceHolder}>
        <Text style={styles.headerTitle}>{text.monthJune2026}</Text>
      </View>

      {/* 1. Sticky Panel (FilterPanel + WeekStrip) */}
      <View style={styles.stickyContainer}>
        <FilterPanel activeUserFilter="family" activeTypeFilter="all" />
        <WeekStrip selectedDate={12} />
      </View>

      {/* 2. Main Content (DaySummary, Timeline, Tasks, Shopping) */}
      <View style={styles.mainContent}>
        <DaySummaryCard />
        
        <SectionHeader title="События" colorTheme="purple" />
        <EventsTimeline events={mockCalendarEvents} />

        <SectionHeader title="Задачи на день" actionLabel="4 задачи" colorTheme="orange" />
        <TasksSection tasks={mockCalendarTasks} />

        <SectionHeader title="Покупки на сегодня" actionLabel="3 из 17" colorTheme="green" />
        <ShoppingSection items={mockCalendarShopping} />

        {/* 3. Weekly Overview */}
        <WeeklyOverviewCard />
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warmBackground, // F7F1E8
  },
  scrollContent: {
    paddingBottom: 120, // Чтобы не перекрывалось таб-баром
  },
  headerPlaceHolder: {
    height: 88,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: colors.warmBackground,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: colors.textPrimary,
    fontFamily: "Playfair Display",
  },
  stickyContainer: {
    backgroundColor: colors.warmBackground, // Важно для перекрытия контента под ним
    paddingTop: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeSoft,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
});

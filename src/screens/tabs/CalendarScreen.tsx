import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
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
      <View style={styles.headerContainer}>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitleMain}>Календарь</Text>
          <TouchableOpacity style={styles.monthSelector}>
            <Text style={styles.monthSelectorText}>{text.monthJune2026}</Text>
            <Ionicons name="chevron-down" size={12} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButtonLight}>
            <Ionicons name="search" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonPrimary} onPress={onAddEvent}>
            <Ionicons name="add" size={32} color={colors.white} />
          </TouchableOpacity>
        </View>
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
    paddingBottom: 100, // Чтобы не перекрывалось таб-баром
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 8,
    backgroundColor: colors.warmBackground,
  },
  headerTitles: {
    flex: 1,
  },
  headerTitleMain: {
    fontSize: 34,
    fontWeight: "700",
    color: colors.textPrimary,
    fontFamily: "Playfair Display",
    marginBottom: 4,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthSelectorText: {
    fontSize: 15,
    color: colors.textSecondary,
    marginRight: 4,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 4,
  },
  actionButtonLight: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfacePrimary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.strokeSoft,
  },
  actionButtonPrimary: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8C77F6', // Фиолетовый с макета для кнопки плюс
    justifyContent: "center",
    alignItems: "center",
  },
  stickyContainer: {
    backgroundColor: colors.warmBackground, // Важно для перекрытия контента под ним
    paddingTop: 8,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});

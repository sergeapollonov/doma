import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Avatar } from "../../components/family";
import { DaySummaryCard } from "./components/DaySummaryCard";
import { NextEventCard } from "./components/NextEventCard";
import { TodayEventsList } from "./components/TodayEventsList";
import { TasksSection } from "./components/TasksSection";
import { ShoppingSection } from "./components/ShoppingSection";
import { FamilyPulseCard } from "./components/FamilyPulseCard";
import { Card, EmptyState } from "../../components/ui";
import { colors, typography } from "../../theme";
import type { EventItem, TaskItem, ShoppingItem } from "../../types";
import type { copy } from "../../i18n";
import { getTodayBriefing, getFamilyPulse } from "../../mappers/appUiMappers";

type TodayScreenProps = {
  text: typeof copy.ru;
  selectedEvents: EventItem[];
  activeTasks: TaskItem[];
  pendingShopping: ShoppingItem[];
  purchasedCount: number;
  participantsLabel: (participants: EventItem["participants"]) => string;
  assigneeLabel: (assignee: TaskItem["assignee"]) => string;
  onOpenQuickAdd: () => void;
  onOpenCalendar: () => void;
  onOpenTasks: () => void;
  onOpenShopping: () => void;
  onToggleTask: (taskId: string) => void;
};

export function TodayScreen({
  text,
  selectedEvents,
  activeTasks,
  pendingShopping,
  participantsLabel,
  assigneeLabel,
  onOpenQuickAdd,
  onOpenCalendar,
  onOpenTasks,
  onOpenShopping,
  onToggleTask
}: TodayScreenProps) {
  const todayIso = "2026-06-03"; 
  
  const briefing = getTodayBriefing(selectedEvents, activeTasks, pendingShopping, todayIso);
  const pulse = getFamilyPulse(activeTasks, selectedEvents, todayIso);
  
  return (
    <View style={styles.container}>
      <View style={styles.sunWash} />

      <View style={styles.headerRow}>
        <View style={styles.greetingBlock}>
          <Text style={styles.greetingTitle}>{text.morning}</Text>
          <Text style={styles.greetingDate}>{text.todayDate}</Text>
        </View>
        <View style={styles.headerAvatars}>
          <View style={styles.avatarWithLabel}>
            <Avatar person="alex" size={48} />
            <Text style={styles.avatarLabel}>Алексей</Text>
          </View>
          <View style={styles.avatarWithLabel}>
            <Avatar person="maya" size={48} />
            <Text style={styles.avatarLabel}>Мая</Text>
          </View>
        </View>
      </View>

      <DaySummaryCard 
        eventsCount={briefing.eventsCount}
        tasksCount={briefing.tasksCount}
        shoppingCount={briefing.shoppingCount}
        hideHeader={true}
        eventsSubLabel="сегодня"
        tasksSubLabel="сегодня"
        shoppingSubLabel="осталось"
        onPress={onOpenCalendar}
      />

      {selectedEvents.length > 0 ? (
        <>
          <NextEventCard 
            event={selectedEvents[0]} 
            onPress={onOpenCalendar}
            timeUntilStart="через 5 ч 49 мин" 
          />
          {selectedEvents.length > 1 && (
            <TodayEventsList 
              events={selectedEvents.slice(1)} 
              onPressEvent={onOpenCalendar}
            />
          )}
        </>
      ) : (
        <Card style={[styles.groupCard, { marginBottom: 16 }]}>
          <EmptyState title={text.allDone} style={{ paddingVertical: 16 }} />
        </Card>
      )}

      <TasksSection 
        tasks={activeTasks.slice(0, 4)} 
        title="ЗАДАЧИ СЕГОДНЯ"
        actionLabel={`${activeTasks.length} задачи`}
        onActionPress={onOpenCalendar}
      />

      <ShoppingSection 
        items={pendingShopping}
        title="ПОКУПКИ"
        actionLabel={`${pendingShopping.length} из 17`}
        onActionPress={onOpenCalendar}
      />

      <FamilyPulseCard 
        eventsCount={pulse.eventsAhead}
        tasksCount={pulse.tasksDoneToday}
        shoppingCount={pendingShopping.length}
      />

      <Pressable style={styles.fab} onPress={onOpenQuickAdd} accessibilityRole="button" accessibilityLabel={text.add}>
        <Ionicons name="add" size={32} color={colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 80
  },
  sunWash: {
    position: "absolute",
    right: -40,
    top: 0,
    width: 245,
    height: 190,
    borderRadius: 95,
    backgroundColor: colors.glass.light,
    shadowColor: colors.domaGold,
    shadowOpacity: 0.14,
    shadowRadius: 55,
    shadowOffset: { width: -18, height: 22 },
    zIndex: -1
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32
  },
  greetingBlock: {
    flex: 1
  },
  greetingTitle: {
    color: colors.domaBlue,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    fontFamily: typography.fontFamily.brand,
    letterSpacing: 0
  },
  greetingDate: {
    marginTop: 6,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "500"
  },
  briefingSubtitle: {
    marginTop: 4,
    color: colors.textSecondary,
    fontSize: 14
  },
  headerAvatars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  avatarWithLabel: {
    alignItems: "center"
  },
  avatarLabel: {
    marginTop: 6,
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500"
  },
  groupCard: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 20,
    marginBottom: 24
  },

  fab: {
    position: "absolute",
    bottom: -16,
    right: 0,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.domaGold,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.domaGold,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 }
  }
});


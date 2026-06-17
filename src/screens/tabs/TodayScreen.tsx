import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { EventCard } from "../../components/calendar";
import { Avatar } from "../../components/family";
import { TaskRow } from "../../components/tasks";
import { Card, SectionHeader, EmptyState } from "../../components/ui";
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
  
  const focusTasks = activeTasks.slice(0, 3);
  const topShopping = pendingShopping.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.sunWash} />

      <View style={styles.headerRow}>
        <View style={styles.greetingBlock}>
          <Text style={styles.greetingTitle}>{text.morning} ☀️</Text>
          <Text style={styles.greetingDate}>{text.todayDate}</Text>
          <Text style={styles.briefingSubtitle}>
            {text.briefingSubtitle(briefing.eventsCount, briefing.tasksCount, briefing.shoppingCount)}
          </Text>
        </View>
        <View style={styles.headerAvatars}>
          <View style={styles.avatarOverlap}>
            <Avatar person="alex" size={44} />
          </View>
          <Avatar person="maya" size={44} />
        </View>
      </View>

      <SectionHeader title={text.upcoming} action={text.seeAll} onPress={onOpenCalendar} />
      <Card style={styles.groupCard}>
        {selectedEvents.length > 0 ? (
          selectedEvents.slice(0, 3).map((event, index) => (
            <EventCard key={event.id} event={event} participantsLabel={participantsLabel(event.participants)} index={index} grouped />
          ))
        ) : (
          <EmptyState title={text.todayFree} style={{ paddingVertical: 16 }} />
        )}
      </Card>

      <SectionHeader title={text.tasksForToday} action={text.seeAll} onPress={onOpenTasks} />
      <Card style={styles.groupCard}>
        {focusTasks.length > 0 ? (
          focusTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              assignee={assigneeLabel(task.assignee)}
              completedLabel={text.completedToday}
              noReminderLabel={text.noReminder}
              onToggle={() => onToggleTask(task.id)}
              grouped
            />
          ))
        ) : (
          <EmptyState title={text.allDone} style={{ paddingVertical: 16 }} />
        )}
      </Card>

      <SectionHeader title={text.needToBuy} action={text.seeAll} onPress={onOpenShopping} />
      <Card style={styles.shoppingCard}>
        {topShopping.length > 0 ? (
          topShopping.map((item, index) => (
            <Pressable key={item.id} style={[styles.shoppingRow, index > 0 && styles.shoppingRowBorder]} onPress={onOpenShopping}>
              <View style={styles.shoppingDot} />
              <Text style={styles.shoppingTitle}>{item.title}</Text>
            </Pressable>
          ))
        ) : (
          <EmptyState title={text.fridgeFull} style={{ paddingVertical: 16 }} />
        )}
      </Card>

      <Card style={styles.pulseCard}>
        <View style={styles.pulseIconWrap}>
          <Ionicons name="people" size={24} color={colors.white} />
        </View>
        <View style={styles.pulseContent}>
          <View style={styles.pulseHeader}>
            <Text style={styles.pulseTitle}>{text.familyPulse}</Text>
            <View style={styles.pulseBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.pulseBadgeText}>{text.todaysProgress}</Text>
            </View>
          </View>
          <View style={styles.pulseBar}>
            <View style={[styles.pulseFill, { width: "40%" }]} />
          </View>
          <Text style={styles.pulseText}>{text.tasksDone(pulse.tasksDoneToday)}, {text.eventsAhead(pulse.eventsAhead)}</Text>
        </View>
      </Card>

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
    alignItems: "center"
  },
  avatarOverlap: {
    marginRight: -12,
    zIndex: 1,
    borderWidth: 2,
    borderColor: colors.surfaceWarm,
    borderRadius: 24
  },
  groupCard: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 20,
    marginBottom: 24
  },
  shoppingCard: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24
  },
  shoppingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12
  },
  shoppingRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.strokeLight
  },
  shoppingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.domaGold
  },
  shoppingTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "500"
  },
  pulseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.familySand,
    borderRadius: 20,
    padding: 16,
    gap: 16,
    marginTop: 8
  },
  pulseIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center"
  },
  pulseContent: {
    flex: 1
  },
  pulseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  pulseTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary
  },
  pulseBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.domaGold
  },
  pulseBadgeText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500"
  },
  pulseBar: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 2,
    marginBottom: 8,
    overflow: "hidden"
  },
  pulseFill: {
    height: "100%",
    backgroundColor: colors.white,
    borderRadius: 2
  },
  pulseText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: "500"
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


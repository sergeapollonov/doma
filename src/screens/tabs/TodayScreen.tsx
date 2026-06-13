import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { EventCard } from "../../components/calendar";
import { Avatar } from "../../components/family";
import { TaskRow } from "../../components/tasks";
import { Card, SectionHeader } from "../../components/ui";
import { people } from "../../data";
import { colors } from "../../theme";
import type { EventItem, TaskItem } from "../../types";
import type { copy } from "../../i18n";

type TodayScreenProps = {
  text: typeof copy.ru;
  selectedEvents: EventItem[];
  activeTasks: TaskItem[];
  pendingShopping: Array<{ title: string }>;
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
  purchasedCount,
  participantsLabel,
  assigneeLabel,
  onOpenQuickAdd,
  onOpenCalendar,
  onOpenTasks,
  onOpenShopping,
  onToggleTask
}: TodayScreenProps) {
  const remainingShopping = Math.max(pendingShopping.length - 3, 0);
  const shoppingCaption =
    remainingShopping > 0
      ? text.shoppingSummaryMore(remainingShopping, purchasedCount)
      : text.shoppingSummaryBought(purchasedCount);

  return (
    <View>
      <Card style={styles.syncCard}>
        <View style={styles.syncPeople}>
          <View style={styles.syncPerson}>
            <Avatar person="alex" size={58} />
            <Text style={styles.syncName}>{people.alex.name}</Text>
          </View>
          <View style={styles.syncPerson}>
            <Avatar person="maya" size={58} />
            <Text style={styles.syncName}>{people.maya.name}</Text>
          </View>
        </View>
        <View style={styles.syncDivider} />
        <View style={styles.syncState}>
          <View style={styles.syncCheck}>
            <Ionicons name="checkmark" size={28} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.syncTitle}>{text.synced}</Text>
            <Text style={styles.caption}>{text.syncedAgo}</Text>
          </View>
        </View>
      </Card>
      <Pressable style={styles.inlineFab} onPress={onOpenQuickAdd} accessibilityRole="button" accessibilityLabel={text.add}>
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </Pressable>

      <SectionHeader title={text.upcoming} action={text.seeAll} onPress={onOpenCalendar} />
      <Card style={styles.groupCard}>
        {selectedEvents.length > 0 ? (
          selectedEvents.slice(0, 3).map((event, index) => (
            <EventCard key={event.id} event={event} participantsLabel={participantsLabel(event.participants)} index={index} grouped />
          ))
        ) : (
          <Text style={styles.caption}>{text.emptyToday}</Text>
        )}
      </Card>

      <SectionHeader title={text.tasks} action={text.seeAll} onPress={onOpenTasks} />
      <Card style={styles.groupCard}>
        {activeTasks.slice(0, 2).map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            assignee={assigneeLabel(task.assignee)}
            completedLabel={text.completedToday}
            noReminderLabel={text.noReminder}
            onToggle={() => onToggleTask(task.id)}
            grouped
          />
        ))}
      </Card>

      <SectionHeader title={text.shopping} action={text.seeAll} onPress={onOpenShopping} />
      <Pressable style={styles.shoppingSummary} onPress={onOpenShopping}>
        <View style={styles.shoppingIcon}>
          <Ionicons name="bag-handle-outline" size={34} color={colors.shoppingGreen} />
        </View>
        <View style={styles.shoppingSummaryText}>
          <Text style={styles.shoppingSummaryTitle}>{pendingShopping.slice(0, 3).map((item) => item.title.toLowerCase()).join(", ")}</Text>
          <Text style={styles.shoppingSummaryCaption}>{shoppingCaption}</Text>
        </View>
        <View style={styles.shoppingCount}>
          <Text style={styles.shoppingCountText}>{pendingShopping.length}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
      </Pressable>

      <Card style={styles.widgetPreview}>
        <View style={styles.widgetHeader}>
          <Text style={styles.widgetBrand}>Doma</Text>
          <Text style={styles.caption}>{text.tabs.today}</Text>
        </View>
        {selectedEvents.slice(0, 3).map((event) => (
          <View key={`widget-${event.id}`} style={styles.widgetRow}>
            <Text style={styles.widgetTime}>{event.time}</Text>
            <Text style={styles.widgetTitle}>{event.title}</Text>
          </View>
        ))}
        <Text style={styles.widgetFooter}>{text.widgetLine}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  syncCard: {
    minHeight: 108,
    marginTop: -44,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: "rgba(255,255,255,0.66)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 27
  },
  syncPeople: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11
  },
  syncPerson: {
    alignItems: "center",
    gap: 7
  },
  syncName: {
    color: colors.domaBlue,
    fontSize: 13,
    fontWeight: "600"
  },
  syncDivider: {
    width: 1,
    height: 76,
    backgroundColor: "rgba(232,222,210,0.95)",
    marginHorizontal: 7
  },
  syncState: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 0
  },
  syncTitle: {
    color: colors.domaBlue,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700"
  },
  syncCheck: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: colors.shoppingGreen,
    alignItems: "center",
    justifyContent: "center"
  },
  inlineFab: {
    alignSelf: "flex-end",
    width: 66,
    height: 66,
    borderRadius: 33,
    marginTop: -8,
    marginBottom: 0,
    marginRight: 4,
    backgroundColor: colors.domaGold,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.78)",
    shadowColor: colors.domaGold,
    shadowOpacity: 0.24,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 }
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 12.5,
    lineHeight: 17
  },
  groupCard: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 25,
    marginBottom: 14
  },
  shoppingSummary: {
    minHeight: 112,
    borderRadius: 26,
    padding: 18,
    marginBottom: 18,
    backgroundColor: "rgba(255,255,255,0.74)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.88)",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#372614",
    shadowOpacity: 0.09,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 }
  },
  shoppingIcon: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "rgba(95,150,105,0.10)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.86)"
  },
  shoppingSummaryText: {
    flex: 1
  },
  shoppingSummaryTitle: {
    color: colors.domaBlue,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  shoppingSummaryCaption: {
    marginTop: 4,
    color: colors.shoppingGreen,
    fontSize: 17,
    fontWeight: "600"
  },
  shoppingCount: {
    width: 53,
    height: 53,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(95,150,105,0.11)"
  },
  shoppingCountText: {
    color: colors.shoppingGreen,
    fontSize: 25,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  widgetPreview: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.72)"
  },
  widgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  widgetBrand: {
    color: colors.domaBlue,
    fontSize: 18,
    fontWeight: "900"
  },
  widgetRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 3
  },
  widgetTime: {
    width: 45,
    color: colors.domaGold,
    fontWeight: "800",
    fontSize: 13
  },
  widgetTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700"
  },
  widgetFooter: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "700"
  }
});

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, typography } from "../../theme";
import type { TabKey } from "../../types";
import { Avatar } from "../family";
import { IconButton } from "../ui";

type HeaderProps = {
  tab: TabKey;
  greetingTitle: string;
  title: string;
  todayDateLabel: string;
  subtitle: string;
  onFamily: () => void;
  onSettings: () => void;
  onAdd: () => void;
};

export function Header({ tab, title, subtitle, onFamily, onAdd }: HeaderProps) {
  // Экран Today имеет свой собственный кастомный заголовок (Family Briefing Header)
  if (tab === "today") {
    return null;
  }

  return (
    <View style={styles.header}>
      <View style={styles.phoneStatus}>
        <Text style={styles.statusTime}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={17} color="#050505" />
          <Ionicons name="wifi" size={17} color="#050505" />
          <Ionicons name="battery-full" size={23} color="#050505" />
        </View>
      </View>
      
      <View style={styles.brandHeaderRow}>
        <View style={{ flex: 1 }} />
        <View style={styles.headerActions}>
          <IconButton icon="add" onPress={onAdd} />
        </View>
      </View>
      
      <View style={styles.innerHeaderBlock}>
        <View>
          <Text style={styles.innerScreenTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
        {tab === "tasks" || tab === "shopping" ? (
          <Pressable onPress={onFamily} style={styles.taskHeaderAvatars}>
            <Avatar person="alex" size={58} />
            <Avatar person="maya" size={58} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 18,
    marginBottom: 12
  },
  phoneStatus: {
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    marginBottom: 24
  },
  statusTime: {
    color: "#050505",
    fontSize: 17,
    fontWeight: "800"
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  brandHeaderRow: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  innerHeaderBlock: {
    marginTop: 42,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  innerScreenTitle: {
    color: colors.domaBlue,
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "500",
    fontFamily: typography.fontFamily.brand,
    letterSpacing: 0
  },
  taskHeaderAvatars: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center"
  },
  headerSubtitle: {
    marginTop: 3,
    fontSize: 14,
    color: colors.textSecondary
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  }
});

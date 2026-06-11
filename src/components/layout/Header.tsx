import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import type { Language, TabKey } from "../../types";
import { Avatar } from "../family";
import { DomaLogo, IconButton } from "../ui";

type HeaderProps = {
  tab: TabKey;
  language: Language;
  title: string;
  todayDateLabel: string;
  subtitle: string;
  onFamily: () => void;
  onSettings: () => void;
  onAdd: () => void;
};

export function Header({ tab, language, title, todayDateLabel, subtitle, onFamily, onSettings, onAdd }: HeaderProps) {
  return (
    <View style={[styles.header, tab === "today" && styles.todayHeader]}>
      {tab === "today" && <View style={styles.sunWash} />}
      <View style={styles.phoneStatus}>
        <Text style={styles.statusTime}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={17} color="#050505" />
          <Ionicons name="wifi" size={17} color="#050505" />
          <Ionicons name="battery-full" size={23} color="#050505" />
        </View>
      </View>
      <View style={styles.brandHeaderRow}>
        <DomaLogo />
        <View style={styles.headerActions}>
          {tab === "today" ? (
            <IconButton icon="notifications-outline" onPress={onSettings} badge />
          ) : (
            <IconButton icon="add" onPress={onAdd} />
          )}
        </View>
      </View>
      {tab === "today" ? (
        <View style={styles.greetingBlock}>
          <Text style={styles.greetingTitle}>{language === "ru" ? "Доброе утро,\nАлексей 👋" : "Dzień dobry,\nAlex 👋"}</Text>
          <Text style={styles.greetingDate}>{todayDateLabel}</Text>
        </View>
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 18,
    marginBottom: 12
  },
  todayHeader: {
    minHeight: 306,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    overflow: "hidden"
  },
  sunWash: {
    position: "absolute",
    right: -40,
    top: 82,
    width: 245,
    height: 190,
    borderRadius: 95,
    backgroundColor: "rgba(255,255,255,0.54)",
    shadowColor: colors.domaGold,
    shadowOpacity: 0.14,
    shadowRadius: 55,
    shadowOffset: { width: -18, height: 22 }
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
  greetingBlock: {
    marginTop: 30
  },
  greetingTitle: {
    color: colors.domaBlue,
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" }),
    letterSpacing: 0
  },
  greetingDate: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "500"
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
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" }),
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

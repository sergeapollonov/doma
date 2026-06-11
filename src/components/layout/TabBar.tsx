import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import type { TabKey } from "../../types";
import type { IconName } from "../ui";

const tabIcons: Record<TabKey, IconName> = {
  today: "home-outline",
  calendar: "calendar-outline",
  tasks: "checkmark-circle-outline",
  shopping: "bag-outline"
};

type TabBarProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
  labels: Record<TabKey, string>;
};

export function TabBar({ activeTab, onChange, labels }: TabBarProps) {
  const tabs: TabKey[] = ["today", "calendar", "tasks", "shopping"];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const active = tab === activeTab;
        return (
          <Pressable key={tab} style={styles.tabItem} onPress={() => onChange(tab)}>
            <View style={[styles.tabIconWrap, active && styles.tabIconWrapActive]}>
              <Ionicons name={tabIcons[tab]} size={21} color={active ? colors.domaBlue : colors.inactive} />
            </View>
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{labels[tab]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 12,
    height: 84,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.74)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#372614",
    shadowOpacity: 0.12,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 14 }
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  tabIconWrap: {
    width: 56,
    height: 44,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center"
  },
  tabIconWrapActive: {
    backgroundColor: "rgba(255,255,255,0.86)",
    shadowColor: "#372614",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 }
  },
  tabLabel: {
    color: colors.inactive,
    fontSize: 14,
    fontWeight: "500"
  },
  tabLabelActive: {
    color: colors.domaBlue
  }
});

import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Pressable, StyleSheet, Text, View, Animated } from "react-native";
import * as Haptics from 'expo-haptics';

import { colors, sizes, spacing } from "../../theme";
import type { TabKey } from "../../types";
import type { IconName } from "../ui";

const tabIcons: Record<TabKey, IconName> = {
  today: "home-outline",
  calendar: "calendar-outline",
  tasks: "checkmark-circle-outline",
  shopping: "cart-outline"
};

const tabColors: Record<TabKey, string> = {
  today: colors.domaPurple,
  calendar: colors.domaPurple,
  tasks: colors.taskOrange,
  shopping: colors.shoppingGreen
};

type TabBarProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
  onAdd?: () => void;
  labels: Record<TabKey, string>;
};

export function TabBar({ activeTab, onChange, onAdd, labels }: TabBarProps) {
  const leftTabs: TabKey[] = ["today", "calendar"];
  const rightTabs: TabKey[] = ["tasks", "shopping"];
  
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.08,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handleAddPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onAdd) onAdd();
  };

  const handleTabPress = (tab: TabKey) => {
    if (tab !== activeTab) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onChange(tab);
    }
  };

  const plusColor = tabColors[activeTab] || colors.domaBlue;

  return (
    <View style={styles.tabBar}>
      <View style={styles.tabGroup}>
        {leftTabs.map((tab) => renderTab(tab))}
      </View>

      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Pressable 
          style={[styles.plusButton, { backgroundColor: plusColor }]} 
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleAddPress}
        >
          <Ionicons name="add" size={32} color={colors.white} />
        </Pressable>
      </Animated.View>

      <View style={styles.tabGroup}>
        {rightTabs.map((tab) => renderTab(tab))}
      </View>
    </View>
  );

  function renderTab(tab: TabKey) {
    const active = tab === activeTab;
    const activeColor = tabColors[tab];
    return (
      <Pressable key={tab} style={styles.tabItem} onPress={() => handleTabPress(tab)}>
        <Ionicons name={tabIcons[tab]} size={24} color={active ? activeColor : colors.inactive} />
        <Text style={[styles.tabLabel, active && { color: activeColor }]}>{labels[tab]}</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: spacing.lg,
    height: 70,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    shadowColor: "#372614",
    shadowOpacity: 0.12,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 14 }
  },
  tabGroup: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around'
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  },
  plusButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  tabLabel: {
    color: colors.inactive,
    fontSize: 10,
    fontWeight: "600"
  }
});

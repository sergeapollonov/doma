import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "../../theme";
import type { IconName } from "./types";

type IconButtonProps = {
  icon: IconName;
  onPress?: () => void;
  badge?: boolean;
};

export function IconButton({ icon, onPress, badge = false }: IconButtonProps) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <Ionicons name={icon} size={20} color={colors.domaBlue} />
      {badge ? <View style={styles.iconBadge} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.glass.medium,
    borderWidth: 1,
    borderColor: colors.glass.borderHeavy,
    shadowColor: "#372614",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 }
  },
  iconBadge: {
    position: "absolute",
    right: 13,
    top: 13,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.domaGold
  }
});

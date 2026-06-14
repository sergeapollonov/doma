import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, spacing } from "../../theme";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
};

export function EmptyState({ title, description, icon = "sparkles-outline", style }: EmptyStateProps) {
  return (
    <View style={[styles.emptyState, style]}>
      <Ionicons name={icon} size={24} color={colors.domaGold} />
      <Text style={styles.cardTitle}>{title}</Text>
      {description && <Text style={styles.captionCentered}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    gap: 8,
    paddingVertical: spacing.xxxl
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center"
  },
  captionCentered: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center"
  }
});

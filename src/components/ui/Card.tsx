import React from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, spacing } from "../../theme";

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.glass.medium,
    borderWidth: 1,
    borderColor: colors.glass.borderHeavy,
    borderRadius: 26,
    padding: spacing.card,
    marginBottom: 10,
    shadowColor: "#372614",
    shadowOpacity: 0.1,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 }
  }
});

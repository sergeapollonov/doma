import React from "react";
import { StyleSheet, Text } from "react-native";

import { colors } from "../../theme";

export function SheetTitle({ title }: { title: string }) {
  return <Text style={styles.sheetTitle}>{title}</Text>;
}

const styles = StyleSheet.create({
  sheetTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    marginBottom: 14
  }
});

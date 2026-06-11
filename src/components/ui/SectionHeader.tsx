import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";

type SectionHeaderProps = {
  title: string;
  action?: string;
  onPress?: () => void;
};

export function SectionHeader({ title, action, onPress }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable onPress={onPress}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionTitle: {
    color: colors.domaBlue,
    fontSize: 27,
    lineHeight: 32,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  sectionAction: {
    color: "#C87F11",
    fontSize: 17,
    fontWeight: "500"
  }
});

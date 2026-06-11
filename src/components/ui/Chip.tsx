import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../../theme";

type SelectablePillProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function Chip({ label, active, onPress }: SelectablePillProps) {
  return (
    <Pressable style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

export function Segment({ label, active, onPress }: SelectablePillProps) {
  return (
    <Pressable style={[styles.segmentItem, active && styles.segmentItemActive]} onPress={onPress}>
      <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 39,
    paddingHorizontal: 12,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    backgroundColor: colors.surfaceWarm,
    alignItems: "center",
    justifyContent: "center"
  },
  chipActive: {
    backgroundColor: colors.domaBlue,
    borderColor: colors.domaBlue
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: "500"
  },
  chipTextActive: {
    color: colors.white
  },
  segmentItem: {
    minHeight: 38,
    paddingHorizontal: 13,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    backgroundColor: colors.surfaceWarm,
    alignItems: "center",
    justifyContent: "center"
  },
  segmentItemActive: {
    backgroundColor: colors.domaBlue,
    borderColor: colors.domaBlue
  },
  segmentText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "800"
  },
  segmentTextActive: {
    color: colors.white
  }
});

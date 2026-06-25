import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../../theme";

type ButtonProps = {
  label: string;
  onPress: () => void;
};

type PrimaryButtonProps = ButtonProps & {
  disabled?: boolean;
  arrow?: boolean;
  color?: string;
};

export function PrimaryButton({ label, onPress, disabled = false, arrow = false, color }: PrimaryButtonProps) {
  const customColorStyle = color ? { backgroundColor: color, shadowColor: color } : undefined;

  return (
    <Pressable style={[styles.primaryButton, customColorStyle, disabled && styles.primaryButtonDisabled]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.primaryButtonText, disabled && styles.disabledText]}>{label}</Text>
      {arrow ? <Ionicons name="arrow-forward" size={24} color={colors.white} style={styles.primaryButtonArrow} /> : null}
    </Pressable>
  );
}

export function SecondaryButton({ label, onPress }: ButtonProps) {
  return (
    <Pressable style={styles.secondaryButton} onPress={onPress}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.domaGold,
    shadowColor: colors.domaGold,
    shadowOpacity: 0.24,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    marginTop: 4,
    position: "relative"
  },
  primaryButtonArrow: {
    position: "absolute",
    right: 24
  },
  primaryButtonDisabled: {
    backgroundColor: "#E6DED4",
    shadowOpacity: 0,
    opacity: 0.7
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900"
  },
  disabledText: {
    color: colors.textTertiary
  },
  secondaryButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8
  },
  secondaryButtonText: {
    color: colors.domaBlue,
    fontSize: 15,
    fontWeight: "800"
  }
});

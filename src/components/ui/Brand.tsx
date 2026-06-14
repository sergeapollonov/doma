import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, typography } from "../../theme";

type DomaLogoProps = {
  large?: boolean;
};

export function DomaLogo({ large = false }: DomaLogoProps) {
  return (
    <View style={styles.logoRow}>
      <View style={[styles.logoMark, large && styles.logoMarkLarge]}>
        <Ionicons name="home-outline" size={31} color={colors.domaGold} />
        <Ionicons name="heart-outline" size={15} color={colors.domaGold} style={styles.logoHeart} />
      </View>
      <Text style={[styles.logoText, large && styles.logoTextLarge]}>Doma</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  logoMark: {
    width: 47,
    height: 47,
    alignItems: "center",
    justifyContent: "center"
  },
  logoMarkLarge: {
    width: 58,
    height: 58
  },
  logoHeart: {
    position: "absolute",
    top: 17
  },
  logoText: {
    color: colors.domaBlue,
    fontSize: 44,
    lineHeight: 50,
    fontWeight: "500",
    fontFamily: typography.fontFamily.brand,
    letterSpacing: 0
  },
  logoTextLarge: {
    fontSize: 70,
    lineHeight: 76
  }
});

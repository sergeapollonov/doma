import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { people } from "../../data";
import { colors } from "../../theme";
import type { copy } from "../../i18n";
import { Avatar } from "../family";
import { Card, SecondaryButton, SheetTitle } from "../ui";

type FamilySheetProps = {
  text: typeof copy.ru;
  userName: string;
  onShareLink: () => void;
};

export function FamilySheet({ text, userName, onShareLink }: FamilySheetProps) {
  return (
    <View>
      <SheetTitle title={text.family} />
      <Card style={styles.memberCard}>
        <Avatar person="alex" size={44} />
        <View style={styles.rowGrow}>
          <Text style={styles.cardTitle}>{userName}</Text>
          <Text style={styles.caption}>{text.ownerDevice}</Text>
        </View>
      </Card>
      <Card style={styles.memberCard}>
        <Avatar person="maya" size={44} />
        <View style={styles.rowGrow}>
          <Text style={styles.cardTitle}>{people.maya.name}</Text>
          <Text style={styles.caption}>{text.connectedDevice}</Text>
        </View>
        <Ionicons name="checkmark-circle" size={20} color={colors.shoppingGreen} />
      </Card>
      <SecondaryButton label={text.shareLink} onPress={onShareLink} />
    </View>
  );
}

const styles = StyleSheet.create({
  rowGrow: {
    flex: 1
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900"
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  }
});

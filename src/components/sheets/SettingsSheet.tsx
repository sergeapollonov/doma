import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import type { Language } from "../../types";
import type { copy } from "../../i18n";
import { Card, Segment, SheetTitle } from "../ui";

type SettingsSheetProps = {
  language: Language;
  text: typeof copy.ru;
  onChangeLanguage: (language: Language) => void;
};

export function SettingsSheet({ language, text, onChangeLanguage }: SettingsSheetProps) {
  return (
    <View>
      <SheetTitle title={text.settings} />
      <Text style={styles.fieldLabel}>{text.language}</Text>
      <View style={styles.segment}>
        <Segment label={text.languageRussian} active={language === "ru"} onPress={() => onChangeLanguage("ru")} />
        <Segment label={text.languagePolish} active={language === "pl"} onPress={() => onChangeLanguage("pl")} />
      </View>
      <Card style={styles.offlineCard}>
        <Ionicons name="cloud-offline-outline" size={22} color={colors.domaBlue} />
        <View style={styles.rowGrow}>
          <Text style={styles.cardTitle}>{text.offline}</Text>
          <Text style={styles.caption}>{text.offlineHint}</Text>
        </View>
      </Card>
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
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 12.5,
    fontWeight: "800",
    marginBottom: 7
  },
  segment: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    flexWrap: "wrap"
  },
  offlineCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.surfaceWarm
  }
});

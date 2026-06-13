import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Avatar } from "../../components/family";
import { AppShell } from "../../components/layout";
import { Card, PrimaryButton, SecondaryButton } from "../../components/ui";
import { colors, spacing } from "../../theme";
import type { copy } from "../../i18n";

type AcceptInviteScreenProps = {
  text: typeof copy.ru;
  familyName: string;
  onJoin: () => void;
  onSwitchAccount: () => void;
};

export function AcceptInviteScreen({ text, familyName, onJoin, onSwitchAccount }: AcceptInviteScreenProps) {
  return (
    <AppShell>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.inviteScreen}>
          <View style={styles.acceptInviteMark}>
            <Avatar person="alex" size={72} />
            <View style={styles.acceptInvitePlus}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </View>
            <Avatar person="maya" size={72} />
          </View>
          <Text style={styles.screenTitle}>{text.acceptInviteTitle}</Text>
          <Text style={styles.setupCopy}>{text.acceptInviteCopy}</Text>
          <Card style={styles.invitePreviewCard}>
            <View style={styles.invitePreviewRow}>
              <Ionicons name="home-outline" size={22} color={colors.domaGold} />
              <View style={styles.rowGrow}>
                <Text style={styles.cardTitle}>{familyName}</Text>
                <Text style={styles.caption}>{text.acceptInviteFamilyMeta}</Text>
              </View>
              <Ionicons name="checkmark-circle" size={22} color={colors.shoppingGreen} />
            </View>
          </Card>
          <PrimaryButton label={text.acceptInviteJoin} onPress={onJoin} />
          <SecondaryButton label={text.acceptInviteSwitchAccount} onPress={onSwitchAccount} />
        </View>
      </SafeAreaView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  rowGrow: {
    flex: 1
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800"
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 12.5,
    lineHeight: 17
  },
  inviteScreen: {
    flex: 1,
    padding: spacing.screen,
    justifyContent: "center"
  },
  screenTitle: {
    color: colors.textPrimary,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginBottom: 10
  },
  setupCopy: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 22
  },
  acceptInviteMark: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28
  },
  acceptInvitePlus: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.domaGold,
    marginHorizontal: -8,
    zIndex: 2,
    borderWidth: 3,
    borderColor: colors.warmBackground
  },
  invitePreviewCard: {
    padding: 16,
    marginBottom: 18
  },
  invitePreviewRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  }
});

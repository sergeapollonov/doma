import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { AvatarStack } from "../../components/family";
import { AppShell } from "../../components/layout";
import { PrimaryButton, SecondaryButton } from "../../components/ui";
import { colors, spacing } from "../../theme";
import type { copy } from "../../i18n";

type InviteScreenProps = {
  text: typeof copy.ru;
  onShareLink: () => void;
  onLater: () => void;
};

export function InviteScreen({ text, onShareLink, onLater }: InviteScreenProps) {
  return (
    <AppShell>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.inviteScreen}>
          <AvatarStack />
          <Text style={styles.screenTitle}>{text.invitePartner}</Text>
          <Text style={styles.setupCopy}>{text.inviteCopy}</Text>
          <View style={styles.inviteCard}>
            <Ionicons name="link-outline" size={24} color={colors.domaGold} />
            <Text style={styles.inviteLink}>doma.app/invite/alex-maya</Text>
          </View>
          <PrimaryButton label={text.shareLink} onPress={onShareLink} />
          <SecondaryButton label={text.later} onPress={onLater} />
        </View>
      </SafeAreaView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
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
  inviteCard: {
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 16
  },
  inviteLink: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800"
  }
});

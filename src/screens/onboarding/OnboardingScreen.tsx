import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { Avatar, AvatarGroup } from "../../components/family";
import { AppShell } from "../../components/layout";
import { DomaLogo, PrimaryButton } from "../../components/ui";
import { colors, typography } from "../../theme";
import type { copy } from "../../i18n";

const appIconSource = require("../../../assets/app-icon.png");

type OnboardingScreenProps = {
  text: typeof copy.ru;
  onCreateFamily: () => void;
  onAcceptInvite: () => void;
};

export function OnboardingScreen({ text, onCreateFamily, onAcceptInvite }: OnboardingScreenProps) {
  return (
    <AppShell>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.welcomeScreen} showsVerticalScrollIndicator={false}>
          <View style={styles.welcomeGlowLarge} />
          <View style={styles.welcomeGlowSmall} />
          <View style={styles.welcomePlant}>
            <View style={styles.plantStem} />
            <View style={[styles.plantStem, styles.plantStemTwo]} />
            <View style={[styles.plantStem, styles.plantStemThree]} />
          </View>
          <View style={styles.welcomeBrand}>
            <Image source={appIconSource} style={styles.welcomeIcon} resizeMode="cover" />
            <DomaLogo large />
          </View>
          <Text style={styles.welcomeTitle}>{text.tagline}</Text>
          <Text style={styles.welcomeText}>{text.welcomeSubtitle}</Text>

          <WelcomePreview text={text} />

          <View style={styles.welcomeActions}>
            <PrimaryButton label={text.createFamilyAction} onPress={onCreateFamily} arrow />
            <Pressable style={styles.inviteOutlineButton} onPress={onAcceptInvite}>
              <Text style={styles.inviteOutlineText}>{text.haveInvite}</Text>
            </Pressable>
          </View>
          <Text style={styles.legalText}>{text.legalText}</Text>
        </ScrollView>
      </SafeAreaView>
    </AppShell>
  );
}

function WelcomePreview({ text }: { text: typeof copy.ru }) {
  return (
    <View style={styles.previewShell}>
      <View style={styles.previewCard}>
        <View style={styles.previewRowHeader}>
          <View style={[styles.previewIconCircle, { backgroundColor: "rgba(73,159,199,0.18)" }]}>
            <Ionicons name="calendar-outline" size={20} color={colors.domaBlue} />
          </View>
          <Text style={styles.previewSectionTitle}>{text.preview.today}</Text>
          <View style={styles.previewPill}>
            <Text style={styles.previewPillText}>{text.preview.allEvents}</Text>
          </View>
        </View>
        <View style={styles.previewLine} />
        <View style={styles.previewItemRow}>
          <Text style={styles.previewTime}>09:00</Text>
          <View style={styles.previewBlueRule} />
          <View style={styles.rowGrow}>
            <Text style={styles.previewItemTitle}>Врач</Text>
            <Text style={styles.caption}>Клиника на Сенной</Text>
          </View>
          <AvatarGroup participants={["alex", "maya"]} small />
        </View>
      </View>

      <View style={styles.previewCard}>
        <View style={styles.previewRowHeader}>
          <View style={[styles.previewIconCircle, { backgroundColor: "rgba(239,138,31,0.16)" }]}>
            <Ionicons name="checkmark-circle" size={20} color={colors.taskOrange} />
          </View>
          <Text style={styles.previewSectionTitle}>{text.preview.tasks}</Text>
          <View style={styles.previewPill}>
            <Text style={styles.previewPillText}>{text.preview.allTasks}</Text>
          </View>
        </View>
        <View style={styles.previewLine} />
        <View style={styles.previewItemRow}>
          <View style={styles.previewCheckbox} />
          <View style={styles.rowGrow}>
            <Text style={styles.previewItemTitle}>Позвонить мастеру</Text>
            <Text style={styles.caption}>Сегодня, до 18:00</Text>
          </View>
          <Avatar person="alex" size={36} />
        </View>
      </View>

      <View style={styles.previewCard}>
        <View style={styles.previewRowHeader}>
          <View style={[styles.previewIconCircle, { backgroundColor: "rgba(95,150,105,0.16)" }]}>
            <Ionicons name="bag-outline" size={20} color={colors.shoppingGreen} />
          </View>
          <Text style={styles.previewSectionTitle}>{text.preview.shopping}</Text>
          <View style={styles.previewPill}>
            <Text style={styles.previewPillText}>{text.preview.list}</Text>
          </View>
        </View>
        <View style={styles.previewShoppingRow}>
          <View>
            <Text style={styles.previewShoppingTitle}>Молоко, хлеб, яйца, бананы</Text>
            <Text style={styles.caption}>{text.preview.itemCount}</Text>
          </View>
          <View style={styles.previewBasket}>
            <Ionicons name="basket-outline" size={34} color={colors.shoppingGreen} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  rowGrow: {
    flex: 1
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 12.5,
    lineHeight: 17
  },
  welcomeScreen: {
    minHeight: Platform.OS === "web" ? 850 : undefined,
    paddingHorizontal: 34,
    paddingTop: 52,
    paddingBottom: 42,
    alignItems: "center",
    overflow: "hidden"
  },
  welcomeGlowLarge: {
    position: "absolute",
    right: -92,
    top: 276,
    width: 220,
    height: 360,
    borderRadius: 120,
    backgroundColor: "rgba(245,210,166,0.34)"
  },
  welcomeGlowSmall: {
    position: "absolute",
    left: -90,
    bottom: 212,
    width: 185,
    height: 245,
    borderRadius: 92,
    backgroundColor: colors.glass.light
  },
  welcomePlant: {
    position: "absolute",
    left: 8,
    bottom: 250,
    width: 62,
    height: 180,
    opacity: 0.48
  },
  plantStem: {
    position: "absolute",
    bottom: 0,
    left: 24,
    width: 2,
    height: 164,
    borderRadius: 2,
    backgroundColor: colors.familySand,
    transform: [{ rotate: "-14deg" }]
  },
  plantStemTwo: {
    left: 36,
    height: 146,
    transform: [{ rotate: "10deg" }]
  },
  plantStemThree: {
    left: 16,
    height: 120,
    transform: [{ rotate: "-4deg" }]
  },
  welcomeBrand: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8
  },
  welcomeIcon: {
    width: 96,
    height: 96,
    borderRadius: 24,
    marginBottom: 10,
    shadowColor: "#372614",
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 13 }
  },
  welcomeTitle: {
    color: colors.textPrimary,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 18,
    fontFamily: typography.fontFamily.brand
  },
  welcomeText: {
    color: colors.textSecondary,
    fontSize: 22,
    lineHeight: 32,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 34
  },
  previewShell: {
    width: "100%",
    borderRadius: 32,
    padding: 14,
    gap: 12,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.borderHeavy,
    shadowColor: "#372614",
    shadowOpacity: 0.05,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 16 },
    opacity: 0.85
  },
  previewCard: {
    borderRadius: 24,
    padding: 15,
    backgroundColor: colors.glass.medium,
    borderWidth: 1,
    borderColor: colors.glass.borderHeavy
  },
  previewRowHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  previewIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center"
  },
  previewSectionTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 23,
    fontWeight: "500"
  },
  previewPill: {
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: "rgba(214,154,69,0.10)"
  },
  previewPillText: {
    color: "#C87F11",
    fontSize: 13,
    fontWeight: "700"
  },
  previewLine: {
    height: 1,
    marginVertical: 11,
    backgroundColor: colors.divider
  },
  previewItemRow: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  previewTime: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "500"
  },
  previewBlueRule: {
    width: 3,
    height: 48,
    borderRadius: 3,
    backgroundColor: "#9FD5EE"
  },
  previewItemTitle: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: "700"
  },
  previewCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.domaGold
  },
  previewShoppingRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  previewShoppingTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "600"
  },
  previewBasket: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(95,150,105,0.11)"
  },
  welcomeActions: {
    width: "100%",
    gap: 18,
    marginTop: 34
  },
  inviteOutlineButton: {
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.domaGold,
    backgroundColor: "transparent"
  },
  inviteOutlineText: {
    color: colors.domaGold,
    fontSize: 16,
    fontWeight: "700"
  },
  legalText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 24
  }
});

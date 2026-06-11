import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import type { ShoppingItem } from "../../types";
import { Card, type IconName } from "../ui";
import { ShoppingItemRow } from "./ShoppingItemRow";

const shoppingVisuals: Record<string, { icon: IconName; color: string; tint: string }> = {
  Молочное: { icon: "cafe-outline", color: colors.domaGold, tint: "rgba(214,154,69,0.12)" },
  "Овощи и фрукты": { icon: "leaf-outline", color: colors.shoppingGreen, tint: "rgba(95,150,105,0.14)" },
  Дом: { icon: "home-outline", color: colors.domaBlue, tint: "rgba(22,58,95,0.11)" },
  "Мясо и рыба": { icon: "flame-outline", color: colors.dangerRed, tint: "rgba(216,92,74,0.12)" },
  Базовое: { icon: "basket-outline", color: colors.shoppingGreen, tint: "rgba(95,150,105,0.14)" }
};

type ShoppingCategorySectionProps = {
  category: string;
  items: ShoppingItem[];
  onToggleItem: (itemId: string) => void;
};

export function ShoppingCategorySection({ category, items, onToggleItem }: ShoppingCategorySectionProps) {
  const visual = shoppingVisuals[category] ?? shoppingVisuals["Базовое"];

  return (
    <Card style={styles.shoppingCategoryCard}>
      <View style={styles.shoppingCategoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: visual.tint }]}>
          <Ionicons name={visual.icon} size={20} color={visual.color} />
        </View>
        <Text style={styles.shoppingCategoryTitle}>{category}</Text>
        <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
      </View>
      {items.map((item) => (
        <ShoppingItemRow key={item.id} item={item} onToggle={() => onToggleItem(item.id)} />
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  shoppingCategoryCard: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 4,
    marginBottom: 13,
    borderRadius: 24
  },
  shoppingCategoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 12
  },
  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center"
  },
  shoppingCategoryTitle: {
    flex: 1,
    color: colors.domaBlue,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  }
});

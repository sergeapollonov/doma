import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ShoppingCategorySection } from "../../components/shopping";
import { Card, type IconName } from "../../components/ui";
import { colors } from "../../theme";
import type { Language, ShoppingCategory, ShoppingCategoryId, ShoppingItem } from "../../types";
import type { copy } from "../../i18n";

const frequentVisuals: Record<string, { icon: IconName; tint: string }> = {
  Молоко: { icon: "water-outline", tint: "rgba(176,210,226,0.45)" },
  Хлеб: { icon: "restaurant-outline", tint: "rgba(214,154,69,0.15)" },
  Яйца: { icon: "ellipse-outline", tint: "rgba(215,185,139,0.18)" },
  Бананы: { icon: "leaf-outline", tint: "rgba(230,183,67,0.16)" },
  Кофе: { icon: "cafe-outline", tint: "rgba(143,102,61,0.14)" }
};

type ShoppingScreenProps = {
  text: typeof copy.ru;
  shopping: ShoppingItem[];
  categories: ShoppingCategory[];
  language: Language;
  frequentShopping: string[];
  categoryName: (categoryId: ShoppingCategoryId, categories: ShoppingCategory[], language: Language, text: typeof copy.ru) => string;
  onOpenShoppingSheet: () => void;
  onAddFrequentItem: (title: string) => void;
  onToggleShoppingItem: (itemId: string) => void;
};

export function ShoppingScreen({
  text,
  shopping,
  categories,
  language,
  frequentShopping,
  categoryName,
  onOpenShoppingSheet,
  onAddFrequentItem,
  onToggleShoppingItem
}: ShoppingScreenProps) {
  const sortedShopping = [...shopping].sort((a, b) => Number(a.purchased) - Number(b.purchased));
  const categoryOrder: ShoppingCategoryId[] = ["cat-dairy", "cat-fruit-veg", "cat-home", "cat-meat-fish", "cat-other"];
  const groupedShopping = categoryOrder
    .map((categoryId) => ({
      categoryId,
      category: categoryName(categoryId, categories, language, text),
      items: sortedShopping.filter((item) => item.categoryId === categoryId)
    }))
    .filter((group) => group.items.length > 0);

  return (
    <View>
      <Pressable style={styles.addField} onPress={onOpenShoppingSheet}>
        <View style={styles.addFieldIcon}>
          <Ionicons name="add" size={26} color={colors.domaGold} />
        </View>
        <Text style={styles.addFieldText}>{text.shoppingAddItem}</Text>
      </Pressable>
      <Card style={styles.frequentCard}>
        <Text style={styles.shoppingSectionTitle}>{text.shoppingFrequent}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.frequentTiles}>
          {frequentShopping.map((item) => {
            const visual = frequentVisuals[item] ?? frequentVisuals["Молоко"];
            return (
              <Pressable key={item} style={styles.frequentTile} onPress={() => onAddFrequentItem(item)}>
                <View style={[styles.frequentImage, { backgroundColor: visual.tint }]}>
                  <Ionicons name={visual.icon} size={34} color={colors.domaBlue} />
                </View>
                <Text style={styles.frequentLabel}>{item}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </Card>
      {groupedShopping.map((group) => (
        <ShoppingCategorySection
          key={group.categoryId}
          categoryId={group.categoryId}
          category={group.category}
          items={group.items}
          onToggleItem={onToggleShoppingItem}
        />
      ))}
      <Pressable style={styles.quickShoppingHelp} onPress={onOpenShoppingSheet}>
        <View style={styles.previewBasket}>
          <Ionicons name="basket-outline" size={34} color={colors.domaGold} />
        </View>
        <View style={styles.rowGrow}>
          <Text style={styles.cardTitle}>{text.shoppingQuickTitle}</Text>
          <Text style={styles.caption}>{text.shoppingQuickHint}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  addField: {
    height: 78,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.84)",
    backgroundColor: "rgba(255,255,255,0.72)",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 0,
    marginBottom: 14,
    shadowColor: "#372614",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 9 }
  },
  addFieldIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginLeft: -2,
    backgroundColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#372614",
    shadowOpacity: 0.10,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 }
  },
  addFieldText: {
    color: colors.domaBlue,
    fontSize: 24,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  shoppingSectionTitle: {
    color: colors.domaBlue,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "500",
    marginBottom: 15,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  frequentCard: {
    padding: 16,
    borderRadius: 25,
    marginBottom: 14
  },
  frequentTiles: {
    gap: 10,
    paddingRight: 4
  },
  frequentTile: {
    width: 68,
    minHeight: 104,
    alignItems: "center",
    justifyContent: "space-between"
  },
  frequentImage: {
    width: 66,
    height: 66,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  frequentLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8
  },
  quickShoppingHelp: {
    minHeight: 92,
    borderRadius: 24,
    padding: 14,
    marginTop: 4,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.88)",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#372614",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 }
  },
  previewBasket: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(95,150,105,0.11)"
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
  }
});

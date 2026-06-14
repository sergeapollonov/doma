import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import type { ShoppingItem } from "../../types";

type ShoppingItemRowProps = {
  item: ShoppingItem;
  onToggle: () => void;
};

export function ShoppingItemRow({ item, onToggle }: ShoppingItemRowProps) {
  return (
    <Pressable style={styles.shoppingRow} onPress={onToggle}>
      <View style={[styles.shoppingCheckbox, item.purchased && styles.shoppingCheckboxDone]}>
        {item.purchased && <Ionicons name="checkmark" size={15} color={colors.white} />}
      </View>
      <View style={styles.rowGrow}>
        <Text style={[styles.shoppingItemTitle, item.purchased && styles.completedText]}>{item.title}</Text>
      </View>
      {item.quantity ? (
        <View style={styles.quantityPill}>
          <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
      ) : null}
      <Ionicons name="reorder-two-outline" size={24} color="rgba(111,116,124,0.48)" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shoppingRow: {
    minHeight: 57,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.divider
  },
  shoppingCheckbox: {
    width: 23,
    height: 23,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.domaGold,
    alignItems: "center",
    justifyContent: "center"
  },
  shoppingCheckboxDone: {
    backgroundColor: colors.shoppingGreen
  },
  rowGrow: {
    flex: 1
  },
  shoppingItemTitle: {
    color: colors.domaBlue,
    fontSize: 19,
    fontWeight: "600"
  },
  completedText: {
    color: colors.textTertiary,
    textDecorationLine: "line-through"
  },
  quantityPill: {
    minWidth: 48,
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(214,154,69,0.11)"
  },
  quantityText: {
    color: colors.domaGold,
    fontSize: 15,
    fontWeight: "700"
  }
});

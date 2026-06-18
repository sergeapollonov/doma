import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { CalendarShoppingItem } from '../../../types/calendar';
import { Ionicons } from '@expo/vector-icons';

type ShoppingSectionProps = {
  items: CalendarShoppingItem[];
};

export function ShoppingSection({ items }: ShoppingSectionProps) {
  return (
    <View style={styles.outerContainer}>
      <Text style={styles.headerTitle}>ПОКУПКИ НА СЕГОДНЯ</Text>

      <View style={styles.itemsList}>
        {items.map((item) => {
          const isPurchased = item.status === 'purchased';

          // Покажем все элементы для наглядности списка
          return (
            <TouchableOpacity key={item.id} style={[styles.itemRow, isPurchased && styles.itemPurchased]}>
              {/* Checkbox */}
              <View style={[styles.checkbox, isPurchased && styles.checkboxPurchased]}>
                {isPurchased && <Ionicons name="checkmark" size={14} color={colors.white} />}
              </View>

              {/* Иконка */}
              <Text style={styles.icon}>{item.iconUrl}</Text>
              
              {/* Details */}
              <View style={styles.details}>
                <Text style={[styles.title, isPurchased && styles.titlePurchased]} numberOfLines={1}>
                  {item.title}
                </Text>
                {item.quantity && (
                  <Text style={styles.quantity}>{item.quantity}</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.showAllButton}>
        <Text style={styles.showAllText}>Показать все покупки (17)</Text>
        <Ionicons name="chevron-down" size={16} color={colors.shoppingGreen} style={{ marginLeft: 4, marginTop: 2 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: colors.strokeLight,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.shoppingGreen,
    letterSpacing: 0.5,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
  },
  itemsList: {
    paddingLeft: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm, // Как в задачах
  },
  itemPurchased: {
    opacity: 0.5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.shoppingGreen,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxPurchased: {
    backgroundColor: colors.shoppingGreen,
  },
  icon: {
    fontSize: 22,
    marginRight: spacing.sm,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 2,
  },
  titlePurchased: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  quantity: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  showAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    paddingVertical: spacing.sm,
  },
  showAllText: {
    color: colors.shoppingGreen,
    fontWeight: '600',
    fontSize: 14,
  }
});

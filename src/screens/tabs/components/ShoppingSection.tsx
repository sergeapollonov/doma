import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { CalendarShoppingItem } from '../../../types/calendar';
import { Ionicons } from '@expo/vector-icons';

type ShoppingSectionProps = {
  items: CalendarShoppingItem[];
};

export function ShoppingSection({ items }: ShoppingSectionProps) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>ПОКУПКИ НА СЕГОДНЯ</Text>
        <Text style={styles.actionLabel}>3 из 17</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item) => {
          const isPurchased = item.status === 'purchased';

          if (isPurchased) return null; 

          return (
            <TouchableOpacity key={item.id} style={styles.card}>
              <View style={[styles.checkbox, isPurchased && styles.checkboxPurchased]}>
                {isPurchased && <Ionicons name="checkmark" size={14} color={colors.white} />}
              </View>

              <Text style={styles.icon}>{item.iconUrl}</Text>
              
              <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                {item.quantity && (
                  <Text style={styles.quantity}>{item.quantity}</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.moreCard}>
          <View style={styles.moreIconWrapper}>
            <Ionicons name="ellipsis-horizontal" size={16} color={colors.textSecondary} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>ещё 14</Text>
            <Text style={styles.quantity}>товаров</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: colors.strokeLight,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.shoppingGreen,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  actionLabel: {
    fontSize: 13,
    color: colors.shoppingGreen,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceWarm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.large,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    minWidth: 160,
    height: 60,
  },
  moreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.large,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    borderStyle: 'dashed',
    minWidth: 120,
    height: 60,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
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
  moreIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.strokeSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  details: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  quantity: {
    fontSize: 11,
    color: colors.textSecondary,
  }
});

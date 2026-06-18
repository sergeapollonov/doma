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
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item) => {
          const isPurchased = item.status === 'purchased';

          // Скрываем купленные из активного скролла (как вариант) или показываем тусклыми
          if (isPurchased) return null; 

          return (
            <TouchableOpacity key={item.id} style={styles.card}>
              <Text style={styles.icon}>{item.iconUrl}</Text>
              
              <View style={styles.details}>
                <View style={styles.titleRow}>
                  <View style={styles.checkbox} />
                  <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                </View>
                {item.quantity && (
                  <Text style={styles.quantity}>{item.quantity}</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Карточка "Ещё N товаров" */}
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
  container: {
    // Выходим за пределы паддинга родителя для горизонтального скролла от края до края
    marginHorizontal: -spacing.xl, 
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceWarm,
    padding: spacing.md,
    borderRadius: radius.large,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    minWidth: 140,
    height: 60,
  },
  moreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: spacing.md,
    borderRadius: radius.large,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    borderStyle: 'dashed',
    minWidth: 120,
    height: 60,
  },
  icon: {
    fontSize: 24,
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
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.shoppingGreen,
    marginRight: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  quantity: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 18, // Выравнивание под текстом (12 checkbox + 6 margin)
  }
});

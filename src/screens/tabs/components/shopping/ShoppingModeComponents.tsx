import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  FadeIn,
  FadeOut,
  Layout,
} from 'react-native-reanimated';
import { colors, spacing, radius } from '../../../../theme/tokens';
import type { ShoppingItem } from '../../../../types';

// ─── Progress Card ──────────────────────────────────────────────────────────

type ProgressCardProps = {
  purchasedCount: number;
  totalCount: number;
  onFinish: () => void;
};

export function ShoppingModeProgressCard({ purchasedCount, totalCount, onFinish }: ProgressCardProps) {
  const percentage = totalCount > 0 ? Math.round((purchasedCount / totalCount) * 100) : 0;
  const remainingCount = totalCount - purchasedCount;
  
  const radiusVal = 32;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radiusVal;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.progressCard}>
      <View style={styles.progressLeft}>
        <View style={styles.chartWrap}>
          <Svg width={80} height={80} viewBox="0 0 80 80">
            <Circle
              cx={40}
              cy={40}
              r={radiusVal}
              stroke={colors.strokeLight}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={40}
              cy={40}
              r={radiusVal}
              stroke={colors.shoppingGreen}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
            />
          </Svg>
          <View style={styles.chartTextWrap}>
            <Text style={styles.chartValText}>
              {purchasedCount}<Text style={styles.chartTotalText}>/{totalCount}</Text>
            </Text>
            <Text style={styles.chartPercentText}>{percentage}%</Text>
          </View>
        </View>
        <View style={styles.progressInfo}>
          <Text style={styles.progressTitle}>Прогресс покупок</Text>
          <Text style={styles.progressRemaining}>Осталось: {remainingCount} товаров</Text>
          <View style={styles.timeWrap}>
            <Ionicons name="time-outline" size={14} color={colors.shoppingGreen} />
            <Text style={styles.timeText}>Примерно {remainingCount > 0 ? remainingCount * 2 : 0} мин</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Category Strip ─────────────────────────────────────────────────────────

type CategoryStripProps = {
  items: ShoppingItem[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
};

export function ShoppingModeCategoryStrip({ items, activeCategory, onSelectCategory }: CategoryStripProps) {
  const categories = items.reduce((acc, item) => {
    if (item.categoryId) {
      if (!acc[item.categoryId]) {
        acc[item.categoryId] = { name: item.category, count: 0 };
      }
      acc[item.categoryId].count += 1;
    }
    return acc;
  }, {} as Record<string, { name: string; count: number }>);

  const catArray = Object.entries(categories).map(([id, data]) => ({ id, ...data }));
  // Sort or leave as is
  
  return (
    <View style={styles.catWrap}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
        <TouchableOpacity
          style={[styles.catChip, activeCategory === 'all' && styles.catChipActive]}
          onPress={() => onSelectCategory('all')}
        >
          <Text style={[styles.catText, activeCategory === 'all' && styles.catTextActive]}>
            Все товары <Text style={styles.catCount}>{items.length}</Text>
          </Text>
        </TouchableOpacity>
        {catArray.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.catChip, activeCategory === cat.id && styles.catChipActive]}
            onPress={() => onSelectCategory(cat.id)}
          >
            <Text style={[styles.catText, activeCategory === cat.id && styles.catTextActive]}>
              {cat.name} <Text style={styles.catCount}>{cat.count}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// ─── Item Row ───────────────────────────────────────────────────────────────

type ItemRowProps = {
  item: ShoppingItem;
  onToggle: () => void;
};

export function ShoppingModeItemRow({ item, onToggle }: ItemRowProps) {
  const isChecked = item.purchased;

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onToggle();
  };

  return (
    <Animated.View
      layout={Layout.springify().damping(16).stiffness(120)}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <TouchableOpacity
        style={styles.itemRow}
        activeOpacity={0.7}
        onPress={handleToggle}
      >
        <View style={styles.itemLeft}>
          <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
            {isChecked && <Ionicons name="checkmark" size={18} color={colors.white} />}
          </View>
          <View style={[styles.itemIcon, isChecked && { opacity: 0.5 }]}>
            <Text style={styles.emojiText}>{item.categoryIcon ?? '🛒'}</Text>
          </View>
          <View style={[styles.itemTextWrap, isChecked && { opacity: 0.5 }]}>
            <Text style={[styles.itemTitle, isChecked && styles.itemTitleChecked]}>
              {item.title}
            </Text>
            {item.quantity ? (
              <Text style={styles.itemQty}>{item.quantity}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.itemRight}>
          <View style={[styles.chip, isChecked && { opacity: 0.5 }]}>
            <Text style={[styles.chipText, { color: item.categoryColor || colors.textSecondary }]}>
              {item.category}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.strokeSoft} />
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Progress
  progressCard: {
    backgroundColor: '#F5F9F6', // light green-ish tint
    marginHorizontal: spacing.screenHorizontal,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E8F3EB',
  },
  progressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartWrap: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTextWrap: {
    position: 'absolute',
    alignItems: 'center',
  },
  chartValText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  chartTotalText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  chartPercentText: {
    fontSize: 11,
    color: colors.shoppingGreen,
    fontWeight: '600',
  },
  progressInfo: {
    marginLeft: spacing.md,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  progressRemaining: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  timeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: colors.shoppingGreen,
    fontWeight: '500',
  },

  // Cat Strip
  catWrap: {
    marginTop: spacing.md,
  },
  catScroll: {
    paddingHorizontal: spacing.screenHorizontal,
    gap: 8,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    backgroundColor: colors.surfacePrimary,
  },
  catChipActive: {
    backgroundColor: colors.shoppingGreen,
    borderColor: colors.shoppingGreen,
  },
  catText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  catTextActive: {
    color: colors.white,
  },
  catCount: {
    opacity: 0.6,
  },

  // Item Row
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    minHeight: 72,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.strokeSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.shoppingGreen,
    borderColor: colors.shoppingGreen,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F7FA', // Soft blueish-gray
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
  },
  emojiText: {
    fontSize: 20,
  },
  itemTextWrap: {
    marginLeft: 14,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  itemTitleChecked: {
    textDecorationLine: 'line-through',
    color: colors.textTertiary,
  },
  itemQty: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: '#F5F7FA',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.strokeLight,
    marginLeft: 40 + 14 + 26, // Align with text
  },
});

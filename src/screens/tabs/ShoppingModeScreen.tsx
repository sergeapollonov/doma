import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../theme/tokens';
import type { ShoppingItem } from '../../types';
import {
  ShoppingModeProgressCard,
  ShoppingModeCategoryStrip,
  ShoppingModeItemRow,
} from './components/shopping/ShoppingModeComponents';

type ShoppingModeScreenProps = {
  items: ShoppingItem[];
  onExit: () => void;
  onToggleItem: (id: string) => void;
  onOpenItemDetail: (id?: string) => void;
};

export function ShoppingModeScreen({
  items,
  onExit,
  onToggleItem,
  onOpenItemDetail,
}: ShoppingModeScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(false);

  // Filter items
  const activeItems = items.filter((i) => !i.purchased);
  const completedItems = items.filter((i) => i.purchased);

  const displayedActiveItems = activeCategory === 'all'
    ? activeItems
    : activeItems.filter((i) => i.categoryId === activeCategory);

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onExit} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.shoppingGreen} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Режим покупок</Text>
          <Text style={styles.headerSubtitle}>Список покупок</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn} hitSlop={10}>
            <Ionicons name="person-add-outline" size={22} color={colors.shoppingGreen} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} hitSlop={10}>
            <Ionicons name="ellipsis-vertical" size={22} color={colors.shoppingGreen} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}>
        {/* ── Progress Card ── */}
        <ShoppingModeProgressCard
          purchasedCount={completedItems.length}
          totalCount={items.length}
          onFinish={onExit}
        />

        {/* ── Categories ── */}
        <ShoppingModeCategoryStrip
          items={items}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* ── Active Items ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Нужно купить ({displayedActiveItems.length})</Text>
            <Ionicons name="reorder-three-outline" size={20} color={colors.textSecondary} />
          </View>
          <View style={styles.listWrap}>
            {displayedActiveItems.map((item) => (
              <ShoppingModeItemRow
                key={item.id}
                item={item}
                onToggle={() => onToggleItem(item.id)}
              />
            ))}
          </View>
        </View>

        {/* ── Completed Items ── */}
        {completedItems.length > 0 && (
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => setShowCompleted((v) => !v)}
              activeOpacity={0.7}
            >
              <Text style={styles.sectionTitle}>Куплено ({completedItems.length})</Text>
              <Ionicons name={showCompleted ? "chevron-up" : "chevron-down"} size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            {showCompleted && (
              <View style={styles.listWrap}>
                {completedItems.map((item) => (
                  <ShoppingModeItemRow
                    key={item.id}
                    item={item}
                    onToggle={() => onToggleItem(item.id)}
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* ── Bottom Action Bar ── */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <TouchableOpacity style={styles.btnAdd} onPress={() => onOpenItemDetail()}>
          <Ionicons name="add" size={24} color={colors.shoppingGreen} />
          <Text style={styles.btnAddText}>Добавить товар</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFinish} onPress={onExit}>
          <Ionicons name="checkmark-circle-outline" size={24} color={colors.white} />
          <Text style={styles.btnFinishText}>Завершить покупки</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfacePrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.md,
    justifyContent: 'space-between',
  },
  headerBtn: {
    padding: spacing.xs,
  },
  headerTitleWrap: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.md,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.screenHorizontal,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  listWrap: {
    gap: 0,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: spacing.md,
    backgroundColor: colors.surfacePrimary,
    borderTopWidth: 1,
    borderTopColor: colors.strokeLight,
    gap: spacing.sm,
  },
  btnAdd: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.shoppingGreen,
    backgroundColor: colors.white,
    gap: 8,
  },
  btnAddText: {
    color: colors.shoppingGreen,
    fontSize: 15,
    fontWeight: '600',
  },
  btnFinish: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.shoppingGreen,
    gap: 8,
  },
  btnFinishText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});

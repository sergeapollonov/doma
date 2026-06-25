import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, spacing } from '../../theme';
import type { ShoppingItem, ShoppingTemplate } from '../../types';
import {
  ShoppingFilterBar,
  QuickAddBar,
  ShoppingUrgentSection,
  ShoppingTripCard,
  ShoppingSoonSection,
  ShoppingPurchasedSection,
  ShoppingTemplatesStrip,
} from './components/shopping/ShoppingComponents';
import {
  mockUrgentItems,
  mockSoonItems,
  mockPurchasedCount,
  mockTripItemCount,
  mockTripEstimatedPrice,
  mockShoppingTemplates,
} from '../../utils/shoppingMocks';

type FilterKey = 'all' | 'mine' | 'family' | 'purchased';

type ShoppingScreenProps = {
  onOpenItemDetail?: (id?: string) => void;
  onStartShoppingMode?: () => void;
  onOpenTemplates?: () => void;
  onSelectTemplate?: (id: string) => void;
};

export function ShoppingScreen({
  onOpenItemDetail,
  onStartShoppingMode,
  onOpenTemplates,
  onSelectTemplate,
}: ShoppingScreenProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [urgentItems, setUrgentItems] = useState<ShoppingItem[]>(mockUrgentItems);
  const [soonItems, setSoonItems] = useState<ShoppingItem[]>(mockSoonItems);

  const allCount = urgentItems.length + soonItems.length;
  const mineCount = urgentItems.filter((i) => i.assignee === 'alex').length +
    soonItems.filter((i) => i.assignee === 'alex').length;
  const familyCount = urgentItems.filter((i) => i.assignee === 'shared').length +
    soonItems.filter((i) => i.assignee === 'shared').length;

  const handleToggleUrgent = (id: string) => {
    setUrgentItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, purchased: !item.purchased } : item)
    );
  };

  const handleToggleSoon = (id: string) => {
    setSoonItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, purchased: !item.purchased } : item)
    );
  };

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Покупки</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="search-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtonPrimary}
            onPress={() => onOpenItemDetail?.()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="add" size={22} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Quick Add ── */}
      <QuickAddBar onPress={() => onOpenItemDetail?.()} />

      {/* ── Filter Bar ── */}
      <View style={styles.filterWrap}>
        <ShoppingFilterBar
          active={activeFilter}
          allCount={allCount}
          mineCount={mineCount}
          familyCount={familyCount}
          purchasedCount={mockPurchasedCount}
          onSelect={setActiveFilter}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Urgent Section ── */}
        <ShoppingUrgentSection
          items={urgentItems}
          onToggleItem={handleToggleUrgent}
          onPressItem={(id) => onOpenItemDetail?.(id)}
        />

        {/* ── Next Trip Card ── */}
        <ShoppingTripCard
          itemCount={mockTripItemCount}
          estimatedPrice={mockTripEstimatedPrice}
          onStart={() => onStartShoppingMode?.()}
        />

        {/* ── Soon Section ── */}
        <ShoppingSoonSection
          items={soonItems}
          onToggleItem={handleToggleSoon}
          onPressItem={(id) => onOpenItemDetail?.(id)}
        />

        {/* ── Purchased Section ── */}
        <ShoppingPurchasedSection count={mockPurchasedCount} />

        {/* ── Templates Strip ── */}
        <ShoppingTemplatesStrip
          templates={mockShoppingTemplates}
          onSeeAll={() => onOpenTemplates?.()}
          onSelectTemplate={(id) => onSelectTemplate?.(id)}
        />

        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warmBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screen,
    paddingTop: 50,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfacePrimary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  headerButtonPrimary: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.shoppingGreen,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shoppingGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  filterWrap: {
    marginBottom: spacing.md,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 4,
  },
  bottomPad: {
    height: 100,
  },
});

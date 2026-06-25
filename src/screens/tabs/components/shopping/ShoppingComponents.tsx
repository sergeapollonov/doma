import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, spacing } from '../../../../theme';
import type { ShoppingItem, PersonId } from '../../../../types';
import { Avatar, AvatarGroup } from '../../../../components/family';

// ─── Filter Bar ──────────────────────────────────────────────────────────────

type FilterKey = 'all' | 'mine' | 'family' | 'purchased';

type ShoppingFilterBarProps = {
  active: FilterKey;
  allCount: number;
  mineCount: number;
  familyCount: number;
  purchasedCount: number;
  onSelect: (key: FilterKey) => void;
};

export function ShoppingFilterBar({
  active,
  allCount,
  mineCount,
  familyCount,
  purchasedCount,
  onSelect,
}: ShoppingFilterBarProps) {
  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: 'Все', count: allCount },
    { key: 'mine', label: 'Мои', count: mineCount },
    { key: 'family', label: 'Семейные', count: familyCount },
    { key: 'purchased', label: 'Куплено', count: purchasedCount },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterRow}
    >
      {filters.map((f) => {
        const isActive = active === f.key;
        const isPurchased = f.key === 'purchased';
        return (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterChip, isActive && styles.filterChipActive]}
            onPress={() => onSelect(f.key)}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
          >
            {isPurchased && (
              <Ionicons
                name="checkmark-circle-outline"
                size={15}
                color={isActive ? colors.white : colors.textSecondary}
                style={{ marginRight: 4 }}
              />
            )}
            <Text style={[styles.filterLabel, isActive && styles.filterLabelActive]}>
              {f.label}
            </Text>
            <View style={[styles.filterBadge, isActive && styles.filterBadgeActive]}>
              <Text style={[styles.filterBadgeText, isActive && styles.filterBadgeTextActive]}>
                {f.count}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

// ─── Quick Add Bar ────────────────────────────────────────────────────────────

type QuickAddBarProps = {
  onPress: () => void;
};

export function QuickAddBar({ onPress }: QuickAddBarProps) {
  return (
    <TouchableOpacity style={styles.quickAdd} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.quickAddIcon}>
        <Ionicons name="add" size={20} color={colors.shoppingGreen} />
      </View>
      <Text style={styles.quickAddText}>Добавить товар...</Text>
      <Ionicons name="mic-outline" size={20} color={colors.textTertiary} style={{ marginRight: 4 }} />
    </TouchableOpacity>
  );
}

// ─── Shopping Item Row ────────────────────────────────────────────────────────

type ShoppingItemRowProps = {
  item: ShoppingItem;
  onToggle: () => void;
  onPress: () => void;
  showUrgency?: boolean;
};

export function ShoppingItemRow({ item, onToggle, onPress, showUrgency = true }: ShoppingItemRowProps) {
  const priorityColor =
    item.priority === 'high' ? colors.overdueRed :
    item.priority === 'normal' ? colors.taskOrange : colors.textTertiary;

  return (
    <TouchableOpacity style={styles.itemRow} onPress={onPress} activeOpacity={0.7}>
      {/* Checkbox */}
      <TouchableOpacity
        style={styles.checkbox}
        onPress={onToggle}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        {item.purchased ? (
          <View style={styles.checkboxDone}>
            <Ionicons name="checkmark" size={14} color={colors.white} />
          </View>
        ) : (
          <View style={styles.checkboxEmpty} />
        )}
      </TouchableOpacity>

      {/* Category Icon */}
      <View style={[styles.categoryIcon, { backgroundColor: `${item.categoryColor ?? colors.domaPurple}18` }]}>
        <Text style={styles.categoryEmoji}>{item.categoryIcon ?? '🛒'}</Text>
      </View>

      {/* Content */}
      <View style={styles.itemContent}>
        <Text style={[styles.itemTitle, item.purchased && styles.itemTitleDone]} numberOfLines={1}>
          {item.title}
        </Text>
        {showUrgency && item.priority ? (
          <Text style={[styles.itemUrgency, { color: priorityColor }]}>
            {item.priority === 'high' ? 'Pilne' : item.priority === 'normal' ? 'Średnie' : 'Niskie'}
          </Text>
        ) : null}
      </View>

      {/* Right: quantity + avatar + more */}
      <View style={styles.itemRight}>
        {item.quantity ? (
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityText}>{item.quantity}</Text>
          </View>
        ) : null}
        {item.assignee && item.assignee !== 'shared' ? (
          <Avatar person={item.assignee as PersonId} size={28} />
        ) : item.assignee === 'shared' ? (
          <AvatarGroup participants={['alex', 'maya']} small />
        ) : null}
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}>
          <Ionicons name="ellipsis-vertical" size={16} color={colors.textTertiary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// ─── Urgent Section ───────────────────────────────────────────────────────────

type ShoppingUrgentSectionProps = {
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onPressItem: (id: string) => void;
};

export function ShoppingUrgentSection({ items, onToggleItem, onPressItem }: ShoppingUrgentSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, 3);

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpanded((v) => !v)}
        hitSlop={{ top: 6, bottom: 6 }}
      >
        <View style={styles.sectionHeaderLeft}>
          <Ionicons name="document-text-outline" size={18} color={colors.shoppingGreen} />
          <Text style={[styles.sectionTitle, { color: colors.shoppingGreen }]}>
            Нужно купить сейчас
          </Text>
        </View>
        <View style={styles.sectionHeaderRight}>
          <View style={[styles.sectionBadge, { backgroundColor: colors.shoppingGreen }]}>
            <Text style={styles.sectionBadgeText}>{items.length}</Text>
          </View>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <>
          {visible.map((item) => (
            <ShoppingItemRow
              key={item.id}
              item={item}
              onToggle={() => onToggleItem(item.id)}
              onPress={() => onPressItem(item.id)}
              showUrgency
            />
          ))}
          {!showAll && items.length > 3 && (
            <TouchableOpacity
              style={styles.showAllRow}
              onPress={() => setShowAll(true)}
              hitSlop={{ top: 8, bottom: 8 }}
            >
              <Text style={[styles.showAllText, { color: colors.shoppingGreen }]}>
                Показать все ({items.length})
              </Text>
              <Ionicons name="chevron-down" size={15} color={colors.shoppingGreen} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

// ─── Trip Card ────────────────────────────────────────────────────────────────

type ShoppingTripCardProps = {
  itemCount: number;
  estimatedPrice: number;
  onStart: () => void;
};

export function ShoppingTripCard({ itemCount, estimatedPrice, onStart }: ShoppingTripCardProps) {
  return (
    <View style={[styles.tripCard, { backgroundColor: 'rgba(67, 160, 71, 0.08)' }]}>
      <View style={styles.tripIconWrap}>
        <Ionicons name="cart-outline" size={28} color={colors.white} />
      </View>
      <View style={styles.tripInfo}>
        <Text style={styles.tripTitle}>{itemCount} товаров</Text>
        <Text style={styles.tripSub}>
          Ориентировочно:{' '}
          <Text style={styles.tripPrice}>{estimatedPrice} zł</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.tripButton} onPress={onStart} activeOpacity={0.85}>
        <Text style={styles.tripButtonText}>Начать покупки</Text>
        <Ionicons name="arrow-forward" size={16} color={colors.shoppingGreen} />
      </TouchableOpacity>
    </View>
  );
}

// ─── Soon Section ─────────────────────────────────────────────────────────────

type ShoppingSoonSectionProps = {
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onPressItem: (id: string) => void;
};

export function ShoppingSoonSection({ items, onToggleItem, onPressItem }: ShoppingSoonSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, 3);

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpanded((v) => !v)}
        hitSlop={{ top: 6, bottom: 6 }}
      >
        <View style={styles.sectionHeaderLeft}>
          <Ionicons name="time-outline" size={18} color={colors.taskOrange} />
          <Text style={[styles.sectionTitle, { color: colors.taskOrange }]}>
            Скоро понадобится
          </Text>
        </View>
        <View style={styles.sectionHeaderRight}>
          <View style={[styles.sectionBadge, { backgroundColor: colors.taskOrange }]}>
            <Text style={styles.sectionBadgeText}>{items.length}</Text>
          </View>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <>
          {visible.map((item) => (
            <ShoppingItemRow
              key={item.id}
              item={item}
              onToggle={() => onToggleItem(item.id)}
              onPress={() => onPressItem(item.id)}
              showUrgency
            />
          ))}
          {!showAll && items.length > 3 && (
            <TouchableOpacity
              style={styles.showAllRow}
              onPress={() => setShowAll(true)}
              hitSlop={{ top: 8, bottom: 8 }}
            >
              <Text style={[styles.showAllText, { color: colors.taskOrange }]}>
                Показать все ({items.length})
              </Text>
              <Ionicons name="chevron-down" size={15} color={colors.taskOrange} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

// ─── Purchased Section ────────────────────────────────────────────────────────

type ShoppingPurchasedSectionProps = {
  count: number;
};

export function ShoppingPurchasedSection({ count }: ShoppingPurchasedSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={styles.purchasedHeader}
      onPress={() => setExpanded((v) => !v)}
      hitSlop={{ top: 6, bottom: 6 }}
    >
      <View style={styles.sectionHeaderLeft}>
        <Ionicons name="checkmark-circle-outline" size={18} color={colors.shoppingGreen} />
        <Text style={[styles.sectionTitle, { color: colors.shoppingGreen }]}>Куплено</Text>
      </View>
      <View style={styles.sectionHeaderRight}>
        <View style={[styles.sectionBadge, { backgroundColor: colors.shoppingGreen }]}>
          <Text style={styles.sectionBadgeText}>{count}</Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.textSecondary}
        />
      </View>
    </TouchableOpacity>
  );
}

// ─── Templates Strip ──────────────────────────────────────────────────────────

import type { ShoppingTemplate } from '../../../../types';

type ShoppingTemplatesStripProps = {
  templates: ShoppingTemplate[];
  onSeeAll: () => void;
  onSelectTemplate: (id: string) => void;
};

export function ShoppingTemplatesStrip({
  templates,
  onSeeAll,
  onSelectTemplate,
}: ShoppingTemplatesStripProps) {
  return (
    <View style={styles.templatesContainer}>
      <View style={styles.templatesSectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <Ionicons name="bookmark-outline" size={17} color={colors.textPrimary} />
          <Text style={styles.templatesSectionTitle}>Шаблоны</Text>
        </View>
        <TouchableOpacity onPress={onSeeAll} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.templatesStrip}
      >
        {templates.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={styles.templateCard}
            onPress={() => onSelectTemplate(t.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.templateIcon, { backgroundColor: t.iconBg }]}>
              <Ionicons name={t.iconName as any} size={28} color={t.iconColor} />
            </View>
            <Text style={styles.templateName}>{t.name}</Text>
            <Text style={styles.templateCount}>{t.itemCount} товаров</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Filter Bar
  filterRow: {
    paddingHorizontal: spacing.screen,
    gap: 8,
    paddingBottom: 2,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.surfacePrimary,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  filterChipActive: {
    backgroundColor: colors.shoppingGreen,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginRight: 6,
  },
  filterLabelActive: {
    color: colors.white,
  },
  filterBadge: {
    backgroundColor: 'rgba(22,58,95,0.08)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 22,
    alignItems: 'center',
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  filterBadgeTextActive: {
    color: colors.white,
  },

  // Quick Add Bar
  quickAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xl,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.screen,
    marginBottom: spacing.md,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    gap: 10,
  },
  quickAddIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: colors.shoppingGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAddText: {
    flex: 1,
    fontSize: 15,
    color: colors.textTertiary,
  },

  // Item Row
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeLight,
    gap: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxEmpty: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.shoppingGreen,
  },
  checkboxDone: {
    width: 22,
    height: 22,
    borderRadius: 5,
    backgroundColor: colors.shoppingGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryEmoji: {
    fontSize: 20,
  },
  itemContent: {
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  itemTitleDone: {
    textDecorationLine: 'line-through',
    color: colors.textTertiary,
  },
  itemUrgency: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityBadge: {
    backgroundColor: 'rgba(22,58,95,0.06)',
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  // Section
  sectionContainer: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    marginHorizontal: spacing.screen,
    marginBottom: spacing.md,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  sectionBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 26,
    alignItems: 'center',
  },
  sectionBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  showAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.strokeLight,
  },
  showAllText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Purchased Section
  purchasedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    marginHorizontal: spacing.screen,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },

  // Trip Card
  tripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(67, 160, 71, 0.08)',
    borderRadius: radius.xxl,
    marginHorizontal: spacing.screen,
    marginBottom: spacing.md,
    padding: spacing.lg,
    gap: 12,
  },
  tripIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.shoppingGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripInfo: {
    flex: 1,
  },
  tripTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tripSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tripPrice: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  tripButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.shoppingGreen,
    borderRadius: radius.xl,
    paddingHorizontal: 14,
    paddingVertical: 9,
    gap: 6,
  },
  tripButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.shoppingGreen,
  },

  // Templates Strip
  templatesContainer: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.xxl,
    marginHorizontal: spacing.screen,
    marginBottom: spacing.md,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    overflow: 'hidden',
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  templatesSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  templatesSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  templatesStrip: {
    paddingHorizontal: spacing.lg,
    gap: 12,
  },
  templateCard: {
    alignItems: 'center',
    width: 86,
    gap: 6,
  },
  templateIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  templateName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  templateCount: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ViewStyle, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../../../../theme/tokens";
import { ShoppingTemplate } from "../../../../types";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

// ==========================================
// 1. Template Category Filter Bar
// ==========================================
type FilterPill = { id: string; label: string; count: number };

type TemplateCategoryFilterBarProps = {
  filters: FilterPill[];
  activeFilterId: string;
  onSelectFilter: (id: string) => void;
  onOpenSettings?: () => void;
  style?: ViewStyle;
};

export const TemplateCategoryFilterBar: React.FC<TemplateCategoryFilterBarProps> = ({
  filters,
  activeFilterId,
  onSelectFilter,
  onOpenSettings,
  style,
}) => {
  return (
    <View style={[styles.filterBarContainer, style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollContent}>
        {filters.map((filter) => {
          const isActive = filter.id === activeFilterId;
          return (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterPill, isActive && styles.filterPillActive]}
              onPress={() => onSelectFilter(filter.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                {filter.label}
              </Text>
              <View style={[styles.filterBadge, isActive && styles.filterBadgeActive]}>
                <Text style={[styles.filterBadgeText, isActive && styles.filterBadgeTextActive]}>
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {onOpenSettings && (
        <TouchableOpacity style={styles.filterSettingsButton} onPress={onOpenSettings}>
          <Ionicons name="options-outline" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

// ==========================================
// 2. Template List Item (Мои шаблоны)
// ==========================================
type TemplateListItemProps = {
  template: ShoppingTemplate;
  onPress: () => void;
  onMenuPress?: () => void;
};

export const TemplateListItem: React.FC<TemplateListItemProps> = ({ template, onPress, onMenuPress }) => {
  return (
    <TouchableOpacity style={styles.listItemContainer} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: template.iconBg }]}>
        <Ionicons name={template.iconName as IconName} size={28} color={template.iconColor} />
      </View>
      
      <View style={styles.listTextContainer}>
        <Text style={styles.listTitle} numberOfLines={1}>{template.name}</Text>
        <Text style={styles.listSubtitle}>{template.itemCount} товаров</Text>
        
        <View style={styles.listMetaRow}>
          <View style={styles.scopeContainer}>
            <Ionicons name={template.scope === 'family' ? "people-outline" : "person-outline"} size={14} color={colors.textSecondary} />
            <Text style={styles.scopeText}>{template.scope === 'family' ? "Семейный" : "Личный"}</Text>
          </View>
          
          {template.lastUsedDaysAgo !== undefined && (
            <View style={[
              styles.lastUsedBadge, 
              template.lastUsedDaysAgo <= 3 ? { backgroundColor: 'rgba(95, 150, 105, 0.15)' } 
              : template.lastUsedDaysAgo <= 7 ? { backgroundColor: 'rgba(116, 92, 219, 0.1)' }
              : { backgroundColor: 'rgba(214, 154, 69, 0.15)' }
            ]}>
              <Text style={[
                styles.lastUsedText,
                template.lastUsedDaysAgo <= 3 ? { color: colors.shoppingGreen } 
                : template.lastUsedDaysAgo <= 7 ? { color: colors.domaBlue }
                : { color: colors.domaGold }
              ]}>
                Использован {template.lastUsedDaysAgo} дн. назад
              </Text>
            </View>
          )}
        </View>
      </View>
      
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress} hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
        <Ionicons name="ellipsis-vertical" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// ==========================================
// 3. Popular Template Card (Популярные)
// ==========================================
type PopularTemplateCardProps = {
  template: ShoppingTemplate;
  onUse: () => void;
};

const CARD_WIDTH = (Dimensions.get("window").width - spacing.xl * 2 - spacing.md) / 2;

export const PopularTemplateCard: React.FC<PopularTemplateCardProps> = ({ template, onUse }) => {
  return (
    <View style={[styles.popularCard, { width: CARD_WIDTH }]}>
      <View style={[styles.popularIconContainer, { backgroundColor: template.iconBg }]}>
        <Ionicons name={template.iconName as IconName} size={32} color={template.iconColor} />
      </View>
      <Text style={[styles.popularTitle, { textAlign: "center" }]} numberOfLines={2}>{template.name}</Text>
      <Text style={styles.popularSubtitle}>{template.itemCount} товаров</Text>
      <TouchableOpacity style={styles.useButton} onPress={onUse} activeOpacity={0.7}>
        <Text style={styles.useButtonText}>Использовать</Text>
      </TouchableOpacity>
    </View>
  );
};

// ==========================================
// 4. Info Banner
// ==========================================
type InfoBannerProps = {
  onClose: () => void;
};

export const TemplateInfoBanner: React.FC<InfoBannerProps> = ({ onClose }) => {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerIconContainer}>
        <Ionicons name="bulb" size={24} color={colors.domaBlue} />
      </View>
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerTitle}>Шаблоны экономят ваше время</Text>
        <Text style={styles.bannerSubtitle}>Создавайте свои наборы покупок и добавляйте их в список в один клик.</Text>
      </View>
      <TouchableOpacity style={styles.bannerCloseButton} onPress={onClose} hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
        <Ionicons name="close" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  filterScrollContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    gap: 6,
  },
  filterPillActive: {
    backgroundColor: colors.domaBlue,
    borderColor: colors.domaBlue,
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  filterPillTextActive: {
    color: colors.white,
  },
  filterBadge: {
    backgroundColor: colors.warmBackground,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  filterBadgeActive: {
    backgroundColor: colors.white,
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  filterBadgeTextActive: {
    color: colors.domaBlue,
  },
  filterSettingsButton: {
    padding: spacing.sm,
    marginRight: spacing.lg,
    marginLeft: spacing.xs,
  },
  
  // List Item
  listItemContainer: {
    flexDirection: "row",
    backgroundColor: colors.surfacePrimary,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  listTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  listSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  listMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scopeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  scopeText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  lastUsedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  lastUsedText: {
    fontSize: 11,
    fontWeight: "600",
  },
  menuButton: {
    padding: 4,
  },
  
  // Popular Card
  popularCard: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: 24,
    padding: spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  popularIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  popularTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 6,
    minHeight: 40, 
  },
  popularSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  useButton: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.domaBlue,
    alignItems: "center",
  },
  useButtonText: {
    color: colors.domaBlue,
    fontSize: 14,
    fontWeight: "600",
  },
  
  // Banner
  bannerContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(116, 92, 219, 0.08)",
    borderRadius: 20,
    padding: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
    alignItems: "flex-start",
  },
  bannerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(116, 92, 219, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  bannerCloseButton: {
    padding: 4,
  }
});

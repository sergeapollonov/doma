import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../../theme/tokens";
import { useLocalAppStore } from "../../store/localAppStore";

interface ShoppingTemplatePreviewScreenProps {
  templateId: string;
  onClose: () => void;
  onApplySuccess: () => void;
}

export const ShoppingTemplatePreviewScreen = ({ 
  templateId, 
  onClose,
  onApplySuccess
}: ShoppingTemplatePreviewScreenProps) => {
  const insets = useSafeAreaInsets();
  
  const template = useLocalAppStore(state => 
    state.shoppingList.templates.find(t => t.id === templateId)
  );
  
  const categories = useLocalAppStore(state => state.shoppingList.categories);
  const applyShoppingTemplate = useLocalAppStore(state => state.applyShoppingTemplate);
  
  const handleApply = () => {
    applyShoppingTemplate(templateId);
    onApplySuccess(); // Close this screen and go back to shopping list
  };

  if (!template) {
    return (
      <View style={[styles.safeArea, { paddingTop: Math.max(insets.top, 20) }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Ionicons name="chevron-back" size={28} color={colors.domaBlue} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ошибка</Text>
          <View style={{ width: 28 }} />
        </View>
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Шаблон не найден</Text>
        </View>
      </View>
    );
  }

  const itemsCount = template.items?.length || 0;

  return (
    <View style={[styles.safeArea, { paddingTop: Math.max(insets.top, 20) }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onClose} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <Ionicons name="chevron-back" size={28} color={colors.domaBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Предпросмотр шаблона</Text>
        <TouchableOpacity style={styles.menuButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.domaBlue} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 160 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Template Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardTop}>
            <View style={[styles.templateIconWrapper, { backgroundColor: template.iconBg }]}>
              <Ionicons name={template.iconName as any} size={32} color={template.iconColor} />
            </View>
            <View style={styles.infoCardText}>
              <Text style={styles.templateName}>{template.name}</Text>
              <View style={styles.scopeRow}>
                <Ionicons 
                  name={template.scope === 'family' ? "people-outline" : "person-outline"} 
                  size={14} 
                  color={colors.textSecondary} 
                />
                <Text style={styles.scopeText}>
                  {template.scope === 'family' ? "Семейный шаблон" : "Личный шаблон"}
                </Text>
              </View>
              {template.description && (
                <Text style={styles.templateDescription}>{template.description}</Text>
              )}
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{itemsCount} товаров</Text>
            </View>
          </View>

          {/* Banner inside card */}
          <View style={styles.banner}>
            <View style={styles.bannerHeader}>
              <Ionicons name="sparkles" size={16} color={colors.shoppingGreen} />
              <Text style={styles.bannerTitle}>Что произойдёт после применения</Text>
            </View>
            <Text style={styles.bannerText}>
              Товары из шаблона будут добавлены в ваш список покупок. 
              Дубликаты товаров не будут создаваться.
            </Text>
          </View>
        </View>

        {/* Items List */}
        <View style={styles.listSection}>
          <Text style={styles.listHeader}>Список товаров</Text>
          
          <View style={styles.listContainer}>
            {template.items?.map((item, index) => {
              const category = categories.find(c => c.id === item.categoryId);
              
              // Helper to map colorKey to actual colors
              const getCategoryColors = (colorKey?: string) => {
                if (!colorKey) return { bg: "rgba(189, 195, 199, 0.15)", text: "#7F8C8D" };
                if (colorKey === "doma_blue") return { bg: "rgba(116, 92, 219, 0.1)", text: colors.domaBlue };
                if (colorKey === "shopping_green") return { bg: "rgba(95, 150, 105, 0.1)", text: colors.shoppingGreen };
                if (colorKey === "danger_red") return { bg: "rgba(229, 57, 53, 0.1)", text: colors.dangerRed };
                if (colorKey === "task_orange") return { bg: "rgba(214, 154, 69, 0.1)", text: colors.taskOrange };
                if (colorKey === "doma_purple") return { bg: "rgba(155, 89, 182, 0.1)", text: "#9B59B6" };
                return { bg: "rgba(189, 195, 199, 0.15)", text: "#7F8C8D" };
              };

              const colorsObj = getCategoryColors(category?.colorKey);

              return (
                <View key={index} style={[styles.listItem, index === itemsCount - 1 && styles.lastListItem]}>
                  <View style={styles.listItemLeft}>
                    <View style={styles.itemIconCircle}>
                      <Ionicons name={(category?.iconKey || "basket-outline") as any} size={20} color={colors.domaBlue} />
                    </View>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                  </View>
                  
                  <View style={styles.listItemRight}>
                    {item.quantity && (
                      <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    )}
                    {category && (
                      <View style={[styles.categoryBadge, { backgroundColor: colorsObj.bg }]}>
                        <Text style={[styles.categoryBadgeText, { color: colorsObj.text }]}>
                          {category.nameRu}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

      </ScrollView>

      {/* Sticky Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <View style={styles.footerInfoRow}>
          <View style={styles.footerInfoLeft}>
            <View style={styles.footerIconWrapper}>
              <Ionicons name="basket-outline" size={20} color={colors.shoppingGreen} />
            </View>
            <View>
              <Text style={styles.footerItemCount}>{itemsCount} товаров</Text>
              <Text style={styles.footerSubText}>Будет добавлено в список покупок</Text>
            </View>
          </View>
          <View style={styles.footerInfoRight}>
            <Ionicons name="checkmark-circle-outline" size={16} color={colors.shoppingGreen} />
            <Text style={styles.footerCheckText}>Дубликатов не будет</Text>
          </View>
        </View>
        
        <View style={styles.footerButtonsRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Отмена</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Ionicons name="add" size={20} color={colors.white} style={styles.applyIcon} />
            <Text style={styles.applyButtonText}>Применить шаблон</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.warmBackground,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  menuButton: {
    padding: 4,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  
  // Card
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: "#372614",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  infoCardTop: {
    flexDirection: "row",
    marginBottom: spacing.lg,
  },
  templateIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  infoCardText: {
    flex: 1,
    justifyContent: "center",
  },
  templateName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  scopeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  scopeText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  templateDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: 4,
  },
  countBadge: {
    backgroundColor: "rgba(95, 150, 105, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  countBadgeText: {
    color: colors.shoppingGreen,
    fontSize: 12,
    fontWeight: "600",
  },
  
  // Banner
  banner: {
    backgroundColor: "rgba(95, 150, 105, 0.05)",
    borderRadius: 16,
    padding: spacing.md,
  },
  bannerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.shoppingGreen,
    marginLeft: 6,
  },
  bannerText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  
  // List
  listSection: {
    marginBottom: spacing.xl,
  },
  listHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md,
    shadowColor: "#372614",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.glass.borderLight,
  },
  lastListItem: {
    borderBottomWidth: 0,
  },
  listItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(116, 92, 219, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  listItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemQuantity: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  
  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  footerInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
    backgroundColor: "rgba(95, 150, 105, 0.05)",
    padding: spacing.md,
    borderRadius: 16,
  },
  footerInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(95, 150, 105, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  footerItemCount: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  footerSubText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  footerInfoRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerCheckText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.shoppingGreen,
    marginLeft: 4,
  },
  footerButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.domaBlue,
    backgroundColor: colors.white,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.domaBlue,
  },
  applyButton: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: colors.domaBlue,
  },
  applyIcon: {
    marginRight: 6,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});

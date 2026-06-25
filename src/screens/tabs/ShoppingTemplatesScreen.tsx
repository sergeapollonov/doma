import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../../theme/tokens";
import { useLocalAppStore } from "../../store/localAppStore";
import { ShoppingTemplate } from "../../types";
import { 
  TemplateCategoryFilterBar, 
  TemplateListItem, 
  PopularTemplateCard, 
  TemplateInfoBanner 
} from "./components/shopping/ShoppingTemplatesComponents";

interface ShoppingTemplatesScreenProps {
  onClose: () => void;
}

export const ShoppingTemplatesScreen = ({ onClose }: ShoppingTemplatesScreenProps) => {
  const insets = useSafeAreaInsets();
  const templates = useLocalAppStore(state => state.shoppingList.templates) || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [showBanner, setShowBanner] = useState(true);
  
  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: templates.length };
    templates.forEach((t: ShoppingTemplate) => {
      const cat = t.category || "Другое";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [templates]);
  
  // Filter categories for the pills
  const filters = useMemo(() => {
    const defaultCategories = ["Продукты", "Аптека", "Для дома", "Детям"];
    const pills = [{ id: "all", label: "Все", count: categoryCounts["all"] }];
    defaultCategories.forEach(cat => {
      if (categoryCounts[cat]) {
        pills.push({ id: cat, label: cat, count: categoryCounts[cat] });
      }
    });
    return pills;
  }, [categoryCounts]);
  
  // Filtered templates
  const myTemplates = useMemo(() => {
    let filtered = templates;
    if (activeCategoryId !== "all") {
      filtered = filtered.filter((t: ShoppingTemplate) => t.category === activeCategoryId);
    }
    if (searchQuery.trim().length > 0) {
      filtered = filtered.filter((t: ShoppingTemplate) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return filtered;
  }, [templates, activeCategoryId, searchQuery]);
  
  // Fake popular templates (we can just reuse some for demo)
  const popularTemplates = useMemo(() => {
    return templates.slice(0, 4);
  }, [templates]);

  return (
    <View style={[styles.safeArea, { paddingTop: Math.max(insets.top, 20) }]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Ionicons name="chevron-back" size={28} color={colors.domaBlue} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Шаблоны покупок</Text>
          <TouchableOpacity style={styles.addButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Ionicons name="add-circle-outline" size={28} color={colors.domaBlue} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          
          {/* Search */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Поиск шаблонов..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          {/* Category Filters */}
          <TemplateCategoryFilterBar 
            filters={filters}
            activeFilterId={activeCategoryId}
            onSelectFilter={setActiveCategoryId}
            onOpenSettings={() => {}}
            style={styles.filterBar}
          />
          
          {/* Мои шаблоны */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Мои шаблоны</Text>
            {myTemplates.length > 0 ? (
              myTemplates.map((template: ShoppingTemplate) => (
                <TemplateListItem 
                  key={template.id} 
                  template={template} 
                  onPress={() => {}} 
                  onMenuPress={() => {}} 
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Ничего не найдено</Text>
              </View>
            )}
          </View>
          
          {/* Популярные шаблоны */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Популярные шаблоны</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Посмотреть все</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularScrollContent}>
              {popularTemplates.map((template: ShoppingTemplate) => (
                <PopularTemplateCard 
                  key={`pop-${template.id}`} 
                  template={template} 
                  onUse={() => {}} 
                />
              ))}
            </ScrollView>
          </View>
          
          {/* Info Banner */}
          {showBanner && (
            <TemplateInfoBanner onClose={() => setShowBanner(false)} />
          )}
        </ScrollView>
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
    paddingBottom: 120, 
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
  addButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.glass.medium,
    borderWidth: 1,
    borderColor: colors.glass.borderHeavy,
    borderRadius: 26,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.xl,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    shadowColor: "#372614",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 28,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: colors.textPrimary,
  },
  filterBar: {
    marginBottom: spacing.lg,
  },
  sectionContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  seeAllText: {
    color: colors.domaBlue,
    fontSize: 14,
    fontWeight: "500",
  },
  popularScrollContent: {
    gap: spacing.md,
    paddingRight: spacing.xl,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: "center",
  },
  emptyStateText: {
    color: colors.textSecondary,
    fontSize: 15,
  }
});

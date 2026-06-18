import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors, radius, spacing } from '../../../theme';

type FilterPanelProps = {
  activeUserFilter: string;
  activeTypeFilter: string;
};

export function FilterPanel({ activeUserFilter, activeTypeFilter }: FilterPanelProps) {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Filters */}
        <TouchableOpacity style={[styles.chip, activeUserFilter === 'family' && styles.chipActive]}>
          <Text style={[styles.chipText, activeUserFilter === 'family' && styles.chipTextActive]}>👨‍👩‍👧 Семья</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.chip, activeUserFilter === 'alex' && styles.chipActive]}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?u=sergey' }} style={styles.avatar} />
          <Text style={[styles.chipText, activeUserFilter === 'alex' && styles.chipTextActive]}>Сергей</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.chip, activeUserFilter === 'maya' && styles.chipActive]}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?u=olya' }} style={styles.avatar} />
          <Text style={[styles.chipText, activeUserFilter === 'maya' && styles.chipTextActive]}>Оля</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Type Filters */}
        <TouchableOpacity style={[styles.chip, activeTypeFilter === 'all' && styles.chipActiveType]}>
          <Text style={[styles.chipText, activeTypeFilter === 'all' && styles.chipTextActive]}>Все</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.chip}>
          <View style={[styles.dot, { backgroundColor: colors.domaBlue }]} />
          <Text style={styles.chipText}>События</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chip}>
          <View style={[styles.dot, { backgroundColor: colors.taskOrange }]} />
          <Text style={styles.chipText}>Задачи</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chip}>
          <View style={[styles.dot, { backgroundColor: colors.shoppingGreen }]} />
          <Text style={styles.chipText}>Покупки</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
  },
  chipActive: {
    backgroundColor: colors.familySand,
    borderColor: colors.familySand,
  },
  chipActiveType: {
    backgroundColor: colors.domaBlue,
    borderColor: colors.domaBlue,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.white,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.strokeSoft,
    marginHorizontal: spacing.xs,
  }
});

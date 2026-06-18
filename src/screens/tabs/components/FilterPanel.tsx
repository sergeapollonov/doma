import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

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
        {/* Островок 1: Пользователи */}
        <View style={styles.islandContainer}>
          <TouchableOpacity style={[styles.islandChip, activeUserFilter === 'family' && styles.islandChipActive]}>
            <Ionicons name="people-outline" size={16} color={activeUserFilter === 'family' ? colors.domaBlue : colors.textSecondary} style={{ marginRight: 4 }} />
            <Text style={[styles.islandChipText, activeUserFilter === 'family' && styles.islandChipTextActive]}>Семья</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.islandChip, activeUserFilter === 'alex' && styles.islandChipActive]}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=sergey' }} style={styles.avatar} />
            <Text style={[styles.islandChipText, activeUserFilter === 'alex' && styles.islandChipTextActive]}>Сергей</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.islandChip, activeUserFilter === 'maya' && styles.islandChipActive]}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=olya' }} style={styles.avatar} />
            <Text style={[styles.islandChipText, activeUserFilter === 'maya' && styles.islandChipTextActive]}>Оля</Text>
          </TouchableOpacity>
        </View>

        {/* Островок 2: Типы */}
        <View style={styles.islandContainer}>
          <TouchableOpacity style={[styles.islandChip, activeTypeFilter === 'all' && styles.islandChipSolidActive]}>
            <Text style={[styles.islandChipText, activeTypeFilter === 'all' && styles.textWhite]}>Все</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.islandChip}>
            <View style={[styles.dot, { backgroundColor: colors.domaBlue }]} />
            <Text style={styles.islandChipText}>События</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.islandChip}>
            <View style={[styles.dot, { backgroundColor: colors.taskOrange }]} />
            <Text style={styles.islandChipText}>Задачи</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.islandChip}>
            <View style={[styles.dot, { backgroundColor: colors.shoppingGreen }]} />
            <Text style={styles.islandChipText}>Покупки</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    gap: spacing.lg,
  },
  islandContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfacePrimary,
    borderRadius: radius.pill,
    padding: 4,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: colors.strokeLight,
  },
  islandChip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
  },
  islandChipActive: {
    backgroundColor: 'rgba(22, 58, 95, 0.05)', // Очень легкий фиолетовый/синий оттенок
  },
  islandChipSolidActive: {
    backgroundColor: '#8C77F6', // Фиолетовый
  },
  islandChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  islandChipTextActive: {
    color: colors.domaBlue,
    fontWeight: '600',
  },
  textWhite: {
    color: colors.white,
    fontWeight: '600',
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 6,
    borderWidth: 1,
    borderColor: colors.strokeLight,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  }
});

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../../theme';
import { SectionHeaderProps } from '../../../types/calendar';
import { Ionicons } from '@expo/vector-icons';

export function SectionHeader({ title, actionLabel, onPressAction, colorTheme }: SectionHeaderProps) {
  let themeColor: string = colors.textPrimary;
  switch (colorTheme) {
    case 'purple':
      themeColor = colors.domaBlue; // Фиолетовый оттенок в системе Doma (часто domaBlue или отдельный фиолетовый)
      break;
    case 'orange':
      themeColor = colors.taskOrange;
      break;
    case 'green':
      themeColor = colors.shoppingGreen;
      break;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColor }]}>{title.toUpperCase()}</Text>
      
      {actionLabel && (
        <TouchableOpacity style={styles.actionButton} onPress={onPressAction}>
          <Text style={[styles.actionText, { color: themeColor }]}>{actionLabel}</Text>
          <Ionicons name="chevron-forward" size={14} color={themeColor} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.xl,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
  }
});

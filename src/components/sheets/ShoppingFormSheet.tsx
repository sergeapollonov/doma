import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { Controller, type UseFormReturn } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

import type { Language } from "../../types";
import type { copy } from "../../i18n";
import type { ShoppingFormInput } from "../../validation/forms";
import { fieldValidationMessage } from "../../validation/messages";
import { Input, PrimaryButton, SheetTitle } from "../ui";
import { Avatar, AvatarGroup } from "../family";
import { colors, radius, spacing } from "../../theme";

type ShoppingFormSheetProps = {
  form: UseFormReturn<ShoppingFormInput>;
  language: Language;
  text: typeof copy.ru;
  isValid: boolean;
  onSubmit: () => void;
};

const CATEGORIES = [
  { id: 'food', icon: '🍞', label: 'Jedzenie', color: '#E53935' },
  { id: 'drinks', icon: '🥤', label: 'Napoje', color: '#1E88E5' },
  { id: 'cleaning', icon: '🧼', label: 'Chemia', color: '#43A047' },
  { id: 'pharmacy', icon: '💊', label: 'Apteka', color: '#8E24AA' },
  { id: 'home', icon: '🏠', label: 'Dom', color: '#F4511E' },
];

const URGENCIES = [
  { id: 'normal', label: 'Zwykłe', icon: 'calendar-outline' },
  { id: 'soon', label: 'Niedługo', icon: 'time-outline', color: colors.taskOrange },
  { id: 'today', label: 'Pilne', icon: 'alert-circle-outline', color: colors.overdueRed },
];

const ASSIGNEES = [
  { id: 'unassigned', label: 'Ktoś' },
  { id: 'alex', label: 'Ja' },
  { id: 'maya', label: 'Maya' },
  { id: 'shared', label: 'Wspólnie' },
];

export function ShoppingFormSheet({ form, language, text, isValid, onSubmit }: ShoppingFormSheetProps) {
  const titleError = fieldValidationMessage(form.formState.errors.title, language);

  return (
    <View style={styles.container}>
      <SheetTitle title="Szczegóły przedmiotu" />

      {/* Main Input (Title) */}
      <Controller
        control={form.control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <View style={styles.mainInputWrap}>
            <TextInput
              style={styles.mainInput}
              placeholder="Co kupić?"
              placeholderTextColor={colors.textTertiary}
              value={value}
              onChangeText={onChange}
              autoFocus
            />
            {titleError && <Text style={styles.errorText}>{titleError}</Text>}
          </View>
        )}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Quantity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ilość</Text>
          <Controller
            control={form.control}
            name="quantity"
            render={({ field: { value, onChange } }) => (
              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => {
                    const num = parseInt(value || '1', 10);
                    if (num > 1) onChange(String(num - 1));
                  }}
                >
                  <Ionicons name="remove" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
                <TextInput
                  style={styles.qtyInput}
                  value={value || '1'}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  textAlign="center"
                />
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => {
                    const num = parseInt(value || '1', 10) || 0;
                    onChange(String(num + 1));
                  }}
                >
                  <Ionicons name="add" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategoria</Text>
          <Controller
            control={form.control}
            name="category"
            render={({ field: { value, onChange } }) => (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
                {CATEGORIES.map((cat) => {
                  const isActive = value === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      style={[styles.catCard, isActive && { borderColor: cat.color, backgroundColor: `${cat.color}15` }]}
                      onPress={() => onChange(cat.id)}
                    >
                      <View style={[styles.catIconWrap, { backgroundColor: `${cat.color}25` }]}>
                        <Text style={styles.catIcon}>{cat.icon}</Text>
                      </View>
                      <Text style={[styles.catLabel, isActive && { color: cat.color, fontWeight: '600' }]}>
                        {cat.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          />
        </View>

        {/* Urgency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ważność</Text>
          <Controller
            control={form.control}
            name="urgency"
            render={({ field: { value, onChange } }) => (
              <View style={styles.rowGrid}>
                {URGENCIES.map((u) => {
                  const isActive = (value || 'normal') === u.id;
                  const tint = u.color || colors.domaBlue;
                  return (
                    <TouchableOpacity
                      key={u.id}
                      style={[styles.urgencyChip, isActive && { backgroundColor: tint, borderColor: tint }]}
                      onPress={() => onChange(u.id)}
                    >
                      <Ionicons name={u.icon as any} size={18} color={isActive ? colors.white : colors.textSecondary} />
                      <Text style={[styles.urgencyLabel, isActive && { color: colors.white }]}>
                        {u.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          />
        </View>

        {/* Assignee */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kto kupuje?</Text>
          <Controller
            control={form.control}
            name="assignee"
            render={({ field: { value, onChange } }) => (
              <View style={styles.rowGrid}>
                {ASSIGNEES.map((a) => {
                  const isActive = (value || 'unassigned') === a.id;
                  return (
                    <TouchableOpacity
                      key={a.id}
                      style={[styles.assigneeChip, isActive && styles.assigneeChipActive]}
                      onPress={() => onChange(a.id)}
                    >
                      {a.id === 'alex' || a.id === 'maya' ? (
                        <Avatar person={a.id as any} size={24} />
                      ) : a.id === 'shared' ? (
                        <AvatarGroup participants={['alex', 'maya']} small />
                      ) : (
                        <View style={styles.unassignedAvatar}>
                          <Ionicons name="help" size={14} color={colors.textSecondary} />
                        </View>
                      )}
                      <Text style={[styles.assigneeLabel, isActive && styles.assigneeLabelActive]}>
                        {a.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          />
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="Zapisz" onPress={onSubmit} disabled={!isValid} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: '90%',
  },
  scrollContent: {
    paddingHorizontal: spacing.screen,
    paddingTop: 10,
  },
  mainInputWrap: {
    paddingHorizontal: spacing.screen,
    marginBottom: spacing.md,
  },
  mainInput: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeLight,
    paddingBottom: 10,
  },
  errorText: {
    color: colors.overdueRed,
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  
  // Quantity
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  qtyBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfacePrimary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.strokeLight,
  },
  qtyInput: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    width: 60,
  },

  // Categories
  catScroll: {
    gap: 12,
    paddingBottom: 4,
  },
  catCard: {
    width: 86,
    height: 96,
    borderRadius: radius.xl,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1.5,
    borderColor: colors.strokeLight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  catIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catIcon: {
    fontSize: 22,
  },
  catLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },

  // Urgency & Assignee Grids
  rowGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  urgencyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.pill,
    gap: 6,
  },
  urgencyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  
  assigneeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    paddingRight: 16,
    paddingLeft: 6,
    paddingVertical: 6,
    borderRadius: radius.pill,
    gap: 8,
  },
  assigneeChipActive: {
    borderColor: colors.shoppingGreen,
    backgroundColor: 'rgba(67, 160, 71, 0.08)',
  },
  unassignedAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.strokeLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assigneeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  assigneeLabelActive: {
    color: colors.shoppingGreen,
    fontWeight: '600',
  },

  bottomPad: {
    height: 60,
  },
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: 16,
    paddingBottom: 30,
    backgroundColor: colors.warmBackground,
    borderTopWidth: 1,
    borderTopColor: colors.strokeLight,
  },
});

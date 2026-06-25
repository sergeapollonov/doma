import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Switch, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing, typography } from "../../theme";
import type { Language, PersonId, ShoppingItem } from "../../types";
import { people } from "../../data";
import { Avatar, AvatarGroup } from "../../components/family";
import { copy } from "../../i18n";
import { shoppingFormSchema, type ShoppingFormInput } from "../../validation/forms";
import { PrimaryButton } from "../../components/ui";

type ShoppingItemDetailScreenProps = {
  text: typeof copy.ru;
  item?: ShoppingItem; // if editing existing
  onBack: () => void;
  onSave: (data: ShoppingFormInput) => void;
  onDelete?: (id: string) => void;
};

const CATEGORIES = [
  { id: 'food', icon: '🍞', label: 'Jedzenie', color: '#E53935' },
  { id: 'drinks', icon: '🥤', label: 'Napoje', color: '#1E88E5' },
  { id: 'cleaning', icon: '🧼', label: 'Chemia', color: '#43A047' },
  { id: 'pharmacy', icon: '💊', label: 'Apteka', color: '#8E24AA' },
  { id: 'home', icon: '🏠', label: 'Dom', color: '#F4511E' },
];

export function ShoppingItemDetailScreen({ text, item, onBack, onSave, onDelete }: ShoppingItemDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const isEditing = !!item;
  
  const form = useForm<ShoppingFormInput>({
    resolver: zodResolver(shoppingFormSchema),
    defaultValues: {
      title: item?.title || "",
      quantity: item?.quantity || "1",
      category: item?.categoryId || "food",
      assignee: item?.assignee || "unassigned",
      dueDate: item?.dueDate || "",
      priority: item?.priority || "normal",
      recurrence: item?.recurrence || "",
      note: item?.note || "",
      isTemplate: item?.isTemplate || false,
    },
    mode: "onChange",
  });

  const isValid = form.formState.isValid;

  const handleSubmit = form.handleSubmit((data) => {
    onSave(data);
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 16 }]}>
        <Pressable onPress={onBack} hitSlop={15} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color={colors.domaBlue} />
        </Pressable>
        <Text style={styles.headerTitle}>{isEditing ? "Edytuj towar" : "Nowy towar"}</Text>
        <Pressable onPress={handleSubmit} hitSlop={15} disabled={!isValid}>
          <Text style={[styles.headerSave, !isValid && { opacity: 0.5 }]}>Zapisz</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* SECTION 1: Основное (Main) */}
        <Text style={styles.sectionHeader}>Podstawowe</Text>
        <View style={styles.card}>
          
          {/* Title */}
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Nazwa <Text style={styles.required}>*</Text></Text>
            <Controller
              control={form.control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Np. Mleko"
                    placeholderTextColor={colors.textTertiary}
                    value={value}
                    onChangeText={onChange}
                  />
                  {value.length > 0 && (
                    <Pressable onPress={() => onChange("")} hitSlop={10}>
                      <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
                    </Pressable>
                  )}
                </View>
              )}
            />
          </View>
          <View style={styles.divider} />

          {/* Quantity */}
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Ilość</Text>
            <Controller
              control={form.control}
              name="quantity"
              render={({ field: { onChange, value } }) => (
                <View style={styles.qtyContainer}>
                  <View style={styles.stepper}>
                    <Pressable style={styles.stepperBtn} onPress={() => {
                      const num = parseInt(value || "1", 10);
                      if (num > 1) onChange(String(num - 1));
                    }}>
                      <Ionicons name="remove" size={18} color={colors.textSecondary} />
                    </Pressable>
                    <TextInput
                      style={styles.stepperInput}
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                    <Pressable style={styles.stepperBtn} onPress={() => {
                      const num = parseInt(value || "1", 10) || 0;
                      onChange(String(num + 1));
                    }}>
                      <Ionicons name="add" size={18} color={colors.textSecondary} />
                    </Pressable>
                  </View>
                  <View style={styles.unitDropdown}>
                    <Text style={styles.unitText}>szt.</Text>
                    <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
                  </View>
                </View>
              )}
            />
          </View>
          <View style={styles.divider} />

          {/* Category */}
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Kategoria</Text>
            <Controller
              control={form.control}
              name="category"
              render={({ field: { value } }) => {
                const cat = CATEGORIES.find(c => c.id === value) || CATEGORIES[0];
                return (
                  <Pressable style={styles.selector}>
                    <View style={styles.selectorLeft}>
                      <View style={[styles.selectorIcon, { backgroundColor: `${cat.color}15` }]}>
                        <Text style={{ fontSize: 16 }}>{cat.icon}</Text>
                      </View>
                      <Text style={styles.selectorText}>{cat.label}</Text>
                    </View>
                    <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
                  </Pressable>
                );
              }}
            />
          </View>
          <View style={styles.divider} />

          {/* Assignee */}
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Kto kupuje</Text>
            <Controller
              control={form.control}
              name="assignee"
              render={({ field: { value } }) => (
                <Pressable style={styles.selector}>
                  <View style={styles.selectorLeft}>
                    {value === 'alex' || value === 'maya' ? (
                      <Avatar person={value as any} size={28} />
                    ) : value === 'shared' ? (
                      <AvatarGroup participants={['alex', 'maya']} small />
                    ) : (
                      <View style={styles.unassignedAvatar}>
                        <Ionicons name="help" size={16} color={colors.textSecondary} />
                      </View>
                    )}
                    <Text style={styles.selectorText}>
                      {value === 'alex' ? 'Ja' : value === 'maya' ? 'Maya' : value === 'shared' ? 'Wspólnie' : 'Ktoś'}
                    </Text>
                  </View>
                  <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
                </Pressable>
              )}
            />
          </View>
          <View style={styles.divider} />

          {/* Due Date */}
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Kupić do</Text>
            <Controller
              control={form.control}
              name="dueDate"
              render={({ field: { value } }) => (
                <Pressable style={styles.selector}>
                  <View style={styles.selectorLeft}>
                    <Ionicons name="calendar-outline" size={24} color={colors.domaBlue} />
                    <Text style={[styles.selectorText, { color: colors.domaBlue }]}>
                      {value ? value : "Dzisiaj"}
                    </Text>
                  </View>
                  <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
                </Pressable>
              )}
            />
          </View>
          <View style={styles.divider} />

          {/* Priority */}
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Priorytet</Text>
            <Controller
              control={form.control}
              name="priority"
              render={({ field: { onChange, value } }) => (
                <View style={styles.prioritySegmented}>
                  <Pressable 
                    style={[styles.priorityBtn, value === 'low' && styles.priorityBtnActive]} 
                    onPress={() => onChange('low')}
                  >
                    <Text style={[styles.priorityText, value === 'low' && styles.priorityTextLow]}>Niski</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.priorityBtn, value === 'normal' && styles.priorityBtnActiveGreen]} 
                    onPress={() => onChange('normal')}
                  >
                    <Text style={[styles.priorityText, value === 'normal' && styles.priorityTextNormal]}>Średni</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.priorityBtn, value === 'high' && styles.priorityBtnActiveRed]} 
                    onPress={() => onChange('high')}
                  >
                    <Text style={[styles.priorityText, value === 'high' && styles.priorityTextHigh]}>Wysoki</Text>
                  </Pressable>
                </View>
              )}
            />
          </View>

        </View>

        {/* SECTION 2: Дополнительно (Additional) */}
        <Text style={styles.sectionHeader}>Dodatkowe</Text>
        <View style={styles.card}>
          
          {/* Recurrence */}
          <View style={styles.rowCol}>
            <View style={styles.rowBetween}>
              <View style={styles.selectorLeft}>
                <View style={styles.iconCircle}>
                  <Ionicons name="repeat" size={18} color={colors.domaBlue} />
                </View>
                <Text style={styles.rowLabel}>Powtarzaj</Text>
              </View>
              <Controller
                control={form.control}
                name="recurrence"
                render={({ field: { value } }) => (
                  <Pressable style={styles.selectorRight}>
                    <Text style={[styles.selectorText, { color: colors.domaBlue }]}>
                      {value ? value : "Nie powtarzaj"}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
                  </Pressable>
                )}
              />
            </View>
            <Text style={styles.helperText}>Po zakupie towar automatycznie powróci na listę.</Text>
          </View>
          <View style={styles.divider} />

          {/* Note */}
          <View style={styles.rowCol}>
            <View style={[styles.selectorLeft, { marginBottom: 12 }]}>
              <View style={styles.iconCircleGray}>
                <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.textSecondary} />
              </View>
              <Text style={styles.rowLabel}>Notatka</Text>
            </View>
            <Controller
              control={form.control}
              name="note"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textAreaContainer}>
                  <TextInput
                    style={styles.textArea}
                    multiline
                    placeholder="Np. mleko bez laktozy, jeśli będzie"
                    placeholderTextColor={colors.textTertiary}
                    value={value}
                    onChangeText={onChange}
                    maxLength={500}
                  />
                  <Text style={styles.charCount}>{value?.length || 0}/500</Text>
                </View>
              )}
            />
          </View>
          <View style={styles.divider} />

          {/* Template Toggle */}
          <View style={styles.rowBetween}>
            <View style={styles.selectorLeft}>
              <View style={styles.iconCircleBlue}>
                <Ionicons name="bookmark-outline" size={18} color={colors.domaBlue} />
              </View>
              <Text style={styles.rowLabel}>Szablon</Text>
            </View>
            <Controller
              control={form.control}
              name="isTemplate"
              render={({ field: { onChange, value } }) => (
                <View style={styles.selectorRight}>
                  <Text style={styles.selectorText}>
                    {value ? "Zapisz jako szablon" : "Nie zapisuj do szablonu"}
                  </Text>
                  <Switch
                    value={value}
                    onValueChange={onChange}
                    trackColor={{ false: colors.strokeLight, true: colors.shoppingGreen }}
                  />
                </View>
              )}
            />
          </View>

        </View>

        {/* Delete Button (if editing) */}
        {isEditing && (
          <View style={styles.card}>
            <Pressable style={styles.deleteRow} onPress={() => onDelete?.(item!.id)}>
              <View style={styles.selectorLeft}>
                <View style={styles.iconCircleRed}>
                  <Ionicons name="trash-outline" size={18} color={colors.overdueRed} />
                </View>
                <View>
                  <Text style={styles.deleteText}>Usuń towar</Text>
                  <Text style={styles.helperText}>Towar zostanie usunięty z listy zakupów.</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>
        )}

        <View style={styles.bottomPad} />
      </ScrollView>

      {/* Footer Button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <PrimaryButton 
          label="Zapisz towar" 
          onPress={handleSubmit} 
          disabled={!isValid} 
          color={colors.shoppingGreen}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Light gray background like in the design
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screen,
    paddingBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  backBtn: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  headerSave: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.shoppingGreen,
    width: 60,
    textAlign: 'right',
  },
  scrollContent: {
    paddingHorizontal: spacing.screen,
    paddingTop: 10,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: 20,
    paddingVertical: 4,
    marginBottom: 8,
    shadowColor: colors.domaBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowCol: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLabel: {
    width: 110,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  required: {
    color: colors.overdueRed,
  },
  divider: {
    height: 1,
    backgroundColor: colors.strokeLight,
    marginLeft: 16,
  },
  
  // Inputs
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
  },
  
  // Quantity
  qtyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    height: 40,
    flex: 1,
  },
  stepperBtn: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  unitDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 12,
    gap: 8,
  },
  unitText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '500',
  },

  // Selectors
  selector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfacePrimary,
    borderRadius: 12,
    height: 40,
  },
  selectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectorRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectorIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '400',
  },
  unassignedAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.strokeLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Priority Segmented
  prioritySegmented: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 2,
    height: 40,
  },
  priorityBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  priorityBtnActive: {
    backgroundColor: colors.surfacePrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  priorityBtnActiveGreen: {
    backgroundColor: 'rgba(67, 160, 71, 0.1)',
  },
  priorityBtnActiveRed: {
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  priorityTextLow: {
    color: colors.textPrimary,
  },
  priorityTextNormal: {
    color: colors.shoppingGreen,
  },
  priorityTextHigh: {
    color: colors.overdueRed,
  },

  // Icons
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(92, 107, 192, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleGray: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleBlue: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(92, 107, 192, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleRed: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  helperText: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 4,
    marginLeft: 42,
  },

  textAreaContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    marginTop: 8,
  },
  textArea: {
    fontSize: 15,
    color: colors.textPrimary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 11,
    color: colors.textTertiary,
    textAlign: 'right',
    marginTop: 8,
  },

  deleteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  deleteText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.overdueRed,
  },

  bottomPad: {
    height: 20,
  },
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: 12,
    paddingBottom: 34, // Safe area
    backgroundColor: '#F9FAFB',
  },
});

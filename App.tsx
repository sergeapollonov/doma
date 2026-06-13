import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { Avatar, AvatarGroup, AvatarStack } from "./src/components/family";
import { AppShell, BottomSheet, Header, TabBar } from "./src/components/layout";
import {
  EventFormSheet,
  FamilySheet,
  QuickAddSheet,
  SettingsSheet,
  ShoppingFormSheet,
  TaskFormSheet,
  type AppSheet
} from "./src/components/sheets";
import {
  Card,
  DomaLogo,
  Input,
  PrimaryButton,
  SecondaryButton
} from "./src/components/ui";
import { people } from "./src/data";
import { copy } from "./src/i18n";
import {
  dueLabelToDateTime,
  shoppingCategoryLabelToId,
  shoppingCategoryName,
  taskAssigneeToMemberId,
  toShoppingItem,
  toTaskItem
} from "./src/mappers/appUiMappers";
import { useLocalAppStore } from "./src/store/localAppStore";
import { colors, spacing } from "./src/theme";
import {
  HouseholdTaskId,
  PersonId,
  ShoppingItemId,
  TabKey,
  TaskItem
} from "./src/types";
import {
  CalendarScreen,
  ShoppingScreen,
  TasksScreen,
  TodayScreen,
  type TaskFilter
} from "./src/screens/tabs";
import {
  eventDateToDay,
  eventDateToISODate,
  formatCalendarSectionDate,
  formatSelectedDate,
  juneDate,
  nowDateTime
} from "./src/utils/appDates";
import { createHouseholdTaskId, createShoppingItemId } from "./src/utils/localIds";
import {
  eventFormSchema,
  familySetupFormSchema,
  loginFormSchema,
  shoppingFormSchema,
  taskFormSchema
} from "./src/validation/forms";
import { fieldValidationMessage } from "./src/validation/messages";
import type {
  EventFormInput,
  FamilySetupFormInput,
  LoginFormInput,
  ShoppingFormInput,
  TaskFormInput
} from "./src/validation/forms";

type Stage = "onboarding" | "login" | "family" | "invite" | "acceptInvite" | "app";
type AuthIntent = "createFamily" | "acceptInvite";

const appIconSource = require("./assets/app-icon.png");

export default function App() {
  const language = useLocalAppStore((state) => state.language);
  const familyId = useLocalAppStore((state) => state.familyId);
  const currentUserId = useLocalAppStore((state) => state.currentUserId);
  const selectedDate = useLocalAppStore((state) => state.selectedDate);
  const events = useLocalAppStore((state) => state.events);
  const householdTasks = useLocalAppStore((state) => state.householdTasks);
  const shoppingList = useLocalAppStore((state) => state.shoppingList);
  const storeSetLanguage = useLocalAppStore((state) => state.setLanguage);
  const storeSelectDate = useLocalAppStore((state) => state.selectDate);
  const storeAddEvent = useLocalAppStore((state) => state.addEvent);
  const storeAddHouseholdTask = useLocalAppStore((state) => state.addHouseholdTask);
  const storeCompleteTask = useLocalAppStore((state) => state.completeTask);
  const storeReopenTask = useLocalAppStore((state) => state.reopenTask);
  const storeAddShoppingItem = useLocalAppStore((state) => state.addShoppingItem);
  const storePurchaseShoppingItem = useLocalAppStore((state) => state.purchaseShoppingItem);
  const storeUnpurchaseShoppingItem = useLocalAppStore((state) => state.unpurchaseShoppingItem);
  const text = copy[language] as typeof copy.ru;
  const [stage, setStage] = useState<Stage>("onboarding");
  const [authIntent, setAuthIntent] = useState<AuthIntent>("createFamily");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("today");
  const [sheet, setSheet] = useState<AppSheet>(null);
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("all");
  const loginForm = useForm<LoginFormInput>({
    defaultValues: { email: "alex@example.com" },
    mode: "onChange",
    resolver: zodResolver(loginFormSchema)
  });
  const familySetupForm = useForm<FamilySetupFormInput>({
    defaultValues: { familyName: text.defaultFamilyName, userName: text.defaultUserName },
    mode: "onChange",
    resolver: zodResolver(familySetupFormSchema)
  });
  const eventForm = useForm<EventFormInput>({
    defaultValues: { title: "", date: text.formatMonthDay(3), time: "09:00", participants: "both" },
    mode: "onChange",
    resolver: zodResolver(eventFormSchema)
  });
  const taskForm = useForm<TaskFormInput>({
    defaultValues: { title: "", assignee: "alex", due: text.noDue },
    mode: "onChange",
    resolver: zodResolver(taskFormSchema)
  });
  const shoppingForm = useForm<ShoppingFormInput>({
    defaultValues: { title: "", quantity: "", category: text.categoryOther },
    mode: "onChange",
    resolver: zodResolver(shoppingFormSchema)
  });

  const familyValues = familySetupForm.watch();
  const familyName = familyValues.familyName;
  const userName = familyValues.userName;
  const selectedDay = Number(selectedDate.slice(-2));
  const selectedEvents = useMemo(
    () => events.filter((event) => eventDateToISODate(event.date) === selectedDate),
    [events, selectedDate]
  );
  const eventDays = useMemo(
    () => new Set(events.map((event) => eventDateToDay(event.date)).filter((day): day is number => day !== null)),
    [events]
  );
  const selectedDateLabel = formatSelectedDate(selectedDate, text);
  const selectedDateSectionTitle = formatCalendarSectionDate(selectedDate, text);
  const tasks = useMemo(
    () => householdTasks.map((task) => toTaskItem(task, text)),
    [householdTasks, text]
  );
  const shopping = useMemo(
    () => shoppingList.items.map((item) => toShoppingItem(item, shoppingList.categories, language, text)),
    [language, shoppingList.categories, shoppingList.items, text]
  );
  const frequentShopping = shoppingList.frequentItemTitles;
  const activeTasks = useMemo(() => tasks.filter((task) => !task.completed), [tasks]);
  const purchasedCount = shopping.filter((item) => item.purchased).length;
  const pendingShopping = shopping.filter((item) => !item.purchased);
  const loginIsValid = loginForm.formState.isValid;
  const familySetupIsValid = familySetupForm.formState.isValid;
  const eventIsValid = eventForm.formState.isValid;
  const taskIsValid = taskForm.formState.isValid;
  const shoppingIsValid = shoppingForm.formState.isValid;

  useEffect(() => {
    eventForm.setValue("date", text.formatMonthDay(3), { shouldValidate: true });
    taskForm.setValue("due", text.noDue, { shouldValidate: true });
    shoppingForm.setValue("category", text.categoryOther, { shouldValidate: true });
  }, [eventForm, language, shoppingForm, taskForm, text]);

  useEffect(() => {
    void loginForm.trigger();
    void familySetupForm.trigger();
  }, [familySetupForm, loginForm]);

  function completeOnboarding() {
    if (onboardingStep < 2) {
      setOnboardingStep((step) => step + 1);
      return;
    }
    setStage("family");
  }

  function openLogin(intent: AuthIntent) {
    setAuthIntent(intent);
    loginForm.reset({ email: intent === "createFamily" ? "alex@example.com" : "maya@example.com" });
    void loginForm.trigger("email");
    setStage("login");
  }

  function continueLogin() {
    void loginForm.handleSubmit(() => {
      setStage(authIntent === "createFamily" ? "family" : "acceptInvite");
    })();
  }

  function continueFamilySetup() {
    void familySetupForm.handleSubmit(() => {
      setStage("invite");
    })();
  }

  function addEvent() {
    void eventForm.handleSubmit((values) => {
      const participants: PersonId[] = values.participants === "alex" ? ["alex"] : ["alex", "maya"];
      const eventDate = eventDateToISODate(values.date);
      storeAddEvent(
        {
          id: `event-${Date.now()}`,
          title: values.title.trim(),
          date: values.date,
          time: values.time,
          participants,
          reminder: text.thirtyMin
        },
        eventDate
      );
      eventForm.reset({ title: "", date: text.formatMonthDay(3), time: "09:00", participants: "both" });
      setSheet(null);
      setActiveTab("today");
    })();
  }

  function addTask() {
    void taskForm.handleSubmit((values) => {
      storeAddHouseholdTask({
        id: createHouseholdTaskId(),
        familyId,
        title: values.title.trim(),
        assigneeMemberId: values.assignee === "shared" ? null : taskAssigneeToMemberId[values.assignee],
        dueAt: dueLabelToDateTime(values.due, text),
        reminderAt: null,
        createdBy: currentUserId,
        createdAt: nowDateTime()
      });
      taskForm.reset({ title: "", assignee: "alex", due: text.noDue });
      setSheet(null);
      setActiveTab("tasks");
    })();
  }

  function addShoppingItem(title?: string) {
    if (title) {
      const result = shoppingFormSchema.safeParse({ ...shoppingForm.getValues(), title, quantity: "" });

      if (!result.success) {
        void shoppingForm.trigger();
        return;
      }

      submitShoppingItem(result.data);
      return;
    }

    void shoppingForm.handleSubmit(submitShoppingItem)();
  }

  function submitShoppingItem(values: ShoppingFormInput) {
    const nextTitle = values.title.trim();
    storeAddShoppingItem({
      id: createShoppingItemId(nextTitle),
      familyId,
      categoryId: shoppingCategoryLabelToId(values.category, shoppingList.categories),
      title: nextTitle,
      quantity: values.quantity.trim() || null,
      createdBy: currentUserId,
      createdAt: nowDateTime()
    });
    shoppingForm.reset({ title: "", quantity: "", category: text.categoryOther });
    setSheet(null);
    setActiveTab("shopping");
  }

  function participantsLabel(participants: PersonId[]) {
    if (participants.length > 1) {
      return text.both;
    }
    return people[participants[0]].name;
  }

  function assigneeLabel(assignee: TaskItem["assignee"]) {
    if (assignee === "shared") {
      return text.shared;
    }
    return people[assignee].name;
  }

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "done") return task.completed;
    if (taskFilter === "mine") return task.assignee === "alex";
    if (taskFilter === "maya") return task.assignee === "maya";
    if (taskFilter === "shared") return task.assignee === "shared";
    return true;
  });

  if (stage === "onboarding") {
    return (
      <AppShell>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safe}>
          <ScrollView contentContainerStyle={styles.welcomeScreen} showsVerticalScrollIndicator={false}>
            <View style={styles.welcomeGlowLarge} />
            <View style={styles.welcomeGlowSmall} />
            <View style={styles.welcomePlant}>
              <View style={styles.plantStem} />
              <View style={[styles.plantStem, styles.plantStemTwo]} />
              <View style={[styles.plantStem, styles.plantStemThree]} />
            </View>
            <View style={styles.welcomeBrand}>
              <Image source={appIconSource} style={styles.welcomeIcon} resizeMode="cover" />
              <DomaLogo large />
            </View>
            <Text style={styles.welcomeTitle}>{text.tagline}</Text>
            <Text style={styles.welcomeText}>
              {text.welcomeSubtitle}
            </Text>

            <WelcomePreview text={text} />

            <View style={styles.welcomeActions}>
              <PrimaryButton label={text.createFamilyAction} onPress={() => openLogin("createFamily")} arrow />
              <Pressable style={styles.inviteOutlineButton} onPress={() => openLogin("acceptInvite")}>
                <Text style={styles.inviteOutlineText}>{text.haveInvite}</Text>
              </Pressable>
            </View>
            <Text style={styles.legalText}>
              {text.legalText}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </AppShell>
    );
  }

  if (stage === "login") {
    const isInvite = authIntent === "acceptInvite";
    const loginEmailError = fieldValidationMessage(loginForm.formState.errors.email, language);

    return (
      <AppShell>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safe}>
          <ScrollView contentContainerStyle={styles.authScreen} showsVerticalScrollIndicator={false}>
            <View style={styles.authTopBar}>
              <Pressable style={styles.authBackButton} onPress={() => setStage("onboarding")}>
                <Ionicons name="chevron-back" size={22} color={colors.domaBlue} />
              </Pressable>
              <DomaLogo />
              <View style={styles.authBackSpacer} />
            </View>
            <Text style={styles.authTitle}>{text.authLoginTitle}</Text>
            <Text style={styles.authSubtitle}>
              {isInvite ? text.authInviteSubtitle : text.authLoginSubtitle}
            </Text>

            <Card style={styles.authCard}>
              <Text style={styles.fieldLabel}>{text.authEmailLabel}</Text>
              <Controller
                control={loginForm.control}
                name="email"
                render={({ field: { value, onBlur, onChange } }) => (
                  <TextInput
                    style={[styles.authInput, loginEmailError && styles.authInputError]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="alex@example.com"
                    placeholderTextColor={colors.textTertiary}
                  />
                )}
              />
              {loginEmailError ? (
                <Text style={styles.validationText}>{loginEmailError}</Text>
              ) : (
                <Text style={styles.authHelp}>{text.authEmailHelp}</Text>
              )}
            </Card>

            <PrimaryButton label={text.authContinue} onPress={continueLogin} disabled={!loginIsValid} arrow />

            <View style={styles.socialBlock}>
              <Text style={styles.socialDivider}>{text.authOr}</Text>
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color={colors.textPrimary} />
                <Text style={styles.socialButtonText}>{text.authApple}</Text>
              </Pressable>
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color={colors.textPrimary} />
                <Text style={styles.socialButtonText}>{text.authGoogle}</Text>
              </Pressable>
            </View>

            <Text style={styles.legalText}>
              {text.legalText}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </AppShell>
    );
  }

  if (stage === "family") {
    const familyNameError = fieldValidationMessage(familySetupForm.formState.errors.familyName, language);
    const userNameError = fieldValidationMessage(familySetupForm.formState.errors.userName, language);

    return (
      <AppShell>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safe}>
          <ScrollView contentContainerStyle={styles.setupScreen}>
            <Text style={styles.wordmarkSmall}>Doma</Text>
            <Text style={styles.screenTitle}>{text.familySetupTitle}</Text>
            <Text style={styles.setupCopy}>{text.familySetupCopy}</Text>
            <Controller
              control={familySetupForm.control}
              name="familyName"
              render={({ field: { value, onChange } }) => (
                <Input
                  label={text.familyNameLabel}
                  value={value}
                  onChangeText={onChange}
                  error={familyNameError}
                />
              )}
            />
            <Controller
              control={familySetupForm.control}
              name="userName"
              render={({ field: { value, onChange } }) => (
                <Input
                  label={text.userNameLabel}
                  value={value}
                  onChangeText={onChange}
                  error={userNameError}
                />
              )}
            />
            <Pressable style={styles.photoButton}>
              <Ionicons name="camera-outline" size={20} color={colors.domaBlue} />
              <Text style={styles.photoButtonText}>{text.addPhoto}</Text>
            </Pressable>
            <PrimaryButton label={text.createFamily} onPress={continueFamilySetup} disabled={!familySetupIsValid} />
          </ScrollView>
        </SafeAreaView>
      </AppShell>
    );
  }

  if (stage === "invite") {
    return (
      <AppShell>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safe}>
          <View style={styles.inviteScreen}>
            <AvatarStack />
            <Text style={styles.screenTitle}>{text.invitePartner}</Text>
            <Text style={styles.setupCopy}>{text.inviteCopy}</Text>
            <View style={styles.inviteCard}>
              <Ionicons name="link-outline" size={24} color={colors.domaGold} />
              <Text style={styles.inviteLink}>doma.app/invite/alex-maya</Text>
            </View>
            <PrimaryButton label={text.shareLink} onPress={() => setStage("app")} />
            <SecondaryButton label={text.later} onPress={() => setStage("app")} />
          </View>
        </SafeAreaView>
      </AppShell>
    );
  }

  if (stage === "acceptInvite") {
    return (
      <AppShell>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safe}>
          <View style={styles.inviteScreen}>
            <View style={styles.acceptInviteMark}>
              <Avatar person="alex" size={72} />
              <View style={styles.acceptInvitePlus}>
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </View>
              <Avatar person="maya" size={72} />
            </View>
            <Text style={styles.screenTitle}>{text.acceptInviteTitle}</Text>
            <Text style={styles.setupCopy}>{text.acceptInviteCopy}</Text>
            <Card style={styles.invitePreviewCard}>
              <View style={styles.invitePreviewRow}>
                <Ionicons name="home-outline" size={22} color={colors.domaGold} />
                <View style={styles.rowGrow}>
                  <Text style={styles.cardTitle}>{familyName}</Text>
                  <Text style={styles.caption}>{text.acceptInviteFamilyMeta}</Text>
                </View>
                <Ionicons name="checkmark-circle" size={22} color={colors.shoppingGreen} />
              </View>
            </Card>
            <PrimaryButton label={text.acceptInviteJoin} onPress={() => setStage("app")} />
            <SecondaryButton label={text.acceptInviteSwitchAccount} onPress={() => openLogin("acceptInvite")} />
          </View>
        </SafeAreaView>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.app}>
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Header
              tab={activeTab}
              greetingTitle={text.todayGreeting}
              title={activeTab === "today" ? text.brand : text.tabs[activeTab]}
              todayDateLabel={selectedDateLabel}
              subtitle={
                activeTab === "tasks"
                  ? text.tasksSubtitle
                  : activeTab === "shopping"
                    ? text.shoppingSubtitle
                    : activeTab === "calendar"
                      ? text.calendarSubtitle
                      : text.morning
              }
              onFamily={() => setSheet("family")}
              onSettings={() => setSheet("settings")}
              onAdd={() => setSheet("quick")}
            />
            {activeTab === "today" && (
              <TodayScreen
                text={text}
                selectedEvents={selectedEvents}
                activeTasks={activeTasks}
                pendingShopping={pendingShopping}
                purchasedCount={purchasedCount}
                participantsLabel={participantsLabel}
                assigneeLabel={assigneeLabel}
                onOpenQuickAdd={() => setSheet("quick")}
                onOpenCalendar={() => setActiveTab("calendar")}
                onOpenTasks={() => setActiveTab("tasks")}
                onOpenShopping={() => setActiveTab("shopping")}
                onToggleTask={toggleTask}
              />
            )}
            {activeTab === "calendar" && (
              <CalendarScreen
                text={text}
                selectedDateTitle={selectedDateSectionTitle}
                selectedDay={selectedDay}
                selectedEvents={selectedEvents}
                eventDays={eventDays}
                participantsLabel={participantsLabel}
                onSelectDay={selectCalendarDay}
                onAddEvent={() => setSheet("event")}
              />
            )}
            {activeTab === "tasks" && (
              <TasksScreen
                text={text}
                tasks={tasks}
                filter={taskFilter}
                filteredTasks={filteredTasks}
                assigneeLabel={assigneeLabel}
                onChangeFilter={setTaskFilter}
                onOpenTaskSheet={() => setSheet("task")}
                onToggleTask={toggleTask}
              />
            )}
            {activeTab === "shopping" && (
              <ShoppingScreen
                text={text}
                shopping={shopping}
                categories={shoppingList.categories}
                language={language}
                frequentShopping={frequentShopping}
                categoryName={shoppingCategoryName}
                onOpenShoppingSheet={() => setSheet("shopping")}
                onAddFrequentItem={addShoppingItem}
                onToggleShoppingItem={toggleShopping}
              />
            )}
          </ScrollView>
          <TabBar activeTab={activeTab} onChange={setActiveTab} labels={text.tabs} />
        </View>
      </SafeAreaView>
      <BottomSheet visible={sheet !== null} onClose={() => setSheet(null)}>
        {sheet === "quick" && <QuickAddSheet text={text} onSelectSheet={setSheet} />}
        {sheet === "event" && (
          <EventFormSheet
            form={eventForm}
            language={language}
            text={text}
            isValid={eventIsValid}
            onCancel={() => setSheet(null)}
            onSubmit={addEvent}
          />
        )}
        {sheet === "task" && (
          <TaskFormSheet form={taskForm} language={language} text={text} isValid={taskIsValid} onSubmit={addTask} />
        )}
        {sheet === "shopping" && (
          <ShoppingFormSheet
            form={shoppingForm}
            language={language}
            text={text}
            isValid={shoppingIsValid}
            onSubmit={() => addShoppingItem()}
          />
        )}
        {sheet === "family" && <FamilySheet text={text} userName={userName} onShareLink={() => setSheet(null)} />}
        {sheet === "settings" && (
          <SettingsSheet language={language} text={text} onChangeLanguage={storeSetLanguage} />
        )}
      </BottomSheet>
    </AppShell>
  );

  function toggleTask(id: string) {
    const task = householdTasks.find((item) => item.id === id);

    if (task?.status === "completed") {
      storeReopenTask({
        taskId: id as HouseholdTaskId,
        updatedBy: currentUserId,
        updatedAt: nowDateTime()
      });
      return;
    }

    storeCompleteTask({
      taskId: id as HouseholdTaskId,
      completedBy: currentUserId,
      completedAt: nowDateTime()
    });
  }

  function toggleShopping(id: string) {
    const item = shoppingList.items.find((shoppingItem) => shoppingItem.id === id);

    if (item?.status === "purchased") {
      storeUnpurchaseShoppingItem({
        itemId: id as ShoppingItemId,
        updatedBy: currentUserId,
        updatedAt: nowDateTime()
      });
      return;
    }

    storePurchaseShoppingItem({
      itemId: id as ShoppingItemId,
      purchasedBy: currentUserId,
      purchasedAt: nowDateTime()
    });
  }

  function selectCalendarDay(day: number) {
    storeSelectDate(juneDate(day));
  }
}

function WelcomePreview({ text }: { text: typeof copy.ru }) {
  return (
    <View style={styles.previewShell}>
      <View style={styles.previewCard}>
        <View style={styles.previewRowHeader}>
          <View style={[styles.previewIconCircle, { backgroundColor: "rgba(73,159,199,0.18)" }]}>
            <Ionicons name="calendar-outline" size={20} color={colors.domaBlue} />
          </View>
          <Text style={styles.previewSectionTitle}>{text.preview.today}</Text>
          <View style={styles.previewPill}>
            <Text style={styles.previewPillText}>{text.preview.allEvents}</Text>
          </View>
        </View>
        <View style={styles.previewLine} />
        <View style={styles.previewItemRow}>
          <Text style={styles.previewTime}>09:00</Text>
          <View style={styles.previewBlueRule} />
          <View style={styles.rowGrow}>
            <Text style={styles.previewItemTitle}>Врач</Text>
            <Text style={styles.caption}>Клиника на Сенной</Text>
          </View>
          <AvatarGroup participants={["alex", "maya"]} small />
        </View>
      </View>

      <View style={styles.previewCard}>
        <View style={styles.previewRowHeader}>
          <View style={[styles.previewIconCircle, { backgroundColor: "rgba(239,138,31,0.16)" }]}>
            <Ionicons name="checkmark-circle" size={20} color={colors.taskOrange} />
          </View>
          <Text style={styles.previewSectionTitle}>{text.preview.tasks}</Text>
          <View style={styles.previewPill}>
            <Text style={styles.previewPillText}>{text.preview.allTasks}</Text>
          </View>
        </View>
        <View style={styles.previewLine} />
        <View style={styles.previewItemRow}>
          <View style={styles.previewCheckbox} />
          <View style={styles.rowGrow}>
            <Text style={styles.previewItemTitle}>Позвонить мастеру</Text>
            <Text style={styles.caption}>Сегодня, до 18:00</Text>
          </View>
          <Avatar person="alex" size={36} />
        </View>
      </View>

      <View style={styles.previewCard}>
        <View style={styles.previewRowHeader}>
          <View style={[styles.previewIconCircle, { backgroundColor: "rgba(95,150,105,0.16)" }]}>
            <Ionicons name="bag-outline" size={20} color={colors.shoppingGreen} />
          </View>
          <Text style={styles.previewSectionTitle}>{text.preview.shopping}</Text>
          <View style={styles.previewPill}>
            <Text style={styles.previewPillText}>{text.preview.list}</Text>
          </View>
        </View>
        <View style={styles.previewShoppingRow}>
          <View>
            <Text style={styles.previewShoppingTitle}>Молоко, хлеб, яйца, бананы</Text>
            <Text style={styles.caption}>{text.preview.itemCount}</Text>
          </View>
          <View style={styles.previewBasket}>
            <Ionicons name="basket-outline" size={34} color={colors.shoppingGreen} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  app: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 132,
    paddingTop: 0
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 12.5,
    lineHeight: 17
  },
  rowGrow: {
    flex: 1
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800"
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 12.5,
    fontWeight: "800",
    marginBottom: 7
  },
  welcomeScreen: {
    minHeight: Platform.OS === "web" ? 850 : undefined,
    paddingHorizontal: 34,
    paddingTop: 52,
    paddingBottom: 42,
    alignItems: "center",
    overflow: "hidden"
  },
  welcomeGlowLarge: {
    position: "absolute",
    right: -92,
    top: 276,
    width: 220,
    height: 360,
    borderRadius: 120,
    backgroundColor: "rgba(245,210,166,0.34)"
  },
  welcomeGlowSmall: {
    position: "absolute",
    left: -90,
    bottom: 212,
    width: 185,
    height: 245,
    borderRadius: 92,
    backgroundColor: "rgba(255,255,255,0.52)"
  },
  welcomePlant: {
    position: "absolute",
    left: 8,
    bottom: 250,
    width: 62,
    height: 180,
    opacity: 0.48
  },
  plantStem: {
    position: "absolute",
    bottom: 0,
    left: 24,
    width: 2,
    height: 164,
    borderRadius: 2,
    backgroundColor: colors.familySand,
    transform: [{ rotate: "-14deg" }]
  },
  plantStemTwo: {
    left: 36,
    height: 146,
    transform: [{ rotate: "10deg" }]
  },
  plantStemThree: {
    left: 16,
    height: 120,
    transform: [{ rotate: "-4deg" }]
  },
  welcomeBrand: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8
  },
  welcomeIcon: {
    width: 96,
    height: 96,
    borderRadius: 24,
    marginBottom: 10,
    shadowColor: "#372614",
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 13 }
  },
  welcomeTitle: {
    color: colors.textPrimary,
    fontSize: 31,
    lineHeight: 38,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 18,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  welcomeText: {
    color: colors.textSecondary,
    fontSize: 22,
    lineHeight: 32,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 34
  },
  previewShell: {
    width: "100%",
    borderRadius: 32,
    padding: 14,
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.56)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.86)",
    shadowColor: "#372614",
    shadowOpacity: 0.12,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 16 }
  },
  previewCard: {
    borderRadius: 24,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.74)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.82)"
  },
  previewRowHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  previewIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center"
  },
  previewSectionTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 23,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  previewPill: {
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: "rgba(214,154,69,0.10)"
  },
  previewPillText: {
    color: "#C87F11",
    fontSize: 13,
    fontWeight: "700"
  },
  previewLine: {
    height: 1,
    marginVertical: 11,
    backgroundColor: "rgba(232,222,210,0.72)"
  },
  previewItemRow: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  previewTime: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "500"
  },
  previewBlueRule: {
    width: 3,
    height: 48,
    borderRadius: 3,
    backgroundColor: "#9FD5EE"
  },
  previewItemTitle: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: "700"
  },
  previewCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.domaGold
  },
  previewShoppingRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  previewShoppingTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "600"
  },
  previewBasket: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(95,150,105,0.11)"
  },
  welcomeActions: {
    width: "100%",
    gap: 18,
    marginTop: 34
  },
  inviteOutlineButton: {
    height: 76,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.domaGold,
    backgroundColor: "rgba(255,255,255,0.42)"
  },
  inviteOutlineText: {
    color: colors.domaGold,
    fontSize: 21,
    fontWeight: "700"
  },
  legalText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 24
  },
  wordmarkSmall: {
    color: colors.domaBlue,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 18
  },
  setupScreen: {
    padding: spacing.screen,
    paddingTop: 34
  },
  screenTitle: {
    color: colors.textPrimary,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginBottom: 10
  },
  setupCopy: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 22
  },
  photoButton: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    backgroundColor: colors.surfaceWarm,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 16
  },
  photoButtonText: {
    color: colors.domaBlue,
    fontSize: 15,
    fontWeight: "800"
  },
  inviteScreen: {
    flex: 1,
    padding: spacing.screen,
    justifyContent: "center"
  },
  authScreen: {
    minHeight: Platform.OS === "web" ? 760 : undefined,
    paddingHorizontal: spacing.screen,
    paddingTop: 34,
    paddingBottom: 38
  },
  authTopBar: {
    minHeight: 58,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  authBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.86)"
  },
  authBackSpacer: {
    width: 48
  },
  authTitle: {
    color: colors.domaBlue,
    fontSize: 45,
    lineHeight: 53,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" }),
    marginBottom: 14
  },
  authSubtitle: {
    color: colors.textSecondary,
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 22
  },
  authCard: {
    padding: 18,
    borderRadius: 26,
    marginBottom: 14
  },
  authInput: {
    height: 58,
    borderRadius: 16,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    paddingHorizontal: 14,
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "700"
  },
  authInputError: {
    borderColor: colors.dangerRed
  },
  validationText: {
    color: colors.dangerRed,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 9
  },
  authHelp: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 10
  },
  socialBlock: {
    marginTop: 18,
    gap: 10
  },
  socialDivider: {
    color: colors.textTertiary,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 2
  },
  socialButton: {
    height: 54,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.66)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.86)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  socialButtonText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800"
  },
  inviteCard: {
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 16
  },
  inviteLink: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800"
  },
  acceptInviteMark: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28
  },
  acceptInvitePlus: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.domaGold,
    marginHorizontal: -8,
    zIndex: 2,
    borderWidth: 3,
    borderColor: colors.warmBackground
  },
  invitePreviewCard: {
    padding: 16,
    marginBottom: 18
  },
  invitePreviewRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
});

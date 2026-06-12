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

import { CalendarEventCard, CalendarMonth, EventCard } from "./src/components/calendar";
import { Avatar, AvatarGroup, AvatarStack } from "./src/components/family";
import { AppShell, BottomSheet, Header, TabBar } from "./src/components/layout";
import { ShoppingCategorySection } from "./src/components/shopping";
import { TaskRow } from "./src/components/tasks";
import {
  Card,
  Chip,
  DomaLogo,
  Input,
  PrimaryButton,
  SecondaryButton,
  SectionHeader,
  Segment,
  SheetTitle,
  type IconName
} from "./src/components/ui";
import { people } from "./src/data";
import { copy } from "./src/i18n";
import { useLocalAppStore } from "./src/store/localAppStore";
import { colors, spacing } from "./src/theme";
import {
  HouseholdTask,
  HouseholdTaskId,
  ISODateString,
  ISODateTimeString,
  Language,
  PersonId,
  ShoppingCategory,
  ShoppingCategoryId,
  ShoppingItem,
  ShoppingItemId,
  ShoppingListItem,
  TabKey,
  TaskItem
} from "./src/types";
import {
  eventFormSchema,
  familySetupFormSchema,
  isFormValidationErrorCode,
  loginFormSchema,
  shoppingFormSchema,
  taskFormSchema
} from "./src/validation/forms";
import type {
  EventFormInput,
  FamilySetupFormInput,
  FormValidationErrorCode,
  LoginFormInput,
  ShoppingFormInput,
  TaskFormInput
} from "./src/validation/forms";

type Stage = "onboarding" | "login" | "family" | "invite" | "acceptInvite" | "app";
type AuthIntent = "createFamily" | "acceptInvite";
type Sheet = "quick" | "event" | "task" | "shopping" | "family" | "settings" | null;

const appIconSource = require("./assets/app-icon.png");

const frequentVisuals: Record<string, { icon: IconName; tint: string }> = {
  Молоко: { icon: "water-outline", tint: "rgba(176,210,226,0.45)" },
  Хлеб: { icon: "restaurant-outline", tint: "rgba(214,154,69,0.15)" },
  Яйца: { icon: "ellipse-outline", tint: "rgba(215,185,139,0.18)" },
  Бананы: { icon: "leaf-outline", tint: "rgba(230,183,67,0.16)" },
  Кофе: { icon: "cafe-outline", tint: "rgba(143,102,61,0.14)" }
};

const taskAssigneeToMemberId: Record<PersonId, HouseholdTask["assigneeMemberId"]> = {
  alex: "member-alex",
  maya: "member-maya"
};

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
  const [sheet, setSheet] = useState<Sheet>(null);
  const [taskFilter, setTaskFilter] = useState<"all" | "mine" | "maya" | "shared" | "done">("all");
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
  const eventValues = eventForm.watch();
  const familyName = familyValues.familyName;
  const userName = familyValues.userName;
  const selectedDay = Number(selectedDate.slice(-2));
  const selectedEvents = useMemo(
    () => events.filter((event) => eventDateToISODate(event.date) === selectedDate),
    [events, selectedDate]
  );
  const selectedDateLabel = formatSelectedDate(selectedDate, text);
  const tasks = useMemo(
    () => householdTasks.map((task) => toTaskItem(task, text, language)),
    [householdTasks, language, text]
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
            {activeTab === "today" && renderToday()}
            {activeTab === "calendar" && renderCalendar()}
            {activeTab === "tasks" && renderTasks()}
            {activeTab === "shopping" && renderShopping()}
          </ScrollView>
          <TabBar activeTab={activeTab} onChange={setActiveTab} labels={text.tabs} />
        </View>
      </SafeAreaView>
      <BottomSheet visible={sheet !== null} onClose={() => setSheet(null)}>
        {sheet === "quick" && renderQuickAdd()}
        {sheet === "event" && renderEventForm()}
        {sheet === "task" && renderTaskForm()}
        {sheet === "shopping" && renderShoppingForm()}
        {sheet === "family" && renderFamilySheet()}
        {sheet === "settings" && renderSettingsSheet()}
      </BottomSheet>
    </AppShell>
  );

  function renderToday() {
    const remainingShopping = Math.max(pendingShopping.length - 3, 0);
    const shoppingCaption =
      remainingShopping > 0
        ? text.shoppingSummaryMore(remainingShopping, purchasedCount)
        : text.shoppingSummaryBought(purchasedCount);

    return (
      <View>
        <Card style={styles.syncCard}>
          <View style={styles.syncPeople}>
            <View style={styles.syncPerson}>
              <Avatar person="alex" size={58} />
              <Text style={styles.syncName}>{people.alex.name}</Text>
            </View>
            <View style={styles.syncPerson}>
              <Avatar person="maya" size={58} />
              <Text style={styles.syncName}>{people.maya.name}</Text>
            </View>
          </View>
          <View style={styles.syncDivider} />
          <View style={styles.syncState}>
            <View style={styles.syncCheck}>
              <Ionicons name="checkmark" size={28} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.syncTitle}>{text.synced}</Text>
              <Text style={styles.caption}>{text.syncedAgo}</Text>
            </View>
          </View>
        </Card>
        <Pressable style={styles.inlineFab} onPress={() => setSheet("quick")} accessibilityRole="button" accessibilityLabel={text.add}>
          <Ionicons name="add" size={32} color="#FFFFFF" />
        </Pressable>

        <SectionHeader title={text.upcoming} action={text.seeAll} onPress={() => setActiveTab("calendar")} />
        <Card style={styles.groupCard}>
          {selectedEvents.length > 0 ? (
            selectedEvents.slice(0, 3).map((event, index) => (
              <EventCard key={event.id} event={event} participantsLabel={participantsLabel(event.participants)} index={index} grouped />
            ))
          ) : (
            <Text style={styles.caption}>{text.emptyToday}</Text>
          )}
        </Card>

        <SectionHeader title={text.tasks} action={text.seeAll} onPress={() => setActiveTab("tasks")} />
        <Card style={styles.groupCard}>
          {activeTasks.slice(0, 2).map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              assignee={assigneeLabel(task.assignee)}
              completedLabel={text.completedToday}
              noReminderLabel={text.noReminder}
              onToggle={() => toggleTask(task.id)}
              grouped
            />
          ))}
        </Card>

        <SectionHeader title={text.shopping} action={text.seeAll} onPress={() => setActiveTab("shopping")} />
        <Pressable style={styles.shoppingSummary} onPress={() => setActiveTab("shopping")}>
          <View style={styles.shoppingIcon}>
            <Ionicons name="bag-handle-outline" size={34} color={colors.shoppingGreen} />
          </View>
          <View style={styles.shoppingSummaryText}>
            <Text style={styles.shoppingSummaryTitle}>{pendingShopping.slice(0, 3).map((item) => item.title.toLowerCase()).join(", ")}</Text>
            <Text style={styles.shoppingSummaryCaption}>{shoppingCaption}</Text>
          </View>
          <View style={styles.shoppingCount}>
            <Text style={styles.shoppingCountText}>{pendingShopping.length}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
        </Pressable>

        <Card style={styles.widgetPreview}>
          <View style={styles.widgetHeader}>
            <Text style={styles.widgetBrand}>Doma</Text>
            <Text style={styles.caption}>{text.tabs.today}</Text>
          </View>
          {selectedEvents.slice(0, 3).map((event) => (
            <View key={`widget-${event.id}`} style={styles.widgetRow}>
              <Text style={styles.widgetTime}>{event.time}</Text>
              <Text style={styles.widgetTitle}>{event.title}</Text>
            </View>
          ))}
          <Text style={styles.widgetFooter}>{text.widgetLine}</Text>
        </Card>
      </View>
    );
  }

  function renderCalendar() {
    const days = Array.from({ length: 30 }, (_, index) => index + 1);
    const weekDays = text.weekDays;
    const eventDays = new Set(events.map((event) => eventDateToDay(event.date)).filter((day) => day !== null));
    return (
      <View>
        <CalendarMonth
          title={text.monthJune2026}
          days={days}
          weekDays={weekDays}
          selectedDay={selectedDay}
          todayDay={3}
          eventDays={eventDays}
          onSelectDay={selectCalendarDay}
        />
        <SectionHeader title={formatCalendarSectionDate(selectedDate, text)} action={text.add} onPress={() => setSheet("event")} />
        {selectedEvents.length > 0 ? (
          selectedEvents.map((event, index) => <CalendarEventCard key={`cal-${event.id}`} event={event} participantsLabel={participantsLabel(event.participants)} index={index} />)
        ) : (
          <EmptyState title={text.emptyToday} description={text.emptyTodayHint} />
        )}
      </View>
    );
  }

  function renderTasks() {
    const todayLabel = text.taskToday;
    const todayTasks = tasks.filter((task) => !task.completed && task.due === todayLabel);
    const weekTasks = tasks.filter((task) => !task.completed && task.due !== todayLabel && task.due !== text.noDue);
    const noDueTasks = tasks.filter((task) => !task.completed && task.due === text.noDue);
    const doneTasks = tasks.filter((task) => task.completed);
    const groups = [
      { title: text.taskToday, items: todayTasks },
      { title: text.taskWeek, items: weekTasks },
      { title: text.taskNoDue, items: noDueTasks },
      { title: text.done, items: doneTasks }
    ].filter((group) => group.items.length > 0);

    return (
      <View>
        <View style={styles.chipRow}>
          <Chip label={text.all} active={taskFilter === "all"} onPress={() => setTaskFilter("all")} />
          <Chip label={text.mine} active={taskFilter === "mine"} onPress={() => setTaskFilter("mine")} />
          <Chip label={text.taskMaya} active={taskFilter === "maya"} onPress={() => setTaskFilter("maya")} />
          <Chip label={text.shared} active={taskFilter === "shared"} onPress={() => setTaskFilter("shared")} />
          <Chip label={text.done} active={taskFilter === "done"} onPress={() => setTaskFilter("done")} />
        </View>
        {taskFilter === "all" ? (
          groups.map((group) => (
            <View key={group.title}>
              <SectionHeader title={group.title} action={`${group.items.length}`} />
              <Card style={styles.groupCard}>
                {group.items.map((task) => (
                  <TaskRow
                    key={`tasks-${task.id}`}
                    task={task}
                    assignee={assigneeLabel(task.assignee)}
                    completedLabel={text.completedToday}
                    noReminderLabel={text.noReminder}
                    onToggle={() => toggleTask(task.id)}
                    grouped
                  />
                ))}
              </Card>
            </View>
          ))
        ) : (
          <Card style={styles.groupCard}>
            {filteredTasks.map((task) => (
              <TaskRow
                key={`tasks-${task.id}`}
                task={task}
                assignee={assigneeLabel(task.assignee)}
                completedLabel={text.completedToday}
                noReminderLabel={text.noReminder}
                onToggle={() => toggleTask(task.id)}
                grouped
              />
            ))}
          </Card>
        )}
        <Pressable style={styles.newTaskCard} onPress={() => setSheet("task")}>
          <View style={styles.newTaskIcon}>
            <Ionicons name="add" size={34} color={colors.domaGold} />
          </View>
          <View style={styles.rowGrow}>
            <Text style={styles.cardTitle}>{text.newTask}</Text>
            <Text style={styles.caption}>{text.newTaskHint}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
        </Pressable>
      </View>
    );
  }

  function renderShopping() {
    const sortedShopping = [...shopping].sort((a, b) => Number(a.purchased) - Number(b.purchased));
    const categoryOrder: ShoppingCategoryId[] = ["cat-dairy", "cat-fruit-veg", "cat-home", "cat-meat-fish", "cat-other"];
    const groupedShopping = categoryOrder
      .map((categoryId) => ({
        categoryId,
        category: shoppingCategoryName(categoryId, shoppingList.categories, language, text),
        items: sortedShopping.filter((item) => item.categoryId === categoryId)
      }))
      .filter((group) => group.items.length > 0);
    return (
      <View>
        <Pressable style={styles.addField} onPress={() => setSheet("shopping")}>
          <View style={styles.addFieldIcon}>
            <Ionicons name="add" size={26} color={colors.domaGold} />
          </View>
          <Text style={styles.addFieldText}>{text.shoppingAddItem}</Text>
        </Pressable>
        <Card style={styles.frequentCard}>
          <Text style={styles.shoppingSectionTitle}>{text.shoppingFrequent}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.frequentTiles}>
            {frequentShopping.map((item) => {
              const visual = frequentVisuals[item] ?? frequentVisuals["Молоко"];
              return (
                <Pressable key={item} style={styles.frequentTile} onPress={() => addShoppingItem(item)}>
                  <View style={[styles.frequentImage, { backgroundColor: visual.tint }]}>
                    <Ionicons name={visual.icon} size={34} color={colors.domaBlue} />
                  </View>
                  <Text style={styles.frequentLabel}>{item}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </Card>
        {groupedShopping.map((group) => (
          <ShoppingCategorySection key={group.categoryId} categoryId={group.categoryId} category={group.category} items={group.items} onToggleItem={toggleShopping} />
        ))}
        <Pressable style={styles.quickShoppingHelp} onPress={() => setSheet("shopping")}>
          <View style={styles.previewBasket}>
            <Ionicons name="basket-outline" size={34} color={colors.domaGold} />
          </View>
          <View style={styles.rowGrow}>
            <Text style={styles.cardTitle}>{text.shoppingQuickTitle}</Text>
            <Text style={styles.caption}>{text.shoppingQuickHint}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
        </Pressable>
      </View>
    );
  }

  function renderQuickAdd() {
    const options: Array<{ label: string; icon: IconName; color: string; next: Sheet }> = [
      { label: text.event, icon: "calendar-outline", color: colors.domaBlue, next: "event" },
      { label: text.task, icon: "checkmark-circle-outline", color: colors.taskOrange, next: "task" },
      { label: text.item, icon: "bag-outline", color: colors.shoppingGreen, next: "shopping" },
      { label: text.reminder, icon: "notifications-outline", color: colors.familySand, next: "event" }
    ];
    return (
      <View>
        <SheetTitle title={text.quickAddTitle} />
        {options.map((option) => (
          <Pressable key={option.label} style={styles.sheetOption} onPress={() => setSheet(option.next)}>
            <View style={[styles.sheetOptionIcon, { backgroundColor: `${option.color}18` }]}>
              <Ionicons name={option.icon} size={22} color={option.color} />
            </View>
            <Text style={styles.sheetOptionText}>{option.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
          </Pressable>
        ))}
      </View>
    );
  }

  function renderEventForm() {
    const eventErrorMessage =
      fieldValidationMessage(eventForm.formState.errors.title, language) ??
      fieldValidationMessage(eventForm.formState.errors.date, language) ??
      fieldValidationMessage(eventForm.formState.errors.time, language) ??
      fieldValidationMessage(eventForm.formState.errors.participants, language);

    return (
      <View>
        <View style={styles.eventSheetBrand}>
          <SecondaryButton label={text.cancel} onPress={() => setSheet(null)} />
          <DomaLogo />
          <View style={styles.eventSheetSpacer} />
        </View>
        <Text style={styles.eventSheetTitle}>{text.newEvent}</Text>
        <Card style={styles.eventFormCard}>
          <EventFormRow icon="pencil-outline" color={colors.domaGold} label={text.title}>
            <Controller
              control={eventForm.control}
              name="title"
              render={({ field: { value, onBlur, onChange } }) => (
                <TextInput
                  style={styles.eventFormValueInput}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={text.eventTitlePlaceholder}
                  placeholderTextColor={colors.domaBlue}
                  autoFocus
                />
              )}
            />
          </EventFormRow>
          <EventFormRow icon="calendar-outline" color={colors.domaBlue} label={text.date} value={eventValues.date} chevron />
          <EventFormRow icon="time-outline" color={colors.taskOrange} label={text.time} value={eventValues.time} chevron />
          <EventFormRow icon="people-outline" color={colors.domaBlue} label={text.participants} chevron>
            <View style={styles.eventParticipantsValue}>
              <AvatarGroup participants={eventValues.participants === "both" ? ["alex", "maya"] : ["alex"]} small />
              <Text style={styles.eventFormValue}>{eventValues.participants === "both" ? text.both : people.alex.name}</Text>
            </View>
          </EventFormRow>
          <EventFormRow icon="notifications-outline" color={colors.domaGold} label={text.reminder} value={text.thirtyMin} chevron />
          <EventFormRow icon="repeat-outline" color={colors.domaBlue} label={text.repeat} value={text.noRepeat} chevron last />
        </Card>
        {eventErrorMessage !== null && <Text style={styles.formError}>{eventErrorMessage}</Text>}
        <Card style={styles.eventCommentCard}>
          <EventFormRow icon="chatbubble-outline" color={colors.domaBlue} label={text.comment} value={text.addComment} last />
        </Card>
        <PrimaryButton label={text.save} onPress={addEvent} disabled={!eventIsValid} />
      </View>
    );
  }

  function renderTaskForm() {
    const taskTitleError = fieldValidationMessage(taskForm.formState.errors.title, language);
    const taskAssigneeError = fieldValidationMessage(taskForm.formState.errors.assignee, language);
    const taskDueError = fieldValidationMessage(taskForm.formState.errors.due, language);

    return (
      <View>
        <SheetTitle title={text.newTask} />
        <Controller
          control={taskForm.control}
          name="title"
          render={({ field: { value, onChange } }) => (
            <Input label={text.title} value={value} onChangeText={onChange} error={taskTitleError} autoFocus />
          )}
        />
        <Text style={styles.fieldLabel}>{text.assignee}</Text>
        <Controller
          control={taskForm.control}
          name="assignee"
          render={({ field: { value, onChange } }) => (
            <View style={styles.segment}>
              <Segment label={people.alex.name} active={value === "alex"} onPress={() => onChange("alex")} />
              <Segment label={people.maya.name} active={value === "maya"} onPress={() => onChange("maya")} />
              <Segment label={text.shared} active={value === "shared"} onPress={() => onChange("shared")} />
            </View>
          )}
        />
        {taskAssigneeError ? <Text style={styles.formError}>{taskAssigneeError}</Text> : null}
        <Controller
          control={taskForm.control}
          name="due"
          render={({ field: { value, onChange } }) => (
            <Input label={text.due} value={value} onChangeText={onChange} error={taskDueError} />
          )}
        />
        <PrimaryButton label={text.save} onPress={addTask} disabled={!taskIsValid} />
      </View>
    );
  }

  function renderShoppingForm() {
    const shoppingTitleError = fieldValidationMessage(shoppingForm.formState.errors.title, language);
    const shoppingQuantityError = fieldValidationMessage(shoppingForm.formState.errors.quantity, language);
    const shoppingCategoryError = fieldValidationMessage(shoppingForm.formState.errors.category, language);

    return (
      <View>
        <SheetTitle title={text.newShopping} />
        <Controller
          control={shoppingForm.control}
          name="title"
          render={({ field: { value, onChange } }) => (
            <Input label={text.title} value={value} onChangeText={onChange} error={shoppingTitleError} autoFocus />
          )}
        />
        <View style={styles.formRow}>
          <Controller
            control={shoppingForm.control}
            name="quantity"
            render={({ field: { value, onChange } }) => (
              <Input
                compact
                label={text.quantity}
                value={value}
                onChangeText={onChange}
                error={shoppingQuantityError}
              />
            )}
          />
          <Controller
            control={shoppingForm.control}
            name="category"
            render={({ field: { value, onChange } }) => (
              <Input
                compact
                label={text.category}
                value={value}
                onChangeText={onChange}
                error={shoppingCategoryError}
              />
            )}
          />
        </View>
        <PrimaryButton label={text.add} onPress={() => addShoppingItem()} disabled={!shoppingIsValid} />
      </View>
    );
  }

  function renderFamilySheet() {
    return (
      <View>
        <SheetTitle title={text.family} />
        <Card style={styles.memberCard}>
          <Avatar person="alex" size={44} />
          <View style={styles.rowGrow}>
            <Text style={styles.cardTitle}>{userName}</Text>
            <Text style={styles.caption}>{text.ownerDevice}</Text>
          </View>
        </Card>
        <Card style={styles.memberCard}>
          <Avatar person="maya" size={44} />
          <View style={styles.rowGrow}>
            <Text style={styles.cardTitle}>{people.maya.name}</Text>
            <Text style={styles.caption}>{text.connectedDevice}</Text>
          </View>
          <Ionicons name="checkmark-circle" size={20} color={colors.shoppingGreen} />
        </Card>
        <SecondaryButton label={text.shareLink} onPress={() => setSheet(null)} />
      </View>
    );
  }

  function renderSettingsSheet() {
    return (
      <View>
        <SheetTitle title={text.settings} />
        <Text style={styles.fieldLabel}>{text.language}</Text>
        <View style={styles.segment}>
          <Segment label={text.languageRussian} active={language === "ru"} onPress={() => storeSetLanguage("ru")} />
          <Segment label={text.languagePolish} active={language === "pl"} onPress={() => storeSetLanguage("pl")} />
        </View>
        <Card style={styles.offlineCard}>
          <Ionicons name="cloud-offline-outline" size={22} color={colors.domaBlue} />
          <View style={styles.rowGrow}>
            <Text style={styles.cardTitle}>{text.offline}</Text>
            <Text style={styles.caption}>{text.offlineHint}</Text>
          </View>
        </Card>
      </View>
    );
  }

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

function nowDateTime(): ISODateTimeString {
  return new Date().toISOString() as ISODateTimeString;
}

function juneDate(day: number): ISODateString {
  return `2026-06-${String(day).padStart(2, "0")}` as ISODateString;
}

function eventDateToDay(dateLabel: string): number | null {
  const match = dateLabel.match(/^(\d{1,2})\s/);

  if (match === null) {
    return null;
  }

  return Number(match[1]);
}

function eventDateToISODate(dateLabel: string): ISODateString | null {
  const day = eventDateToDay(dateLabel);

  if (day === null) {
    return null;
  }

  return juneDate(day);
}

function formatSelectedDate(date: ISODateString, text: typeof copy.ru) {
  const day = Number(date.slice(-2));

  if (date === "2026-06-03") {
    return text.formatTodayDate(day);
  }

  return formatCalendarSectionDate(date, text);
}

function formatCalendarSectionDate(date: ISODateString, text: typeof copy.ru) {
  const day = Number(date.slice(-2));
  return text.formatMonthDay(day);
}

function createHouseholdTaskId(): HouseholdTaskId {
  return `task-${Date.now()}` as HouseholdTaskId;
}

function createShoppingItemId(title: string): ShoppingItemId {
  return `shop-${Date.now()}-${title.toLowerCase().replace(/\s+/g, "-")}` as ShoppingItemId;
}

function dueLabelToDateTime(dueLabel: string, text: typeof copy.ru): ISODateTimeString | null {
  if (dueLabel.trim() === text.noDue) {
    return null;
  }

  if (dueLabel.trim() === text.dueJune5) {
    return "2026-06-05T18:00:00+02:00";
  }

  return "2026-06-03T18:00:00+02:00";
}

function toTaskItem(task: HouseholdTask, text: typeof copy.ru, language: Language): TaskItem {
  return {
    id: task.id,
    title: task.title,
    assignee: memberIdToTaskAssignee(task.assigneeMemberId),
    due: dueDateToLabel(task.dueAt, text),
    reminder: task.reminderAt ? text.thirtyMin : text.noReminder,
    completed: task.status === "completed"
  };
}

function memberIdToTaskAssignee(memberId: HouseholdTask["assigneeMemberId"]): TaskItem["assignee"] {
  if (memberId === "member-alex") {
    return "alex";
  }

  if (memberId === "member-maya") {
    return "maya";
  }

  return "shared";
}

function dueDateToLabel(dueAt: ISODateTimeString | null, text: typeof copy.ru) {
  if (dueAt === null) {
    return text.noDue;
  }

  const date = dueAt.slice(0, 10);

  if (date === "2026-06-03") {
    return text.taskToday;
  }

  if (date === "2026-06-05") {
    return text.dueJune5;
  }

  return text.dueWeek;
}

function toShoppingItem(item: ShoppingListItem, categories: ShoppingCategory[], language: Language, text: typeof copy.ru): ShoppingItem {
  return {
    id: item.id,
    title: item.title,
    quantity: item.quantity ?? undefined,
    categoryId: item.categoryId,
    category: shoppingCategoryName(item.categoryId, categories, language, text),
    purchased: item.status === "purchased"
  };
}

function shoppingCategoryName(categoryId: ShoppingCategoryId | null, categories: ShoppingCategory[], language: Language, text: typeof copy.ru) {
  const category = categories.find((item) => item.id === categoryId);
  return category ? (language === "pl" ? category.namePl : category.nameRu) : text.categoryOther;
}

function shoppingCategoryLabelToId(categoryLabel: string, categories: ShoppingCategory[]) {
  const normalizedLabel = categoryLabel.trim().toLowerCase();
  const category = categories.find(
    (item) => item.nameRu.toLowerCase() === normalizedLabel || item.namePl.toLowerCase() === normalizedLabel
  );

  return category?.id ?? "cat-other";
}

function fieldValidationMessage(error: { message?: unknown } | undefined, language: Language) {
  const code = error?.message;

  if (typeof code !== "string" || !isFormValidationErrorCode(code)) {
    return undefined;
  }

  return validationMessage(code, language);
}

function validationMessage(code: FormValidationErrorCode, language: Language) {
  return copy[language].validation[code];
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

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card style={styles.emptyState}>
      <Ionicons name="sparkles-outline" size={24} color={colors.domaGold} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.captionCentered}>{description}</Text>
    </Card>
  );
}

function EventFormRow({
  icon,
  color,
  label,
  value,
  chevron = false,
  last = false,
  children
}: {
  icon: IconName;
  color: string;
  label: string;
  value?: string;
  chevron?: boolean;
  last?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <View style={[styles.eventFormRow, last && styles.eventFormRowLast]}>
      <View style={styles.eventFormIcon}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.eventFormLabel}>{label}</Text>
      <View style={styles.eventFormValueWrap}>
        {children ?? <Text style={styles.eventFormValue}>{value}</Text>}
      </View>
      {chevron ? <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} /> : null}
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
  syncCard: {
    minHeight: 108,
    marginTop: -44,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: "rgba(255,255,255,0.66)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 27
  },
  syncPeople: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11
  },
  syncPerson: {
    alignItems: "center",
    gap: 7
  },
  syncName: {
    color: colors.domaBlue,
    fontSize: 13,
    fontWeight: "600"
  },
  syncDivider: {
    width: 1,
    height: 76,
    backgroundColor: "rgba(232,222,210,0.95)",
    marginHorizontal: 7
  },
  syncState: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 0
  },
  syncTitle: {
    color: colors.domaBlue,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700"
  },
  syncCheck: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: colors.shoppingGreen,
    alignItems: "center",
    justifyContent: "center"
  },
  inlineFab: {
    alignSelf: "flex-end",
    width: 66,
    height: 66,
    borderRadius: 33,
    marginTop: -8,
    marginBottom: 0,
    marginRight: 4,
    backgroundColor: colors.domaGold,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.78)",
    shadowColor: colors.domaGold,
    shadowOpacity: 0.24,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 }
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 12.5,
    lineHeight: 17
  },
  captionCentered: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center"
  },
  groupCard: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 25,
    marginBottom: 14
  },
  rowGrow: {
    flex: 1
  },
  shoppingSummary: {
    minHeight: 112,
    borderRadius: 26,
    padding: 18,
    marginBottom: 18,
    backgroundColor: "rgba(255,255,255,0.74)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.88)",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#372614",
    shadowOpacity: 0.09,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 }
  },
  shoppingIcon: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "rgba(95,150,105,0.10)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.86)"
  },
  shoppingSummaryText: {
    flex: 1
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800"
  },
  shoppingSummaryTitle: {
    color: colors.domaBlue,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  shoppingSummaryCaption: {
    marginTop: 4,
    color: colors.shoppingGreen,
    fontSize: 17,
    fontWeight: "600"
  },
  shoppingCount: {
    width: 53,
    height: 53,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(95,150,105,0.11)"
  },
  shoppingCountText: {
    color: colors.shoppingGreen,
    fontSize: 25,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  widgetPreview: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.72)"
  },
  widgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  widgetBrand: {
    color: colors.domaBlue,
    fontSize: 18,
    fontWeight: "900"
  },
  widgetRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 3
  },
  widgetTime: {
    width: 45,
    color: colors.domaGold,
    fontWeight: "800",
    fontSize: 13
  },
  widgetTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700"
  },
  widgetFooter: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "700"
  },
  chipRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 24,
    padding: 5,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.68)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.86)"
  },
  addField: {
    height: 78,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.84)",
    backgroundColor: "rgba(255,255,255,0.72)",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 0,
    marginBottom: 14,
    shadowColor: "#372614",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 9 }
  },
  addFieldIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginLeft: -2,
    backgroundColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#372614",
    shadowOpacity: 0.10,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 }
  },
  addFieldText: {
    color: colors.domaBlue,
    fontSize: 24,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  shoppingSectionTitle: {
    color: colors.domaBlue,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "500",
    marginBottom: 15,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  frequentCard: {
    padding: 16,
    borderRadius: 25,
    marginBottom: 14
  },
  frequentTiles: {
    gap: 10,
    paddingRight: 4
  },
  frequentTile: {
    width: 68,
    minHeight: 104,
    alignItems: "center",
    justifyContent: "space-between"
  },
  frequentImage: {
    width: 66,
    height: 66,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  frequentLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8
  },
  quickShoppingHelp: {
    minHeight: 92,
    borderRadius: 24,
    padding: 14,
    marginTop: 4,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.88)",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#372614",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 }
  },
  emptyState: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 24
  },
  newTaskCard: {
    minHeight: 98,
    borderRadius: 24,
    padding: 16,
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.74)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.88)",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    shadowColor: "#372614",
    shadowOpacity: 0.09,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 }
  },
  newTaskIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#372614",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 }
  },
  eventSheetBrand: {
    minHeight: 58,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  eventSheetSpacer: {
    width: 76
  },
  eventSheetTitle: {
    color: colors.domaBlue,
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "500",
    marginBottom: 20,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  eventFormCard: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 28,
    marginBottom: 14
  },
  eventFormRow: {
    minHeight: 76,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232,222,210,0.72)"
  },
  eventFormRowLast: {
    borderBottomWidth: 0
  },
  eventFormIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.82)",
    borderWidth: 1,
    borderColor: "rgba(232,222,210,0.72)"
  },
  eventFormLabel: {
    flex: 1,
    color: colors.domaBlue,
    fontSize: 22,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  eventFormValueWrap: {
    maxWidth: "47%",
    alignItems: "flex-end"
  },
  eventFormValue: {
    color: colors.domaBlue,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "600",
    textAlign: "right"
  },
  eventFormValueInput: {
    minWidth: 92,
    color: colors.domaBlue,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "600",
    textAlign: "right",
    paddingVertical: 0
  },
  eventParticipantsValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  eventCommentCard: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 24,
    marginBottom: 18
  },
  sheetOption: {
    minHeight: 62,
    borderRadius: 18,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    marginBottom: 10
  },
  sheetOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  sheetOptionText: {
    flex: 1,
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
  formError: {
    color: colors.dangerRed,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    marginTop: 7
  },
  formRow: {
    flexDirection: "row",
    gap: 10
  },
  segment: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    flexWrap: "wrap"
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
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  offlineCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.surfaceWarm
  }
});

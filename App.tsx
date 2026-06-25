import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from "react-native";

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
import { TaskDetailScreen } from "./src/screens/tabs/TaskDetailScreen";
import {
  AcceptInviteScreen,
  FamilySetupScreen,
  InviteScreen,
  LoginScreen,
  OnboardingScreen
} from "./src/screens/onboarding";
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
import type {
  EventFormInput,
  FamilySetupFormInput,
  LoginFormInput,
  ShoppingFormInput,
  TaskFormInput
} from "./src/validation/forms";
import { sizes, spacing } from "./src/theme/tokens";

type AuthIntent = "createFamily" | "acceptInvite";

type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Family: undefined;
  Invite: undefined;
  AcceptInvite: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

function navigate(name: keyof RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}

const TAB_BAR_OFFSET = sizes.tabBarHeight + spacing.md + spacing.xxxl;

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
  const [authIntent, setAuthIntent] = useState<AuthIntent>("createFamily");
  const [activeTab, setActiveTab] = useState<TabKey>("today");
  const [sheet, setSheet] = useState<AppSheet>(null);
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("all");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
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
    defaultValues: { title: "", quantity: "", category: "food", assignee: "unassigned", urgency: "normal" },
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
    () => householdTasks.map((task) => toTaskItem(task, text, language)),
    [householdTasks, text, language]
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

  function openLogin(intent: AuthIntent) {
    setAuthIntent(intent);
    loginForm.reset({ email: intent === "createFamily" ? "alex@example.com" : "maya@example.com" });
    void loginForm.trigger("email");
    navigate("Login");
  }

  function continueLogin() {
    void loginForm.handleSubmit(() => {
      navigate(authIntent === "createFamily" ? "Family" : "AcceptInvite");
    })();
  }

  function continueFamilySetup() {
    void familySetupForm.handleSubmit(() => {
      navigate("Invite");
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
      assignee: values.assignee,
      urgency: values.urgency,
      createdBy: currentUserId,
      createdAt: nowDateTime()
    });
    shoppingForm.reset({ title: "", quantity: "", category: "food", assignee: "unassigned", urgency: "normal" });
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

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
        <Stack.Screen name="Onboarding">
          {() => (
            <OnboardingScreen
              text={text}
              onCreateFamily={() => openLogin("createFamily")}
              onAcceptInvite={() => openLogin("acceptInvite")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Login">
          {() => (
            <LoginScreen
              form={loginForm}
              language={language}
              text={text}
              isInvite={authIntent === "acceptInvite"}
              isValid={loginIsValid}
              onBack={() => navigate("Onboarding")}
              onContinue={continueLogin}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Family">
          {() => (
            <FamilySetupScreen
              form={familySetupForm}
              language={language}
              text={text}
              isValid={familySetupIsValid}
              onContinue={continueFamilySetup}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Invite">
          {() => (
            <InviteScreen text={text} onShareLink={() => navigate("MainApp")} onLater={() => navigate("MainApp")} />
          )}
        </Stack.Screen>

        <Stack.Screen name="AcceptInvite">
          {() => (
            <AcceptInviteScreen
              text={text}
              familyName={familyName}
              onJoin={() => navigate("MainApp")}
              onSwitchAccount={() => openLogin("acceptInvite")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="MainApp">
          {() => (
            <AppShell>
              <StatusBar style="dark" />
              <SafeAreaView style={styles.safe}>
                <View style={styles.app}>
                  {activeTab !== "calendar" && activeTab !== "tasks" && activeTab !== "shopping" ? (
                    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                      <Header
                        tab={activeTab}
                        greetingTitle={text.todayGreeting}
                        title={activeTab === "today" ? text.brand : text.tabs[activeTab]}
                        todayDateLabel={selectedDateLabel}
                        subtitle={text.morning}
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
                    </ScrollView>
                  ) : activeTab === "shopping" ? (
                    <View style={{ flex: 1 }}>
                      <ShoppingScreen
                        onOpenItemDetail={() => setSheet("shopping")}
                        onStartShoppingMode={() => {}}
                        onOpenTemplates={() => {}}
                        onSelectTemplate={() => {}}
                      />
                    </View>
                  ) : activeTab === "tasks" ? (
                    <View style={{ flex: 1 }}>
                      {!selectedTaskId ? (
                        <TasksScreen
                          text={text}
                          tasks={tasks}
                          filter={taskFilter}
                          onChangeFilter={setTaskFilter}
                          onOpenTaskSheet={() => setSheet("task")}
                          onToggleTask={toggleTask}
                          onSelectTask={(taskId) => setSelectedTaskId(taskId)}
                        />
                      ) : (() => {
                        const selectedTask = tasks.find((t) => t.id === selectedTaskId);
                        if (!selectedTask) return null;
                        return (
                          <TaskDetailScreen
                            text={text}
                            task={selectedTask}
                            onBack={() => setSelectedTaskId(null)}
                            onToggleTask={toggleTask}
                          />
                        );
                      })()}
                    </View>
                  ) : (
                    <View style={{ flex: 1 }}>
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
                    </View>
                  )}
                  <TabBar activeTab={activeTab} onChange={setActiveTab} onAdd={() => setSheet("quick")} labels={text.tabs} />
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
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
    paddingBottom: TAB_BAR_OFFSET,
    paddingTop: 0
  }
});

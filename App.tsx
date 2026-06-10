import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { people } from "./src/data";
import { copy } from "./src/i18n";
import {
  addHouseholdTask as addHouseholdTaskToState,
  addShoppingItem as addShoppingItemToState,
  completeTask as completeTaskInState,
  createInitialLocalAppState,
  purchaseShoppingItem as purchaseShoppingItemInState,
  reopenTask as reopenTaskInState,
  selectDate as selectDateInState,
  setLanguage as setAppLanguage,
  unpurchaseShoppingItem as unpurchaseShoppingItemInState
} from "./src/state/appState";
import { colors, radius, spacing } from "./src/theme";
import {
  EventItem,
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

type Stage = "onboarding" | "login" | "family" | "invite" | "acceptInvite" | "app";
type AuthIntent = "createFamily" | "acceptInvite";
type Sheet = "quick" | "event" | "task" | "shopping" | "family" | "settings" | null;
type IconName = keyof typeof Ionicons.glyphMap;

const tabIcons: Record<TabKey, IconName> = {
  today: "home-outline",
  calendar: "calendar-outline",
  tasks: "checkmark-circle-outline",
  shopping: "bag-outline"
};

const avatarSources: Record<PersonId, number> = {
  alex: require("./assets/alex-avatar.png"),
  maya: require("./assets/maya-avatar.png")
};

const appIconSource = require("./assets/app-icon.png");

const eventVisuals = [
  { color: colors.domaBlue, icon: "calendar-outline" as IconName },
  { color: colors.taskOrange, icon: "cube-outline" as IconName },
  { color: colors.domaGold, icon: "restaurant-outline" as IconName }
];

const shoppingVisuals: Record<string, { icon: IconName; color: string; tint: string }> = {
  Молочное: { icon: "cafe-outline", color: colors.domaGold, tint: "rgba(214,154,69,0.12)" },
  "Овощи и фрукты": { icon: "leaf-outline", color: colors.shoppingGreen, tint: "rgba(95,150,105,0.14)" },
  Дом: { icon: "home-outline", color: colors.domaBlue, tint: "rgba(22,58,95,0.11)" },
  "Мясо и рыба": { icon: "flame-outline", color: colors.dangerRed, tint: "rgba(216,92,74,0.12)" },
  Базовое: { icon: "basket-outline", color: colors.shoppingGreen, tint: "rgba(95,150,105,0.14)" }
};

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

const shoppingCategoryNameToId: Record<string, ShoppingCategoryId> = {
  Молочное: "cat-dairy",
  "Овощи и фрукты": "cat-fruit-veg",
  Дом: "cat-home",
  "Мясо и рыба": "cat-meat-fish",
  Базовое: "cat-other"
};

const webShell =
  Platform.OS === "web"
    ? ({
        maxWidth: 460,
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        alignSelf: "center",
        height: "100vh",
        overflow: "hidden",
        boxShadow: "0 22px 80px rgba(55, 38, 20, 0.16)"
      } as object)
    : null;

export default function App() {
  const [appState, setAppState] = useState(createInitialLocalAppState);
  const language = appState.language;
  const text = copy[language] as typeof copy.ru;
  const [stage, setStage] = useState<Stage>("onboarding");
  const [authIntent, setAuthIntent] = useState<AuthIntent>("createFamily");
  const [email, setEmail] = useState("alex@example.com");
  const [loginTouched, setLoginTouched] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("today");
  const [sheet, setSheet] = useState<Sheet>(null);
  const [taskFilter, setTaskFilter] = useState<"all" | "mine" | "maya" | "shared" | "done">("all");
  const [familyName, setFamilyName] = useState("Семья Алексея");
  const [userName, setUserName] = useState("Алексей");
  const [eventDraft, setEventDraft] = useState({
    title: "",
    date: "3 июня",
    time: "09:00",
    participants: "both"
  });
  const [taskDraft, setTaskDraft] = useState({
    title: "",
    assignee: "alex" as PersonId | "shared",
    due: text.noDue
  });
  const [shoppingDraft, setShoppingDraft] = useState({
    title: "",
    quantity: "",
    category: "Базовое"
  });

  const events = appState.events;
  const selectedDate = appState.selectedDate;
  const selectedDay = Number(selectedDate.slice(-2));
  const selectedEvents = useMemo(
    () => events.filter((event) => eventDateToISODate(event.date) === selectedDate),
    [events, selectedDate]
  );
  const selectedDateLabel = formatSelectedDate(selectedDate, language);
  const tasks = useMemo(
    () => appState.householdTasks.map((task) => toTaskItem(task, text, language)),
    [appState.householdTasks, language, text]
  );
  const shopping = useMemo(
    () => appState.shoppingList.items.map((item) => toShoppingItem(item, appState.shoppingList.categories)),
    [appState.shoppingList.categories, appState.shoppingList.items]
  );
  const frequentShopping = appState.shoppingList.frequentItemTitles;
  const activeTasks = useMemo(() => tasks.filter((task) => !task.completed), [tasks]);
  const purchasedCount = shopping.filter((item) => item.purchased).length;
  const pendingShopping = shopping.filter((item) => !item.purchased);
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  function completeOnboarding() {
    if (onboardingStep < 2) {
      setOnboardingStep((step) => step + 1);
      return;
    }
    setStage("family");
  }

  function openLogin(intent: AuthIntent) {
    setAuthIntent(intent);
    setEmail(intent === "createFamily" ? "alex@example.com" : "maya@example.com");
    setLoginTouched(false);
    setStage("login");
  }

  function continueLogin() {
    setLoginTouched(true);
    if (!emailIsValid) {
      return;
    }
    setStage(authIntent === "createFamily" ? "family" : "acceptInvite");
  }

  function addEvent() {
    if (!eventDraft.title.trim()) {
      return;
    }
    const participants: PersonId[] = eventDraft.participants === "alex" ? ["alex"] : ["alex", "maya"];
    const eventDate = eventDateToISODate(eventDraft.date);
    setAppState((state) => ({
      ...state,
      selectedDate: eventDate ?? state.selectedDate,
      events: [
        ...state.events,
        {
          id: `event-${Date.now()}`,
          title: eventDraft.title.trim(),
          date: eventDraft.date,
          time: eventDraft.time,
          participants,
          reminder: text.thirtyMin
        }
      ]
    }));
    setEventDraft({ title: "", date: "3 июня", time: "09:00", participants: "both" });
    setSheet(null);
    setActiveTab("today");
  }

  function addTask() {
    if (!taskDraft.title.trim()) {
      return;
    }
    setAppState((state) =>
      addHouseholdTaskToState(state, {
        id: createHouseholdTaskId(),
        familyId: state.familyId,
        title: taskDraft.title.trim(),
        assigneeMemberId: taskDraft.assignee === "shared" ? null : taskAssigneeToMemberId[taskDraft.assignee],
        dueAt: dueLabelToDateTime(taskDraft.due, text),
        reminderAt: null,
        createdBy: state.currentUserId,
        createdAt: nowDateTime()
      })
    );
    setTaskDraft({ title: "", assignee: "alex", due: text.noDue });
    setSheet(null);
    setActiveTab("tasks");
  }

  function addShoppingItem(title?: string) {
    const nextTitle = (title ?? shoppingDraft.title).trim();
    if (!nextTitle) {
      return;
    }
    setAppState((state) =>
      addShoppingItemToState(state, {
        id: createShoppingItemId(nextTitle),
        familyId: state.familyId,
        categoryId: shoppingCategoryNameToId[shoppingDraft.category] ?? "cat-other",
        title: nextTitle,
        quantity: title ? null : shoppingDraft.quantity.trim() || null,
        createdBy: state.currentUserId,
        createdAt: nowDateTime()
      })
    );
    setShoppingDraft({ title: "", quantity: "", category: "Базовое" });
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
              {language === "ru"
                ? "События, дела и покупки —\nв одном спокойном месте."
                : "Wydarzenia, sprawy i zakupy —\nw jednym spokojnym miejscu."}
            </Text>

            <WelcomePreview />

            <View style={styles.welcomeActions}>
              <PrimaryButton label={text.createFamilyAction} onPress={() => openLogin("createFamily")} arrow />
              <Pressable style={styles.inviteOutlineButton} onPress={() => openLogin("acceptInvite")}>
                <Text style={styles.inviteOutlineText}>{text.haveInvite}</Text>
              </Pressable>
            </View>
            <Text style={styles.legalText}>
              {language === "ru"
                ? "Продолжая, вы соглашаетесь\nс условиями использования и политикой конфиденциальности."
                : "Kontynuując, akceptujesz\nwarunki korzystania i politykę prywatności."}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </AppShell>
    );
  }

  if (stage === "login") {
    const isInvite = authIntent === "acceptInvite";
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
            <Text style={styles.authTitle}>{language === "ru" ? "Войти в Doma" : "Zaloguj się do Doma"}</Text>
            <Text style={styles.authSubtitle}>
              {isInvite
                ? language === "ru"
                  ? "Введите email, чтобы принять приглашение Алексея."
                  : "Wpisz email, aby przyjąć zaproszenie Alexa."
                : language === "ru"
                  ? "Введите email, чтобы продолжить. Мы отправим ссылку для входа."
                  : "Wpisz email, aby kontynuować. Wyślemy link do logowania."}
            </Text>

            <Card style={styles.authCard}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={[styles.authInput, loginTouched && !emailIsValid && styles.authInputError]}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="alex@example.com"
                placeholderTextColor={colors.textTertiary}
              />
              {loginTouched && !emailIsValid ? (
                <Text style={styles.validationText}>{language === "ru" ? "Введите корректный email" : "Wpisz poprawny email"}</Text>
              ) : (
                <Text style={styles.authHelp}>
                  {language === "ru"
                    ? "Мы используем email только для входа и синхронизации вашего семейного плана."
                    : "Używamy emaila tylko do logowania i synchronizacji rodzinnego planu."}
                </Text>
              )}
            </Card>

            <PrimaryButton label={language === "ru" ? "Продолжить" : "Kontynuuj"} onPress={continueLogin} arrow />

            <View style={styles.socialBlock}>
              <Text style={styles.socialDivider}>{language === "ru" ? "или" : "albo"}</Text>
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color={colors.textPrimary} />
                <Text style={styles.socialButtonText}>{language === "ru" ? "Войти через Apple" : "Zaloguj przez Apple"}</Text>
              </Pressable>
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color={colors.textPrimary} />
                <Text style={styles.socialButtonText}>{language === "ru" ? "Войти через Google" : "Zaloguj przez Google"}</Text>
              </Pressable>
            </View>

            <Text style={styles.legalText}>
              {language === "ru"
                ? "Продолжая, вы соглашаетесь\nс условиями использования и политикой конфиденциальности."
                : "Kontynuując, akceptujesz\nwarunki korzystania i politykę prywatności."}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </AppShell>
    );
  }

  if (stage === "family") {
    return (
      <AppShell>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safe}>
          <ScrollView contentContainerStyle={styles.setupScreen}>
            <Text style={styles.wordmarkSmall}>Doma</Text>
            <Text style={styles.screenTitle}>{language === "ru" ? "Создайте общий план" : "Utwórz wspólny plan"}</Text>
            <Text style={styles.setupCopy}>
              {language === "ru"
                ? "Это семейное пространство для событий, дел, покупок и спокойной синхронизации."
                : "To rodzinna przestrzeń na wydarzenia, sprawy, zakupy i spokojną synchronizację."}
            </Text>
            <Input label={language === "ru" ? "Название семьи" : "Nazwa rodziny"} value={familyName} onChangeText={setFamilyName} />
            <Input label={language === "ru" ? "Ваше имя" : "Twoje imię"} value={userName} onChangeText={setUserName} />
            <Pressable style={styles.photoButton}>
              <Ionicons name="camera-outline" size={20} color={colors.domaBlue} />
              <Text style={styles.photoButtonText}>{language === "ru" ? "Добавить фото" : "Dodaj zdjęcie"}</Text>
            </Pressable>
            <PrimaryButton label={text.createFamily} onPress={() => setStage("invite")} />
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
            <Text style={styles.setupCopy}>
              {language === "ru"
                ? "Отправьте ссылку, чтобы подключить общий план. Мая появится рядом с вами в Doma."
                : "Wyślij link, aby połączyć wspólny plan. Maja pojawi się obok Ciebie w Doma."}
            </Text>
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
            <Text style={styles.screenTitle}>{language === "ru" ? "Вас пригласили в Doma" : "Zaproszono Cię do Doma"}</Text>
            <Text style={styles.setupCopy}>
              {language === "ru"
                ? "Алексей приглашает вас в общий план семьи. После подключения вы оба будете видеть события, дела и покупки."
                : "Alex zaprasza Cię do wspólnego planu rodziny. Po dołączeniu zobaczycie wydarzenia, sprawy i zakupy."}
            </Text>
            <Card style={styles.invitePreviewCard}>
              <View style={styles.invitePreviewRow}>
                <Ionicons name="home-outline" size={22} color={colors.domaGold} />
                <View style={styles.rowGrow}>
                  <Text style={styles.cardTitle}>{familyName}</Text>
                  <Text style={styles.caption}>{language === "ru" ? "Алексей · Мая" : "Alex · Maja"}</Text>
                </View>
                <Ionicons name="checkmark-circle" size={22} color={colors.shoppingGreen} />
              </View>
            </Card>
            <PrimaryButton label={language === "ru" ? "Присоединиться" : "Dołącz"} onPress={() => setStage("app")} />
            <SecondaryButton label={language === "ru" ? "Войти другим аккаунтом" : "Zaloguj na inne konto"} onPress={() => openLogin("acceptInvite")} />
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
              text={text}
              language={language}
              title={activeTab === "today" ? text.brand : text.tabs[activeTab]}
              todayDateLabel={selectedDateLabel}
              subtitle={
                activeTab === "tasks"
                  ? language === "ru" ? "Планируйте и делитесь делами\nс семьёй" : "Planujcie i dzielcie się\nsprawami z rodziną"
                  : activeTab === "shopping"
                    ? language === "ru" ? "Список покупок для дома\nи любимых людей" : "Lista zakupów dla domu\ni bliskich"
                    : activeTab === "calendar"
                      ? language === "ru" ? "Месяц с событиями и планом" : "Miesiąc wydarzeń i planów"
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
        ? `+ ещё ${remainingShopping} товара · куплено ${purchasedCount}`
        : `Куплено ${purchasedCount}`;

    return (
      <View>
        <Card style={styles.syncCard}>
          <View style={styles.syncPeople}>
            <View style={styles.syncPerson}>
              <Avatar person="alex" size={58} />
              <Text style={styles.syncName}>Алексей</Text>
            </View>
            <View style={styles.syncPerson}>
              <Avatar person="maya" size={58} />
              <Text style={styles.syncName}>Мая</Text>
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
              <EventRow key={event.id} event={event} participantsLabel={participantsLabel(event.participants)} index={index} grouped />
            ))
          ) : (
            <Text style={styles.caption}>{text.emptyToday}</Text>
          )}
        </Card>

        <SectionHeader title={text.tasks} action={text.seeAll} onPress={() => setActiveTab("tasks")} />
        <Card style={styles.groupCard}>
          {activeTasks.slice(0, 2).map((task) => (
            <TaskRow key={task.id} task={task} assignee={assigneeLabel(task.assignee)} onToggle={() => toggleTask(task.id)} grouped />
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
    const weekDays = language === "ru" ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] : ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];
    const eventDays = new Set(events.map((event) => eventDateToDay(event.date)).filter((day) => day !== null));
    return (
      <View>
        <View style={styles.monthHeader}>
          <IconButton icon="chevron-back" />
          <Text style={styles.monthTitle}>{language === "ru" ? "Июнь 2026" : "Czerwiec 2026"}</Text>
          <IconButton icon="chevron-forward" />
        </View>
        <View style={styles.calendarCard}>
          <View style={styles.weekRow}>
            {weekDays.map((day) => (
              <Text key={day} style={styles.weekDay}>
                {day}
              </Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {days.map((day) => {
              const selected = day === selectedDay;
              const today = day === 3;
              const hasEvents = eventDays.has(day);
              return (
                <Pressable key={day} style={[styles.dayCell, selected && styles.dayCellSelected, today && !selected && styles.dayCellToday]} onPress={() => selectCalendarDay(day)}>
                  <Text style={[styles.dayText, selected && styles.dayTextSelected]}>{day}</Text>
                  <View style={styles.dotLine}>
                    {hasEvents && (
                      <>
                        <View style={[styles.eventDot, { backgroundColor: colors.domaBlue }]} />
                        <View style={[styles.eventDot, { backgroundColor: colors.taskOrange }]} />
                      </>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
        <SectionHeader title={formatCalendarSectionDate(selectedDate, language)} action={text.add} onPress={() => setSheet("event")} />
        {selectedEvents.length > 0 ? (
          selectedEvents.map((event, index) => <CalendarEventRow key={`cal-${event.id}`} event={event} participantsLabel={participantsLabel(event.participants)} index={index} />)
        ) : (
          <EmptyState title={text.emptyToday} description={text.emptyTodayHint} />
        )}
      </View>
    );
  }

  function renderTasks() {
    const todayLabel = language === "ru" ? "Сегодня" : "Dzisiaj";
    const todayTasks = tasks.filter((task) => !task.completed && task.due === todayLabel);
    const weekTasks = tasks.filter((task) => !task.completed && task.due !== todayLabel && task.due !== text.noDue);
    const noDueTasks = tasks.filter((task) => !task.completed && task.due === text.noDue);
    const doneTasks = tasks.filter((task) => task.completed);
    const groups = [
      { title: language === "ru" ? "Сегодня" : "Dzisiaj", items: todayTasks },
      { title: language === "ru" ? "На неделе" : "W tym tygodniu", items: weekTasks },
      { title: language === "ru" ? "Без срока" : "Bez terminu", items: noDueTasks },
      { title: text.done, items: doneTasks }
    ].filter((group) => group.items.length > 0);

    return (
      <View>
        <View style={styles.chipRow}>
          <Chip label={text.all} active={taskFilter === "all"} onPress={() => setTaskFilter("all")} />
          <Chip label={text.mine} active={taskFilter === "mine"} onPress={() => setTaskFilter("mine")} />
          <Chip label="Маи" active={taskFilter === "maya"} onPress={() => setTaskFilter("maya")} />
          <Chip label={text.shared} active={taskFilter === "shared"} onPress={() => setTaskFilter("shared")} />
          <Chip label={text.done} active={taskFilter === "done"} onPress={() => setTaskFilter("done")} />
        </View>
        {taskFilter === "all" ? (
          groups.map((group) => (
            <View key={group.title}>
              <SectionHeader title={group.title} action={`${group.items.length}`} />
              <Card style={styles.groupCard}>
                {group.items.map((task) => (
                  <TaskRow key={`tasks-${task.id}`} task={task} assignee={assigneeLabel(task.assignee)} onToggle={() => toggleTask(task.id)} grouped />
                ))}
              </Card>
            </View>
          ))
        ) : (
          <Card style={styles.groupCard}>
            {filteredTasks.map((task) => (
              <TaskRow key={`tasks-${task.id}`} task={task} assignee={assigneeLabel(task.assignee)} onToggle={() => toggleTask(task.id)} grouped />
            ))}
          </Card>
        )}
        <Pressable style={styles.newTaskCard} onPress={() => setSheet("task")}>
          <View style={styles.newTaskIcon}>
            <Ionicons name="add" size={34} color={colors.domaGold} />
          </View>
          <View style={styles.rowGrow}>
            <Text style={styles.cardTitle}>{text.newTask}</Text>
            <Text style={styles.caption}>{language === "ru" ? "Быстро добавьте дело для себя или семьи" : "Szybko dodaj sprawę dla siebie albo rodziny"}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
        </Pressable>
      </View>
    );
  }

  function renderShopping() {
    const sortedShopping = [...shopping].sort((a, b) => Number(a.purchased) - Number(b.purchased));
    const categoryOrder = ["Молочное", "Овощи и фрукты", "Дом", "Мясо и рыба", "Базовое"];
    const groupedShopping = categoryOrder
      .map((category) => ({
        category,
        items: sortedShopping.filter((item) => item.category === category)
      }))
      .filter((group) => group.items.length > 0);
    return (
      <View>
        <Pressable style={styles.addField} onPress={() => setSheet("shopping")}>
          <View style={styles.addFieldIcon}>
            <Ionicons name="add" size={26} color={colors.domaGold} />
          </View>
          <Text style={styles.addFieldText}>{language === "ru" ? "Добавить товар" : "Dodaj produkt"}</Text>
        </Pressable>
        <Card style={styles.frequentCard}>
          <Text style={styles.shoppingSectionTitle}>{language === "ru" ? "Часто покупаем" : "Często kupowane"}</Text>
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
        {groupedShopping.map((group) => {
          const visual = shoppingVisuals[group.category] ?? shoppingVisuals["Базовое"];
          return (
            <Card key={group.category} style={styles.shoppingCategoryCard}>
              <View style={styles.shoppingCategoryHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: visual.tint }]}>
                  <Ionicons name={visual.icon} size={20} color={visual.color} />
                </View>
                <Text style={styles.shoppingCategoryTitle}>{group.category}</Text>
                <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
              </View>
              {group.items.map((item) => (
                <Pressable key={item.id} style={styles.shoppingRow} onPress={() => toggleShopping(item.id)}>
                  <View style={[styles.shoppingCheckbox, item.purchased && styles.shoppingCheckboxDone]}>
                    {item.purchased && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
                  </View>
                  <View style={styles.rowGrow}>
                    <Text style={[styles.shoppingItemTitle, item.purchased && styles.completedText]}>{item.title}</Text>
                  </View>
                  {item.quantity ? (
                    <View style={styles.quantityPill}>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                    </View>
                  ) : null}
                  <Ionicons name="reorder-two-outline" size={24} color="rgba(111,116,124,0.48)" />
                </Pressable>
              ))}
            </Card>
          );
        })}
        <Pressable style={styles.quickShoppingHelp} onPress={() => setSheet("shopping")}>
          <View style={styles.previewBasket}>
            <Ionicons name="basket-outline" size={34} color={colors.domaGold} />
          </View>
          <View style={styles.rowGrow}>
            <Text style={styles.cardTitle}>{language === "ru" ? "Быстро добавляйте товары" : "Dodawaj produkty szybko"}</Text>
            <Text style={styles.caption}>
              {language === "ru" ? "Введите название, например «Молоко 2 л»" : "Wpisz nazwę, np. „Mleko 2 l”"}
            </Text>
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
        <SheetTitle title={language === "ru" ? "Что добавить?" : "Co dodać?"} />
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
            <TextInput
              style={styles.eventFormValueInput}
              value={eventDraft.title}
              onChangeText={(title) => setEventDraft((draft) => ({ ...draft, title }))}
              placeholder="Врач"
              placeholderTextColor={colors.domaBlue}
              autoFocus
            />
          </EventFormRow>
          <EventFormRow icon="calendar-outline" color={colors.domaBlue} label={text.date} value={eventDraft.date} chevron />
          <EventFormRow icon="time-outline" color={colors.taskOrange} label={text.time} value={eventDraft.time} chevron />
          <EventFormRow icon="people-outline" color={colors.domaBlue} label={text.participants} chevron>
            <View style={styles.eventParticipantsValue}>
              <MiniAvatarGroup participants={eventDraft.participants === "both" ? ["alex", "maya"] : ["alex"]} small />
              <Text style={styles.eventFormValue}>{eventDraft.participants === "both" ? text.both : "Алексей"}</Text>
            </View>
          </EventFormRow>
          <EventFormRow icon="notifications-outline" color={colors.domaGold} label={text.reminder} value={text.thirtyMin} chevron />
          <EventFormRow icon="repeat-outline" color={colors.domaBlue} label={language === "ru" ? "Повтор" : "Powtarzanie"} value={language === "ru" ? "Не повторять" : "Nie powtarzaj"} chevron last />
        </Card>
        <Card style={styles.eventCommentCard}>
          <EventFormRow icon="chatbubble-outline" color={colors.domaBlue} label={language === "ru" ? "Комментарий" : "Komentarz"} value={language === "ru" ? "Добавить комментарий..." : "Dodaj komentarz..."} last />
        </Card>
        <PrimaryButton label={text.save} onPress={addEvent} disabled={!eventDraft.title.trim()} />
      </View>
    );
  }

  function renderTaskForm() {
    return (
      <View>
        <SheetTitle title={text.newTask} />
        <Input label={text.title} value={taskDraft.title} onChangeText={(title) => setTaskDraft((draft) => ({ ...draft, title }))} autoFocus />
        <Text style={styles.fieldLabel}>{text.assignee}</Text>
        <View style={styles.segment}>
          <Segment label="Алексей" active={taskDraft.assignee === "alex"} onPress={() => setTaskDraft((draft) => ({ ...draft, assignee: "alex" }))} />
          <Segment label="Мая" active={taskDraft.assignee === "maya"} onPress={() => setTaskDraft((draft) => ({ ...draft, assignee: "maya" }))} />
          <Segment label={text.shared} active={taskDraft.assignee === "shared"} onPress={() => setTaskDraft((draft) => ({ ...draft, assignee: "shared" }))} />
        </View>
        <Input label={text.due} value={taskDraft.due} onChangeText={(due) => setTaskDraft((draft) => ({ ...draft, due }))} />
        <PrimaryButton label={text.save} onPress={addTask} disabled={!taskDraft.title.trim()} />
      </View>
    );
  }

  function renderShoppingForm() {
    return (
      <View>
        <SheetTitle title={text.newShopping} />
        <Input label={text.title} value={shoppingDraft.title} onChangeText={(title) => setShoppingDraft((draft) => ({ ...draft, title }))} autoFocus />
        <View style={styles.formRow}>
          <Input compact label={text.quantity} value={shoppingDraft.quantity} onChangeText={(quantity) => setShoppingDraft((draft) => ({ ...draft, quantity }))} />
          <Input compact label={text.category} value={shoppingDraft.category} onChangeText={(category) => setShoppingDraft((draft) => ({ ...draft, category }))} />
        </View>
        <PrimaryButton label={text.add} onPress={() => addShoppingItem()} disabled={!shoppingDraft.title.trim()} />
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
            <Text style={styles.caption}>{language === "ru" ? "Android · владелец" : "Android · właściciel"}</Text>
          </View>
        </Card>
        <Card style={styles.memberCard}>
          <Avatar person="maya" size={44} />
          <View style={styles.rowGrow}>
            <Text style={styles.cardTitle}>Мая</Text>
            <Text style={styles.caption}>{language === "ru" ? "iPhone · подключена" : "iPhone · połączona"}</Text>
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
          <Segment label="Русский" active={language === "ru"} onPress={() => setAppState((state) => setAppLanguage(state, "ru"))} />
          <Segment label="Polski" active={language === "pl"} onPress={() => setAppState((state) => setAppLanguage(state, "pl"))} />
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
    setAppState((state) => {
      const task = state.householdTasks.find((item) => item.id === id);

      if (task?.status === "completed") {
        return reopenTaskInState(state, {
          taskId: id as HouseholdTaskId,
          updatedBy: state.currentUserId,
          updatedAt: nowDateTime()
        });
      }

      return completeTaskInState(state, {
        taskId: id as HouseholdTaskId,
        completedBy: state.currentUserId,
        completedAt: nowDateTime()
      });
    });
  }

  function toggleShopping(id: string) {
    setAppState((state) => {
      const item = state.shoppingList.items.find((shoppingItem) => shoppingItem.id === id);

      if (item?.status === "purchased") {
        return unpurchaseShoppingItemInState(state, {
          itemId: id as ShoppingItemId,
          updatedBy: state.currentUserId,
          updatedAt: nowDateTime()
        });
      }

      return purchaseShoppingItemInState(state, {
        itemId: id as ShoppingItemId,
        purchasedBy: state.currentUserId,
        purchasedAt: nowDateTime()
      });
    });
  }

  function selectCalendarDay(day: number) {
    setAppState((state) => selectDateInState(state, juneDate(day)));
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

function formatSelectedDate(date: ISODateString, language: Language) {
  const day = Number(date.slice(-2));

  if (date === "2026-06-03") {
    return language === "ru" ? `Сегодня, ${day} июня` : `Dzisiaj, ${day} czerwca`;
  }

  return formatCalendarSectionDate(date, language);
}

function formatCalendarSectionDate(date: ISODateString, language: Language) {
  const day = Number(date.slice(-2));
  return language === "ru" ? `${day} июня` : `${day} czerwca`;
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

  if (dueLabel.trim() === "До 5 июня") {
    return "2026-06-05T18:00:00+02:00";
  }

  return "2026-06-03T18:00:00+02:00";
}

function toTaskItem(task: HouseholdTask, text: typeof copy.ru, language: Language): TaskItem {
  return {
    id: task.id,
    title: task.title,
    assignee: memberIdToTaskAssignee(task.assigneeMemberId),
    due: dueDateToLabel(task.dueAt, text, language),
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

function dueDateToLabel(dueAt: ISODateTimeString | null, text: typeof copy.ru, language: Language) {
  if (dueAt === null) {
    return text.noDue;
  }

  const date = dueAt.slice(0, 10);

  if (date === "2026-06-03") {
    return language === "ru" ? "Сегодня" : "Dzisiaj";
  }

  if (date === "2026-06-05") {
    return language === "ru" ? "До 5 июня" : "Do 5 czerwca";
  }

  return language === "ru" ? "На неделе" : "W tygodniu";
}

function toShoppingItem(item: ShoppingListItem, categories: ShoppingCategory[]): ShoppingItem {
  return {
    id: item.id,
    title: item.title,
    quantity: item.quantity ?? undefined,
    category: shoppingCategoryName(item.categoryId, categories),
    purchased: item.status === "purchased"
  };
}

function shoppingCategoryName(categoryId: ShoppingCategoryId | null, categories: ShoppingCategory[]) {
  const category = categories.find((item) => item.id === categoryId);
  return category?.nameRu ?? "Базовое";
}

function AppShell({ children }: { children: React.ReactNode }) {
  return <View style={[styles.shell, webShell]}>{children}</View>;
}

function Header({
  tab,
  text,
  language,
  title,
  todayDateLabel,
  subtitle,
  onFamily,
  onSettings,
  onAdd
}: {
  tab: TabKey;
  text: typeof copy.ru;
  language: Language;
  title: string;
  todayDateLabel: string;
  subtitle: string;
  onFamily: () => void;
  onSettings: () => void;
  onAdd: () => void;
}) {
  return (
    <View style={[styles.header, tab === "today" && styles.todayHeader]}>
      {tab === "today" && <View style={styles.sunWash} />}
      <View style={styles.phoneStatus}>
        <Text style={styles.statusTime}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={17} color="#050505" />
          <Ionicons name="wifi" size={17} color="#050505" />
          <Ionicons name="battery-full" size={23} color="#050505" />
        </View>
      </View>
      <View style={styles.brandHeaderRow}>
        <DomaLogo />
        <View style={styles.headerActions}>
          {tab === "today" ? (
            <IconButton icon="notifications-outline" onPress={onSettings} badge />
          ) : (
            <IconButton icon="add" onPress={onAdd} />
          )}
        </View>
      </View>
      {tab === "today" ? (
        <View style={styles.greetingBlock}>
          <Text style={styles.greetingTitle}>{language === "ru" ? "Доброе утро,\nАлексей 👋" : "Dzień dobry,\nAlex 👋"}</Text>
          <Text style={styles.greetingDate}>{todayDateLabel}</Text>
        </View>
      ) : (
        <View style={styles.innerHeaderBlock}>
          <View>
            <Text style={styles.innerScreenTitle}>{title}</Text>
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
          </View>
          {tab === "tasks" || tab === "shopping" ? (
            <Pressable onPress={onFamily} style={styles.taskHeaderAvatars}>
              <Avatar person="alex" size={58} />
              <Avatar person="maya" size={58} />
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
}

function DomaLogo({ large = false }: { large?: boolean }) {
  return (
    <View style={styles.logoRow}>
      <View style={[styles.logoMark, large && styles.logoMarkLarge]}>
        <Ionicons name="home-outline" size={31} color={colors.domaGold} />
        <Ionicons name="heart-outline" size={15} color={colors.domaGold} style={styles.logoHeart} />
      </View>
      <Text style={[styles.logoText, large && styles.logoTextLarge]}>Doma</Text>
    </View>
  );
}

function WelcomePreview() {
  return (
    <View style={styles.previewShell}>
      <View style={styles.previewCard}>
        <View style={styles.previewRowHeader}>
          <View style={[styles.previewIconCircle, { backgroundColor: "rgba(73,159,199,0.18)" }]}>
            <Ionicons name="calendar-outline" size={20} color={colors.domaBlue} />
          </View>
          <Text style={styles.previewSectionTitle}>Сегодня</Text>
          <View style={styles.previewPill}>
            <Text style={styles.previewPillText}>Все события</Text>
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
          <MiniAvatarGroup participants={["alex", "maya"]} small />
        </View>
      </View>

      <View style={styles.previewCard}>
        <View style={styles.previewRowHeader}>
          <View style={[styles.previewIconCircle, { backgroundColor: "rgba(239,138,31,0.16)" }]}>
            <Ionicons name="checkmark-circle" size={20} color={colors.taskOrange} />
          </View>
          <Text style={styles.previewSectionTitle}>Дела</Text>
          <View style={styles.previewPill}>
            <Text style={styles.previewPillText}>Все дела</Text>
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
          <Text style={styles.previewSectionTitle}>Покупки</Text>
          <View style={styles.previewPill}>
            <Text style={styles.previewPillText}>Список</Text>
          </View>
        </View>
        <View style={styles.previewShoppingRow}>
          <View>
            <Text style={styles.previewShoppingTitle}>Молоко, хлеб, яйца, бананы</Text>
            <Text style={styles.caption}>4 товара</Text>
          </View>
          <View style={styles.previewBasket}>
            <Ionicons name="basket-outline" size={34} color={colors.shoppingGreen} />
          </View>
        </View>
      </View>
    </View>
  );
}

function TabBar({
  activeTab,
  onChange,
  labels
}: {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
  labels: Record<TabKey, string>;
}) {
  const tabs: TabKey[] = ["today", "calendar", "tasks", "shopping"];
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const active = tab === activeTab;
        return (
          <Pressable key={tab} style={styles.tabItem} onPress={() => onChange(tab)}>
            <View style={[styles.tabIconWrap, active && styles.tabIconWrapActive]}>
              <Ionicons name={tabIcons[tab]} size={21} color={active ? colors.domaBlue : colors.inactive} />
            </View>
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{labels[tab]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function SectionHeader({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable onPress={onPress}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function EventRow({
  event,
  participantsLabel,
  index = 0,
  grouped = false
}: {
  event: EventItem;
  participantsLabel: string;
  index?: number;
  grouped?: boolean;
}) {
  const visual = eventVisuals[index % eventVisuals.length];
  return (
    <Pressable style={[styles.eventRow, grouped && styles.groupedRow]}>
      <View style={[styles.rowAccent, { backgroundColor: visual.color }]} />
      <View style={[styles.eventIconTile, { backgroundColor: visual.color }]}>
        <Ionicons name={visual.icon} size={22} color="#FFFFFF" />
      </View>
      <Text style={styles.eventTimeText}>{event.time}</Text>
      <View style={styles.rowGrow}>
        <Text style={styles.rowTitle}>{event.title}</Text>
        <Text style={styles.caption}>{participantsLabel}</Text>
      </View>
      <MiniAvatarGroup participants={event.participants} />
      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
    </Pressable>
  );
}

function CalendarEventRow({ event, participantsLabel, index = 0 }: { event: EventItem; participantsLabel: string; index?: number }) {
  const visual = eventVisuals[index % eventVisuals.length];
  return (
    <Pressable style={styles.calendarEventRow}>
      <View style={[styles.calendarTimeTile, { backgroundColor: visual.color }]}>
        <Ionicons name={visual.icon} size={25} color="#FFFFFF" />
        <Text style={styles.calendarTimeText}>{event.time}</Text>
      </View>
      <View style={styles.rowGrow}>
        <Text style={styles.calendarEventTitle}>{event.title}</Text>
        <View style={styles.inlineMeta}>
          <MiniAvatarGroup participants={event.participants} small />
          <Text style={styles.caption}>{participantsLabel}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
    </Pressable>
  );
}

function TaskRow({ task, assignee, onToggle, grouped = false }: { task: TaskItem; assignee: string; onToggle: () => void; grouped?: boolean }) {
  return (
    <Pressable style={[styles.taskRow, grouped && styles.groupedRow]}>
      <View style={[styles.taskAccent, task.completed && styles.taskAccentDone]} />
      <Pressable style={[styles.checkbox, task.completed && styles.checkboxDone]} onPress={onToggle}>
        {task.completed && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
      </Pressable>
      <View style={styles.rowGrow}>
        <Text style={[styles.rowTitle, task.completed && styles.completedText]}>{task.title}</Text>
        <View style={styles.inlineMeta}>
          <Ionicons name={task.reminder === "Не напоминать" ? "calendar-outline" : "notifications-outline"} size={15} color={task.completed ? colors.shoppingGreen : colors.taskOrange} />
          <Text style={styles.caption}>{task.completed ? "Выполнено сегодня" : `${task.due} · ${assignee}`}</Text>
        </View>
      </View>
      {task.assignee !== "shared" ? <Avatar person={task.assignee} size={28} /> : <Ionicons name="people-outline" size={22} color={colors.familySand} />}
      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
    </Pressable>
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

function Avatar({ person, size = 32 }: { person: PersonId; size?: number }) {
  return (
    <Image
      source={avatarSources[person]}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      resizeMode="cover"
    />
  );
}

function AvatarStack({ small = false }: { small?: boolean }) {
  const size = small ? 26 : 38;
  return (
    <View style={styles.avatarStack}>
      <Avatar person="alex" size={size} />
      <View style={styles.avatarOverlap}>
        <Avatar person="maya" size={size} />
      </View>
    </View>
  );
}

function MiniAvatarGroup({ participants, small = false }: { participants: PersonId[]; small?: boolean }) {
  const size = small ? 26 : 30;
  return (
    <View style={styles.miniAvatarGroup}>
      {participants.map((person, index) => (
        <View key={person} style={index > 0 ? styles.miniAvatarOverlap : undefined}>
          <Avatar person={person} size={size} />
        </View>
      ))}
    </View>
  );
}

function IconButton({ icon, onPress, badge = false }: { icon: IconName; onPress?: () => void; badge?: boolean }) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <Ionicons name={icon} size={20} color={colors.domaBlue} />
      {badge ? <View style={styles.iconBadge} /> : null}
    </Pressable>
  );
}

function PrimaryButton({ label, onPress, disabled = false, arrow = false }: { label: string; onPress: () => void; disabled?: boolean; arrow?: boolean }) {
  return (
    <Pressable style={[styles.primaryButton, disabled && styles.primaryButtonDisabled]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.primaryButtonText, disabled && styles.disabledText]}>{label}</Text>
      {arrow ? <Ionicons name="arrow-forward" size={24} color="#FFFFFF" style={styles.primaryButtonArrow} /> : null}
    </Pressable>
  );
}

function SecondaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.secondaryButton} onPress={onPress}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function Input({
  label,
  value,
  onChangeText,
  compact,
  autoFocus
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  compact?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <View style={[styles.inputWrap, compact && styles.inputCompact]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textTertiary}
        autoFocus={autoFocus}
      />
    </View>
  );
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

function Segment({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.segmentItem, active && styles.segmentItemActive]} onPress={onPress}>
      <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{label}</Text>
    </Pressable>
  );
}

function SheetTitle({ title }: { title: string }) {
  return <Text style={styles.sheetTitle}>{title}</Text>;
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

function BottomSheet({ visible, onClose, children }: { visible: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.modalRoot}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.backgroundTop
  },
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
  header: {
    paddingTop: 18,
    marginBottom: 12
  },
  todayHeader: {
    minHeight: 306,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    overflow: "hidden"
  },
  sunWash: {
    position: "absolute",
    right: -40,
    top: 82,
    width: 245,
    height: 190,
    borderRadius: 95,
    backgroundColor: "rgba(255,255,255,0.54)",
    shadowColor: colors.domaGold,
    shadowOpacity: 0.14,
    shadowRadius: 55,
    shadowOffset: { width: -18, height: 22 }
  },
  phoneStatus: {
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    marginBottom: 24
  },
  statusTime: {
    color: "#050505",
    fontSize: 17,
    fontWeight: "800"
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  brandHeaderRow: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  logoMark: {
    width: 47,
    height: 47,
    alignItems: "center",
    justifyContent: "center"
  },
  logoMarkLarge: {
    width: 58,
    height: 58
  },
  logoHeart: {
    position: "absolute",
    top: 17
  },
  logoText: {
    color: colors.domaBlue,
    fontSize: 44,
    lineHeight: 50,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" }),
    letterSpacing: 0
  },
  logoTextLarge: {
    fontSize: 70,
    lineHeight: 76
  },
  greetingBlock: {
    marginTop: 30
  },
  greetingTitle: {
    color: colors.domaBlue,
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" }),
    letterSpacing: 0
  },
  greetingDate: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "500"
  },
  innerHeaderBlock: {
    marginTop: 42,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  innerScreenTitle: {
    color: colors.domaBlue,
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" }),
    letterSpacing: 0
  },
  taskHeaderAvatars: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 31,
    lineHeight: 36,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: 0
  },
  headerSubtitle: {
    marginTop: 3,
    fontSize: 14,
    color: colors.textSecondary
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  avatarButton: {
    paddingHorizontal: 2,
    paddingVertical: 4
  },
  iconButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.74)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.86)",
    shadowColor: "#372614",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 }
  },
  todayHero: {
    borderRadius: radius.xlarge,
    padding: 18,
    marginBottom: 12,
    backgroundColor: colors.surfaceWarm,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.78)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#372614",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 }
  },
  heroDate: {
    color: colors.domaGold,
    fontWeight: "700",
    fontSize: 13
  },
  heroQuestion: {
    marginTop: 5,
    color: colors.textPrimary,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: "800"
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.74)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.88)",
    borderRadius: 26,
    padding: spacing.card,
    marginBottom: 10,
    shadowColor: "#372614",
    shadowOpacity: 0.10,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 }
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
  syncLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
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
  familyPair: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "700"
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionTitle: {
    color: colors.domaBlue,
    fontSize: 27,
    lineHeight: 32,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  sectionAction: {
    color: "#C87F11",
    fontSize: 17,
    fontWeight: "500"
  },
  groupCard: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 25,
    marginBottom: 14
  },
  eventRow: {
    minHeight: 82,
    borderRadius: 0,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232,222,210,0.72)"
  },
  groupedRow: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232,222,210,0.72)"
  },
  rowAccent: {
    width: 4,
    height: 54,
    borderRadius: 4
  },
  eventIconTile: {
    width: 56,
    height: 56,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#372614",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 }
  },
  eventTimeText: {
    color: colors.domaBlue,
    fontSize: 24,
    fontWeight: "500",
    minWidth: 66,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  rowGrow: {
    flex: 1
  },
  rowTitle: {
    color: colors.domaBlue,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  taskRow: {
    minHeight: 84,
    borderRadius: 0,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  taskAccent: {
    width: 4,
    height: 51,
    borderRadius: 4,
    backgroundColor: colors.taskOrange
  },
  taskAccentDone: {
    backgroundColor: colors.shoppingGreen
  },
  checkbox: {
    width: 31,
    height: 31,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.taskOrange,
    alignItems: "center",
    justifyContent: "center"
  },
  checkboxDone: {
    borderColor: colors.taskOrange,
    backgroundColor: colors.taskOrange
  },
  completedText: {
    color: colors.textTertiary,
    textDecorationLine: "line-through"
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
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 22
  },
  monthTitle: {
    color: colors.domaBlue,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "600"
  },
  calendarCard: {
    paddingHorizontal: 2,
    paddingBottom: 16
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 10
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 18,
    fontWeight: "500"
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25
  },
  dayCellSelected: {
    backgroundColor: colors.domaBlue
  },
  dayCellToday: {
    borderWidth: 1,
    borderColor: colors.domaGold
  },
  dayText: {
    color: colors.textPrimary,
    fontSize: 25,
    fontWeight: "500"
  },
  dayTextSelected: {
    color: "#FFFFFF"
  },
  dotLine: {
    height: 7,
    marginTop: 3,
    flexDirection: "row",
    gap: 2
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  calendarEventRow: {
    minHeight: 108,
    borderRadius: 24,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.74)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.88)",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#372614",
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 }
  },
  calendarTimeTile: {
    width: 86,
    height: 86,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    gap: 6
  },
  calendarTimeText: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "600",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  calendarEventTitle: {
    color: colors.domaBlue,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  inlineMeta: {
    marginTop: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
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
  chip: {
    height: 39,
    paddingHorizontal: 12,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    backgroundColor: colors.surfaceWarm,
    alignItems: "center",
    justifyContent: "center"
  },
  chipActive: {
    backgroundColor: colors.domaBlue,
    borderColor: colors.domaBlue
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: "500"
  },
  chipTextActive: {
    color: "#FFFFFF"
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
  frequentRow: {
    gap: 8,
    paddingBottom: 14
  },
  shoppingChip: {
    height: 35,
    paddingHorizontal: 14,
    borderRadius: 17,
    backgroundColor: "rgba(95,150,105,0.10)",
    borderWidth: 1,
    borderColor: "rgba(95,150,105,0.22)",
    justifyContent: "center"
  },
  shoppingChipText: {
    color: colors.shoppingGreen,
    fontSize: 13,
    fontWeight: "800"
  },
  shoppingRow: {
    minHeight: 57,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(232,222,210,0.72)"
  },
  shoppingCheckbox: {
    width: 23,
    height: 23,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.domaGold,
    alignItems: "center",
    justifyContent: "center"
  },
  shoppingCheckboxDone: {
    backgroundColor: colors.shoppingGreen
  },
  shoppingItemTitle: {
    color: colors.domaBlue,
    fontSize: 19,
    fontWeight: "600"
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
  shoppingCategoryCard: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 4,
    marginBottom: 13,
    borderRadius: 24
  },
  shoppingCategoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 12
  },
  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center"
  },
  shoppingCategoryTitle: {
    flex: 1,
    color: colors.domaBlue,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" })
  },
  quantityPill: {
    minWidth: 48,
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(214,154,69,0.11)"
  },
  quantityText: {
    color: colors.domaGold,
    fontSize: 15,
    fontWeight: "700"
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
  tabBar: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 12,
    height: 84,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.74)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#372614",
    shadowOpacity: 0.12,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 14 }
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  tabIconWrap: {
    width: 56,
    height: 44,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center"
  },
  tabIconWrapActive: {
    backgroundColor: "rgba(255,255,255,0.86)",
    shadowColor: "#372614",
    shadowOpacity: 0.10,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 }
  },
  tabLabel: {
    color: colors.inactive,
    fontSize: 14,
    fontWeight: "500"
  },
  tabLabelActive: {
    color: colors.domaBlue
  },
  fab: {
    position: "absolute",
    right: 34,
    bottom: 144,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.domaGold,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.domaGold,
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 }
  },
  iconBadge: {
    position: "absolute",
    right: 13,
    top: 13,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.domaGold
  },
  avatar: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: colors.surfaceWarm
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "900"
  },
  avatarStack: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatarOverlap: {
    marginLeft: -10
  },
  miniAvatarGroup: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 34
  },
  miniAvatarOverlap: {
    marginLeft: -12
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
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end"
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(21,34,53,0.24)"
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: spacing.screen,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 36 : 24,
    backgroundColor: colors.warmBackground,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.74)"
  },
  sheetHandle: {
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.strokeSoft,
    alignSelf: "center",
    marginBottom: 18
  },
  sheetTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    marginBottom: 14
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
  inputWrap: {
    marginBottom: 14
  },
  inputCompact: {
    flex: 1
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 12.5,
    fontWeight: "800",
    marginBottom: 7
  },
  input: {
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.strokeLight,
    paddingHorizontal: 14,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600"
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
  segmentItem: {
    minHeight: 38,
    paddingHorizontal: 13,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.strokeSoft,
    backgroundColor: colors.surfaceWarm,
    alignItems: "center",
    justifyContent: "center"
  },
  segmentItemActive: {
    backgroundColor: colors.domaBlue,
    borderColor: colors.domaBlue
  },
  segmentText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "800"
  },
  segmentTextActive: {
    color: "#FFFFFF"
  },
  primaryButton: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.domaGold,
    shadowColor: colors.domaGold,
    shadowOpacity: 0.24,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    marginTop: 4,
    position: "relative"
  },
  primaryButtonArrow: {
    position: "absolute",
    right: 24
  },
  primaryButtonDisabled: {
    backgroundColor: "#E6DED4",
    shadowOpacity: 0
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900"
  },
  disabledText: {
    color: colors.textTertiary
  },
  secondaryButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8
  },
  secondaryButtonText: {
    color: colors.domaBlue,
    fontSize: 15,
    fontWeight: "800"
  },
  onboarding: {
    flex: 1,
    padding: spacing.screen,
    alignItems: "center",
    justifyContent: "center"
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
  onboardingIcon: {
    width: 134,
    height: 134,
    borderRadius: 34,
    marginBottom: 24,
    shadowColor: "#372614",
    shadowOpacity: 0.18,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 }
  },
  brandOrb: {
    width: 92,
    height: 92,
    borderRadius: 32,
    backgroundColor: colors.domaBlue,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.domaBlue,
    shadowOpacity: 0.2,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 }
  },
  brandLetter: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "900"
  },
  wordmark: {
    marginTop: 24,
    color: colors.textPrimary,
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "900"
  },
  wordmarkSmall: {
    color: colors.domaBlue,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 18
  },
  onboardingTitle: {
    marginTop: 10,
    color: colors.textPrimary,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900",
    textAlign: "center"
  },
  onboardingText: {
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    maxWidth: 330
  },
  dots: {
    flexDirection: "row",
    gap: 7,
    marginVertical: 28
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.strokeSoft
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.domaGold
  },
  actionStack: {
    width: "100%"
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

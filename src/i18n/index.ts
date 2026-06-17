import { Language, TabKey } from "../types";

type DomaCopy = {
  brand: string;
  tagline: string;
  welcomeSubtitle: string;
  legalText: string;
  morning: string;
  todayDate: string;
  todayGreeting: string;
  synced: string;
  syncedAgo: string;
  offline: string;
  offlineHint: string;
  seeAll: string;
  upcoming: string;
  tasks: string;
  shopping: string;
  calendar: string;
  family: string;
  settings: string;
  save: string;
  cancel: string;
  later: string;
  createFamily: string;
  invitePartner: string;
  shareLink: string;
  start: string;
  createFamilyAction: string;
  haveInvite: string;
  add: string;
  event: string;
  task: string;
  item: string;
  reminder: string;
  newEvent: string;
  newTask: string;
  newShopping: string;
  title: string;
  date: string;
  time: string;
  participants: string;
  assignee: string;
  due: string;
  quantity: string;
  category: string;
  both: string;
  shared: string;
  mine: string;
  done: string;
  all: string;
  noDue: string;
  noReminder: string;
  thirtyMin: string;
  language: string;
  widgetLine: string;
  emptyToday: string;
  emptyTodayHint: string;
  authLoginTitle: string;
  authLoginSubtitle: string;
  authInviteSubtitle: string;
  authEmailHelp: string;
  authEmailLabel: string;
  authOr: string;
  authApple: string;
  authGoogle: string;
  authContinue: string;
  familySetupTitle: string;
  familySetupCopy: string;
  defaultFamilyName: string;
  defaultUserName: string;
  familyNameLabel: string;
  userNameLabel: string;
  addPhoto: string;
  inviteCopy: string;
  acceptInviteTitle: string;
  acceptInviteCopy: string;
  acceptInviteFamilyMeta: string;
  acceptInviteJoin: string;
  acceptInviteSwitchAccount: string;
  tasksSubtitle: string;
  shoppingSubtitle: string;
  calendarSubtitle: string;
  shoppingSummaryBought: (purchasedCount: number) => string;
  shoppingSummaryMore: (remainingCount: number, purchasedCount: number) => string;
  weekDays: string[];
  monthJune2026: string;
  taskToday: string;
  taskWeek: string;
  taskNoDue: string;
  taskMaya: string;
  newTaskHint: string;
  shoppingAddItem: string;
  shoppingFrequent: string;
  shoppingQuickTitle: string;
  shoppingQuickHint: string;
  quickAddTitle: string;
  repeat: string;
  noRepeat: string;
  comment: string;
  addComment: string;
  completedToday: string;
  ownerDevice: string;
  connectedDevice: string;
  languageRussian: string;
  languagePolish: string;
  eventTitlePlaceholder: string;
  categoryOther: string;
  dueJune5: string;
  dueWeek: string;
  formatTodayDate: (day: number) => string;
  formatMonthDay: (day: number) => string;
  validation: Record<string, string>;
  preview: {
    today: string;
    allEvents: string;
    tasks: string;
    allTasks: string;
    shopping: string;
    list: string;
    itemCount: string;
  };
  tabs: Record<TabKey, string>;
  // Новые ключи для Today Screen
  tasksForToday: string;
  needToBuy: string;
  familyPulse: string;
  todaysProgress: string;
  tasksDone: (count: number) => string;
  eventsAhead: (count: number) => string;
  todayFree: string;
  allDone: string;
  fridgeFull: string;
  briefingSubtitle: (events: number, tasks: number, shopping: number) => string;
};

export const copy = {
  ru: {
    brand: "Doma",
    tagline: "Общий план вашей семьи",
    welcomeSubtitle: "События, дела и покупки —\nв одном спокойном месте.",
    legalText: "Продолжая, вы соглашаетесь\nс условиями использования и политикой конфиденциальности.",
    morning: "Доброе утро, Алексей",
    todayDate: "Сегодня, 3 июня",
    todayGreeting: "Доброе утро,\nАлексей 👋",
    synced: "Всё синхронизировано",
    syncedAgo: "Обновлено 1 мин назад",
    offline: "Нет соединения",
    offlineHint: "Изменения сохранятся позже",
    seeAll: "Смотреть все",
    upcoming: "Ближайшее",
    tasks: "Дела",
    shopping: "Покупки",
    calendar: "Календарь",
    family: "Семья",
    settings: "Настройки",
    save: "Сохранить",
    cancel: "Отмена",
    later: "Позже",
    createFamily: "Создать Doma",
    invitePartner: "Пригласите Маю",
    shareLink: "Поделиться ссылкой",
    start: "Начать",
    createFamilyAction: "Создать семью",
    haveInvite: "У меня есть приглашение",
    add: "Добавить",
    event: "Событие",
    task: "Дело",
    item: "Покупку",
    reminder: "Напоминание",
    newEvent: "Новое событие",
    newTask: "Новое дело",
    newShopping: "Новый товар",
    title: "Название",
    date: "Дата",
    time: "Время",
    participants: "Участники",
    assignee: "Ответственный",
    due: "Срок",
    quantity: "Количество",
    category: "Категория",
    both: "Алексей и Мая",
    shared: "Общее",
    mine: "Мои",
    done: "Выполнено",
    all: "Все",
    noDue: "Без срока",
    noReminder: "Не напоминать",
    thirtyMin: "За 30 минут",
    language: "Язык",
    widgetLine: "2 дела · 6 покупок",
    emptyToday: "Сегодня ничего не запланировано",
    emptyTodayHint: "Добавьте первое событие, дело или покупку.",
    authLoginTitle: "Войти в Doma",
    authLoginSubtitle: "Введите email, чтобы продолжить. Мы отправим ссылку для входа.",
    authInviteSubtitle: "Введите email, чтобы принять приглашение Алексея.",
    authEmailHelp: "Мы используем email только для входа и синхронизации вашего семейного плана.",
    authEmailLabel: "Email",
    authOr: "или",
    authApple: "Войти через Apple",
    authGoogle: "Войти через Google",
    authContinue: "Продолжить",
    familySetupTitle: "Создайте общий план",
    familySetupCopy: "Это семейное пространство для событий, дел, покупок и спокойной синхронизации.",
    defaultFamilyName: "Семья Алексея",
    defaultUserName: "Алексей",
    familyNameLabel: "Название семьи",
    userNameLabel: "Ваше имя",
    addPhoto: "Добавить фото",
    inviteCopy: "Отправьте ссылку, чтобы подключить общий план. Мая появится рядом с вами в Doma.",
    acceptInviteTitle: "Вас пригласили в Doma",
    acceptInviteCopy: "Алексей приглашает вас в общий план семьи. После подключения вы оба будете видеть события, дела и покупки.",
    acceptInviteFamilyMeta: "Алексей · Мая",
    acceptInviteJoin: "Присоединиться",
    acceptInviteSwitchAccount: "Войти другим аккаунтом",
    tasksSubtitle: "Планируйте и делитесь делами\nс семьёй",
    shoppingSubtitle: "Список покупок для дома\nи любимых людей",
    calendarSubtitle: "Месяц с событиями и планом",
    shoppingSummaryBought: (purchasedCount) => `Куплено ${purchasedCount}`,
    shoppingSummaryMore: (remainingCount, purchasedCount) => `+ ещё ${remainingCount} товара · куплено ${purchasedCount}`,
    weekDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    monthJune2026: "Июнь 2026",
    taskToday: "Сегодня",
    taskWeek: "На неделе",
    taskNoDue: "Без срока",
    taskMaya: "Маи",
    newTaskHint: "Быстро добавьте дело для себя или семьи",
    shoppingAddItem: "Добавить товар",
    shoppingFrequent: "Часто покупаем",
    shoppingQuickTitle: "Быстро добавляйте товары",
    shoppingQuickHint: "Введите название, например «Молоко 2 л»",
    quickAddTitle: "Что добавить?",
    repeat: "Повтор",
    noRepeat: "Не повторять",
    comment: "Комментарий",
    addComment: "Добавить комментарий...",
    completedToday: "Выполнено сегодня",
    ownerDevice: "Android · владелец",
    connectedDevice: "iPhone · подключена",
    languageRussian: "Русский",
    languagePolish: "Polski",
    eventTitlePlaceholder: "Врач",
    categoryOther: "Базовое",
    dueJune5: "До 5 июня",
    dueWeek: "На неделе",
    formatTodayDate: (day) => `Сегодня, ${day} июня`,
    formatMonthDay: (day) => `${day} июня`,
    validation: {
      title_required: "Добавьте название.",
      title_too_short: "Название должно быть не короче 2 символов.",
      title_too_long: "Название должно быть не длиннее 80 символов.",
      email_required: "Введите email.",
      email_invalid: "Введите корректный email.",
      family_name_required: "Введите название семьи.",
      user_name_required: "Введите ваше имя.",
      name_too_long: "Имя должно быть не длиннее 60 символов.",
      date_required: "Выберите дату.",
      time_required: "Выберите время.",
      quantity_too_long: "Количество должно быть не длиннее 32 символов.",
      category_required: "Укажите категорию."
    },
    preview: {
      today: "Сегодня",
      allEvents: "Все события",
      tasks: "Дела",
      allTasks: "Все дела",
      shopping: "Покупки",
      list: "Список",
      itemCount: "4 товара"
    },
    tabs: {
      today: "Сегодня",
      calendar: "Календарь",
      tasks: "Дела",
      shopping: "Покупки"
    },
    tasksForToday: "Дела",
    needToBuy: "Покупки",
    familyPulse: "Семья сегодня",
    todaysProgress: "Прогресс дня",
    tasksDone: (count) => `${count} дел выполнено`,
    eventsAhead: (count) => `${count} события впереди`,
    todayFree: "Сегодня свободный день 🍃",
    allDone: "Все дела сделаны",
    fridgeFull: "Холодильник полон",
    briefingSubtitle: (e, t, s) => `${e} события, ${t} задач, ${s} покупок`
  },
  pl: {
    brand: "Doma",
    tagline: "Wspólny plan rodziny",
    welcomeSubtitle: "Wydarzenia, sprawy i zakupy —\nw jednym spokojnym miejscu.",
    legalText: "Kontynuując, akceptujesz\nwarunki korzystania i politykę prywatności.",
    morning: "Dzień dobry, Alex",
    todayDate: "Dzisiaj, 3 czerwca",
    todayGreeting: "Dzień dobry,\nAlex 👋",
    synced: "Wszystko zsynchronizowane",
    syncedAgo: "Zaktualizowano 1 min temu",
    offline: "Brak połączenia",
    offlineHint: "Zmiany zapiszą się później",
    seeAll: "Zobacz wszystko",
    upcoming: "Najbliższe",
    tasks: "Sprawy",
    shopping: "Zakupy",
    calendar: "Kalendarz",
    family: "Rodzina",
    settings: "Ustawienia",
    save: "Zapisz",
    cancel: "Anuluj",
    later: "Później",
    createFamily: "Utwórz Doma",
    invitePartner: "Zaproś Maję",
    shareLink: "Udostępnij link",
    start: "Start",
    createFamilyAction: "Utwórz rodzinę",
    haveInvite: "Mam zaproszenie",
    add: "Dodaj",
    event: "Wydarzenie",
    task: "Sprawę",
    item: "Zakup",
    reminder: "Przypomnienie",
    newEvent: "Nowe wydarzenie",
    newTask: "Nowa sprawa",
    newShopping: "Nowy produkt",
    title: "Nazwa",
    date: "Data",
    time: "Godzina",
    participants: "Uczestnicy",
    assignee: "Osoba",
    due: "Termin",
    quantity: "Ilość",
    category: "Kategoria",
    both: "Alex i Maja",
    shared: "Wspólne",
    mine: "Moje",
    done: "Zrobione",
    all: "Wszystkie",
    noDue: "Bez terminu",
    noReminder: "Bez przypomnienia",
    thirtyMin: "30 minut przed",
    language: "Język",
    widgetLine: "2 sprawy · 6 zakupów",
    emptyToday: "Dzisiaj nic nie zaplanowano",
    emptyTodayHint: "Dodaj pierwsze wydarzenie, sprawę albo zakup.",
    authLoginTitle: "Zaloguj się do Doma",
    authLoginSubtitle: "Wpisz email, aby kontynuować. Wyślemy link do logowania.",
    authInviteSubtitle: "Wpisz email, aby przyjąć zaproszenie Alexa.",
    authEmailHelp: "Używamy emaila tylko do logowania i synchronizacji rodzinnego planu.",
    authEmailLabel: "Email",
    authOr: "albo",
    authApple: "Zaloguj przez Apple",
    authGoogle: "Zaloguj przez Google",
    authContinue: "Kontynuuj",
    familySetupTitle: "Utwórz wspólny plan",
    familySetupCopy: "To rodzinna przestrzeń na wydarzenia, sprawy, zakupy i spokojną synchronizację.",
    defaultFamilyName: "Rodzina Alexa",
    defaultUserName: "Alex",
    familyNameLabel: "Nazwa rodziny",
    userNameLabel: "Twoje imię",
    addPhoto: "Dodaj zdjęcie",
    inviteCopy: "Wyślij link, aby połączyć wspólny plan. Maja pojawi się obok Ciebie w Doma.",
    acceptInviteTitle: "Zaproszono Cię do Doma",
    acceptInviteCopy: "Alex zaprasza Cię do wspólnego planu rodziny. Po dołączeniu zobaczycie wydarzenia, sprawy i zakupy.",
    acceptInviteFamilyMeta: "Alex · Maja",
    acceptInviteJoin: "Dołącz",
    acceptInviteSwitchAccount: "Zaloguj na inne konto",
    tasksSubtitle: "Planujcie i dzielcie się\nsprawami z rodziną",
    shoppingSubtitle: "Lista zakupów dla domu\ni bliskich",
    calendarSubtitle: "Miesiąc wydarzeń i planów",
    shoppingSummaryBought: (purchasedCount) => `Kupiono ${purchasedCount}`,
    shoppingSummaryMore: (remainingCount, purchasedCount) => `+ jeszcze ${remainingCount} produkty · kupiono ${purchasedCount}`,
    weekDays: ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"],
    monthJune2026: "Czerwiec 2026",
    taskToday: "Dzisiaj",
    taskWeek: "W tym tygodniu",
    taskNoDue: "Bez terminu",
    taskMaya: "Mai",
    newTaskHint: "Szybko dodaj sprawę dla siebie albo rodziny",
    shoppingAddItem: "Dodaj produkt",
    shoppingFrequent: "Często kupowane",
    shoppingQuickTitle: "Dodawaj produkty szybko",
    shoppingQuickHint: "Wpisz nazwę, np. „Mleko 2 l”",
    quickAddTitle: "Co dodać?",
    repeat: "Powtarzanie",
    noRepeat: "Nie powtarzaj",
    comment: "Komentarz",
    addComment: "Dodaj komentarz...",
    completedToday: "Zrobione dzisiaj",
    ownerDevice: "Android · właściciel",
    connectedDevice: "iPhone · połączona",
    languageRussian: "Русский",
    languagePolish: "Polski",
    eventTitlePlaceholder: "Lekarz",
    categoryOther: "Inne",
    dueJune5: "Do 5 czerwca",
    dueWeek: "W tygodniu",
    formatTodayDate: (day) => `Dzisiaj, ${day} czerwca`,
    formatMonthDay: (day) => `${day} czerwca`,
    validation: {
      title_required: "Dodaj nazwę.",
      title_too_short: "Nazwa musi mieć co najmniej 2 znaki.",
      title_too_long: "Nazwa może mieć maksymalnie 80 znaków.",
      email_required: "Wpisz email.",
      email_invalid: "Wpisz poprawny email.",
      family_name_required: "Wpisz nazwę rodziny.",
      user_name_required: "Wpisz swoje imię.",
      name_too_long: "Nazwa może mieć maksymalnie 60 znaków.",
      date_required: "Wybierz datę.",
      time_required: "Wybierz godzinę.",
      quantity_too_long: "Ilość może mieć maksymalnie 32 znaki.",
      category_required: "Podaj kategorię."
    },
    preview: {
      today: "Dzisiaj",
      allEvents: "Wszystkie wydarzenia",
      tasks: "Sprawy",
      allTasks: "Wszystkie sprawy",
      shopping: "Zakupy",
      list: "Lista",
      itemCount: "4 produkty"
    },
    tabs: {
      today: "Dzisiaj",
      calendar: "Kalendarz",
      tasks: "Sprawy",
      shopping: "Zakupy"
    },
    tasksForToday: "Sprawy",
    needToBuy: "Zakupy",
    familyPulse: "Rodzina dzisiaj",
    todaysProgress: "Postęp dnia",
    tasksDone: (count) => `${count} spraw zrobione`,
    eventsAhead: (count) => `${count} wydarzenia przed nami`,
    todayFree: "Dzisiaj wolny dzień 🍃",
    allDone: "Wszystkie sprawy załatwione",
    fridgeFull: "Lodówka jest pełna",
    briefingSubtitle: (e, t, s) => `${e} wydarzenia, ${t} spraw, ${s} zakupów`
  }
} satisfies Record<Language, DomaCopy>;

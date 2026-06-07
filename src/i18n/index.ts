import { Language, TabKey } from "../types";

type DomaCopy = {
  brand: string;
  tagline: string;
  morning: string;
  todayDate: string;
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
  tabs: Record<TabKey, string>;
};

export const copy = {
  ru: {
    brand: "Doma",
    tagline: "Общий план вашей семьи",
    morning: "Доброе утро, Алексей",
    todayDate: "Сегодня, 3 июня",
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
    tabs: {
      today: "Сегодня",
      calendar: "Календарь",
      tasks: "Дела",
      shopping: "Покупки"
    }
  },
  pl: {
    brand: "Doma",
    tagline: "Wspólny plan rodziny",
    morning: "Dzień dobry, Alex",
    todayDate: "Dzisiaj, 3 czerwca",
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
    tabs: {
      today: "Dzisiaj",
      calendar: "Kalendarz",
      tasks: "Sprawy",
      shopping: "Zakupy"
    }
  }
} satisfies Record<Language, DomaCopy>;

# Doma — Localization

## Purpose

Doma MVP supports:

```text
ru
pl
```

All user-facing strings must go through localization files.

## Files

Recommended structure:

```text
/src/i18n
  index.ts
  ru.json
  pl.json
```

Do not hardcode UI strings in components.

## Locale rules

Default language:

```text
ru
```

If device language is Polish:

```text
pl
```

If unsupported:

```text
ru
```

User names are not translated. They are user data.

## Core navigation

| Key | RU | PL |
|---|---|---|
| tabs.today | Сегодня | Dzisiaj |
| tabs.calendar | Календарь | Kalendarz |
| tabs.tasks | Дела | Sprawy |
| tabs.shopping | Покупки | Zakupy |

## Auth strings

| Key | RU | PL |
|---|---|---|
| auth.welcome.title | Общий план вашей семьи | Wspólny plan Twojej rodziny |
| auth.welcome.subtitle | События, дела и покупки — в одном спокойном месте. | Wydarzenia, sprawy i zakupy — w jednym spokojnym miejscu. |
| auth.createFamily | Создать семью | Utwórz rodzinę |
| auth.haveInvite | У меня есть приглашение | Mam zaproszenie |
| auth.login.title | Войти в Doma | Zaloguj się do Doma |
| auth.login.subtitle | Введите email, чтобы продолжить. Мы отправим ссылку для входа. | Wpisz email, aby kontynuować. Wyślemy link do logowania. |
| auth.email | Email | Email |
| auth.continue | Продолжить | Kontynuuj |
| auth.apple | Войти через Apple | Zaloguj przez Apple |
| auth.google | Войти через Google | Zaloguj przez Google |
| auth.emailHelp | Мы используем email только для входа и синхронизации вашего семейного плана. | Używamy emaila tylko do logowania i synchronizacji rodzinnego planu. |

## Family strings

| Key | RU | PL |
|---|---|---|
| family.create.title | Создайте вашу семью | Utwórz swoją rodzinę |
| family.create.subtitle | Так Doma поймёт, чей общий план нужно синхронизировать. | Dzięki temu Doma wie, który wspólny plan synchronizować. |
| family.name | Название семьи | Nazwa rodziny |
| family.defaultName | Семья Алексея | Rodzina Alexa |
| family.yourName | Ваше имя | Twoje imię |
| family.profilePhoto | Фото профиля | Zdjęcie profilowe |
| family.addPhoto | Добавить фото | Dodaj zdjęcie |
| family.createDoma | Создать Doma | Utwórz Doma |
| family.inviteMaya | Пригласите Маю | Zaproś Maję |
| family.invitePartner | Пригласите партнёра | Zaproś partnera |
| family.shareInvite | Поделиться ссылкой | Udostępnij link |
| family.later | Сделать позже | Zrobię to później |

## Today strings

| Key | RU | PL |
|---|---|---|
| today.greetingMorning | Доброе утро, {{name}} | Dzień dobry, {{name}} |
| today.upcoming | Ближайшее | Najbliższe |
| today.viewAll | Смотреть все | Zobacz wszystko |
| today.syncOk | Всё синхронизировано | Wszystko zsynchronizowane |
| today.updatedNow | Обновлено только что | Zaktualizowano przed chwilą |
| today.emptyTitle | Сегодня спокойно | Dziś spokojnie |
| today.emptyDescription | На сегодня пока нет событий, дел или покупок. | Na dziś nie ma jeszcze wydarzeń, spraw ani zakupów. |

## Event strings

| Key | RU | PL |
|---|---|---|
| event.new | Новое событие | Nowe wydarzenie |
| event.title | Название | Nazwa |
| event.date | Дата | Data |
| event.time | Время | Godzina |
| event.participants | Участники | Uczestnicy |
| event.remind | Напомнить | Przypomnij |
| event.repeat | Повтор | Powtarzanie |
| event.comment | Комментарий | Komentarz |
| event.save | Сохранить | Zapisz |
| event.noRepeat | Не повторять | Nie powtarzaj |
| event.remind30 | За 30 минут | 30 minut wcześniej |
| event.details | Детали события | Szczegóły wydarzenia |
| event.edit | Редактировать | Edytuj |
| event.delete | Удалить | Usuń |

## Task strings

| Key | RU | PL |
|---|---|---|
| task.title | Дела | Sprawy |
| task.new | Новое дело | Nowa sprawa |
| task.all | Все | Wszystkie |
| task.mine | Мои | Moje |
| task.maya | Маи | Mai |
| task.shared | Общие | Wspólne |
| task.done | Выполнено | Zrobione |
| task.today | Сегодня | Dzisiaj |
| task.week | На неделе | W tygodniu |
| task.noDue | Без срока | Bez terminu |
| task.assignee | Ответственный | Osoba odpowiedzialna |
| task.complete | Отметить выполненным | Oznacz jako zrobione |

## Shopping strings

| Key | RU | PL |
|---|---|---|
| shopping.title | Покупки | Zakupy |
| shopping.subtitle | Список покупок для дома и любимых людей | Lista zakupów dla domu i bliskich |
| shopping.addItem | Добавить товар | Dodaj produkt |
| shopping.frequent | Часто покупаем | Często kupowane |
| shopping.edit | Изменить | Edytuj |
| shopping.emptyTitle | Список покупок пуст | Lista zakupów jest pusta |
| shopping.emptyDescription | Добавьте то, что нужно купить. | Dodaj to, co trzeba kupić. |

## Shopping categories

| RU | PL |
|---|---|
| Молочное | Nabiał |
| Овощи и фрукты | Warzywa i owoce |
| Хлеб и выпечка | Chleb i wypieki |
| Мясо и рыба | Mięso i ryby |
| Дом | Dom |
| Аптека | Apteka |
| Другое | Inne |

## Reminder strings

| RU | PL |
|---|---|
| Не напоминать | Nie przypominaj |
| За 5 минут | 5 minut wcześniej |
| За 15 минут | 15 minut wcześniej |
| За 30 минут | 30 minut wcześniej |
| За 1 час | 1 godzinę wcześniej |
| За день | 1 dzień wcześniej |
| Настроить | Ustaw własne |

## Repeat strings

| RU | PL |
|---|---|
| Не повторять | Nie powtarzaj |
| Каждый день | Codziennie |
| Каждую неделю | Co tydzień |
| Каждый месяц | Co miesiąc |
| Каждый год | Co rok |

## Error strings

| Key | RU | PL |
|---|---|---|
| error.load | Не удалось загрузить данные | Nie udało się załadować danych |
| error.save | Не удалось сохранить | Nie udało się zapisać |
| error.sync | Не удалось синхронизировать | Nie udało się zsynchronizować |
| error.login | Не удалось войти | Nie udało się zalogować |
| error.invalidEmail | Введите корректный email | Wpisz poprawny email |
| error.requiredTitle | Введите название | Wpisz nazwę |
| error.requiredFamilyName | Введите название семьи | Wpisz nazwę rodziny |
| error.requiredUserName | Введите ваше имя | Wpisz swoje imię |

## Implementation rule

Every new UI string must be added to both:

```text
ru.json
pl.json
```

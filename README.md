# GeoShifts - React Native App

Мобильное приложение для поиска доступных смен для подработки на основе геолокации пользователя.

## 📋 Описание задания

Создать небольшое приложение на React Native (CLI, без Expo), которое показывает список доступных смен для подработки, полученных по геолокации пользователя.

### Функциональные требования

- ✅ При первом запуске запросить точную геолокацию пользователя
- ✅ Получить список смен в городе, передав координаты пользователя в запрос
- ✅ Отобразить список смен с краткой информацией
- ✅ По нажатию на элемент списка открыть экран с подробными данными выбранной смены
- ✅ Данные для экрана деталей брать из ранее полученного списка (без повторного запроса)
- ✅ Pull-to-refresh для обновления списка

### API

**Endpoint**: `https://mobile.handswork.pro/api/shifts/map-list-unauthorized`

**Параметры**: `latitude`, `longitude`

### Поля данных смены

| Поле                     | Тип            | Описание                          |
| ------------------------ | -------------- | --------------------------------- |
| `logo`                   | string         | Ссылка на логотип нанимателя      |
| `address`                | string         | Адрес проведения смены            |
| `companyName`            | string         | Имя компании нанимателя           |
| `dateStartByCity`        | string         | Дата начала смены                 |
| `timeStartByCity`        | string         | Время начала                      |
| `timeEndByCity`          | string         | Время окончания                   |
| `currentWorkers`         | number         | Сколько людей уже набрано         |
| `planWorkers`            | number         | Сколько людей требуется           |
| `workTypes`              | array          | Наименование типа услуги          |
| `priceWorker`            | number         | Сумма выплаты за смену (в рублях) |
| `customerFeedbacksCount` | string         | Количество отзывов о клиенте      |
| `customerRating`         | number \| null | Рейтинг нанимателя (максимум 5)   |

## 🛠 Технологии

- **React Native CLI** (v0.81.4) - без Expo
- **TypeScript** - строгая типизация
- **MobX** + mobx-react-lite - управление состоянием
- **React Navigation** - навигация (Stack Navigator)
- **Axios** - HTTP клиент для API запросов
- **@react-native-community/geolocation** - получение геолокации

### Архитектура

Проект построен по методологии **Feature-Sliced Design (FSD)**:

```
src/
├── app/              # Инициализация приложения, провайдеры
├── processes/        # Навигация, геолокация
├── pages/            # Экраны (ShiftsList, ShiftDetails)
├── entities/         # Бизнес-сущности (Shift)
├── shared/           # Переиспользуемый код (UI, API, utils)
```

## 📦 Установка

### Требования

- Node.js >= 20
- React Native development environment ([инструкция](https://reactnative.dev/docs/environment-setup))
- Xcode (для iOS)
- Android Studio (для Android)

### Шаги установки

1. Клонируйте репозиторий:

```bash
git clone https://github.com/YOUR_USERNAME/geo-shifts.git
cd geo-shifts
```

2. Установите зависимости:

```bash
npm install
```

3. Установите pods для iOS:

```bash
cd ios && pod install && cd ..
```

## 🚀 Запуск

### iOS

```bash
npm run ios
```

### Android

```bash
npm run android
```

### Dev Server (Metro)

```bash
npm start
```

## 📱 Разрешения

### iOS (Info.plist)

- `NSLocationWhenInUseUsageDescription` - доступ к геолокации

### Android (AndroidManifest.xml)

- `ACCESS_FINE_LOCATION` - точная геолокация
- `ACCESS_COARSE_LOCATION` - приблизительная геолокация

## 🏗 Структура проекта

```
geo-shifts/
├── src/
│   ├── app/
│   │   └── index.tsx                    # Root компонент с провайдерами
│   ├── processes/
│   │   ├── navigation/                  # Конфигурация навигации
│   │   │   ├── types.ts
│   │   │   └── AppNavigator.tsx
│   │   └── geo/                         # Модуль геолокации
│   │       └── model/
│   │           └── geolocation.ts
│   ├── pages/
│   │   ├── shifts-list/                 # Экран списка смен
│   │   │   └── ui/
│   │   │       └── ShiftsListScreen.tsx
│   │   └── shift-details/               # Экран деталей смены
│   │       └── ui/
│   │           └── ShiftDetailsScreen.tsx
│   ├── entities/
│   │   └── shift/                       # Сущность "Смена"
│   │       ├── api/
│   │       │   └── shifts.ts           # API запросы
│   │       ├── model/
│   │       │   ├── types.ts            # TypeScript типы
│   │       │   └── shifts.store.ts     # MobX store
│   │       └── ui/
│   │           └── ShiftCard.tsx       # Карточка смены
│   └── shared/
│       ├── api/
│       │   └── client.ts               # Axios client
│       ├── config/
│       │   └── constants.ts            # API константы
│       ├── ui/
│       │   ├── Loader.tsx              # Индикатор загрузки
│       │   └── ErrorView.tsx           # Экран ошибки
│       └── lib/
│           ├── date.ts                 # Форматирование дат
│           └── number.ts               # Форматирование чисел
├── ios/                                 # iOS нативный проект
├── android/                             # Android нативный проект
└── App.tsx                              # Entry point

```

## 🎨 Особенности реализации

### MobX Store

Централизованное управление состоянием через `shiftsStore`:

- Загрузка списка смен
- Индикация состояния загрузки
- Обработка ошибок
- Кеширование данных для экрана деталей

### Навигация

React Navigation с типизированными параметрами:

- Stack Navigator для переходов между экранами
- Type-safe navigation props

### UI/UX

- Pull-to-refresh для обновления списка
- Обработка состояний: loading, error, success
- Оптимизация списка через `FlatList` и `React.memo`
- Красивые карточки с тенями и скруглениями
- Индикация рейтинга и отзывов

### Производительность

- `FlatList` для виртуализации длинных списков
- `React.memo` для оптимизации рендеринга карточек
- Ленивая загрузка навигации

## 🐛 Troubleshooting

### Metro cache issues

```bash
npm start -- --reset-cache
```

### iOS build issues

```bash
cd ios && pod install && cd ..
```

### Android build issues

```bash
cd android && ./gradlew clean && cd ..
```

## 📝 Лицензия

MIT

## 👨‍💻 Автор

Ваше имя

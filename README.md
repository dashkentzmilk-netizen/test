# Widget Catalog - Виджет каталога товаров

Виджет каталога с функцией вывода товаров, фильтрацией и корзиной, разработанный на React, MobX, TypeScript.

## 🚀 Демо

- **GitHub Pages**: [Ссылка на демо](https://dashkentzmilk-netizen.github.io/test/dist)

## 📋 Описание

Виджет представляет собой каталог товаров с тремя основными страницами:

- **Главная** - карусель с товарами
- **Каталог** - полный каталог с фильтрацией
- **Корзина** - управление выбранными товарами

### Основные возможности

✅ **Инициализация по требованию** - виджет загружается только при необходимости  
✅ **Фильтрация по дилерам** - поддержка множественного выбора дилеров  
✅ **Сортировка по цене** - по возрастанию/убыванию  
✅ **Корзина с localStorage** - сохранение состояния на 10 минут  
✅ **Адаптивный дизайн** - изолированные стили, независимые от сайта  
✅ **URL состояние** - сохранение параметров фильтрации в URL  
✅ **Восстановление состояния** - после перезагрузки страницы

## 🛠 Технологический стек

- **React 18** - UI библиотека
- **MobX** - управление состоянием
- **TypeScript** - типизация
- **Webpack** - сборка
- **Ant Design** - UI компоненты
- **SCSS** - стилизация

## 📦 Установка и запуск

### Разработка

```bash
# Клонирование репозитория
git clone https://github.com/your-username/widget-catalog.git
cd widget-catalog

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

### Сборка для продакшена

```bash
# Сборка проекта
npm run build

# Проверка типов TypeScript
npm run type-check
```

## 🔧 Использование

### Базовое подключение

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Widget Catalog Demo</title>
  </head>
  <body>
    <div id="widget-catalog"></div>

    <script type="text/javascript">
      function initWidgetCatalog() {
        const widget = new window.WidgetCatalog({
          el: "#widget-catalog",
          dealers: [], // Пустой массив - загрузка всех дилеров
        });
        widget.run();
      }
    </script>

    <link
      rel="stylesheet"
      href="https://dashkentzmilk-netizen.github.io/test/dist/widget-catalog.css"
    />
    <script
      async
      src="https://dashkentzmilk-netizen.github.io/test/dist/widget-catalog.js"
      onload="initWidgetCatalog()"
    ></script>
  </body>
</html>
```

### Подключение с фильтрацией по дилерам

```html
<script type="text/javascript">
  function initWidgetCatalog() {
    const widget = new window.WidgetCatalog({
      el: "#widget-catalog",
      dealers: ["0c4aab30", "86e64a33"], // Конкретные дилеры
    });
    widget.run();
  }
</script>
```

## 📱 Функциональность

### Главная страница

- Карусель с ограничением в 5 видимых карточек
- Минимальная цена от 10
- Если товаров с нужной ценой менее 5 - показ 8 любых товаров

### Каталог

- **Фильтрация по дилерам**: кнопки-теги с множественным выбором
- **Сортировка по цене**: не активно / по возрастанию / по убыванию
- **Карточки товаров**: фото, заголовок, стоимость, кнопка добавления
- **Мульти-добавление**: счетчик количества товаров в корзине

### Корзина

- Список добавленных товаров
- Удаление отдельных товаров или всех сразу
- Итоговая стоимость
- Счетчик товаров в шапке

## 🔌 API

Виджет использует следующие API endpoints:

```typescript
// Получить список товаров всех дилеров
GET https://test-frontend.dev.int.perx.ru/api/goods/


// Получить список товаров определённых дилеров
GET https://test-frontend.dev.int.perx.ru/api/goods/?dealers=0c4aab30,86e64a33


// Получить список идентификаторов дилеров
GET https://test-frontend.dev.int.perx.ru/api/dealers/


// Изображение товара
GET https://test-frontend.dev.int.perx.ru/logo/node.png
```

## 📝 Скрипты

```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для продакшена
npm run type-check   # Проверка TypeScript типов
```

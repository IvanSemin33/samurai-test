# Health Samurai test [![CircleCI](https://circleci.com/gh/IvanSemin33/samurai-test.svg?style=svg)](https://circleci.com/gh/IvanSemin33/samurai-test)

## Demo
https://health-samurai-test.web.app/

## Installation
```
git clone https://github.com/IvanSemin33/samurai-test.git
cd samurai-test
yarn install
yarn start
```

## Authorization
Client ID: `auth-client`

Client Secret: `verysecret`

## Task
Необходимо разработать web-приложение (SPA), используя React, поверх платформы Aidbox (готовый backend).

Приложение должно позволить пользователю войти в приложение (существующий пользователь) и управлять списком пациентов: просмотр списка пациентов, поиск, создание, удаление, редактирование, валидация. 

Модель данных для пациента необходимо из международного стандарта HL7 FHIR: https://www.hl7.org/fhir/patient.html. Aidbox поддерживает FHIR стандарт и эта модель данных там уже есть на уровне структуры БД.

Если сможете покрыть приложение автотесами и настроить CI - будет здорово!

Для разработки можно использовать облачную версию Aidbox (http://aidbox.app/) или локальную версию для разработки (https://docs.aidbox.app/installation/setup-aidbox.dev). 
Документация на платформу: http://docs.aidbox.app/.

## Features

- Авторизация
    - вход (OAuth 2.0)
    - сохранение токена в LoacalStorage
    - валидация
    - выход
- Таблица пациентов
    - сортировка по нескольким столбцам
    - поиск по всем столбцам
    - создание
    - удаление
    - редактирование
    - валидация (международный стандарт HL7 FHIR)
    - паггинация
- Загрузка при каждом запросе 
- Тесты

## Stack
- React
- Redux
- Material UI
- Node.js
- Aidbox.Cloud
- Firebase Hosting
- Circle CI

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

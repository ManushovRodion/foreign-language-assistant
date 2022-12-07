# DataBase

> Это локальная база построенная на базе [indexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB) и библиотеки [idb](https://www.npmjs.com/package/idb)

Данные для подключения лежат в .ENV файле

- VITE_INDEXDB_NAME: название базы
- VITE_INDEXDB_VERSION: версия базы

### # Использование

У модуля "@/dataBase" есть:

- dataBase: обьект содержащий:
  - dataBase.connect: конект к бд indexDB, через пакет idb, на случай если надо написать свое api за пределами модуля. Но лучше расширить api таблицы!
  - dataBase.table: содержит в себе перечень таблиц базы с api этих таблиц
- dataBaseName: название базы
- dataBaseVersion: версия базы

```js
// Вызов метода таблицы

import { dataBase } from "@/dataBase";

await dataBase.table.WordsLabel.create({ name: "Test" });
```

```js
// Свое api за пределами папки с базой (@/dataBase), но лучше расширить api

import { dataBase } from "@/dataBase";
import { type WordsLabelId, TABLE_NAME } from "@/dataBase/WordsLabel";

async function findById(id: WordsLabelId) {
  return (await dataBase).get(TABLE_NAME, id);
}
```

```js
// Название базы и ее версия

import { dataBaseName, dataBaseVersion } from "@/dataBase";

console.log(dataBaseName, dataBaseVersion);
```

### # Добавление новой таблицы в базу

1. В модуле "@/dataBase" создать папку с названием таблицы
2. Внутри папки таблицы должен быть файл с методом "createApi". Содержит в себе все основные методы для работы с таблицей.

   ```js
   // createApi.ts

   import type { Connect } from "../types";
   import type { Api } from "./types";

   export const createApi = (connect: Connect): Api => {
     return {};
   };
   ```

3. Файл констант, где обязательная константа "TABLE", которая содержит название таблицы

   ```js
   // constants.ts

   export const TABLE = "Test";
   ```

4. Файл с хуками "hooks.ts", по которым топает idb для indexDB. Обязательно содержит хук upgrade, который описывает создание таблицы в indexDB

   ```js
   // hooks.ts

   import type { Context } from "../types";
   import { TABLE } from "./constants";

   export const upgrade = (context: Context) => {
     context.createObjectStore(TABLE, {
       keyPath: "id",
       autoIncrement: true,
     });
   };
   ```

5. Файл с типами "types.ts"

   ```js
   // types.ts

   import type { TABLE } from "./constants";

   // ID сущности
   export type TestId = number;

   // Сущность для создания
   export type CreateWordsLabel = {
     name: string,
   };

   // Сущность для обновления
   export type UpdateWordsLabel = {
     name: string,
   };

   // Сущность
   export type WordsLabel = {
     name: string,
     id: WordsLabelId,
   };

   // Api что возвращает функция createApi
   export type Api = {};

   // Схема, которая описывает api модуль по таблице. Обязательно
   export type TablesApiWordsLabel = {
     [TABLE]: Api,
   };

   // Схема, которая описывает таблицу. Обязательно
   export type DBSchemaWordsLabel = {
     [TABLE]: {
       value: WordsLabel,
       key: WordsLabelId,
     },
   };
   ```

6. Файл "index.ts"

   ```js
   // index.ts

   export * from "./types";
   export { TABLE } from "./constants";

   export { upgrade } from "./hooks";
   export { createApi } from "./createApi";
   ```

7. Дальше надо инициализировать таблицу в файле "createDataBase.ts" в корне модуля "@/dataBase":
   1. Надо импортировать нашу таблицу
   2. Подключить хуки
   3. Инициализировать таблицу
8. Подключить типы таблицы в файле "types.ts" в корне модуля "@/dataBase":
   1. Подключить схему, которая описывает таблицу.
   2. Подключить схему, которая описывает api модуль по таблице.

Примечание:

1. Если есть таблица связей, то для нее необходимо (пример в таблице WordsLabel):
   1. Создать константу LINK_TABLE\_{НАЗВАНИЕ СУЩНОСТИ С КОТОРОЙ БУДЕТ СВЯЗЬ} и экспортировать ее
   2. Название таблицы связи: {Название сущности}{Название сущности к которой будет связь}
   3. Связь описываем в той сущности, которая привязывается к нужной сущности

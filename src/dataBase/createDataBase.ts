import { openDB } from "idb";
import type { DataBase, HookUpgrade, SchemaDataBase, Tables } from "./types";

/**
 * Импортируем таблицу
 */
import * as WordsLabel from "./Wordslabel";
import * as WordsItem from "./WordsItem";
import * as WordsGroup from "./WordsGroup";
import * as WordsCard from "./WordsCard";

export const createDataBase = (name: string, version: number): DataBase => {
  /**
   * Подключаем хуки
   */

  const upgradeList: HookUpgrade[] = [
    WordsLabel.upgrade,
    WordsItem.upgrade,
    WordsGroup.upgrade,
    WordsCard.upgrade,
  ];

  const connect = openDB<SchemaDataBase>(name, version, {
    upgrade(db) {
      upgradeList.forEach((method) => method(db));
    },
  });

  const table: Tables = {} as Tables;

  /**
   * Инициализируем таблицу
   */

  table[WordsLabel.TABLE] = WordsLabel.createApi(connect);
  table[WordsItem.TABLE] = WordsItem.createApi(connect);
  table[WordsGroup.TABLE] = WordsGroup.createApi(connect);
  table[WordsCard.TABLE] = WordsCard.createApi(connect);

  return {
    connect,
    table,
  };
};

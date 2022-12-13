import type { DBSchema, IDBPDatabase } from "idb";

// ======================================================================

import type * as Wordslabel from "./Wordslabel";
import type * as WordsItem from "./WordsItem";
import type * as WordsGroup from "./WordsGroup";
import type * as WordsCard from "./WordsCard";

/**
 * Подключаем интерфейс API
 */

export interface Tables
  extends Wordslabel.TablesApi,
    WordsItem.TablesApi,
    WordsGroup.TablesApi,
    WordsCard.TablesApi {}

/**
 * Подключаем схему IDB
 */

export interface SchemaDataBase
  extends DBSchema,
    Wordslabel.DBSchema,
    WordsItem.DBSchema,
    WordsGroup.DBSchema,
    WordsCard.DBSchema {}

// ======================================================================

export type Context = IDBPDatabase<SchemaDataBase>;

export type Connect = Promise<Context>;

export type HookUpgrade = (db: Context) => void;

export interface DataBase {
  connect: Connect;
  table: Tables;
}

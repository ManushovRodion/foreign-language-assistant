import type { DBSchema, IDBPDatabase } from "idb";

// ======================================================================

import type { TablesApiWordsLabel, DBSchemaWordsLabel } from "./Wordslabel";
import type { TablesApiWordsItem, DBSchemaWordsItem } from "./WordsItem";
import type { TablesApiWordsGroup, DBSchemaWordsGroup } from "./WordsGroup";
import type { TablesApiWordsCard, DBSchemaWordsCard } from "./WordsCard";

/**
 * Подключаем интерфейс API
 */

export interface Tables
  extends TablesApiWordsLabel,
    TablesApiWordsItem,
    TablesApiWordsGroup,
    TablesApiWordsCard {}

/**
 * Подключаем схему IDB
 */

export interface SchemaDataBase
  extends DBSchema,
    DBSchemaWordsLabel,
    DBSchemaWordsItem,
    DBSchemaWordsGroup,
    DBSchemaWordsCard {}

// ======================================================================

export type Context = IDBPDatabase<SchemaDataBase>;

export type Connect = Promise<Context>;

export type HookUpgrade = (db: Context) => void;

export interface DataBase {
  connect: Connect;
  table: Tables;
}

import type { createApi } from "./createApi";
import type { TABLE } from "./constants";

export type WordsGroupId = number;

export interface CreateWordsItem {
  original: string;
  translate: string;
}

// not use`s
export interface UpdateWordsItem {}

export interface WordsItem {
  original: string;
  translate: string;
  groupId: WordsGroupId;
}

export interface TableWordsItem {
  original: string;
  translate: string;
  groupId: WordsGroupId;
}

export interface TablesApi {
  [TABLE]: ReturnType<typeof createApi>;
}

export interface DBSchema {
  [TABLE]: {
    value: TableWordsItem;
    key: WordsGroupId;
    indexes: { groupId: WordsGroupId };
  };
}

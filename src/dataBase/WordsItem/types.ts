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
}

export interface TableWordsItem {
  original: string;
  translate: string;
  groupId: WordsGroupId;
}

export interface TablesApiWordsItem {
  [TABLE]: ReturnType<typeof createApi>;
}

export interface DBSchemaWordsItem {
  [TABLE]: {
    value: TableWordsItem;
    key: WordsGroupId;
    indexes: { groupId: WordsGroupId };
  };
}

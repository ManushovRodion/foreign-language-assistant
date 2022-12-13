import type { createApi } from "./createApi";
import type { TABLE } from "./constants";

export type WordsGroupId = number;
export type WordsCardId = number;

export interface CreateWordsGroup {
  title: string;
}

export interface UpdateWordsGroup {
  title: string;
}

export interface WordsGroup {
  title: string;
  id: WordsGroupId;
}

export interface TableWordsGroup {
  title: string;
  cardId: WordsCardId;
}

export interface TablesApi {
  [TABLE]: ReturnType<typeof createApi>;
}

export interface DBSchema {
  [TABLE]: {
    value: TableWordsGroup;
    key: WordsCardId;
    indexes: { cardId: WordsCardId };
  };
}

import type { createApi } from "./createApi";
import type { TABLE } from "./constants";

export type WordsCardId = number;

export interface CreateWordsCard {
  title: string;
  dateCreated?: Date;
}

export interface UpdateWordsCard {
  title: string;
}

export interface WordsCard {
  title: string;
  dateCreated: Date;
  dateUpdate: Date;
  id: WordsCardId;
}

export interface TableWordsCard {
  title: string;
  dateCreated: Date;
  dateUpdate: Date;
}

export interface TablesApi {
  [TABLE]: ReturnType<typeof createApi>;
}

export interface DBSchema {
  [TABLE]: {
    value: TableWordsCard;
    key: WordsCardId;
  };
}

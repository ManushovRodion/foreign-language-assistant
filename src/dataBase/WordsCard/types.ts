import type { createApi } from "./createApi";
import type { TABLE } from "./constants";

export type WordsCardId = number;

export interface CreateWordsCard {
  title: string;
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

export interface TablesApiWordsCard {
  [TABLE]: ReturnType<typeof createApi>;
}

export interface DBSchemaWordsCard {
  [TABLE]: {
    value: TableWordsCard;
    key: WordsCardId;
  };
}

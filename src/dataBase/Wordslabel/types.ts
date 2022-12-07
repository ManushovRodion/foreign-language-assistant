import type { createApi } from "./createApi";
import type { LINK_TABLE_GROUP, TABLE } from "./constants";

export type WordsLabelId = number;
export type WordsGroupId = number;

export interface CreateWordsLabel {
  name: string;
}

// not use`s
export interface UpdateWordsLabel {}

export interface WordsLabel {
  name: string;
  id: WordsLabelId;
}

export interface TableWordsLabel {
  name: string;
}

export interface TableWordsLabelsGroups {
  labelId: WordsLabelId;
  groupId: WordsGroupId;
}

export interface TablesApiWordsLabel {
  [TABLE]: ReturnType<typeof createApi>;
}

export interface DBSchemaWordsLabel {
  [TABLE]: {
    value: TableWordsLabel;
    key: WordsLabelId;
  };
  [LINK_TABLE_GROUP]: {
    value: TableWordsLabelsGroups;
    key: WordsGroupId;
    indexes: { groupId: WordsGroupId; name: string };
  };
}

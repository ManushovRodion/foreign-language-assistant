import type { Connect } from "../types";

import type { CreateWordsItem, WordsItem } from "./types";
import type { WordsGroupId } from "./types";

import { TABLE, TABLE_GROUP } from "./constants";
import { validRequered } from "../validations";

export const createApi = (connect: Connect) => {
  /**
   * @param value
   * @param groupId
   * @returns
   */
  const createByGroupId = async (
    value: CreateWordsItem,
    groupId: WordsGroupId
  ) => {
    const link = await connect;

    const group = await link.get(TABLE_GROUP, groupId);
    if (!group) throw new Error(`Не найдена группа с ID ${groupId}`);

    validRequered<CreateWordsItem>(value, "original");
    validRequered<CreateWordsItem>(value, "translate");

    return link.add(TABLE, { ...value, groupId });
  };

  /**
   * @param groupId
   */
  const removeAllByGroupId = async (groupId: WordsGroupId) => {
    const tx = (await connect).transaction(TABLE, "readwrite");
    let cursor = await tx.store.openCursor();

    while (cursor) {
      if (cursor.value.groupId === groupId) {
        cursor.delete();
      }

      cursor = await cursor.continue();
    }

    tx.done;
  };

  /**
   * @param groupId
   * @returns WordsItem[]
   */
  const findAllbyGroupId = async (groupId: WordsGroupId) => {
    const items = (await connect).getAllFromIndex(TABLE, "groupId", groupId);

    return (await items).map((item: any) => {
      delete item.groupId;
      return item as WordsItem;
    });
  };

  return {
    createByGroupId,
    removeAllByGroupId,
    findAllbyGroupId,
  };
};

import type { Connect } from "../types";

import type {
  CreateWordsGroup,
  UpdateWordsGroup,
  WordsGroup,
  WordsGroupId,
} from "./types";
import type { WordsCardId } from "./types";

import { TABLE, TABLE_CARD } from "./constants";
import { validRequered } from "../validations";

export const createApi = (connect: Connect) => {
  /**
   * @param value
   * @param cardId
   * @returns
   */
  const createByCardId = async (
    value: CreateWordsGroup,
    cardId: WordsCardId
  ) => {
    const link = await connect;

    const card = await link.get(TABLE_CARD, cardId);
    if (!card) throw new Error(`Не найдена карточка с ID ${cardId}`);

    if (value.title) {
      validRequered<CreateWordsGroup>(value, "title");
    }

    return link.add(TABLE, { title: value.title, cardId });
  };

  /**
   * @param value
   * @param groupId
   */
  const update = async (value: UpdateWordsGroup, groupId: WordsGroupId) => {
    const link = await connect;

    const group = await link.get(TABLE, groupId);
    if (!group) throw new Error(`Не найдена группа с ID ${groupId}`);

    const tx = link.transaction(TABLE, "readwrite");
    let cursor = await tx.store.openCursor();

    while (cursor) {
      if (cursor.key === groupId) {
        cursor.update({
          title: value.title,
          cardId: cursor.value.cardId,
        });

        break;
      }

      cursor = await cursor.continue();
    }

    tx.done;
  };

  /**
   * @param groupId
   */
  const remove = async (groupId: WordsGroupId) => {
    (await connect).delete(TABLE, groupId);
  };

  /**
   * @param cardId
   */
  const removeAllByCardId = async (cardId: WordsCardId) => {
    const tx = (await connect).transaction(TABLE, "readwrite");
    let cursor = await tx.store.openCursor();

    while (cursor) {
      if (cursor.value.cardId === cardId) {
        cursor.delete();
      }

      cursor = await cursor.continue();
    }

    tx.done;
  };

  /**
   * @param cardId
   * @returns WordsGroup[]
   */
  const findAllbyCardId = async (cardId: WordsCardId) => {
    const link = await connect;
    const index = await link.getAllKeysFromIndex(TABLE, "cardId", cardId);

    const promise = index.map(async (groupId) => {
      const group = await link.get(TABLE, groupId);
      if (!group) throw new Error("Не найдена группа!");

      const data: WordsGroup = {
        id: groupId,
        title: group.title,
      };

      return data;
    });

    return Promise.all(promise);
  };

  return {
    createByCardId,
    update,
    remove,
    removeAllByCardId,
    findAllbyCardId,
  };
};

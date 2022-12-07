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

    validRequered<CreateWordsGroup>(value, "title");
    return link.add(TABLE, { ...value, cardId });
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
          ...value,
          cardId: cursor.value.cardId,
        });

        break;
      }

      cursor = await cursor.continue();
    }

    tx.done;
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
    const tx = (await connect).transaction(TABLE);
    let cursor = await tx.store.openCursor();
    const items: WordsGroup[] = [];

    while (cursor) {
      if (cursor.value.cardId === cardId) {
        const value = cursor.value as any;
        delete value.cardId;

        items.push({
          ...value,
          id: cursor.key,
        });
      }

      cursor = await cursor.continue();
    }

    tx.done;

    return items;
  };

  return {
    createByCardId,
    update,
    removeAllByCardId,
    findAllbyCardId,
  };
};

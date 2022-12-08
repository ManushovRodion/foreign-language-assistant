import type { Connect } from "../types";

import type {
  CreateWordsCard,
  UpdateWordsCard,
  WordsCard,
  WordsCardId,
} from "./types";

import { TABLE } from "./constants";
import { validRequered } from "../validations";

export const createApi = (connect: Connect) => {
  const create = async (value: CreateWordsCard) => {
    validRequered<CreateWordsCard>(value, "title");

    const date = new Date();

    return (await connect).add(TABLE, {
      ...value,
      dateCreated: date,
      dateUpdate: date,
    });
  };

  /**
   * @param value
   * @param cardId
   */
  const update = async (value: UpdateWordsCard, cardId: WordsCardId) => {
    const link = await connect;

    const card = await link.get(TABLE, cardId);
    if (!card) throw new Error(`Не найдена карточка с ID ${cardId}`);

    validRequered<UpdateWordsCard>(value, "title");

    const tx = link.transaction(TABLE, "readwrite");
    let cursor = await tx.store.openCursor();

    while (cursor) {
      if (cursor.key === cardId) {
        cursor.update({
          ...value,
          dateCreated: cursor.value.dateCreated,
          dateUpdate: new Date(),
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
  const remove = async (cardId: WordsCardId) => {
    (await connect).delete(TABLE, cardId);
  };

  /**
   *
   */
  const findAll = async () => {
    const link = await connect;
    const keys = await link.getAllKeys(TABLE);

    const promise = keys.map(async (key) => {
      const card = await link.get(TABLE, key);
      if (!card) return;

      return {
        ...card,
        id: key,
      } as WordsCard;
    });
    const items = await Promise.all(promise);

    const cards: WordsCard[] = [];
    items.forEach((card) => {
      if (card) cards.push(card);
    });

    return cards;
  };

  return {
    create,
    update,
    remove,
    findAll,
  };
};

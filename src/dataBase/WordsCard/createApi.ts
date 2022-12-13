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
    if (value.title) {
      validRequered<CreateWordsCard>(value, "title");
    }

    const date = value?.dateCreated || new Date();

    return (await connect).add(TABLE, {
      title: value.title,
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
          title: value.title,
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
    const cards: WordsCard[] = [];

    const tx = link.transaction(TABLE);
    let cursor = await tx.store.openCursor();

    while (cursor) {
      cards.push({
        ...cursor.value,
        id: cursor.key,
      });

      cursor = await cursor.continue();
    }

    tx.done;

    return cards;
  };

  const find = async (cardId: WordsCardId) => {
    const card = await (await connect).get(TABLE, cardId);
    return {
      ...card,
      id: cardId,
    };
  };

  return {
    create,
    update,
    remove,
    findAll,
    find,
  };
};

import { ref } from "vue";
import { format } from "date-fns";

import { dataBase } from "@/dataBase";
import type { Card, CardId, CreateCard, UpdateCard } from "../types";

const example = async () => {
  const cardId = await dataBase.table.WordsCard.create({
    title: "example",
    dateCreated: new Date("2022-10-10"),
  });

  // groups

  const groupId0 = await dataBase.table.WordsGroup.createByCardId(
    { title: `example group by card id:${cardId}` },
    cardId
  );

  const groupId1 = await dataBase.table.WordsGroup.createByCardId(
    { title: "" },
    cardId
  );

  // items

  await dataBase.table.WordsItem.createByGroupId(
    { translate: "Я", original: "I am" },
    groupId0
  );

  await dataBase.table.WordsItem.createByGroupId(
    { translate: "Он", original: "He is" },
    groupId0
  );

  await dataBase.table.WordsItem.createByGroupId(
    { translate: "Она", original: "she is" },
    groupId0
  );

  await dataBase.table.WordsItem.createByGroupId(
    { translate: "10 часов", original: "10 o`clock" },
    groupId1
  );

  // label

  await dataBase.table.WordsLabel.createByGroupId({ name: "to be" }, groupId0);

  await dataBase.table.WordsLabel.createByGroupId({ name: "date" }, groupId1);
  await dataBase.table.WordsLabel.createByGroupId({ name: "at" }, groupId1);
};

export const useCards = () => {
  let data = ref<Card[]>([]);
  const error = ref("");
  const loading = ref<"NONE" | "LOAD_CARDS" | "UPDATE_CARD">("NONE");

  /**
   * ...
   */
  const setup = async () => {
    error.value = "";
    data.value = [];
    loading.value = "LOAD_CARDS";

    try {
      // for (let i = 0; i < 5; i++) {
      //   await example();
      // }

      const { WordsCard, WordsGroup, WordsItem, WordsLabel } = dataBase.table;

      const cards = await WordsCard.findAll();

      const promise = cards.map(async (card) => {
        const groups = await WordsGroup.findAllbyCardId(card.id);

        const promiseGroups = groups.map(async (group) => {
          const items = await WordsItem.findAllbyGroupId(group.id);
          const labels = await WordsLabel.findAllByGroupId(group.id);

          return {
            id: group.id,
            cardId: card.id,
            title: group.title,
            items,
            labels,
          };
        });

        return {
          id: card.id,
          title: card.title,
          dateCreated: card.dateCreated,
          groups: await Promise.all(promiseGroups),
        };
      });

      data.value = await Promise.all(promise);

      data.value = data.value.sort((a: Card, b: Card) => {
        return b.dateCreated.getDate() - a.dateCreated.getDate();
      });
    } catch (e) {
      error.value = String(e);
    }

    loading.value = "NONE";
  };

  /**
   * @param date
   * @returns
   */
  const findCardByDay = (date: Date) => {
    const DATE_FORMAT = "yyyy-MM-dd";
    const thisDay = format(date, DATE_FORMAT);

    return data.value.find((v) => {
      return format(v.dateCreated, DATE_FORMAT) === thisDay;
    });
  };

  /**
   * @returns
   */
  const findById = async (cardId: CardId) => {
    const { WordsCard, WordsGroup, WordsItem, WordsLabel } = dataBase.table;

    const card = await WordsCard.find(cardId);
    if (!card) return;

    const groups = await WordsGroup.findAllbyCardId(card.id);

    const promiseGroups = groups.map(async (group) => {
      const items = await WordsItem.findAllbyGroupId(group.id);
      const labels = await WordsLabel.findAllByGroupId(group.id);

      return {
        id: group.id,
        cardId: card.id,
        title: group.title,
        items,
        labels,
      };
    });

    return {
      id: card.id,
      title: card.title,
      dateCreated: card.dateCreated,
      groups: await Promise.all(promiseGroups),
    };
  };

  /**
   * @param value
   * @returns
   */
  const createCard = async (value: CreateCard) => {
    error.value = "";
    const { WordsCard, WordsGroup, WordsItem, WordsLabel } = dataBase.table;

    if (!value.groups.length) {
      error.value = "Необходимо добавить, хотя бы одну группу в карточку";
      return;
    }

    let cardId: CardId = 0;

    try {
      cardId = await WordsCard.create({
        title: value?.title || "",
        dateCreated: value?.dateCreated || undefined,
      });
    } catch (e) {
      if (cardId) {
        await WordsCard.remove(cardId);
      }

      error.value = `Не удалось создать карточку: ${e}`;
      return;
    }

    return cardId;
  };

  /**
   * @param value
   * @param cardId
   * @returns
   */
  const updateCard = async (value: UpdateCard, cardId: CardId) => {
    error.value = "";
    loading.value = "UPDATE_CARD";

    try {
      const { WordsCard, WordsGroup, WordsItem, WordsLabel } = dataBase.table;

      if (!value.groups.length) {
        error.value = "Необходимо добавить, хотя бы одну группу в карточку!";
        return;
      }

      // find

      const card = await findById(cardId);
      if (!card) {
        error.value = "Не найдена карточка!";
        return;
      }

      // update

      await WordsCard.update(
        {
          title: value?.title || card.title || "",
        },
        cardId
      );

      // remove

      const promiseRemove = card.groups.map(async (group) => {
        return Promise.all([
          WordsItem.removeAllByGroupId(group.id),
          WordsLabel.removeAllByGroupId(group.id),
        ]);
      });

      await Promise.all([
        ...promiseRemove,
        WordsGroup.removeAllByCardId(cardId),
      ]);

      // create

      const promiseGroups = value.groups.map(async (group) => {
        const groupId = await WordsGroup.createByCardId(group, cardId);

        const promiseItems = group.items.map(async (item) => {
          WordsItem.createByGroupId(item, groupId);
        });

        const promiseLabels = group.labels.map(async (label) => {
          WordsLabel.createByGroupId(label, groupId);
        });

        return Promise.all([promiseItems, promiseLabels]);
      });

      await Promise.all(promiseGroups);
    } catch (e) {
      error.value = String(e);
    }

    loading.value = "NONE";
  };

  return {
    data,
    error,
    loading,

    setup,
    findCardByDay,
    findById,
    createCard,
    updateCard,
  };
};

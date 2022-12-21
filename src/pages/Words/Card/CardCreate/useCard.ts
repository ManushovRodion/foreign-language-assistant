import { ref, reactive, computed } from "vue";
import { dataBase } from "@/dataBase";

import type { Card } from "../../types";

const defineCard = (): Card => {
  const date = new Date();
  return { id: 0, title: "", dateCreated: date, dateUpdate: date };
};

export const useCard = () => {
  let data = reactive<Card>(defineCard());
  const loading = ref(false);
  const error = ref("");

  const { WordsCard } = dataBase.table;

  /**
   * Инициализация
   */
  const setup = (card?: Card) => {
    data.id = card?.id || 0;
    data.title = card?.title || "";

    const date = new Date();
    data.dateCreated = card?.dateCreated || date;
    data.dateUpdate = card?.dateUpdate || date;
  };

  /**
   * Создание карточки
   */
  const create = async () => {
    loading.value = true;
    error.value = "";

    try {
      const cardId = await WordsCard.create(data);
      data.id = cardId;
    } catch (e) {
      error.value = String(e);
    }

    loading.value = false;
  };

  /**
   * Обновить все даты карточек
   * @param date
   */
  const updateDate = (date: Date) => {
    data.dateCreated = date;
    data.dateUpdate = date;
  };

  /**
   *
   */
  const findCardByDay = async () => {
    loading.value = true;
    error.value = "";

    try {
      const card = await WordsCard.findCardByDay(data.dateCreated);

      data.id = card?.id || 0;
      data.title = card?.title || "";

      const date = data.dateCreated;
      data.dateCreated = card?.dateCreated || date;
      data.dateUpdate = card?.dateUpdate || date;
    } catch (e) {
      error.value = String(e);
    }

    loading.value = false;
  };

  return {
    data,
    loading,
    error,

    setup,
    create,

    updateDate,
    findCardByDay,
  };
};

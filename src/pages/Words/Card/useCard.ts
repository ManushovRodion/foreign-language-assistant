import { ref, reactive, computed } from "vue";
import { format } from "date-fns";
import { dataBase } from "@/dataBase";

import type { Card } from "../types";
import { FORMAT_DATE } from "./constants";

const defineCard = (): Card => {
  const date = new Date();
  return { id: 0, title: "", dateCreated: date, dateUpdate: date };
};

export const useCard = () => {
  let data = reactive<Card>(defineCard());
  const loading = ref(false);
  const error = ref("");

  const { WordsCard } = dataBase.table;

  const dateCreated = computed(() => {
    return format(data.dateCreated, FORMAT_DATE);
  });

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
   * Обновить заголовок для карточки
   * @param title
   */
  const updateTitle = async (title: Card["title"]) => {
    loading.value = true;
    error.value = "";

    try {
      if (data.id) {
        await WordsCard.update({ title }, data.id);
      }

      data.title = title;
    } catch (e) {
      error.value = String(e);
    }

    loading.value = false;
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

  return {
    data,
    loading,
    error,

    dateCreated,

    setup,
    updateTitle,
    create,
  };
};

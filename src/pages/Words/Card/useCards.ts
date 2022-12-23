import { ref } from "vue";
import { format } from "date-fns";
import { dataBase } from "@/dataBase";

import { FORMAT_DATE } from "./constants";

import type { Card } from "../types";

export const useCards = () => {
  const data = ref<Card[]>([]);
  const loading = ref(false);
  const error = ref("");

  const { WordsCard } = dataBase.table;

  /**
   * Инициализация
   */
  const setup = async () => {
    loading.value = true;
    error.value = "";

    try {
      data.value = await WordsCard.findAll();
    } catch (e) {
      error.value = String(e);
    }

    loading.value = false;
  };

  const findCardByDay = (date: Date) => {
    const thisDay = format(date, FORMAT_DATE);

    return data.value.find((card) => {
      return format(card.dateCreated, FORMAT_DATE) === thisDay;
    });
  };

  return {
    data,
    loading,
    error,

    setup,
    findCardByDay,
  };
};

import { ref } from "vue";
import { dataBase } from "@/dataBase";

import type { CardId, Group } from "../types";

export const useGroups = () => {
  const data = ref<Group[]>([]);
  const loading = ref(false);
  const error = ref("");

  const { WordsGroup, WordsItem, WordsLabel } = dataBase.table;

  /**
   * Инициализация
   * @param cardId
   */
  const setup = async (cardId: CardId) => {
    loading.value = true;
    error.value = "";

    try {
      const groups = await WordsGroup.findAllbyCardId(cardId);

      const promise = groups.map(async (group) => {
        return {
          id: group.id,
          title: group.title,
          cardId: cardId,

          items: await WordsItem.findAllbyGroupId(group.id),
          labels: await WordsLabel.findAllByGroupId(group.id),
        };
      });

      data.value = await Promise.all(promise);
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
  };
};

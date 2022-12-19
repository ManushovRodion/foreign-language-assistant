import { ref } from "vue";
import { defineStore } from "pinia";

import { dataBase } from "@/dataBase";

export interface Label {
  id: number;
  name: string;
}

export const useLabels = defineStore("Labels", () => {
  const data = ref<Label[]>([]);
  const loading = ref(false);
  const error = ref("");

  const { WordsLabel } = dataBase.table;

  /**
   * Инициализация
   */
  const setup = async () => {
    loading.value = true;
    error.value = "";

    try {
      data.value = await WordsLabel.findAll();
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
});

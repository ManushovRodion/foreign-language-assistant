import { defineStore } from "pinia";
import { ref } from "vue";
import type { DictorItem } from "./types";

export const useEventBusGroupDictor = defineStore("EventBusGroupDictor", () => {
  const isOpen = ref(false);
  const data = ref<DictorItem[]>([]);

  const open = (items: DictorItem[]) => {
    data.value = items;
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
    data.value = [];
  };

  return {
    data,
    isOpen,

    open,
    close,
  };
});

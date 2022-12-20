import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CardId, DictorItem, GroupId } from "./types";

interface DictorCardItem extends DictorItem {
  groupId: GroupId;
  cardId: CardId;
}

export const useEventBusCardsDictor = defineStore("EventBusCardDictor", () => {
  const isOpen = ref(false);
  const activeCardId = ref<CardId | null>(null);
  const data = ref<DictorCardItem[]>([]);

  const dataListByCard = computed((): DictorItem[] => {
    if (!activeCardId.value) return [];

    return data.value.filter((item) => item.cardId === activeCardId.value);
  });

  const dataList = computed((): DictorItem[] => {
    return dataListByCard.value.map((item) => ({
      original: item.original,
      translate: item.translate,
    }));
  });

  /**
   * Открывает диктор для конкретной группы
   *
   * Есть не явное поведение: мы принимаем элементы разных групп,
   * но запустить можем только одну и группу - каждый вызов open() изеняет данные под последний вызов
   *
   * @param cardId
   */
  const open = (cardId: CardId) => {
    activeCardId.value = cardId;
    isOpen.value = true;
  };

  /**
   * Закрывает диктора
   */
  const close = () => {
    activeCardId.value = null;
    isOpen.value = false;
  };

  /**
   * Добавляет элементы диктора
   *
   * @param items
   * @param groupId
   * @param cardId
   */
  const pushItems = (items: DictorItem[], groupId: GroupId, cardId: CardId) => {
    data.value = [
      ...data.value,
      ...items.map((item) => ({ ...item, groupId, cardId })),
    ];
  };

  /**
   * Удаляет элементы диктора
   *
   * @param groupId
   * @param cardId
   */
  const removeItems = (groupId: GroupId, cardId: CardId) => {
    data.value = data.value.filter((item) => {
      return item.groupId !== groupId && item.cardId === cardId;
    });
  };

  /**
   * Запрашиват наличие данных для карточки
   *
   * @param cardId
   * @returns
   */
  const hasData = (cardId: CardId) => {
    return !!data.value.find((item) => item.cardId === cardId);
  };

  return {
    data: dataList,
    fullData: data,
    isOpen,

    open,
    close,
    pushItems,
    removeItems,
    hasData,
  };
});

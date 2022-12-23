import { defineStore } from "pinia";
import { ref, computed } from "vue";

import type { Card, CardId, Group, GroupId } from "./types";

type Process =
  | "NONE"
  | "ON_CREATED"
  | "ON_UPDATE"
  | "ON_REMOVE"
  | "NEXT_UPDATE"
  | "NEXT_CREATED"
  | "NEXT_REMOVE";

interface Data {
  card?: Card;
  group?: Group;
  cardId?: CardId;
  groupId?: GroupId;
}

export const useEventBusGroupForm = defineStore("EventBusGroupForm", () => {
  const process = ref<Process>("NONE");
  const data = ref<Data>({});

  const isProcessOn = computed(
    () =>
      process.value === "ON_CREATED" ||
      process.value === "ON_UPDATE" ||
      process.value === "ON_REMOVE"
  );

  const isProcessNext = computed(
    () =>
      process.value === "NEXT_CREATED" ||
      process.value === "NEXT_UPDATE" ||
      process.value === "NEXT_REMOVE"
  );

  /**
   * Вернуть шину к первичному состоянию
   */
  const reset = () => {
    data.value = {};

    process.value = "NONE";
  };

  /**
   * Отправить событие создания
   * @param card
   */
  const onCreated = (card: Card) => {
    process.value = "ON_CREATED";

    data.value = {
      card,
      cardId: card.id,
    };
  };

  /**
   * Отправить событие, что завершено создание
   */
  const onNextCreated = () => {
    process.value = "NEXT_CREATED";
  };

  /**
   * Отправить событие обновления
   * @param group
   */
  const onUpdate = (group: Group) => {
    process.value = "ON_UPDATE";

    data.value = {
      group,
      groupId: group.id,
      cardId: group.cardId,
    };
  };

  /**
   * Отправить событие, что завершено обновление
   */
  const onNextUpdate = () => {
    process.value = "NEXT_UPDATE";
  };

  /**
   * Отправить событие удаления
   * @param cardId
   * @param groupId
   */
  const onRemove = (cardId: CardId, groupId: GroupId) => {
    process.value = "ON_REMOVE";

    data.value = {
      cardId,
      groupId,
    };
  };

  /**
   * Отправить событие, что завершено удаление
   */
  const onNextRemove = () => {
    process.value = "NEXT_REMOVE";
  };

  return {
    process,
    data,

    isProcessOn,
    isProcessNext,

    reset,

    onCreated,
    onNextCreated,
    onUpdate,
    onNextUpdate,
    onRemove,
    onNextRemove,
  };
});

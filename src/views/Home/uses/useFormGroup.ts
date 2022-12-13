import { defineStore } from "pinia";
import { ref, computed } from "vue";

import type { Group as TypeGroup, Item as TypeItem } from "../types";
import { useCards } from "./useCards";

export type ItemKey = number;

export interface Item extends TypeItem {
  key: ItemKey;
}

export interface Group extends TypeGroup {
  items: Item[];
}

const defineItem = (key: ItemKey): Item => {
  return {
    key,
    translate: "",
    original: "",
  };
};

const defineGroup = (): Group => {
  return {
    id: 0,
    cardId: 0,
    title: "",

    items: [defineItem(itemKey)],
    labels: [],
  };
};

let itemKey = 1;

export const useFormGroup = defineStore("FormGroup", () => {
  const isOpenModal = ref(false);
  const group = ref<Group>(defineGroup());
  const cards = useCards();

  const isLoading = computed(() => cards.loading.value === "UPDATE_CARD");

  const back = () => {
    isOpenModal.value = false;
    group.value = defineGroup();
  };

  const open = async (data?: TypeGroup) => {
    isOpenModal.value = true;
    if (!data) return;

    const items = data.items.map((item) => {
      itemKey++;
      return {
        ...item,
        key: itemKey,
      };
    });

    itemKey++;

    group.value = {
      ...data,
      items: [...items, defineItem(itemKey)],
    };
  };

  const updateItem = (value: TypeItem, key: ItemKey) => {
    const index = group.value.items.findIndex((v) => v.key === key);
    if (index < 0) return;

    group.value.items[index].original = value.original;
    group.value.items[index].translate = value.translate;

    if (value.original && value.translate) {
      const index = group.value.items.findIndex(
        (v) => !v.original || !v.translate
      );
      if (index > -1) return;

      itemKey++;
      group.value.items.push(defineItem(itemKey));
    }
  };

  const removeItem = (key: ItemKey) => {
    group.value.items = group.value.items.filter((v) => v.key !== key);

    if (!group.value.items.length) {
      itemKey++;
      group.value.items.push(defineItem(itemKey));
    }
  };

  const put = async () => {
    const { cardId, id } = group.value;

    const newGroup = {
      ...group.value,
      items: group.value.items.filter((v) => v.original && v.translate),
    };

    if (!newGroup.items.length) {
      return;
    }

    if (!cardId) {
      //...create
    } else {
      const card = await cards.findById(cardId);
      if (!card) return;

      const oldGroups = card.groups.filter((group) => group.id !== id);

      await cards.updateCard(
        {
          ...card,
          groups: [...oldGroups, newGroup],
        },
        cardId
      );
    }

    back();
  };

  const remove = async () => {
    const { cardId, id } = group.value;

    const card = await cards.findById(cardId);
    console.log(card);
    if (!card) return;

    await cards.updateCard(
      {
        ...card,
        groups: card.groups.filter((group) => group.id !== id),
      },
      cardId
    );

    back();
  };

  return {
    isOpenModal,
    group,

    isLoading,

    open,
    back,
    put,
    remove,
    updateItem,
    removeItem,
  };
});

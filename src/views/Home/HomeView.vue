<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { format } from "date-fns";

import CardGroups from "./CardGroups.vue";
import CardEmpty from "./CardEmpty.vue";

import type { Card } from "./types";

let cardList = reactive<Card[]>([]);
const cardEmpty = ref<Card>({
  id: 0,
  title: "",
  dateCreated: new Date(),
  dateUpdate: new Date(),
  groups: [],
});

const isViewCardEmpty = computed(() => {
  const emptyDateCreated = format(cardEmpty.value.dateCreated, "yyyy-MM-dd");

  const findIndex = cardList.findIndex((v) => {
    return format(v.dateCreated, "yyyy-MM-dd") === emptyDateCreated;
  });

  return findIndex < 0;
});

const cardListSortByDateCreated = computed(() => {
  return cardList.sort((a: Card, b: Card) => {
    return b.dateCreated.getDate() - a.dateCreated.getDate();
  });
});

const updateCardOld = (card: Card) => {
  const findIndex = cardList.findIndex((v) => v.id === card.id);
  if (findIndex < 0) return;

  cardList[findIndex] = {
    ...card,
    dateUpdate: new Date(),
  };
};

const updateCardEmpty = (card: Card) => {
  cardEmpty.value.title = card.title;

  if (card.groups.length > 0) {
    cardList.push({
      ...cardEmpty.value,
      id: cardList.length + 1,
      dateUpdate: new Date(),
    });
  }
};

// example
cardList.push({
  id: 2,
  dateCreated: new Date("2022-11-19"),
  dateUpdate: new Date("2022-11-19"),
  title: "",
  groups: [],
});

cardList.push({
  id: 1,
  dateCreated: new Date("2022-11-18"),
  dateUpdate: new Date("2022-11-89"),
  title: "",
  groups: [],
});
</script>

<template>
  <div class="page-home">
    <CardEmpty
      v-if="isViewCardEmpty"
      :card="cardEmpty"
      @update="updateCardEmpty"
    />

    <CardGroups
      v-for="card in cardListSortByDateCreated"
      :key="card.id"
      :card="card"
      @update="updateCardOld"
    />
  </div>
</template>

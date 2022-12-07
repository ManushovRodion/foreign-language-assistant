<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { format } from "date-fns";

import CardGroups from "./CardGroups.vue";
import CardEmpty from "./CardEmpty.vue";

import type { Card } from "./types";
import { dataBase } from "@/dataBase";

try {
  const cardId = await dataBase.table.WordsCard.create({ title: "card" });
  await dataBase.table.WordsCard.update({ title: "test card" }, cardId);

  const cards = await dataBase.table.WordsCard.findAll();
  console.log("cards", cards);

  const groupId = await dataBase.table.WordsGroup.createByCardId(
    { title: "test group" },
    cardId
  );

  await dataBase.table.WordsGroup.update({ title: "update title 2" }, 1);

  const groups = await dataBase.table.WordsGroup.findAllbyCardId(cardId);
  console.log("groups", groups);

  await dataBase.table.WordsItem.createByGroupId(
    {
      translate: "test tr 1",
      original: "test or 1",
    },
    groupId
  );

  const items = await dataBase.table.WordsItem.findAllbyGroupId(groupId);
  console.log("items", items);

  await dataBase.table.WordsLabel.createByGroupId({ name: "test 2" }, groupId);

  const labels = await dataBase.table.WordsLabel.findAllByGroupId(groupId);
  console.log("labels", labels);
} catch (e) {
  console.log(e);
}

// await dataBase.table.WordsItem.createByGroupId(
//   {
//     translate: "test tr 2",
//     original: "test or 2",
//   },
//   1
// );

// import { tableWordsGroup } from "@/dataBase";

// await tableWordsGroup.update(
//   {
//     title: "test",
//     cardId: 1,
//     items: [
//       {
//         translate: "I am",
//         original: "Я",
//       },
//     ],
//     meta: [
//       {
//         name: "to be",
//       },
//     ],
//   },
//   1
// );

//await tableWordsMeta.createByGroup({ name: "index" }, 2);

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
  groups: [
    {
      id: 1,
      title: "",
      items: [
        {
          original: "I am not a bad student",
          translate: "Я не плохой студент",
        },
        {
          original: "(He is / He`s) a new student",
          translate: "Он новый студент",
        },
      ],
      meta: [
        {
          id: 1,
          name: "to be",
        },
        {
          id: 2,
          name: "level up",
        },
      ],
    },
    {
      id: 2,
      title: "Tecn",
      items: [
        {
          original: "He",
          translate: "Он",
        },
        {
          original: "She",
          translate: "Она",
        },
      ],
      meta: [],
    },
  ],
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

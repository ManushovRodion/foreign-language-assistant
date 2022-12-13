<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";

import CardGroups from "./components/CardGroups.vue";
import CardEmpty from "./components/CardEmpty.vue";
import FormGroup from "./components/FormGroup.vue";

import type { Card, CardEmpty as CardEmptyData } from "./types";
import { useCards } from "./uses/useCards";

import { useFormGroup } from "./uses/useFormGroup";

const cards = useCards();
const formGroup = useFormGroup();

cards.setup();

const cardEmpty = ref<CardEmptyData>({
  title: "",
  dateCreated: new Date(),
  groups: [],
});

const isViewCardEmpty = computed(() => {
  return !cards.findCardByDay(new Date());
});

watchEffect(() => {
  if (!formGroup.isOpenModal) {
    cards.setup();
  }
});

const updateCard = (card: Card) => {
  cards.updateCard(card, card.id);
};

const updateCardEmpty = (card: CardEmptyData) => {
  cardEmpty.value.title = card.title;

  if (card.groups.length > 0) {
    cards.createCard(cardEmpty.value);
  }
};
</script>

<template>
  <div class="page-home">
    <p v-if="cards.error.value">{{ cards.error }}</p>

    <p v-if="cards.loading.value === 'LOAD_CARDS'">Подтягиваем данные...</p>

    <CardEmpty
      v-if="isViewCardEmpty && cards.loading.value !== 'LOAD_CARDS'"
      :card="cardEmpty"
      @update="updateCardEmpty"
    />

    <CardGroups
      v-for="card in cards.data.value"
      :key="card.id"
      :card="card"
      @update="updateCard"
    />

    <FormGroup />
  </div>
</template>

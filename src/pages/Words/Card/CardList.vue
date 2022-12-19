<script lang="ts" setup>
import { computed } from "vue";
import CardListEmptyItem from "./CardListEmptyItem.vue";
import CardListItem from "./CardListItem.vue";
import { useCards } from "./useCards";

const cards = useCards();
cards.setup();

const isViewCardEmpty = computed(() => {
  return !cards.findCardByDay(new Date());
});
</script>

<template>
  <p v-if="cards.error.value">
    {{ cards.error }}
  </p>

  <p v-if="cards.loading.value">Загрузка...</p>

  <template v-else>
    <CardListEmptyItem v-if="isViewCardEmpty" @saved="cards.setup" />

    <CardListItem
      v-for="card in cards.data.value"
      :key="card.id"
      :value="card"
      @remove="cards.setup"
    />
  </template>
</template>

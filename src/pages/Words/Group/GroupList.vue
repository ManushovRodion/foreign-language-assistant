<script lang="ts" setup>
import { watchEffect, type PropType } from "vue";

import GroupListItem from "./GroupListItem.vue";

import { useGroups } from "./useGroups";
import { useEventBusGroupForm } from "../useEventBusGroupForm";
import type { CardId } from "../types";

const props = defineProps({
  cardId: {
    type: Number as PropType<CardId>,
    required: true,
  },
});

const groups = useGroups();
const eventBus = useEventBusGroupForm();

groups.setup(props.cardId);

watchEffect(() => {
  if (eventBus.isProcessNext) {
    groups.setup(props.cardId);
  }
});
</script>

<template>
  <p v-if="groups.error.value">
    {{ groups.error }}
  </p>

  <p v-if="groups.loading.value">Загрузка...</p>

  <GroupListItem
    v-for="group in groups.data.value"
    :key="group.id"
    :value="group"
  />
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { format } from "date-fns";

import UiCard from "@/components/UiCard.vue";
import UiBtn from "@/components/UiBtn.vue";
import UiInputText from "@/components/UiInputText.vue";

import type { Card } from "./types";

const props = defineProps({
  card: {
    type: Object as PropType<Card>,
    requred: true,
    default: () => {},
  },
});

const emit = defineEmits<{
  (e: "update", card: Card): void;
}>();

const updateTitle = (value: string) => {
  emit("update", {
    ...props.card,
    title: value,
  });
};
</script>

<template>
  <UiCard>
    <template #title>
      <span class="pr_5">#</span>
      <span>{{ format(props.card.dateCreated, "yyyy.MM.dd") }}</span>
      <span class="pr_5 pl_5">/</span>
      <UiInputText
        @input="updateTitle"
        :value="props.card.title"
        placeholder="Название карточки"
      />
    </template>

    <template #action>
      <UiBtn class="mr_5">Добавить</UiBtn>
      <UiBtn>Диктор</UiBtn>
    </template>

    <template #default>
      <div style="min-height: 200px">
        {{ props.card }}
      </div>
    </template>
  </UiCard>
</template>

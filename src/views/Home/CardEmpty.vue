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
    groups: [{ id: 1 }],
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
      <UiBtn>Добавить</UiBtn>
    </template>

    <template #default>
      <div class="container">
        <p>
          Нет элементов. Необходимо <strong>добавить</strong>, для отображения
        </p>
      </div>
    </template>
  </UiCard>
</template>

<style lang="scss" scoped>
.container {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

<script setup lang="ts">
import type { PropType } from "vue";
import { format } from "date-fns";

import UiCard from "@/components/ui/UiCard.vue";
import UiBtn from "@/components/ui/UiBtn.vue";
import UiInputText from "@/components/ui/UiInputText.vue";

import type { CardEmpty } from "./../types";
import { useFormGroup } from "../uses/useFormGroup";

const formGroup = useFormGroup();

const props = defineProps({
  card: {
    type: Object as PropType<CardEmpty>,
    requred: true,
    default: () => {},
  },
});

const emit = defineEmits<{
  (e: "update", card: CardEmpty): void;
}>();

const updateTitle = (value: string) => {
  emit("update", {
    ...props.card,
    title: value,
  });
};
</script>

<template>
  <UiCard class="card-empty">
    <template #title>
      <div class="card-empty-header">
        <span class="pr_5">#</span>
        <span>{{ format(props.card.dateCreated, "yyyy.MM.dd") }}</span>
        <span class="pr_5 pl_5">/</span>
        <UiInputText
          @update:model-value="updateTitle"
          :model-value="props.card.title"
          placeholder="Название карточки"
        />
      </div>
    </template>

    <template #action>
      <div class="card-empty-actions">
        <UiBtn @click="formGroup.open()">Добавить</UiBtn>
      </div>
    </template>

    <template #default>
      <div class="card-empty-container">
        <p>
          Нет элементов. Необходимо <strong>добавить</strong>, для отображения
        </p>
      </div>
    </template>
  </UiCard>
</template>

<style lang="scss" scoped>
.card-empty-header {
  display: flex;
  .ui-input {
    margin-bottom: 0;
  }
}

.card-empty-actions {
  display: flex;
  margin-right: 15px;

  .ui-btn {
    width: 100%;
    margin-bottom: 0;
  }
}
.card-empty-container {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media (max-width: 768px) {
  .card-empty-header {
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-left: 15px;
    margin-right: 5px;
  }
  .card-empty-actions {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>

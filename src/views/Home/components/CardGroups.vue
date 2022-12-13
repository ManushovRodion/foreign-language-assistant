<script setup lang="ts">
import type { PropType } from "vue";
import { format } from "date-fns";

import UiCard from "@/components/ui/UiCard.vue";
import UiBtn from "@/components/ui/UiBtn.vue";
import UiInputText from "@/components/ui/UiInputText.vue";

import CardGroup from "./CardGroup.vue";

import type { Card } from "./../types";
import { useFormGroup } from "../uses/useFormGroup";

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

const formGroup = useFormGroup();
</script>

<template>
  <UiCard class="card-groups">
    <template #title>
      <div class="card-groups-header">
        <div>
          <span class="pr_5">#</span>
          <span>{{ format(props.card.dateCreated, "yyyy.MM.dd") }}</span>
          <span class="pr_5 pl_5">/</span>
        </div>
        <UiInputText
          @update:model-value="updateTitle"
          :model-value="props.card.title"
          placeholder="Название карточки"
        />
      </div>
    </template>

    <template #action>
      <div class="card-groups-actions">
        <UiBtn class="mr_5" @click="formGroup.open()">Добавить</UiBtn>
        <UiBtn>Диктор</UiBtn>
      </div>
    </template>

    <template #default>
      <div style="min-height: 200px">
        <CardGroup
          v-for="(group, index) in props.card.groups"
          :key="group.id"
          :group="group"
          :style="{
            marginBottom: index === props.card.groups.length - 1 ? 0 : '20px',
          }"
        />
      </div>
    </template>
  </UiCard>
</template>

<style lang="scss" scoped>
.card-groups-header {
  display: flex;

  .ui-input {
    margin-bottom: 0;
  }
}

.card-groups-actions {
  display: flex;
  margin-right: 15px;

  .ui-btn {
    width: 100%;
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .card-groups-header {
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-left: 15px;
    margin-right: 5px;
  }
  .card-groups-actions {
    margin-left: 15px;
  }
}
</style>

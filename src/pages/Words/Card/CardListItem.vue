<script lang="ts" setup>
import type { PropType } from "vue";

import UiCard from "@/components/ui/UiCard.vue";
import UiInputText from "@/components/ui/UiInputText.vue";
import UiBtn from "@/components/ui/UiBtn.vue";
import GroupList from "../Group/GroupList.vue";

import { useCard } from "./useCard";
import { useEventBusGroupForm } from "../useEventBusGroupForm";

import type { Card } from "../types";

const props = defineProps({
  value: {
    type: Object as PropType<Card>,
    required: true,
  },
});

const card = useCard();
const eventFus = useEventBusGroupForm();

card.setup(props.value);
</script>

<template>
  <UiCard>
    <template #title>
      <div :class="$style.title">
        <div>
          <span class="pr_5">#</span>
          <span>{{ card.dateCreated.value }}</span>
          <span class="pr_5 pl_5">/</span>
        </div>
        <UiInputText
          @update:model-value="card.updateTitle"
          :model-value="card.data.title"
          placeholder="Название карточки"
        />
      </div>
    </template>

    <template #action>
      <div :class="$style.action">
        <UiBtn class="mr_5" @click="eventFus.onCreated(card.data)">
          Добавить
        </UiBtn>
        <UiBtn>Диктор</UiBtn>
      </div>
    </template>

    <GroupList :card-id="card.data.id" />
  </UiCard>
</template>

<style lang="scss" module>
.title {
  display: flex;

  .ui-input {
    margin-bottom: 0;
  }
}

.action {
  display: flex;
  margin-right: 15px;

  .ui-btn {
    width: 100%;
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .title {
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-left: 15px;
    margin-right: 5px;
  }
  .action {
    margin-left: 15px;
  }
}
</style>

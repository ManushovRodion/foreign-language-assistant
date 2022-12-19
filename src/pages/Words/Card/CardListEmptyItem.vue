<script lang="ts" setup>
import { watchEffect } from "vue";

import UiCard from "@/components/ui/UiCard.vue";
import UiInputText from "@/components/ui/UiInputText.vue";
import UiBtn from "@/components/ui/UiBtn.vue";

import { useCard } from "./useCard";
import { useEventBusGroupForm } from "../useEventBusGroupForm";

const card = useCard();
const eventBus = useEventBusGroupForm();

const emit = defineEmits<{
  (e: "saved"): void;
}>();

watchEffect(() => {
  if (eventBus.process === "NEXT_CREATED") {
    emit("saved");
  }
});

card.setup();

const create = async () => {
  await card.create();
  eventBus.onCreated(card.data);
};
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
          :class="$style['ui-input']"
          @update:model-value="card.updateTitle"
          :model-value="card.data.title"
          placeholder="Название карточки"
        />
      </div>
    </template>

    <template #action>
      <div :class="$style.action">
        <UiBtn :class="$style['ui-btn']" @click="create()"> Добавить </UiBtn>
      </div>
    </template>

    <div :class="$style.container">
      <p>
        Нет элементов. Необходимо <strong>добавить</strong>, для отображения
      </p>
    </div>
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

.container {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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

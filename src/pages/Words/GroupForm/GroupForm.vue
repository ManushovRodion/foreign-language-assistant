<script lang="ts" setup>
import { watchEffect } from "vue";

import UiModal from "@/components/ui/UiModal.vue";
import UiInputText from "@/components/ui/UiInputText.vue";
import UiBtn from "@/components/ui/UiBtn.vue";
import GroupFormRow from "./GroupFormRow.vue";

import { useEventBusGroupForm } from "../useEventBusGroupForm";
import { useToggle } from "@/uses/useToggle";
import { useGroupForm } from "./useGroupForm";
import type { Group } from "../types";
import UiInputSelect from "@/components/ui/UiInputSelect.vue";

const modal = useToggle(false);
const eventBus = useEventBusGroupForm();
const formGroup = useGroupForm();

watchEffect(() => {
  if (eventBus.process === "ON_CREATED" || eventBus.process === "ON_UPDATE") {
    if (eventBus.process === "ON_UPDATE") {
      formGroup.setup(eventBus.data.group);
    }

    if (eventBus.process === "ON_CREATED" && eventBus.data.cardId) {
      const group: Group = {
        id: 0,
        cardId: eventBus.data.cardId,
        title: "",
        items: [],
        labels: [],
      };

      formGroup.setup(group);
    }

    modal.onActive();
  }
});

const back = () => {
  eventBus.reset();
  modal.onNotActive();
};

const save = async () => {
  await formGroup.save();
  modal.onNotActive();

  console.log(eventBus.data.groupId, formGroup.data, formGroup.error);

  if (!eventBus.data.groupId) {
    eventBus.onNextCreated();
  } else {
    eventBus.onNextUpdate();
  }
};

const remove = async () => {
  await formGroup.remove();
  modal.onNotActive();
  eventBus.onNextRemove();
};
</script>

<template>
  <UiModal :model-value="modal.active.value" @update:model-value="back">
    <template #header>
      <UiInputText
        placeholder="Название группы"
        class="mb_0"
        v-model="formGroup.data.title"
      />
    </template>

    <GroupFormRow
      v-for="item in formGroup.dataItems.value"
      :key="item.key"
      :value="item"
      @remove="formGroup.removeItem(item.key)"
      @update="(v) => formGroup.updateItem(v, item.key)"
    />

    <UiInputSelect
      class="mb_0"
      label="Метки"
      :options="[
        { id: 1, name: 'test' },
        { id: 2, name: 'test2' },
      ]"
      v-model="formGroup.dataLabels.value"
    />

    <template #action>
      <UiBtn v-if="formGroup.data.id" @click="remove()"> Удалить </UiBtn>
      <UiBtn :disabled="formGroup.loading.value" @click="save()">
        {{ formGroup.loading.value ? "Сохраняем..." : "Сохранить" }}
      </UiBtn>
    </template>
  </UiModal>
</template>

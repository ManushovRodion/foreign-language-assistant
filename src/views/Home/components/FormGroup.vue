<script setup lang="ts">
import UiModal from "@/components/ui/UiModal.vue";
import UiBtn from "@/components/ui/UiBtn.vue";
import UiInputText from "@/components/ui/UiInputText.vue";
import FormGroupItem from "./FormGroupItem.vue";

import { useFormGroup } from "../uses/useFormGroup";

const formGroup = useFormGroup();
</script>

<template>
  <UiModal
    :model-value="formGroup.isOpenModal"
    @update:model-value="formGroup.back()"
  >
    <template #header>
      <UiInputText
        placeholder="Название группы"
        class="mb_0"
        v-model="formGroup.group.title"
      />
    </template>

    <FormGroupItem
      v-for="item in formGroup.group.items"
      :key="item.key"
      :value="item"
      @remove="formGroup.removeItem(item.key)"
      @update="(v) => formGroup.updateItem(v, item.key)"
    />

    <template #action>
      <UiBtn v-if="formGroup.group.cardId" @click="formGroup.remove()">
        Удалить
      </UiBtn>
      <UiBtn :disabled="formGroup.isLoading" @click="formGroup.put()">
        {{ formGroup.isLoading ? "Сохраняем" : "Сохранить" }}
      </UiBtn>
    </template>
  </UiModal>
</template>

<script lang="ts" setup>
import { watchEffect, computed } from "vue";
import type { PropType } from "vue";

import UiCard from "@/components/ui/UiCard.vue";
import UiInputText from "@/components/ui/UiInputText.vue";
import UiBtn from "@/components/ui/UiBtn.vue";
import GroupList from "../Group/GroupList.vue";

import { useCard } from "./useCard";
import { useEventBusGroupForm } from "../useEventBusGroupForm";
import { useEventBusCardsDictor } from "../useEventBusCardsDictor";

import type { Card } from "../types";

const props = defineProps({
  value: {
    type: Object as PropType<Card>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "remove"): void;
}>();

const card = useCard();
const eventBusForm = useEventBusGroupForm();
const eventBusDictor = useEventBusCardsDictor();

const isActiveDictor = computed(() => {
  return eventBusDictor.hasData(card.data.id);
});

watchEffect(() => {
  if (eventBusForm.isProcessNext) {
    card.findGroups();
  }
});

const remove = async () => {
  await card.remove();
  emit("remove");
};

card.setup(props.value);
card.findGroups();
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
        <UiBtn
          v-if="card.isGroups.value"
          class="mr_5"
          :class="$style['ui-btn']"
          @click="eventBusForm.onCreated(card.data)"
        >
          Добавить
        </UiBtn>
        <UiBtn
          :class="$style['ui-btn']"
          :disabled="!isActiveDictor"
          @click="eventBusDictor.open(card.data.id)"
        >
          Диктор
        </UiBtn>
      </div>
    </template>

    <GroupList :card-id="card.data.id">
      <template #not-items>
        <div :class="$style.container">
          <p>
            Нет элементов. Необходимо <strong>добавить</strong>, для отображения
            или <strong>удалить</strong> карточку
          </p>

          <div :class="$style['btn-groups']">
            <UiBtn
              :class="$style['ui-btn']"
              @click="eventBusForm.onCreated(card.data)"
            >
              Добавить
            </UiBtn>
            <UiBtn :class="$style['ui-btn']" @click="remove"> Удалить </UiBtn>
          </div>
        </div>
      </template>
    </GroupList>
  </UiCard>
</template>

<style lang="scss" module>
.title {
  display: flex;

  .ui-input {
    margin-bottom: 0;
  }
}

.container {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.btn-groups {
  margin-top: 70px;
  padding-left: 15px;
  padding-right: 15px;

  .ui-btn {
    margin-bottom: 0;

    &:first-child {
      margin-right: 10px;
    }
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

  .btn-groups {
    display: flex;
    width: 100%;

    .ui-btn {
      width: 100%;
    }
  }
}
</style>

<script setup lang="ts">
import { useSlots, watchEffect } from "vue";

import UiBtn from "./UiBtn.vue";
import UiCard from "./UiCard.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  actionClosed: {
    type: Boolean,
    default: true,
  },
});

const slots = useSlots();

watchEffect(() => {
  const node = document.querySelector("body");
  if (!node) return;

  node.style.overflow = props.modelValue ? "hidden" : "";
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const toggle = () => {
  update(!props.modelValue);
};

const update = (value: boolean) => {
  emit("update:modelValue", value);
};

const viewMobileClosed = window.innerWidth <= 768;
</script>

<template>
  <div class="ui-modal" v-if="modelValue">
    <UiCard class="ui-modal-wrapper">
      <template #title v-if="slots?.header">
        <slot name="header" />
      </template>

      <template #action v-if="actionClosed && !viewMobileClosed">
        <UiBtn class="mb_0" @click="toggle">Отменить/Закрыть</UiBtn>
      </template>

      <slot />

      <template #footer>
        <div
          v-if="(actionClosed && viewMobileClosed) || slots?.action"
          class="ui-modal-footer"
        >
          <UiBtn v-if="actionClosed && viewMobileClosed" @click="toggle">
            Отменить/Закрыть
          </UiBtn>
          <slot name="action" />
        </div>
      </template>
    </UiCard>
  </div>
</template>

<style lang="scss">
.ui-modal {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 3000;
  background-color: rgba(#343a40, 90%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;

  &-wrapper {
    width: 100%;
    max-width: 600px;
    min-height: 100px;
  }

  &-footer {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    .ui-btn:not(.ui-btn:first-child) {
      margin-left: 5px;
    }

    .ui-btn {
      margin-bottom: 0;
    }
  }
}

@media (max-width: 768px) {
  .ui-modal {
    &-footer {
      .ui-btn {
        width: 100%;
      }
    }
  }
}
</style>

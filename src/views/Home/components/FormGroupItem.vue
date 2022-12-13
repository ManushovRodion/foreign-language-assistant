<script setup lang="ts">
import { ref, computed, type PropType } from "vue";

import UiBtn from "@/components/ui/UiBtn.vue";
import UiInputText from "@/components/ui/UiInputText.vue";

import type { Item } from "../types";

const props = defineProps({
  value: {
    type: Object as PropType<Item>,
    requred: true,
    default: () => {},
  },
});

const data = ref({
  original: props.value?.original || "",
  translate: props.value?.translate || "",
});

const isValid = computed(() => data.value.original && data.value.translate);

const emit = defineEmits<{
  (e: "update", value: Item): void;
  (e: "remove"): void;
}>();

const update = () => {
  if (isValid.value) {
    emit("update", data.value);
  }
};

const remove = () => emit("remove");
</script>

<template>
  <div class="form-group-item" :class="{ 'no-valid': !isValid }">
    <div class="form-group-item__wrapper">
      <UiInputText
        class="first-element"
        placeholder="Значение на иностранном"
        v-model.lazy="data.original"
        @update:model-value="update"
      />
      <UiInputText
        class="second-element"
        placeholder="Значение на родном"
        v-model.lazy="data.translate"
        @update:model-value="update"
      />
      <UiBtn v-if="isValid" class="third-element" @click="remove">
        Удалить
      </UiBtn>
    </div>

    <div v-if="!isValid" class="message">
      <small>
        Необходимо заполнить: "Значение на иностранном" и "Значение на родном"!
        <br />
        Если значения не будут заполнены - строка удалиться!
      </small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-group-item {
  margin-bottom: 10px;
  &.no-valid {
    background-color: rgba(#343a40, 0.1);
    margin: 15px -15px 0 -15px;
    padding: 15px;
  }

  &__wrapper {
    display: flex;
  }

  .message {
    border: 1px solid rgba(tomato, 0.9);
    border-radius: 3px;
    padding: 5px;
  }

  .ui-input,
  .ui-btn {
    margin-bottom: 5px;
  }

  .first-element,
  .second-element {
    flex-grow: 2;
  }

  .second-element,
  .third-element {
    margin-left: 5px;
  }

  .third-element {
    flex-grow: 1;
  }
}

@media (max-width: 768px) {
  .form-group-item {
    &__wrapper {
      display: block;
      text-align: right;
    }

    .second-element,
    .third-element {
      margin-left: 0;
    }

    .second-element {
      margin-bottom: 5px;
    }
  }
}
</style>

<script setup lang="ts">
import { computed } from "vue";

import IconSquare from "../icon/IconSquare.vue";
import IconSquareCheck from "../icon/IconSquareCheck.vue";

const props = defineProps({
  modelValue: {
    type: [Boolean, Number],
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
});

const value = computed(() => {
  return props.modelValue === true || props.modelValue === 1;
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean | number): void;
}>();

const update = () => {
  let context: boolean | number;

  if (typeof props.modelValue === "number") {
    context = value.value ? 0 : 1;
  } else {
    context = !value.value;
  }

  emit("update:modelValue", context);
};
</script>

<template>
  <div class="ui-checkbox" @click="update">
    <IconSquareCheck v-if="value" class="ui-checkbox__icon" />
    <IconSquare v-else class="ui-checkbox__icon" />

    <span v-if="props.label" class="ui-checkbox__label">
      {{ props.label }}
    </span>
  </div>
</template>

<style lang="scss">
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-bottom: 20px;

  &__icon {
    width: 30px;
    height: 30px;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  &__label {
    font-size: 1rem;
    line-height: 1;
    margin-left: 5px;
  }
}
</style>

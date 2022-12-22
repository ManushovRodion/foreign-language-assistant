<script setup lang="ts">
import { getCurrentInstance, watchEffect, ref } from "vue";

const idComponent = `input-${getCurrentInstance()?.uid}`;

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  max: {
    type: [Number, String],
  },
  min: {
    type: [Number, String],
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const update = (event: Event) => {
  emit("update:modelValue", (event.currentTarget as HTMLInputElement).value);
};
</script>

<template>
  <div class="ui-input-text">
    <label v-if="props.label" :for="idComponent" class="ui-input-text__label">
      {{ props.label }}
    </label>
    <input
      :id="idComponent"
      class="ui-input-text__input"
      :type="props.type"
      :max="props?.max"
      :min="props?.min"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :value="props.modelValue"
      @input="update"
    />
  </div>
</template>

<style lang="scss">
.ui-input-text {
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 20px;

  &__label {
    font-size: 0.9rem;
    line-height: 1;
    padding-bottom: 3px;
  }

  &__input {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    outline: none;
    background-color: #ffffff;
    border: 1px solid #ced4da;
    border-radius: 3px;
    color: #495057;
    display: inline-block;
    width: 100%;
    padding: 10px;
  }
}
</style>

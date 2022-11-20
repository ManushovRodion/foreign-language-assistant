<script setup lang="ts">
import { getCurrentInstance } from "vue";

const idComponent = `input-${getCurrentInstance()?.uid}`;

const props = defineProps({
  value: {
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
});

const emit = defineEmits<{
  (e: "input", value: string): void;
}>();

const update = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("input", value.trim());
};
</script>

<template>
  <div class="ui-input">
    <label v-if="props.label" :for="idComponent" class="ui-input__label">
      {{ props.label }}
    </label>
    <input
      :id="idComponent"
      class="ui-input__input"
      type="text"
      @input="update"
      :value="props.value"
      :placeholder="props.placeholder"
    />
  </div>
</template>

<style lang="scss">
.ui-input {
  display: inline-flex;
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
    min-width: 100px;
    padding: 10px;
  }
}
</style>

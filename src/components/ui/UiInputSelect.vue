<script setup lang="ts">
import { getCurrentInstance, ref, computed, onUnmounted, onMounted } from "vue";
import type { PropType, ComponentPublicInstance } from "vue";

const idComponent = `input-select-${getCurrentInstance()?.uid}`;

type ListItem = {
  id: number;
  name: string;
};

const props = defineProps({
  modelValue: {
    type: Array as PropType<{ id: number; name: string }[]>,
    default: () => [],
  },
  options: {
    type: Array as PropType<{ id: number; name: string }[]>,
    default: () => [],
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
});

const emit = defineEmits<{
  (e: "update:modelValue", value: ListItem[]): void;
}>();

const search = ref("");
const element = ref<Element | ComponentPublicInstance | null>(null);

const items = computed(() => {
  if (!search.value) return props.options;

  return props.options.filter((item) => item.name.includes(search.value));
});

const isViewOptions = computed(() => {
  return search.value && items.value.length;
});

const inputValue = computed(() => {
  return props.modelValue[0]?.name || search.value;
});

const update = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  search.value = value.trim();
};

const back = (event: MouseEvent) => {
  if (!element.value || !event.target) return;

  const parent = element.value as HTMLElement;
  const child = event.target as HTMLElement;

  console.log(parent, child);
  if (!parent.contains(child)) {
    search.value = "";
  }
};

const select = (item: ListItem) => {
  search.value = "";
  emit("update:modelValue", [item]);
};

onMounted(() => {
  document.body.addEventListener("click", back);
});

onUnmounted(() => {
  document.body.removeEventListener("click", back);
});
</script>

<template>
  <div class="ui-input-select" :ref="(el) => (element = el)">
    <label v-if="props.label" :for="idComponent" class="ui-input-select__label">
      {{ props.label }}
    </label>

    <input
      :id="idComponent"
      class="ui-input-select__input"
      type="text"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :value="inputValue"
      @input="update"
    />

    <div v-if="isViewOptions" class="ui-input-select__options-wrapper">
      <div class="ui-input-select__options">
        <div
          v-for="option in items"
          :key="option.id"
          class="ui-input-select__option"
          @click="select(option)"
        >
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ui-input-select {
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

  &__options-wrapper {
    position: relative;
    max-height: 200px;
    background-color: #ffffff;
  }

  &__options {
    position: absolute;
    width: 100%;

    background-color: #ffffff;
    border-left: 1px solid #ced4da;
    border-right: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;
  }

  &__option {
    padding: 10px 15px;
    border-top: 1px solid #ced4da;
    background-color: rgba(#343a40, 0.1);
    cursor: pointer;
    user-select: none;
  }
}
</style>

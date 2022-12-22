<script setup lang="ts">
import { getCurrentInstance, ref, computed, onUnmounted, onMounted } from "vue";
import type { PropType, ComponentPublicInstance } from "vue";

import IconClose from "../icon/IconClose.vue";

const idComponent = `input-select-${getCurrentInstance()?.uid}`;

type ListItem = {
  id?: number;
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
  multiple: {
    type: Boolean,
    default: false,
  },
  combox: {
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
  if (props.multiple) return search.value;

  return props.modelValue[0]?.name || search.value;
});

const update = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  search.value = value.trim();
};

const comboxUpdate = (event: Event) => {
  if (!props.combox) return;

  let value = (event.target as HTMLInputElement).value;
  value = value.trim();

  if (!value) return;
  select({ name: value });
};

const back = (event: MouseEvent) => {
  if (!element.value || !event.target) return;

  const parent = element.value as HTMLElement;
  const child = event.target as HTMLElement;

  if (!parent.contains(child)) {
    search.value = "";
  }
};

const select = (item: ListItem) => {
  search.value = "";

  if (props.multiple) {
    if (isSelected(item.name)) {
      removeItem(item.name);
      return;
    }

    emit("update:modelValue", [...props.modelValue, item]);
    return;
  }

  emit("update:modelValue", [item]);
};

const removeItem = (name: ListItem["name"]) => {
  const items = props.modelValue.filter((item) => item.name !== name);
  emit("update:modelValue", items);
};

const isSelected = (name: ListItem["name"]) => {
  return !!props.modelValue.find((item) => item.name === name);
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

    <div v-if="props.multiple" class="ui-input-select__multiple">
      <div
        v-for="item in props.modelValue"
        :key="item.id"
        class="ui-input-select__multiple-item"
      >
        <span>{{ item.name }}</span>
        <IconClose @click="removeItem(item.name)" />
      </div>
    </div>

    <input
      :id="idComponent"
      class="ui-input-select__input"
      type="text"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :value="inputValue"
      @input="update"
      @change="comboxUpdate"
    />

    <div v-if="isViewOptions" class="ui-input-select__options-wrapper">
      <div class="ui-input-select__options">
        <div
          v-for="option in items"
          :key="option.id"
          class="ui-input-select__option"
          :class="{
            'ui-input-select__option_active': isSelected(option.name),
          }"
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

    &_active {
      background-color: rgba(#343a40, 0.5);
    }
  }

  &__multiple {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
    margin-bottom: 7px;
  }

  &__multiple-item {
    display: flex;
    margin-right: 5px;
    align-items: center;
    background-color: rgba(#343a40, 0.1);
    padding: 2px 5px;
    border-radius: 5px;

    & span {
      padding-right: 5px;
    }

    & svg {
      cursor: pointer;
    }
  }
}
</style>

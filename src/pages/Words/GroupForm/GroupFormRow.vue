<script setup lang="ts">
import { reactive, computed, type PropType } from "vue";

import UiBtn from "@/components/ui/UiBtn.vue";
import UiInputText from "@/components/ui/UiInputText.vue";

import type { GroupItem } from "../types";

const props = defineProps({
  value: {
    type: Object as PropType<GroupItem>,
    required: true,
  },
});

const data = reactive({
  original: props.value?.original || "",
  translate: props.value?.translate || "",
});

const isValid = computed(() => data.original && data.translate);

const emit = defineEmits<{
  (e: "update", value: GroupItem): void;
  (e: "remove"): void;
}>();

const update = () => {
  if (isValid.value) emit("update", data);
};

const remove = () => emit("remove");
</script>

<template>
  <div :class="[$style.wrapper, !isValid ? $style['wrapper_no-valid'] : '']">
    <div :class="$style.row">
      <UiInputText
        :class="[$style['first-element'], $style['ui-input']]"
        placeholder="Значение на иностранном"
        v-model.lazy="data.original"
        @update:model-value="update"
      />
      <UiInputText
        :class="[$style['second-element'], $style['ui-input']]"
        placeholder="Значение на родном"
        v-model.lazy="data.translate"
        @update:model-value="update"
      />
      <UiBtn
        v-if="isValid"
        :class="[$style['third-element'], $style['ui-btn']]"
        @click="remove"
      >
        Удалить
      </UiBtn>
    </div>

    <div v-if="!isValid" :class="$style.message">
      <small>
        Необходимо заполнить: "Значение на иностранном" и "Значение на родном"!
        <br />
        Если значения не будут заполнены - строка удалиться!
      </small>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  margin-bottom: 10px;

  &_no-valid {
    background-color: rgba(#343a40, 0.1);
    margin: 15px -15px 20px -15px;
    padding: 15px;
  }
}

.row {
  display: flex;
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

.message {
  border: 1px solid rgba(tomato, 0.9);
  border-radius: 3px;
  padding: 5px;
}

@media (max-width: 768px) {
  .row {
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
</style>

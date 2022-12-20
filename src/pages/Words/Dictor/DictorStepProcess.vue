<script lang="ts" setup>
import type { PropType } from "vue";
import { ref, computed } from "vue";

import UiBtn from "@/components/ui/UiBtn.vue";

import type { DictorItem } from "../types";

const props = defineProps({
  items: {
    type: Array as PropType<DictorItem[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "result", value: DictorItem[]): void;
}>();

const result = ref<DictorItem[]>([]);
const activeValue = ref("");
const cache: string[] = [];

const stop = () => {
  emit("result", result.value);
};

const next = () => {
  if (result.value.length === props.items.length) {
    return stop();
  }

  let value;
  while (!value) {
    const index = Math.floor(Math.random() * props.items.length);

    if (!cache.includes(props.items[index].original)) {
      cache.push(props.items[index].original);
      value = props.items[index];
    }
  }

  result.value.push(value);
  activeValue.value = value.original;
};

next();
</script>

<template>
  <div>
    <h2 :class="$style.title">
      Письменный Диктор ({{ result.length }} / {{ props.items.length }})
    </h2>

    <p :class="$style['text']">
      <strong>{{ activeValue }}</strong>
    </p>

    <div :class="$style['btn-groups']">
      <UiBtn :class="$style['ui-btn']" @click="stop()">Стоп</UiBtn>
      <UiBtn :class="$style['ui-btn']" @click="next()">Далее</UiBtn>
    </div>
  </div>
</template>

<style lang="scss" module>
.title {
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
}

.text {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}

.btn-groups {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;

  .ui-btn {
    margin-bottom: 0;

    &:first-child {
      margin-right: 5px;
    }
  }
}

@media (max-width: 768px) {
  .btn-groups {
    .ui-btn {
      width: 100%;
    }
  }
}
</style>

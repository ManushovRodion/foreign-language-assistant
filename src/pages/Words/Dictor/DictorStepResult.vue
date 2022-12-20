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

defineEmits<{
  (e: "close"): void;
  (e: "restart"): void;
}>();
</script>

<template>
  <div>
    <h2 :class="$style.title">Письменный Диктор</h2>

    <p :class="$style['text']">
      <small>Результат...</small>
    </p>

    <div
      v-for="(item, index) in props.items"
      :key="index"
      :class="$style['row']"
    >
      <div :class="$style['row__original']">{{ item.original }}</div>
      <div :class="$style['row__translate']">{{ item.translate }}</div>
    </div>

    <div :class="$style['btn-groups']">
      <UiBtn :class="$style['ui-btn']" @click="$emit('close')">Закрыть</UiBtn>
      <UiBtn :class="$style['ui-btn']" @click="$emit('restart')">Заново</UiBtn>
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
}

.row {
  display: flex;
  width: 100%;
  border-top: 1px solid #ced4da;
  user-select: text;

  &__original,
  &__translate {
    padding: 10px;
    width: 50%;
  }

  &__original {
    border-right: 1px solid #ced4da;
    margin-right: 5px;
  }
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

  .row {
    display: block;
    margin-bottom: 20px;

    &__original,
    &__translate {
      width: 100%;
    }

    &__original {
      border-right: none;
      margin-right: 0;
    }
  }
}
</style>

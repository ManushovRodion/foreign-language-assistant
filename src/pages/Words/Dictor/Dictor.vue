<script lang="ts" setup>
import { computed, ref } from "vue";

import UiModal from "@/components/ui/UiModal.vue";
import DictorStepStart from "./DictorStepStart.vue";
import DictorStepProcess from "./DictorStepProcess.vue";

import { useEventBusGroupDictor } from "../useEventBusGroupDictor";
import { useEventBusCardsDictor } from "../useEventBusCardsDictor";
import type { DictorItem } from "../types";
import DictorStepResult from "./DictorStepResult.vue";

type Process = "START" | "PROCESS" | "RESULT";

const dictorGroup = useEventBusGroupDictor();
const dictorCards = useEventBusCardsDictor();

const step = ref<Process>("START");
const resultItems = ref<DictorItem[]>([]);

const isOpen = computed(() => {
  return dictorGroup.isOpen || dictorCards.isOpen;
});

const items = computed(() => {
  if (dictorGroup.isOpen) return dictorGroup.data;
  if (dictorCards.isOpen) return dictorCards.data;
  return [];
});

const close = () => {
  step.value = "START";
  dictorGroup.close();
  dictorCards.close();
};

const result = (items: DictorItem[]) => {
  resultItems.value = items;
  step.value = "RESULT";
};
</script>

<template>
  <UiModal :model-value="isOpen" :action-closed="false">
    <div :class="$style.container">
      <DictorStepStart
        v-if="step === 'START'"
        :count="items.length"
        @close="close()"
        @start="step = 'PROCESS'"
      />

      <DictorStepProcess
        v-if="step === 'PROCESS'"
        :items="items"
        @result="result"
      />

      <DictorStepResult
        v-if="step === 'RESULT'"
        :items="resultItems"
        @close="close()"
        @restart="step = 'PROCESS'"
      />
    </div>
  </UiModal>
</template>

<style lang="scss" module>
.container {
  margin-top: 50px;
  margin-bottom: 50px;
  user-select: none;
}

@media (max-width: 768px) {
  .container {
    display: block;
  }
}
</style>

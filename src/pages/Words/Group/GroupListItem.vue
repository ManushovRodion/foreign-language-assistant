<script lang="ts" setup>
import type { PropType } from "vue";
import { computed } from "vue";

import UiCheckbox from "@/components/ui/UiCheckbox.vue";
import UiTooltip from "@/components/ui/UiTooltip.vue";
import UiBadge from "@/components/ui/UiBadge.vue";
import UiBtn from "@/components/ui/UiBtn.vue";

import { useEventBusGroupForm } from "../useEventBusGroupForm";
import { useEventBusGroupDictor } from "../useEventBusGroupDictor";
import { useEventBusCardsDictor } from "../useEventBusCardsDictor";

import type { Group } from "../types";

const props = defineProps({
  value: {
    type: Object as PropType<Group>,
    required: true,
  },
});

const eventBusForm = useEventBusGroupForm();
const eventBusDictor = useEventBusGroupDictor();
const eventBusDictorCard = useEventBusCardsDictor();

const check = computed(() => eventBusDictorCard.hasGroup(props.value.id));

const checkbox = () => {
  const { items, id, cardId } = props.value;

  if (!check.value) eventBusDictorCard.pushItems(items, id, cardId);
  else eventBusDictorCard.removeItems(id, cardId);
};
</script>

<template>
  <div :class="$style.wrapper">
    <div>
      <header :class="$style.header">
        <UiCheckbox
          :class="$style['ui-checkbox']"
          :model-value="check"
          @update:model-value="checkbox()"
        />
        <span>{{ props.value.title || "..." }}</span>
      </header>

      <section :class="$style.items">
        <template v-if="props.value.items.length">
          <span
            v-for="(item, index) in props.value.items"
            :key="index"
            :class="$style['items-item']"
          >
            <UiTooltip>
              {{ item.original }};

              <template #data>
                {{ item.translate }}
              </template>
            </UiTooltip>
          </span>
        </template>

        <p v-else>Нет слов/фраз... Необходимо <strong>добавить</strong>...</p>
      </section>

      <footer v-if="props.value.labels.length" :class="$style.footer">
        <UiBadge
          v-for="labels in props.value.labels"
          :key="labels.id"
          design="info"
          class="mr_5"
        >
          {{ labels.name }}
        </UiBadge>
      </footer>
    </div>

    <div :class="$style.action">
      <UiBtn
        :class="$style['ui-btn']"
        @click="eventBusForm.onUpdate(props.value)"
      >
        Изменить
      </UiBtn>
      <UiBtn
        :class="$style['ui-btn']"
        :disabled="!props.value.items.length"
        @click="eventBusDictor.open(props.value.items)"
      >
        Диктор
      </UiBtn>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #f8f9fa;
  margin-bottom: 20px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  min-height: 200px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .ui-checkbox {
    margin-bottom: 0;
    margin-right: 5px;
  }
}

.items {
  margin-top: 20px;
  margin-bottom: 30px;

  &-item {
    display: inline-block;
    padding: 3px;
    border-bottom: 1px solid var(--primary-color);
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.footer {
  margin-bottom: 10px;
}

.action {
  display: flex;
  flex-direction: column;

  .ui-btn {
    width: 100%;
    margin-bottom: 10px;
  }
}

@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
  }

  .action {
    flex-direction: row;

    .ui-btn:first-child {
      margin-right: 5px;
    }
  }
}
</style>

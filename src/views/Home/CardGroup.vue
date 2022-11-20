<script setup lang="ts">
import { type PropType, ref } from "vue";

import UiBtn from "@/components/ui/UiBtn.vue";
import UiCheckbox from "@/components/ui/UiCheckbox.vue";
import UiBadge from "@/components/ui/UiBadge.vue";
import UiTooltip from "@/components/ui/UiTooltip.vue";

import type { Group } from "./types";

const props = defineProps({
  group: {
    type: Object as PropType<Group>,
    requred: true,
    default: () => {},
  },
});

// example
const check = ref(false);
</script>

<template>
  <div class="card-group">
    <div class="card-group-context">
      <header class="card-group-header">
        <UiCheckbox v-model="check" />
        <span>{{ props.group.title || "..." }}</span>
      </header>

      <section class="card-group-items">
        <span
          v-for="(item, index) in props.group.items"
          :key="index"
          class="card-group-item"
        >
          <UiTooltip>
            {{ item.original }};

            <template #data>
              {{ item.translate }}
            </template>
          </UiTooltip>
        </span>
      </section>

      <footer v-if="props.group.meta.length" class="card-group-footer">
        <UiBadge
          v-for="meta in props.group.meta"
          :key="meta.id"
          design="info"
          class="mr_5"
        >
          {{ meta.name }}
        </UiBadge>
      </footer>
    </div>
    <div class="card-group-actions">
      <UiBtn>Изменить</UiBtn>
      <UiBtn>Диктор</UiBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-group {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #f8f9fa;
  margin-bottom: 20px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);

  &-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .ui-checkbox {
      margin-bottom: 0;
      margin-right: 5px;
    }
  }

  &-items {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  &-item {
    display: inline-block;
    padding: 3px;
    border-bottom: 1px solid var(--primary-color);
    margin-right: 10px;
    margin-bottom: 10px;
  }

  &-footer {
    margin-bottom: 10px;
  }

  &-actions {
    display: flex;
    flex-direction: column;

    .ui-btn {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}

@media (max-width: 768px) {
  .card-group {
    flex-direction: column;

    &-actions {
      flex-direction: row;

      .ui-btn:first-child {
        margin-right: 5px;
      }
    }
  }
}
</style>

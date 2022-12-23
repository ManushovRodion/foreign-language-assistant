<script setup lang="ts">
import { computed, defineProps, type PropType } from "vue";

type PropsBadgeDesign = "primary" | "warning" | "info";

const props = defineProps({
  design: {
    type: String as PropType<PropsBadgeDesign>,
    default: "primary",
  },
});

const classNames = computed(() => {
  const classNames = ["ui-badge"];

  classNames.push(`ui-badge_design-${props.design}`);

  return classNames;
});
</script>

<template>
  <span :class="classNames">
    <slot />
  </span>
</template>

<style lang="scss">
.ui-badge {
  min-width: 70px;
  display: inline-flex;
  justify-content: center;
  margin-bottom: 5px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 3px 5px;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 1px;

  &_design {
    &-primary {
      background-color: var(--primary-color_80);
      border-color: var(--primary-color_80);
    }

    &-warning {
      background-color: var(--warning-color_80);
      border-color: var(--warning-color_80);
    }

    &-info {
      background-color: var(--info-color_80);
      border-color: var(--info-color_80);
    }
  }
}
</style>

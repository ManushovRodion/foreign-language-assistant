<script setup lang="ts">
import { computed, defineProps, type PropType } from "vue";

type PropsBtnType = "button" | "submit" | "reset";
type PropsBtnDesign = "primary";

const props = defineProps({
  type: {
    type: String as PropType<PropsBtnType>,
    default: "button",
  },
  design: {
    type: String as PropType<PropsBtnDesign>,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const classNames = computed(() => {
  const classNames = ["ui-btn"];

  classNames.push(`ui-btn_type-${props.type}`);
  classNames.push(`ui-btn_design-${props.design}`);

  if (props.disabled) {
    classNames.push(`ui-btn_disabled`);
  }

  return classNames;
});
</script>

<template>
  <button :class="classNames" :type="props.type" :disabled="props.disabled">
    <span>
      <slot />
    </span>
  </button>
</template>

<style lang="scss">
.ui-btn {
  min-width: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  padding: 10px 15px;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  color: #ffffff;
  border-radius: 3px;
  outline: none;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  transition: 1s;
  margin-bottom: 20px;

  &_design {
    &-primary {
      background-color: var(--primary-color_80);
      border-color: var(--primary-color_80);

      &:hover {
        background-color: var(--primary-color);
      }
    }
  }

  &_disabled {
    background-color: var(--primary-color);
    opacity: 0.3;
    cursor: default;
  }
}
</style>

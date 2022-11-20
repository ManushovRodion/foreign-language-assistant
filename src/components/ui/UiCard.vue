<script setup lang="ts">
import { useSlots, computed } from "vue";

const slots = useSlots();

const isViewCardHeaderTitle = computed(() => slots?.title);
const isViewCardHeaderAction = computed(() => slots?.action);
const isViewCardHeader = computed(
  () => isViewCardHeaderTitle || isViewCardHeaderAction
);
</script>

<template>
  <div class="ui-card">
    <div class="ui-card-header" v-if="isViewCardHeader">
      <div
        class="ui-card-header__title"
        v-if="isViewCardHeaderTitle"
        :style="{ marginRight: isViewCardHeader ? '10px' : '0px' }"
      >
        <slot name="title" />
      </div>
      <div class="ui-card-header__action" v-if="isViewCardHeaderAction">
        <slot name="action" />
      </div>
    </div>
    <div class="ui-card-context">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.ui-card {
  background-color: #ffffff;
  margin-bottom: 30px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 4px;

  &-header {
    display: flex;
    align-items: center;
    padding: 15px 15px 0 15px;

    &__title {
      flex-grow: 2;
      font-size: 1.4rem;
      font-weight: 300;
      line-height: 2;
      margin-bottom: 10px;
    }

    &__action {
      margin-bottom: 10px;
    }
  }

  &-context {
    padding: 15px;
  }
}

@media (max-width: 768px) {
  .ui-card-header {
    display: block;

    &__action {
      width: 100%;
    }
  }
}
</style>

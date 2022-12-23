<script setup lang="ts">
import { useSlots } from "vue";

const slots = useSlots();
</script>

<template>
  <div class="ui-card">
    <div class="ui-card-header" v-if="slots?.title || slots?.action">
      <div
        v-if="slots?.title"
        class="ui-card-header__title"
        :style="{ marginRight: slots?.action ? '10px' : '0px' }"
      >
        <slot name="title" />
      </div>
      <div class="ui-card-header__action" v-if="slots?.action">
        <slot name="action" />
      </div>
    </div>
    <div class="ui-card-context">
      <slot />
    </div>

    <div class="ui-card-footer" v-if="slots?.footer">
      <slot name="footer" />
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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

  &-footer {
    display: flex;
    align-items: center;
    padding: 0 15px 15px 15px;
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

<script lang="ts" setup>
import UiBtn from "@/components/ui/UiBtn.vue";

const props = defineProps({
  count: {
    type: Number,
    required: true,
  },
});

defineEmits<{
  (e: "close"): void;
  (e: "start"): void;
}>();
</script>

<template>
  <div>
    <h2 :class="$style.title">Письменный Диктор ({{ props.count }})</h2>

    <div :class="$style['btn-groups']">
      <UiBtn :class="$style['ui-btn']" @click="$emit('close')">Закрыть</UiBtn>
      <UiBtn :class="$style['ui-btn']" @click="$emit('start')">Начать</UiBtn>
    </div>
  </div>
</template>

<style lang="scss" module>
.title {
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
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

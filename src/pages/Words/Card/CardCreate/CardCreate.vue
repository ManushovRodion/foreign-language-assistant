<script lang="ts" setup>
import { ref, computed } from "vue";
import { getMonth, getYear, getDaysInMonth } from "date-fns";

import UiBtn from "@/components/ui/UiBtn.vue";
import UiInputText from "@/components/ui/UiInputText.vue";
import UiModal from "@/components/ui/UiModal.vue";

import { useToggle } from "@/uses/useToggle";
import { useCard } from "./useCard";

interface Form {
  year: string;
  month: string;
  day: string;
}

const emit = defineEmits<{
  (e: "created"): void;
}>();

const date = new Date();
const year = getYear(date);
const month = getMonth(date);

const form = ref<Form>({
  year: String(year),
  month: String(month + 1),
  day: "",
});

const error = ref("");

const daysMont = computed(() => {
  const date = new Date(+form.value.year, +form.value.month - 1);
  return getDaysInMonth(date);
});

const isErrorYear = computed(() => +form.value.year < 2020);
const isErrorMonthMin = computed(() => +form.value.month < 1);
const isErrorMonthMax = computed(() => +form.value.month > 12);
const isErrorDayMin = computed(() => +form.value.day < 1);
const isErrorDayMax = computed(() => +form.value.day > daysMont.value);

const isError = computed(
  () =>
    isErrorYear.value ||
    isErrorMonthMin.value ||
    isErrorMonthMax.value ||
    isErrorDayMin.value ||
    isErrorDayMin.value
);

const modal = useToggle(false);
const card = useCard();

const create = async () => {
  const { year, month, day } = form.value;
  card.updateDate(new Date(`${year}-${month}-${day}`));

  await card.findCardByDay();

  if (card.data.id) {
    error.value =
      "- Мы не можем создать, так как с данной датой карточка есть!";
    return;
  }

  await card.create();
  modal.onNotActive();
  emit("created");
};
</script>

<template>
  <UiBtn :class="$style['ui-btn']" @click="modal.onActive">
    Создать карточку
  </UiBtn>

  <UiModal :model-value="modal.active.value" :action-closed="false">
    <div :class="$style.container">
      <h2 :class="$style.title">Новая карточка</h2>

      <div :class="$style.form">
        <UiInputText
          :class="$style['first-input']"
          type="number"
          :min="2020"
          label="Год"
          v-model="form.year"
          @update:model-value="error = ''"
        />
        <UiInputText
          :class="$style['second-input']"
          type="number"
          label="Месяц"
          min="1"
          max="12"
          v-model="form.month"
          @update:model-value="error = ''"
        />
        <UiInputText
          :class="$style['third-input']"
          type="number"
          label="День"
          :min="1"
          :max="daysMont"
          v-model="form.day"
          @update:model-value="error = ''"
        />
      </div>

      <div v-if="isError || error" style="color: tomato">
        <small v-if="isErrorYear">- Год должен быть не младьше 2020; </small>
        <br />
        <small v-if="isErrorMonthMin">
          - Значение месяца не может быть меньше 1;
        </small>
        <small v-if="isErrorMonthMax">
          - Значение месяца не может быть больше 12;
        </small>
        <br />
        <small v-if="isErrorDayMin">
          - Значение дня не может быть меньше 1;
        </small>
        <small v-if="isErrorDayMax">
          - Значение дня не может быть больше {{ daysMont }};
        </small>
        <small v-if="error">
          {{ error }}
        </small>
      </div>

      <div :class="$style['btn-groups']">
        <UiBtn :class="$style['ui-btn']" @click="modal.onNotActive()">
          Отменить/Закрыть
        </UiBtn>
        <UiBtn :class="$style['ui-btn']" :disabled="isError" @click="create()">
          Создать
        </UiBtn>
      </div>
    </div>
  </UiModal>
</template>

<style lang="scss" module>
.container {
  margin-top: 50px;
  user-select: none;
}

.title {
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
}

.form {
  display: flex;

  .first-input {
    margin-right: 5px;
    flex-grow: 2;
  }

  .second-input {
    margin-right: 5px;
  }

  .second-input,
  .third-input {
    flex-grow: 1;
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
}
</style>

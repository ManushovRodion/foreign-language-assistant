import { ref } from "vue";

export const useToggle = (value: boolean) => {
  const active = ref(value);

  const onToggle = () => {
    active.value = !active.value;
  };

  const onActive = () => {
    active.value = true;
  };

  const onNotActive = () => {
    active.value = false;
  };

  return {
    onToggle,
    onActive,
    onNotActive,
    active,
  };
};

import { reactive, ref } from "vue";

export enum OnSwip {
  ON_SWIP_UP = "SWIP_UP",
  ON_SWIP_DOWN = "SWIP_DOWN",
  ON_SWIP_LEFT = "SWIP_LEFT",
  ON_SWIP_RIGHT = "SWIP_RIGHT",
  NONE = "NONE",
}

export type OptionsSwiper = {
  autoStartProcess?: boolean;
  detectionRadius?: number;
};

const NAME_EVENT_TOUCH_START = "touchstart";
const NAME_EVENT_TOUCH_MOVE = "touchmove";

const DETECTION_RADIUS = 100;
const AUTO_START_PROCESS = true;

const parseOptions = (options?: OptionsSwiper): Required<OptionsSwiper> => {
  return {
    autoStartProcess: options?.autoStartProcess || AUTO_START_PROCESS,
    detectionRadius: options?.detectionRadius || DETECTION_RADIUS,
  };
};

export const useSwiper = (document: Document, options?: OptionsSwiper) => {
  const config = parseOptions(options);

  const state = reactive({ x: 0, y: 0 });
  const swip = ref(OnSwip.NONE);

  const handleTouchStart = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];

    state.x = clientX;
    state.y = clientY;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!state.x || !state.y) return;

    const { clientX, clientY } = event.touches[0];

    const diffX = state.x - clientX;
    const diffY = state.y - clientY;

    const isHorizontal = Math.abs(diffX) > Math.abs(diffY);

    if (isHorizontal) {
      if (Math.abs(diffX) < config.detectionRadius) {
        return;
      }

      swip.value = diffX > 0 ? OnSwip.ON_SWIP_LEFT : OnSwip.ON_SWIP_RIGHT;

      return;
    }

    if (Math.abs(diffY) < config.detectionRadius) {
      return;
    }

    swip.value = diffY > 0 ? OnSwip.ON_SWIP_UP : OnSwip.ON_SWIP_DOWN;
  };

  const startProcess = () => {
    document.addEventListener(NAME_EVENT_TOUCH_START, handleTouchStart);
    document.addEventListener(NAME_EVENT_TOUCH_MOVE, handleTouchMove);
  };

  const removeProcess = () => {
    document.removeEventListener(NAME_EVENT_TOUCH_START, handleTouchStart);
    document.removeEventListener(NAME_EVENT_TOUCH_MOVE, handleTouchMove);

    state.x = 0;
    state.y = 0;

    swip.value = OnSwip.NONE;
  };

  const resetProcess = () => {
    removeProcess();
    startProcess();
  };

  if (config.autoStartProcess) {
    startProcess();
  }

  return {
    startProcess,
    removeProcess,
    resetProcess,
    swip,
  };
};

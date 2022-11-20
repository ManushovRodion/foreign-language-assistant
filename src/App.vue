<script setup lang="ts">
import { computed, watch } from "vue";
import { RouterView, useRoute } from "vue-router";

import { useSwiper, OnSwip } from "./uses/useSwiper";
import { useToggle } from "./uses/useToggle";

import AppLogo from "./components/app/AppLogo.vue";
import AppVersion from "./components/app/AppVersion.vue";
import IconChevronLeft from "./components/icon/IconChevronLeft.vue";
import IconChevronRight from "./components/icon/IconChevronRight.vue";

const { swip } = useSwiper(document);
const sidebarToggle = useToggle(true);
const route = useRoute();

const classNames = computed(() => {
  return sidebarToggle.active.value ? "active-sidebar" : "";
});

const title = computed(() => route.meta.pageTitle || "");

watch(swip, (swip) => {
  if (swip === OnSwip.ON_SWIP_RIGHT) sidebarToggle.onActive();
  else if (swip === OnSwip.ON_SWIP_LEFT) sidebarToggle.onNotActive();
});

watch(sidebarToggle.active, (active) => {
  if (window.innerWidth > 991) return;

  const node = document.querySelector("body");
  if (!node) return;

  node.style.overflow = active ? "hidden" : "";
});

const toggle = () => {
  swip.value = OnSwip.NONE;
  sidebarToggle.onToggle();
};

const toggleActive = () => {
  if (window.innerWidth > 991) return;

  sidebarToggle.onToggle();
};

if (window.innerWidth <= 991) {
  sidebarToggle.onNotActive();
}
</script>

<template>
  <div class="layout" :class="classNames">
    <div class="sidebar">
      <div class="sidebar-logo">
        <AppLogo />
        <div class="sidebar-hr-logo" />
        <AppVersion />
      </div>

      <div
        class="sidebar-active"
        :class="{ 'sidebar-active_on': sidebarToggle.active.value }"
        @click="toggleActive"
      >
        <IconChevronLeft
          v-if="sidebarToggle.active.value"
          class="sidebar-active__icon"
        />
        <IconChevronRight v-else class="sidebar-active__icon" />
      </div>

      <div class="sidebar-context"></div>
    </div>
    <div class="layout-mask" @click="toggle" />
    <div class="wrapper">
      <div class="top-bar">
        <div class="top-bar-title" v-if="title">
          <span style="padding-right: 7px">#</span>
          <span>{{ title }}</span>
        </div>
      </div>

      <main class="context">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
$widthSidebar: 300px;

.layout {
  background-color: #f8f9fa;
}

.sidebar {
  position: fixed;
  z-index: 1000;
  width: $widthSidebar;
  height: 100%;
  transition: 1s;
  left: -#{$widthSidebar};
  background-color: #343a40;
  padding: 35px 15px;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  &-logo {
    margin-bottom: 30px;
    flex-grow: 1;
  }

  &-hr-logo {
    display: block;
    border-bottom: 1px solid var(--primary-color);
    width: 140px;
    margin: -8px auto 6px;
  }

  &-context {
    flex-grow: 2;
  }
  &-active {
    cursor: pointer;
    position: absolute;
    right: -15px;
    top: 32px;
    z-index: 1001;

    &::before {
      content: "";
      position: absolute;
      width: 40px;
      height: 40px;
      top: -5px;
      left: -10px;
      background-color: #343a40;
      z-index: -1;
      transform: rotate(45deg);
      border-radius: 3px;
    }

    &_on {
      right: -10px;

      &::before {
        left: 0;
        background-color: var(--primary-color);
      }
    }

    &__icon {
      width: 30px;
      height: 30px;
      fill: #ffffff;
    }
  }
}

.active-sidebar {
  .layout-mask {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 998;
    width: 100%;
    height: 100%;
  }
}

.active-sidebar > .sidebar {
  left: 0;
}

.wrapper {
  transition: 1s;
  position: relative;
  min-height: 100vh;
}

.context {
  padding: 100px 50px;
}

.top-bar {
  background-color: #ffffff;
  border-bottom: 1px solid #dee2e6;
  padding: 15px 50px;
  position: fixed;
  z-index: 900;
  width: 100%;
  user-select: none;

  &-title {
    text-transform: uppercase;

    span {
      display: inline-block;
    }

    span:first-letter {
      color: var(--primary-color);
    }
  }
}

@media (min-width: 992px) {
  .sidebar-active {
    cursor: default;

    &__icon {
      opacity: 0;
    }
  }

  .layout-mask {
    display: none;
  }

  .active-sidebar > .wrapper {
    margin-left: $widthSidebar;
    width: calc(100% - #{$widthSidebar});
  }
}

@media (max-width: 768px) {
  .top-bar {
    padding: 15px 15px;
  }

  .context {
    padding: 70px 15px;
  }
}
</style>

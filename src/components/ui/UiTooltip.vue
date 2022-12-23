<template>
  <div class="ui-tooltip">
    <slot />

    <div class="ui-tooltip-data">
      <slot name="data" />
    </div>
  </div>
</template>

<style lang="scss">
.ui-tooltip {
  position: relative;
  cursor: pointer;

  &-data {
    position: absolute;
    left: 0;
    bottom: 30px;
    width: 100%;
    min-width: 100px;
    visibility: hidden;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 3px;
      border-top: 5px solid #343a40;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
    }
  }

  &:hover .ui-tooltip-data {
    visibility: visible;
    padding: 10px;
    background-color: #343a40;
    color: #ffffff;
    border-radius: 4px;
    font-family: "Roboto", sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    letter-spacing: 1px;
  }
}
</style>

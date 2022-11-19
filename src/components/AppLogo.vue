<script setup lang="ts">
import { useAppData } from "@/uses/useAppData";

const { name: nameApp } = useAppData();

const name = nameApp
  .split(" ")
  .map((word) => `<span>${word}</span>`)
  .join(" ");
</script>

<template>
  <a href="/" v-html="name" class="app-logo"></a>
</template>

<style lang="scss">
.app-logo {
  font-size: 1.4rem;
  color: #ffffff;
  font-weight: 300;
  display: block;
  text-decoration: none;
  text-align: center;
  padding: 1rem;
  word-spacing: 7px;

  span {
    display: inline-block;
  }

  span:first-letter {
    color: var(--primary-color);
  }
}
</style>

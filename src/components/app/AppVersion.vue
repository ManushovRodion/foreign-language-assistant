<script setup lang="ts">
import { useAppData } from "@/uses/useAppData";

const { version, versionDate, versionLink } = useAppData();
</script>

<template>
  <a :href="versionLink" class="app-version">
    <span>{{ version }}</span>
    <span> от </span>
    <span>{{ versionDate }}</span>
  </a>
</template>

<style lang="scss">
.app-version {
  display: block;
  color: #ffffff;
  font-weight: 300;
  text-align: center;
  font-size: 0.8rem;
  text-decoration: none;
}
</style>

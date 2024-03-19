<template>
  <div class="container">
    <TheLoader v-if="getStatus" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useLoaderStore } from '~/store/loader';
import { storeToRefs } from 'pinia';

const loader = useLoaderStore();
const { getStatus } = storeToRefs(loader);
</script>

<style lang="sass" scoped>
.container
  width: 100%
  height: 100vh
  display: flex
  background-color: $background
  position: relative
</style>

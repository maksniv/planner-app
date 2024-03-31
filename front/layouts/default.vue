<template>
  <div class="container">
    <TheSidePanel />
    <TheLoader v-if="getStatus" />
    <main class="main__wrapper">
      <TheMainPanel></TheMainPanel>
      <slot />
    </main>
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
  flex-direction: row
  flex-wrap: nowrap
  position: relative
  .main__wrapper
    background-color: $background
    width: 100%
    height: 100%
    transition: .3s ease-out
</style>

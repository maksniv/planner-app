<template>
  <div class="container">
    <TheSidePanel />
    <main class="main__wrapper">
      <TheMainPanel></TheMainPanel>
      <TheLoader v-if="isFetching || isMutating" />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useIsFetching, useIsMutating } from '@tanstack/vue-query';

const isFetching = useIsFetching();
const isMutating = useIsMutating();
</script>

<style lang="sass" scoped>
.container
  width: 100vw
  height: 100vh
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  .main__wrapper
    position: relative
    background-color: $background
    width: 100%
    height: 100%
</style>

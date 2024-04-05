<template>
  <div class="container">
    <TheSidePanel />
    <TheLoader v-if="isFetching || isMutating" />
    <main class="main__wrapper">
      <TheMainPanel></TheMainPanel>
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
  position: relative
  .main__wrapper
    background-color: $background
    width: 100%
    height: 100%
</style>

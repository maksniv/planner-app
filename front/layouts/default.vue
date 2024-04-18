<template>
  <div class="container">
    <TheSidePanel />
    <div class="main__wrapper">
      <TheMainPanel></TheMainPanel>
      <TheLoader v-if="isFetching || isMutating" />
      <main class="content">
        <slot />
      </main>
    </div>
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
    width: 100%
    height: 100%
    .content
      overflow: auto
      background-color: var(--background)
      width: 100%
      height: 100%
</style>

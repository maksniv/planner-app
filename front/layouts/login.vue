<template>
  <div class="container">
    <TheLoader v-if="isFetching || isMutating" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useIsFetching, useIsMutating } from '@tanstack/vue-query';

const isFetching = useIsFetching();
const isMutating = useIsMutating();
</script>

<style lang="sass" scoped>
.container
  width: 100%
  height: 100vh
  display: flex
  background-color: var(--background)
  position: relative
</style>

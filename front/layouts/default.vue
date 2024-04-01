<template>
  <div class="container">
    <TheSidePanel />
    <TheLoader v-if="getStatus" />
    <main
      class="main__wrapper"
      :class="{ 'is-hidden': getOpenStatus, 'is-visible': !getOpenStatus }"
    >
      <TheMainPanel></TheMainPanel>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useLoaderStore } from '~/store/loader';
import { storeToRefs } from 'pinia';
import { useSideBarStore } from '~/store/sideBar';

const store = useSideBarStore();
const { getOpenStatus } = storeToRefs(store);
const loader = useLoaderStore();
const { getStatus } = storeToRefs(loader);
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
    &.is-visible
      width: calc( 100vw - 265px )
      animation: open 0.4s ease-in
    &.is-hidden
      width: 100vw
      animation: close 0.4s ease


@keyframes open
  0%
    width: 100vw
  100%
    width: calc( 100vw - 265px )

@keyframes close
  0%
    width: calc( 100vw - 265px )
  100%
    width: 100vw
</style>

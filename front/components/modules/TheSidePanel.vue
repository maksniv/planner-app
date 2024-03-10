<template>
  <aside
    class="aside__wrapper"
    :class="{ 'is-hidden': getOpenStatus, 'is-visible': !getOpenStatus }"
  >
    <img src="/logo.png" class="aside__logo" />
    <TheNavigation></TheNavigation>
  </aside>
</template>

<script setup lang="ts">
import { useSideBarStore } from '~/store/sideBar';
import { storeToRefs } from 'pinia';

const store = useSideBarStore();
const { getOpenStatus } = storeToRefs(store);
</script>

<style lang="sass" scoped>
.aside__wrapper
  flex-direction: column
  flex-wrap: nowrap
  justify-content: flex-start
  align-items: center
  gap: 30px
  max-width: 300px
  height: 100vh
  background-color: $sidebar
  display: none
  .aside__logo
    margin: 20px 10px
    height: 70px
  &.is-visible
    display: flex
    animation: open 0.4s ease-in
    animation-fill-mode: forwards
  &.is-hidden
    animation: close 0.4s ease

@keyframes open
  0%
    display: none
    width: 0%
  100%
    width: 100%
    display: flex

@keyframes close
  0%
    display: flex
    width: 100%
  100%
    width: 0%
    display: none
</style>

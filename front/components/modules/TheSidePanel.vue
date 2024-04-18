<template>
  <aside
    class="aside__container"
    :class="{ 'is-hidden': getOpenStatus, 'is-visible': !getOpenStatus }"
  >
    <div class="aside__wrapper">
      <TheLogo />
      <TheNavigation />
    </div>
    <div class="aside__wrapper">
      <TheThemeSwitcher/>
      <TheLogoutButton />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useSideBarStore } from '~/store/sideBar';
import { storeToRefs } from 'pinia';

const store = useSideBarStore();
const { getOpenStatus } = storeToRefs(store);
</script>

<style lang="sass" scoped>
.aside__container
  flex-direction: column
  flex-wrap: nowrap
  justify-content: space-between
  align-items: center
  gap: 30px
  max-width: 265px
  height: 100vh
  background-color: var(--sidebar)
  padding-bottom: 30px
  .aside__wrapper
    display: flex
    flex-direction: column
    flex-wrap: nowrap
    justify-content: flex-start
    align-items: center
    gap: 10px
  &.is-visible
    display: flex
    animation: open 0.4s ease-in
  &.is-hidden
    display: none
    animation: close 0.4s ease

@keyframes open
  0%
    display: none
    width: 0
  100%
    width: 100%
    display: flex

@keyframes close
  0%
    display: flex
    width: 100%
  100%
    width: 0
    display: none
</style>

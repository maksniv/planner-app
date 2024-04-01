<template>
  <aside
    class="aside__container"
    :class="{ 'is-hidden': getOpenStatus, 'is-visible': !getOpenStatus }"
  >
    <div class="aside__left-wrapper">
      <Icon
        class="left-wrapper__icon"
        :name="'iconamoon:menu-burger-horizontal-bold'"
        size="40"
        @click="changeOpenStatusValue()"
      ></Icon>
      <span class="left-wrapper__title">{{ getActivePageTitle }}</span>
    </div>
    <button>Добавить задачу</button>
  </aside>
</template>

<script setup lang="ts">
import { useSideBarStore } from '~/store/sideBar';
import { storeToRefs } from 'pinia';

const store = useSideBarStore();
const { changeOpenStatusValue } = store;
const { getOpenStatus } = storeToRefs(store);
const { getActivePageTitle } = storeToRefs(store);
</script>

<style lang="sass" scoped>
.aside__container
  color: $textColor
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: space-between
  align-items: center
  min-height: 70px
  padding: 0 15px 0 10px
  background-color: $sidebar
  // transition: all .3s ease
  &.is-visible
    width: calc( 100vw - 265px )
    animation: open 0.35s ease-in
  &.is-hidden
    width: 100vw
    animation: close 0.35s ease-in-out
  .aside__left-wrapper
    color: $textColor
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    justify-content: space-between
    align-items: center
    gap: 20px
    .left-wrapper__icon
      cursor: pointer
      padding: 5px
      transition: .3s
      &:hover
        transform: scale(1.15)
        background-color: $border
        border-radius: 100px
      &:active
        transform: scale(0.95)
        background-color: $border
        border-radius: 80px
    .left-wrapper__title
      user-select: none
      font-size: 25px

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

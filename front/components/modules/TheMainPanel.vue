<template>
  <aside class="aside__container">
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
const { getActivePageTitle } = storeToRefs(store);
</script>

<style lang="sass" scoped>
.aside__container
  color: var(--base-text-color)
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: space-between
  align-items: center
  min-height: 70px
  padding: 0 15px 0 10px
  background-color: var(--sidebar)
  .aside__left-wrapper
    color: inherit
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
        background-color: var(--border-base)
        border-radius: 100px
      &:active
        transform: scale(0.95)
        background-color: var(--border-base)
        border-radius: 80px
    .left-wrapper__title
      user-select: none
      font-size: 25px
</style>

<template>
  <aside class="aside__container">
    <div class="aside__left-wrapper">
      <Icon
        class="left-wrapper__icon"
        :name="'iconamoon:menu-burger-horizontal-bold'"
        size="40"
        @click="changeActivePageTitle()"
      ></Icon>
      <span class="left-wrapper__title">{{ getActivePageTitle }}</span>
    </div>
    <button>Добавить задачу</button>
  </aside>
</template>

<script setup lang="js">
import { useSideBarStore } from '~/store/sideBar';
import { storeToRefs } from 'pinia';

const store = useSideBarStore();
const { changeActivePageTitle } = store;
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
  padding: 0 15px 0 0
  background-color: $sidebar
  .aside__left-wrapper
    color: $textColor
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    justify-content: space-between
    align-items: center
    gap: 30px
    .left-wrapper__icon
      padding: 5px
      transition: .3s
      &:hover
        transform: scale(1.20)
        background-color: $border
        border-radius: 100px
    .left-wrapper__title
      font-size: 25px
</style>

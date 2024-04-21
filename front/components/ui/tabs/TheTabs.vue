<template>
  <div class="tabs__wrapper">
    <div class="tabs__nav">
      <span
        v-for="tab in tabs"
        :key="tab.id"
        class="nav__item"
        :class="{ 'nav__item--active': tab.id === modelValue }"
        @click="
          $emit('update:modelValue', tab.id);
          $emit('change')"
      >
        {{ tab.name }}
      </span>
    </div>
    <div class="tabs__content">
      <slot name="content" :active="modelValue"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
type Tab = {
  name: string,
  id: number,
};
interface Props {
  tabs: Array<Tab>,
  modelValue: number,
}

defineProps<Props>();

defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change'): void;
}>();

</script>

<style scoped lang="sass">

.tabs__nav
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  align-items: center
  justify-content: center
  margin-bottom: 15px
  .nav__item
    height: var(--base-height)
    color: var(--base-text-color)
    display: flex
    justify-content: center
    align-items: center
    margin: 0 5px
    cursor: pointer
    padding: 0 10px
    &:hover
      color: var(--primary-hover)
    &.nav__item--active
      border-bottom: 2px solid var(--primary)
      color: var(--primary)
      transition: border 0.2s ease
</style>
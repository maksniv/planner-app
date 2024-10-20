<template>
  <div
    v-click-outside="clickOutside"
    class="dropdown"
    @click="toggleMenu"
  >
    <slot name="opening-part"/>
    <div v-show="isOpened" class="dropdown__menu">
      <slot name="menu"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpened = ref(false);

const toggleMenu = () => {
  isOpened.value = !isOpened.value;
}
const clickOutside = () => {
  isOpened.value = false;
}
</script>

<style lang="sass" scoped>
.dropdown
  position: relative
  max-height: 50px
  .dropdown__menu
    z-index: var(--z-dropdown)
    position: absolute
    min-width: 150px
    right: 0
    display: flex
    flex-direction: column
    padding: 8px 0
    border: 1px solid var(--border-base)
    border-radius: var(--border-radius)
    background-color: var(--sidebar)
    box-shadow: 0 4px 6px var(--box-shadow)
</style>
<template>
  <div
    class="dropdown"
    @click="toggleMenu"
    v-click-outside="clickOutside"
  >
    <slot name="opening-part"></slot>
    <div class="dropdown__menu" v-show="isOpened">
      <slot name="menu"></slot>
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
    position: absolute
    min-width: 150px
    right: 0
    top: 55px
    display: flex
    flex-direction: column
    padding: 8px 0
    border: 1px solid var(--border-base)
    border-radius: var(--border-radius)
    background-color: var(--sidebar)
    box-shadow: 0 4px 6px var(--box-shadow)
</style>
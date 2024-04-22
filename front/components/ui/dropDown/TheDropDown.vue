<template>
  <div
    class="dropdown"
    @click="toggleMenu"
  >
    <slot name="opening-part"></slot>
    <div class="dropdown__menu" v-show="isOpened">
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, onUnmounted } from 'vue';

const isOpened = ref(false);

const toggleMenu = () => {
  console.log('working')
  isOpened.value = !isOpened.value;
  console.log(isOpened.value);
}
const clickOutside = () => {
  isOpened.value = false;
}

// onMounted(() => {
//   document.addEventListener('click', clickOutside);
// });
//
// onUnmounted(() => {
//   document.addEventListener('click', clickOutside);
// })

</script>

<style lang="sass" scoped>
.dropdown
  position: relative
  .dropdown__menu
    position: absolute
    min-width: 150px
    right: 0
    top: 50px
    display: flex
    flex-direction: column
    padding: 8px 0
    border-radius: var(--border-radius)
    background-color: var(--background)
    box-shadow: 0 4px 6px var(--box-shadow)
</style>
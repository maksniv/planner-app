<template>
  <div>
    <p>Это авторизация</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
</script>

<style lang="sass" scoped>
p
  width: 100%
  background-color: tomato
</style>

<template>
  <div>
    <p>Это ошибка</p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
};
</script>

<style lang="sass" scoped>
p
  width: 100%
  background-color: tomato
</style>

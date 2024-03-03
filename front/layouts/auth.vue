<template>
  <div>
    <p>Это ошибка</p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
};
</script>

<style lang="sass" scoped>
p
  width: 100%
  background-color: tomato
</style>

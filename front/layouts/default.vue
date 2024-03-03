<template>
  <div>
    <p>Это наша навигация</p>
    <slot />
  </div>
</template>

<script setup lang="js">
useHead({
  title: 'My App',
  meta: [{ name: 'description', content: 'My amazing site.' }],
});

// export default {
//   name: 'DefaultLayout',
//   data() {
//     return {
//       msg: 'Hello world!',
//     };
//   },
// };
</script>

<style lang="sass" scoped>
p
  width: 100%
  background-color: tomato
</style>

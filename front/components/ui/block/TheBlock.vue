<template>
  <div class="block">
    <slot/>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.block
  border: 1px solid var(--border-base)
  border-radius: var(--border-radius)
  background-color: var(--main)
  box-shadow: 0 4px 6px var(--box-shadow)
  padding: 15px
</style>
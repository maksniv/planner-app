<template>
  <button class="button" :class="`button_${color}`" v-bind="$attrs" >
    <slot> </slot>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  color?: string | 'primary';
}
defineProps<Props>();
</script>

<style scoped lang="sass">
.button
  cursor: pointer
  user-select: none
  padding: 12px 16px
  height: var(--base-height)
  background-color: var(--primary)
  color: var(--white)
  border-radius: var(--border-radius)
  transition: all .25s ease-out
  box-shadow: 0 4px 6px var(--box-shadow)
  &:hover
    transform: scale(1.03)
    background-color: var(--primary-hover)
  &:active
    transform: scale(0.97)
    background-color: var(--primary)
  &:disabled
    transform: scale(1.0)
    background-color: var(--disabled)
    color: var(--disabled-text-color)
</style>

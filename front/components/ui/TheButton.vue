<template>
  <button class="button" v-bind="$attrs">
    <slot> </slot>
  </button>
</template>

<style scoped lang="sass">
.button
  cursor: pointer
  user-select: none
  padding: 12px 16px
  height: 42px
  background-color: $btnBgColor
  color: $btnColor
  border-radius: 8px
  transition: .15s ease-out
  &:hover
    transform: scale(1.03)
  &:active
    transform: scale(0.97)
  &:disabled
    transform: scale(1.0)
    background-color: $btnBgDisabled
    color: $btnColorDisabled
</style>

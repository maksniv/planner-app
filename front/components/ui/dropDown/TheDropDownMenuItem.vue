<template>
  <span v-bind="$attrs" class="dropdown-menu__item"><slot/></span>
</template>

<style lang="sass" scoped>
.dropdown-menu__item
  display: flex
  flex-direction: row
  align-items: center
  justify-content: flex-start
  gap: 10px
  flex-wrap: nowrap
  white-space: nowrap
  cursor: pointer
  width: 100%
  padding: 8px 16px
  color: var(--secondary-text-color)
  &:hover
    background-color: var(--background)
  &:disabled
    color: var(--disabled-text-color)
</style>
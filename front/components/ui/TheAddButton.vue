<template>
  <Icon name="gala:add" size="50" class="add-button__icon" />
</template>

<style lang="sass" scoped>
.add-button__icon
    color: $primary
    transition: .25s ease-out
    &:hover
        transform: scale(1.15)
    &:active
        transform: scale(0.95)
</style>

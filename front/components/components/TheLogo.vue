<template>
  <div class="logo">
    <Icon name="bi:calendar-check" size="45" class="logo__icon"></Icon>
    <span class="logo__text">max-planner</span>
  </div>
</template>

<style lang="sass" scoped>
.logo
    color: $primary
    width: 265px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    // gap: 10px
    user-select: none
    padding: 20px 12px
    height: 100px
    .logo__text
        font-size: 29px 
</style>

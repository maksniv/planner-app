<template>
  <div class="logo">
    <Icon name="line-md:text-box-twotone" size="50" class="logo__icon"/>
    <span class="logo__text">MAX Planner</span>
  </div>
</template>

<style lang="sass" scoped>
.logo
    color: var(--primary)
    width: 265px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    user-select: none
    padding: 20px 20px 20px 10px
    height: 100px
    .logo__text
        font-size: 29px
        color: var(--text)
</style>

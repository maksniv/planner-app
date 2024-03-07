<template>
  <aside class="aside__wrapper">
    <img src="/logo.png" class="aside__logo" />
    <TheNavigation></TheNavigation>
  </aside>
</template>

<style lang="sass" scoped>
.aside__wrapper
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: flex-start
  align-items: center
  gap: 30px
  height: 100vh
  background-color: $sidebar
  .aside__logo
    margin: 20px 10px
    height: 70px
</style>

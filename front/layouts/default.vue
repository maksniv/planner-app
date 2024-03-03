<template>
  <div class="container">
    <TheNavigation />
    <main class="main__wrapper">
      <slot />
    </main>
  </div>
</template>

<style lang="sass" scoped>
.container
  width: 100%
  height: 100vh
  display: grid
  grid-template-columns: 1fr 6fr
  .main__wrapper
    background-color: $background
</style>

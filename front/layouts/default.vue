<template>
  <div class="container">
    <TheSidePanel />
    <main class="main__wrapper">
      <TheMainPanel></TheMainPanel>
      <slot />
    </main>
  </div>
</template>

<style lang="sass" scoped>
.container
  width: 100%
  height: 100vh
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  .main__wrapper
    background-color: $background
    width: 100%
    transition: .3s ease-out
</style>

<template>
  <div class="skeleton"/>
</template>

<style lang="sass" scoped>

.skeleton
    width: 100%
    height: var(--base-height)
    animation: skeleton-loader-shimmer 1s linear infinite forwards
    background: var(--base-skeleton)
    //background-image: gradient(linear, left center, right center, from(#333), color-stop(.2, #333), color-stop(.4, #333), to(#333))
    //background-image: linear-gradient(to right, var(--base-skeleton) 0%, var(--skeleton-light) 20%, #ddd 40%, var(--base-skeleton) 100%)
    background-repeat: no-repeat
    background-size: 800px 104px
    border-radius: var(--border-radius)
</style>

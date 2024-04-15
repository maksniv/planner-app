<template>
  <div class="skeleton"></div>
</template>

<style lang="sass" scoped>

.skeleton
    width: 100%
    height: $baseHeight
    animation: skeleton-loader-shimmer 1s linear infinite forwards
    background: $baseSkeleton
    background-image: gradient(linear, left center, right center, from(#333), color-stop(.2, #333), color-stop(.4, #333), to(#333))
    background-image: linear-gradient(to right, $baseSkeleton 0%, $skeletonLight 20%, #ddd 40%, $baseSkeleton 100%)
    background-repeat: no-repeat
    background-size: 800px 104px
    border-radius: 3px
</style>

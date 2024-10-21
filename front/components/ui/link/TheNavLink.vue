<template>
  <NuxtLink
    :to="link"
    class="link__nav"
    >
      <Icon
        :name="icon"
        class="link__icon"
        size="20"
      />
      {{ title }}
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  link: string;
  icon: string;
}
defineProps<Props>();
</script>

<style lang="sass" scoped>
.link__nav
  cursor: pointer
  user-select: none
  min-width: 90%
  height: 50px
  font-size: 16px
  color: var(--text-secondary)
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  text-wrap: nowrap
  justify-content: flex-start
  align-items: center
  gap: 12px
  padding: 15px 24px
  border-radius: 0 100px 100px 0
  transition: .3s ease-out
  &:hover
    transform: scale(1.05)
    background-color: var(--border-base)
  &:active
    transform: scale(0.99)
    background-color: var(--border-base)
  &.router-link-active
    background-color: var(--primary)
    color: var(--white)
  .link__icon
    min-width: 20px
    min-height: 20px

</style>

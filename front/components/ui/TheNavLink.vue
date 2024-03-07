<template>
  <NuxtLink :to="link" class="link__nav">
    <Icon :name="icon" class="link__icon" size="20"></Icon>
    {{ title }}
  </NuxtLink>
</template>

<script setup lang="js">
defineProps({
  title: {
    type: String,
    default: 'Ссылка',
  },
  link: {
    type: String,
    default: '/',
  },
  icon: {
    type: String,
    default: '',
  },
});
</script>

<style lang="sass" scoped>
.link__nav
  cursor: pointer
  width: 90%
  font-size: 16px
  color: $secondaryTextColor
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: flex-start
  align-items: center
  gap: 12px
  padding: 15px 24px
  transition: .3s
  &:hover
    background-color: $border
    border-radius: 0 100px 100px 0

.link__nav.router-link-active
  background-color: $primary
  color: $textColor
  border-radius: 0 100px 100px 0
</style>

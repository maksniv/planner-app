<template>
  <NuxtLink :to="link" class="link__nav">
    <Icon :name="icon" class="link__icon" size="25"></Icon>
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
  width: 100%
  font-size: 25px
  color: $textColor
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: flex-start
  align-items: center
  gap: 8px
  transition: all 0.2s
  padding: 5px 10px
  &:hover
    background-color: $border
    border-radius: 30px

.link__nav.router-link-active
  background-color: $primary
  color: $sidebar
  border-radius: 30px
</style>

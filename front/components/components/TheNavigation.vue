<template>
  <div class="navigation">
    <TheNavLink
      v-for="link in links"
      :key="link.link"
      :title="link.title"
      :link="link.link"
      :icon="link.icon"
    ></TheNavLink>
  </div>
</template>

<script setup lang="ts">
const links = ref([
  { title: 'Задачи', link: '/', icon: 'radix-icons:dashboard' },
  { title: 'Пользователь', link: '/user', icon: 'mingcute:group-line' },
  {
    title: 'Статистика',
    link: '/statistics',
    icon: 'ic:sharp-stacked-line-chart',
  },
  { title: 'Настройки', link: '/setting', icon: 'radix-icons:gear' },
  { title: 'вход', link: '/login', icon: 'radix-icons:gear' },
]);
</script>

<style lang="sass" scoped>
.navigation
  width: 100%
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: flex-start
  align-items: flex-start
</style>

<template>
  <div class="navigation">
    <TheNavLink
      v-for="link in links"
      :key="link.link"
      :title="link.title"
      :link="link.link"
      :icon="link.icon"
    />
  </div>
</template>

<script setup lang="ts">
import { type NavLink } from '~/types/navLink.types';

const links = ref<Array<NavLink>>([
  { title: 'Список задач', link: '/', icon: 'radix-icons:dashboard' },
  { title: 'Календарь', link: '/calendar', icon: 'bx:calendar' },
  { title: 'Группы задач', link: '/groups-task', icon: 'fluent-mdl2:rows-group' },
  { title: 'Статистика', link: '/statistics', icon: 'ic:sharp-stacked-line-chart'},
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

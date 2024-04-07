<template>
  <div class="statistics-page">
    <TheStatisticsBlock />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSideBarStore } from '~/store/sideBar';

useHead({
  title: 'Статистика',
  meta: [{ name: 'Статистика', content: 'Статистика' }],
});

const { changeActivePageTitle } = useSideBarStore();

onMounted(() => {
  changeActivePageTitle('Статистика');
});
</script>

<style lang="sass" scoped>
.statistics-page
  width: 100%
  height: 100%
  display: flex
  padding: 15px
</style>

<template>
  <TheStatisticsBlock />
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

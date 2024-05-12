<template>
  <div class="task-page">
    <TheListingTop/>
    <TheTasksListing/>
    <NuxtPage />
  </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSideBarStore } from '~/store/sideBar';

const store = useSideBarStore();
const { changeActivePageTitle } = store;

onMounted(() => {
  changeActivePageTitle('Задачи');
});

useHead({
  title: 'Задачи',
  meta: [{ name: 'Задачи', content: 'Задачи' }],
});
</script>

<style scoped lang="sass">
.task-page
  width: 100%
  min-height: 100%
  display: grid
  grid-template-columns: repeat(1, 1fr)
  gap: 15px
  padding: 15px
</style>
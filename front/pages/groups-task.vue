<template>
  <div class="groups-task-page">
    <TheGroupsTask />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSideBarStore } from '~/store/sideBar';

const store = useSideBarStore();
const { changeActivePageTitle } = store;

onMounted(() => {
  changeActivePageTitle('Группы задач');
});

useHead({
  title: 'Группы задач',
  meta: [{ name: 'Группы задач', content: 'Группы задач' }],
});
</script>

<style lang="sass" scoped>
.groups-task-page
  width: 100%
  height: 100%
  display: flex
  padding: 15px
</style>

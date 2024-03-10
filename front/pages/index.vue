<template>
  <div>
    <p>Страничка по умолчанию</p>
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

<style lang="css" scoped>
p {
  width: 100%;
  background-color: rgb(52, 52, 224);
}
</style>

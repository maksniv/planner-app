<template>
    <div class="statistics-page__container">
    <div class="statistics-page__statistics red">
    </div>
    <div class="statistics-page__statistics blue">
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSideBarStore } from '~/store/sideBar';

const store = useSideBarStore();
const { changeActivePageTitle } = store;

onMounted(() => {
  changeActivePageTitle('Настройки');
});

useHead({
  title: 'Настройки',
  meta: [{ name: 'Настройки', content: 'Настройки' }],
});
</script>

<style lang="sass" scoped>
.statistics-page__container
  max-width: 100%
  height: 100%
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 20px
  padding: 50px 10px 10px
  .statistics-page__statistics
    height: 300px
    width: 100%
.red
  background-color: red    
.blue
  background-color: blue  
</style>

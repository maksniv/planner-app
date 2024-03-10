<template>
  <div>
    <p>Страничка настроек</p>
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
p
  width: 100%
  background-color: yellow
</style>

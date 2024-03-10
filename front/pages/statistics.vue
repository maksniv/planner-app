<template>
  <div>
    <p>Страничка статистики</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSideBarStore } from '~/store/sideBar';

const store = useSideBarStore();
const { changeActivePageTitle } = store;

onMounted(() => {
  changeActivePageTitle('Статистика');
})

useHead({
  title: 'Статистика',
  meta: [{ name: 'Статистика', content: 'Статистика' }],
});
</script>

<style lang="sass" scoped>
p
 width: 100%
 background-color: $primary
</style>

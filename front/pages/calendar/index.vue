<template>
  <div>Календарь</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSideBarStore } from '~/store/sideBar';

const store = useSideBarStore();
const { changeActivePageTitle } = store;

onMounted(() => {
  changeActivePageTitle('Календарь');
});

useHead({
  title: 'Календарь',
  meta: [{ name: 'Календарь', content: 'Календарь' }],
});
</script>

<style scoped lang="sass">

</style>
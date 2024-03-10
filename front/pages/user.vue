<template>
  <div>
    <p>Страничка юзера</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSideBarStore } from '~/store/sideBar';

const store = useSideBarStore();
const { changeActivePageTitle } = store;

onMounted(() => {
  changeActivePageTitle('Пользователь');
})

useHead({
  title: 'Пользователь',
  meta: [{ name: 'Пользователь', content: 'Пользователь' }],
});
</script>

<style lang="sass" scoped>
p
 width: 100%
 background-color: $primary
</style>

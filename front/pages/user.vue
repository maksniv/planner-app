<template>
  <div class="user-page">
    <TheUserBlock />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSideBarStore } from '~/store/sideBar';

const store = useSideBarStore();
const { changeActivePageTitle } = store;

onMounted(() => {
  changeActivePageTitle('Пользователь');
});

useHead({
  title: 'Пользователь',
  meta: [{ name: 'Пользователь', content: 'Пользователь' }],
});
</script>

<style lang="sass" scoped>
.user-page
 width: 100%
 height: 100%
 display: flex
 padding: 15px
</style>

<template>
  <div class="test">
    <TheCheckbox label="RRRRRR" v-model="tesr" :disabled="dis"></TheCheckbox>
    <TheButton @click="dis = !dis">dis {{ dis }}</TheButton>
    <TheButton @click="tesr = !tesr">val {{ tesr }}</TheButton>
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


const dis = ref(true);
const tesr = ref(true);
</script>

<style lang="sass" scoped>
.test
  margin: 50px
</style>

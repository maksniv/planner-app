<template>
  <div class="statistics-page__container">
    <div class="statistics-page__statistics">
      <TheStatisticsQuantity :statistics="data?.statisticsQuantity" />
    </div>
    <div class="statistics-page__statistics">
      <TheStatisticsWeekly :statistics="data?.statisticsWeekly" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { onMounted } from 'vue';
import { useSideBarStore } from '~/store/sideBar';
import { useLoaderStore } from '~/store/loader';
import { getStatistics } from '@/composables/statistics.service';

useHead({
  title: 'Статистика',
  meta: [{ name: 'Статистика', content: 'Статистика' }],
});

const { changeActivePageTitle } = useSideBarStore();
const loader = useLoaderStore();

onMounted(() => {
  changeActivePageTitle('Статистика');
});

const { data } = useQuery({
  queryKey: ['statistics'],
  queryFn: async () => {
    try {
      loader.show();
      return getStatistics();
    } catch (e) {
      console.log(e);
    } finally {
      loader.hide();
    }
  },
});
</script>

<style lang="sass" scoped>
.statistics-page__container
  max-width: 100%
  height: 100%
  display: grid
  grid-template-columns: 1fr 1fr
  justify-items: center
  gap: 40px
  padding: 50px 25px 25px
  .statistics-page__statistics
    height: 300px
    width: 100%
    max-width: 500px
</style>

<template>
  <div class="statistics-page__container">
    <ClientOnly>
      <apexchart
        width="800px"
        height="500px"
        :options="chartOptions"
        :series="series"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { onMounted } from 'vue';
import { useSideBarStore } from '~/store/sideBar';
import { useLoaderStore } from '~/store/loader';
import { getStatistics } from '@/composables/statistics.service';
import { ref, watch } from 'vue';

useHead({
  title: 'Статистика',
  meta: [{ name: 'Статистика', content: 'Статистика' }],
});

const { changeActivePageTitle } = useSideBarStore();
const loader = useLoaderStore();

let series = ref<Array<Number>>([]);
let label = ref<Array<String>>([]);

const chartOptions = ref({
  chart: {
    width: 380,
    type: 'donut',
  },
  labels: ['g', 'g', 'g', 'g'],
});

onMounted(() => {
  changeActivePageTitle('Статистика');
});

watch(series, (val) => {
  console.log(val);
});

const { data } = useQuery({
  queryKey: ['statistics'],
  queryFn: async () => {
    try {
      loader.show();
      const statistics = await getStatistics();
      label.value = statistics.label;
      series.value = statistics.value;
      return statistics;
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
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  padding: 50px 10px 10px
p
 width: 100%
 background-color: $primary
</style>

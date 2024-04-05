<template>
  <ClientOnly>
    <Bar :data="chartData" :options="chartOptions" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { type ChartOptions, type ChartData } from 'chart.js';
import { ref, watch } from 'vue';

interface Props {
  statistics:
    | {
        label: String[];
        value: Number[];
      }
    | undefined;
}

const props = defineProps<Props>();

const chartData = ref<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'Задач на неделю',
      backgroundColor: '#f87979',
      data: [],
    },
  ],
});
const chartOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  maintainAspectRatio: false,
});

watch(props, (val) => {
  if (!val.statistics) return;
  chartData.value.labels = val?.statistics.label;
  chartData.value.datasets[0].data = val?.statistics.value;
});
</script>


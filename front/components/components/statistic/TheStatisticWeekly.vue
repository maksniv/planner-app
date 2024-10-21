<template>
  <UIBlock>
    <ClientOnly>
      <Bar :data="chartData" :options="chartOptions" class="statistic"/>
    </ClientOnly>
  </UIBlock>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import type { ChartOptions, ChartData } from 'chart.js';
import { ref, watch } from 'vue';

interface Props {
  statistics:
    | {
        label: string[];
        backgroundColor: string[]
        value: number[];
      }
    | undefined;
}

const props = defineProps<Props>();

const chartData = ref<ChartData<'bar'>>({
  labels: [],
  datasets: [],
});
const chartOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position:"bottom",
    }
  },
});

watch(
  () => props.statistics,
  (val) => {
    if (!val) return;
    chartData.value = {
      labels: val.label,
      datasets: [
        {
          label: 'Количество задач',
          backgroundColor: val.backgroundColor,
          hoverBackgroundColor: val.backgroundColor,
          data: val.value.map(num => Number(num)),
        },
      ],
    };
  },
  { deep: true, immediate: true },
);
</script>


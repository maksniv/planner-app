<template>
  <UIBlock>
    <ClientOnly>
      <Pie :data="chartData" :options="chartOptions"/>
    </ClientOnly>
  </UIBlock>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions, type ChartData } from 'chart.js';
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

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

const chartData = ref<ChartData<'pie'>>({
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }
  ]
});
const chartOptions = ref<ChartOptions<'pie'>>({
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
<template>
  <div class="statistics__container">
    <div class="statistics__statistic">
      <TheStatisticQuantity :statistics="data?.statisticsQuantity" />
    </div>
    <div class="statistics__statistic">
      <TheStatisticWeekly :statistics="data?.statisticsWeekly" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getStatistics } from '@/composables/statistics.service';

const { $toast } = useNuxtApp();

const { data, error } = useQuery({
  queryKey: ['statistics'],
  queryFn: () => getStatistics(),
  throwOnError: (e: any) => e,
});

watch(isError, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});
</script>

<style lang="sass" scoped>
.statistics__container
  margin: auto
  width: 100%
  height: 100%
  display: grid
  grid-template-columns: 1fr 1fr
  justify-items: center
  gap: 40px
  padding: 50px 25px 25px
  .statistics__statistic
    height: 300px
    width: 100%
    max-width: 500px
</style>

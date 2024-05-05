<template>
  <div>Листинг</div>
<!--  <div>{{ tasks }}</div>-->
</template>

<script setup lang="ts">
import type { ITaskResponse } from '~/types/task.types';

interface Props {
  list: Array<ITaskResponse>,
}

defineProps<Props>();
</script>

<style scoped lang="sass">
div
  background-color: red
</style>
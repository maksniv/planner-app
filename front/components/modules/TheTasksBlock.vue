<template>
 <div class="container">
   <TheSelect
     v-model="localValue"
     :items="groupsTask?.data"
     label-text="Test"
     item-text="name"
     search-in-dropdown
   />
   {{ localValue }}
   <TheInput
     v-model="localValue"
     placeholder-text="Email"
     labelText="Email"
   />
<!--   <TheListing :list="tasks"></TheListing>-->
 </div>
</template>

<script setup lang="ts">
import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { getGroupsTask } from '@/composables/groupsTask.service';
import { getTasks } from '@/composables/task.service';
const { $toast } = useNuxtApp();

const localValue = ref('');

const { data: tasks, error: errorGetTasks } = useQuery({
  queryKey: ['tasks'],
  queryFn: () => getTasks(),
  throwOnError: (e: any) => e,
  placeholderData: keepPreviousData,
});

watch(errorGetTasks, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});

const { data: groupsTask, error: errorGetGroups } = useQuery({
  queryKey: ['groups-task'],
  queryFn: () => getGroupsTask(),
  throwOnError: (e: any) => e,
  placeholderData: keepPreviousData,
});

watch(errorGetGroups, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});
</script>

<style scoped lang="sass">
.container
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
</style>
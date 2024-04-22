<template>
 <div class="container">
     <TheTabs :tabs="tabs" v-model="activeTab">
       <template v-slot:content="{ active }">
         <template v-if="active === 0">
           <TheListing></TheListing>
         </template>
         <template v-if="active === 1">
           <TheCanban></TheCanban>
         </template>
         <template v-if="active === 2">
           <TheCalendar></TheCalendar>
         </template>
       </template>
     </TheTabs>
 </div>
</template>

<script setup lang="ts">
import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { getGroupsTask } from '@/composables/groupsTask.service';
import { getTasks } from '@/composables/task.service';
const { $toast } = useNuxtApp();
const tabs = [
  { name: 'Листинг', id: 0 },
  { name: 'Канбан', id: 1 },
  { name: 'Календарь', id: 2 }
];
const activeTab =  ref(0);

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
</style>
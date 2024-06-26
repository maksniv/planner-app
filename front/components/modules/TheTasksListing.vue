<template>
  <div class="listing__container">
    <div class="listing__content">
      <TheTasksListingBlock
        v-if="tasksGroups.length"
        v-for="tasksGroup in tasksGroups"
        :key="tasksGroup"
        :tasks-group="tasksGroup"
      />
      <TheTasksListingCompletedBlock />
    </div>
 </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '~/store/tasks';
const { search, groupId } = toRefs(useTasksStore());
import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { getTasks } from '@/composables/task.service';
import type { ITaskResponse } from '~/types/task.types';
import dayjs from 'dayjs';
const { $toast } = useNuxtApp();

const { data: tasks, error: errorGetTasks } = useQuery({
  queryKey: ['all-tasks-uncompleted', search, groupId],
  queryFn: () => getTasks(false, search.value, groupId.value),
  staleTime: 0,
  throwOnError: (e: any) => e,
  placeholderData: keepPreviousData,
});

watch(errorGetTasks, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});

const breakIntoGroups = (tasks: ITaskResponse[]): ITaskResponse[][] => {
  if (!tasks.length) return [];
  const today = dayjs().startOf('day');
  const overdueTasks: ITaskResponse[] = [];
  const groupedTasks: ITaskResponse[][] = [];
  const ungroupedTasks: ITaskResponse[] = [];

  tasks.forEach((task: ITaskResponse) => {
    const deadlineDate = dayjs(task.deadlines).startOf('day');

    if (task.deadlines === '') {
      ungroupedTasks.push(task);
    } else if (deadlineDate.isBefore(today)) {
      overdueTasks.push(task);
    } else {
      const existingGroup = groupedTasks.find(
        (group: ITaskResponse[]) => dayjs(group[0].deadlines).startOf('day').isSame(deadlineDate)
      );

      if (existingGroup) {
        existingGroup.push(task);
      } else {
        groupedTasks.push([task]);
      }
    }
  });

  const result: ITaskResponse[][] = [...groupedTasks];

  if(overdueTasks.length) result.unshift(overdueTasks)

  if(ungroupedTasks.length) result.push(ungroupedTasks)

  return result;
};

const tasksGroups = computed(() => {
  return tasks.value?.data
    ?  breakIntoGroups(toRaw(tasks.value?.data))
    : []
});
</script>

<style scoped lang="sass">
.listing__container
  width: 680px
  height: 100%
  min-height: 500px
  margin: auto
  display: flex
  flex-direction: column
  padding: 15px 0
  box-shadow: 0 4px 6px var(--box-shadow)
  border: 1px solid var(--border-base)
  border-radius: var(--border-radius)
  background-color: var(--sidebar)
  color: var(--base-text-color)
  .listing__content
    padding: 0 15px
    overflow: auto
    scroll-behavior: smooth
</style>
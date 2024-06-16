<template>
  <div class="show-button-container">
    <TheIconButton
      class="show-button__icon"
      :class="{'visible': showList}"
      @click="handleClick"
      icon="bxs:right-arrow"
      size="20"
    />
    <span>Показать выполненные</span>
  </div>
    <TheTasksListingBlock
      v-show="showList"
      title="Выполненные"
      :tasks-group="completedTask?.data"
    />
</template>

<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { getTasks } from '~/composables/task.service';
import { useTasksStore } from '~/store/tasks';
const { search, groupId } = toRefs(useTasksStore());
const { $toast } = useNuxtApp();
const showList = ref(false);

const { data: completedTask, error: errorGetTasks } = useQuery({
  queryKey: ['all-tasks-completed', search, groupId],
  queryFn: () => getTasks(true, search.value, groupId.value),
  staleTime: 0,
  throwOnError: (e: any) => e,
});

watch(errorGetTasks, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});

const queryClient = useQueryClient();

const handleClick = () => {
  showList.value = !showList.value;
  if (showList.value === true) {
    queryClient.invalidateQueries({ queryKey: ['all-tasks-completed', search, groupId] });
  }
};
</script>

<style scoped lang="sass">
.show-button-container
  width: 100%
  height: fit-content
  display: flex
  gap: 15px
  flex-direction: row
  padding: 0 10px 25px 15px
  font-size: 25px
  .show-button__icon
    transition: .15s ease-out
    &.visible
     transform: rotate(90deg)
</style>
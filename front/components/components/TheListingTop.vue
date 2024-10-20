<template>
  <div class="top-listing__container">
    <TheSelect
      class="top-listing-select"
      :items="groupsTaskData?.data"
      placeholder-text="Группа задач"
      item-text="name"
      colorize
      clearable
      search-in-dropdown
      @select-id="changeGroupId($event)"
    />
    <TheInputSearch
      class="top-listing-input"
      placeholder-text="Поиск"
      @input="updateSearch($event)"
    />
    <UIButton
      outlined
      @click="addTask"
    >
      <Icon size="15" name="fluent:add-24-filled"/>
      Добавить задачу
    </UIButton>
  </div>

</template>
<script setup lang="ts">
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { TypeTaskFormState } from '~/types/task.types';
import { createTask } from '~/composables/task.service';
import { getGroupsTask } from '~/composables/groupsTask.service';
import { useTasksStore } from '~/store/tasks';
import { debounce } from '~/utils/debounce';
const { changeSearch, changeGroupId, groupId } = useTasksStore();
const queryClient = useQueryClient();
const { $toast } = useNuxtApp();
const router = useRouter();

const { mutate: addHandler, error: errorAdd } = useMutation({
  mutationKey: ['add-task'],
  mutationFn: (data: TypeTaskFormState) => {
    return createTask(data)
  },
  onSuccess(response) {
    router.push(`/tasks/${response.data.id}`)
    queryClient.invalidateQueries({ queryKey: ['all-tasks-uncompleted'] });
    $toast.success('Создана');
  },
  onError: (err: any) => err,
});

watch(errorAdd, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});

const { data: groupsTaskData, error: errorGetGroups } = useQuery({
  queryKey: ['groups-task'],
  queryFn: () => getGroupsTask(),
  throwOnError: (e: any) => e,
  placeholderData: keepPreviousData,
});

watch(errorGetGroups, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});

const updateSearch = debounce(changeSearch, 1000);
const addTask = () => {
  if (groupId) {
    addHandler({taskGroupId: groupId });
  } else {
    addHandler({})
  }
}
</script>

<style lang="sass" scoped>
.top-listing__container
  background-color: var(--sidebar)
  border-radius: var(--border-radius)
  border: 1px solid var(--border-base)
  box-shadow: 0 4px 6px var(--box-shadow)
  padding: 7px 10px
  height: fit-content
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: space-between
  gap: 100px
  position: sticky
  z-index: var(--z-top-listing)
  top: 15px
  .top-listing-select
     width: 250px
     min-width: 250px
  .top-listing-input
     max-width: 500px
</style>
<template>
  <div class="groups-task__block">
    <TheForm hide-title hideFooter>
      <template #body>
        <div class="groups-task__wrapper">
          <TheGroupsTaskItem
            v-if="data?.data"
            v-for="item in toRaw(data.data)"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            :color="item.color"
          />
          <TheAddButton
            v-if="data?.data"
            @click="addHandler({ name: '', color: '' })"
          />
          <div v-else class="groups-task__add-button">
            <span class="add-button__text">Похоже у вас еще нет групп...</span>
            <TheAddButton @click="addHandler({ name: '', color: '' })" />
          </div>
        </div>
      </template>
    </TheForm>
  </div>
</template>

<script setup lang="ts">
import {
  useQueryClient,
  useMutation,
  useQuery,
  keepPreviousData,
} from '@tanstack/vue-query';
import { type TypeGroupsTaskFormState } from '~/types/groupsTask.types';
import {
  getGroupsTask,
  createGroupTask,
} from '@/composables/groupsTask.service';

const { $toast } = useNuxtApp();

const { data, error: errorGet } = useQuery({
  queryKey: ['groups-task'],
  queryFn: () => getGroupsTask(),
  throwOnError: (e: any) => e,
  placeholderData: keepPreviousData,
});

const queryClient = useQueryClient();

const { mutate: addHandler, error: errorAdd } = useMutation({
  mutationKey: ['add-group-task'],
  mutationFn: (data: TypeGroupsTaskFormState) => createGroupTask(data),
  async onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['groups-task'] });
    $toast.success('Сохранено');
  },
  onError: (err: any) => err,
});

watch(errorAdd, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});

watch(errorGet, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});
</script>

<style lang="sass" scoped>
.groups-task__block
  margin: auto
  width: 500px
  box-shadow: 0 4px 6px var(--box-shadow)
.groups-task__wrapper
    min-height: 300px
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
    gap: 15px
    .groups-task__add-button
        margin: auto
        display: flex
        flex-direction: column
        flex-wrap: nowrap
        gap: 30px
        align-items: center
        justify-content: center
        .add-button__text
            font-size: 25px
</style>

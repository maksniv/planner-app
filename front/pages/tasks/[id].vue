<template>
  <TheModal :show-modal="true" @close="closeModal()">
    <template #title>
      <TheTitleInput
        v-model="localValue.name"
        :value="taskData?.data?.name"
        placeholder-text="Название задачи"
        @input="updateHandler({ name: localValue.name })"
      />
    </template>
    <template #body>
      <TheTextarea
        v-model="localValue.content"
        :value="taskData?.data?.content"
        placeholder-text="Описание"
        labelText="Описание"
        @input="updateHandler({ content: localValue.content })"
      />
      <TheDateTimePicker
        v-model="localValue.deadlines"
        :value="taskData?.data?.deadlines"
        placeholder-text="Выберите дату"
        labelText="Дедлайн"
        @input="updateHandler({ deadlines: localValue.deadlines })"
      />
      <TheSelect
        v-model="localValue.groupsTask"
        :value="taskData?.data?.taskGroup"
        :items="groupsTaskData?.data"
        label-text="Группа"
        item-text="name"
        search-in-dropdown
        colorize
        @input="update({ taskGroupId: localValue.groupsTask?.id || null })"
      />
    </template>
    <template #button>
      <TheButton
        @click="update({isCompleted: true}); closeModal()">
        Задача выполнена
      </TheButton>
      <TheButton
        @click="closeModal()"
        outlined
      >
        Отмена
      </TheButton>
    </template>
  </TheModal>
</template>

<script setup lang="ts">
import { useQuery, keepPreviousData, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getGroupsTask } from '@/composables/groupsTask.service';
import { getTaskById, updateTask} from '~/composables/task.service';
import { debounce } from '~/utils/debounce';
import type { TypeTaskFormState } from '~/types/task.types';
import { useTasksStore } from '~/store/tasks';
const queryClient = useQueryClient();
const { $toast } = useNuxtApp();
const { search, groupId } = toRefs(useTasksStore());
const router = useRouter();

const localValue = ref({ name: '', content: '', isCompleted: false, groupsTask: null, deadlines: '' });

const id = computed(() => {
  return String(router.currentRoute.value.params.id);
});

const { data: taskData, error: errorGetTask } = useQuery({
  queryKey: ['get-task-by-id', id],
  queryFn: () => {
    return getTaskById(id.value)
  },
  throwOnError: (e: any) => e,
});

watch(errorGetTask, (val) => {
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

const {
  mutate: update,
  error: errorUpdate,
} = useMutation({
  mutationKey: ['update-task'],
  mutationFn: (data: TypeTaskFormState) =>
    updateTask(id.value, data),
  async onSuccess() {
    $toast.success('Сохранено');
  },
  onError: (err: any) => err,
});

watch(errorUpdate, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});

const updateHandler = debounce(update, 800);

const title = computed(() => {
  return taskData?.value?.data?.name || 'Задача';
});

const closeModal = () => {
  router.back();
  queryClient.invalidateQueries({ queryKey: ['all-tasks-uncompleted', search, groupId] })
};

useHead({
  title: title.value,
});
</script>
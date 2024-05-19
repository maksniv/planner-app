<template>
  <div
    class="task-item__container"
    @click.self="pushTo">
    <TheCheckbox
      :value="task.isCompleted"
      v-model="localIsCompleted"
      @input="updateHandler({isCompleted: localIsCompleted})"
    />
    <div
      class="task-item__content"
      @click="pushTo"
    >
      <div
        class="task-item__title"
        :class="{'through': localIsCompleted}"
      >
        {{ task.name }}
      </div>
      <div
        v-if="task.deadlines"
        class="task-item__time">
        {{ formattedTime }}
      </div>
    </div>
    <div class="task-item__action">
      <TheDropDown>
        <template #opening-part>
          <Icon name="mdi:more-vert" size="25"/>
        </template>
        <template #menu>
          <TheDropDownMenuItem
            @click="pushTo">
            <Icon
              name="uil:setting"
              size="15"/>
            Редактировать
          </TheDropDownMenuItem>
          <TheDropDownMenuItem
            @click="deleteHandler"
            class="delete">
            <Icon
              name="ic:baseline-delete"
              size="15"/>
            Удалить
          </TheDropDownMenuItem>
        </template>
      </TheDropDown>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import type { ITaskResponse, TypeTaskFormState } from '~/types/task.types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { errorCatch } from '~/utils/error';
import { deleteTask, updateTask } from '~/composables/task.service';
const { $toast } = useNuxtApp();
const router = useRouter();
interface Props {
  task: ITaskResponse;
}
const props = defineProps<Props>();

const formattedTime = computed(() => {
  return dayjs(props.task.deadlines).format('hh:mm');
});

const pushTo = () => {
  router.push(`/tasks/${props.task.id}`)
}

const localIsCompleted = ref(props.task.isCompleted);

const queryClient = useQueryClient();

const {
  mutate: updateHandler,
  error: errorUpdate,
} = useMutation({
  mutationKey: ['update-task', props.task.id],
  mutationFn: (data: TypeTaskFormState) => updateTask(props.task.id, data),
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['all-tasks-uncompleted'] });
    queryClient.invalidateQueries({ queryKey: ['all-tasks-completed'] });
    $toast.success('Сохранено');
  },
  onError: (err: any) => err,
});

watch(errorUpdate, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});

const { mutate: deleteHandler, error } = useMutation({
  mutationKey: ['delete-task', props.task.id],
  mutationFn: () => deleteTask(props.task.id),
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['all-tasks-uncompleted'] });
    queryClient.invalidateQueries({ queryKey: ['all-tasks-completed'] });
    $toast.success('Удалено');
  },
  onError: (err: any) => err,
});

watch(error, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});
</script>

<style scoped lang="sass">
.task-item__container
  width: 100%
  height: fit-content
  min-height: 55px
  display: flex
  flex-wrap: nowrap
  flex-direction: row
  align-items: flex-start
  justify-content: center
  padding: 15px 5px 10px 15px
  background-color: var(--sidebar)
  &:hover
    background-color: var(--background)
    border-radius: var(--border-radius)
    .task-item__action
      display: block
  .task-item__action
    display: none
    color: var(--secondary-text-color)
  .task-item__content
    width: 100%
    display: flex
    flex-wrap: nowrap
    flex-direction: column
    align-items: flex-start
    margin-left: 10px
    gap: 5px
    .task-item__title
      width: 100%
      display: -webkit-box
      -webkit-line-clamp: 1
      -webkit-box-orient: vertical
      overflow: hidden
    .through
      text-decoration: line-through
      color: var(--disabled-text-color)
    .task-item__time
      border-radius: 100px
      font-size: 12px
      padding: 3px 10px
      color: var(--secondary-text-color)
      border: 1px solid var(--border-base)

.delete
  color: var(--danger)
</style>
<template>
  <div class="tasks-block__container">
    <span
      class="tasks-block__title"
      :class="{'overdue': flagOverdue}">
        {{ formattedDate }}
    </span>
    <TheTasksListingItem
      v-for="task in tasksGroup"
      :key="task.id"
      :task="task"
    />
  </div>

</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import type { ITaskResponse } from '~/types/task.types';

interface Props {
  tasksGroup: Array<ITaskResponse>;
}
const props = defineProps<Props>();

const flagOverdue = ref(false);

dayjs.locale('ru');

const formattedDate = computed(() => {
  if(!props.tasksGroup[0].deadlines) return 'Без даты'

  const today = dayjs().startOf('day');

  if(dayjs(props.tasksGroup[0].deadlines).isBefore(today)){
    flagOverdue.value = true
    return 'Просроченные'
  }

  return dayjs(props.tasksGroup[0].deadlines).format('D MMMM');
});



</script>

<style scoped lang="sass">
.tasks-block__container
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  padding-bottom: 15px
  .tasks-block__title
    color: var(--primary)
    padding: 0 10px 15px 15px
    font-size: 25px
    position: sticky
    background-color: var(--sidebar)
    top: 0
    z-index: 20
  .overdue
    color: var(--danger)
</style>
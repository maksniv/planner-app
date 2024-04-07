<template>
  <div class="groups-task-item__container">
    <TheInput
      v-model="localValueName"
      placeholder-text="Название"
      :value="value"
    ></TheInput>
    <span>color picker</span>
    <Icon
      :disabled="isPendingUpdate"
      @click="deleteHandler"
      name="material-symbols:delete-outline"
      size="45"
      class="groups-task-item__icon"
    />
  </div>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { useMutation } from '@tanstack/vue-query';
import { type TypeGroupsTaskFormState } from '~/types/groupsTask.types';
import {
  updateGroupTask,
  deleteGroupTask,
} from '@/composables/groupsTask.service';
import { debounce } from '@/utils/debounce';

interface Props {
  value?: string;
  id: string;
}

const props = defineProps<Props>();

const localValueName = ref('');

const queryClient = useQueryClient();

const {
  mutate: update,
  isError: isErrorUpdate,
  error: errorUpdate,
  isPending: isPendingUpdate,
} = useMutation({
  mutationKey: ['update-group-task'],
  mutationFn: (data: TypeGroupsTaskFormState) =>
    updateGroupTask(props.id, data),
  async onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['groups-task'] });
  },
});

const {
  mutate: deleteHandler,
  isError: isErrorDelete,
  error: errorDelete,
} = useMutation({
  mutationKey: ['delete-group-task'],
  mutationFn: (data: TypeGroupsTaskFormState) => deleteGroupTask(props.id),
  async onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['groups-task'] });
  },
});

const updateHandler = debounce(update, 800);

watch(localValueName, (newVal, oldVal) => {
  console.log(newVal);
  console.log(oldVal);

  if (oldVal === '') return;
  updateHandler({
    name: newVal,
  });
});

watch(isErrorUpdate, (val) => {
  // TO-DO заменить на уведомление
  if (val) console.log(errorUpdate);
});

watch(isErrorDelete, (val) => {
  // TO-DO заменить на уведомление
  if (val) console.log(errorDelete);
});
</script>

<style lang="sass" scoped>
.groups-task-item__container
  width: 100%
  border-radius: $borderRadius
  border: 3px solid $inputBgColor
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  padding: 10px 10px
  gap: 15px
  .groups-task-item__icon
    color: $red
    transition: .2s ease-out
    &:hover
        transform: scale(1.15)
    &:active
        transform: scale(0.95)
</style>

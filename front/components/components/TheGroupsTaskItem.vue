<template>
  <div class="groups-task-item__container">
    <TheInput
      v-model="localValue.name"
      placeholder-text="Название"
      :value="name"
      @input="updateHandler({ name: localValue.name })"
    ></TheInput>
    <TheColorPicker
      v-model="localValue.color"
      :value="color"
      @input="updateHandler({ color: localValue.color })"
    />
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
  name?: string;
  color?: string;
  id: string;
}

const { $toast } = useNuxtApp();

const props = defineProps<Props>();

const localValue = ref({ name: '', color: '' });

const queryClient = useQueryClient();

const {
  mutate: update,
  error: errorUpdate,
  isPending: isPendingUpdate,
} = useMutation({
  mutationKey: ['update-group-task'],
  mutationFn: (data: TypeGroupsTaskFormState) =>
    updateGroupTask(props.id, data),
  async onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['groups-task'] });
    $toast.success('Сохранено');
  },
  onError: (err: any) => err,
});

const { mutate: deleteHandler, error: errorDelete } = useMutation({
  mutationKey: ['delete-group-task'],
  mutationFn: () => deleteGroupTask(props.id),
  async onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['groups-task'] });
    $toast.success('Сохранено');
  },
  onError: (err: any) => err,
});

const updateHandler = debounce(update, 800);

watch(errorUpdate, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});

watch(errorDelete, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
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
  justify-content: center
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
<template>
  <TheButton @click="() => (visible = true)">
    Выйти
    <Icon
      name="material-symbols:logout-rounded"
      size="18"
      class="button__icon"
    ></Icon>
  </TheButton>
  <TheModal
    :show-modal="visible"
    contentText="Вы точно хотите выйти?"
    :close="() => (visible = false)"
    :confirmFunction="
      async () => {
        await mutate();
      }
    "
    :rejectFunction="() => (visible = false)"
  ></TheModal>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { logout } from '~/composables/auth.service';

const visible = ref(false);

const router = useRouter();

const { mutate, isError, error } = useMutation({
  mutationKey: ['logout'],
  mutationFn: () => logout(),
  async onSuccess() {
    await router.push('/login');
  },
});

watch(isError, (val) => {
  // TO-DO заменить на уведомление
  if (val) console.log(error);
});
</script>

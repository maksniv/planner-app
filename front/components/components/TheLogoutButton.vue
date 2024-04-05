<template>
  <TheButton @click="() => mutate()">
    Выйти
    <Icon
      name="material-symbols:logout-rounded"
      size="18"
      class="button__icon"
    ></Icon>
  </TheButton>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { logout } from '~/composables/auth.service';

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

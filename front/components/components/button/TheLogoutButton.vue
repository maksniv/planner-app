<template>
  <TheButton @click="visible = true" danger>
    Выйти
    <Icon
      name="material-symbols:logout-rounded"
      size="19"
      class="button__icon"
    ></Icon>
  </TheButton>
  <TheModal
    :show-modal="visible"
    @confirm="mutate()"
    @reject="visible = false"
    @close="visible = false"
  >
    <template #title>Вы собираетесь выйти из системы</template>
    <template #body>Все несохранённые данные будут утеряны. <br>Вы уверены, что хотите выйти?</template>
  </TheModal>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { logout } from '~/composables/auth.service';

const { $toast } = useNuxtApp();

const visible = ref(false);

const router = useRouter();

const { mutate, error } = useMutation({
  mutationKey: ['logout'],
  mutationFn: () => logout(),
  async onSuccess() {
    visible.value = false;
    await router.push('/login');
  },
  onError: (err: any) => err,
});

watch(error, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});
</script>

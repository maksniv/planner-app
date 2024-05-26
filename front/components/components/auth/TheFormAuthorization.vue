<template>
  <TheForm title-size="small">
    <template #title>Форма авторизации</template>
    <template #body>
      <TheInput
        v-model="email"
        placeholder-text="Email"
        labelText="Email"
      />
      <TheInputPassword
        v-model="password"
        placeholder-text="Пароль"
        labelText="Пароль"
      />
    </template>
    <template #footer>
      <TheButton @click.prevent="mutate({ email: email, password: password })"
        >Войти
      </TheButton>
    </template>
  </TheForm>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { main } from '~/composables/auth.service';
import { type IAuthForm } from '~/types/auth.types';
import { errorCatch } from '~/utils/error';

useHead({
  title: 'Авторизация',
  meta: [{ name: 'Авторизация', content: 'Авторизация' }],
});

const { $toast } = useNuxtApp();

const router = useRouter();

const email = ref('');
const password = ref('');

const { mutate, error } = useMutation({
  mutationKey: ['auth'],
  mutationFn: (data: IAuthForm) => main('login', data),
  async onSuccess() {
    email.value = '';
    password.value = '';
    await router.push('/tasks');
  },
  onError: (err: any) => err,
});

watch(error, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});
</script>

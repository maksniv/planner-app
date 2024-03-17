<template>
  <TheForm>
    <template #title>Форма авторизации</template>
    <template #body>
      <TheInput
        v-model="email"
        placeholder-text="Email"
        labelText="Email"
      ></TheInput
      ><TheInput
        v-model="password"
        placeholder-text="Пароль"
        labelText="Пароль"
      ></TheInput>
    </template>
    <template #footer>
      <TheButton @click.prevent="sendData">Войти</TheButton>
    </template>
  </TheForm>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';

import { authService } from '~/service/auth.service';
import { type IAuthForm } from '~/types/auth.types';

useHead({
  title: 'Авторизация',
  meta: [{ name: 'Авторизация', content: 'Авторизация' }],
});

const router = useRouter();

const email = ref('');
const password = ref('');

const sendData = () => {
  mutate({ email: email.value, password: password.value });
};

const { mutate } = useMutation({
  mutationKey: ['auth'],
  mutationFn: (data: IAuthForm) => authService.main('login', data),
  onSuccess() {
    router.push('/');
  },
});
</script>

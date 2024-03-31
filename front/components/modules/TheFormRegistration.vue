<template>
  <TheForm :title-size="'small'">
    <template #title>Форма регистрации</template>
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
      <TheButton @click.prevent="sendData">Зарегистрироваться</TheButton>
    </template>
  </TheForm>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { main } from '~/composables/auth.service';
import { useLoaderStore } from '~/store/loader';
import { type IAuthForm } from '~/types/auth.types';

useHead({
  title: 'Регистрация',
  meta: [{ name: 'Регистрация', content: 'Регистрация' }],
});

const loader = useLoaderStore();

const router = useRouter();

const email = ref('');
const password = ref('');

const sendData = () => {
  loader.show;
  mutate({ email: email.value, password: password.value });
};

const { mutate } = useMutation({
  mutationKey: ['auth'],
  mutationFn: (data: IAuthForm) => main('register', data),
  async onSuccess() {
    email.value = '';
    password.value = '';
    await router.push('/');
    loader.hide;
  },
});
</script>

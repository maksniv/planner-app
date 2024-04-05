<template>
  <div class="user-block">
    <TheForm hide-title>
      <template #title></template>
      <template #body>
        <TheInput
          v-model="name"
          :value="data?.user?.name"
          placeholder-text="Имя"
          labelText="Имя"
        ></TheInput>
        <TheInput
          v-model="surname"
          :value="data?.user?.surname"
          placeholder-text="Фамилия"
          labelText="Фамилия"
        ></TheInput>
        <TheInput
          v-model="email"
          :value="data?.user?.email"
          placeholder-text="Email"
          labelText="Email"
        ></TheInput
        ><TheInput
          v-model="password"
          :value="data?.user?.password"
          placeholder-text="Пароль"
          labelText="Пароль"
        ></TheInput>
      </template>
      <template #footer>
        <TheButton
          @click.prevent="
            () =>
              mutate({
                email: email,
                password: password,
                name: name,
                surname: surname,
              })
          "
          >Сохранить</TheButton
        >
      </template>
    </TheForm>
  </div>
</template>

<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useMutation } from '@tanstack/vue-query';
import { type TypeUserForm } from '~/types/auth.types';
import { getProfile, updateProfile } from '@/composables/user.service';

const email = ref('');
const password = ref('');
const name = ref('');
const surname = ref('');

const { data } = useQuery({
  queryKey: ['profile'],
  queryFn: () => getProfile(),
});

const queryClient = useQueryClient();

const { mutate, isError, error } = useMutation({
  mutationKey: ['update profile'],
  mutationFn: (data: TypeUserForm) => updateProfile(data),
  async onSuccess() {
    email.value = '';
    password.value = '';
    name.value = '';
    surname.value = '';
    queryClient.invalidateQueries({ queryKey: ['profile'] });
  },
});

watch(isError, (val) => {
  // TO-DO заменить на уведомление
  if (val) console.log(error);
});
</script>

<style lang="sass" scoped>
.user-block
  margin: auto
  width: 500px
</style>

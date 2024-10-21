<template>
  <div class="user-block">
    <TheForm hide-footer>
      <template #title>
        Изменить данные
      </template>
      <template #body>
        <UIInput
          v-model="profile.name"
          :value="data?.user?.name"
          placeholder-text="Имя"
          label-text="Имя"
          @input="updateHandler({ name: profile.name })"
        />
        <UIInput
          v-model="profile.surname"
          :value="data?.user?.surname"
          placeholder-text="Фамилия"
          label-text="Фамилия"
          @input="updateHandler({ surname: profile.surname })"
        />
        <UIInput
          v-model="profile.email"
          :value="data?.user?.email"
          placeholder-text="Email"
          label-text="Email"
          @input="updateHandler({ email: profile.email })"
        />
        <TheInputPassword
          v-model="profile.password"
          placeholder-text="Пароль"
          label-text="Пароль"
          @input="updateHandler({ password: profile.password })"
        />
      </template>
    </TheForm>
  </div>
</template>

<script setup lang="ts">
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
  useMutation,
} from '@tanstack/vue-query';
import type { TypeUserForm } from '~/types/auth.types';
import { getProfile, updateProfile } from '@/composables/user.service';
import { errorCatch } from '@/utils/error';

const { $toast } = useNuxtApp();

const queryClient = useQueryClient();

const profile = ref({ email: '', password: '', name: '', surname: '' });

const { data, error: errorGet } = useQuery({
  queryKey: ['profile'],
  queryFn: () => getProfile(),
  throwOnError: (e: any) => e,
  placeholderData: keepPreviousData,
});

const { mutate: update, error: errorUpdate } = useMutation({
  mutationKey: ['update profile'],
  mutationFn: (data: TypeUserForm) => updateProfile(data),
  async onSuccess() {
    $toast.success('Сохранено');
    profile.value.password = '';
    await queryClient.invalidateQueries({ queryKey: ['profile'] });
  },
  onError: (err: any) => err,
});

const updateHandler = debounce(update, 800);

watch(errorUpdate, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});

watch(errorGet, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});
</script>

<style lang="sass" scoped>
.user-block
  margin: auto
  width: 500px
  box-shadow: 0 4px 6px var(--box-shadow)
</style>

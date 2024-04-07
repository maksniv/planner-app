<template>
  <div class="user-block">
    <TheForm hide-title hide-footer>
      <template #body>
        <TheInput
          v-model="profile.name"
          :value="data?.user?.name"
          placeholder-text="Имя"
          labelText="Имя"
          @input="updateHandler({ name: profile.name })"
        ></TheInput>
        <TheInput
          v-model="profile.surname"
          :value="data?.user?.surname"
          placeholder-text="Фамилия"
          labelText="Фамилия"
          @input="updateHandler({ surname: profile.surname })"
        ></TheInput>
        <TheInput
          v-model="profile.email"
          :value="data?.user?.email"
          placeholder-text="Email"
          labelText="Email"
          @input="updateHandler({ email: profile.email })"
        ></TheInput
        ><TheInput
          v-model="profile.password"
          placeholder-text="Пароль"
          labelText="Пароль"
          @input="updateHandler({ password: profile.password })"
        ></TheInput>
      </template>
    </TheForm>
  </div>
</template>

<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useMutation } from '@tanstack/vue-query';
import { type TypeUserForm } from '~/types/auth.types';
import { getProfile, updateProfile } from '@/composables/user.service';

const profile = ref({ email: '', password: '', name: '', surname: '' });

const {
  data,
  isError: isErrorGet,
  error: errorGet,
} = useQuery({
  queryKey: ['profile'],
  queryFn: () => getProfile(),
});

const queryClient = useQueryClient();

const {
  mutate: update,
  isError: isErrorUpdate,
  error: errorUpdate,
} = useMutation({
  mutationKey: ['update profile'],
  mutationFn: (data: TypeUserForm) => updateProfile(data),
  async onSuccess() {
    profile.value.password = '';
    queryClient.invalidateQueries({ queryKey: ['profile'] });
  },
});

const updateHandler = debounce(update, 800);

watch(isErrorUpdate, (val) => {
  // TO-DO заменить на уведомление
  if (val) console.log(errorUpdate);
});

watch(isErrorGet, (val) => {
  // TO-DO заменить на уведомление
  if (val) console.log(errorGet);
});
</script>

<style lang="sass" scoped>
.user-block
  margin: auto
  width: 500px
</style>

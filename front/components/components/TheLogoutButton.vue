<template>
  <button class="button" v-bind="$attrs" @click="sendLogout()">
    Выйти
    <Icon
      name="material-symbols:logout-rounded"
      size="18"
      class="button__icon"
    ></Icon>
  </button>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { logout } from '~/composables/auth.service';
import { useLoaderStore } from '~/store/loader';

const loader = useLoaderStore();

const router = useRouter();

const sendLogout = () => {
  mutate();
};

const { mutate } = useMutation({
  mutationKey: ['logout'],
  mutationFn: () => logout(),
  async onMutate() {
    loader.show();
  },
  async onSuccess() {
    await router.push('/login');
  },
  async onError() {
    // TO-DO заменить на уведомление
    console.log('Ошибка');
  },
  async onSettled() {
    loader.hide();
  },
});
</script>

<style scoped lang="sass">
.button
  cursor: pointer
  user-select: none
  padding: 12px 16px
  height: 42px
  background-color: $red
  color: $btnColor
  border-radius: 8px
  transition: .15s ease-out
  .button__icon
    margin-left: 5px
  &:hover
    transform: scale(1.03)
  &:active
    transform: scale(0.97)
  &:disabled
    transform: scale(1.0)
    background-color: $btnBgDisabled
    color: $btnColorDisabled
</style>

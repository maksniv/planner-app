<template>
  <div class="user-section">
    <TheDropDown>
      <template #opening-part>
        <div class="user-section__wrapper">
          <TheAvatar :name="data?.user.name" :surname="data?.user.surname"/>
          <TheIconButton
            class="logo__icon"
            icon="bxs:down-arrow"
            size="20"
          />
        </div>
      </template>
      <template #menu>
        <TheDropDownMenuItem @click="router.push('/user')">
          <Icon name="uil:setting" size="15"/>Настройки
        </TheDropDownMenuItem>
        <TheDropDownMenuItem class="delete" @click="mutate()">
          <Icon name="material-symbols:logout-rounded" size="15"/>Выйти
        </TheDropDownMenuItem>
      </template>
    </TheDropDown>
  </div>
</template>

<script setup lang="ts">
import {
  keepPreviousData, useMutation,
  useQuery,
} from '@tanstack/vue-query';
import { getProfile } from '@/composables/user.service';
import { errorCatch } from '@/utils/error';
import { logout } from '~/composables/auth.service';

const { $toast } = useNuxtApp();

const { data, error: errorGet } = useQuery({
  queryKey: ['profile'],
  queryFn: () => getProfile(),
  throwOnError: (e: any) => e,
  placeholderData: keepPreviousData,
});

watch(errorGet, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});

const router = useRouter();

const { mutate, error: errorLogout } = useMutation({
  mutationKey: ['logout'],
  mutationFn: () => logout(),
  async onSuccess() {
    await router.push('/login');
  },
  onError: (err: any) => err,
});

watch(errorLogout, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});
</script>

<style lang="sass" scoped>
.user-section
  .user-section__wrapper
    display: flex
    flex-direction: row
    align-items: center
    gap: 10px
    justify-content: center
    width: 100%
    height: 100%

.delete
  color: var(--danger)
</style>
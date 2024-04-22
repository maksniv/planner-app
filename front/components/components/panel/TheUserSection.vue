<template>
  <TheDropDown>
    <template #opening-part>
      <div class="user-section__wrapper">
        <TheAvatar :name="data?.user.name" :surname="data?.user.surname"></TheAvatar>
        <Icon name="line-md:text-box-twotone" size="30" class="logo__icon"></Icon>
      </div>
    </template>
    <template #menu>
      <TheLogoutButton></TheLogoutButton>
    </template>
  </TheDropDown>
</template>

<script setup lang="ts">
import {
  useQuery,
} from '@tanstack/vue-query';
import { getProfile } from '@/composables/user.service';
import { errorCatch } from '@/utils/error';

const { $toast } = useNuxtApp();

const { data, error: errorGet } = useQuery({
  queryKey: ['profile'],
  queryFn: () => getProfile(),
  throwOnError: (e: any) => e,
});

watch(errorGet, (val) => {
  const errorMessage = errorCatch(val);
  if (errorMessage) $toast.error(errorMessage);
});
</script>

<style lang="sass" scoped>
.user-section__wrapper
  display: flex
  flex-direction: row
  align-items: center
  gap: 10px
  justify-content: center
  width: 100%
  height: 100%
</style>
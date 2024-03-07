<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>

<script setup lang="js">
import { NuxtError } from '#app';

const props = defineProps({
  error: {
    type: Object,
    default: () => NuxtError,
  },
});
</script>

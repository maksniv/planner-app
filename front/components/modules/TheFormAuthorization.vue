<template>
  <TheForm>
    <template #title>Форма авторизации</template>
    <template #body>
      <TheInput
        placeholder-text="Email"
        labelText="Email"
        v-model="email"
      ></TheInput
      ><TheInput
        placeholder-text="Пароль"
        labelText="Пароль"
        v-model="password"
      ></TheInput>
    </template>
    <template #footer>
      <TheButton>Войти</TheButton>
    </template>
  </TheForm>
</template>

<script setup lang="ts">
useHead({
  title: 'Авторизация',
  meta: [{ name: 'Авторизация', content: 'Авторизация' }],
});

const email = ref('');
</script>

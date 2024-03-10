<template>
  <TheForm>
    <template #title>Форма регистрации</template>
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
      <TheButton>Зарегистрироваться</TheButton>
    </template>
  </TheForm>
</template>

<script setup lang="ts">
useHead({
  title: 'Регистрация',
  meta: [{ name: 'Регистрация', content: 'Регистрация' }],
});

const email = ref('');
const password = ref('');
</script>
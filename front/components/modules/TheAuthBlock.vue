<template>
  <div class="forms-container">
    <TheFormRegistration v-if="!flagForm" />
    <TheFormAuthorization v-else />
    <span class="forms__toggle-span"
      >{{ content }}
      <button class="forms__toggle-button" @click="toggleForm()">
        {{ buttonContent }}
      </button></span
    >
  </div>
</template>

<script setup lang="ts">
let flagForm = ref(true);

const toggleForm = () => {
  flagForm.value = !flagForm.value;
};

const content = computed(() => {
  return flagForm.value ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?';
});

const buttonContent = computed(() => {
  return flagForm.value ? 'Зарегистрироваться!' : 'Войти!';
});
</script>

<style lang="sass" scoped>
.forms-container
  margin: auto
  user-select: none
  color: var(--base-text-color)
  transition: .15s ease-out
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  gap: 15px
  .forms__toggle-span
    text-align: center
  .forms__toggle-button
    margin-left: 5px
    cursor: pointer
    transition: .15s ease-out
    &:hover
      transform: scale(1.03)
    &:active
      transform: scale(0.97)
</style>

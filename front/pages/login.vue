<template>
  <div class="forms-container">
    <TheFormRegistration v-show="openForm" />
    <TheFormAuthorization v-show="!openForm" />
    <span class="forms__toggle-span"
      >{{ content }}
      <button class="forms__toggle-button" @click="toggleForm()">
        {{ buttonContent }}
      </button></span
    >
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login',
});
let openForm = ref(true);

const toggleForm = () => {
  openForm.value = !openForm.value;
};

const content = computed(() => {
  return openForm.value ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?';
});

const buttonContent = computed(() => {
  return openForm.value ? 'Зарегистрироваться!' : 'Войти!';
});
</script>

<style lang="sass" scoped>
.forms-container
  margin: auto
  user-select: none
  color: $textColor
  transition: .15s ease-out
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  gap: 10px
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

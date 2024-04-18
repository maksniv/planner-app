<template>
  <button @click="switchTheme()">ТЫК</button>
</template>

<script setup lang="ts">
const theme = ref('light');

const switchTheme = (): void => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  installTheme(theme.value)
};
const installTheme = (val: string): void => {
  document.body.setAttribute('data-theme', val);
  localStorage.setItem('theme', val);
}

const start = () => {
    if(process.server) return;
    if(!('theme' in localStorage)) return
    if (localStorage.getItem('theme') === 'dark') {
      theme.value = 'dark';
      installTheme(theme.value)
    }
}
start()
</script>
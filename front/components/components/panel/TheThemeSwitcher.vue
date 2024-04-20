<template>
  <div class="theme-switcher">
    <Icon
        name="heroicons-solid:sun"
        size="19"
        class="wrapper__icon"
    ></Icon>
    <button @click="switchTheme()">ТЫК</button>
    <Icon
        name="akar-icons:moon-fill"
        size="19"
        class="wrapper__icon"
    ></Icon>
  </div>
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

<style scoped lang="sass">
.theme-switcher
  user-select: none
  width: 100%
  height: var(--base-height)
  padding: 12px 16px
  margin: 0 16px
  background-color: var(--background)
  color: var(--secondary-text-color)
  border-radius: var(--border-radius)
  box-shadow: 0 4px 6px var(--box-shadow)
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: space-evenly
  align-items: center
</style>
<template>
  <div class="theme-switcher">
    <Icon
        name="heroicons-solid:sun"
        size="19"
        class="wrapper__icon"
    ></Icon>
    <TheToggle v-model="theme" ></TheToggle>
    <Icon
        name="akar-icons:moon-fill"
        size="19"
        class="wrapper__icon"
    ></Icon>
  </div>
</template>

<script setup lang="ts">
const theme = ref(false);
const colorMode = useColorMode()

watch(
  theme,
  () => {
   switchTheme()
  },
);

const switchTheme = (): void => {
  colorMode.preference = theme.value === false ? 'dark' : 'light';
};

const initVal = () => {
  if(process.server) return
  console.log(colorMode.value);
  theme.value = colorMode.value !== 'dark';
}
initVal()
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
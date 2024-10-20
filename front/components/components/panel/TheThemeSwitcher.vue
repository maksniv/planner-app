<template>
  <div class="theme-switcher">
    <Icon
      name="heroicons-solid:sun"
      size="19"
      class="wrapper__icon"
    />
    <TheToggle v-model="theme" />
    <Icon
      name="akar-icons:moon-fill"
      size="19"
      class="wrapper__icon"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const theme = ref(false);
const colorMode = useColorMode()

watch(
  theme,
  () => {
    switchTheme()
  },
);

const switchTheme = (): void => {
  colorMode.preference = theme.value === true ? 'dark' : 'light';
};

onMounted(() => {
  theme.value = colorMode.value === 'dark';
});
</script>

<style scoped lang="sass">
.theme-switcher
  user-select: none
  width: 100%
  height: var(--base-height)
  padding: 12px 16px
  margin: 0 16px
  background-color: var(--main-secondary)
  color: var(--text-secondary)
  border-radius: var(--border-radius)
  box-shadow: 0 4px 6px var(--box-shadow)
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: space-evenly
  align-items: center
</style>
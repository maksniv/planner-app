<template>
  <form class="form__container" autocomplete="off">
    <h1
      v-if="!hideTitle"
      class="form__title"
      :class="{
      'small': titleSize === 'small',
      'big': titleSize === 'big' || titleSize === undefined
      }"
    >
      <slot name="title"/>
    </h1>
    <div v-if="!hideTitle" class="form__line" />
    <div class="form__wrapper">
      <slot name="body"/>
    </div>
    <div v-if="!hideFooter" class="form__line" />
    <div v-if="!hideFooter" class="form__button-wrapper">
      <slot name="footer"/>
    </div>
  </form>
</template>

<script setup lang="ts">
interface Props {
  titleSize?: 'small' | 'big' | undefined;
  hideTitle?: boolean | false;
  hideFooter?: boolean | false;
}

defineProps<Props>();
</script>

<style lang="sass" scoped>
.form__container
  flex: 1
  display: flex
  min-width: 300px
  flex-direction: column
  border: 1px solid var(--border-base)
  border-radius: var(--border-radius)
  background-color: var(--sidebar)
  color: var(--base-text-color)
  .form__title
    &.small
      padding: 24px
      font-size: 25px
    &.big
      font-size: 35px
      padding: 30px
  .form__line
    width: 100%
    border: 1px solid var(--border-base)
  .form__wrapper
    flex: 1
    width: 100%
    display: flex
    flex-direction: column
    padding: 24px
    gap: 10px
  .form__button-wrapper
    align-self: flex-end
    display: flex
    gap: 24px
    padding: 24px
</style>

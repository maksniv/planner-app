<template>
  <form class="form__container">
    <h1 class="form__title" :class="setTextSize">
      <slot name="title"></slot>
    </h1>
    <div class="form__line"></div>
    <div class="form__wrapper">
      <slot name="body"></slot>
    </div>
    <div class="form__line"></div>
    <div class="form__button-wrapper">
      <slot name="footer"></slot>
    </div>
  </form>
</template>

<script setup lang="ts">
interface Props {
  titleSize: string;
}

const props = defineProps<Props>();

const setTextSize = computed(() => {
  return props.titleSize === 'small' ? 'small' : 'big';
});
</script>

<style lang="sass" scoped>
.form__container
  flex: 1
  display: flex
  flex-direction: column
  border: 1px solid $border
  border-radius: $borderRadius
  background-color: $sidebar
  color: $textColor
  .form__title
    &.small
      padding: 24px
    &.big
      font-size: 35px
      padding: 30px
  .form__line
    width: 100%
    border: 1px solid $border
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
    padding: 10px
    gap: 24px
    padding: 24px
</style>

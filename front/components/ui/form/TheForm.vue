<template>
  <form class="form__container" autocomplete="false">
    <h1
      class="form__title"
      :class="smallTitleSize ? 'small' : 'big'"
      v-if="!hideTitle"
    >
      <slot name="title"></slot>
    </h1>
    <div class="form__line" v-if="!hideTitle && !hideBody" />
    <div class="form__wrapper" v-if="!hideBody">
      <slot name="body"></slot>
    </div>
    <div class="form__line" v-if="!hideFooter" />
    <div class="form__button-wrapper" v-if="!hideFooter">
      <slot name="footer"></slot>
    </div>
  </form>
</template>

<script setup lang="ts">
interface Props {
  smallTitleSize?: boolean | false;
  hideTitle?: boolean | false;
  hideFooter?: boolean | false;
  hideBody?: boolean | false;
}

defineProps<Props>();
</script>

<style lang="sass" scoped>
.form__container
  flex: 1
  display: flex
  min-width: 300px
  flex-direction: column
  border: 1px solid $border
  border-radius: $borderRadius
  background-color: $sidebar
  color: $textColor
  .form__title
    &.small
      padding: 24px
      font-size: 25px
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

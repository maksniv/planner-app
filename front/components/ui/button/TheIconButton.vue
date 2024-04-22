<template>
  <Icon class="icon-button"
        :style="{'background-color': color, 'color': color}"
        v-bind="$attrs"
        :primary="!color"
        :size="size || '20'"
        :name="icon"
  >
  </Icon>
</template>

<script lang="ts" setup>
interface Props {
  color?: string | null;
  icon: string;
  size?: string;
}
defineProps<Props>();

</script>

<style scoped lang="sass">
.icon-button
  cursor: pointer
  user-select: none
  transition: all .25s ease-out
  display: flex
  justify-content: space-between
  align-items: center
  &:hover
    transform: scale(1.15)
  &:active
    transform: scale(0.97)
  // primary
  &[primary]
    color: var(--primary)
    &:enabled:hover
      color: var(--primary-hover)
    &:enabled:active
      color: var(--primary)
    &:enabled:focus
      color: var(--primary-focus)
  // danger
  &[danger]
    color: var(--danger)
    &:enabled:hover
      color: var(--danger-hover)
    &:enabled:active
      color: var(--danger)
    &:enabled:focus
      color: var(--danger-focus)
  // success
  &[success]
    color: var(--success)
    &:enabled:hover
      color: var(--success-hover)
    &:enabled:active
      color: var(--success)
    &:enabled:focus
      color: var(--success-focus)
  // warning
  &[warning]
    color: var(--warning)
    &:enabled:hover
      color: var(--warning-hover)
    &:enabled:active
      color: var(--warning)
    &:enabled:focus
      color: var(--warning-focus)
  // info
  &[info]
    color: var(--info)
    &:enabled:hover
      color: var(--info-hover)
    &:enabled:active
      color: var(--info)
    &:enabled:focus
      color: var(--info-focus)
  &:disabled
    cursor: default
    transform: scale(1.0)
    color: var(--disabled-text-color)
</style>

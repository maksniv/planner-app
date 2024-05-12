<template>
  <button
    class="button"
    :class="{'outlined': outlined}"
    :style="{'background-color': outlined ? null : color, 'border-color': color, 'color': color}"
    v-bind="$attrs"
    :primary="!color"
  >
    <slot/>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  color?: string | null;
  outlined?: boolean | false;
}
defineProps<Props>();

</script>

<style scoped lang="sass">
.button
  cursor: pointer
  user-select: none
  padding: 12px 16px
  height: var(--base-height)
  color: var(--white)
  border-radius: var(--border-radius)
  transition: all .25s ease-out
  box-shadow: 0 4px 6px var(--box-shadow)
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  text-wrap: nowrap
  justify-content: space-between
  align-items: center
  gap: 5px
  &:hover
    transform: scale(1.03)
  &:active
    transform: scale(0.97)
  // primary
  &[primary]
    background-color: var(--primary)
    border: 1px solid var(--primary)
    &.outlined
      color: var(--primary)
    &:enabled:hover
      background-color: var(--primary-hover)
      border: 1px solid var(--primary-hover)
    &:enabled:active
      background-color: var(--primary)
      border: 1px solid var(--primary)
    &:enabled:focus
      background-color: var(--primary-focus)
      border: 1px solid var(--primary-focus)
  // danger
  &[danger]
    background-color: var(--danger)
    border: 1px solid var(--danger)
    &.outlined
      color: var(--danger)
    &:enabled:hover
      background-color: var(--danger-hover)
      border: 1px solid var(--danger-hover)
    &:enabled:active
      background-color: var(--danger)
      border: 1px solid var(--danger)
    &:enabled:focus
      background-color: var(--danger-focus)
      border: 1px solid var(--danger-focus)
  // success
  &[success]
    background-color: var(--success)
    border: 1px solid var(--success)
    &.outlined
      color: var(--success)
    &:enabled:hover
      background-color: var(--success-hover)
      border: 1px solid var(--success-hover)
    &:enabled:active
      background-color: var(--success)
      border: 1px solid var(--success)
    &:enabled:focus
      background-color: var(--success-focus)
      border: 1px solid var(--success-focus)
  // warning
  &[warning]
    background-color: var(--warning)
    border: 1px solid var(--warning)
    &.outlined
      color: var(--warning)
    &:enabled:hover
      background-color: var(--warning-hover)
      border: 1px solid var(--warning-hover)
    &:enabled:active
      background-color: var(--warning)
      border: 1px solid var(--warning)
    &:enabled:focus
      background-color: var(--warning-focus)
      border: 1px solid var(--warning-focus)
  // info
  &[info]
    background-color: var(--info)
    border: 1px solid var(--info)
    &.outlined
      color: var(--info)
    &:enabled:hover
      background-color: var(--info-hover)
      border: 1px solid var(--info-hover)
    &:enabled:active
      background-color: var(--info)
      border: 1px solid var(--info)
    &:enabled:focus
      background-color: var(--info-focus)
      border: 1px solid var(--info-focus)
  &:disabled
    cursor: default
    transform: scale(1.0)
    background-color: var(--disabled)
    border: 1px solid var(--disabled)
    color: var(--disabled-text-color)
  &.outlined
    background-color: transparent
    &:enabled:hover
      background-color: transparent
    &:enabled:active
      background-color: transparent
    &:enabled:focus
      background-color: transparent
    &:enabled:disabled
      background-color: transparent
</style>
